import RoutineItem from "./RoutineItem";
import { useState } from "react";
function RoutineList({routines,  toggleDone, handleEdit, handleDelete}) {
   const [searchTerm,setSearchTerm]=useState("");
   const [filterPriority,setFilterPriority]=useState("All");
   const [filterCategory,setFilterCategory]=useState("All");
   const [sortBy,setSortBy]=useState("newest");

   const filteredRoutines=routines.filter((routine)=>
    routine.title.toLowerCase().includes(searchTerm.toLowerCase())
).filter((routine)=>
filterPriority==="All"? true:routine.priority==filterPriority
).filter((routine)=>filterCategory==="All"? true:routine.category==filterCategory
);
const priorityOrder={"high":3,"medium":2,"low":1};
const sortedRoutines=filteredRoutines.sort((a,b)=>{
  if(sortBy==="newest"){
    return b.id-a.id;
  }
  if(sortBy==="oldest"){
    return a.id-b.id;
  }
  if(sortBy==="high-low"){
    return priorityOrder[b.priority]-priorityOrder[a.priority];
  }
  if(sortBy==="low-high"){
    return priorityOrder[a.priority]-priorityOrder[b.priority];
  }
});
    return (
        <>
       <div className="w-full bg-white border border-slate-200/80 rounded-[1.75rem] shadow-xl shadow-slate-200/30 p-6">

  {/* Header */}
  <div className="mb-4">
    <h2 className="text-xl font-semibold text-slate-900">
      Your Routines
    </h2>
    <p className="text-sm text-slate-500 mt-1">
      Track and manage your daily habits
    </p>
  </div>

  {/* Search */}
  <input
    type="text"
    placeholder="Search routines..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="
      w-full
      px-4 py-2.5
      text-sm
      bg-slate-50
      border border-slate-200
      rounded-xl
      focus:outline-none
      focus:ring-2 focus:ring-indigo-500
      transition
    "
  />

  {/* Filters */}
  <div className="grid grid-cols-1  md:grid-cols-3 gap-3 mt-4">

    <select
      value={filterPriority}
      onChange={(e) => setFilterPriority(e.target.value)}
      className="px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
    >
      <option value="All">Priority</option>
      <option value="high">High</option>
      <option value="medium">Medium</option>
      <option value="low">Low</option>
    </select>

    <select
      value={filterCategory}
      onChange={(e) => setFilterCategory(e.target.value)}
      className="px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
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
      className="px-3 py-2.5   text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
    >
      <option value="newest">Newest First</option>
      <option value="oldest">Oldest First</option>
      <option value="high-low">High → Low</option>
      <option value="low-high">Low → High</option>
    </select>

  </div>

  {/* List */}
  <div className="flex flex-col gap-3 mt-5 max-h-[40vh]  md:max-h-[600px] overflow-y-auto pr-1">

    {filteredRoutines.map((routine) => (
      <RoutineItem
        key={routine.id}
        routine={routine}
        onEdit={toggleDone}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />
    ))}

  </div>

</div>
        </>
    );
}
export default RoutineList;
