import {useState, useEffect} from 'react'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const EditCourse = () => {

  const [_id, set_id] = useState('');
  const [name, setName] = useState('');
  const [depID, setDepID] = useState('');
  const [creditHr, setCreditHr] = useState('');
  const [loading, setLoading] = useState('');

  const navigate = useNavigate();
  const {id} = useParams();
  useEffect(()=>{
    setLoading(true)
    axios.get(`http://localhost:5000/courses/${id}`)
    .then((response)=>{
      set_id(response.data._id);
      setName(response.data.name)
      setDepID(response.data.depID)
      setCreditHr(response.data.creditHr)
      setLoading(false)
    }).catch((error)=>{
      setLoading(false)
      alert('Error!! Please check Console')
      console.log(error)
    })
  }, []) 
  const handleEditCourse = () =>{
    const data = {
      _id,
      name,
      depID,
      creditHr
    };
    setLoading(true);
    axios
      .put(`http://localhost:5000/courses/${id}`, data)
      .then(() =>{
        setLoading(false);
        navigate('/Courses');
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

      <h1 className='text-3xl'>Edit Courses</h1>
      <div>
        <div>
          <label>Course ID</label>
          <input type='text' value={_id} onChange={(e) => set_id(e.target.value)}/>
        </div>
        <div>
          <label>Name</label>
          <input type='text' value={name} onChange={(e) => setName(e.target.value)}/>
        </div>
        <div>
          <label>Dean</label>
          <input type='text' value={depID} onChange={(e) => setDepID(e.target.value)}/>
        </div>
        <div>
          <label>Credit Hours</label>
          <input type='text' value={creditHr} onChange={(e) => setCreditHr(e.target.value)}/>
        </div>
        <button onClick={handleEditCourse}>Save</button>
      </div>
    </div>
  )
}

export default EditCourse
