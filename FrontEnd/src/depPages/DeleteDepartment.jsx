import {useState} from 'react'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const DeleteDepartment = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {id }=useParams();
  const handleDeleteDepartment=()=>{
    setLoading(true);
    axios
      .delete(`http://localhost:5000/departments/${id}`)
      .then(()=>{
        setLoading(false);
        navigate('/departments');
      })
      .catch((error)=>{
        setLoading(false)
        alert("Error!!! Please Check Console")
        console.log(error)
      });

  };


  return (
    <div>
      <BackButton/>
      <h1 className='text-3xl my-4'>Delete Department</h1>
      {loading ? <Spinner/>: ''}
      <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
        <h3 className='text-2xl'>Are you sure you want to delete this?</h3>
        <button className='p-4 bg-red-600 text-white m-8 w-full' onClick={handleDeleteDepartment}>Yes, Please</button>
      </div>
    </div>
  )
}

export default DeleteDepartment
