import {useEffect, useState} from 'react'
import axios from 'axios';

const JoinClass = () => {
  var index = 0;

  const [std, setStd] = useState()
        var token = localStorage.getItem('token')
        const data = {
            token
        }

        function getStd(){
          if(!token){          
            alert('you are not logged in')
            window.location.href = ('https://quizly-frontend.vercel.app/login')
        }else{
            axios.post('https://quizly-nine.vercel.app/api/token', data)
            .then((response)=>{
                if(response.data.status === 'ok'){
                    setStd(response.data.student)
                }
            }).catch((error)=>{
                console.log(error)
            })
        }
        }
        useEffect(()=>{
            getStd();
        }, [])


  const [detailedClass, setDetails] = useState([])
  const [class_ID, setClass_ID] = useState()

  
  useEffect(()=>{
    axios
      .get('https://quizly-nine.vercel.app/classes')
      .then((response) =>{ 
        fetchClassDetails(response.data.class1)
      })
      .catch((error)=>{
        console.log(error);
      })
  }, [std])

  const fetchClassDetails = (classs)=>{
    const promises = classs.map((Class) => {
      const coursePromise = axios.get(`https://quizly-nine.vercel.app/courses/${Class.courseID}`)
      const instructorPromise = axios.get(`https://quizly-nine.vercel.app/instructors/${Class.instructor}`)
      return Promise.all([coursePromise,instructorPromise])
      .then((responses)=>{
        const [courseResponse, instructorResponse] = responses
        return {
          _id: Class._id,
          courseName: courseResponse.data.name,
          course: courseResponse.data._id,
          department: courseResponse.data.depID,
          instructorName: instructorResponse.data.name,
          instructor: instructorResponse.data._id,
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


useEffect(()=>{

  if(class_ID && std){
    const data = {
      student: std._id,
      to: class_ID.instructor,
      courseID : class_ID.course,
      section : class_ID.section
    }
    if(
      data.student &&
      data.to &&
      data.courseID &&
      data.section &&
      class_ID
    )
{
  axios.post(`https://quizly-nine.vercel.app/approvals`, data)
    .then((response)=>{
      if(response.status===201){
        const newclass = {
          courseID: class_ID.course,
          approved: false,
          classID: class_ID._id
        }
        std.classes.push(newclass)
        axios.put(`https://quizly-nine.vercel.app/students/${std._id}`, std)
          .then((res)=>{
            localStorage.removeItem('token')
            localStorage.setItem('token', res.data.token)
            token = localStorage.getItem('token')
                getStd();
                console.log(std)
          })
      }
      
      
    })
    .catch((error)=>{
      console.log(error)
    })}else{
      console.log('Try again')
    }
    
  }
  },[class_ID])

function handleCheck(d){
  const de = std._id.slice(1,3)
  var isEnrolled = true

  if(de == d.department){
    isEnrolled = std.classes.some(cc => (cc.classID === d._id));
  }
  return !isEnrolled
}

// const handleJoin = () => {
// }
  return (
    <div className='STD-Container'>
      <div>
        <h1>Class List</h1>
        <div className='STD-underline'></div>
      </div>
        <table className='table-container'>
          <thead className='StdHeadings'>

          <tr>
            <th>No</th>
            <th>Course Code</th>
            <th>Instructor Name</th>
            <th>Section</th>
            <th>Operations</th>
          </tr>
          </thead>
          <tbody>
            {
              detailedClass.map((detailedClass)=>(
                <tr key={detailedClass._id}>
                {
                  (
                    handleCheck(detailedClass)
                  ) ? (

                <>
                

                <td>{++index}</td>
                <td>{detailedClass.course}</td>
                <td>{detailedClass.instructorName}</td>
                
                <td>{detailedClass.section}</td>
                <td>
                  <div>
                    <button onClick={()=>{
                      setClass_ID(detailedClass)
                      }}>Join</button>
                  </div>
                </td>
                </>
                ) : null}
                </tr>

              ))
            }
          </tbody>
        </table>
    </div>
  )
}

export default JoinClass
