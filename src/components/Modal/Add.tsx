import { useForm, SubmitHandler } from 'react-hook-form'
import axios from 'axios'
import { Dispatch, SetStateAction } from 'react'
import { TGuru } from '@/app/guru/page'

type TInputs = {
  name: string
  photos: FileList
}

type TProps = {
  guru: Array<TGuru>
  setGuru: Dispatch<SetStateAction<Array<TGuru>>>
}

const Add: React.FC<TProps> = ({ guru, setGuru }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TInputs>()

  const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

  const onSubmit: SubmitHandler<TInputs> = (data) => {
    const formData = new FormData()
    Array.from(data.photos).forEach((file) => {
      formData.append('file', file)
    })
    formData.append('name', data.name)

    axios
      .post(`${API_HOST}/guru`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 5000,
      })
      .then((res) => {
        console.log(res)
        setGuru([...guru, res.data.data])
      })
      .catch((err) => console.error(err))
  }

  return (
    <div
      className="modal fade"
      id="add"
      aria-labelledby="add"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5 text-primary" id="add">
              <i className="bi bi-chevron-right"></i> Tambah Guru
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
              <div className="mb-3">
                <label className="form-label">Foto</label>
                <input
                  className="form-control"
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  multiple
                  {...register('photos', { required: true })}
                />
                {errors.photos && (
                  <span className="form-text text-danger">
                    *Foto tidak boleh kosong
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
                <i className="bi bi-person-fill-add"></i> Tambah
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Add
