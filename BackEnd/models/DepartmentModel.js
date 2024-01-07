import mongoose from "mongoose";

const departmentSchema = mongoose.Schema(
    {
        name : {
            type : String,
            required: true,
        },
        _id : {
            type : String,
            required: true,
        },
        dean : {
            type : String,
        },
        hod : {
            type : String,
        }
    },
    {
        timestamps: true
    }
)

export const Department = mongoose.model('Department', departmentSchema);