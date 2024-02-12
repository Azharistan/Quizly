import express, { response } from 'express'
import { Quiz } from '../models/QuizModel.js';
import jwt from 'jsonwebtoken';
import Jwt from "jsonwebtoken";


const router = express.Router();

router.post('/', async (request, res)=>{
    try{
        if(
            !request.body.courseID ||
            !request.body.depID ||
            !request.body.createdBy ||
            !request.body.marks||
            !request.body.questions
        ) {
            return res.status(400).send({
                message: 'Send all data.'
            });
        }

        const newQuiz = {
            _id: request.body._id,
            courseID: request.body.courseID,
            depID: request.body.depID,
            correct: request.body.correct,
            createdBy: request.body.createdBy,
            marks: request.body.marks,
            date: request.body.date,
            questions: request.body.questions,
            
        };
        const quiz = await Quiz.create(newQuiz)
        return res.status(201).send(quiz)
    } catch(error){
        console.log(error.message);
        res.status(500).send({message: error.message})
    }
});

router.get('/', async (request, response)=>{
    try{
    const quiz = await Quiz.find({});
    

    return response.status(200).json({
        count: quiz.length,
        quiz});
    }catch(error){
        console.log(error.message)
        response.status(500).send({message : error.message})
    }
})

router.get('/:id', async (request,response )=>{
    try{
        const { id } = request.params;

        const quiz = await Quiz.findById(id);

        return response.status(200).json(quiz)
    }catch(error){
        console.log(error.message)
        response.status(500).send({message : error.message})
    }
})

router.put('/:id', async (request, response)=>{
    try{
        if(
            !request.body.quizID ||
            !request.body.courseID ||
            !request.body.depID ||
            !request.body.createdBy ||
            !request.body.marks||
            !request.body.date||
            !request.body.questions
        ) {
            return response.status(400).send({
                message: 'Send all data.'
            });
        }

        const {id} = request.params;
        
        const result = await Quiz.findByIdAndUpdate(id, request.body)
        
        if(!result)
        {
            return response.status(404).json({message: 'Quiz not found'})
        }
        return response.status(200).send({message: 'Quiz data updated'})

    }catch(error){
        console.log(error.message)
        response.status(500).send({message : error.message})
    }
})

router.delete('/:id', async (request, response)=>{
    try{
        const {id} = request.params;
        const del = await Quiz.findByIdAndDelete(id)
        if(!del){
            return response.status(404).json({message: 'Quiz not found'})
        }
        return response.status(200).send({message : 'Quiz deleted successfully'})
    }
    catch(error){
        console.log(error.message)
        response.status(500).send({message : error.message})
    }
})

router.post('/publishQuiz/:id', async (request, response)=>{
    const {id} = request.params;
    const quiz = await Quiz.findOne({_id:id})
    const expiresIn  = 300;
    quiz.published = true

    const quizToken = jwt.sign({
        _id: quiz._id,
        questions: quiz.questions,
        marks: quiz.marks
    }, 'QuizlySecret101', {expiresIn });
    quiz.token = quizToken
    const update = await Quiz.findByIdAndUpdate(id, quiz)
    return response.json({status: 'ok', quiz: quiz, quizToken})
})

router.post('/attempt/:id', async (request, response)=>{
    try {

        console.log(request.body.studentID)
        console.log("asd")
        const {id} = request.params;
        const quiz = await Quiz.findOne({_id:id})
        if(quiz.attemptees.find((s)=> s.regNo === request.body.studentID))
        {
            return response.json({status: 'Already attempted'})
        }
        else
        {
            const obj = {
                regNo: request.body.studentID,
                marks : 0
            }
            quiz.attemptees.push(obj)
            const update = await Quiz.findByIdAndUpdate({_id: id}, quiz)
        }

    Jwt.verify(quiz.token, "QuizlySecret101", async (err, data)=>{
        if(err){
            if(err.name === 'TokenExpiredError'){

                console.log('Sorry Token Expired')
                return response.json({status: 'token expired'})
            }else{
                console.log('token verification failed')
                return response.json({status: 'No Token'})
            }
        } else {
            return response.json({status: 'ok', data: data})
        }
    })
}
catch(error){
    console.log(error.message)
    response.status(500).send({message : error.message})
}
})

export default router;