import { useState } from 'react'
import {BrowserRouter as Router,Routes,Route, Navigate,} from "react-router-dom";
import Login from './Containers/Login';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Navigate to="/inicio" replace />} />
        <Route path="/login" element ={<Login/>}/>
      </Routes>
</Router>
  )
}

export default App
