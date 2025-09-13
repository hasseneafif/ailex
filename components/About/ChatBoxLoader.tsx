"use client";

import { Bot } from "lucide-react";

const ChatBoxLoader = () => {
  return (
    <button
      className="w-16 h-16 flex items-center justify-center text-white rounded-2xl relative overflow-hidden border-2 border-[#8a5cf686]"
      aria-label="Chat loader"
    >
      <div className="w-full h-full rounded-2xl bg-black/80 backdrop-blur-sm flex items-center justify-center">
        <Bot className="w-6 h-6 text-white" />
      </div>
    </button>
  );
};

export default ChatBoxLoader;
