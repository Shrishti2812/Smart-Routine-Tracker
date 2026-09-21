const mongoose=require("mongoose");
const routine=mongoose.Schema({
   title:{
        type:String,
        required:true
    },
  category: {
  type: String,
  enum: ["study", "work", "personal", "health", "other"],
  required: true
},
    targetHours:{
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