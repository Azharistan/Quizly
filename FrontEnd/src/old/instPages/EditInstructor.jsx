import {useState, useEffect} from 'react'
import "../stdPages/stdStyle/EditStudent.css"
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'


const EditInstuctor = () => {
  var token = localStorage.getItem('token')
  var tt = {
    token
  }

  const [_id, set_id] = useState('');
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [department, setDepartment] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  useEffect(()=>{
    axios.post(`http://localhost:5000/api/token`, tt)
    .then((response)=>{
      set_id(response.data.instructor._id);
      setName(response.data.instructor.name)
      setWhatsapp(response.data.instructor.whatsapp)
      setEmail(response.data.instructor.email)
      setPassword(response.data.instructor.password)
      setDepartment(response.data.instructor.department)
    }).catch((error)=>{
      alert('Error!! Please check Console')
      console.log(error)
    })
  }, []) 
  const handleEditInstuctor = () =>{
    const data = {
      _id,
      name,
      whatsapp,
      email,
      password,
      department
    };
    axios
    .put(`http://localhost:5000/instructors/${_id}`, data)
    .then((response) =>{
      if(response.data.token){
        token = response.data.token
        tt = {
          token
        }
        localStorage.setItem('token', response.data.token)
      }else{
        alert('Something went wrong please try again')
      }
      axios.post('http://localhost:5000/api/token', tt)
      .then((res)=>{
        set_id(res.data.instructor._id)
        setName(res.data.instructor.name)
        setWhatsapp(res.data.instructor.whatsapp)
        setEmail(res.data.instructor.email)
        setPassword(res.data.instructor.password)
        setDepartment(res.data.instructor.department)
        navigate('/inspage')
      }).catch((error)=>{
        alert('Error!! Please check Console')
        console.log(error)
      })
    }).catch((error)=>{
      alert('Error Check console')
      console.log(error)
    })
  }
  return (
    <div className="Edit-ContainerSTD">
    <div className='Edit-HeaderSTD'>
      <h1 className='Edit-TextSTD'>Edit Info</h1>
      </div>
      <div className='Edit-InputsSTD'>
        <div className='Edit-InputSTD'>
          <label>Prof ID.</label>
          <input type='text' value={_id} onChange={(e) => set_id(e.target.value)}/>
        </div>
        <div className='Edit-InputSTD'>
          <label>Name</label>
          <input type='text' value={name} onChange={(e) => setName(e.target.value)}/>
        </div>
        <div className='Edit-InputSTD'>
          <label>Department</label>
          <input type='text' value={department} onChange={(e) => setDepartment(e.target.value)}/>
        </div>
        <div className='Edit-InputSTD'>
          <label>whatsapp</label>
          <input type='text' value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)}/>
        </div>
        <div className='Edit-InputSTD'>
          <label>Email</label>
          <input type='text' value={email} onChange={(e) => setEmail(e.target.value)}/>
        </div>
        
        <div>
        <button className='Edit-SubmitButton' onClick={handleEditInstuctor}>Save</button>
        </div>
      </div>
    </div>
  )
}

export default EditInstuctor
