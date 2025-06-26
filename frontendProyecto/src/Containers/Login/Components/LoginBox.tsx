// frontend/src/components/LoginBox.jsx
import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./LoginBoxStyle.css";

const LoginBox = () => {
  // solo username
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {   // ⬅ puerto de tu backend
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),                               // ⬅ solo username
      });

      const data = await res.json();

      if (res.ok) {
        // Guarda token + datos básicos
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.user.username);
        localStorage.setItem("userId", data.user.id);

        navigate("/chat"); // o la ruta que muestre el chat
      } else {
        alert(data.error || "No se pudo iniciar sesión");
      }
    } catch (err) {
      console.error("Error en login:", err);
      alert("Error del servidor");
    }
  };

  return (
    <div className="LoginBox">
      <h1>Login</h1>

      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Nombre de usuario"
          required
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <button type="submit">Entrar</button>

        {/* En este flujo no necesitas registro aparte;
            si el usuario no existe, el backend lo crea */}
      </form>
    </div>
  );
};

export default LoginBox;
