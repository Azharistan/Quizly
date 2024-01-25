import { Link, Navigate } from "react-router-dom";
import "./style/Home.css";
import axios from "axios";
import { useEffect, useState } from "react";
 
const StdPage=() => {

    const [std, setStd] = useState()
        const token = localStorage.getItem('token')
        const data = {
            token
        }
        useEffect(()=>{
            if(!token){          
                alert('you are not logged in')
                window.location.href = ('https://quizly-frontend.vercel.app/')
            }else{
                axios.post('https://quizly-nine.vercel.app/api/token', data)
                .then((response)=>{
                    if(response.data.status === 'ok'){
                        setStd(response.data.student)
                    }
                }).catch((error)=>{
                    console.log(error)
                })
                // console.dir(typeof(std))
                // console.log(std)
                // console.log('Wellcome ', std.name)
            }
        },[])
        
        function handleLogout (){
            localStorage.removeItem('token')
            window.location.href = ('https://quizly-frontend.vercel.app')
    }
    
  return (
        <div className="StuContainer">
        <h1>Wellcome {std? std.name:''}</h1>
        
            <Link to = {std? `https://quizly-frontend.vercel.app/students/info`: 'https://quizly-frontend.vercel.app/StdPage'} className="Stubutton">                         
                View Profile
            </Link>

            <Link to = {std? `https://quizly-frontend.vercel.app/students/edit`: 'https://quizly-frontend.vercel.app/StdPage'} className="Stubutton">                         
                Edit Profile
            </Link>
            <Link to = {std? `https://quizly-frontend.vercel.app/joinClass`: 'https://quizly-frontend.vercel.app/StdPage'} className="Stubutton">                         
                Join Class
            </Link>
        
        <a href="" className="InsButton">
            View Results
        </a>
        <Link to = {std? `https://quizly-frontend.vercel.app/JoinedClasses`: 'https://quizly-frontend.vercel.app/StdPage'} className="Stubutton">      
            Classes
        </Link>
        <a href="https://quizly-frontend.vercel.app/" className="InsButton" onClick={handleLogout}>
            logout
        </a>
        </div>
  )
}

export default StdPage;
