import express from 'express'
import { Approvals } from '../models/ApprovalsModel.js';
// import objectHash from "object-hash"




const router = express.Router();

router.post('/', async (req, res)=>{
    console.log('in POST')

    try{
        
        if(
            !req.body.courseID ||
            !req.body.section
            ) {
                console.log(req.body)
                return res.status(400).send({
                    message: 'Send all data.'
                });
            }

        const newApprovals = {
            from: req.body.instructor ? req.body.instructor : req.body.student,         
            detail: req.body.instructor ? 'Create': 'Join',         
            to: req.body.to,         
            courseID: req.body.courseID,         
            section: req.body.section,         
        };
        const exist = await Approvals.findOne(newApprovals)
        console.log(exist)
        if(!exist){
            
            const approvals = await Approvals.create(newApprovals)
            console.log('added to db')
            return res.status(201).send(approvals)
        }else{
            console.log('Already exist')
            return res.status(500).send(newApprovals)

        }
    } catch(error){
        console.log('in error')

        console.log(error.message);
        res.status(500).send({message: error.message})
    }
});

router.get('/', async (request, response)=>{
    try{
    const approvals = await Approvals.find({});
    

    return response.status(200).json({
        count: approvals.length,
        approvals});
    }catch(error){
        console.log(error.message)
        response.status(500).send({message : error.message})
    }
})

router.get('/:id', async (request,response )=>{
    try{
        const { id } = request.params;

        const approvals = await Approvals.findById(id);

        return response.status(200).json(approvals)
    }catch(error){
        console.log(error.message)
        response.status(500).send({message : error.message})
    }
})

router.get('/byuser/:id', async (request,response )=>{
    try{
        const { id } = request.params;

        if(id.includes("PROF")){

            const approvals = await Approvals.find(
                {
                    to : id
                }
                );
                
                return response.status(200).json({
                    count: approvals.length,
                    approvals});
        }
        else if(id.includes("ADM")){

            const approvals = await Approvals.find({});
                
                return response.status(200).json({
                    count: approvals.length,
                    approvals});
        }
        else
            return response.status(404)
    }catch(error){
        console.log(error.message)
        response.status(500).send({message : error.message})
    }
})

router.put('/:id', async (request, response)=>{
    try{
        if(
            !req.body.from ||
            !req.body.detail ||
            !req.body.courseID ||
            !req.body.section
        ) {
            return response.status(400).send({
                message: 'Send all data.'
            });
        }

        const {id} = request.params;
        
        const result = await Approvals.findByIdAndUpdate(id, request.body)
        
        if(!result)
        {
            return response.status(404).json({message: 'Approval not found'})
        }
        return response.status(200).send({message: 'Approval data updated'})

    }catch(error){
        console.log(error.message)
        response.status(500).send({message : error.message})
    }
})

router.delete('/:id', async (request, response)=>{
    try{
        const {id} = request.params;
        const del = await Approvals.findByIdAndDelete(id)
        if(!del){
            return response.status(404).json({message: 'Approval not found'})
        }
        return response.status(200).send({message : 'Approval deleted successfully'})
    }
    catch(error){
        console.log(error.message)
        response.status(500).send({message : error.message})
    }
})

export default router;