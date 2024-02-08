import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const resultSchema = mongoose.Schema(
    {
        regno : {
            type : String,
            required: true,
        },
        quizID : {
            type : String,
            required: true,
        },
        marksObtained : {
            type : Number,
            required: true,
        },
        answers : [{
            questionID : String,
            correctAnswer: String,
            givenAnswer: String
        }]
    },
    {
        timestamps: true
    }
)

export const Result = mongoose.model('Result', resultSchema);