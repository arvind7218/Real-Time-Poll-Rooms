import mongoose from "mongoose";

const pollSchema = mongoose.Schema({

    question : {
        type : String,
        required : true
    },
    options : {
        type : [String],
        required : true
    },
    duration : {
        type : Number,
        required : true
    },
    startTime : {
        type : Date,
    },

    active : {
        type : Boolean,
        default : false
    }
},{timestamps : true})

const Poll = mongoose.model("Poll" , pollSchema);

export default Poll;