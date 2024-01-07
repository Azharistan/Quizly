import {useState} from 'react'
import BackButton from '../components/BackButton'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner'


const CreateDepartment = () => {

  const [_id, set_id] = useState('');
  const [name, setName] = useState('');
  const [dean, setDean] = useState('');
  const [hod, setHOD] = useState('');
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate();
  const handleSaveDepartment = () =>{

    axios.get(`http://localhost:5000/departments/${_id}`)
    .then((response)=>{
      if(response.data)
      return alert(`A Department with department ID: ${_id} already exist`)
    }).catch()


    const data = {
      _id,
      name,
      dean,
      hod
    };
    setLoading(true);
    axios
      .post('http://localhost:5000/departments', data)
      .then(() =>{
        setLoading(false);
        navigate('/departments');
      })
      .catch((error)=>{
        setLoading(false);
        alert('An error happend, Please check console')
        console.log(error);
      });
  }
  return (
    <>

  {(loading)? <Spinner/> : ""}
  <div className='Create-containerStd'>
    <div className='headerStd'>
      <div className='textStd'> Create Department</div>
      <div className='underlineStd'></div>
    </div>
    <div className='inputsStd'>
      <div className='inputStd'>
        <input placeholder='Department ID' type='text' value={_id} onChange={(e) => set_id((e.target.value).toUpperCase())}/>
      </div>
      <div className='inputStd'>
        <input placeholder='Name' type='text' value={name} onChange={(e) => setName(e.target.value)}/>
      </div>
      <div className='inputStd'>
        <input placeholder='Dean' type='text' value={dean.toUpperCase()} onChange={(e) => setDean((e.target.value).toUpperCase())}/>
      </div>
      <div className='inputStd'>
        <input placeholder='H.O.D' type='text' value={hod.toUpperCase()} onChange={(e) => setHOD((e.target.value).toUpperCase())}/>
      </div>
      <button className='submitStd' onClick={handleSaveDepartment}>Save</button>
    </div>
  </div>
    </>
  )
}

export default CreateDepartment
