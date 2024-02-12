import express from "express";
import {PORT, MongoDBURL} from "./config.js";
import mongoose from "mongoose";
import objectHash from "object-hash";
import dotenv from 'dotenv'

dotenv.config();

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
import { Result } from "./models/Results.js";
import { Session } from "./models/SessionModel.js";
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
import resultRoute from './Routes/resultRoute.js'
import sessionRoute from './Routes/sessionRoute.js'

// import sendResults from './sendResults.js'
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

// const cron = require('node-cron');














app.get('/', (request, res)=>{
    console.log(request)
    return res.status(234).send('Quizly')
});


//api to decrypt JWT or JsonWebToken
app.post('/api/token',async (request, res)=>{
if(request.body.token){
        Jwt.verify(request.body.token, "QuizlySecret101", async (err,data)=>{
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




import cron from 'node-cron';
import sgMail from '@sendgrid/mail'

app.get('/ShareResult/:id', async (request, response) => {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const { id } = request.params;
    const quiz = await Quiz.findById(id);
    const stds = quiz.attemptees;
    
    for (const std of stds) {
        const result = await Result.findOne({
            regno: std.regNo,
            quizID: id // Assuming quiz._id is a string
        });

        if (result) {
            const student = await Student.findById(std.regNo);

            if (student) {
                let answers = [];

                for (const ans of result.answers) {
                    const question = await Question.findById(ans.questionID);
                    answers.push({
                        statement: question.statement,
                        correctAnswer: ans.correctAnswer,
                        givenAnswer: ans.givenAnswer
                    });
                }

                const htmlContent = `
                    <p>Quiz results for ${quiz.courseID} taken on ${quiz.updatedAt}:</p>
                    <table border="1">
                        <tr>
                            <th>Question</th>
                            <th>Correct Answer</th>
                            <th>Given Answer</th>
                        </tr>
                        ${answers.map(answer => `
                            <tr>
                                <td>${answer.statement}</td>
                                <td>${answer.correctAnswer}</td>
                                <td>${answer.givenAnswer}</td>
                            </tr>
                        `).join('')}
                    </table>
                    <h3>You have successfully achieved ${result.marksObtained} Marks.</h3>
                `;

                const msg = {
                    to: student.email,
                    from: 'quizlyteam7889@gmail.com',
                    subject: `Quiz result for ${quiz.courseID} taken on ${quiz.updatedAt}`,
                    html: htmlContent
                };

                sgMail.send(msg).then(() => {
                    console.log(`Email sent to ${student.email}`);
                }).catch(error => {
                    console.error(`Error sending email to ${student.email}:`, error);
                });
            }
        }
    }

    response.status(200).json({ message: 'Emails are being sent.' });
});

app.post('/api/request', async (request, res)=>{
    const approval = await Approvals.findOne({
        from: request.body.from,
        detail: request.body.detail,
        section: request.body.section,
        courseID: request.body.courseID
    })
    console.log(approval)
    if(approval){
        return res.status(200).send({message : 'approval found', ID:approval._id})
    }
})

app.post('/getclass', async (request,res)=>{
    console.log('request')
    const std= await Student.findOne({
        _id : request.body._id
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

app.post('/api/joinClass', async (request, res)=>{
    const Class2 = await Class.findOne({
        instructor: request.body.to,
        courseID: request.body.courseID,
        section: request.body.section
    })
    Class2.stdList.push(request.body.from)


    const result = await Class.findByIdAndUpdate(Class2._id, Class2)
        console.log('Updated this class',Class2)
        if(!result)
        {
            return res.status(404).json({message: 'Class not found'})
        }
        const newStudent = await Student.findOne({_id: request.body.from})
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

app.post('/checkQuiz', async (request, res) => {
    try {
        let marks = 0;
        var answer = []
        const questions = request.body.answers;

        for (const question of questions) {
            if (question.questionID) {
                const q = await Question.findById(question.questionID);
                if (q && q.correct === question.answer) {
                    marks++;
                }
                const ans = {
                    questionID : q._id,
                    correctAnswer : q.correct,
                    givenAnswer: question.answer
                }
                answer = [...answer, ans]
            }
        }
        console.log(answer)
        const newResult = {
            regno : request.body.regNo,
            quizID: request.body.quizID,
            marksObtained : marks,
            answers : answer
        }

        const result = await Result.create(newResult)
        const quiz = await Quiz.findOne({ _id: request.body.quizID });
        const attempteeIndex = quiz.attemptees.findIndex(obj => obj.regNo === request.body.regNo);
        
        if (attempteeIndex !== -1) {
            quiz.attemptees[attempteeIndex].marks = marks;
            await quiz.save(); // Save the updated quiz
        }

        // Send response with marks or other data
        return res.json({ marks });
    } catch (error) {
        console.error('Error while checking quiz:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});



//api to check if a user with given ID/Password exist or not
app.post('/api/login', async (request, res)=>{
    const pass = (objectHash.MD5(request.body.password))
    const expireTime = 60*60*24*30;
    if((request.body._id).includes("B")){
        const student = await Student.findOne({
            _id: request.body._id,
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
    else if((request.body._id).includes("PROF")){
        console.log("Going Instructor")
        const instructor = await Instructor.findOne({
            _id: request.body._id,
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
    else if((request.body._id).includes("ADM")){
        console.log("Going Admin")
        console.log(request.body._id)
        console.log(request.body.password)
        const admin = await Admin.findOne({
            _id: request.body._id,
            pass: request.body.password
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
app.use('/results', resultRoute)
app.use('/sessions', sessionRoute)


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
