import "./style/Class.css";
import { Link } from "react-router-dom";

const Class = () => {
  return (
    <div className='container'>
        <div className='header'>
            <div className='text'> Class Registration</div>
            <div className='underline'></div>
        </div>
        <div className='inputs'>
            <div className='input'>
                <input type='text' placeholder="Couse ID"/>
            </div>
            <div className='input'>
                <input type='text' placeholder="Department ID"/>
            </div>
            <div className='input'>
                <input type='text' placeholder="Section"/>
            </div>
            <div className='input'>
                <input type='text' placeholder="Student List"/>
            </div>
            <div className='input'>
                <input type='text' placeholder="Instructor"/>
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

export default Class;