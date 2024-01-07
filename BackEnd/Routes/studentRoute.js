import express, { response } from 'express'
import axios from 'axios';
import { Student } from '../models/studentModel.js';
import Jwt from "jsonwebtoken";
import objectHash from 'object-hash';


const router = express.Router();

router.post('/', async (req, res) => {
    try {
        if (
            !req.body.name ||
            !req.body._id ||
            !req.body.semester ||
            !req.body.whatsapp ||
            !req.body.email ||
            !req.body.password
        ) {
            return res.status(400).send({
                message: 'Send all data.'
            });
        }

        const newStudent = {
            name: req.body.name,
            _id: req.body._id,
            whatsapp: req.body.whatsapp,
            semester: req.body.semester,
            email: req.body.email,
            password: objectHash.MD5(req.body.password),

        };

        const student = await Student.create(newStudent)
        return res.status(201).send(student)
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
});

router.get('/', async (request, response) => {
    try {
        const students = await Student.find({});


        return response.status(200).json({
            count: students.length,
            students
        });
    } catch (error) {
        console.log(error.message)
        response.status(500).send({ message: error.message })
    }
})

router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const student = await Student.findById(id);

        return response.status(200).json(student)
    } catch (error) {
        console.log(error.message)
        response.status(500).send({ message: error.message })
    }
})

router.put('/:id', async (request, response) => {
    try {
        if (
            !request.body.name ||
            !request.body._id ||
            !request.body.semester ||
            !request.body.whatsapp ||
            !request.body.email
        ) {
            return response.status(400).send({
                message: 'Send all data.'
            });
        }

        const { id } = request.params;

        const result = await Student.findByIdAndUpdate(id, request.body)

        if (!result) {
            return response.status(404).json({ message: 'Student not found' })
        }
        const token = Jwt.sign({
            name:request.body.name,
            email: request.body.email,
            _id: request.body._id,
            whatsapp: request.body.whatsapp,
            classes: request.body.classes,
            semester: request.body.semester
            
        },'QuizlySecret101'
        )            
        return response.status(200).send({ message: 'Student data updated', token })

    } catch (error) {
        console.log(error.message)
        response.status(500).send({ message: error.message })
    }
})

router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const del = await Student.findByIdAndDelete(id)
        if (!del) {
            return response.status(404).json({ message: 'Student not found' })
        }
        return response.status(200).send({ message: 'Student deleted successfully' })
    }
    catch (error) {
        console.log(error.message)
        response.status(500).send({ message: error.message })
    }
})

export default router;