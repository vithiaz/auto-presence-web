'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import RekapForm from '@/components/Form/RekapForm'

export type TRekap = {
  rekap: [
    {
      name: string
      day: [number]
      _id: string
    }
  ]
} | null

const Rekap: React.FC = () => {
  const [rekap, setRekap] = useState<TRekap>(null)
  const [days, setDays] = useState<Array<number>>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    axios
      .get('http://localhost:5000/guru/rekap', {
        timeout: 5000,
      })
      .then((res) => {
        console.log(res)
        setRekap(res.data.data)
        setDays(res.data.day)
      })
      .catch((err) => console.log(err.message))
    setIsLoading(false)
  }, [])

  return (
    <main className="container-fluid">
      <div className="row justify-content-center p-5">
        <div className="col align-items-center">
          <h3 className="mt-3 mb-5">
            <i className="bi bi-calendar-date"></i> Rekap
          </h3>
          <RekapForm setDays={setDays} setRekap={setRekap} />
          <div className="table-responsive">
            <table className="table table-striped table-hover mt-3">
              <thead>
                <tr className="text-center table-dark">
                  <th scope="col">No</th>
                  <th scope="col">Nama</th>
                  {days ? (
                    days.map((day) => (
                      <>
                        <th scope="col">{day}</th>
                      </>
                    ))
                  ) : (
                    <></>
                  )}
                </tr>
              </thead>
              <tbody>
                {rekap ? (
                  rekap.rekap.map(({ name, day, _id }, index) => (
                    <tr key={_id}>
                      <th scope="row" className="text-center">
                        {index + 1}
                      </th>
                      <td>{name}</td>
                      {day.map((value, index) => (
                        <td key={index} className="text-center">
                          {value === 1 ? (
                            <i className="bi bi-check-circle-fill"></i>
                          ) : value === 2 ? (
                            <i className="bi bi-person-fill-add"></i>
                          ) : value === 3 ? (
                            ' '
                          ) : (
                            <i className="bi bi-x-circle"></i>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))
                ) : (
                  <></>
                )}
              </tbody>
            </table>
            {isLoading ? (
              <div className="text-center">
                <div className="spinner-border" role="status"></div>{' '}
                <p>Memuat rekap kehadiran...</p>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

export default Rekap
