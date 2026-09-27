function RoutineItem({ routine, onEdit, handleDelete, handleEdit }) {
  const today=  new Date().toISOString().split("T")[0];
  const isCompletedToday = routine.lastCompletedDate === today;
    return (
    <>
 <div className="rounded-2xl border border-[#cce2c7] bg-[#eff7e9] p-4 shadow-sm transition duration-200 hover:border-[#9fceaa] hover:bg-white hover:shadow-md sm:p-5">

  {/* Header */}
  <div className="flex items-start justify-between">

    <div className="min-w-0">
      <h2 className="font-semibold text-slate-900">
        {routine.title}
      </h2>

      <p className="mt-1.5 flex flex-wrap items-center gap-1.5 text-sm text-slate-500">
        <span className="rounded-md bg-slate-100 px-2 py-0.5 capitalize">{routine.category}</span>
        <span className="text-slate-300">·</span>
        <span>{routine.targetHours} hrs</span>
      </p>
    </div>

    <div className="ml-3 flex shrink-0 flex-wrap items-center justify-end gap-2">

      {/* Streak */}
      <div className="inline-flex items-center gap-1.5 rounded-lg border border-[#c8e1bb] bg-[#e5f3d9] px-2.5 py-1">
        <span aria-hidden="true" className="text-sm leading-none">🔥</span>
        <span className="text-sm font-semibold tabular-nums text-[#4d773d]">
          {routine.streak} day streak
        </span>
      </div>

      {/* Priority */}
      <span
        className={`px-2.5 py-1 rounded-full text-xs font-medium
        ${
          routine.priority === "high"
            ? "bg-[#fde6e2] text-[#a34b40]"
            : routine.priority === "medium"
            ? "bg-[#fff0d2] text-[#805d20]"
            : "bg-[#e0f2dc] text-[#3e7849]"
        }`}
      >
        {routine.priority}
      </span>

    </div>
  </div>

  {/* Actions */}
  <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-3">

    <button
       onClick={() => {
    console.log("Done clicked, ID:", routine.id);
    onEdit(routine.id);
  }}
          
      className={`rounded-lg border px-3 py-1.5 text-sm font-semibold transition
      ${
        isCompletedToday
          ? "border-[#abd8af] bg-[#dcf1dc] text-[#347b48] hover:bg-[#cce9cf]"
          : "border-[#459e60] bg-[#459e60] text-white hover:bg-[#37864f]"
      }`}
    >
      {isCompletedToday ? "✓ Done" : "Mark Done"}
    </button>

    <button
      onClick={() => handleEdit(routine)}
      className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
    >
      Edit
    </button>

    <button
      onClick={() => handleDelete(routine.id)}
      className="rounded-lg border border-[#ead4d1] px-3 py-1.5 text-sm font-medium text-[#a65d54] transition hover:bg-[#fbf1ef]"
    >
      Delete
    </button>

  </div>

</div>
</>
    );
}
    export default RoutineItem;