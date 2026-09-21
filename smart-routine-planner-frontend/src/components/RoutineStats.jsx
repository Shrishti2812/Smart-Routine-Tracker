function RoutineStats({ stats }) {

  if (!stats) return null;

  let message = "";

  if (Number(stats.completedRate) === 100) {
    message =
      "Amazing! You've completed all your routines today! Keep up the fantastic work!";
  } else if (Number(stats.completedRate) >= 75) {
    message =
      "Great job! You're making excellent progress. Keep pushing to complete the rest!";
  } else if (Number(stats.completedRate) >= 50) {
    message =
      "Good effort! You're halfway there. Stay focused and keep going!";
  } else if (Number(stats.completedRate) >= 20) {
    message =
      "Don't worry, every step counts! Keep working on your routines and you'll see progress!";
  } else {
    message =
      "Let's get started! Every routine you complete today is a step towards your goals. You can do it!";
  }

  return (
    <>
      <div className="w-full bg-white border border-slate-200 rounded-2xl shadow-sm p-5">

        {/* Header */}
        <div className="flex items-start justify-between mb-5">

          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Routine Statistics
            </h2>

            <p className="text-xs text-slate-500">
              Overview of your productivity
            </p>
          </div>

          <div className="text-right">
            <p className="text-xs text-slate-500">
              Completion Rate
            </p>

            <p className="text-2xl font-semibold text-emerald-600">
              {stats.completedRate}%
            </p>
          </div>

        </div>

        {/* Progress */}
        <div className="mb-5">

          <div className="flex items-center justify-between mb-2">

            <span className="text-sm text-slate-600">
              Today's Progress
            </span>

            <span className="text-sm font-medium text-slate-900">
              {stats.completed}/{stats.total}
            </span>

          </div>

          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">

            <div
              className="h-full bg-emerald-500 transition-all duration-500"
              style={{ width: `${stats.completedRate}%` }}
            />

          </div>

        </div>

        {/* Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">

          {/* Priority */}
          <div className="border border-slate-200 rounded-xl p-4">

            <h3 className="text-sm font-semibold text-slate-900 mb-3">
              Priority
            </h3>

            <div className="space-y-2 text-sm">

              <div className="flex justify-between">
                <span className="text-slate-600">
                  🔴 High
                </span>

                <span className="font-medium">
                  {stats.priorityCount.high}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-600">
                  🟡 Medium
                </span>

                <span className="font-medium">
                  {stats.priorityCount.medium}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-600">
                  🟢 Low
                </span>

                <span className="font-medium">
                  {stats.priorityCount.low}
                </span>
              </div>

            </div>

          </div>

          {/* Category */}
          <div className="border border-slate-200 rounded-xl p-4">

            <h3 className="text-sm font-semibold text-slate-900 mb-3">
              Category
            </h3>

            <div className="space-y-2 text-sm">

              <div className="flex justify-between">
                <span className="text-slate-600">
                  Study
                </span>

                <span className="font-medium">
                  {stats.categoryCount.study}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-600">
                  Work
                </span>

                <span className="font-medium">
                  {stats.categoryCount.work}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-600">
                  Personal
                </span>

                <span className="font-medium">
                  {stats.categoryCount.personal}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-600">
                  Health
                </span>

                <span className="font-medium">
                  {stats.categoryCount.health}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-600">
                  Other
                </span>

                <span className="font-medium">
                  {stats.categoryCount.other}
                </span>
              </div>

            </div>

          </div>

        </div>

        {/* Motivation */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">

          <h3 className="text-sm font-semibold text-slate-900 mb-1">
            Motivation
          </h3>

          <p className="text-sm text-slate-600 leading-relaxed">
            {message}
          </p>

        </div>

      </div>
    </>
  );
}

export default RoutineStats;