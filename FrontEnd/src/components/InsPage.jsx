import { Link } from "react-router-dom";
import "./style/Home.css";
import axios from "axios";
import { useEffect, useState } from "react";
 
const InsPage=() => {
    const [prof, setProf] = useState()
    const token = localStorage.getItem('token')
    const data = {
        token
    }
    useEffect(()=>{
        if(!token){
            alert('You are not logged in')
            window.location.href = ('https://quizly-frontend.vercel.app/login')
        }else{
            axios.post('https://quizly-nine.vercel.app/api/token', data)
            .then((response)=>{
                if(response.data.status === 'ok'){
                    setProf(response.data.instructor)
                }
            }).catch((error)=>{
                console.log(error)
            })
        }
    },[])
    
    function handleLogout(){
        localStorage.removeItem('token')
        window.location.href = ('https://quizly-frontend.vercel.app/')
    }

  return (
    <div className="StuContainer">
        <h1>Welcome {prof? prof.name:''}</h1>
        <Link to = {prof? `https://quizly-frontend.vercel.app/instructors/info`: 'https://quizly-frontend.vercel.app/insPage'} className="Stubutton">                         
                View profile
            </Link>

            <Link to = {prof? `https://quizly-frontend.vercel.app/instructors/edit`: 'https://quizly-frontend.vercel.app/insPage'} className="Stubutton">                         
                Edit Profile
            </Link>
            <Link to = {prof? `https://quizly-frontend.vercel.app/classes/create`: 'https://quizly-frontend.vercel.app/insPage'} className="Stubutton">                         
            Create Class
            </Link>
            <Link to = {prof? `https://quizly-frontend.vercel.app/insclasses`: 'https://quizly-frontend.vercel.app/insPage'} className="Stubutton">                         
            Classes
            </Link>
            <Link to = {prof? `https://quizly-frontend.vercel.app/QuizList`: 'https://quizly-frontend.vercel.app/insPage'} className="Stubutton">                         
            Quizes
            </Link>
            
        <a className="InsButton" onClick={handleLogout}>
            logout
        </a>
    </div>
  )
}

export default InsPage;
