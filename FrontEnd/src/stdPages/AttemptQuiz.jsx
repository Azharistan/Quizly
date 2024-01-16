// import { Link, Navigate, useParams } from "react-router-dom";
// import axios from "axios";
// import { useEffect, useState } from "react";
 
// const AttemptQuiz=() => {

//     const [std, setStd] = useState()
//     const [questionList, setQuestionList] = useState([])
//     const [questions, setQuestions] = useState([{
//         statement: '',
//         options : []
//     }])
//     const {id} = useParams()
//         const token = localStorage.getItem('token')
//         const data = {
//             token
//         }
//         useEffect(()=>{
//             if(!token){          
//                 alert('you are not logged in')
//                 window.location.href = ('http://localhost:5173/')
//             }else{
//                 axios.post('http://localhost:5000/api/token', data)
//                 .then((response)=>{
//                     if(response.data.status === 'ok'){
//                         setStd(response.data.student)
//                         return (response.data.student.classes)
//                     }
//                 }).catch((error)=>{
//                     console.log(error)
//                 })
//             }
//         },[])

//         useEffect(() => {
//             axios.get(`http://localhost:5000/quizes/attempt/${id}`)
//             .then((response)=>{
//             console.log(response.data)
//             setQuestionList(response.data.questions)

//             return response.data.questions
//             // }).then((questions)=>{
//             //     questions.forEach(()) => {
//             //         axios.get(`http://localhost:5000/questions/${question}`)
//             //         .then((response)=>{
//             //             console.log(response)
//             //         })
//             //     });
//             // })
//           }, [id]);

        
//         function handleLogout (){
//             localStorage.removeItem('token')
//             window.location.href = ('http://localhost:5173/')
//         }
    
//     return (
//         <div className='STD-Container'>
//           {/* <div>
//             <h1>Quiz List</h1>
//             <div className='STD-underline'></div>        
//           </div>
//             <table className='table-container'>
//               <thead  className='StdHeadings'>
//               <tr>
//                 <th className='center Std-No'>Sr. No.</th>
//                 <th className='center Std-RegNo'>Course</th>
//                 <th className='center Std-RegNo'>Section</th>
//                 <th className='center Std-RegNo'>Quiz N0.</th>
//                 <th className='center Std-Name'>Published Date</th>
//                 <th className='center Std-Name'>Published Time</th>
//                 <th className='center Std-Op'>Operations</th>
//               </tr>
//               </thead>
//               <tbody>
//               {
//                 quizList?
                
//                 quizList.map((q, index)=>(
//                   <tr key={index}>
//                     <td className='center'>{index+1}</td>
//                     <td className='center'>{q.courseID}</td>
//                     <td className='center'>{q.section}</td>
//                     <td className='center'>{q.quizNo}</td>
//                     <td className='center'>{q.updatedAt.slice(0,10)}</td>
//                     <td className='center'>{q.updatedAt.substring(11,19 )}</td>
//                     <td>
//                       {
//                         q.published? 
//                           <button disabled>published</button>:
//                           <button onClick={()=>{
//                             }
//                           }>publish</button>
//                       }
                    
//                       <button onClick={()=>{
//                           console.log(q)
//                         }
//                       }>View</button>
                    
//                     </td>
//                   </tr>
//                 )): <tr><td>No data found</td></tr>
                
//               }
//               </tbody>
//             </table> */}
//         </div>
//       )
//     }

// export default AttemptQuiz;
