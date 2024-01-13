import express, { response } from 'express'
import { Question } from '../models/QuestionModel.js';
import { Instructor } from '../models/InstructorModel.js';

const router = express.Router();

router.get('/getByCourse', async (request, response)=>{
    try{
    const question = await Question.find({
        courseID: request.body.courseID
    });
    

    return response.status(200).json({
        count: question.length,
        question});
    }catch(error){
        console.log(error.message)
        response.status(500).send({message : error.message})
    }
})

router.post('/', async (req, res)=>{
    try{
        if(
            !req.body.courseID ||
            !req.body.statement ||
            !req.body.topic ||
            !req.body.subTopic ||
            !req.body.correct 
        ) {
            return res.status(400).send({
                message: 'Send all data.'
            });
        }

        // const NQ = await Question.find({})

        console.dir(Question.find({}))

        const newQuestion = {
            courseID: req.body.courseID,
            statement: req.body.statement,
            topic: req.body.topic,
            subTopic: req.body.subTopic,
            correct: req.body.correct,
            options: req.body.options
            
        };
        const question = await Question.create(newQuestion)
        return res.status(201).send(question)
    } catch(error){
        console.log(error.message);
        res.status(500).send({message: error.message})
    }
});

router.get('/', async (request, response)=>{
    try{
    const question = await Question.find({});
    

    return response.status(200).json({
        count: question.length,
        question});
    }catch(error){
        console.log(error.message)
        response.status(500).send({message : error.message})
    }
})

router.get('/:id', async (request,response )=>{
    try{
        const { id } = request.params;

        const question = await Question.findById(id);

        return response.status(200).json(question)
    }catch(error){
        console.log(error.message)
        response.status(500).send({message : error.message})
    }
})

router.put('/:id', async (request, response)=>{
    try{
        if(
            !req.body._id ||
            !req.body.courseID ||
            !req.body.statement ||
            !req.body.topic ||
            !req.body.subTopic ||
            !req.body.correct ||
            !req.body.opt1||
            !req.body.opt2||
            !req.body.opt3||
            !req.body.opt4
        ) {
            return response.status(400).send({
                message: 'Send all data.'
            });
        }

        const {id} = request.params;
        
        const result = await Question.findByIdAndUpdate(id, request.body)
        
        if(!result)
        {
            return response.status(404).json({message: 'Question not found'})
        }
        return response.status(200).send({message: 'Question data updated'})

    }catch(error){
        console.log(error.message)
        response.status(500).send({message : error.message})
    }
})

router.delete('/:id', async (request, response)=>{
    try{
        const {id} = request.params;
        const del = await Question.findByIdAndDelete(id)
        if(!del){
            return response.status(404).json({message: 'Question not found'})
        }
        return response.status(200).send({message : 'Question deleted successfully'})
    }
    catch(error){
        console.log(error.message)
        response.status(500).send({message : error.message})
    }
})



export default router;