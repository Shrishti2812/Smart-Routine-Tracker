import { useState, useEffect } from 'react'
import RoutineForm from './components/RoutineForm.jsx';
import RoutineList from './components/RoutineList.jsx';
import RoutineStats from './components/RoutineStats.jsx';
import DeleteModal from './components/DeleteModal.jsx';
import StatsTop from './components/StatsTop.jsx';
import api from './api/axios.js'

function App() {

  const [routine, setRoutine] = useState({
    id: Date.now(),
    title: "",
    category: "",
    targetHours: "",
    priority: "",
    completed: false,
    streak: 0,
    lastCompletedDate: null,
  });

  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");
  const [editId, setEditId] = useState(null);

  const [showDelete, setShowDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [routines, setRoutines] = useState([]);


  // Load routines from backend
  useEffect(() => {

    const getRoutines = async () => {

      try {

        const response = await api.get("/routine/get");

        const data = response.data.map((routine) => ({
          ...routine,
          id: routine._id
        }));

        setRoutines(data);

      } catch (error) {

        setError(
          error.response?.data?.message ||
          "Failed to load routines."
        );

      }
    };

    getRoutines();

  }, []);


  const getStats = async () => {

    try {

      const response = await api.get("/routine/stats");

      setStats(response.data);

    } catch (error) {

      console.log("Get stats error:", error);

    }
  };


  useEffect(() => {
    getStats();
  }, []);


  const addRoutine = async (passedRoutine) => {

    const current = passedRoutine || routine;

    if (
      !current.title ||
      !current.category ||
      !current.targetHours ||
      !current.priority
    ) {

      setError("Please fill in all fields");
      return;

    }

    setError("");

    try {

      console.log("Routine being sent:", {
        title: current.title,
        category: current.category,
        targetHours: current.targetHours,
        priority: current.priority
      });


      // EDIT
      if (editId) {

        const response = await api.put(`/routine/${editId}`, {

          title: current.title,
          category: current.category,
          targetHours: current.targetHours,
          priority: current.priority

        });

        console.log("Edit response:", response.data);


        const updatedRoutine = {

          ...response.data.routine,
          id: response.data.routine._id

        };


        // Use latest routines state
        setRoutines((prev) =>
          prev.map((item) =>
            item.id == editId
              ? updatedRoutine
              : item
          )
        );


        setEditId(null);


      } else {

        // ADD
        const response = await api.post(`/routine/add`, {

          title: current.title,
          category: current.category,
          targetHours: current.targetHours,
          priority: current.priority

        });


        const newRoutine = {

          ...response.data,
          id: response.data._id

        };


        // Use latest routines state
        setRoutines((prev) => [
          ...prev,
          newRoutine
        ]);

      }


      // Refresh stats after add/edit
      await getStats();


      // Reset form
      setRoutine({

        id: Date.now(),
        title: "",
        category: "",
        targetHours: "",
        priority: "",
        completed: false,
        streak: 0,
        lastCompletedDate: null,

      });


    } catch (error) {

      setError(
        error.response?.data?.message ||
        "Something went wrong. Please try again."
      );

    }
  };


  const handleEdit = (item) => {

    setRoutine({

      title: item.title,
      category: item.category,
      targetHours: item.targetHours,
      priority: item.priority,
      completed: item.completed,
      streak: item.streak,
      lastCompletedDate: item.lastCompletedDate

    });

    setEditId(item.id);

  };


  const handleDeleteRequest = (id) => {

    setShowDelete(true);
    setDeleteId(id);

  };


  const confirmDelete = async () => {

    await api.delete(`/routine/${deleteId}`);


    // Use latest routines state
    setRoutines((prev) =>
      prev.filter(
        (routine) => routine.id !== deleteId
      )
    );


    setShowDelete(false);
    setDeleteId(null);


    // Refresh stats
    await getStats();

  };


  const cancelDelete = () => {

    setShowDelete(false);
    setDeleteId(null);

  };


  const toggleDone = async (id) => {

    try {

      const response = await api.post(
        `/routine/${id}/complete`
      );


      const updatedRoutine = {

        ...response.data.routine,
        id: response.data.routine._id

      };


      setRoutines((prev) =>
        prev.map((routine) =>
          routine.id === id
            ? updatedRoutine
            : routine
        )
      );


      await getStats();


    } catch (error) {

      console.log(
        "Backend error:",
        error.response?.data
      );

      setError(
        error.response?.data?.message ||
        "Failed to complete routine."
      );

    }
  };


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


        <StatsTop stats={stats} />


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

            <RoutineStats stats={stats} />

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


          <RoutineStats stats={stats} />


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