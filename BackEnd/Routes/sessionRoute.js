import express from 'express'
import { Session } from '../models/SessionModel.js';
import Jwt from "jsonwebtoken";


const router = express.Router();

router.post('/', async (req, res)=>{
    try{
        if(
            !req.body.currentSession
        ) {
            return res.status(400).send({
                message: 'Send all data.'
            });
        }

        const newSession = {
            currentSession: req.body.currentSession,
        };
        const session = await Session.create(newSession)
        return res.status(201).send(session)
    } catch(error){
        console.log(error.message);
        res.status(500).send({message: error.message})
    }
});

router.get('/', async (request, response)=>{
    try{
    const se = await Quiz.find({});
    

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
            !req.body.quizID ||
            !req.body.courseID ||
            !req.body.depID ||
            !req.body.createdBy ||
            !req.body.marks||
            !req.body.date||
            !req.body.questions
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

router.get('/attempt/:id', async (request, response)=>{
    try {

        console.log('asd')
        
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