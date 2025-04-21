
import React from "react";
import ChatBotAvatar from "./ChatBotAvatar";

interface FloatingChatBotProps {
  onClick?: () => void;
}

const FloatingChatBot: React.FC<FloatingChatBotProps> = ({ onClick }) => (
  <button
    aria-label="Chat Assistant"
    className="fixed z-50 bottom-5 right-5 shadow-xl bg-white rounded-full flex items-center px-2 py-2 border-2 border-bc-red transition hover:scale-110"
    style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.2)" }}
    onClick={onClick}
  >
    <ChatBotAvatar />
    <span className="ml-3 text-bc-red font-semibold hidden sm:inline">Chat</span>
  </button>
);

export default FloatingChatBot;
