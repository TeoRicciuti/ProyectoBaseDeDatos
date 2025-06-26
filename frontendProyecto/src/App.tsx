import { useState } from 'react'
import {BrowserRouter as Router,Routes,Route, Navigate,} from "react-router-dom";
import Login from './Containers/Login';
import ChatBD from './Containers/Chat/Components/Components/Chat';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element ={<Login/>}/>
        <Route path="/chat" element ={<ChatBD/>}/>
      </Routes>
</Router>
  )
}

export default App
