import express, { response } from 'express'
import { Class } from '../models/ClassModel.js';
import { Student } from '../models/studentModel.js';
import { Session } from '../models/SessionModel.js';


const router = express.Router();

router.post('/', async (request, res)=>{
    try{
        
        if(
            !request.body.instructor ||
            !request.body.section ||
            !request.body.courseID
            ) {
            return res.status(400).send({
                message: 'Send all data.'
            });
        }
        const session = await Session.findOne({})
        const newClass = {
            _id : session.currentSession+request.body.courseID,
            instructor: request.body.instructor, //TODO: unique _id, unique students,
            section: request.body.section,
            courseID: request.body.courseID, 
            stdList: []           
        };
        console.log(newClass)
        const class1 = await Class.create(newClass)

        return res.status(201).send(class1)
    } catch(error){
        console.log(error.message);
        res.status(500).send({message: error.message})
    }
});

router.get('/', async (request, response)=>{
    try{
    const class1 = await Class.find({});
    

    return response.status(200).json({
        count: class1.length,
        class1});
    }catch(error){
        console.log(error.message)
        response.status(500).send({message : error.message})
    }
})

router.get('/getStudents/:id', async (request, response)=>{
try{
    const {id} = request.params;
    const class1 = await Class.findById(id)
    const document = await Student.find({ _id: { $in: class1.stdList }})
    return response.status(200).json({stdList: document})

}catch(error){
    console.log(error.message)
}
})

router.post('/getByInstructor', async (request, response)=>{
    try{
        console.log(request.body)
    const class1 = await Class.find({
        instructor: request.body._id
    });
    

    return response.status(200).json({
        count: class1.length,
        class1});
    }catch(error){
        console.log(error.message)
        response.status(500).send({message : error.message})
    }
})

router.get('/:id', async (request,response )=>{
    try{
        const { id } = request.params;

        const class1 = await Class.findById(id);

        return response.status(200).json(class1)
    }catch(error){
        console.log(error.message)
        response.status(500).send({message : error.message})
    }
})

router.put('/:id', async (request, response)=>{
    try{
        console.log("asdnkjsadlsad = ",request.body)
        if(
            !request.body._id ||
            !request.body.instructor 
        ) {
            return response.status(400).send({
                message: 'Send all data.'
            });
        }

        const {id} = request.params;
        
        const result = await Class.findByIdAndUpdate(id, request.body)
        
        if(!result)
        {
            return response.status(404).json({message: 'Class not found'})
        }
        return response.status(200).send({message: 'Class data updated'})

    }catch(error){
        console.log(error.message)
        response.status(500).send({message : error.message})
    }
})

router.delete('/:id', async (request, response)=>{
    try{
        const {id} = request.params;
        const del = await Class.findByIdAndDelete(id)
        if(!del){
            return response.status(404).json({message: 'Class not found'})
        }
        return response.status(200).send({message : 'Class deleted successfully'})
    }
    catch(error){
        console.log(error.message)
        response.status(500).send({message : error.message})
    }
})

export default router;