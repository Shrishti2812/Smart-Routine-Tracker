function RoutineItem({ routine, onEdit, handleDelete, handleEdit }) {
  const today=  new Date().toISOString().split("T")[0];
  const isCompletedToday = routine.lastCompletedDate === today;
    return (
    <>
 <div className="bg-white border border-slate-200/80 rounded-[1.75rem] p-5 shadow-sm transition duration-300 hover:shadow-xl">

  {/* Header */}
  <div className="flex items-start justify-between">

    <div>
      <h2 className="font-semibold text-slate-900">
        {routine.title}
      </h2>

      <p className="text-sm text-slate-500 mt-1">
        {routine.category} • {routine.targetHours} hrs
      </p>
    </div>

    <div className="flex items-center gap-2">

      {/* Streak */}
      <div className="bg-orange-50 border border-orange-100 px-3 py-1 rounded-xl">
        <span className="text-orange-600 font-semibold text-sm">
          🔥 {routine.streak}
        </span>
      </div>

      {/* Priority */}
      <span
        className={`px-2.5 py-1 rounded-full text-xs font-medium
        ${
          routine.priority === "high"
            ? "bg-red-100 text-red-700"
            : routine.priority === "medium"
            ? "bg-amber-100 text-amber-700"
            : "bg-emerald-100 text-emerald-700"
        }`}
      >
        {routine.priority}
      </span>

    </div>
  </div>

  {/* Actions */}
  <div className="flex items-center gap-2 mt-4">

    <button
       onClick={() => {
    console.log("Done clicked, ID:", routine.id);
    onEdit(routine.id);
  }}
          
      className={`px-3 py-1.5 rounded-lg text-sm font-medium text-white transition
      ${
        isCompletedToday
          ? "bg-emerald-600 hover:bg-emerald-700"
          : "bg-blue-600 hover:bg-blue-700"
      }`}
    >
      {isCompletedToday ? "✓ Done" : "Mark Done"}
    </button>

    <button
      onClick={() => handleEdit(routine)}
      className="px-3 py-1.5 rounded-lg text-sm border border-slate-200 text-slate-600 hover:bg-slate-50"
    >
      Edit
    </button>

    <button
      onClick={() => handleDelete(routine.id)}
      className="px-3 py-1.5 rounded-lg text-sm border border-red-200 text-red-500 hover:bg-red-50"
    >
      Delete
    </button>

  </div>

</div>
</>
    );
}
    export default RoutineItem;