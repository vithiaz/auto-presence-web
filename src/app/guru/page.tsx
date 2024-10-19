'use client'

import { useEffect, useState } from 'react'
import Add from '@/components/Modal/Add'
import Delete from '@/components/Modal/Delete'
import Edit from '@/components/Modal/Edit'

import axios from 'axios'

export type TGuru = {
  name: string
  _id: string
}

const Guru: React.FC = () => {
  const [guru, setGuru] = useState<Array<TGuru>>([])
  const [status, setStatus] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    axios
      .get('http://localhost:5000/guru', {
        timeout: 5000,
      })
      .then((res) => setGuru(res.data.data))
      .catch((err) => console.log(err.message))
    setIsLoading(false)
  }, [])

  return (
    <main className="container-fluid">
      <div className="row justify-content-center p-5">
        <div className="col align-items-center">
          <h3 className="mt-3 mb-5">
            <i className="bi bi-people-fill"></i> Daftar Guru
          </h3>
          <a
            role="button"
            className="text-decoration-none"
            data-bs-toggle="modal"
            data-bs-target="#add"
          >
            <i className="bi bi-person-fill-add"></i> Tambah Guru
          </a>
          <table className="table mt-3">
            <thead>
              <tr className="table-dark">
                <th scope="col">No</th>
                <th scope="col">Nama</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {guru ? (
                guru.map(({ name, _id }, index) => (
                  <tr key={_id}>
                    <th scope="row">{index + 1}</th>
                    <td>{name}</td>
                    <td>
                      {' '}
                      <a
                        role="button"
                        className="text-decoration-none text-danger"
                        data-bs-toggle="modal"
                        data-bs-target={`#delete${_id}`}
                      >
                        <i className="bi bi-person-fill-x"></i> Hapus
                      </a>{' '}
                      |{' '}
                      <a
                        role="button"
                        className="text-decoration-none"
                        data-bs-toggle="modal"
                        data-bs-target={`#edit${_id}`}
                      >
                        <i className="bi bi-pencil-square"></i> Edit
                      </a>
                    </td>
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
              <p>Memuat data guru...</p>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div>
        {guru ? (
          guru.map(({ _id, name }) => (
            <Delete
              key={_id}
              _id={_id}
              name={name}
              guru={guru}
              setGuru={setGuru}
            />
          ))
        ) : (
          <></>
        )}
      </div>
      <div>
        {guru ? (
          guru.map(({ _id, name }) => (
            <Edit
              key={_id}
              _id={_id}
              oldName={name}
              guru={guru}
              setGuru={setGuru}
            />
          ))
        ) : (
          <></>
        )}
      </div>
      <Add guru={guru} setGuru={setGuru} />
    </main>
  )
}

export default Guru
