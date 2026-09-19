const mongoose=require("mongoose");
const routine=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    category:{
        type:String,
        enum:["Study","Work","Personal","Health","Other"],
        required:true
    },
    hours:{
        type:Number,
        required:true
    },
    priority:{
        type:String,
        enum:["low","medium","high"],
        required:true
    },
    lastCompletedDate:{
type:String,
default:null
    },
    streak:{
        type:Number,
        default:0
    }
},{timestamps:true})
const Routine=mongoose.model("Routine",routine);
module.exports=Routine;