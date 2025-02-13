import React, { useState, useRef, useEffect } from 'react';
import * as Sentry from '@sentry/browser';
import ChatMessages from './components/ChatMessages.jsx';
import sendChatbotMessage from './api/chatService.js';

export default function Chatbot() {
  const [mensajes, setMensajes] = useState([]);
  const [inputMensaje, setInputMensaje] = useState('');
  const [cargando, setCargando] = useState(false);
  const chatEndRef = useRef(null);

  const enviarMensaje = async (e) => {
    e.preventDefault();
    if (!inputMensaje.trim() || cargando) return;

    const nuevoMensaje = { id: Date.now(), sender: 'usuario', text: inputMensaje };
    setMensajes((prev) => [...prev, nuevoMensaje]);
    setInputMensaje('');
    setCargando(true);
    console.log('Enviando mensaje del usuario:', nuevoMensaje.text);

    try {
      const data = await sendChatbotMessage(nuevoMensaje.text);
      console.log('Respuesta del API:', data);
      const respuestaMensaje = {
        id: Date.now() + 1,
        sender: 'chatbot',
        text: data.respuesta || 'No se recibió respuesta.',
      };
      setMensajes((prev) => [...prev, respuestaMensaje]);
    } catch (error) {
      console.error('Error al enviar mensaje:', error);
      Sentry.captureException(error);
      const errorMensaje = {
        id: Date.now() + 1,
        sender: 'chatbot',
        text: 'Ocurrió un error al procesar tu mensaje.',
      };
      setMensajes((prev) => [...prev, errorMensaje]);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [mensajes]);

  return (
    <div className="flex flex-col h-full max-w-2xl mx-auto p-4">
      <header className="mb-4 text-center">
        <h1 className="text-2xl font-bold text-red-500">Chatbot Conversacional</h1>
      </header>
      <ChatMessages mensajes={mensajes} chatEndRef={chatEndRef} />
      <form onSubmit={enviarMensaje} className="mt-4 flex">
        <input
          type="text"
          className="flex-1 p-2 border border-gray-300 rounded-l box-border text-gray-800"
          placeholder="Escribe tu mensaje..."
          value={inputMensaje}
          onChange={(e) => setInputMensaje(e.target.value)}
          disabled={cargando}
        />
        <button
          type="submit"
          className="px-4 bg-red-500 hover:bg-red-600 text-white rounded-r cursor-pointer"
          disabled={cargando}
        >
          {cargando ? 'Enviando...' : 'Enviar'}
        </button>
      </form>
    </div>
  );
}