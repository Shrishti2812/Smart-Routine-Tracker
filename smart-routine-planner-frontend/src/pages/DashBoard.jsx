 
import StatsTop from "../components/StatsTop";
import RoutineStats from "../components/RoutineStats";
import { useContext } from "react";
import { RoutineContext } from "../context/RoutineContext.jsx";

function DashBoard() {
  const { stats, routines } = useContext(RoutineContext);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e2eee0] via-[#f5f7ef] to-[#d5e9df] py-8 text-slate-900">

      {/* Page Header */}
      <div className="px-4 pt-8 sm:px-8 lg:px-12 lg:pt-10">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-[#37864f]">
          Daily snapshot
        </p>
        <h1 className="text-2xl font-bold tracking-tight text-[#172b21] sm:text-4xl">
          Your Routine Overview
        </h1>

        <p className="mt-1 text-sm text-slate-600 sm:text-base">
          A quick look at your routines and today's progress.
        </p>
      </div>

      {/* Main Dashboard */}
      <main className="mt-5 space-y-6 pb-10">

        {/* Progress + Stats */}
        <StatsTop stats={stats} />

        {/* Today's routines + breakdown */}
        <RoutineStats
          stats={stats}
          routines={routines}
        />

      </main>
    </div>
  );
}

export default DashBoard;