import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";
import axios from 'axios';
import { BASE_URL } from "../../utils/constant.js";

function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hey 👋 Your next meal is one message away 👀🍜", role: "bot" },
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    
    const newMessages = [
      ...messages,
      { role: "user", text: input },
      { role: "bot", text: "Thinking..."},
    ];
    setMessages(newMessages);
    setInput("");

    try {
    const res = await axios.post(BASE_URL + "/chat",{message:input},{withCredentials:true});

  

      const newMessages = [
      ...messages,
      { role: "user", text: input },
      { role: "bot", text: res.data},
    ];

    setMessages(newMessages);
    
  } catch (error) {
    console.error(error);
  }


  };

  // 🔽 Auto scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      {/* 💬 Floating Button */}
      <div className="fixed bottom-25 right-6 z-50">
        <button
          onClick={() => setOpen(!open)}
          className="bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-full shadow-lg transition hover:scale-110"
        >
          {open ? <X size={24} /> : <MessageCircle size={24} />}
        </button>
      </div>

      {/* 📦 Chat Window */}
      <div
        className={`
          fixed bottom-38 right-6 w-[320px] sm:w-87.5 h-112.5
          bg-white rounded-2xl shadow-xl flex flex-col overflow-hidden
          border border-orange-200
          transition-all duration-300 z-50
          ${open ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}
        `}
      >
        {/* 🔝 Header */}
        <div className="p-3 border-b border-orange-200 flex justify-between items-center bg-white">
          <h1 className="text-sm font-semibold text-orange-600">
            Rasoi Chat
          </h1>
          <span className="text-xs text-orange-400">Online</span>
        </div>

        {/* 💬 Chat Area */}
        <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-linear-to-br from-orange-50 to-orange-100">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm shadow ${
                  msg.role === "user"
                    ? "bg-orange-500 text-white rounded-br-none"
                    : "bg-white text-gray-800 border border-orange-100 rounded-bl-none"
                }`}
              >
                <div
  dangerouslySetInnerHTML={{ __html: msg.text }}
/>
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* ✍️ Input */}
        <div className="p-2 bg-white border-t text-black border-orange-200 flex gap-2 items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type a message..."
            className="flex-1 px-3 py-2 rounded-full border border-orange-300 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <button
            onClick={sendMessage}
            className="px-4 py-2 rounded-full bg-orange-500 text-white text-sm hover:bg-orange-600 transition"
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
}

export default ChatBot;