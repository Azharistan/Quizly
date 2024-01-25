import {useEffect, useState} from 'react'
import axios from 'axios';
const Request = () => {

  const [approval, setApproval] = useState([])
  const [run, setRun] = useState(false)
  var from
  var section
  var detail
  var courseID
  var to;

  const handleDelete = () =>{
    const apprv = {
    from,
    detail, 
    section, 
    courseID
    }
    console.log(apprv)
    axios.post(`https://quizly-nine.vercel.app/api/request`, apprv)
    .then((response)=>{
        console.log(response.data.ID)
        axios.delete(`https://quizly-nine.vercel.app/approvals/${response.data.ID}`)
        .then(()=>{
            console.log('deleted')
            window.location.href = ('https://quizly-frontend.vercel.app/request')
        }).catch((error)=>{
            console.log(error)
        })
    })
    setRun(!run)
  }


  const handleAccept =()=>{
    event.preventDefault()
    if(from.includes('PROF')){
      const instructor = from
      const data = {
        instructor,
        courseID,
        section
      }
      axios.post('https://quizly-nine.vercel.app/classes', data)
        .then(()=>{
          console.log("Class Created")
          const apprv = {
            from,
            detail, 
            section, 
            courseID
          }
          console.log(apprv)
          axios.post(`https://quizly-nine.vercel.app/api/request`, apprv)
          .then((response)=>{
            console.log(response.data.ID)
            handleDelete()
          })
        }).catch((error)=>{
          console.log(error);
        })
    }else{
      const data = {
        from,
        to,
        courseID,
        section
      }

      axios.post('https://quizly-nine.vercel.app/api/joinClass', data)
        .then((response)=>{
          console.log(response.status)
          const apprv = {
            from,
            detail, 
            section, 
            courseID
          }
          console.log(apprv)
          axios.post(`https://quizly-nine.vercel.app/api/request`, apprv)
          .then((response)=>{
            console.log(response.data.ID)
            axios.delete(`https://quizly-nine.vercel.app/approvals/${response.data.ID}`)
            .then(()=>{
              console.log('deleted')
              window.location.href = ('https://quizly-frontend.vercel.app/request')
            }).catch((error)=>{
              console.log(error)
            })
          })
        })
      
    }

  }

  useEffect(()=>{
    console.log("in loop")
    axios
      .get('https://quizly-nine.vercel.app/approvals')
      .then((response) =>{ 
        console.log(response.data)
        setApproval(response.data.approvals)
      })
      .catch((error)=>{
        console.log(error);
      })
  }, [run])
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
            {
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

                  <button onClick={(event)=>{
                    from = (app.from)
                    courseID = (app.courseID)
                    detail = (app.detail) 
                    section = (app.section)
                    handleDelete(event)
                  }}>delete</button>
                  </div>
                </td>

                </tr>
              ))
            }
          </tbody>
        </table>
    </div>
  )
}

export default Request
