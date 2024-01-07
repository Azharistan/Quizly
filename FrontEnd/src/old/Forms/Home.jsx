import "./components/Style/Home.css";
 
const Home=() => {
  return (
    <div>
        <div className="StuContainer">
        <a href="/Student"  className="Stubutton">
            Student
        </a>
        </div>
        <div className="InsContainer">
        <a href="/Instructor" className="InsButton">
            Instructor
        </a>
        </div>
        <div className="InsContainer">
        <a href="/Department" className="InsButton">
            Department
        </a>
        </div>
        <div className="InsContainer">
        <a href="/Course" className="InsButton">
            Course
        </a>
        </div>
        <div className="InsContainer">
        <a href="/Class" className="InsButton">
            Class
        </a>
        </div>
        <div>
        
        
        </div>
    </div>
  )
}

export default Home;
