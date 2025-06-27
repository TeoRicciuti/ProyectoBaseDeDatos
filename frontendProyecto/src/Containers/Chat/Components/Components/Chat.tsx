import React, { useEffect, useRef, useState, type FormEvent } from "react";
import "./ChatStyle.css"; 

// Tipado mínimo del mensaje que devuelve tu API
interface Message {
  _id: string;
  contenido: string;
  timestamp: string;
  autor: string;
  username: string;
  
}

const ChatBD: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [contenido, setContenido] = useState("");
  const [username, setUsername] = useState("");
const [autor, setAutor] = useState(""); // ID válido de Mongo
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Token guardado en el login
  const token = localStorage.getItem("token");

  useEffect(() => {
  setUsername(localStorage.getItem("username") || "");
  setAutor(localStorage.getItem("userId") || "");
}, []);

  /* ───────────────────────────── fetch mensajes ───────────────────────────── */
  const fetchMessages = async () => {
  try {
    const res = await fetch("https://proyectobasededatos-ir9x.onrender.com/api/messages", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    if (res.ok) setMessages(data);
  } catch (err) {
    console.error("Error al obtener mensajes", err);
  }
};

  /* ───────────────────────────── enviar mensaje ───────────────────────────── */
const sendMessage = async (e: FormEvent) => {
  e.preventDefault();

  if (!contenido.trim()) return;      // evita vacíos
  if (!token) {                       // evita llamadas sin token
    console.error("No hay token; inicia sesión primero");
    return;
  }

  try {
    const res = await fetch(
      "https://proyectobasededatos-ir9x.onrender.com/api/messages",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,   // ✔️ el backend leerá el id
        },
        body: JSON.stringify({ contenido }),   // ✔️ solo contenido
      }
    );

    if (!res.ok) {
      // si el backend devuelve 400, 401, 500, etc.
      const errorMsg = await res.text();       // evita el “Unexpected token '<'”
      throw new Error(`Error ${res.status}: ${errorMsg}`);
    }

    const data: Message = await res.json();
    setMessages(prev => [...prev, data]);
    setContenido("");
  } catch (err) {
    console.error("Error al enviar mensaje:", err);
  }
};

  /* ───────────────────────────── efecto inicial ───────────────────────────── */
  useEffect(() => {
    fetchMessages();
    // Refresco cada 5s estilo polling sencillo
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, []);

  /* ──────────────────────────── scroll automático ─────────────────────────── */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* ───────────────────────────────── render ───────────────────────────────── */
  return (
    <div className="chat-container">
  <header className="chat-header">Chat General</header>

  <div className="chat-messages">
    {messages.map((m) => (
      <div key={m._id} className="chat-message">
        
        <div className="chat-bubble">
          <div className="chat-meta">
            <span className="chat-username">{m.username}</span>
            <span className="chat-time">
              {new Date(m.timestamp).toLocaleTimeString()}
            </span>
          </div>
          <p>{m.contenido}</p>
        </div>
      </div>
    ))}
    <div ref={messagesEndRef} />
  </div>

  <form onSubmit={sendMessage} className="chat-form">
    <input
      type="text"
      className="chat-input"
      placeholder="Escribe tu mensaje..."
      value={contenido}
      onChange={(e) => setContenido(e.target.value)}
    />
    <button type="submit" className="chat-button" disabled={!contenido.trim()}>
      Enviar
    </button>
  </form>
</div>
  );
};

export default ChatBD;
