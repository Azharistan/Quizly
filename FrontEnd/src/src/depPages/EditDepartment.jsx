import {useState, useEffect} from 'react'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const EditDepartment = () => {

  const [_id, set_id] = useState('');
  const [name, setName] = useState('');
  const [dean, setDean] = useState('');
  const [hod, setHOD] = useState('');
  const [loading, setLoading] = useState('');

  const navigate = useNavigate();
  const {id} = useParams();
  useEffect(()=>{
    setLoading(true)
    axios.get(`http://localhost:5000/departments/${id}`)
    .then((response)=>{
      set_id(response.data._id);
      setName(response.data.name)
      setDean(response.data.dean)
      setHOD(response.data.hod)
      setLoading(false)
    }).catch((error)=>{
      setLoading(false)
      alert('Error!! Please check Console')
      console.log(error)
    })
  }, []) 
  const handleEditDepartment = () =>{
    console.log("_id",_id )
    console.log("name",name )
    console.log("dean",dean )
    console.log("hod",hod )


    const data = {
      _id,
      name,
      dean,
      hod
    };
    setLoading(true);
    axios
      .put(`http://localhost:5000/departments/${id}`, data)
      .then(() =>{
        setLoading(false);
        navigate('/HomeDep');
      })
      .catch((error)=>{
        setLoading(false);
        alert('An error happend, Please check console')
        console.log(error);
      });
  }
  return (
    <div>
      <BackButton/>
      {loading ? <Spinner/>: ''}

      <h1 className='text-3xl'>Edit Department</h1>
      <div>
        <div>
          <label>Department ID</label>
          <input type='text' value={_id} onChange={(e) => set_id(e.target.value)}/>
        </div>
        <div>
          <label>Name</label>
          <input type='text' value={name} onChange={(e) => setName(e.target.value)}/>
        </div>
        <div>
          <label>Dean</label>
          <input type='text' value={dean} onChange={(e) => setDean(e.target.value)}/>
        </div>
        <div>
          <label>H.O.D</label>
          <input type='text' value={hod} onChange={(e) => setHOD(e.target.value)}/>
        </div>
        <button onClick={handleEditDepartment}>Save</button>
      </div>
    </div>
  )
}

export default EditDepartment
