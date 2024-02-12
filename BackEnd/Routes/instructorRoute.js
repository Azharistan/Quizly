import express from 'express'
import { Instructor } from '../models/InstructorModel.js';
import objectHash from 'object-hash';
import  Jwt  from 'jsonwebtoken';

const router = express.Router();

router.post('/', async (request, res)=>{
    try{
        if(
            !request.body._id ||
            !request.body.name ||
            !request.body.whatsapp ||
            !request.body.department ||
            !request.body.email ||
            !request.body.password
        ) {
            return res.status(400).send({
                message: 'Send all data.'
            });
        }

        const newInstructor = {
            _id: request.body._id,
            name: request.body.name,
            whatsapp: request.body.whatsapp,
            department: request.body.department,
            email: request.body.email,
            password: objectHash.MD5(request.body.password),
            
        };
        const instructor = await Instructor.create(newInstructor)
        return res.status(201).send(instructor)
    } catch(err){
        console.log(error.message);
        res.status(500).send({message: error.message})
    }
});

router.get('/', async (request, response)=>{
    try{
    const instructors = await Instructor.find({});
    

    return response.status(200).json({
        count: instructors.length,
        instructors});
    }catch(error){
        console.log(error.message)
        response.status(500).send({message : error.message})
    }
})

router.get('/:id', async (request,response )=>{
    try{
        const { id } = request.params;

        const instructor = await Instructor.findById(id);

        return response.status(200).json(instructor)
    }catch(error){
        console.log(error.message)
        response.status(500).send({message : error.message})
    }
})





router.put('/:id', async (request, response)=>{
    try{
        if(
            !request.body.name ||
            !request.body._id ||
            !request.body.whatsapp ||
            !request.body.department ||
            !request.body.email
        ) {
            return response.status(400).send({
                message: 'Send all data.'
            });
        }

        const {id} = request.params;
        
        const result = await Instructor.findByIdAndUpdate(id, request.body)
        
        if(!result)
        {
            return response.status(404).json({message: 'Instructor not found'})
        }
        const token = Jwt.sign({
            name: request.body.name,
            email: request.body.email,
            _id: request.body._id,
            whatsapp: request.body.whatsapp,
            department: request.body.department,
        },'QuizlySecret101'
        )
        return response.status(200).send({message: 'Instructor data updated', token})

    }catch(error){
        console.log(error.message)
        response.status(500).send({message : error.message})
    }
})

router.delete('/:id', async (request, response)=>{
    try{
        const {id} = request.params;
        const del = await Instructor.findByIdAndDelete(id)
        if(!del){
            return response.status(404).json({message: 'Instructor not found'})
        }
        return response.status(200).send({message : 'Instructor deleted successfully'})
    }
    catch(error){
        console.log(error.message)
        response.status(500).send({message : error.message})
    }
})

export default router;