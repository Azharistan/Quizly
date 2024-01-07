import "./style/Instructor.css";
import { Link } from "react-router-dom";

const Instructor = () => {
  return (
    <div className='container'>
        <div className='header'>
            <div className='text'> Instructor Registration</div>
            <div className='underline'></div>
        </div>
        <div className='inputs'>
            <div className='input'>
                <input type='text' placeholder="Name"/>
            </div>
            <div className='input'>
                <input type='text' placeholder="Professor ID"/>
            </div>
            <div className='input'>
                <input type='email' placeholder="Email"/>
            </div>
            <div className='input'>
                <input type='text' placeholder="Department ID"/>
            </div>
            <div className='input'>
                <input type='text' placeholder="C#"/>
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

export default Instructor;