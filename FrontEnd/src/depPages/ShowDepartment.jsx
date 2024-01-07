import {useEffect,useState} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'

const ShowDepartment = () => {
  const [departments, setDepartments] = useState({});
  const [loading, setLoading] =useState(false)
  const {id} = useParams()

  useEffect(()=>{
    setLoading(true)
    axios
      .get(`http://localhost:5000/departments/${id}`)
      .then((response)=>{
        setDepartments(response.data);
        console.log('this',response.data)
        setLoading(false)
      })
      .catch((error)=>{
        console.log('this',error);
        setLoading(false);
      });
    }, [])
    return (
      <div className='p-4'>
        <BackButton />
        <h1 className='text-3xl my-4'>Show Department</h1>
        {loading ? (
          <Spinner />
        ) : (
          <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>ID : </span>
              <span>{departments._id}</span>
            </div>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Name : </span>
              <span>{departments.name}</span>
            </div>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Dean : </span>
              <span>{departments.dean}</span>
            </div>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>HOD : </span>
              <span>{departments.hod}</span>
            </div>
          </div>
        )}

      </div>
  )
}

export default ShowDepartment
