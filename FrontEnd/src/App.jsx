import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//student Actions

import Home from "./stdPages/Home";
import CreateStudent from "./stdPages/CreateStudent.jsx";
import ShowStudent from "./stdPages/ShowStudent";
import EditStudent from "./stdPages/EditStudent";
import DeleteStudent from "./stdPages/DeleteStudent";
import StudentSignUp from "./stdPages/StudentSignUp.jsx";
import AttemptQuiz from "./stdPages/AttemptQuiz.jsx";

//Instructor Actions

import HomeIns from "./instPages/HomeIns.jsx";
import CreateInstructor from "./instPages/CreateInstructor";
import DeleteInstuctor from "./instPages/DeleteInstructor";
import EditInstuctor from "./instPages/EditInstructor";
import ShowInstuctor from "./instPages/ShowInstructor";

//Department Actions

import HomeDep from "./depPages/HomeDep";
import CreateDepartment from "./depPages/CreateDepartment";
import DeleteDepartment from "./depPages/DeleteDepartment";
import EditDepartment from "./depPages/EditDepartment";
import ShowDepartment from "./depPages/ShowDepartment";

//Course Actions

import HomeCrs from "./CrsPages/HomeCrs";
import CreateCourse from "./CrsPages/CreateCourse";
import DeleteCourse from "./CrsPages/DeleteCourse";
import EditCourse from "./CrsPages/EditCourse";
import ShowCourses from "./CrsPages/ShowCourses";

//Class Actions

import ClassHome from "./ClassPages/ClassHome.jsx"
import CreateClass from "./ClassPages/CreateClass.jsx"
import DeleteClass from "./ClassPages/DeleteClass.jsx"
import EditClass from "./ClassPages/EditClass.jsx"
import ShowClass from "./ClassPages/ShowClass.jsx"

import LogIn from "./components/Forms.jsx";

import StdPage from "./components/StdPage.jsx";
import InsPage from "./components/InsPage.jsx";
import JoinClass from "./components/JoinClass.jsx";


import Admin from "./components/Admin.jsx";
import Create from "./components/Create";

import Testlogin from "./components/testlogin.jsx";

import Request from "./components/request.jsx";

import Classes from "./components/Classes.jsx";

import QuizForm from "./QuizPages/Question.jsx";
import CreateQuiz from "./instPages/CreateQuiz.jsx";
import InsClasses from "./components/InsClasses.jsx";
import Quiz from "./instPages/Quizes.jsx";

import QRPage from "./instPages/QRPage.jsx";





// import Student from "./components/Student";
// import Instructor from "./components/Instructor";
// import Department from "./components/Department";
// import Course from "./components/Course";
// import Class from "./components/Class";

function App() {
  return (
    <div>
      
    <Router>
      <Routes>
        <Route exact path="/" element={<LogIn />}/>
        <Route exact path="/lol" element = {<Testlogin />} />
        
        
        <Route exact path="/instructors" element = {<HomeIns />} />
        <Route exact path="/instructors/create" element = {<CreateInstructor />}/>
        <Route exact path="/instructors/info" element = {<ShowInstuctor />}/>
        <Route exact path="/instructors/edit" element = {<EditInstuctor />}/>
        <Route exact path="/instructors/delete" element = {<DeleteInstuctor />}/>


        <Route exact path="/students" element={<Home/>} />
        <Route exact path="/students/create" element={<CreateStudent/>} />
        <Route exact path="/students/info" element={<ShowStudent/>} />
        <Route exact path="/students/edit" element={<EditStudent/>} />
        <Route exact path="/students/delete" element={<DeleteStudent/>} />
        <Route exact path="/students/signup" element={<StudentSignUp/>} />
        <Route exact path="/attempt/:id" element={<AttemptQuiz/>} />


        <Route exact path = "/departments" element={<HomeDep/>} />
        <Route exact path="/departments/create" element={<CreateDepartment/>} />
        <Route exact path="/departments/show/:id" element={<ShowDepartment/>} />
        <Route exact path="/departments/edit/:id" element={<EditDepartment/>} />
        <Route exact path="/departments/delete/:id" element={<DeleteDepartment/>} />


        <Route exact path = "/courses" element={<HomeCrs/>} />
        <Route exact path="/courses/create" element={<CreateCourse/>} />
        <Route exact path="/courses/show/:id" element={<ShowCourses/>} />
        <Route exact path="/courses/edit/:id" element={<EditCourse/>} />
        <Route exact path="/courses/delete/:id" element={<DeleteCourse/>} />


        <Route exact path = "/classes" element={<ClassHome/>} />
        <Route exact path="/classes/create" element={<CreateClass/>} />
        <Route exact path="/classes/show/:id" element={<ShowClass/>} />
        <Route exact path="/classes/edit/:id" element={<EditClass/>} />
        <Route exact path="/classes/delete/:id" element={<DeleteClass/>} />

        <Route exact path="/admins" element={<Admin/>} />
        <Route exact path="/create" element={<Create/>} />

        <Route exact path="/stdpage" element={<StdPage />}/>
        <Route exact path="/inspage" element={<InsPage />}/>
        <Route exact path="/request" element={<Request />}/>
        <Route exact path="/joinclass" element={<JoinClass />}/>
        <Route exact path="/JoinedClasses" element={<Classes />}/>
        <Route exact path="/question" element={<CreateQuiz />}/>
        <Route exact path="/questions" element={<QuizForm />}/>
        <Route exact path="/insclasses" element={<InsClasses />}/>
        <Route exact path="/QuizList" element={<Quiz />}/>
        <Route exact path="/QRPage/:id" element={<QRPage />}/>
        
        


        {/* <Route exact path="/Student" element={<Student/>} />
        <Route exact path="/Instructor" element={<Instructor/>} />
        <Route exact path="/Department" element={<Department/>} />
        <Route exact path="/Course" element={<Course/>} />
        <Route exact path="/Class" element={<Class/>} /> */}
      </Routes>
    </Router>
    </div>
  );
}

export default App;
