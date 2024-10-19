import { Dispatch, SetStateAction } from 'react'
import axios from 'axios'
import { TGuru } from '@/app/guru/page'

type TDelete = {
  _id: string
  name: string
  guru: Array<TGuru>
  setGuru: Dispatch<SetStateAction<Array<TGuru>>>
}

const Delete: React.FC<TDelete> = ({ _id, name, guru, setGuru }) => {
  const onClickHandler = () => {
    axios
      .delete(`http://localhost:5000/guru?id=${_id}&name=${name}`, {
        timeout: 5000,
      })
      .then((res) => {
        console.log(res)

        setGuru(guru.filter((guru) => guru._id !== _id))
      })
      .catch((err) => console.error(err))
  }

  return (
    <div
      className="modal fade"
      id={`delete${_id}`}
      aria-labelledby="delete"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5 text-danger" id="delete">
              <i className="bi bi-chevron-right"></i> Hapus Guru
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <p>Yakin ingin menghapus guru?</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline-danger"
              data-bs-dismiss="modal"
            >
              Tutup
            </button>
            <button
              className="btn btn-danger"
              onClick={onClickHandler}
              data-bs-dismiss="modal"
            >
              <i className="bi bi-person-fill-x"></i> Hapus
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Delete
