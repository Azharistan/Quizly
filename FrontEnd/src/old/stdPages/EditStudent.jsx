import {useState, useEffect} from 'react'
import "./stdStyle/EditStudent.css"
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


const EditStudent = () => {
  var token = localStorage.getItem('token')
  var tt = {
    token
  }

  const [_id, set_id] = useState('');
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [semester, setSemester] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  useEffect(()=>{
    axios.post(`http://localhost:5000/api/token`, tt)
    .then((response)=>{
      set_id(response.data.student._id);
      setName(response.data.student.name)
      setWhatsapp(response.data.student.whatsapp)
      setEmail(response.data.student.email)
      setPassword(response.data.student.password)
      setSemester(response.data.student.semester)
    }).catch((error)=>{
      alert('Error!! Please check Console')
      console.log(error)
    })
  }, []) 
  function handleEditStudent(){
    const data = {
      _id,
      name,
      whatsapp,
      email,
      password,
      semester
    };
      axios
      .put(`http://localhost:5000/students/${_id}`, data)
      .then((response)=>{
        if(response.data.token){
        token = response.data.token
        tt = {
          token
        }
        localStorage.setItem('token', response.data.token)
      }else{
          alert('Something went wrong please try again')
        }
        axios.post(`http://localhost:5000/api/token`, tt)
        .then((res)=>{
          set_id(res.data.student._id);
          setName(res.data.student.name)
          setWhatsapp(res.data.student.whatsapp)
          setEmail(res.data.student.email)
          setPassword(res.data.student.password)
          setSemester(res.data.student.semester)
          navigate('/stdpage')
        }).catch((error)=>{
          alert('Error!! Please check Console')
          console.log(error)
        })
      }).catch((error)=>{
        alert('Error!! Please check Console')
        console.log(error)
      })
  }
  return (
    <div className="Edit-ContainerSTD">
    <div className='Edit-HeaderSTD'>
      <h1 className='Edit-TextSTD'>Edit Student</h1>
      </div>
      <div className='Edit-InputsSTD'>
        <div className='Edit-InputSTD'>
          <label>Reg no.</label>
          <input type='text' value={_id} onChange={(e) => set_id(e.target.value)}/>
        </div>
        <div className='Edit-InputSTD'>
          <label>Name</label>
          <input type='text' value={name} onChange={(e) => setName(e.target.value)}/>
        </div>
        <div className='Edit-InputSTD'>
          <label>Semester</label>
          <input type='text' value={semester} onChange={(e) => setSemester(e.target.value)}/>
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
        <button className='Edit-SubmitButton' onClick={handleEditStudent}>Save</button>
        </div>
      </div>
    </div>
  )
}

export default EditStudent
