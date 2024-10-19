'use client'
import React, { useEffect, useRef, useState } from 'react'
import * as faceapi from 'face-api.js'
import axios from 'axios'

type TGuru = {
  name: string
  photos: Array<string>
}

export default function Home() {
  const API_HOST = process.env.NEXT_PUBLIC_API_HOST;
  const videoWidth = 640
  const videoHeight = 480
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [name, setName] = useState<string>('')
  const [guru, setGuru] = useState<Array<TGuru>>([])
  const [status, setStatus] = useState<string>('Memulai sistem...')
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const loadModels = async () => {
      Promise.all([
        faceapi.nets.ssdMobilenetv1.loadFromUri('/models'),
        faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
        faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
      ]).then(startVideo)
    }

    axios
      .get(`${API_HOST}/guru`, { timeout: 5000 })
      .then((res) => {
        console.log(res)
        setGuru(res.data.data)
        setStatus('Memuat model...')
        setIsLoading(true)
        loadModels()
      })
      .catch((err) => console.log(err.message))

    console.log('UE Load Models')
  }, [])

  useEffect(() => {
    setStatus('')
    setIsLoading(false)
    if (name && name !== 'unknown') {
      setTimeout(() => {
        axios
          .post(
            `${API_HOST}/guru/presence`,
            { name },
            { timeout: 5000 }
          )
          .then((res) => {
            console.log(res)
            setStatus('Kehadiran diperbarui.')
          })
          .catch((err) => console.log(err.message))
      }, 3000)
      console.log('UE Presence')
    }
  }, [name])

  const loadLabeledImages = () => {
    if (guru.length > 0) {
      return Promise.all(
        guru.map(async (guru) => {
          const faceDescriptors: any[] = []
          guru.photos.forEach(async (photo) => {
            const imageUrl = `${API_HOST}${photo}`
            const image = await faceapi.fetchImage(imageUrl)

            const fullFaceDescription = await faceapi
              .detectSingleFace(image)
              .withFaceLandmarks()
              .withFaceDescriptor()

            if (!fullFaceDescription) {
              return
            }

            faceDescriptors.push(fullFaceDescription.descriptor)
          })

          return new faceapi.LabeledFaceDescriptors(guru.name, faceDescriptors)
        })
      )
    } else {
      setIsLoading(false)
      setStatus('Belum ada data guru.')
    }
  }

  const startVideo = () => {
    setStatus('Memulai video stream...')
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: false,
      })
      .then((stream: any) => (videoRef.current!.srcObject = stream))
      .catch((err: any) => {
        console.error(`The following error occurred: ${err.name}`)
      })
  }

  const videoOnPlayHandler = async () => {
    setStatus('Memuat wajah...')
    const labeledDescriptors = await loadLabeledImages()
    const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors, 0.6)

    const displaySize = {
      width: videoWidth,
      height: videoHeight,
    }

    setInterval(async () => {
      canvasRef.current!.innerHTML =
        '' + faceapi.createCanvasFromMedia(videoRef.current!)

      faceapi.matchDimensions(canvasRef.current!, displaySize)

      const detections = await faceapi
        .detectAllFaces(videoRef.current!)
        .withFaceLandmarks()
        .withFaceDescriptors()

      const resizedDetections = faceapi.resizeResults(detections, displaySize)

      canvasRef
        .current!.getContext('2d')
        ?.clearRect(0, 0, videoWidth, videoHeight)

      const results = resizedDetections.map((detect) => {
        return faceMatcher.findBestMatch(detect.descriptor)
      })

      results.forEach((result, i) => {
        const box = resizedDetections[i].detection.box
        const label = result.toString().split(' ').slice(0, -1).join(' ')
        const drawBox = new faceapi.draw.DrawBox(box, {
          label,
        })
        drawBox.draw(canvasRef.current!)
        setName(label)
      })

      // faceapi.draw.drawDetections(canvasRef.current!, resizedDetections)
      // faceapi.draw.drawFaceLandmarks(canvasRef.current!, resizedDetections)
    }, 100)
  }

  return (
    <main className="container-fluid">
      <div className="row justify-content-center p-5">
        <div
          className="col text-center align-self-center justify-content-center"
          style={{ display: 'flex' }}
        >
          <video
            ref={videoRef}
            height={videoHeight}
            width={videoWidth}
            autoPlay
            muted
            onPlay={videoOnPlayHandler}
          />
          <canvas style={{ position: 'absolute' }} ref={canvasRef} />
        </div>
        <div className="col text-center align-self-center justify-content-center">
          {isLoading ? (
            <div className="spinner-border" role="status"></div>
          ) : (
            <h1>
              <i className="bi bi-person-bounding-box"></i>
            </h1>
          )}
          <h5>{name}</h5>
          <p>
            {/* {isLoading ? (
              <div
                className="spinner-border spinner-border-sm"
                role="status"
              ></div>
            ) : (
              <></>
            )}{' '} */}
            {status}
          </p>
        </div>
      </div>
    </main>
  )
}
