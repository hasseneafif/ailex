"use client"
import dynamic from "next/dynamic";

import React, { useRef, useEffect, useState, useMemo, useCallback } from "react";
import { sendChatMessage } from "../../services/chatService";
import { Bot, User, Send, Loader2, MessageSquare, X, Minimize2 } from "lucide-react";

const AboutSectionOne = () => {
  // Responsive chart width
  const chartRef = useRef(null);
  const [chartWidth, setChartWidth] = useState(400);
  const [tokenLoading, setTokenLoading] = useState(false);

  useEffect(() => {
    fetch(`${apiUrl}chat/ping`)
      .then(res => res.json())
      .then(data => console.log("Ping success:", data))
      .catch(err => console.error("Ping failed:", err));
  }, []);

  // Debounced resize handler
  useEffect(() => {
    let resizeTimeout: NodeJS.Timeout;
    function updateWidth() {
      if (chartRef.current) {
        setChartWidth(chartRef.current.offsetWidth);
      }
    }
    function handleResize() {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(updateWidth, 100);
    }
    updateWidth();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  const [chatHistory, setChatHistory] = useState([
    { role: "assistant", content: "Hey, how can I help you?" },
  ]);
  const [input, setInput] = useState("");
  const [chatInput, setChatInput] = useState(""); // Separate input for chat widget
  const [loading, setLoading] = useState(false);
  const [rateLimited, setRateLimited] = useState(false);
  const [showChatWidget, setShowChatWidget] = useState(false); // Controls chat widget visibility
  const [isChatMinimized, setIsChatMinimized] = useState(false); // Controls chat widget minimization
  const [pendingMessage, setPendingMessage] = useState("");

  const [speedMultiplier, setSpeedMultiplier] = useState(1.0);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [token, setToken] = useState<string | null>(null);
  const [tokenRequested, setTokenRequested] = useState(false);

  // Smoothly adjust animation speed
  useEffect(() => {
    const targetSpeed = loading ? 5.0 : 1.0;
    let animationFrame;

    const animate = () => {
      setSpeedMultiplier((currentSpeed) => {
        const diff = targetSpeed - currentSpeed;
        if (Math.abs(diff) < 0.1) {
          if (animationFrame) {
            cancelAnimationFrame(animationFrame);
          }
          return targetSpeed;
        }
        return currentSpeed + diff * 0.1;
      });
      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [loading]);

  // Scroll to bottom on new message or loading change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory, loading]);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  // Fetch token from /chat/meta and store in state only
  const fetchToken = useCallback(async () => {
    try {
      setTokenLoading(true);
      const res = await fetch(`${apiUrl}chat/meta`);
      const data = await res.json();
      if (data.token) {
        setToken(data.token);
      }
    } catch (e) {
      // Optionally handle error
    } finally {
      setTokenLoading(false);
    }
  }, [apiUrl]);

  // Handle input for main field
  const handleInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    if (!token && !tokenRequested && e.target.value.trim() !== "") {
      setTokenRequested(true);
      fetchToken();
    }
  }, [token, tokenRequested, fetchToken]);

  // Handle input for chat widget
  const handleChatInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setChatInput(e.target.value);
    if (!token && !tokenRequested && e.target.value.trim() !== "") {
      setTokenRequested(true);
      fetchToken();
    }
  }, [token, tokenRequested, fetchToken]);

  // Generic send message function
  const sendMessage = useCallback(async (messageToSend: string, clearInputCallback: () => void) => {
    if (!messageToSend.trim() || rateLimited) return;

    // Show chat widget after first message
    if (!showChatWidget) {
      setShowChatWidget(true);
      setIsChatMinimized(false);
    }

    // Clear input immediately and set pending message
    clearInputCallback();
    setPendingMessage(messageToSend);
    setLoading(true);

    // If no token, wait for it
    if (!token) {
      if (!tokenRequested) {
        setTokenRequested(true);
        fetchToken();
      }
      // Wait for token to be set
      for (let i = 0; i < 50; i++) {
        if (token) break;
        await new Promise(res => setTimeout(res, 100));
      }
      if (!token) {
        setLoading(false);
        setPendingMessage("");
        return;
      }
    }

    const authToken = token;
    const newHistory = [...chatHistory, { role: "user", content: messageToSend }];
    
    // Clear pending message and update history
    setPendingMessage("");
    setChatHistory(newHistory);

    try {
      const response = await sendChatMessage({
        sessionId: "demo-session-id",
        message: messageToSend,
        history: newHistory,
        token: authToken,
      });

      if (response.retryAfter) {
        const timeUntil = new Date(response.retryAfter).toLocaleTimeString();
        const errorMsg = `You have reached your daily limit. Try again after ${timeUntil}.`;
        setChatHistory(prev => [...prev, { role: "assistant", content: errorMsg }]);
        setRateLimited(true);
        return;
      }

      if (response && response.reply) {
        setChatHistory(prev => [...prev, { role: "assistant", content: response.reply }]);
      }

    } catch (err: any) {
      const errorMsg = "Error when interacting with the AI.";
      setChatHistory(prev => [...prev, { role: "assistant", content: errorMsg }]);
    } finally {
      setLoading(false);
    }
  }, [rateLimited, token, tokenRequested, chatHistory, fetchToken, showChatWidget]);

  // Handle send from main field
  const handleMainSend = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await sendMessage(input, () => setInput(""));
  }, [input, sendMessage]);

  // Handle send from chat widget
  const handleChatSend = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await sendMessage(chatInput, () => setChatInput(""));
  }, [chatInput, sendMessage]);

  // Memoized chat bubbles for performance
  const ChatBubbles = useMemo(() => (
    <>
      {chatHistory.map((msg, idx) =>
        msg.role === "assistant" ? (
          <div key={idx} className="flex items-start gap-3 group hover:bg-white/[0.02] p-3 rounded-xl transition-all duration-200">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-400 to-transparent flex items-center justify-center flex-shrink-0 shadow-lg">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 space-y-1">
              <div className="text-xs text-gray-400 font-medium">Assistant</div>
              <div className="text-gray-100 text-sm leading-relaxed">
                {msg.content}
              </div>
            </div>
          </div>
        ) : (
          <div key={idx} className="flex items-start gap-3 group hover:bg-white/[0.02] p-3 rounded-xl transition-all duration-200">
            <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0">
              <User className="w-4 h-4 text-gray-300" />
            </div>
            <div className="flex-1 space-y-1">
              <div className="text-xs text-gray-400 font-medium">You</div>
              <div className="text-gray-100 text-sm leading-relaxed">
                {msg.content}
              </div>
            </div>
          </div>
        )
      )}

      {/* Show pending message */}
      {pendingMessage && (
        <div className="flex items-start gap-3 group p-3 rounded-xl opacity-60">
          <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0">
            <User className="w-4 h-4 text-gray-300" />
          </div>
          <div className="flex-1 space-y-1">
            <div className="text-xs text-gray-400 font-medium">You</div>
            <div className="text-gray-300 text-sm leading-relaxed animate-pulse">
              {pendingMessage}
            </div>
          </div>
        </div>
      )}

      {/* AI typing/loading message */}
      {(loading || tokenLoading) && (
        <div className="flex items-start gap-3 group p-3 rounded-xl">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-400 to-transparent flex items-center justify-center flex-shrink-0 shadow-lg animate-pulse">
            <Bot className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1 space-y-1">
            <div className="text-xs text-gray-400 font-medium">Assistant</div>
            <div className="text-gray-300 text-sm leading-relaxed italic flex items-center gap-2">
              <Loader2 className="w-3 h-3 animate-spin" />
              {tokenLoading ? "Waking server up..." : "AI is responding..."}
            </div>
          </div>
        </div>
      )}
    </>
  ), [chatHistory, loading, tokenLoading, pendingMessage]);

  return (
    <>
      <section id="hassai" className="pt-16 md:pt-20 lg:pt-24 pb-24" aria-labelledby="about-ai-heading">
        <h2 id="about-ai-heading" className="sr-only">About Hass AI Chat</h2>
        
        <div className="relative w-full">
          {/* Fluid container for responsive layout */}
          <div className="max-w-[1200px] xl:w-[1200px] px-4 sm:px-6 md:px-8 py-12 mx-auto">
            
            {/* Main input field - always visible */}
            <div className="max-w-4xl mx-auto text-center relative">
              
              {/* Flickering background lights */}
              <div className="absolute -top-32 -left-32 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute -top-24 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
              
              <div className="relative z-10">
                <p className="mb-12 text-lg md:text-xl text-gray-300">
                  Ask me anything.
                </p>
                
                {/* Big input field - always stays */}
                <form onSubmit={handleMainSend} className="max-w-2xl mx-auto" autoComplete="off" aria-label="Chat input form">
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-teal-400/20 to-purple-500/20 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                    <div className="relative bg-[rgba(177,177,177,0.01)] backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
                      <input
                        type="text"
                        className="w-full h-16 md:h-20 text-lg md:text-xl px-8 py-6 bg-transparent text-gray-100 placeholder-gray-400 focus:outline-none"
                        placeholder="What's on your mind?"
                        value={input}
                        onChange={handleInput}
                        disabled={loading || rateLimited}
                        aria-label="Type your message"
                      />
                      <button
                        type="submit"
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 rounded-xl text-white transition-all duration-200 flex items-center justify-center disabled:opacity-60 disabled:cursor-not-allowed shadow-lg"
                        disabled={loading || !input.trim() || rateLimited || tokenLoading}
                        aria-label="Send message"
                      >
                        {tokenLoading || loading ? (
                          <Loader2 className="w-6 h-6 animate-spin" />
                        ) : (
                          <Send className="w-6 h-6" />
                        )}
                      </button>
                    </div>
                  </div>
                  
                  {rateLimited && (
                    <p className="mt-4 text-red-400 text-sm bg-red-900/20 px-4 py-2 rounded-lg border border-red-500/30">
                      You have reached your daily limit. Try again tomorrow.
                    </p>
                  )}
                </form>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* Floating Chat Widget */}
      {showChatWidget && (
        <div className="fixed bottom-6 right-6 z-50">
          <div 
            className={`bg-[rgba(177,177,177,0.01)] backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl transition-all duration-300 ${
              isChatMinimized ? 'w-16 h-16' : 'w-80 sm:w-96 h-[500px]'
            }`}
          >
            {isChatMinimized ? (
              /* Minimized state - just an icon */
              <button
                onClick={() => setIsChatMinimized(false)}
                className="w-full h-full flex items-center justify-center text-white hover:bg-white/10 rounded-2xl transition-colors duration-200"
                aria-label="Open chat"
              >
                <MessageSquare className="w-6 h-6" />
              </button>
            ) : (
              /* Expanded chat widget */
              <div className="flex flex-col h-full">
                {/* Chat header */}
                <div className="flex items-center justify-between p-4 border-b border-white/10 bg-[rgba(177,177,177,0.01)] flex-shrink-0">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-lg flex items-center justify-center">
                      <Bot className="w-3 h-3 text-white" />
                    </div>
                    <span className="font-medium text-gray-200 text-sm">Hass AI</span>
                    <span className="text-xs text-gray-400 bg-white/10 px-2 py-1 rounded-full">
                      Assistant
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsChatMinimized(true)}
                      className="p-1 hover:bg-white/10 rounded-lg transition-colors duration-200"
                      aria-label="Minimize chat"
                    >
                      <Minimize2 className="w-4 h-4 text-gray-400" />
                    </button>
                    <button
                      onClick={() => setShowChatWidget(false)}
                      className="p-1 hover:bg-white/10 rounded-lg transition-colors duration-200"
                      aria-label="Close chat"
                    >
                      <X className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </div>
                
                {/* Chat messages */}
                <div 
                  ref={chatContainerRef} 
                  className="flex-1 overflow-y-auto p-4 space-y-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent text-sm" 
                  aria-live="polite" 
                  aria-atomic="false"
                >
                  {ChatBubbles}
                </div>
                
                {/* Chat input */}
                <div className="border-t border-white/10 p-4 bg-[rgba(177,177,177,0.01)]">
                  <form className="flex gap-3" onSubmit={handleChatSend} autoComplete="off" aria-label="Chat widget input form">
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        className="w-full h-10 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-gray-100 placeholder-gray-400 focus:outline-none focus:border-white/20 focus:bg-white/10 transition-all duration-200 text-sm"
                        placeholder={rateLimited ? `Limit reached, try again tomorrow.` : "Type a message..."}
                        value={chatInput}
                        onChange={handleChatInput}
                        disabled={loading || rateLimited}
                        aria-label="Type your message"
                      />
                    </div>
                    <button
                      type="submit"
                      className="h-10 px-3 text-white rounded-xl transition-all duration-200 flex items-center justify-center disabled:opacity-60 disabled:cursor-not-allowed shadow-lg min-w-[40px]"
                      disabled={loading || !chatInput.trim() || rateLimited || tokenLoading}
                      aria-label="Send message"
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
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default React.memo(AboutSectionOne);