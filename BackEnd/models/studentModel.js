import mongoose from "mongoose";
import validator from "validator";

const studentSchema = mongoose.Schema(
    {
        name : {
            type : String,
            required: true,
        },
        _id : {
            type : String,
            required: true,
        },
        whatsapp : {
            type : String,
            required: true,
        },
        semester : {
            type : Number,
            required: true,
        },
        email : {
            type : String,
            required: true,
        },
        password : {
            type : String,
            required: true,
        },
        classes: [{
            classID : { type :String},
            courseID : {type : String},
            approved : {type : Boolean},
        }],
    },
    {
        timestamps: true
    }
)
studentSchema.statics.signup = async function(name, _id, whatsapp, semester, email, password){

    // validations
    
    //regno
    if(_id.length!=9)
    {
        return alert("Reg No. Length should be 9 chararacters i.e., BCS201016")
    }
    
    //email
    
    if(!validator.isEmail(email)){
        console.log("Email")
        throw Error("invalid Email")
    }
    //strong Password
    if(!validator.isStrongPassword(password)){
        console.log("password")
        throw Error("Password is not strong enough")
    }
    
    //if user already exist
    
    const exist = this.findOne({_id})
    
    if (exist){
        console.log("exist")
        alert("This user already exist")
        throw Error("User already exist")
    }
    
}
export const Student = mongoose.model('Student', studentSchema);