function RoutineForm({ addRoutine, routine, setRoutine, editId,error }) {
    
    return (
        <>
      <div className="w-full">

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
      className="w-full rounded-xl border border-[#d1ddcc] bg-[#eef3e9] px-3 py-2.5 text-sm text-slate-700 placeholder:text-slate-500 focus:border-[#8fb99a] focus:outline-none focus:ring-2 focus:ring-[#9bc6a1]"
    />

    {/* Category + Hours */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">

      <select
        value={routine.category}
        onChange={(e) =>
          setRoutine({ ...routine, category: e.target.value })
        }
        className="rounded-xl border border-[#d1ddcc] bg-[#eef3e9] px-3 py-2.5 text-sm text-slate-700 focus:border-[#8fb99a] focus:outline-none focus:ring-2 focus:ring-[#9bc6a1]"
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
        className="rounded-xl border border-[#d1ddcc] bg-[#eef3e9] px-3 py-2.5 text-sm text-slate-700 placeholder:text-slate-500 focus:border-[#8fb99a] focus:outline-none focus:ring-2 focus:ring-[#9bc6a1]"
      />

    </div>

    {/* Priority */}
    <div className="flex justify-between gap-2 rounded-xl border border-[#d1ddcc] bg-[#edf3e8] p-3 text-sm">

      <label className="flex items-center gap-1 cursor-pointer">
        <input
          type="radio"
          name="priority"
          className="accent-[#459e60]"
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
          className="accent-[#459e60]"
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
          className="accent-[#459e60]"
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
      className="w-full rounded-xl bg-[#459e60] py-2.5 text-sm font-semibold text-white transition hover:bg-[#37864f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#459e60]"
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
