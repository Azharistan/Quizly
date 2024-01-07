import mongoose from "mongoose";

const adminSchema = mongoose.Schema(
    {
        _id : {
            type : String,
            required: true,
        },
        pass : {
            type : String,
            required: true,
        }
    },
    {
        timestamps: true
    }
)

export const Admin = mongoose.model('Admin', adminSchema);