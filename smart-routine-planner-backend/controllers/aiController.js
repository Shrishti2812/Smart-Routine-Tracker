const Routine=require("../models/routine.js");

const {GoogleGenAI}=require("@google/genai");
const ai=new GoogleGenAI({
  apiKey:process.env.GEMINI_API_KEY
});
const optimizeRoutine=async(req,res)=>{
    try{
const{goal,mode}=req.body;
const routines= await Routine.find();
const aiData = {
    goal,
    mode,
    routines: routines.map(routine => ({
        id: routine._id,
        title: routine.title,
        category: routine.category,
        targetHours: routine.targetHours,
        priority: routine.priority,
        lastCompletedDate: routine.lastCompletedDate,
        streak: routine.streak
    }))
}
    const prompt = `
You are an AI Routine Optimizer.

Analyze the user's routines according to their goal and optimization mode.

Rules:
- Interpret what the goal actually requires and identify the skills/activities that contribute to it.
- Match each routine to the goal based on its title, category, priority, and targetHours.
- Judge category importance by its relevance to the goal, NOT by the number of routines in that category.
- Classify routine relevance as direct, indirect, low, or uncertain.
- Use evidence-informed principles such as deliberate practice, distributed practice, sustainable workload, and adequate recovery.
- Do not invent scientific facts, studies, statistics, or exact time requirements.
- Balanced: prefer small adjustments and preserve the existing schedule.
- Intensive: make moderate reallocations toward the goal.
- Hard: prioritize the goal strongly, but do not make drastic hour increases without clear justification.
- Prefer reallocating existing time before increasing the total workload.
- Reduce low-relevance routines before making large increases to direct routines.
- Preserve essential recovery activities such as exercise and adequate rest.
- Consider streak and lastCompletedDate as indicators of consistency, not complete history.
- Primarily recommend changes to targetHours.
- Do not modify routine IDs, titles, categories, streaks, or completion history.
- Do not modify the database.
- If a routine's purpose cannot be understood from the available information, mark its relevance as uncertain instead of guessing.
- Every recommendation must include a reason.

Return ONLY valid JSON in this format:

{
  "goal": "string",
  "mode": "string",
  "categoryAnalysis": [
    {
      "category": "string",
      "importance": "high | medium | low | uncertain",
      "reason": "string"
    }
  ],
  "routineAnalysis": [
    {
      "id": "string",
      "relevance": "direct | indirect | low | uncertain",
      "reason": "string"
    }
  ],
  "recommendations": [
    {
      "id": "string",
      "currentHours": "number",
      "suggestedHours": "number",
      "reason": "string"
    }
  ]
}

User data:
${JSON.stringify(aiData)}
`
 const response = await ai.models.generateContent({
    model: "gemini-3.5-flash-lite",
    contents: prompt
});
const result=JSON .parse(response.text);
return res.status(200).json(result);
    }catch(error){
return res.status(500).json({message:error.message});
    }
}
module.exports={optimizeRoutine};