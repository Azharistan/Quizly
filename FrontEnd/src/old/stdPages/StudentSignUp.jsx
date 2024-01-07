import "../components/style/Student.css";
import {useState} from 'react'
import BackButton from '../components/BackButton'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import objectHash from 'object-hash'
import { Link } from "react-router-dom";

const StudentSignUp = () => {
    
  const [_id, set_id] = useState('');
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [semester, setSemester] = useState('');
  const [email, setEmail] = useState('');
  var [password, setPassword] = useState('');
  const [loading, setLoading] = useState('');

  const navigate = useNavigate();
  const handleSaveStudent = () =>{

    password = objectHash.MD5(password)
    const data = {
      _id,
      name,
      whatsapp,
      email,
      password,
      semester
    };
    setLoading(true);
    axios
      .post('http://localhost:5000/students', data)
      .then(() =>{
        setLoading(false);
        navigate('/');
      })
      .catch((error)=>{
        setLoading(false);
        alert('Please Fill all fields')
        console.log(error);
      });
  }
  return (
    <div className='containerStd'>
        <div className='headerStd'>
            <div className='textStd'> Student Registration</div>
            <div className='underlineStd'></div>
        </div>
        <div className='inputsStd'>
            <div className='inputStd'>
                <input type='text' placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)} />
            </div>
            <div className='inputStd'>
                <input type='text' placeholder="Reg No" value={_id} onChange={(e)=>set_id(e.target.value)}/>
            </div>
            <div className='inputStd'>
                <input type='email' placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            </div>
            <div className='inputStd'>
                <input type='text' placeholder="Whatsapp No" value={whatsapp} onChange={(e)=>setWhatsapp(e.target.value)}/>
            </div>
            <div className='inputStd'>
                <input type='text' placeholder="Semester" value={semester} onChange={(e)=>setSemester(e.target.value)}/>
            </div>
            <div className='inputStd'>
                <input type='password' placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            </div>
        </div>
        <button className='submit-containerStd submitStd' onClick={handleSaveStudent}>Save</button>
    </div>
  )
}

export default StudentSignUp;