import {useEffect, useState} from 'react'
import axios from 'axios';
import { Navigate } from 'react-router-dom';
const InsClasses = () => {
  var index = 0;
  const [show, setShow] = useState(false);
  const [ss, setSs] = useState({})
  const [instructor, setInstructor] = useState()
        var token = localStorage.getItem('token')
        const data = {
            token
        }

        function getInstructor(){
          if(!token){          
            alert('you are not logged in')
            window.location.href = ('http://localhost:5173/login')
        }else{
            axios.post('http://localhost:5000/api/token', data)
            .then((response)=>{
                if(response.data.status === 'ok'){
                    setInstructor(response.data.instructor)
                }
                return(response.data.instructor)
            }).then( async (instructor)=>{
                const data = {
                  _id:instructor._id
                }
                axios
                .post('http://localhost:5000/classes/getByInstructor', data)
                .then((response) =>{
                  console.log(response.data)
                  fetchClassDetails(response.data.class1)
                })
            })
            
            
            .catch((error)=>{
                console.log(error)
            })
        }
        }
        useEffect(()=>{
            getInstructor();
        }, [])


  const [detailedClass, setDetails] = useState([])

  const fetchClassDetails = (classs)=>{
    const promises = classs.map((Class) => {
      const coursePromise = axios.get(`http://localhost:5000/courses/${Class.courseID}`)
      return Promise.all([coursePromise])
      .then((responses)=>{
        const [courseResponse] = responses
        return {
          _id: Class._id,
          courseName: courseResponse.data.name,
          course: courseResponse.data._id,
          section: Class.section,
          stdList: Class.stdList
        }
      }).catch((error)=>{
        console.log(error)
      })
    })

    Promise.all(promises)
    .then((detailedClass) => {
      setDetails(detailedClass.filter(Boolean))
    })
    .catch((error)=>{
      console.log(error)
    })
  }

  const handleCreateQuiz =(selected)=>{
    const st = JSON.stringify(selected)

    localStorage.setItem("class", st)
    window.location.href = ('/question')
  }

  return (
    <div className='STD-Container'>
      <div>
        <h1>Joined Class List</h1>
        <div className='STD-underline'></div>
      </div>
        <table className='table-container'>
          <thead className='StdHeadings'>

          <tr>
            <th>No</th>
            <th>Course Code</th>
            <th>Course Name</th>
            <th>Section</th>
            <th>Operations</th>
          </tr>
          </thead>
          <tbody>
            {
              detailedClass.map((detailedClass)=>(
                <tr key={detailedClass._id}>

                <>
                

                <td>{++index}</td>
                <td>{detailedClass.course}</td>
                <td>{detailedClass.courseName}</td>
                
                <td>{detailedClass.section}</td>
                <td>
                  <div>
                    <button onClick={()=>{
                      setSs(detailedClass)
                      console.log(detailedClass.stdList)
                      setShow(!show)
                      }}>Show Students</button>
                    <button onClick={()=>{
                      handleCreateQuiz(detailedClass)
                      }}>Create Quiz</button>
                  </div>
                  <div>
                  </div>
                </td>
                </>
                </tr>

              ))
            }
          </tbody>
        </table>
    </div>
  )
}

export default InsClasses
