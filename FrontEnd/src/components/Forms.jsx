import "./style/Forms.css";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import person_icon from '../assets/person.png';
import password_icon from '../assets/password.png';
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LogIn(){
    const [_id, setID] = useState('');
    const [loading, setLoading] = useState(false);
    const [password, setPass] = useState('');
    const [showPassword, setShowPassword] = useState(false);
const Navigate = useNavigate()

useEffect(()=>{
    setLoading(true)
    const token = localStorage.getItem('token')
    if(token){
        
        const data = {
            token
        }

        axios.post('https://quizly-nine.vercel.app/api/token', data)
            .then((response)=>{
                if(response.data.instructor){
                    setLoading(false)
                    window.location.href = ("/inspage")
                }
                else if(response.data.student){
                    setLoading(false)
                    window.location.href = ("/stdpage")
                }
            }).catch((error)=>{
                setLoading(false)

                console.log(error)
            })
        }
    
    console.log(token)

},[])

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

const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin(e);
    }
  };


  return (
    loading?
    <div className='container'>
        <div className='header'>
            <div className='text'> Log In</div>
            <div className='underline'></div>
        </div>
        <form onSubmit={handleLogin}>
        <div className='inputs'>
            <div className='input'>
                <img src={person_icon}/>
                <input type='text' autoFocus placeholder="ID"value={_id.toUpperCase()} autoCapitalize="off"  onChange={(f)=> setID(f.target.value)}/>
            </div>
            <div className='input'>
                <img src={password_icon}/>
                <label>
                <input type={showPassword? 'text':'password'} onKeyPress={handleKeyPress} placeholder="Password" value={password} autoCapitalize="off" onChange={(f)=> setPass(f.target.value)}/>
            </label>
            <button
              type='button'
              onClick={() => setShowPassword(!showPassword)}
              className='eye-icon'
            >
              {showPassword ? (
                <FontAwesomeIcon icon={faEyeSlash} />
              ) : (
                <FontAwesomeIcon icon={faEye} />
              )}
            </button>
            </div>
        </div>
        </form>
        <div className='forgot-password'>Forgot Password? <span>Click Here</span></div>
        <div className='submit-container'>
            <button className="submit" onClick={ handleLogin}>Login</button>
        </div>
    </div> : <div><h1>Please wait</h1></div>
  )
}

export default LogIn;
