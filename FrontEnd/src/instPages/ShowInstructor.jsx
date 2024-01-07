import {useEffect,useState} from 'react'
import axios from 'axios'
import "../stdPages/stdStyle/ShowStudent.css"


const ShowInstuctor = () => {
  const [instructors, setinstructors] = useState({});
  const [dep, setDep] = useState()

  useEffect(()=>{
    const token = localStorage.getItem('token')
    const data = {
      token
    }
    if(!token){
      alert("You are not logged in")
      window.location.href= ('http://localhost:5173/login')
    }else{
      axios.post('http://localhost:5000/api/token', data)
      .then((response)=>{
        if(response.data.status === 'ok'){
          setinstructors(response.data.instructor)
          return(response.data.instructor)
        }
      }).then((res)=>{
        axios.get(`http://localhost:5000/departments/${res.department}`)
        .then((response) => {    
            setDep(response.data.name)
          })
      })
      
      .catch((error)=>{
        alert("Something went wrong please try again")
        console.log(error)
      })
    }
  }, [])
  
    return (
      <div className='Show-ContainerIns'>
        <h1 className='Show-HeaderIns'>Details</h1>
        <div className='Show-UnderlineIns'></div>
        
        <form className='Show-inputsIns'>
              <p>Prof ID:  </p>
              <span>{instructors._id}</span>
           
              <p >Name: </p>
              <span>{instructors.name}</span>
           
           
              <p >Department: </p>
              <span>{dep ? dep : instructors.department}</span>
           
           
              <p >Email: </p>
              <span>{instructors.email}</span>
           
           
              <p >Whatsapp: </p>
              <span>{instructors.whatsapp}</span>
           
          </form>
      </div>
  )
}

export default ShowInstuctor
