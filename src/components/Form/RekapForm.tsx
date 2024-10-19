import { useForm, SubmitHandler } from 'react-hook-form'
import axios from 'axios'
import { TRekap } from '@/app/rekap/page'
import { Dispatch, SetStateAction } from 'react'

type TInputs = {
  date: string
}

type TProps = {
  setDays: Dispatch<SetStateAction<Array<number>>>
  setRekap: Dispatch<SetStateAction<TRekap>>
}

const RekapForm: React.FC<TProps> = ({ setDays, setRekap }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TInputs>()

  const onSubmit: SubmitHandler<TInputs> = (data) => {
    axios
      .get(`http://localhost:5000/guru/rekap?date=${data.date}`, {
        timeout: 5000,
      })
      .then((res) => {
        console.log(res)
        setRekap(res.data.data)
        setDays(res.data.day)
      })
      .catch((err) => console.log(err.message))
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3 input-group" style={{ width: '250px' }}>
          <input
            className="form-control"
            type="month"
            placeholder="Nama Lengkap"
            {...register('date', { required: true })}
          />
          <button
            type="submit"
            className="btn btn-outline-primary"
            data-bs-dismiss="modal"
          >
            <i className="bi bi-search"></i> Cari
          </button>
        </div>
      </form>
    </div>
  )
}

export default RekapForm
