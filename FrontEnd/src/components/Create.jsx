import "./style/Home.css";
 
const Create=() => {
  return (
    <div>
        <div className="StuContainer">
        <a href="/students"  className="Stubutton">
            Student
        </a>
        </div>
        <div className="InsContainer">
        <a href="/Instructors" className="InsButton">
            Instructor
        </a>
        </div>
        <div className="InsContainer">
        <a href="/Departments" className="InsButton">
            Department
        </a>
        </div>
        <div className="InsContainer">
        <a href="/Courses" className="InsButton">
            Course
        </a>
        </div>
        <div className="InsContainer">
        <a href="/Classes" className="InsButton">
            Class
        </a>
        </div>
        <div>
        
        
        </div>
    </div>
  )
}

export default Create;
