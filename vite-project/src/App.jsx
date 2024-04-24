import React from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Login from './pages/Login'
import './App.css'
import Dashboard from './pages/Dashboard'
import { Toaster } from "react-hot-toast";
import Addorganisation from './pages/Addorganisation'
import Addemployee from './pages/Addemployee'
import Staff from './pages/Staff'
import Cases from './pages/Cases'


const App = () => {
  return (
    <Router>
      <Routes>
       <Route path={'/'} element={<Login/>}/>
       <Route path={'/dashboard'} element={<Dashboard/>}/>
       <Route path={'/addorganisation'} element={<Addorganisation/>}/>
       <Route path={'/addemployee'} element={<Addemployee/>}/>
       <Route path={'/staff'} element={<Staff/>}/>
       <Route path={'/cases'} element={<Cases/>}/>
      </Routes>
      <Toaster position="top-center" className="z-50"/>
    </Router> 
  )
}

export default App