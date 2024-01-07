import mongoose from "mongoose";

const instructorSchema = mongoose.Schema(
    {
        _id : {
            type : String,
            required: true,
        },
        name : {
            type : String,
            required: true,
        },
        whatsapp : {
            type : String,
            required: true,
        },
        department : {
            type : String,
            required: true,
        },
        email : {
            type : String,
            required: true,
        },
        password : {
            type : String,
            required: true,
        }
    },
    {
        timestamps: true
    }
)

export const Instructor = mongoose.model('Instructor', instructorSchema);