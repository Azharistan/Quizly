import {useEffect, useState} from 'react'
import axios from 'axios';
const Quiz = () => {

    const [prof, setProf] = useState()
    const token = localStorage.getItem('token')
    const data = {
        token
    }
    useEffect(()=>{
        if(!token){
            alert('You are not logged in')
            window.location.href = ('http://localhost:5173/login')
        }else{
            axios.post('http://localhost:5000/api/token', data)
            .then((response)=>{
                if(response.data.status === 'ok'){
                    setProf(response.data.instructor)
                    return(response.data.instructor)
                }
            }).then((response)=>{
                console.log(response)
                const data = {
                    _id: response._id
                }
                axios.post('http://localhost:5000/classes/getByInstructor', data)
                .then((res)=>{
                    console.log(res)
                })


            })
            .catch((error)=>{
                console.log(error)
            })
        }
    },[])





  

  return (
    <div className='STD-Container'>
      <div>
        <h1>Approvals List</h1>
        <div className='STD-underline'></div>        
      </div>
        <table className='table-container'>
          <thead  className='StdHeadings'>
          <tr>
            <th className='Std-No'>No</th>
            <th className='Std-RegNo'>From</th>
            <th className='Std-RegNo'>to</th>
            <th className='Std-Name'>Detail</th>
            <th className='Std-Semester'>Course</th>
            <th className='Std-WhatsApp'>Section</th>
            <th className='Std-Op'>Operations</th>
          </tr>
          </thead>
          <tbody>
            {/* {
              approval.map((app, index)=>(
                <tr key={app._id} className='h-8'>

                <td>{index+1}</td>
                <td>{app.from}</td>
                <td>{app.to}</td>
                <td>{app.detail}</td>
                <td>{app.courseID}</td>
                <td>{app.section}</td>
                <td>
                  <div>
                  <button onClick={()=>{
                    from = (app.from)
                    courseID = (app.courseID)
                    detail = (app.detail) 
                    section = (app.section)
                    to= app.to
                    handleAccept()
                  }}>accept</button>
                  <button onClick={()=>{
                    from = (app.from)
                    courseID = (app.courseID)
                    detail = (app.detail) 
                    section = (app.section)
                    handleDelete()
                  }}>delete</button>
                  </div>
                </td>

                </tr>
              ))
            } */}
          </tbody>
        </table>
    </div>
  )
}

export default Quiz
