 
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RoutineProvider } from './context/RoutineContext.jsx'
import {BrowserRouter} from 'react-router-dom'
createRoot(document.getElementById('root')).render(
 <BrowserRouter>
  <RoutineProvider>
    <App />
  </RoutineProvider>
</BrowserRouter>
)
