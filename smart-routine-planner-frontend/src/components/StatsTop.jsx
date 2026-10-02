function StatsTop({ stats }) {
  if (!stats) return null;

  const completionRate = Number(stats.completedRate);
  return (
    <div className="px-4 sm:px-8 lg:px-12">
  <div className="grid grid-cols-1 overflow-hidden rounded-2xl border border-[#cad9c7] bg-[#f8faf4] shadow-[0_14px_34px_-28px_rgba(31,67,43,0.5)] lg:grid-cols-2">

    {/* Progress */}
    <div className="flex items-center gap-5 border-b border-[#d4e7d6] bg-[#edf6ed] px-5 py-7 text-slate-900 sm:gap-6 sm:px-8 lg:border-b-0 lg:border-r">
      
    <div
  className="grid h-36 w-36 shrink-0 place-items-center rounded-full sm:h-40 sm:w-40"
  role="img"
  aria-label={`Today's progress: ${Math.round(stats.completedRate)}%`}
  style={{
    background: `conic-gradient(
      from -90deg,
      #49a86a ${stats.completedRate}%,
      #cce7ca ${stats.completedRate}% 100%
    )`,
  }}
>
  <div className="grid h-24 w-24 place-content-center rounded-full bg-[#e3f5df] text-center sm:h-32 sm:w-32">
    <span className="text-2xl font-bold tabular-nums text-slate-900 sm:text-4xl">
      {Math.round(completionRate)}%
    </span>

    <span className="mt-1 text-xs font-medium text-slate-500">
      complete
    </span>
  </div>
</div>

      <div>
        <p className="text-sm font-semibold text-slate-800 sm:text-base">
          Today's Progress
        </p>

        <p className="mt-2 max-w-[170px] text-sm leading-relaxed text-slate-600">
          {stats.completed} of {stats.total} routines completed today
        </p>
      </div>
    </div>

    {/* Stats */}
    <div className="grid grid-cols-2 bg-[#f1f4ec]">
      
      <div className="flex min-h-[125px] flex-col justify-center border-b border-r border-[#d9e2d5] bg-[#f7f8f2] px-5 py-5 sm:px-6">
        <p className="text-xs font-semibold text-slate-500">
          Total Routines
        </p>
        <p className="mt-1 text-3xl font-semibold tabular-nums text-slate-900">
          {stats.total}
        </p>
        <span className="mt-1 text-xs text-slate-500">in your plan</span>
      </div>

      <div className="flex min-h-[125px] flex-col justify-center border-b border-[#d9e2d5] bg-[#eaf2e5] px-5 py-5 sm:px-6">
        <p className="text-xs font-semibold text-slate-500">
          Completed
        </p>
        <p className="mt-1 text-3xl font-semibold tabular-nums text-emerald-700">
          {stats.completed}
        </p>
        <span className="mt-1 text-xs text-slate-500">done today</span>
      </div>

      <div className="flex min-h-[125px] flex-col justify-center border-r border-[#d9e2d5] bg-[#f4f2e9] px-5 py-5 sm:px-6">
        <p className="text-xs font-semibold text-slate-500">
          Pending
        </p>
        <p className="mt-1 text-3xl font-semibold tabular-nums text-slate-700">
          {stats.pending}
        </p>
        <span className="mt-1 text-xs text-slate-500">still to go</span>
      </div>

      <div className="flex min-h-[125px] flex-col justify-center bg-[#e7f0e9] px-5 py-5 sm:px-6">
        <p className="text-xs font-semibold text-slate-500">
          Completion Rate
        </p>
        <p className="mt-1 text-3xl font-semibold tabular-nums text-emerald-700">
             {Math.round(stats.completedRate)}%
        </p>
        <span className="mt-1 text-xs text-slate-500">of today's plan</span>
      </div>

    </div>
  </div>
</div>
  );
}

export default StatsTop;