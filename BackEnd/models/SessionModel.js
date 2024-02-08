import mongoose from "mongoose";

const sessionSchema = mongoose.Schema(
    {
        currentSession : {
            type : String,
            required: true,
        },
        previousSessions : [{
            type : String
        }]
    },
    {
        timestamps: true
    }
)

export const Session = mongoose.model('Session', sessionSchema);