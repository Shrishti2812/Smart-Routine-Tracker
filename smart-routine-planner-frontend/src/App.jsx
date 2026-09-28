import { useState, useEffect } from 'react'
 
import {Routes,Route} from "react-router-dom"
import  DashBoard from "./pages/DashBoard.jsx";
import Routines from "./pages/Routines.jsx"
import Navbar from "./components/Navbar.jsx"
 import AIPlanner from "./pages/AI Planner.jsx"
function App() {

  
  return (
    <>
 <div className="bg-gradient-to-br from-[#e5eee2] via-[#f5f6ef] to-[#e1eee8] text-slate-900 pb-8">
      <Navbar/>
       <Routes>
     
        <Route path="/" element={<DashBoard />} />
        <Route path="/routines" element={<Routines />} />
       <Route path="/ai" element={<AIPlanner/>} />
       </Routes>
      </div>
    </>
  )
}

export default App