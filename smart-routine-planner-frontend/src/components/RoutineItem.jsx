function RoutineItem({ routine, onEdit, handleDelete, handleEdit }) {
  const today=  new Date().toISOString().split("T")[0];
  const isCompletedToday = routine.lastCompletedDate === today;
    return (
    <>
 <div className="rounded-xl border border-[#c6d9bd] border-l-[3px] border-l-[#67a975] bg-gradient-to-r from-[#e8f1df] to-[#f1f5e9] px-3 py-2.5 shadow-[0_5px_15px_-12px_rgba(31,67,43,0.6)] transition duration-200 hover:border-[#91b995] hover:border-l-[#459e60] hover:from-[#e4f0dc] hover:to-[#f4f8ee] hover:shadow-md sm:px-3.5 sm:py-3">

  {/* Header */}
  <div className="flex items-start justify-between">

    <div className="min-w-0">
      <h2 className="truncate text-sm font-bold text-[#20382a]">
        {routine.title}
      </h2>

      <p className="mt-1 flex flex-wrap items-center gap-1.5 text-xs text-slate-600">
        <span className="rounded-md border border-[#d4e1ce] bg-[#f7faf2] px-1.5 py-0.5 font-medium capitalize text-[#45634c]">{routine.category}</span>
        <span className="text-slate-300">·</span>
        <span>{routine.targetHours} hrs</span>
      </p>
    </div>

    <div className="ml-2 flex shrink-0 flex-wrap items-center justify-end gap-1.5">

      {/* Streak */}
      <div className="inline-flex items-center gap-1 rounded-md border border-[#c8e1bb] bg-[#e5f3d9] px-2 py-1">
        <span aria-hidden="true" className="text-xs leading-none">🔥</span>
        <span className="text-xs font-semibold tabular-nums text-[#4d773d]">
          {routine.streak}d
        </span>
      </div>

      {/* Priority */}
      <span
        className={`rounded-full px-2 py-1 text-[11px] font-bold capitalize
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
  <div className="mt-2.5 flex flex-wrap items-center gap-1.5 border-t border-[#d7e2d2] pt-2">

    <button
       onClick={() => onEdit(routine.id)}
          
      className={`rounded-md border px-2.5 py-1 text-xs font-semibold transition
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
      className="rounded-md border border-[#d7e0d3] bg-[#f7f9f4] px-2.5 py-1 text-xs font-medium text-slate-600 transition hover:border-[#b6c9af] hover:bg-[#edf3e8]"
    >
      Edit
    </button>

    <button
      onClick={() => handleDelete(routine.id)}
      className="rounded-md border border-[#ead4d1] bg-[#fbf7f4] px-2.5 py-1 text-xs font-medium text-[#a65d54] transition hover:bg-[#fbf1ef]"
    >
      Delete
    </button>

  </div>

</div>
</>
    );
}
    export default RoutineItem;