import mongoose from "mongoose";

const quizSchema = mongoose.Schema(
    {
        depID : {
            type : String,
            required: true,
        },
        courseID : {
            type : String,
            required: true,
        },
        createdBy : {
            type : String,
            required: true,
        },
        marks : {
            type : Number,
            required:true,
        },
        questions : [{
            type : String,
            required: true,
        }],
        published : {
            type : Boolean,
            default: false
        }

    },
    {
        timestamps: true
    }
)

export const Quiz = mongoose.model('Quiz', quizSchema);