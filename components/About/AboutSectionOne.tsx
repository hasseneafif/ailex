"use client";

import React, { useRef, useEffect, useState, useMemo, useCallback } from "react";
import { sendChatMessage, sendActionMessage } from "../../services/chatService";
import { Bot, User, Send, Loader2, X, Minimize2 } from "lucide-react";
import { useTranslations, useLocale } from 'next-intl';
import { findMatchingAction } from './actionsdata';
import { useActionsLogic } from './actionsLogic';

// Lazy load heavy components
const LazyReactMarkdown = React.lazy(() => import("react-markdown"));

const AboutSectionOne = () => {
  const t = useTranslations("aboutSectionOne");
  const locale = useLocale();
  const { executeAction } = useActionsLogic();
  const tActions = useTranslations("actions");

  const [tokenLoading, setTokenLoading] = useState(false);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [sessionId, setSessionId] = useState<string | null>(null);

  // Optimized session ID initialization
  useEffect(() => {
    const initializeSession = () => {
      let storedId = localStorage.getItem("sessionIdPHA");
      if (!storedId) {
        storedId = crypto.randomUUID();
        localStorage.setItem("sessionIdPHA", storedId);
      }
      setSessionId(storedId);
    };

    // Use requestIdleCallback if available for non-critical initialization
    if ('requestIdleCallback' in window) {
      requestIdleCallback(initializeSession);
    } else {
      setTimeout(initializeSession, 0);
    }
  }, []);



  const initialMessage = useMemo(() => 
    ({ role: "assistant", content: t("chat.initialMessage") }), 
    [t]
  );
  
  const [chatHistory, setChatHistory] = useState([]);
  const displayedHistory = useMemo(() => 
    [initialMessage, ...chatHistory], 
    [initialMessage, chatHistory]
  );

  const [input, setInput] = useState("");
  const [chatInput, setChatInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [rateLimited, setRateLimited] = useState(false);
  const [showChatWidget, setShowChatWidget] = useState(true);
  const [isChatMinimized, setIsChatMinimized] = useState(true);
  const [pendingMessage, setPendingMessage] = useState("");
  const [speedMultiplier, setSpeedMultiplier] = useState(1.0);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [token, setToken] = useState<string | null>(null);
  const [tokenRequested, setTokenRequested] = useState(false);

  // Optimized animation with reduced frequency
  useEffect(() => {
    if (!loading && speedMultiplier === 1.0) return;

    const targetSpeed = loading ? 5.0 : 1.0;
    let animationFrame: number;
    let lastUpdate = 0;
    const updateInterval = 16; // ~60fps

    const animate = (timestamp: number) => {
      if (timestamp - lastUpdate < updateInterval) {
        animationFrame = requestAnimationFrame(animate);
        return;
      }
      
      lastUpdate = timestamp;
      setSpeedMultiplier(currentSpeed => {
        const diff = targetSpeed - currentSpeed;
        if (Math.abs(diff) < 0.1) {
          return targetSpeed;
        }
        return currentSpeed + diff * 0.1;
      });
      
      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [loading]);

  const scrollToBottom = useCallback(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory, loading, scrollToBottom]);

  useEffect(() => {
    if (!isChatMinimized) {
      setTimeout(scrollToBottom, 0);
    }
  }, [isChatMinimized, scrollToBottom]);

  const fetchToken = useCallback(async () => {
    try {
      setTokenLoading(true);
      const res = await fetch(`${apiUrl}chat/meta`);
      const data = await res.json();
      if (data.token) setToken(data.token);
    } catch {
      // Silent catch
    } finally {
      setTokenLoading(false);
    }
  }, [apiUrl]);

  const handleInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInput(e.target.value);
      if (!token && !tokenRequested && e.target.value.trim() !== "") {
        setTokenRequested(true);
        fetchToken();
      }
    },
    [token, tokenRequested, fetchToken]
  );

  const handleChatInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setChatInput(e.target.value);
      if (!token && !tokenRequested && e.target.value.trim() !== "") {
        setTokenRequested(true);
        fetchToken();
      }
    },
    [token, tokenRequested, fetchToken]
  );

  const sendMessage = useCallback(
    async (messageToSend: string, clearInputCallback: () => void) => {
      if (!messageToSend.trim() || rateLimited) return;

      if (isChatMinimized) setIsChatMinimized(false);

      clearInputCallback();
      setPendingMessage(messageToSend);
      setLoading(true);
      
      const matchingAction = findMatchingAction(messageToSend, tActions);

      if (matchingAction) {
        const newHistory = [...chatHistory, { role: "user", content: messageToSend }];
        setChatHistory(newHistory);
        setPendingMessage("");
      // simulate AI thinking
        setTimeout(async () => {
          try {
            await executeAction(matchingAction.id);
            await sendActionMessage(messageToSend, matchingAction.response, sessionId!, token);
            setChatHistory(prev => [...prev, { role: "assistant", content: matchingAction.response }]);
          } catch {
            setChatHistory(prev => [...prev, { role: "assistant", content: "Error executing action." }]);
          } finally {
            setLoading(false);
          }
           }, 1000);

        return;
      }

      // Original API logic for non-matching messages
      if (!token) {
        if (!tokenRequested) {
          setTokenRequested(true);
          fetchToken();
        }
        
        // Use exponential backoff for token waiting
        let attempts = 0;
        const checkToken = async () => {
          if (token) return true;
          if (attempts >= 5) return false;
          
          attempts++;
          await new Promise(res => setTimeout(res, Math.min(100 * Math.pow(2, attempts), 1000)));
          return checkToken();
        };
        
        if (!await checkToken()) {
          setLoading(false);
          setPendingMessage("");
          return;
        }
      }

      const authToken = token;
      const newHistory = [...chatHistory, { role: "user", content: messageToSend }];

      setPendingMessage("");
      setChatHistory(newHistory);

      try {
        const response = await sendChatMessage({
          sessionId,         
          message: messageToSend,
          history: newHistory,
          token: authToken!,
          language: locale,
        });

        if (response.retryAfter) {
          const timeUntil = new Date(response.retryAfter).toLocaleTimeString();
          const errorMsg = t("errors.limitReachedWithTime") +  timeUntil + ".";
          setChatHistory(prev => [...prev, { role: "assistant", content: errorMsg }]);
          setRateLimited(true);
          return;
        }

        if (response && response.reply) {
          setChatHistory(prev => [...prev, { role: "assistant", content: response.reply }]);
        }
      } catch {
        setChatHistory(prev => [...prev, { role: "assistant", content: t("errors.generic") }]);
      } finally {
        setLoading(false);
      }
    },
    [rateLimited, token, tokenRequested, chatHistory, fetchToken, isChatMinimized, t, executeAction, sessionId, locale, tActions]
  );

  const handleMainSend = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      await sendMessage(input, () => setInput(""));
    },
    [input, sendMessage]
  );

  const handleChatSend = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      await sendMessage(chatInput, () => setChatInput(""));
    },
    [chatInput, sendMessage]
  );

  const ChatBubbles = useMemo(() => (
    <>
      {displayedHistory.map((msg, idx) =>
        msg.role === "assistant" ? (
          <div
            key={idx}
            className="flex items-start gap-3 group hover:bg-white/[0.02] p-3 rounded-xl transition-all duration-200"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-400 to-transparent flex items-center justify-center flex-shrink-0 shadow-lg">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 space-y-1">
              <div className="text-xs text-gray-400 font-medium">{t("roles.assistant")}</div>
              <div className="text-gray-100 text-sm leading-relaxed">
                {msg.content.split('\n').map((line, idx) => (
                  <React.Fragment key={idx}>
                    <React.Suspense fallback={<span>{line}</span>}>
                      <LazyReactMarkdown>{line}</LazyReactMarkdown>
                    </React.Suspense>
                    <br />
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div
            key={idx}
            className="flex items-start gap-3 group hover:bg-white/[0.02] p-3 rounded-xl transition-all duration-200"
          >
            <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0">
              <User className="w-4 h-4 text-gray-300" />
            </div>
            <div className="flex-1 space-y-1">
              <div className="text-xs text-gray-400 font-medium">{t("roles.you")}</div>
              <div className="text-gray-100 text-sm leading-relaxed">
                {msg.content.split('\n').map((line, idx) => (
                  <React.Fragment key={idx}>
                    <React.Suspense fallback={<span>{line}</span>}>
                      <LazyReactMarkdown>{line}</LazyReactMarkdown>
                    </React.Suspense>
                    <br />
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        )
      )}

      {pendingMessage && (
        <div className="flex items-start gap-3 group p-3 rounded-xl opacity-60">
          <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0">
            <User className="w-4 h-4 text-gray-300" />
          </div>
          <div className="flex-1 space-y-1">
            <div className="text-xs text-gray-400 font-medium">{t("roles.you")}</div>
            <div className="text-gray-300 text-sm leading-relaxed animate-pulse">{pendingMessage}</div>
          </div>
        </div>
      )}

      {(loading || tokenLoading) && (
        <div className="flex items-start gap-3 group p-3 rounded-xl">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-400 to-transparent flex items-center justify-center flex-shrink-0 shadow-lg animate-pulse">
            <Bot className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1 space-y-1">
            <div className="text-xs text-gray-400 font-medium">{t("roles.assistant")}</div>
            <div className="text-gray-300 text-sm leading-relaxed italic flex items-center gap-2">
              <Loader2 className="w-3 h-3 animate-spin" />
              {tokenLoading ? t("status.waking") : t("status.responding")}
            </div>
          </div>
        </div>
      )}
    </>
  ), [displayedHistory, t, pendingMessage, loading, tokenLoading]);

  return (
    <>
      <section
        id="hassai"
        className="pt-16 md:pt-20 lg:pt-24 pb-24"
        aria-labelledby="about-ai-heading"
      >
        <h2 id="about-ai-heading" className="sr-only">
          {t("sectionTitle")}
        </h2>

        <div className="relative w-full">
          <div className="max-w-[1200px] xl:w-[1200px] px-4 sm:px-6 md:px-8 py-12 mx-auto">
            <div className="max-w-4xl mx-auto text-center relative">
              <div className="absolute -top-32 -left-32 w-64 h-64 bg-teal-500/20 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute -top-24 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>

              <div className="relative z-10">
                <p className="mb-12 text-lg md:text-xl text-gray-300">{t("prompt.askAnything")}</p>

                <form
                  onSubmit={handleMainSend}
                  className="max-w-2xl mx-auto"
                  autoComplete="off"
                  aria-label="Chat input form"
                >
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-teal-400/20 to-purple-500/20 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                    <div className="relative bg-[rgba(177,177,177,0.01)] backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
                      <input
                        type="text"
                        className="w-full h-16 md:h-20 text-lg md:text-xl px-8 py-6 bg-transparent text-gray-100 placeholder-gray-400 focus:outline-none"
                        placeholder={t("prompt.placeholder") ?? ""}
                        value={input}
                        onChange={handleInput}
                        disabled={loading || rateLimited}
                        aria-label={t("aria.typeMessage")}
                      />
                      <button
                        type="submit"
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 rounded-xl text-white transition-all duration-200 flex items-center justify-center disabled:opacity-60 disabled:cursor-not-allowed shadow-lg"
                        disabled={loading || !input.trim() || rateLimited || tokenLoading}
                        aria-label={t("aria.sendMessage")}
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
                    <p className="mt-4 text-blue-400 text-sm bg-blue-900/20 px-4 py-2 rounded-lg border border-red-500/30">
                      {t("errors.limitReached")}
                    </p>
                  )}

                  {tokenLoading && (
                    <p className="mt-4 text-blue-400 text-sm bg-blue-900/20 px-4 py-2 rounded-lg border border-red-500/30">
                      {t("status.waking")}
                    </p>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {showChatWidget && (
<div className="fixed bottom-6 right-6 z-50">
  {/* === Floating Button (when minimized) === */}
{isChatMinimized && (
  <div className="fixed bottom-6 right-6 z-50">
    <button
      onClick={() => setIsChatMinimized(false)}
      className="w-16 h-16 flex items-center justify-center text-white hover:bg-white/10 rounded-2xl transition-colors duration-200 relative overflow-hidden group"
      aria-label={t("aria.openChat")}
    >
      <div
        className="absolute inset-0 rounded-2xl p-[2px]"
        style={{
          background: `linear-gradient(90deg, transparent, transparent, #3bf6edb7, #a882ffc4, transparent, transparent)`,
          backgroundSize: "300% 300%",
          animation: "smooth-border 3s ease-in-out infinite",
        }}
      >
        <div className="w-full h-full rounded-2xl bg-black/80 backdrop-blur-sm flex items-center justify-center">
          <Bot className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-200" />
        </div>
      </div>
    </button>
  </div>
)}

  {/* === Chat Box (when expanded) === */}
  <div
  className={`fixed bottom-6 right-6 z-50 origin-bottom-right transition-transform transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
    isChatMinimized ? "scale-0 opacity-0 pointer-events-none" : "scale-100 opacity-100"
  } w-80 sm:w-96 h-[500px] bg-[rgba(177,177,177,0.01)] backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl`}
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
</div>

      )}
    </>
  );
};

export default React.memo(AboutSectionOne);