import express from 'express'
import { Session } from '../models/SessionModel.js';
import Jwt from "jsonwebtoken";


const router = express.Router();

router.post('/', async (req, res)=>{
    try{
        if(
            !req.body.currentSession
        ) {
            return res.status(400).send({
                message: 'Send all data.'
            });
        }

        const newSession = {
            currentSession: req.body.currentSession,
            semester : req.body.semester
        };
        const session = await Session.create(newSession)
        return res.status(201).send(session)
    } catch(error){
        console.log(error.message);
        res.status(500).send({message: error.message})
    }
});

router.get('/currentSession', async (request, response)=>{
    try{
    const session = await Session.findOne({});
    

    return response.status(200).json({
        count: session.length,
        session});
    }catch(error){
        console.log(error.message)
        response.status(500).send({message : error.message})
    }
})


router.put('/:id', async (request, response)=>{
    try{
        if(
            !request.body.currentSession ||
            !request.body.semester
        ) {
            return response.status(400).send({
                message: 'Send all data.'
            });
        }

        const {id} = request.params;
        
        const result = await Session.findByIdAndUpdate(id, request.body)
        
        if(!result)
        {
            return response.status(404).json({message: 'Session not found'})
        }
        return response.status(200).send({message: 'Session data updated'})

    }catch(error){
        console.log(error.message)
        response.status(500).send({message : error.message})
    }
})

router.delete('/:id', async (request, response)=>{
    try{
        const {id} = request.params;
        const del = await Session.findByIdAndDelete(id)
        if(!del){
            return response.status(404).json({message: 'Session not found'})
        }
        return response.status(200).send({message : 'Session deleted successfully'})
    }
    catch(error){
        console.log(error.message)
        response.status(500).send({message : error.message})
    }
})

router.post('/publishSession/:id', async (request, response)=>{
    const {id} = request.params;
    const session = await Session.findOne({_id:id})
    const expiresIn  = 300;
    session.published = true

    const sessionToken = jwt.sign({
        _id: session._id,
        questions: session.questions,
        marks: session.marks
    }, 'SessionlySecret101', {expiresIn });
    session.token = sessionToken
    const update = await Session.findByIdAndUpdate(id, session)
    return response.json({status: 'ok', session: session, sessionToken})
})

router.get('/attempt/:id', async (request, response)=>{
    try {

        console.log('asd')
        
        const {id} = request.params;
        const session = await Session.findOne({_id:id})
        if(session.attemptees.find((s)=> s.regNo === request.body.studentID))
        {
            return response.json({status: 'Already attempted'})
        }
        else
        {
            const obj = {
                regNo: request.body.studentID,
            }
            session.attemptees.push(obj)
            const update = await Session.findByIdAndUpdate({_id: id}, session)
        }

    Jwt.verify(session.token, "SessionlySecret101", async (err, data)=>{
        if(err){
            if(err.name === 'TokenExpiredError'){

                console.log('Sorry Token Expired')
                return response.json({status: 'token expired'})
            }else{
                console.log('token verification failed')
                return response.json({status: 'No Token'})
            }
        } else {
            return response.json({status: 'ok', data: data})
        }
    })
}
catch(error){
    console.log(error.message)
    response.status(500).send({message : error.message})
}
})

export default router;