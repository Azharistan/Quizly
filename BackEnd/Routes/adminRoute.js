import express from 'express'
import { Admin } from '../models/AdminModel.js';
// import objectHash from "object-hash"




const router = express.Router();

router.post('/', async (request, res)=>{
    try{
        if(
            !request.body._id ||
            !request.body.pass
            ) {
                return res.status(400).send({
                    message: 'Send all data.'
                });
            }

        const newAdmin = {
            _id: request.body._id,
            pass: objectHash.MD5(request.body.pass)           
        };
        const admin = await Admin.create(newAdmin)
        return res.status(201).send(admin)
    } catch(error){
        console.log(error.message);
        res.status(500).send({message: error.message})
    }
});

router.get('/', async (request, response)=>{
    try{
    const admin = await Admin.find({});
    

    return response.status(200).json({
        count: admin.length,
        admin});
    }catch(error){
        console.log(error.message)
        response.status(500).send({message : error.message})
    }
})

router.get('/:id', async (request,response )=>{
    try{
        const { id } = request.params;

        const admin = await Admin.findById(id);

        return response.status(200).json(admin)
    }catch(error){
        console.log(error.message)
        response.status(500).send({message : error.message})
    }
})

router.put('/:id', async (request, response)=>{
    try{
        if(
            !request.body._id ||
            !request.body.pass 
        ) {
            return response.status(400).send({
                message: 'Send all data.'
            });
        }

        const {id} = request.params;
        
        const result = await Admin.findByIdAndUpdate(id, request.body)
        
        if(!result)
        {
            return response.status(404).json({message: 'Admin not found'})
        }
        return response.status(200).send({message: 'Admin data updated'})

    }catch(error){
        console.log(error.message)
        response.status(500).send({message : error.message})
    }
})

router.delete('/:id', async (request, response)=>{
    try{
        const {id} = request.params;
        const del = await Admin.findByIdAndDelete(id)
        if(!del){
            return response.status(404).json({message: 'Admin not found'})
        }
        return response.status(200).send({message : 'Admin deleted successfully'})
    }
    catch(error){
        console.log(error.message)
        response.status(500).send({message : error.message})
    }
})

export default router;