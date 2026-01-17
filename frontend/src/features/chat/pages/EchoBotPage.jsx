import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Paperclip, Mic, AlertCircle } from 'lucide-react';

const EchoBotPage = () => {
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      role: 'bot', 
      content: "Hello! I'm Echo. I'm connected to the EcoHack network. Ask me anything about environmental sustainability or local climate data!" 
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userQuery = input;
    const userMessage = { id: Date.now(), role: 'user', content: userQuery };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await fetch("https://ecohack-chatbot.onrender.com/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: userQuery }), // Assuming the API expects { message: "..." }
      });

      const data = await response.json();

      if (response.ok) {
        const botResponse = {
          id: Date.now() + 1,
          role: 'bot',
          // Adjust 'data.response' based on your actual API key name (e.g., data.reply or data.answer)
          content: data.answer || data.answer || "I processed your request but couldn't formulate a reply."
        };
        setMessages(prev => [...prev, botResponse]);
      } else {
        throw new Error("API Error");
      }
    } catch (err) {
      const errorMessage = {
        id: Date.now() + 2,
        role: 'bot',
        content: "I'm having trouble connecting to my brain right now. Please check if the EcoHack server is live.",
        isError: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] bg-[#080b0a]">
      
      {/* --- CHAT AREA --- */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide"
      >
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300`}
            >
              <div className={`flex gap-4 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                {/* Avatar */}
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${
                  msg.role === 'user' 
                    ? 'bg-white/5 border-white/10 text-gray-400' 
                    : msg.isError ? 'bg-red-500/20 border-red-500 text-red-500' : 'bg-green-600 border-green-500 text-white shadow-lg'
                }`}>
                  {msg.role === 'user' ? <User size={20} /> : msg.isError ? <AlertCircle size={20}/> : <Bot size={20} />}
                </div>

                {/* Message Bubble */}
                <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-green-600 text-white rounded-tr-none' 
                    : 'bg-white/5 border border-white/10 text-gray-200 rounded-tl-none'
                }`}>
                  {msg.content}
                </div>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start animate-pulse">
              <div className="flex gap-4 items-center bg-white/5 border border-white/10 px-4 py-2 rounded-full">
                <Sparkles size={16} className="text-green-500 animate-spin-slow" />
                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Querying EcoHack AI...</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* --- INPUT AREA --- */}
      <div className="p-6 bg-[#0a0f0d]/50 backdrop-blur-xl border-t border-white/5">
        <form 
          onSubmit={handleSendMessage}
          className="max-w-4xl mx-auto relative"
        >
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything..."
            disabled={isTyping}
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-6 pr-24 focus:outline-none focus:border-green-500/50 transition-all text-gray-200 disabled:opacity-50"
          />

          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <button 
              type="submit"
              disabled={!input.trim() || isTyping}
              className="bg-green-600 hover:bg-green-500 disabled:bg-gray-800 disabled:text-gray-600 text-white px-5 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2 shadow-lg shadow-green-900/20 active:scale-95"
            >
              {isTyping ? "..." : <Send size={18} />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EchoBotPage;