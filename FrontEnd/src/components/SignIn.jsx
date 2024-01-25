import axios from "axios"
import objectHash from "object-hash"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const SignIn = () => {
    const [id, setID] = useState('')
    const [pass, setPass] = useState('')
    const [checked, setChecked] =useState(true) 

    const Navigate = useNavigate()
    const handleLogin = () =>{
        event.preventDefault()
        if(id.includes("BCS")){

            axios.get(`https://quizly-nine.vercel.app/students/${id}`)
            .then((response)=>{
                if(objectHash.MD5(pass)==response.data.password)
                {Navigate('https://quizly-frontend.vercel.app/students')}
                else{
                    alert('ID or Password may be incorrect')
                }
            }).catch((error)=>{
                alert('ID or Password may be incorrect')
                console.log("This is an error", error)
            })
        }
        else if(id.includes("PROF")){
            axios.get(`https://quizly-nine.vercel.app/instructors/${id}`)
            .then((response)=>{
                if(objectHash.MD5(pass)==response.data.password)
                {Navigate('https://quizly-frontend.vercel.app/instructors')}
                else{
                    alert('ID or Password may be incorrect')
                }
            }).catch((error)=>{
                alert('ID or Password may be incorrect')
                console.log("This is an error", error)
            })
        }
    }
    return (
<>


    <div>
      <label>ID</label>
      <input value={id.toUpperCase()} type='text' onChange={(e)=> setID((e.target.value))} />
    </div>
        
    <div>
      <label>Password</label>
      <input value={pass} type={checked ? 'text' :'password'} onChange={(e)=> setPass(e.target.value)} />
      <input value={checked} type="checkbox" name="checked"/>
    </div>
    <button onClick={handleLogin}>Login</button>
</>
  )
}

export default SignIn
