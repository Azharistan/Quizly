import {useEffect,useState} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import BackButton from '../components/BackButton'
import "./ClassStyle/ClassShow.css"

const ShowClass = () => {
  const [classes, setClasses] = useState({});
  const [instructor, setInstructor] = useState()
  const [course, setCourse] = useState()
  const {id} = useParams()

  useEffect(()=>{
    axios
      .get(`http://localhost:5000/classes/${id}`)
      .then((response)=>{
        setClasses(response.data);
        console.log('this',response.data)
        setInstructor(response.data.instructor)
        setCourse(response.data.courseID)
      })
      .catch((error)=>{
        console.log('this',error);
      });
    }, [])
    axios.get(`http://localhost:5000/instructors/${instructor}`)
    .then((res)=>{
      setInstructor(res.data.name)
    })
    axios.get(`http://localhost:5000/courses/${course}`)
    .then((res)=>{
      setCourse(res.data.name)
    })
    return (
      <div className='Show-Container-Class'>
        <BackButton />
        <h1 className='Show-Header-Class'>Class Details</h1>
        <div className='Show-Underline-Class'></div>
          <form className='Show-inputs-Class'>
            
              <span>Professor : {instructor}</span>
            
              <p>section : {classes.section}</p>
            
              <p>course : {course}</p>
          </form>

      </div>
  )
}

export default ShowClass
