'use client';

import { useState } from 'react';

export default function AIChatModal({ isOpen, onClose, activeTask }) {
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: activeTask
        ? `Hey! I see you're working on "${activeTask}". What do you need help with?`
        : "Hey! I'm your MentorAI tutor. Ask me anything about your current learning path!",
    },
  ]);
  const [input, setInput] = useState('');

  if (!isOpen) return null;

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input;
    setInput('');
    setMessages((prev) => [...prev, { sender: 'user', text: userMsg }]);

    // Simulated AI response (frontend mock)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: `Got it! Once we connect our backend route, I will process "${userMsg}" using Gemini AI and return a live response!`,
        },
      ]);
    }, 800);
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex justify-end transition-opacity font-sans">
      <div className="w-full max-w-md bg-[#161b22] border-l border-[#30363d] h-full flex flex-col justify-between shadow-2xl">
        
        {/* Header */}
        <div className="p-4 bg-[#010409] border-b border-[#30363d] flex justify-between items-center select-none">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#238636]"></span>
            <h3 className="font-mono text-sm font-bold text-white">MentorAI Assistant</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-[#8b949e] hover:text-white font-mono text-xs p-1 border border-[#30363d] rounded hover:bg-[#21262d]"
          >
            ✕ Close
          </button>
        </div>

        {/* Message Stream */}
        <div className="p-4 overflow-y-auto flex-1 space-y-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${
                msg.sender === 'user' ? 'items-end' : 'items-start'
              }`}
            >
              <div
                className={`max-w-[85%] p-3 rounded-lg text-sm ${
                  msg.sender === 'user'
                    ? 'bg-[#58a6ff]/20 border border-[#58a6ff]/40 text-white rounded-br-none'
                    : 'bg-[#0d1117] border border-[#30363d] text-[#c9d1d9] rounded-bl-none'
                }`}
              >
                {msg.text}
              </div>
              <span className="text-[10px] font-mono text-[#8b949e] mt-1">
                {msg.sender === 'user' ? 'You' : 'MentorAI'}
              </span>
            </div>
          ))}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSend} className="p-4 bg-[#010409] border-t border-[#30363d] flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question or share an error..."
            className="flex-1 bg-[#0d1117] border border-[#30363d] rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-[#58a6ff]"
          />
          <button
            type="submit"
            className="bg-[#238636] hover:bg-[#2ea043] text-white px-4 py-2 rounded-md font-mono text-xs font-semibold cursor-pointer"
          >
            Send
          </button>
        </form>

      </div>
    </div>
  );
}
