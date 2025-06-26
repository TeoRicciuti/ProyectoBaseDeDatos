import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from './Containers/Login';
import ChatBD from './Containers/Chat/Components/Components/Chat';

function App() {
  const token = localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Protegemos /login para que no puedan entrar si ya están logueados */}
        <Route
          path="/login"
          element={token ? <Navigate to="/chat" replace /> : <Login />}
        />

        {/* Protegemos /chat para que no puedan entrar si NO están logueados */}
        <Route
          path="/chat"
          element={token ? <ChatBD /> : <Navigate to="/login" replace />}
        />
      </Routes>
    </Router>
  );
}

export default App;
