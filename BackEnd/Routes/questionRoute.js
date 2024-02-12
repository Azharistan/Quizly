import express, { response } from 'express'
import { Question } from '../models/QuestionModel.js';
import { Instructor } from '../models/InstructorModel.js';

const router = express.Router();

router.post('/getByCourse', async (request, response)=>{
    try{
        console.log(request.body)

        if(request.body.courseID && 
           request.body.topic &&
           (request.body.subTopic !== "") ){
            const question = await Question.find({
                courseID: request.body.courseID,
                topic : request.body.topic,
                subTopic : request.body.subTopic
           })
           console.log('a')
           return response.status(200).json({
            count: question.length,
            question});
        }
        else if(request.body.courseID && 
            request.body.topic) {
           console.log('b')

                const question = await Question.find({
                courseID: request.body.courseID,
                topic : request.body.topic})
                return response.status(200).json({
                    count: question.length,
                    question});
        }
        else if(request.body.courseID){
           console.log('c')

            const question = await Question.find({
                courseID: request.body.courseID})
                return response.status(200).json({
                    count: question.length,
                    question});
        }
    

    
    }catch(error){
        console.log(error.message)
        response.status(500).send({message : error.message})
    }
})

router.post('/', async (request, res)=>{
    try{
        if(
            !request.body.courseID ||
            !request.body.statement ||
            !request.body.options ||
            !request.body.correct 
        ) {
            return res.status(400).send({
                message: 'Send all data.'
            });
        }

        // const NQ = await Question.find({})

        // console.dir(Question.find({}))

        const newQuestion = {
            courseID: request.body.courseID,
            statement: request.body.statement,
            topic: request.body.topic,
            subTopic: request.body.subTopic,
            correct: request.body.correct,
            options: request.body.options
            
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
            !request.body._id ||
            !request.body.courseID ||
            !request.body.statement ||
            !request.body.topic ||
            !request.body.subTopic ||
            !request.body.correct ||
            !request.body.opt1||
            !request.body.opt2||
            !request.body.opt3||
            !request.body.opt4
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