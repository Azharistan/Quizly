import "./style/Department.css";
import { Link } from "react-router-dom";

const Department = () => {
  return (
    <div className='container'>
        <div className='header'>
            <div className='text'> Department Registration</div>
            <div className='underline'></div>
        </div>
        <div className='inputs'>
            <div className='input'>
                <input type='text' placeholder="Name"/>
            </div>
            <div className='input'>
                <input type='text' placeholder="Department ID"/>
            </div>
            <div className='input'>
                <input type='text' placeholder="Dean of deparment"/>
            </div>
            <div className='input'>
                <input type='text' placeholder="Head of Department"/>
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

export default Department;