import RoutineItem from "./RoutineItem";
import { useState } from "react";

function RoutineList({
  routines,
  toggleDone,
  handleEdit,
  handleDelete
}) {

  const [searchTerm, setSearchTerm] = useState("");
  const [filterPriority, setFilterPriority] = useState("All");
  const [filterCategory, setFilterCategory] = useState("All");
  const [sortBy, setSortBy] = useState("newest");


  // Search + filters
  const filteredRoutines = routines
    .filter((routine) =>
      routine.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
    .filter((routine) =>
      filterPriority === "All"
        ? true
        : routine.priority === filterPriority
    )
    .filter((routine) =>
      filterCategory === "All"
        ? true
        : routine.category === filterCategory
    );


  // Priority order for sorting
  const priorityOrder = {
    high: 3,
    medium: 2,
    low: 1
  };


  // Sorting
  const sortedRoutines = [...filteredRoutines].sort((a, b) => {

    if (sortBy === "newest") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }

    if (sortBy === "oldest") {
      return new Date(a.createdAt) - new Date(b.createdAt);
    }

    if (sortBy === "high-low") {
      return (
        priorityOrder[b.priority] -
        priorityOrder[a.priority]
      );
    }

    if (sortBy === "low-high") {
      return (
        priorityOrder[a.priority] -
        priorityOrder[b.priority]
      );
    }

    return 0;
  });


  return (
    <>
      <div className="w-full rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-sm md:p-5">
        <div className="mb-4 flex items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-base font-semibold text-slate-900">Your routine list</h2>
            <p className="mt-0.5 text-xs text-slate-500">Search, sort, and update your routines</p>
          </div>
          <span className="rounded-full bg-[#e0f2dc] px-3 py-1.5 text-xs font-semibold text-[#3e7849]">
            {sortedRoutines.length} shown
          </span>
        </div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-[2.2fr_1fr_1fr_1fr] md:items-center">
          <input
            type="text"
            placeholder="Search routines..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full min-w-0 rounded-xl border border-slate-200 bg-[#f8fbf7] px-3 py-2.5 text-sm text-slate-700 transition placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#9bc6a1]"
          />

          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="w-full min-w-0 rounded-xl border border-slate-200 bg-[#f8fbf7] px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#9bc6a1]"
          >
            <option value="All">Priority</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="w-full min-w-0 rounded-xl border border-slate-200 bg-[#f8fbf7] px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#9bc6a1]"
          >
            <option value="All">Category</option>
            <option value="health">Health</option>
            <option value="study">Study</option>
            <option value="work">Work</option>
            <option value="personal">Personal</option>
            <option value="other">Other</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full min-w-0 rounded-xl border border-slate-200 bg-[#f8fbf7] px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#9bc6a1]"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="high-low">High → Low</option>
            <option value="low-high">Low → High</option>
          </select>
        </div>


        {/* List */}
        <div className="mt-4 flex max-h-[44vh] flex-col gap-3 overflow-y-auto pr-1 md:max-h-[58vh]">

          {sortedRoutines.length > 0 ? sortedRoutines.map((routine) => (

            <RoutineItem
              key={routine.id}
              routine={routine}
              onEdit={toggleDone}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />

          )) : (
            <div className="rounded-xl border border-dashed border-slate-200 bg-[#f8fbf7] px-4 py-10 text-center">
              <p className="text-sm font-medium text-slate-700">
                {routines.length ? "No routines match these filters" : "No routines yet"}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                {routines.length ? "Try another search or filter." : "Add a routine to start building your daily plan."}
              </p>
            </div>
          )}

        </div>

      </div>
    </>
  );
}

export default RoutineList;
