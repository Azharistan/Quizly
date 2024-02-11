import express, { response } from 'express'
import { Class } from '../models/ClassModel.js';
import { Student } from '../models/studentModel.js';
import { Session } from '../models/SessionModel.js';


const router = express.Router();

router.post('/', async (req, res)=>{
    try{
        
        if(
            !req.body.instructor ||
            !req.body.section ||
            !req.body.courseID
            ) {
            return res.status(400).send({
                message: 'Send all data.'
            });
        }
        // const session = await Session.findOne({})
        const newClass = {
            // _id : session.currentSession+req.body.courseID,
            instructor: req.body.instructor, //TODO: unique _id, unique students,
            section: req.body.section,
            courseID: req.body.courseID, 
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

router.put('/:id', async (req, response)=>{
    try{
        console.log("asdnkjsadlsad = ",req.body)
        if(
            !req.body._id ||
            !req.body.instructor 
        ) {
            return response.status(400).send({
                message: 'Send all data.'
            });
        }

        const {id} = req.params;
        
        const result = await Class.findByIdAndUpdate(id, req.body)
        
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
        const del = await Instructor.findByIdAndDelete(id)
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