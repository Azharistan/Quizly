import {useState} from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import "./ClassStyle/CreateClass.css"


function CreateClass(){

  const [courseID, setCourseID] = useState('');
  const [instructor, setInstructor] = useState();
  const [course, setCourse] = useState([]);
  const [section, setSection] = useState([]);

    const token = localStorage.getItem('token')
    const data = {
        token
    }
    function getinst(){

      if(!token){
        alert('You are not logged in')
        window.location.href = ('http://localhost:5173/login')
      }else{
        axios.post('http://localhost:5000/api/token', data)
        .then((response)=>{
          if(response.data.status === 'ok'){
            setInstructor(response.data.instructor)
          }
        }).catch((error)=>{
          console.log(error)
        })
      }
    }
    useEffect(()=>{
      getinst();
    }, [])

  const navigate = useNavigate();
  useEffect(()=>{
    axios
      .get('http://localhost:5000/courses')
      .then((response) =>{ 
        setCourse(response.data.course)
      })
      .catch((error)=>{
        console.log(error);
      })
  }, [instructor])
  const handleSaveClass = () =>{
    event.preventDefault()


    const data = {
      courseID,
      to: "ADMINS",
      instructor: instructor._id,
      section,
    };
    axios
      .post('http://localhost:5000/approvals', data)
      .then(() =>{
        navigate('/inspage');
      })
      .catch((error)=>{
        alert('An error happend, Please check console')
        console.log(error);
      });
  }

  function Exist(c){
    if(instructor)
    return instructor.department == c.depID
  }
  return (
    <>
  <div className='class-container'>
    <div className='class-header'>
      <h1> Create Class</h1>
      <div className='class-underline'></div>
    </div>
    <form className='class-inputs'>
      <label>Select Course:</label>
        <div className='Course-Button'>
          <select onChange={(e) => setCourseID(e.target.value)}>
            <option  className='' value='0' defaultChecked >
            Choose a course
            </option>
            {course.map((course) => (
              Exist(course) ? 
              <option onChange={(e) => setCourseID(e.target.value)} key={course._id} value={course._id}>
                {course.name}
              </option> : null             
              
              ))}
          </select>
        </div>
        <input className="class-attributes" placeholder='Section' type='number' value={section} onChange={(e) => setSection(e.target.value)}/>
        
      <button className='class-submit' onClick={handleSaveClass}>Save</button>
    </form>
  </div>
    </>
  )
}

export default CreateClass
