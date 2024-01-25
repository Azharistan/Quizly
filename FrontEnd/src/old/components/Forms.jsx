import "./style/Forms.css";
import { useState } from "react";

import person_icon from '../Assets/person.png';
import password_icon from '../assets/password.png';
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LogIn(){
const [_id, setID] = useState('')
const [password, setPass] = useState('')

const Navigate = useNavigate()

async function handleLogin(event){

    event.preventDefault()

    const body = {
        _id,
        password
    }
axios.post('https://quizly-nine.vercel.app/api/login', body)
.then((response)=>{
    if(response.data.status === 'ok'){
        localStorage.setItem('token', response.data.token)
        if(_id.includes("PROF")){
            Navigate('/inspage')
        }else if(_id.includes("ADM")){
            Navigate('/create')
        }else{
            Navigate('/StdPage')    
        }
    }else{
        alert('please check id or password')
    }
}).catch((error)=>{
    console.log(error)
})

}
  return (
    <div className='container'>
        <div className='header'>
            <div className='text'> Log In</div>
            <div className='underline'></div>
        </div>
        <form onSubmit={handleLogin}>
        <div className='inputs'>
            <div className='input'>
                <img src={person_icon}/>
                <input type='text' placeholder="ID"value={_id.toUpperCase()} autoCapitalize="off" onChange={(f)=> setID(f.target.value)}/>
            </div>
            <div className='input'>
                <img src={password_icon}/>
                <input type='password' placeholder="Password" value={password} autoCapitalize="off" onChange={(f)=> setPass(f.target.value)}/>
            </div>
        </div>
        </form>
        <div className='forgot-password'>Forgot Password? <span>Click Here</span></div>
        <div className='submit-container'>
            <button className="submit" onClick={ handleLogin}>Login</button>
        </div>
    </div>
  )
}

export default LogIn;