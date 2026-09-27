import { createContext,useEffect,useState} from 'react';
import api from "../api/axios.js";
export const RoutineContext=createContext();

export function RoutineProvider({children}){
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
        );   }
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

      if (editId) {
        const response = await api.put(`/routine/${editId}`, {
          title: current.title,
          category: current.category,
          targetHours: current.targetHours,
          priority: current.priority
        });
        const updatedRoutine = {
          ...response.data.routine,
          id: response.data.routine._id
        };
        setRoutines((prev) =>
          prev.map((item) =>
            item.id == editId
              ? updatedRoutine
              : item
          )
        );
        setEditId(null);
      } else {
        const response = await api.post(`/routine/add`, {
          title: current.title,
          category: current.category,
          targetHours: current.targetHours,
          priority: current.priority    });


        const newRoutine = {
          ...response.data,id: response.data._id
        };
        setRoutines((prev) => [
          ...prev,
          newRoutine
        ]);   }
      await getStats();
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
      return true;
    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Something went wrong. Please try again."
      );
      return false;
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
    setRoutines((prev) =>
      prev.filter(
        (routine) => routine.id !== deleteId
      )
    );
    setShowDelete(false);
    setDeleteId(null);
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
    <RoutineContext.Provider value={{routine,setRoutine,stats,error,editId,routines,setRoutines,showDelete,addRoutine,
      handleEdit,handleDeleteRequest,confirmDelete,cancelDelete,toggleDone,}}>
        {children}
    </RoutineContext.Provider>
    </>
)
}