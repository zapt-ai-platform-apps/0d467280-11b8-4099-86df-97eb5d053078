import React from 'react';
import Chatbot from './Chatbot';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="h-full">
        <Chatbot />
      </div>
      <footer className="p-4 bg-gray-100 text-center">
        <a
          href="https://www.zapt.ai"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 cursor-pointer"
        >
          Made on ZAPT
        </a>
      </footer>
    </div>
  );
}