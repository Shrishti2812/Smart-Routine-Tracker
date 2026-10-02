const Routine = require("../models/routine.js");

const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

const optimizeRoutine = async (req, res) => {
  try {
    const { goal, mode } = req.body;

    const routines = await Routine.find();

    const aiData = {
      goal,
      mode,
      routines: routines.map((routine) => ({
        id: routine._id,
        title: routine.title,
        category: routine.category,
        targetHours: routine.targetHours,
        priority: routine.priority,
        lastCompletedDate: routine.lastCompletedDate,
        streak: routine.streak
      }))
    };

const prompt = `
You are an AI Routine Optimizer.

Optimize the user's existing routines for the given goal and mode.

PROCESS THE TASK IN THIS ORDER:

1. UNDERSTAND THE GOAL
Identify what the user is trying to achieve and what types of activities directly support it and do reallocations from routines related to the goal.

2. ANALYZE EXISTING ROUTINES
For each routine, consider:
- title
- category
- priority
- allocated time
- how relevant it is to the goal
- whether its time appears flexible

Do not judge a routine only by its category or priority. Use the full context.

3. DECIDE WHAT TO PROTECT
Protect routines that appear genuinely important, fixed, essential, or difficult to sacrifice, including important study/work commitments and essential health,college/work appointments ,sleep, or recovery.

Do not reduce an important routine simply because it is less related to the current goal.

4. FIND TIME SOURCES
When additional time is useful, first look for flexible routines that are less important or less relevant to the goal.

Prefer taking time from routines naturally related to the same broad area:
- Study goals → flexible Study/Work routines
- Work/career goals → flexible Work/Study routines
- Health goals → suitable flexible Personal/Health routines
- Personal goals → suitable flexible Personal routines

A routine with much more time than comparable routines may be a possible source, especially when it has roughly 2–3x their allocation.

However, having more time alone is not enough reason to reduce it.

5. REALLOCATE TIME
Make small changes rather than taking a large amount from one routine.

Use 15-minute increments, preferably 15 or 30 minutes.

When several suitable routines can contribute, spread the reduction between them.

Prefer reallocating existing time instead of increasing the user's total routine time.

6. APPLY THE MODE

BALANCED:
Preserve important activities and leisure strictly.
Use routines with more time first.
Do not remove leisure.

INTENSIVE:
Prioritize the goal more strongly.
Leisure or other flexible activities may be reduced slightly when genuinely necessary.
Removing an activity should be uncommon and clearly justified.

HARD:
Prioritize the goal strongly when necessary.
Leisure may be reduced substantially, and may exceptionally be removed when there is no reasonable alternative.
Still protect genuinely important or fixed routines.

The mode should change how much flexibility is allowed, not simply make the same routine lose more time.

7. CHECK ADDITIONS
Only add a routine if an important goal-related activity is genuinely missing.

Do not duplicate an existing routine.
If an existing routine can reasonably cover the activity, adjust it instead.

Try to keep any addition within the existing time budget by reallocating time.
Increase total time only when genuinely necessary and existing routines cannot provide enough.

8. FINAL CHECK
Before producing the answer:
- Do not reduce important routines without a clear reason.
- Do not automatically reduce leisure.
- Do not increase total time unnecessarily.
- Prefer several small changes over one large reduction.
- Only include routines whose time actually changes.
- Return no additions when none are genuinely needed.

Think through these steps internally. Do not output the reasoning.

SUMMARY STYLE:

The summary is the user's quick view of the new plan.

Write it in a friendly, clear, practical way so the user can understand the main changes immediately without reading the changes list.

The summary should answer:
- What is the new focus?
- Where is time being added?
- Where is time being taken from?
- What important things are being preserved?

Mention the actual routine titles and time changes when useful.

Prefer natural language .
Add few reasoning for the allocation in very short when necessary and make the summary user-friendly

Keep the summary to 1–3 short sentences.

OUTPUT:
Return ONLY valid JSON.

{
  "goal": "string",
  "mode": "string",
  "summary": "string",
  "changes": [
    {
      "id": "string",
      "title": "string",
      "currentMinutes": number,
      "suggestedMinutes": number
    }
  ],
  "additions": [
    {
      "title": "string",
      "category": "study | work | personal | health | other",
      "suggestedMinutes": number,
      "priority": "low | medium | high",
      "reason": "string"
    }
  ]
}

OUTPUT RULES:
- Valid JSON only.
- currentMinutes must exactly match the existing targetHours converted to minutes.
- suggestedMinutes must be whole numbers and multiples of 15.
- changes must contain only routines whose time changes.
- Do not change routine IDs, titles, categories, priorities, streaks, or completion history.
- Return [] when no meaningful changes or additions are needed.
- No markdown.

USER DATA:
${JSON.stringify(aiData)}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash-lite",
      contents: prompt
    });

    const result = JSON.parse(response.text);

    // Gemini works in minutes, but the existing frontend
    // and routine system work in hours.
    const formattedResult = {
      ...result,

      changes: (result.changes || []).map((change) => ({
        id: change.id,
        title: change.title,
        currentHours: change.currentMinutes / 60,
        suggestedHours: change.suggestedMinutes / 60
      })),

      additions: (result.additions || []).map((addition) => ({
        ...addition,
        suggestedHours: addition.suggestedMinutes / 60
      }))
    };

    return res.status(200).json(formattedResult);

  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};

const applyChanges = async (req, res) => {
  try {
    const { changes, additions } = req.body;
    console.log("Additions received:", additions);
    for(const change of changes){
await Routine.findByIdAndUpdate(change.id,{targetHours:change.suggestedHours} );
    }
    for(const addition of additions){
      await Routine.create({
        title:addition.title,
        category:addition.category,
        targetHours:addition.suggestedHours,
        priority:addition.priority
      })
    }
    return res.status(200).json("Changes applied ")
  }catch(error){
    return res.status(500).json({message:error.message});
  }}
module.exports = { optimizeRoutine,applyChanges };