const Routine=require("../models/routine.js");
const addRoutine=async(req,res)=>{
    try{
        const {title,category,targetHours,priority}=req.body;
        const routine=await Routine.create({title,category,targetHours,priority});
    return res.status(201).json(routine);
    }catch(error){
        return res.status(500).json({message:error.message});
    }};

    const getRoutine=async(req,res)=>{
        try{
            const routines=await Routine.find({});
            return res.status(200).json(routines);
        }catch(error){
            return res.status(500).json({message:error.message});
        }
    }

    const updateRoutine=async(req,res)=>{
        try{
         
            const routine=await Routine.findByIdAndUpdate(req.params.id,req.body,{new:true});
            if(!routine){
                return res.status(404).json({message:"Routine not found"});
            }
            return res.status(200).json({routine});
        }catch(error){
            return res.status(500).json({message:error.message});
        }
    }


    const deleteRoutine=async(req,res)=>{
        try{
            const id=req.params.id;
            const routine=await Routine.findByIdAndDelete(id);
            if(!routine){
                return res.status(404).json({message:"Routine not found"});
            }
            return res.status(200).json({message:"Routine deleted successfully"});
        }catch(error){
            return res.status(500).json({message:error.message});
        }
    }


    const completeRoutine=async(req,res)=>{
        try{
            const routine=await Routine.findById(req.params.id);
            if(!routine){
                return res.status(404).json({message:"Routine not found"});
            }
            const today=new Date().toISOString().split("T")[0];
            if(routine.lastCompletedDate===today){
                return res.status(400).json({message:"Routine already completed today"});
            }
            const yesterday=new Date();
            yesterday.setDate(yesterday.getDate()-1);
            const yesterdayDate=yesterday.toISOString().split("T")[0];
            if(routine.lastCompletedDate===yesterdayDate){
                routine.streak+=1;
            }else{
                routine.streak=1;
            }
            routine.lastCompletedDate = today;
         
            await routine.save();
return res.status(200).json({
  message: "Routine completed successfully",
  routine
});        }catch(error){
            return res.status(500).json({message:error.message});
        }   }


   const getStats = async (req, res) => {
  try {
    const routines = await Routine.find();

    const today = new Date().toISOString().split("T")[0];

    const total = routines.length;

    const completed = routines.filter(
      (routine) => routine.lastCompletedDate === today
    ).length;

    const completedRate =
      total === 0 ? 0 : ((completed / total) * 100).toFixed(2);

    const priorityCount = {
      high: 0,
      medium: 0,
      low: 0
    };

   const categoryCount = {
  study: 0,
  work: 0,
  personal: 0,
  health: 0,
  other: 0
};
const pending=total-completed;

    routines.forEach((routine) => {
      if (routine.priority) {
        priorityCount[routine.priority]++;
      }

      if (routine.category) {
        categoryCount[routine.category]++;
      }
    });

    res.status(200).json({
      total,
      completed,
      completedRate,
      priorityCount,
      pending,
      categoryCount
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
module.exports={addRoutine,getRoutine,updateRoutine,deleteRoutine,completeRoutine,getStats};