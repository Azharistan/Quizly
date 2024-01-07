import mongoose from "mongoose";

const resultSchema = mongoose.Schema(
    {
        _id : {
            type : String,
            required: true,
        },
        regno : [{
            type : String,
            required: true,
        }],
        quizID : {
            type : String,
            required: true,
        },
        marksObtained : {
            type : float,
            required: true,
        }
    },
    {
        timestamps: true
    }
)

export const Result = mongoose.model('Result', resultSchema);