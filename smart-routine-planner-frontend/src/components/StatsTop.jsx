function StatsTop({routines}) {
  const today= new Date().toISOString().split("T")[0];

     const total=routines.length;
    const completed=routines.filter(r=>r.lastCompletedDate===today).length;
    const pending=total-completed;
    const completedRate=routines.length===0?0:((completed/total)*100).toFixed(2);
    return (
        <>
        
     <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 px-4 sm:px-12">

  {/* Total */}
  <div className="bg-white border border-slate-200 rounded-xl p-2 md:p-4 shadow-sm hover:shadow-md transition">
    <p className="text-sm text-slate-500">Total Routines</p>
    <p className="text-2xl font-semibold text-slate-900 mt-1">
      {total}
    </p>
  </div>

  {/* Completed */}
  <div className="bg-white border border-slate-200 rounded-xl p-2 md:p-4 shadow-sm hover:shadow-md transition">
    <p className="text-sm text-slate-500">Completed</p>
    <p className="text-2xl font-semibold text-emerald-600 mt-1">
      {completed}
    </p>
  </div>

  {/* Pending */}
  <div className="bg-white border border-slate-200 rounded-xl p-2 md:p-4 shadow-sm hover:shadow-md transition">
    <p className="text-sm text-slate-500">Pending</p>
    <p className="text-2xl font-semibold text-amber-500 mt-1">
      {pending}
    </p>
  </div>

  {/* Completion Rate */}
  <div className="bg-white border border-slate-200 rounded-xl p-2 md:p-4 shadow-sm hover:shadow-md transition">
    <p className="text-sm text-slate-500">Completion Rate</p>
    <p className="text-2xl font-semibold text-indigo-600 mt-1">
      {completedRate}%
    </p>
  </div>

</div>
        </>
    )
}
export default StatsTop;