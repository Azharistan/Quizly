import {useEffect, useState} from 'react'
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit} from 'react-icons/ai';
import {BsInfoCircle} from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete} from 'react-icons/md';
import "./stdStyle/Home.css"
const Home = () => {

  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    setLoading(true);
    axios
      .get('http://localhost:5000/students')
      .then((response) =>{ 
        setStudents(response.data.students)
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
        <h1>Student List</h1>
        <div className='STD-underline'></div>
        <Link to='create'>
          <MdOutlineAddBox className='Add-Button'/>
        </Link>
        
      </div>
      {loading ? (
        <Spinner />
      ):(
        <table className='table-container'>
          <thead  className='StdHeadings'>
          <tr>
            <th className='Std-No'>No</th>
            <th className='Std-RegNo'>Regno</th>
            <th className='Std-Name'>Name</th>
            <th className='Std-Semester'>Semester</th>
            <th className='Std-WhatsApp'>WhatsApp</th>
            <th className='Std-Email'>Email</th>
            <th className='Std-Op'>Operations</th>
          </tr>
          </thead>
          <tbody>
            {
              students.map((student, index)=>(
                <tr key={student._id} className='h-8'>

                <td>{index+1}</td>
                <td>{student._id}</td>
                <td>{student.name}</td>
                <td>{student.semester}</td>
                <td>{student.whatsapp}</td>
                <td>{student.email}</td>
                <td>
                  <div>
                    <Link to = {`/students/show/${student._id}`}> 
                      <BsInfoCircle/>
                    </Link>
                    <Link to={`/students/edit/${student._id}`}>
                      <AiOutlineEdit/>
                    </Link>
                    <Link to={`/students/delete/${student._id}`}>
                      <MdOutlineDelete/>
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

export default Home
