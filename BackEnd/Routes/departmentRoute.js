import express from 'express'
import { Department } from '../models/DepartmentModel.js';



const router = express.Router();

router.post('/', async (request, res)=>{
    try{
        if(
            !request.body.name ||
            !request.body._id 
            ) {
                return res.status(400).send({
                    message: 'Send all data.'
                });
            }

        const newDepartment = {
            name: request.body.name,
            _id: request.body._id,
            dean: request.body.dean,
            hod: request.body.hod,            
        };
        const dep = await Department.create(newDepartment)
        return res.status(201).send(dep)
    } catch(error){
        console.log(error.message);
        res.status(500).send({message: error.message})
    }
});

router.get('/', async (request, response)=>{
    try{
    const dep = await Department.find({});
    

    return response.status(200).json({
        count: dep.length,
        dep});
    }catch(error){
        console.log(error.message)
        response.status(500).send({message : error.message})
    }
})

router.get('/:id', async (request,response )=>{
    try{
        const { id } = request.params;

        const dep = await Department.findById(id);

        return response.status(200).json(dep)
    }catch(error){
        console.log(error.message)
        response.status(500).send({message : error.message})
    }
})

router.put('/:id', async (request, response)=>{
    try{
        if(
            !request.body.name ||
            !request.body._id
        ) {
            return response.status(400).send({
                message: 'Send all data.'
            });
        }

        const {id} = request.params;
        
        const result = await Department.findByIdAndUpdate(id, request.body)
        
        if(!result)
        {
            return response.status(404).json({message: 'Deparment not found'})
        }
        return response.status(200).send({message: 'Deparment data updated'})

    }catch(error){
        console.log(error.message)
        response.status(500).send({message : error.message})
    }
})

router.delete('/:id', async (request, response)=>{
    try{
        const {id} = request.params;
        const del = await Department.findByIdAndDelete(id)
        if(!del){
            return response.status(404).json({message: 'Deparment not found'})
        }
        return response.status(200).send({message : 'Deparment deleted successfully'})
    }
    catch(error){
        console.log(error.message)
        response.status(500).send({message : error.message})
    }
})

export default router;