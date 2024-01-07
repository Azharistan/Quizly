import {useEffect, useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import validator from 'validator'




const CreateInstructor = () => {

  const [_id, set_id] = useState('');
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [department, setDepartment] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [departments, setDepartments] = useState([]);

  const navigate = useNavigate();
  useEffect(()=>{
    axios
      .get('http://localhost:5000/departments')
      .then((response) =>{ 
        setDepartments(response.data.dep)
        console.log(response.data)
      })
      .catch((error)=>{
        console.log(error);
      })

  },[])

  const handleSaveInstructor = () =>{

    if(_id.length!=7)
    {
      return alert("Invalid ProFID")
    }

    axios.get(`http://localhost:5000/instructors/${_id}`)
    .then((response)=>{
      if(response.data)
      return alert(`An instructor with ProfID: ${_id} already exist`)
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

    const data = {
      _id,
      name,
      whatsapp,
      department,
      email,
      password
    };
    axios
      .post('http://localhost:5000/instructors', data)
      .then(() =>{
        navigate('/login');
      })
      .catch((error)=>{
        alert('An error happend, Please check console')
        console.log(error);
      });
  }
  return (
    <div>
  <div className='Create-containerStd'>
    <div className='headerStd'>
      <div className='textStd'> Instructor Registration</div>
      <div className='underlineStd'></div>
    </div>
      <div className='inputsStd' >
        <div className='inputStd'>
          <input placeholder='ProfID' type='text' value={ _id.toUpperCase()} onChange={(e) => set_id(e.target.value)}/>
        </div>
        <div className='inputStd'>
          <input placeholder='Name' type='text' value={name} onChange={(e) => setName(e.target.value)}/>
        </div>
        <label>Select Department:</label>
        <div className='Course-Button'>
          <select onChange={(e) => setDepartment(e.target.value)}>
            <option  className='' value='0' defaultChecked disabled>
            Choose a department
            </option>
            {departments.map((dep) => (
              <option onChange={(e) => setDepartment(e.target.value)} key={dep._id} value={dep._id}>
                {dep.name}
              </option>                
              ))}
          </select>
        </div>
        <div className='inputStd'>
          <input placeholder='WhatsApp' type='text' value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)}/>
        </div>
        <div  className='inputStd'>
          <input placeholder='Email' type='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div  className='inputStd'>
          <input placeholder='Password' type='password' value={password} onChange={(e) => setPassword((e.target.value))}/>
        </div>
        <button className='submitStd' onClick={handleSaveInstructor}>Save</button>
      </div>
    </div>
  </div>
  )
}

export default CreateInstructor
