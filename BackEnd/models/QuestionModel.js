import mongoose from "mongoose";

const questionSchema = mongoose.Schema(
    {
        courseID : {
            type : String,
            required: true,
        },
        topic : {
            type : String,
            required: true,
        },
        subTopic : {
            type : String,
            required: true,
        },
        statement : {
            type : String,
            required: true,
        },
        correct : {
            type : String,
            required: true,
        },
        options : [{
            type : String,
            required: true,
        }]
    },
    {
        timestamps: true
    }
)

export const Question = mongoose.model('Question', questionSchema);