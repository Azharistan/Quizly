import express from 'express'
import { Course } from '../models/CourseModel.js';

const router = express.Router();

router.post('/', async (req, res)=>{
    try{
        if(
            !req.body.name ||
            !req.body._id ||
            !req.body.depID ||
            !req.body.creditHr 
        ) {
            return res.status(400).send({
                message: 'Send all data.'
            });
        }

        const newCourse = {
            name: req.body.name,
            _id: req.body._id,
            depID: req.body.depID,
            creditHr: req.body.creditHr,            
        };
        const course = await Course.create(newCourse)
        return res.status(201).send(course)
    } catch(error){
        console.log(error.message);
        res.status(500).send({message: error.message})
    }
});

router.get('/', async (request, response)=>{
    try{
    const course = await Course.find({});
    

    return response.status(200).json({
        count: course.length,
        course});
    }catch(error){
        console.log(error.message)
        response.status(500).send({message : error.message})
    }
})


router.get('/getByDep', async (request, response)=>{
    try{
    const course = await Course.find({
        depID: request.body.dep
    });
    

    return response.status(200).json({
        count: course.length,
        course});
    }catch(error){
        console.log(error.message)
        response.status(500).send({message : error.message})
    }
})

router.get('/:id', async (request,response )=>{
    try{
        const { id } = request.params;

        const course = await Course.findById(id);

        return response.status(200).json(course)
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
            !request.body.depID ||
            !request.body.creditHr 
        ) {
            return response.status(400).send({
                message: 'Send all data.'
            });
        }

        const {id} = request.params;
        
        const result = await Course.findByIdAndUpdate(id, request.body)
        
        if(!result)
        {
            return response.status(404).json({message: 'Course not found'})
        }
        return response.status(200).send({message: 'Course data updated'})

    }catch(error){
        console.log(error.message)
        response.status(500).send({message : error.message})
    }
})

router.delete('/:id', async (request, response)=>{
    try{
        const {id} = request.params;
        const del = await Course.findByIdAndDelete(id)
        if(!del){
            return response.status(404).json({message: 'Course not found'})
        }
        return response.status(200).send({message : 'Course deleted successfully'})
    }
    catch(error){
        console.log(error.message)
        response.status(500).send({message : error.message})
    }
})

export default router;