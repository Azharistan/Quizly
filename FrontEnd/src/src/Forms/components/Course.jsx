import "./style/Course.css";
import { Link } from "react-router-dom";

const Course = () => {
  return (
    <div className='container'>
        <div className='header'>
            <div className='text'> Course Registration</div>
            <div className='underline'></div>
        </div>
        <div className='inputs'>
            <div className='input'>
                <input type='text' placeholder="Name"/>
            </div>
            <div className='input'>
                <input type='text' placeholder="Course ID"/>
            </div>
            <div className='input'>
                <input type='text' placeholder="Credit hours"/>
            </div>
            <div className='input'>
                <input type='text' placeholder="Department ID"/>
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

export default Course;