import React from 'react';

export default function ChatMessages({ mensajes, chatEndRef }) {
  return (
    <div className="flex-1 border border-gray-300 rounded-lg p-4 bg-white overflow-y-auto">
      {mensajes.length === 0 ? (
        <p className="text-center text-gray-500">
          Comienza la conversación escribiendo un mensaje.
        </p>
      ) : (
        mensajes.map((msg) => (
          <div
            key={msg.id}
            className={`mb-2 p-2 rounded ${
              msg.sender === 'usuario' ? 'bg-red-100 text-right' : 'bg-gray-100 text-left'
            }`}
          >
            <span className="block">{msg.text}</span>
          </div>
        ))
      )}
      <div ref={chatEndRef} />
    </div>
  );
}