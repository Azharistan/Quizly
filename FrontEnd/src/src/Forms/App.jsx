import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Student from "./components/Student";
import Instructor from "./components/Instructor";
import Department from "./components/Department";
import Course from "./components/Course";
import Class from "./components/Class";

import testlogin from "../components/testlogin";

function App() {
  return (
    <div>
    
      <Routes>
        <Route exact path="/lol" element={<testlogin/>} />
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/Student" element={<Student/>} />
        <Route exact path="/Instructor" element={<Instructor/>} />
        <Route exact path="/Department" element={<Department/>} />
        <Route exact path="/Course" element={<Course/>} />
        <Route exact path="/Class" element={<Class/>} />
      </Routes>
    </div>
  );
}

export default App;
