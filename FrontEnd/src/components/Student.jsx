import "./style/Student.css";
import { Link } from "react-router-dom";

const Student = () => {
  return (
    <div className='container'>
        <div className='header'>
            <div className='text'> Student Registration</div>
            <div className='underline'></div>
        </div>
        <div className='inputs'>
            <div className='input'>
                <input type='text' placeholder="Name"/>
            </div>
            <div className='input'>
                <input type='text' placeholder="Registration Number"/>
            </div>
            <div className='input'>
                <input type='email' placeholder="Email"/>
            </div>
            <div className='input'>
                <input type='text' placeholder="WhatsApp Number"/>
            </div>
            <div className='input'>
                <input type='number' placeholder="Semester"/>
            </div>
            <div className='input'>
                <input type='password' placeholder="Password"/>
            </div>
        </div>
        <Link>
        <div className='submit-container'>
            <div className='submit'>Register</div>
        </div>
        </Link>
    </div>
  )
}

export default Student;