import mongoose from "mongoose";

const approvalsSchema = mongoose.Schema(
    {
        from : {
            type : String,
        },
        to : {
            type : String,
        },
        detail : {
            type : String,
        },
        courseID : {
            type : String,
        },
        section : {
            type : Number,
        }
    },
    {
        timestamps: true
    }
)

export const Approvals = mongoose.model('Approvals', approvalsSchema);