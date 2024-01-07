import {useEffect, useState} from 'react'
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit} from 'react-icons/ai';
import {BsInfoCircle} from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete} from 'react-icons/md';
const HomeDep = () => {

  const [departments, setDepartments] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    setLoading(true);
    axios
      .get('http://localhost:5000/departments')
      .then((response) =>{ 
        setDepartments(response.data.dep)
        setLoading(false);
      })
      .catch((error)=>{
        console.log(error);
        setLoading(false)
      })
  }, [])
  return (
    <div className='STD-Container'>
      <div>
        <h1>Department List</h1>
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
            <th className='Std-RegNo'>Department ID</th>
            <th className='Std-Name'>Name</th>
            <th className='Std-Semester'>Dean</th>
            <th className='Std-WhatsApp'>H.O.D</th>
            <th className='Std-Op'>Operations</th>
          </tr>
          </thead>
          <tbody>
            {

              departments.map((department, index)=>(
                <tr key={department._id} className='h-8'>

                <td>{index+1}</td>
                <td>{department._id}</td>
                <td>{department.name}</td>
                <td><Link to={`/instructors/show/${department.dean}`} >{department.dean}</Link></td>
                <td><Link to={`/instructors/show/${department.hod}`}>{department.hod}</Link></td>
                <td>
                  <div className='flex justify-center gap-x-4'>
                    <Link to = {`/departments/show/${department._id}`}> 
                      <BsInfoCircle className='text-2xl text-green-800'/>
                    </Link>
                    <Link to={`/departments/edit/${department._id}`}>
                      <AiOutlineEdit className='text-2xl text-yellow-600'/>
                    </Link>
                    <Link to={`/departments/delete/${department._id}`}>
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

export default HomeDep
