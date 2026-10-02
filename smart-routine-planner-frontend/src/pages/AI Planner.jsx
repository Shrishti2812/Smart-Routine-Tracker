import api from "../api/axios";
import { useContext, useState } from "react";
import { RoutineContext } from "../context/RoutineContext";
function AIPlanner() {
  const [goal, setGoal] = useState("");
  const [mode, setMode] = useState("balanced");
  const [result, setResult] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");
const [isApplying,setIsApplying]=useState(false);
const [applySuccess, setApplySuccess] = useState(false);
const { getRoutines } = useContext(RoutineContext);
  const modes = [
    {
      value: "balanced",
      label: "Balanced",
      description: "Small, sustainable adjustments",
    },
    {
      value: "intensive",
      label: "Intensive",
      description: "More focus on your goal",
    },
    {
      value: "hard",
      label: "Hard",
      description: "Strong goal prioritization",
    },
  ];

  const exampleGoals = [
    "Prepare for exams",
    "Run my first 5K",
    "Learn a new skill",
  ];
  const formatTime = (hours) => {
    const totalMinutes = Math.round(Number(hours || 0) * 60);

    if (totalMinutes === 0) {
      return "0m";
    }
    const wholeHours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    if (wholeHours === 0) {
      return `${minutes}m`;
    }
    if (minutes === 0) {
      return `${wholeHours}h`;
    }
    return `${wholeHours}h ${minutes}m`;
  };
 const applyChanges = async () => {
  try{
    const response=await api.post("/ai/apply",{
      changes:result.changes||[],
      additions:result.additions||[]
    })
  
    await getRoutines();
    setApplySuccess(true);
  }catch (requestError) {
    setError(
      requestError.response?.data?.message ||
        "The changes could not be applied. Please try again."
    );
  } finally {
    setIsApplying(false);
  }
};

  const handleOptimize = async (e) => {
    e.preventDefault();
    setIsGenerating(true);
    setError("");

    try {
      const response = await api.post("/ai/optimize", {
        goal,
        mode,
      });

      setResult(response.data);
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          "Your plan could not be generated. Please try again."
      );
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e2eee0] via-[#f5f7ef] to-[#d5e9df] px-8 py-15 sm:px-6">
      <div className="mx-auto max-w-7xl px-6">

        {/* Header */}
        <div className="mb-4">
          <h1 className="mt-3 text-4xl font-bold text-[#172b21]">
            AI Routine Planner
          </h1>

          <p className="mt-1 text-sm text-slate-600">
            Turn your goal and current routines into a practical plan.
          </p>
        </div>

        {/* Optimizer Form */}
        <form
          onSubmit={handleOptimize}
          aria-busy={isGenerating}
          className="rounded-xl border border-[#b3ccb0] bg-gradient-to-br from-[#f8faf4] via-[#f2f7ed] to-[#e8f1e4] px-5 py-2 shadow-[0_16px_40px_-28px_rgba(49,112,66,0.6)]"
        >
          {/* Form Header */}
          <div className="mb-1 flex items-center justify-between gap-3 border-b border-[#d2e2ce] pb-2">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#37864f]">
                Plan configuration
              </p>
            </div>

            <span className="hidden items-center gap-2 rounded-full border border-[#c8ddc5] bg-[#e8f2e4] px-3 py-1.5 text-xs font-semibold text-[#356e43] sm:inline-flex">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-[#459e60]"
              />
              AI plan engine
            </span>
          </div>

          {/* Goal + Mode */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">

            {/* Goal */}
            <div className="mb-5 min-w-0 flex-1">
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-800">
                <span
                  aria-hidden="true"
                  className="flex h-6 w-6 items-center justify-center rounded-md bg-[#dcebd7] text-xs font-bold text-[#37864f]"
                >
                  01
                </span>

                What are you working toward?
              </label>

              <input
                type="text"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                placeholder="e.g. CodeVita, placements, semester exams"
                className="w-full rounded-lg border border-[#cbdcc9] bg-white px-4 py-3 text-sm text-slate-900 shadow-inner shadow-[#e9f2e6]/70 outline-none transition placeholder:text-slate-400 focus:border-[#459e60] focus:ring-4 focus:ring-[#459e60]/15"
              />

              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="mr-1 text-xs font-medium text-slate-500">
                  Try a goal
                </span>

                {exampleGoals.map((example) => (
                  <button
                    key={example}
                    type="button"
                    onClick={() => setGoal(example)}
                    className="rounded-full border border-[#d5e4d2] bg-white/80 px-3 py-1.5 text-xs font-medium text-[#426e4b] transition hover:border-[#8fbe96] hover:bg-[#eaf6e6] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#459e60]"
                  >
                    {example}
                  </button>
                ))}
              </div>
            </div>

            {/* Mode */}
            <div className="mb-6 min-w-0 flex-[1.4]">
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-800">
                <span
                  aria-hidden="true"
                  className="flex h-6 w-6 items-center justify-center rounded-md bg-[#dcebd7] text-xs font-bold text-[#37864f]"
                >
                  02
                </span>

                Optimization mode
              </label>

              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                {modes.map((option) => (
                  <label
                    key={option.value}
                    className={`cursor-pointer rounded-lg border p-4 transition ${
                      mode === option.value
                        ? "border-[#459e60] bg-[#eaf6e6] shadow-[0_5px_14px_-10px_rgba(55,134,79,0.8)] ring-1 ring-[#459e60]/25"
                        : "border-[#d5dfd1] bg-[#fbfcf8] hover:border-[#a9cfae] hover:bg-[#f0f6ec]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="optimizationMode"
                      value={option.value}
                      checked={mode === option.value}
                      onChange={(e) => setMode(e.target.value)}
                      className="sr-only"
                    />

                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-semibold text-slate-800">
                          {option.label}
                        </p>

                        <p className="mt-1 text-xs leading-5 text-slate-500">
                          {option.description}
                        </p>
                      </div>

                      <span
                        aria-hidden="true"
                        className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                          mode === option.value
                            ? "border-[#459e60] bg-[#459e60] text-[10px] font-bold text-white"
                            : "border-slate-300 bg-white"
                        }`}
                      >
                        {mode === option.value ? "✓" : ""}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Generate Button */}
          <button
            type="submit"
            disabled={!goal.trim() || isGenerating}
            className="group mb-2 flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#286c43] to-[#4b9b61] px-4 py-3 text-sm font-semibold text-white shadow-[0_8px_18px_-10px_rgba(55,134,79,0.9)] transition hover:from-[#245d3b] hover:to-[#3d8853] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#459e60] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <span
              aria-hidden="true"
              className="text-base transition-transform group-hover:rotate-12"
            >
              {isGenerating ? "◌" : "✦"}
            </span>

            {isGenerating
              ? "Building your plan..."
              : "Generate my routine plan"}

            <span
              aria-hidden="true"
              className="text-base transition-transform group-hover:translate-x-0.5"
            >
              →
            </span>
          </button>

          {error && (
            <p
              role="alert"
              className="mb-2 text-sm font-medium text-[#a34b40]"
            >
              {error}
            </p>
          )}
        </form>

        {/* =====================================================
            AI RESULT
        ====================================================== */}
        {result && (
          <div className="mt-6 overflow-hidden rounded-xl border border-[#b3ccb0] bg-[#f9fbf6] shadow-[0_16px_40px_-28px_rgba(49,112,66,0.6)]">

            {/* Plan Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#d2e2ce] bg-[#eaf2e6] px-5 py-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#37864f]">
                  Your AI Plan
                </p>

                <h2 className="mt-1 text-lg font-semibold text-slate-900">
                  {result.goal}
                </h2>
              </div>

              <span className="rounded-full border border-[#bdd4b9] bg-[#f7faf3] px-3 py-1.5 text-xs font-semibold capitalize text-[#356e43]">
                {result.mode}
              </span>
            </div>

            {/* Overall Recommendation */}
            <div className="px-5 py-2">
              <div className="rounded-xl border border-[#78bd82]/70 bg-gradient-to-br from-[#e2f7df]/90 via-[#d8f1d8]/75 to-[#eef9e9]/85 px-4 py-3 shadow-[0_0_24px_rgba(72,180,91,0.28),inset_0_1px_0_rgba(255,255,255,0.75)] backdrop-blur-md">

                <div className="flex items-center gap-3">

                  {/* Bulb */}
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#91d39a] bg-[#effbed]/80 shadow-[0_0_16px_rgba(72,180,91,0.55)]">
                    <svg
                      className="h-5 w-5 text-[#45a85a]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.5 18h5M10 21h4M8.5 14.5a6 6 0 1 1 7 0c-.9.7-1.5 1.5-1.7 2.5h-3.6c-.2-1-.8-1.8-1.7-2.5Z"
                      />
                    </svg>
                  </div>

                  <div className="min-w-0">
                    <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#2f7544]">
                      Overall Recommendation
                    </p>

                    <p className="mt-0.5 text-sm leading-5 text-slate-700">
                      {result.summary}
                    </p>
                  </div>

                </div>
              </div>
            </div>

            {/* =================================================
                CHANGES + ADDITIONS
            ================================================= */}
            {(result.changes?.length > 0 ||
              result.additions?.length > 0) && (
              <div className="border-t border-[#d2e2ce] px-5 py-5">

                <div className="grid gap-7 lg:grid-cols-2">

                  {/* =================================================
                      TIME CHANGES
                  ================================================= */}
                  {result.changes?.length > 0 && (
                    <div>

                      <div>
                        <h3 className="text-sm font-semibold text-slate-800">
                          Time Changes
                        </h3>

                        <p className="mt-1 text-xs text-slate-500">
                          How your existing time will be reallocated
                        </p>
                      </div>

                      <div className="mt-3 space-y-2">

                        {result.changes.map((change) => {
                          const currentHours = Number(
                            change.currentHours || 0
                          );

                          const suggestedHours = Number(
                            change.suggestedHours || 0
                          );

                          const difference =
                            suggestedHours - currentHours;

                          return (
                            <div
                              key={change.id}
                              className="rounded-lg border border-[#d9e5d3] bg-[#f0f5eb] px-3.5 py-2.5"
                            >

                              <div className="flex items-center justify-between gap-3">

                                {/* Routine name */}
                                <p className="min-w-0 truncate text-sm font-medium text-slate-700">
                                  {change.title}
                                </p>

                                {/* Before → After + Change */}
                                <div className="flex shrink-0 items-center gap-2">

                                  <span className="text-xs text-slate-400">
                                    {formatTime(currentHours)}
                                  </span>

                                  <span className="text-xs text-slate-300">
                                    →
                                  </span>

                                  <span className="text-sm font-semibold text-slate-700">
                                    {formatTime(suggestedHours)}
                                  </span>

                                  <span
                                    className={`min-w-[42px] rounded-full px-2 py-0.5 text-center text-[11px] font-bold ${
                                      difference > 0
                                        ? "bg-[#e2f3df] text-[#37864f]"
                                        : difference < 0
                                        ? "bg-[#fff3d9] text-amber-700"
                                        : "bg-slate-100 text-slate-500"
                                    }`}
                                  >
                                    {difference > 0 ? "+" : difference < 0 ? "-" : ""}
                                    {formatTime(Math.abs(difference))}
                                  </span>

                                </div>
                              </div>

                            </div>
                          );
                        })}

                      </div>
                    </div>
                  )}

                  {/* =================================================
                      SUGGESTED ADDITIONS
                  ================================================= */}
                  {result.additions?.length > 0 && (
                    <div>

                      <div>
                        <h3 className="text-sm font-semibold text-slate-800">
                          Suggested Additions
                        </h3>

                        <p className="mt-1 text-xs text-slate-500">
                          Activities missing from your current routine
                        </p>
                      </div>

                      <div className="mt-3 space-y-2">

                        {result.additions.map((addition, index) => (
                          <div
                            key={index}
                            className="rounded-lg border border-[#d9e5d3] bg-[#f0f5eb] px-3.5 py-2.5"
                          >

                            <div className="flex items-start justify-between gap-3">

                              <div className="min-w-0">
                                <p className="truncate text-sm font-medium text-slate-700">
                                  {addition.title}
                                </p>

                                <span className="mt-1 inline-block rounded-full bg-[#eaf6e6] px-2 py-0.5 text-[10px] font-semibold capitalize text-[#37864f]">
                                  {addition.priority} priority
                                </span>
                              </div>

                              <span className="shrink-0 text-sm font-bold text-[#37864f]">
                                +{formatTime(addition.suggestedHours)}
                              </span>

                            </div>

                            <p className="mt-1.5 text-xs leading-5 text-slate-500">
                              {addition.reason}
                            </p>

                          </div>
                        ))}

                      </div>
                       
                    </div>
                  )}

                </div>
              </div>
            )}
 
<div className="border-t border-[#d2e2ce] px-5 py-4">

  {applySuccess && (
    <p className="mb-3 text-center text-sm font-medium text-[#37864f]">
      ✓ Changes applied successfully. Your routines have been updated.
    </p>
  )}
<button
  type="button"
  onClick={applyChanges}
  disabled={isApplying || applySuccess}
  className="w-full rounded-lg bg-gradient-to-r from-[#286c43] to-[#4b9b61] px-4 py-3 text-sm font-semibold text-white shadow-[0_8px_18px_-10px_rgba(55,134,79,0.9)] transition hover:from-[#245d3b] hover:to-[#3d8853] disabled:cursor-not-allowed disabled:opacity-70"
>
  {isApplying
    ? "Applying changes..."
    : applySuccess
      ? "✓ Changes Applied"
      : "Apply Changes"}
</button>

</div>
 
          </div>
        )}

      </div>
    </div>
  );
}

export default AIPlanner;