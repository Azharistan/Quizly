import {useEffect, useState} from 'react'
import axios from 'axios';
const Quiz = () => {
  
  const [prof, setProf] = useState()
  const [classes, setClasses] = useState([])
  const [quiz, setQuiz] = useState()
  var qq=[]
  const token = localStorage.getItem('token')
  const  getQuiz = (quiz)=>{
    axios.get(`http://localhost:5000/quizes/${quiz}`)
    .then((response)=>{
      console.log(response.data)
      setQuiz(response.data)
      return response.data
    }).catch((error) => {
      console.error('Error fetching quiz:', error);
      throw error; // You might want to handle the error according to your app logic
    });
  }
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
                    setClasses(res.data.class1)
                    return(res.data.class1)
                }).then((res)=>{
                  console.log(res)
                  res.forEach(Class => {
                    if(Class.quizList.length != 0){
                      console.log('Class', Class.quizList.length)
                      Class.quizList.forEach(q => {
                        axios.get(`http://localhost:5000/quizes/${q}`)
                        .then((res)=>{
                          qq.push(res.data)
                        })
                      });
                      console.log('Quizzes',qq)
                      setQuiz(qq)
                    }
                  });
                }).then(()=>{
                  console.log('Quiz = ',quiz)
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
        <h1>Quiz List</h1>
        <div className='STD-underline'></div>        
      </div>
        <table className='table-container'>
          <thead  className='StdHeadings'>
          <tr>
            <th className='Std-No'>No</th>
            <th className='Std-RegNo'>Course</th>
            <th className='Std-RegNo'>Section</th>
            <th className='Std-Name'>Total Marks</th>
            {/* <th className='Std-Semester'>Course</th>
            <th className='Std-WhatsApp'>Section</th> */}
            <th className='Std-Op'>Operations</th>
          </tr>
          </thead>
          <tbody>
          {
           quiz.map((quizz) => (
              <tr key={quizz._id}>
              
              <td>{quizz._id}</td>
              </tr>
            ))
          }
          </tbody>
        </table>
    </div>
  )
}

export default Quiz
