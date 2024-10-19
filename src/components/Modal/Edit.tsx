import axios from 'axios'

import { useForm, SubmitHandler } from 'react-hook-form'
import { TGuru } from '@/app/guru/page'
import { Dispatch, SetStateAction } from 'react'

type TInputs = {
  name: string
}

type TProps = {
  _id: string
  oldName: string
  guru: Array<TGuru>
  setGuru: Dispatch<SetStateAction<Array<TGuru>>>
}

const Edit: React.FC<TProps> = ({ _id, oldName, guru, setGuru }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TInputs>()

  const onSubmit: SubmitHandler<TInputs> = (data) => {
    const { name } = data

    axios
      .put(
        'http://localhost:5000/guru',
        { _id, name, oldName },
        { timeout: 5000 }
      )
      .then((res) => {
        console.log(res)
        if (res.status === 200) {
          const { _id, name } = res.data.data

          const newGuru = guru.map((guru) => {
            return guru._id === _id
              ? {
                  ...guru,
                  name,
                }
              : guru
          })

          setGuru(newGuru)
        }
      })
      .catch((err) => console.log(err.message))
  }

  return (
    <div
      className="modal fade"
      id={`edit${_id}`}
      aria-labelledby="edit"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5 text-primary" id="edit">
              <i className="bi bi-chevron-right"></i> Edit Nama
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Nama</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Nama Lengkap"
                  {...register('name', { required: true })}
                />
                {errors.name && (
                  <span className="form-text text-danger">
                    *Nama tidak boleh kosong
                  </span>
                )}
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-primary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                data-bs-dismiss="modal"
              >
                <i className="bi bi-pencil-square"></i> Edit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Edit
