import {useEffect,useState} from 'react'
import axios from 'axios'
import "./stdStyle/ShowStudent.css"

const ShowStudent = () => {
  const [students, setStudents] = useState({});

  useEffect(()=>{

    const token = localStorage.getItem('token')
    const data = {
        token
    }
    if(!token){          
        alert('you are not logged in')
        window.location.href = ('http://localhost:5173/login')
    }else{
        axios.post('http://localhost:5000/api/token', data)
        .then((response)=>{
            if(response.data.status === 'ok'){
                setStudents(response.data.student)
            }
        }).catch((error)=>{
            console.log(error)
        })
    }
    }, [])
    return (
      <div className='Show-ContainerStd'>
        <h1 className='Show-HeaderSTD'>Show Student</h1>
        <div className='Show-UnderlineSTD'></div>
        
          <div className='Show-inputsStd'>
            <div className='Show-inputStd'>
              <p>Reg no:  </p>
              <span>{students._id}</span>
            </div>
            <div className='Show-inputStd'>
              <p >Name: </p>
              <span>{students.name}</span>
            </div>
            <div className='Show-inputStd'>
              <p >Semester: </p>
              <span>{students.semester}</span>
            </div>
            <div className='Show-inputStd'>
              <p >Email: </p>
              <span>{students.email}</span>
            </div>
            <div className='Show-inputStd'>
              <p >Whatsapp: </p>
              <span>{students.whatsapp}</span>
            </div>
          </div>
        
      </div>
  )
}

export default ShowStudent
