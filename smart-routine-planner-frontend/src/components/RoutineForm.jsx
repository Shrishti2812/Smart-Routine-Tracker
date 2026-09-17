function RoutineForm({ addRoutine, routine, setRoutine, editId,error }) {
    
    return (
        <>
      <div className="w-full bg-white border border-slate-200/80 rounded-[1.75rem] shadow-xl shadow-slate-200/30 p-5">

  {/* Header */}
  <div className="mb-3">
    <h2 className="text-lg font-semibold text-slate-900">
      Create Routine
    </h2>
    <p className="text-xs text-slate-500">
      Add a new habit
    </p>
  </div>

  <form className="flex flex-col gap-3">

    {/* Title */}
    <input
      type="text"
      placeholder="Routine name"
      value={routine.title}
      onChange={(e) =>
        setRoutine({ ...routine, title: e.target.value })
      }
      className="
        w-full
        px-3 py-2
        text-sm
        bg-slate-50
        border border-slate-200
        rounded-lg
        focus:outline-none
        focus:ring-1 focus:ring-indigo-500
      "
    />

    {/* Category + Hours */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">

      <select
        value={routine.category}
        onChange={(e) =>
          setRoutine({ ...routine, category: e.target.value })
        }
        className="
          px-3 py-2
          text-sm
          bg-slate-50
          border border-slate-200
          rounded-lg
          focus:ring-1 focus:ring-indigo-500
          outline-none
        "
      >
        <option value="">Category</option>
        <option value="study">Study</option>
        <option value="work">Work</option>
        <option value="personal">Personal</option>
        <option value="health">Health</option>
        <option value="other">Other</option>
      </select>

      <input
        type="number"
        placeholder="Hours"
        value={routine.targetHours}
        onChange={(e) =>
          setRoutine({
            ...routine,
            targetHours: parseFloat(e.target.value) || 0,
          })
        }
        className="
          px-3 py-2
          text-sm
          bg-slate-50
          border border-slate-200
          rounded-lg
          focus:ring-1 focus:ring-indigo-500
          outline-none
        "
      />

    </div>

    {/* Priority */}
    <div className="flex justify-between text-sm">

      <label className="flex items-center gap-1 cursor-pointer">
        <input
          type="radio"
          name="priority"
          checked={routine.priority === "high"}
          onChange={() =>
            setRoutine({ ...routine, priority: "high" })
          }
        />
        <span className="text-red-500">High</span>
      </label>

      <label className="flex items-center gap-1 cursor-pointer">
        <input
          type="radio"
          name="priority"
          checked={routine.priority === "medium"}
          onChange={() =>
            setRoutine({ ...routine, priority: "medium" })
          }
        />
        <span className="text-amber-500">Medium</span>
      </label>

      <label className="flex items-center gap-1 cursor-pointer">
        <input
          type="radio"
          name="priority"
          checked={routine.priority === "low"}
          onChange={() =>
            setRoutine({ ...routine, priority: "low" })
          }
        />
        <span className="text-emerald-600">Low</span>
      </label>

    </div>

    {/* Button */}
    <button
      type="submit"
      onClick={(e) => {
        e.preventDefault();
        addRoutine(routine);
      }}
      className="
        w-full
        py-2
        text-sm
        font-medium
        bg-indigo-600
        text-white
        rounded-lg
        hover:bg-indigo-700
        transition
      "
    >
      {editId ? "Update Routine" : "Add Routine"}
    </button>

    {/* Error */}
    {error && (
      <p className="text-xs text-red-500">
        {error}
      </p>
    )}

  </form>
</div>
        </>
    );
}
export default RoutineForm;
