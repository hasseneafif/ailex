"use client"
import dynamic from "next/dynamic";
const ConstellationBackground = dynamic(() => import("./ConstellationBackground"), { ssr: false });

import React, { useRef, useEffect, useState, useMemo, useCallback } from "react";
import Image from "next/image";
import { sendChatMessage } from "../../services/chatService";



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
  const [loading, setLoading] = useState(false);
  const [rateLimited, setRateLimited] = useState(false);

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
          cancelAnimationFrame(animationFrame);
          return targetSpeed;
        }
        return currentSpeed + diff * 0.1;
      });
      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
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



    // On first input, request token if not present
    const handleInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      setInput(e.target.value);
      if (!token && !tokenRequested && e.target.value.trim() !== "") {
        setTokenRequested(true);
        fetchToken();
      }
    }, [token, tokenRequested, fetchToken]);


  // Wait for token before sending chat

  const handleSend = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || rateLimited) return;
    if (!token) {
      setTokenRequested(true);
      await fetchToken();
      // Wait for token to be set
      for (let i = 0; i < 20; i++) {
        if (token) break;
        await new Promise(res => setTimeout(res, 100));
      }
      if (!token) return;
    }
    const authToken = token;
    const newHistory = [...chatHistory, { role: "user", content: input }];
    setChatHistory(newHistory);
    setInput("");
    setLoading(true);
    try {
      const response = await sendChatMessage({
        sessionId: "demo-session-id",
        message: input,
        history: newHistory,
        token: authToken,
      });


     if (response.retryAfter) {
      const timeUntil = new Date(response.retryAfter).toLocaleTimeString();
      const errorMsg = `You have reached your daily limit. Try again after ${timeUntil}.`;
      setChatHistory(prev => [...prev, { role: "assistant", content: errorMsg }]);
      setRateLimited(true);
      return; // stop further processing
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
  }, [input, rateLimited, token, tokenRequested, chatHistory, fetchToken]);

  // Memoized chat bubbles for performance
  const ChatBubbles = useMemo(() => (
    <>
      {chatHistory.map((msg, idx) =>
        msg.role === "assistant" ? (
          <div key={idx} className="flex items-start gap-2">
            <Image src="/images/logo/v-icon.svg" alt="Assistant Icon" width={32} height={32} className="w-8 h-8 p-0"   draggable={false} />
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-2 text-sm text-gray-900 dark:text-white max-w-[70%]" aria-label="AI response">{msg.content}</div>
          </div>
        ) : (
          <div key={idx} className="flex items-start gap-2 flex-row-reverse">
            <div className="bg-white text-black rounded-lg px-4 py-2 text-sm max-w-[70%]" aria-label="User message">{msg.content}</div>
          </div>
        )
      )}
      {loading && (
        <div className="flex items-start gap-2">
          <Image src="/images/logo/v-icon.svg" alt="Assistant Icon" width={32} height={32} className="w-8 h-8 p-0"   draggable={false}/>
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-2 text-sm text-gray-900 dark:text-white max-w-[70%] opacity-60 italic">AI is responding...</div>
        </div>
      )}
    </>
  ), [chatHistory, loading]);

  return (
    <section id="hassai" className="pt-16 md:pt-20 lg:pt-28" aria-labelledby="about-ai-heading">
      <h2 id="about-ai-heading" className="sr-only">About Hass AI Chat</h2>
      <div className="container">
        <div className="border-b border-body-color/[.15] pb-16 dark:border-white/[.15] md:pb-20 lg:pb-28">
          <div className="-mx-4 flex flex-wrap items-center">
            {/* Left side: Chat UI (mobile has constellation bg, desktop does not) */}
            <div className="w-full px-4 lg:w-1/2">
              <div className="relative max-w-[570px] mx-auto mb-8 min-h-[350px] flex flex-col overflow-hidden" aria-live="polite">
             
                {/* Title and description */}
                <h3 className="mb-0 text-sm md:text-lg font-xoireqe text-black dark:text-white  relative z-10">Hass AI</h3>
                <p className="mb-12 text-base font-ubunto !leading-relaxed text-body-color md:text-sm relative z-10">Ask me anything.</p>
                {/* Chat content */}
                <div ref={chatContainerRef} className="flex-1 overflow-y-auto space-y-4 mb-4 max-h-80 pr-2 relative z-10" aria-live="polite" aria-atomic="false">
                  {ChatBubbles}
                </div>
                <form className="flex gap-2 mt-2 relative z-10" onSubmit={handleSend} autoComplete="off" aria-label="Chat input form">
                  <input
                    type="text"
                    className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#181a20] dark:bg-[#181a20] px-6 py-3 text-base text-white outline-none focus:border-primary dark:border-transparent focus:border-primary focus:shadow-none"
placeholder={rateLimited ? `Limit reached, try again tomorrow.` : "Type a message."}
                    value={input}
                    onChange={handleInput}
                    disabled={loading || rateLimited}
                    aria-label="Type your message"
                  />
                 <button
  type="submit"
  className="rounded border border-white px-4 py-2 text-base font-semibold text-white bg-transparent hover:bg-white hover:text-primary transition-all duration-200 flex items-center justify-center disabled:opacity-60 disabled:cursor-not-allowed"
  disabled={loading || !input.trim() || rateLimited || tokenLoading}
  aria-label="Send message"
>
  {tokenLoading ? (
    <svg
      className="animate-spin h-5 w-5 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className="w-5 h-5"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 10l9 9m0 0l9-9m-9 9V3"
      />
    </svg>
  )}
</button>

                </form>
              </div>
            </div>
            {/* Right side: Constellation animation (desktop only) */}
            <div className="w-full px-4 lg:w-1/2">
              <div
                ref={chartRef}
                className="wow fadeInUp relative mx-auto w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl aspect-[5/4] lg:mr-0 hidden lg:block"
                data-wow-delay=".2s"
                aria-hidden="true"
              >
                <ConstellationBackground speedMultiplier={speedMultiplier} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(AboutSectionOne);
