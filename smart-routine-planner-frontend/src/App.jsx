import { useState,useEffect } from 'react'
import RoutineForm from './components/RoutineForm.jsx';
import RoutineList from './components/RoutineList.jsx';
import RoutineStats from './components/RoutineStats.jsx';
 import DeleteModal from './components/DeleteModal.jsx';
 import StatsTop from './components/StatsTop.jsx';
function App() {
const [routine, setRoutine] = useState({
  id: Date.now(),
  title: "",
  category: "",
  targetHours:"",
  priority:"",
  completed:false,
  streak:0,
  lastCompletedDate:null,
});

const[error,setError]=useState("");
const [editId, setEditId] = useState(null);

const[showDelete,setShowDelete]=useState(false);
const [deleteId,setDeleteId]=useState(null);

 // Load routines from localStorage on initial render
  const [routines, setRoutines] = useState(()=>{
  try{
   const data = localStorage.getItem("routines");
    const parsed = data ? JSON.parse(data) : [];    
    return Array.isArray(parsed) ? parsed : [];
  }catch(error){
    console.error("Error parsing notes from localStorage:", error);
    return [];
  }
});
  
// Save routines to localStorage whenever they change
useEffect(()=>{
    localStorage.setItem("routines",JSON.stringify(routines))
  },[routines]);


const addRoutine = (passedRoutine) => {
  const current = passedRoutine || routine;
  if(!current.title || !current.category || !current.targetHours || !current.priority){
    setError("Please fill in all fields");
    return;
  }
  setError("");
  if (editId) {
    const updatedRoutines = routines.map((item) =>
      item.id === editId ? { ...current, id: editId } : item
    );
    setRoutines(updatedRoutines);
    setEditId(null);
  } else {
    const newRoutine = { ...current, id: Date.now() };
    setRoutines([...routines, newRoutine]);
  }
  setRoutine({
    id: Date.now(),
    title: "",
    category: "",
    targetHours: "",
    priority: "",
    completed: false,
    streak:0,
    lastCompletedDate:null,
  });
};

 
const handleEdit=(item)=>{
  setRoutine({
    title:item.title,
    category:item.category,
    targetHours:item.targetHours,
    priority:item.priority,
    completed:item.completed,
    streak:item.streak,
    lastCompletedDate:item.lastCompletedDate
  })
  setEditId(item.id);
  }

  const handleDeleteRequest=(id)=>{
    setShowDelete(true);
    setDeleteId(id);
  }

  const confirmDelete=()=>{
    setRoutines(routines.filter((routine) => routine.id !== deleteId));
    setShowDelete(false);
    setDeleteId(null);
  }

  const cancelDelete=()=>{
    setShowDelete(false);
    setDeleteId(null);
  }

 const deleteRoutine=(id)=>{
  setRoutines(routines.filter((routine) => routine.id !== id));
 }
 const toggleDone=(id)=>{
  const today = new Date().toISOString().split("T")[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];

  setRoutines(prev => prev.map((routine) => {
    if (routine.id !== id) return routine;

  if(routine.islastCompletedDate===today){return routine;}

  let newStreak=1;
  if(routine.lastCompletedDate===yesterday){
    newStreak=routine.streak+1;
  }
  return { ...routine, 
    completed: true,
    streak: newStreak, lastCompletedDate: today };
 }));
 }
 
 return (
    <>
     <div className="bg-gradient-to-br from-slate-100 via-slate-50 to-sky-50 text-slate-900 pb-8">

  {/* Header */}
  <header className="mb-2 p-4">
    <h1 className="text-3xl sm:text-4xl font-bold text-center text-slate-900">
      Smart Routine Tracker
    </h1>

    <p className="mt-2 text-center text-sm text-slate-500">
      Stay consistent with habits and routines using a clean, focused dashboard.
    </p>
  </header>

  <StatsTop routines={routines} />

  {/* ================= DESKTOP ================= */}
  <div className="hidden md:flex px-6 py-4 md:px-12 gap-8">

    {/* Left Column */}
    <div className="w-[40%] flex flex-col gap-6">
      <RoutineForm
        error={error}
        addRoutine={addRoutine}
        routine={routine}
        setRoutine={setRoutine}
        editId={editId}
      />

      <RoutineStats routines={routines} />
    </div>

    {/* Right Column */}
    <div className="w-[60%]">
      <RoutineList
        routines={routines}
        setRoutines={setRoutines}
        handleDelete={handleDeleteRequest}
        handleEdit={handleEdit}
        toggleDone={toggleDone}
      />
    </div>

    <DeleteModal
      isOpen={showDelete}
      onConfirm={confirmDelete}
      onClose={cancelDelete}
    />
  </div>

  {/* ================= MOBILE ================= */}
  <div className="md:hidden flex flex-col gap-4 px-4 py-4">

    <RoutineForm
      error={error}
      addRoutine={addRoutine}
      routine={routine}
      setRoutine={setRoutine}
      editId={editId}
    />

    <RoutineList
      routines={routines}
      setRoutines={setRoutines}
      handleDelete={handleDeleteRequest}
      handleEdit={handleEdit}
      toggleDone={toggleDone}
    />

    <RoutineStats routines={routines} />

    <DeleteModal
      isOpen={showDelete}
      onConfirm={confirmDelete}
      onClose={cancelDelete}
    />
  </div>

</div>
    </>
  )
}

export default App
