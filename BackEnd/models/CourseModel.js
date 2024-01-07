import mongoose from "mongoose";

const courseSchema = mongoose.Schema(
    {
        name : {
            type : String,
            required: true,
        },
        _id : {
            type : String,
            required: true,
        },
        depID : {
            type : String,
            required: true,
        },
        creditHr : {
            type : Number,
            required: true,
        }
    },
    {
        timestamps: true
    }
)

export const Course = mongoose.model('Course', courseSchema);