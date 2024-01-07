import {useState, useEffect} from 'react'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import "./ClassStyle/ClassEdit.css"

const EditClass = () => {

  const [_id, set_id] = useState('');
  const [classID, setClassID] = useState('');
  const [depID, setDepID] = useState('');
  const [instuctor, setInstructor] = useState('');
  const [section, setSection] = useState([]);
  const [loading, setLoading] = useState('');

  const navigate = useNavigate();
  const {id} = useParams();
  useEffect(()=>{
    setLoading(true)
    axios.get(`http://localhost:5000/classes/${id}`)
    .then((response)=>{
      set_id(response.data._id);
      setClassID(response.data.classID)
      setDepID(response.data.depID)
      setInstructor(response.data.instuctor)
      setLoading(false)
    }).catch((error)=>{
      setLoading(false)
      alert('Error!! Please check Console')
      console.log(error)
    })
  }, []) 
  const handleEditClass = () =>{
    console.log("_id",_id )
    console.log("classID",classID )
    console.log("dean",depID )
    console.log("instructor",instuctor )


    const data = {
      _id,
      classID,
      depID,
      instuctor
    };
    setLoading(true);
    axios
      .put(`http://localhost:5000/classes/${id}`, data)
      .then(() =>{
        setLoading(false);
        navigate('/HomeClass');
      })
      .catch((error)=>{
        setLoading(false);
        alert('An error happend, Please check console')
        console.log(error);
      });
  }
  return (
    <div className='Class-container-Edit'>
      <BackButton/>
      {loading ? <Spinner/>: ''}
      <div className='Class-header-Edit'>
      <h1 className='Class-text-Edit'>Edit Class</h1>
      <div className='underlineEdit'></div>
      </div>
      <form className='class-inputs-edit'>
        
          <label>_ID</label>
          <input className='class-attributes-edit' type='text' value={_id} onChange={(e) => set_id(e.target.value)}/>

          <label>Class ID</label>
          <input className='class-attributes-edit' type='text' value={name} onChange={(e) => setClassID(e.target.value)}/>
        
          <label>Department ID</label>
          <input className='class-attributes-edit' type='text' value={depID} onChange={(e) => setDepID(e.target.value)}/>

          <label>Section</label>
          <input className='class-attributes-edit' type='text' value={section} onChange={(e) => setSection(e.target.value)}/>
        
          <label>instructor</label>
          <input className='class-attributes-edit' type='text' value={instuctor} onChange={(e) => setInstructor(e.target.value)}/>
        <button className='submit-edit' onClick={handleEditClass}>Save</button>
      </form>
    </div>
  )
}

export default EditClass
