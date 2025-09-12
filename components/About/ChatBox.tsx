// components/ChatBox.tsx
"use client";

import React, { Suspense } from "react";
import { Bot, Send, Loader2, X, Minimize2, User } from "lucide-react";

// 👇 you can pass props like messages, handlers, etc.
const ChatBox = ({
  chatContainerRef,
  ChatBubbles,
  handleChatSend,
  chatInput,
  handleChatInput,
  loading,
  rateLimited,
  tokenLoading,
  t,
  setIsChatMinimized,
  setShowChatWidget,
}: any) => {
  return (
    <div
      className={`fixed bottom-6 right-6 z-50 origin-bottom-right transition-transform transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] w-80 sm:w-96 h-[500px] bg-[rgba(177,177,177,0.01)] backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl scale-100 opacity-100`}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10 bg-[rgba(177,177,177,0.01)] flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-lg flex items-center justify-center">
              <Bot className="w-3 h-3 text-white" />
            </div>
            <span className="font-medium text-gray-200 text-sm">Hass AI</span>
            <span className="text-xs text-gray-400 bg-white/10 px-2 py-1 rounded-full">
              {t("roles.assistant")}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsChatMinimized(true)}
              className="p-1 hover:bg-white/10 rounded-lg transition-colors duration-200"
              aria-label={t("aria.minimizeChat")}
            >
              <Minimize2 className="w-4 h-4 text-gray-400" />
            </button>
            <button
              onClick={() => setShowChatWidget(false)}
              className="p-1 hover:bg-white/10 rounded-lg transition-colors duration-200"
              aria-label={t("aria.closeChat")}
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto p-4 space-y-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent text-sm"
          aria-live="polite"
          aria-atomic="false"
        >
          {ChatBubbles}
        </div>

        {/* Input */}
        <div className="border-t border-white/10 p-4 bg-[rgba(177,177,177,0.01)]">
          <form
            className="flex gap-3"
            onSubmit={handleChatSend}
            autoComplete="off"
            aria-label="Chat widget input form"
          >
            <div className="flex-1 relative">
              <input
                type="text"
                className="w-full h-10 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-gray-100 placeholder-gray-400 focus:outline-none focus:border-white/20 focus:bg-white/10 transition-all duration-200 text-sm"
                placeholder={
                  rateLimited
                    ? t("prompt.limitReachedPlaceholder") ?? ""
                    : t("prompt.typeMessage") ?? ""
                }
                value={chatInput}
                onChange={handleChatInput}
                disabled={loading || rateLimited}
                aria-label={t("aria.typeMessage")}
              />
            </div>
            <button
              type="submit"
              className="h-10 px-3 text-white rounded-xl transition-all duration-200 flex items-center justify-center disabled:opacity-60 disabled:cursor-not-allowed shadow-lg min-w-[40px]"
              disabled={loading || !chatInput.trim() || rateLimited || tokenLoading}
              aria-label={t("aria.sendMessage")}
            >
              {tokenLoading || loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
