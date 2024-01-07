import {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import "./stdStyle/Student.css"
import validator from 'validator'



const CreateStudent = () => {

  const [_id, set_id] = useState('');
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [semester, setSemester] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSaveStudent = () =>{
    
    if(_id.length!=9)
    {
      return alert("Invalid Registraion No.")
    }
    
    axios.get(`http://localhost:5000/students/${_id}`)
    .then((response)=>{
      console.log("Data",response.data,"End")
      if(response.data)
      return alert(`A Student with registration No.: ${_id} already exist`)
    }).catch((error)=>{
      alert('An error occur. Please try again')
      console.log(error)
    })

    if(!validator.isEmail(email)){
      return alert("Invalid Email")
    }
    if(!validator.isStrongPassword(password)){
      
      return alert("Password is not strong")
    }
    if(semester<1||semester>10){
      return alert("semester Should be 1-10")
    }
    const data = {
      _id,
      name,
      whatsapp,
      email,
      password,
      semester
    };
    
    axios
      .post('http://localhost:5000/students', data)
      .then(() =>{
        console.log(data)
        navigate('/login');
      })
      .catch((error)=>{
        console.log(data)
        alert('An error happend, Please check console')
        console.log(error);
      })
  }
  return (
    <div className='Create-containerStd'>
        <div className='headerStd'>
            <div className='textStd'> Student Registration</div>
            <div className='underlineStd'></div>
        </div>
        <div className='inputsStd'>
            <div className='inputStd'>
                <input type='text' placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)} />
            </div>
            <div className='inputStd'>
                <input type='text' placeholder="Reg No" value={_id.toUpperCase()} onChange={(e)=>set_id(e.target.value)}/>
            </div>
            <div className='inputStd'>
                <input type='email' placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            </div>
            <div className='inputStd'>
                <input type='text' placeholder="Whatsapp No" value={whatsapp} onChange={(e)=>setWhatsapp(e.target.value)}/>
            </div>
            <div className='inputStd semester'>
                <input type='number' min="1" max="10" placeholder="Semester" value={semester} onChange={(e)=>setSemester(e.target.value)}/>
            </div>
            <div className='inputStd'>
                <input type='password' placeholder="Password" minLength="8" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            </div>
        </div>
        <button className='submitStd' onClick={handleSaveStudent}>Sign Up</button>
    </div>
  )
}

export default CreateStudent
