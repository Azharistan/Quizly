import { Link } from "react-router-dom";
import "./Style/Home.css";
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
            window.location.href = ('http://localhost:5173/')
        }else{
            axios.post('http://localhost:5000/api/token', data)
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
        window.location.href = ('http://localhost:5173/')
    }

  return (
    <div className="StuContainer">
        <h1>Welcome {prof? prof.name:''}</h1>
        <Link to = {prof? `/instructors/info`: '/insPage'} className="Stubutton">                         
                View profile
            </Link>

            <Link to = {prof? `/instructors/edit`: '/insPage'} className="Stubutton">                         
                Edit Profile
            </Link>
            <Link to = {prof? `/classes/create`: '/insPage'} className="Stubutton">                         
            Create Class
            </Link>
            <Link to = {prof? `/insclasses`: '/insPage'} className="Stubutton">                         
            Classes
            </Link>
        
        <a href="" className="InsButton">
            Quizes
        </a>
        <a href="/login" className="InsButton" onClick={handleLogout}>
            logout
        </a>
    </div>
  )
}

export default InsPage;
