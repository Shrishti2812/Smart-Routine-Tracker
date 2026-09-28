 
import { useContext, useState } from "react";
import { RoutineContext } from "../context/RoutineContext.jsx";
import RoutineForm from "../components/RoutineForm.jsx";
import RoutineList from "../components/RoutineList.jsx";
import DeleteModal from "../components/DeleteModal.jsx";

function Routines() {
  const {
    routine,
    setRoutine,
    error,
    addRoutine,
    editId,
    routines,
    setRoutines,
    handleDeleteRequest,
    handleEdit,
    toggleDone,
    showDelete,
    confirmDelete,
    cancelDelete,
  } = useContext(RoutineContext);

  const [showForm, setShowForm] = useState(false);

  const handleAddRoutine = async (routineData) => {
    const success = await addRoutine(routineData);
    if (success) {
      setShowForm(false);
    }
  };

  const handleEditRoutine = (item) => {
    handleEdit(item);
    setShowForm(true);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-br from-[#e2eee0] via-[#f5f7ef] to-[#d5e9df] px-4 py-10 text-slate-900 sm:px-6 sm:py-18 lg:px-10">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div className="min-w-0">
          <p className="mb-1 mt-1 text-xs font-bold uppercase tracking-[0.16em] text-[#37864f]">
            Routine library
          </p>
          <h1 className="text-3xl font-bold text-[#172b21] sm:text-4xl">
            My Routines
          </h1>

          <p className="mt-2 text-sm text-slate-600 sm:text-base">
            Manage your daily routines and keep track of your progress.
          </p>
        </div>
        <div className="flex w-full items-center gap-3 sm:w-auto">
          <span className="hidden rounded-full border border-slate-200 bg-white/80 px-3 py-2 text-sm font-medium text-slate-600 sm:inline-flex">
            {routines.length} {routines.length === 1 ? "routine" : "routines"}
          </span>
        <button
          onClick={() => setShowForm(true)}
          className="w-full rounded-xl bg-[#286c43] px-5 py-3 font-semibold text-white shadow-[0_8px_18px_-12px_rgba(31,91,54,0.9)] transition hover:bg-[#245d3b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#459e60] sm:w-auto"
        >
          + Add Routine
        </button>
        </div>
      </div>

      <div className="hidden md:block">
        <RoutineList
          routines={routines}
          setRoutines={setRoutines}
          handleDelete={handleDeleteRequest}
          handleEdit={handleEditRoutine}
          toggleDone={toggleDone}
        />
      </div>
      <div className="md:hidden">
        <RoutineList
          routines={routines}
          setRoutines={setRoutines}
          handleDelete={handleDeleteRequest}
          handleEdit={handleEditRoutine}
          toggleDone={toggleDone}
        />
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-3 sm:p-4">
          <div className="w-full max-w-lg max-h-[calc(100vh-1.5rem)] overflow-y-auto overflow-x-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl sm:max-h-[calc(100vh-2rem)] sm:p-6">
            <div className="flex items-start justify-between gap-3 mb-5">
              <div className="min-w-0">
                <h2 className="text-lg sm:text-xl font-semibold text-slate-900">
                  {editId ? "Edit Routine" : "Add New Routine"}
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  {editId
                    ? "Update your routine details."
                    : "Create a routine to track consistently."}
                </p>
              </div>
              <button
                onClick={() => setShowForm(false)}
                className="shrink-0 w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition"
              >
                ✕
              </button>
            </div>
            <RoutineForm
              error={error}
              addRoutine={handleAddRoutine}
              routine={routine}
              setRoutine={setRoutine}
              editId={editId}
            />
          </div>
        </div>
      )}

      <DeleteModal
        isOpen={showDelete}
        onConfirm={confirmDelete}
        onClose={cancelDelete}
      />
    </div>
  );
}

export default Routines;
   

