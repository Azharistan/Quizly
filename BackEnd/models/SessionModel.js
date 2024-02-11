import mongoose from "mongoose";

const sessionSchema = mongoose.Schema(
    {
        currentSession : {
            type : Number
        },
        semester : {
            type : String  // spring || fall || summer
        },
        prevSessions: [{
            session : {type : Number},
            semester : {type: String}
        }]
    },
    {
        timestamps: true
    }
)

export const Session = mongoose.model('Session', sessionSchema);