import mongoose from "mongoose";

const classSchema = mongoose.Schema(
    {
        stdList : [{
            type : String,
        }],
        quizList : [{
            type : String,
        }],
        courseID : {
            type : String,
            required: true,
        },
        instructor : {
            type : String,
            required: true,
        },
        approved : {
            type : Boolean
        },
        section : {
            type : Number,
            required : true
        },
    },
    {
        timestamps: true
    }
)

export const Class = mongoose.model('Class', classSchema);