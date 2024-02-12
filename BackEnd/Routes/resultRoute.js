import express from 'express'
import { Result } from '../models/Results.js';

const router = express.Router();

router.post('/', async (request, res)=>{
    try{
        if(
            !request.body.regno ||
            !request.body.quizID ||
            !request.body.marksObtained 
        ) {
            return res.status(400).send({
                message: 'Send all data.'
            });
        }

        const newResult = {
            regno: request.body.regno,
            quizID: request.body.quizID,
            marksObtained: request.body.marksObtained,  
        };
        const result = await Result.create(newResult)
        return res.status(201).send(result)
    } catch(error){
        console.log(error.message);
        res.status(500).send({message: error.message})
    }
});

router.get('/', async (request, response)=>{
    try{
    const result = await Result.find({});
    

    return response.status(200).json({
        count: result.length,
        result});
    }catch(error){
        console.log(error.message)
        response.status(500).send({message : error.message})
    }
})


router.get('/getByStd', async (request, response) => {
    try {
      const { regno } = request.query; // Extract regno from query parameters
  
      const result = await Result.find({ regno });
  
      return response.status(200).json({
        count: result.length,
        result
      });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });

  router.get('/getByQuizID/:id', async (request, response) => {
    try {
        const { id } = request.params;
  
      const result = await Result.find({ quizID: id });
  
      return response.status(200).json({
        count: result.length,
        result
      });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });
  

router.get('/:id', async (request,response )=>{
    try{
        const { id } = request.params;

        const result = await Result.findById(id);

        return response.status(200).json(result)
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
        
        const result = await Result.findByIdAndUpdate(id, request.body)
        
        if(!result)
        {
            return response.status(404).json({message: 'Result not found'})
        }
        return response.status(200).send({message: 'Result data updated'})

    }catch(error){
        console.log(error.message)
        response.status(500).send({message : error.message})
    }
})

router.delete('/:id', async (request, response)=>{
    try{
        const {id} = request.params;
        const del = await Result.findByIdAndDelete(id)
        if(!del){
            return response.status(404).json({message: 'Result not found'})
        }
        return response.status(200).send({message : 'Result deleted successfully'})
    }
    catch(error){
        console.log(error.message)
        response.status(500).send({message : error.message})
    }
})

export default router;