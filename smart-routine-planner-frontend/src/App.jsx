import { useState, useEffect } from 'react'
 
import {Routes,Route,Outlet} from "react-router-dom"
import  DashBoard from "./pages/DashBoard.jsx";
import Routines from "./pages/Routines.jsx"
import Navbar from "./components/Navbar.jsx"
 import AIPlanner from "./pages/AI Planner.jsx"
 import SignUp from "./pages/SignUp.jsx"
import Login from "./pages/Login.jsx"
import ProtectedRoute from "./components/ProtectedRoutes.jsx"
import { RoutineProvider } from "./context/RoutineContext.jsx";
import { Navigate } from 'react-router-dom';
function App() {

  
  return (
    <>
  
  <div className="bg-gradient-to-br from-[#e5eee2] via-[#f5f6ef] to-[#e1eee8] text-slate-900 pb-8">
         <Navbar />
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<SignUp />} />

    <Route element={<ProtectedRoute />}>
  <Route
    element={
      <RoutineProvider>
   
        <Outlet />
      </RoutineProvider>
    }
  >
    <Route path="/" element={<DashBoard />} />
    <Route path="/routines" element={<Routines />} />
    <Route path="/ai" element={<AIPlanner />} />
  </Route>
</Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </div>
 
      
    </>
  )
} 
    

export default App