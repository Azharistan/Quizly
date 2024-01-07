import {useEffect, useState} from 'react'
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit} from 'react-icons/ai';
import {BsInfoCircle} from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete} from 'react-icons/md';
const HomeCrs = () => {

  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    setLoading(true);
    axios
      .get('http://localhost:5000/courses')
      .then((response) =>{ 
        setCourses(response.data.course)
        console.log(response.data.course)
        setLoading(false);
      })
      .catch((error)=>{
        console.log(error);
        setLoading(false)
      })
  }, [])
  return (
    <div className='STD-Container'>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-8'>Course List</h1>
        <div className='STD-underline'></div>
        <Link to='create'>
          <MdOutlineAddBox className='Add-Button'/>
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ):(
        <table className='table-container'>
          <thead>

          <tr>
            <th className='Std-No'>No</th>
            <th className='Std-RegNo'>Course ID</th>
            <th className='Std-Name'>Name</th>
            <th className='Std-Semester'>Department</th>
            <th className='Std-WhatsApp'>Credit Hours</th>
            <th className='Std-Op'>Operations</th>
          </tr>
          </thead>
          <tbody>
            {

              courses.map((course, index)=>(
                <tr key={course._id} className='h-8'>

                <td className='border border-slate-700 rounded-md text-center'>{index+1}</td>
                <td className='border border-slate-700 rounded-md text-center '>{course._id}</td>
                <td className='border border-slate-700 rounded-md text-center '>{course.name}</td>
                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>{course.depID}</td>
                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>{course.creditHr}</td>
                <td className='border border-slate-700 rounded-md text-center '>
                  <div className='flex justify-center gap-x-4'>
                    <Link to = {`show/${course._id}`}> 
                      <BsInfoCircle className='text-2xl text-green-800'/>
                    </Link>
                    <Link to={`edit/${course._id}`}>
                      <AiOutlineEdit className='text-2xl text-yellow-600'/>
                    </Link>
                    <Link to={`delete/${course._id}`}>
                      <MdOutlineDelete className='text-2xl text-red-600'/>
                    </Link>
                  </div>
                </td>

                </tr>
              ))
            }
          </tbody>
        </table>
      )
      }
    </div>
  )
}

export default HomeCrs
