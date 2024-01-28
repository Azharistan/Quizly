import express, { response } from "express";
import {PORT, MongoDBURL} from "./config.js";
import mongoose from "mongoose";
import objectHash from "object-hash";
//importing DB-Models
import { Student } from "./models/studentModel.js";
import { Instructor } from "./models/InstructorModel.js";
import { Class } from "./models/ClassModel.js";
import { Course } from "./models/CourseModel.js";
import { Department } from "./models/DepartmentModel.js";
import { Question } from "./models/QuestionModel.js";
import { Quiz } from "./models/QuizModel.js";
import { Admin } from "./models/AdminModel.js"
import { Approvals } from "./models/ApprovalsModel.js"
//importing Routes
import studentRoute from './Routes/studentRoute.js';
import instructorRoute from './Routes/instructorRoute.js';
import classRoute from './Routes/classRoute.js';
import courseRoute from './Routes/courseRoute.js';
import departmentRoute from './Routes/departmentRoute.js';
import questionRoute from './Routes/questionRoute.js';
import quizRoute from './Routes/quizRoute.js';
import adminRoute from './Routes/adminRoute.js'
import ApprovalRoute from './Routes/ApprovalsRoute.js'


import Jwt from "jsonwebtoken";

import cors from 'cors';
const app = express();

app.use(express.json())

app.use(cors(
    // {
    //     origin : ["https://quizly-nine.vercel.app"],
    //     methods : ["POST", "GET"],
    //     credentials : true
    // }
))

app.get('/', (req, res)=>{
    console.log(req)
    return res.status(234).send('Quizly')
});


//api to decrypt JWT or JsonWebToken
app.post('/api/token',async (req, res)=>{
if(req.body.token){
        Jwt.verify(req.body.token, "QuizlySecret101", async (err,data)=>{
            if(err){
                if(err.name === 'TokenExpiredError'){

                    console.log('Sorry Token Expired')
                    return res.json({status: 'token expired'})
                }else{
                    console.log('token verification failed')
                    return res.json({status: 'No Token'})
                }
            } else {
                
                if(data._id.includes("PROF")){
                    const instructor = await Instructor.findOne({_id: data._id})
                    console.log('a')
                    return res.json({status: 'ok', instructor: instructor})
                }else if(data._id.includes("ADM")){
                    const admin = await Admin.findOne({_id: data._id})

                    console.log('b')
                    return res.json({status: 'ok', admin: admin})
                }else if(data._id.includes("B")){
                    const student = await Student.findOne({_id: data._id})
                    console.log('c')
                    return res.json({status: 'ok', student: student})
                }else{

                    return res.json({status: 'nodata'})
                }

            }
        })
    } else {

        return res.json({status: 'noToken'})
    }
    
})

app.post('/api/request', async (req, res)=>{
    const approval = await Approvals.findOne({
        from: req.body.from,
        detail: req.body.detail,
        section: req.body.section,
        courseID: req.body.courseID
    })
    console.log(approval)
    if(approval){
        return res.status(200).send({message : 'approval found', ID:approval._id})
    }
})

app.post('/getclass', async (req,res)=>{
    console.log('req')
    const std= await Student.findOne({
        _id : req.body._id
    })
    if(std){
        var cc = []
         std.classes.forEach(async c => {
            console.log(c.classID)
            const cla = await Class.findById(c.classID)
            if(cla){
                console.log(cla.courseID)
                cc.push(cla)            
            }
        });
        console.log(cc)
        return res.status(200).send({message : 'Classes are', classes:cc})

    }
})

app.post('/api/joinClass', async (req, res)=>{
    const Class2 = await Class.findOne({
        instructor: req.body.to,
        courseID: req.body.courseID,
        section: req.body.section
    })
    Class2.stdList.push(req.body.from)


    const result = await Class.findByIdAndUpdate(Class2._id, Class2)
        console.log('Updated this class',Class2)
        if(!result)
        {
            return res.status(404).json({message: 'Class not found'})
        }
        const newStudent = await Student.findOne({_id: req.body.from})
        if(newStudent){

            console.log(newStudent)
            newStudent.classes.forEach(c => {
                if(c.classID == Class2._id){
                    c.courseID = Class2.courseID;
                    c.approved = true;
                }
            });
            const done = await Student.findByIdAndUpdate(newStudent._id, newStudent)
            console.log(newStudent)
        }else{
            console.log('ruko zara sabr kro')
        }
        return res.status(200).send({message: 'Class data updated'})
})

//api to check if a user with given ID/Password exist or not
app.post('/api/login', async (req, res)=>{
    const pass = (objectHash.MD5(req.body.password))
    const expireTime = 60*60*24*30;
    if((req.body._id).includes("B")){
        const student = await Student.findOne({
            _id: req.body._id,
            password: pass
        })

        
        if(student){
            console.log("Student Found")
            const token = Jwt.sign({
                name:student.name,
                email: student.email,
                _id: student._id,
                whatsapp: student.whatsapp,
                semester: student.semester,
                classes: student.classes,
            },'QuizlySecret101'
            )            
            return res.json({status: 'ok', student: student ,token})
        }else{
            return res.json({status: 'error', student: false})
            
        }
    }
    else if((req.body._id).includes("PROF")){
        console.log("Going Instructor")
        const instructor = await Instructor.findOne({
            _id: req.body._id,
            password: pass
        })
        
        if(instructor){
            console.log('instructor found')
            const token = Jwt.sign({
                name:instructor.name,
                email: instructor.email,
                _id: instructor._id,
                whatsapp: instructor.whatsapp,
                department: instructor.department,
                exp: Math.floor(Date.now() / 1000) + (expireTime)
                
            },'QuizlySecret101'
            )
            return res.json({status: 'ok', instructor, token})
        }else{
            return res.json({status: 'error', instructor: false})
            
        }
    }
    else if((req.body._id).includes("ADM")){
        console.log("Going Admin")
        console.log(req.body._id)
        console.log(req.body.password)
        const admin = await Admin.findOne({
            _id: req.body._id,
            pass: req.body.password
        })
        console.log(admin)
        
        if(admin){
            const token = Jwt.sign({
                _id: admin._id,
                
            },'QuizlySecret101'
            )
            
            return res.json({status: 'ok', admin, token})
        }else{
            return res.json({status: 'error', admin: false})
            
        }
    }
})


app.use('/students', studentRoute)
app.use('/instructors', instructorRoute)
app.use('/classes', classRoute)
app.use('/courses', courseRoute)
app.use('/questions', questionRoute)
app.use('/quizes', quizRoute)
app.use('/departments', departmentRoute)
app.use('/admins', adminRoute)
app.use('/approvals', ApprovalRoute)


mongoose.connect(MongoDBURL)
.then(()=>{
    console.log('app is connected with database');
    app.listen(PORT, ()=>{
        console.log(` this is listening to port: ${PORT}`)
    });
})
.catch((err)=>{
    console.log(err);
});
