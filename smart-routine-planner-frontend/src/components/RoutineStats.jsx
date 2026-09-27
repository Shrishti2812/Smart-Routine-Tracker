function RoutineStats({ stats, routines = [] }) {
  if (!stats) return null;

  const today = new Date().toISOString().split("T")[0];

  const priorityCount = stats.priorityCount || {};
  const categoryCount = stats.categoryCount || {};
  const priorityItems = [
    { label: "High", key: "high", color: "#cf766b" },
    { label: "Medium", key: "medium", color: "#d1a247" },
    { label: "Low", key: "low", color: "#70ad80" },
  ];
  const categoryItems = [
    { label: "Study", key: "study" },
    { label: "Work", key: "work" },
    { label: "Personal", key: "personal" },
    { label: "Health", key: "health" },
    { label: "Other", key: "other" },
  ];
  return (
    <div className="grid grid-cols-1 gap-5 px-4 mt-5 sm:px-8 lg:grid-cols-5 lg:px-12">

      {/* Today's Routines */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:col-span-4">

        <div className="flex items-center justify-between border-b border-slate-200 bg-[#f0f8eb] px-5 py-4">
          <div>
            <h2 className="text-base font-semibold text-slate-900">
              Today's Routines
            </h2>

            <p className="mt-0.5 text-xs text-slate-500">
              Your routines for today
            </p>
          </div>

          <span className="rounded-full bg-[#e0f2dc] px-3 py-1 text-xs font-semibold text-[#3e7849]">
            {stats.completed || 0}/{stats.total || 0} completed
          </span>
        </div>

        <div className="divide-y divide-slate-100">

          {routines.length > 0 ? (
            routines.map((routine) => {
              const isCompleted =
                routine.lastCompletedDate === today;

              return (
                <div
                  key={routine.id || routine._id}
                  className="flex items-center justify-between px-5 py-3 transition-colors hover:bg-[#f3f9f2]"
                >

                  {/* Routine info */}
                  <div className="flex min-w-0 items-center gap-3">

                    <div
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs ${
                        isCompleted
                          ? "border-[#a6d5aa] bg-[#dcf1dc] text-[#347b48]"
                          : "border-slate-300 bg-slate-50 text-slate-400"
                      }`}
                    >
                      {isCompleted ? "✓" : "○"}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-slate-800">
                        {routine.title || "Untitled Routine"}
                      </p>

                      <p className="mt-1 flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
                        <span className="rounded bg-slate-100 px-1.5 py-0.5">
                          {routine.category || "Other"}
                        </span>
                        <span className="rounded bg-[#fbf2df] px-1.5 py-0.5 text-[#79613a]">
                          {routine.priority || "medium"} priority
                        </span>
                      </p>
                    </div>

                  </div>

                  {/* Hours */}
                  <span className="ml-4 shrink-0 rounded-lg bg-[#eaf4e9] px-2.5 py-1.5 text-sm font-semibold text-[#426e4b]">
                    {routine.targetHours ?? 0} hrs
                  </span>

                </div>
              );
            })
          ) : (
            <div className="px-5 py-7 text-center text-sm text-slate-400">
              No routines added yet.
            </div>
          )}

        </div>
      </div>


      {/* Breakdown */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:col-span-1">

        {/* Priority */}
        <div className="bg-[#f5faf4] px-4 py-4">

          <h3 className="text-sm font-semibold text-slate-900">
            Priority
          </h3>

          <div className="mt-3 space-y-2 text-sm">
            {priorityItems.map(({ label, key, color }) => {
              const count = priorityCount[key] || 0;
              return (
                <div key={key} className="flex items-center justify-between gap-2">
                  <span className="flex items-center gap-2 text-slate-600">
                    <span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: color }} />
                    {label}
                  </span>
                  <span className="font-semibold tabular-nums text-slate-800">{count}</span>
                </div>
              );
            })}
          </div>
        </div>


        <div className="border-t border-slate-200" />


        {/* Categories */}
        <div className="px-4 py-4">

          <h3 className="text-sm font-semibold text-slate-900">
            Categories
          </h3>

          <div className="mt-3 space-y-2 text-sm">
            {categoryItems.map(({ label, key }) => {
              const count = categoryCount[key] || 0;
              return (
                <div key={key} className="flex items-center justify-between gap-2">
                  <span className="text-slate-600">{label}</span>
                  <span className="font-semibold tabular-nums text-slate-800">{count}</span>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
}

export default RoutineStats;