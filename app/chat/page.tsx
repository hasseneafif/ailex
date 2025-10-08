'use client';

import { useState, useRef, useEffect, FormEvent } from 'react';
import Link from 'next/link';
import { ApiError, chatService } from '../../lib/api';
import { useToken } from '../hooks/useToken';
import dynamic from 'next/dynamic';

const ArrowLeft = dynamic(() => import('lucide-react').then(m => m.ArrowLeft), { ssr: false });
const Send = dynamic(() => import('lucide-react').then(m => m.Send), { ssr: false });
const Lightbulb = dynamic(() => import('lucide-react').then(m => m.Lightbulb), { ssr: false });
const Bot = dynamic(() => import('lucide-react').then(m => m.Bot), { ssr: false });
const User = dynamic(() => import('lucide-react').then(m => m.User), { ssr: false });
const Sparkles = dynamic(() => import('lucide-react').then(m => m.Sparkles), { ssr: false });

type Severity = 'low' | 'medium' | 'high';
type Risk = { type: string; severity: Severity; law_reference: string; explanation: string };
type Message =
  | { type: 'user'; content: string }
  | { type: 'ai'; content: string; risks: Risk[] }
  | { type: 'error'; content: string };

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Simple token hook
  const { token, isLoading: tokenLoading, error: tokenError, refetch } = useToken();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading || tokenLoading) return;

    // Check if token is available
    if (!token) {
      setMessages(prev => [...prev, {
        type: 'error',
        content: 'Authentication token not available. Please refresh the page.'
      }]);
      return;
    }

    const userMessage = inputMessage.trim();
    setInputMessage('');
    setIsLoading(true);

    setMessages(prev => [...prev, { type: 'user', content: userMessage }]);

    try {
      const response = await chatService.sendMessage(userMessage, token);
      setMessages(prev => [
        ...prev,
        { type: 'ai', content: response.answer, risks: response.risks || [] },
      ]);
    } catch (err) {
  console.error('Chat error:', err);

  if (err instanceof ApiError && err.status === 429) {
    // Block input immediately by updating the token store
    refetch(); // or setError({ message: 'Limit exceeded', status: 429 }) if you expose setError in your hook

    // Show a clear system-like message in chat
    setMessages(prev => [
      ...prev,
      {
        type: 'error',
        content: '⚠️ Daily limit exceeded. Please try again tomorrow.'
      },
    ]);
  } else {
    setMessages(prev => [
      ...prev,
      {
        type: 'error',
        content: '❌ Sorry, an error occurred. Please try again later.'
      },
    ]);
  }
}
    
    finally {
      setIsLoading(false);
    }
  };

  const getSeverityBadge = (severity: Severity) => {
    const badges = {
      low: 'bg-green-900/30 text-green-400 border border-green-500/30',
      medium: 'bg-yellow-900/30 text-yellow-400 border border-yellow-500/30',
      high: 'bg-red-900/30 text-red-400 border border-red-500/30',
    };
    return badges[severity];
  };

  const getSeverityIcon = (severity: Severity) =>
    ({ low: '✅', medium: '⚠️', high: '🚨' }[severity]);

  const exampleQuestions = [
    'Is it legal to ask about age in interviews?',
    'What are GDPR requirements for employee data?',
    'Can we enforce mandatory overtime?',
    'How to handle workplace discrimination complaints?',
  ];

  // Show loading state while fetching token
  if (tokenLoading) {
return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center relative overflow-hidden">
        {/* Animated background circles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>
        </div>
        
        <div className="text-center space-y-6 relative z-10">
          {/* Animated bot icon with rotating ring */}
          <div className="relative inline-block">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 blur-xl opacity-50 animate-pulse"></div>
            <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center">
              <Bot size={32} className="text-white animate-pulse" />
            </div>
            {/* Rotating ring */}
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-400 border-r-purple-400 animate-spin"></div>
          </div>
          
          {/* Loading text with animation */}
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
              Waking AI up
            </h2>
            <div className="flex justify-center items-center space-x-1">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-100"></div>
              <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce delay-200"></div>
            </div>
          </div>
          
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 transition-all duration-500 relative">
      {/* Full Page Animated Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900">
        {/* Background Elements */}
        <div className="absolute left-[-48px] top-[-48px] w-[192px] h-[192px] rounded-full blur-3xl bg-gradient-to-br from-blue-500/20 to-purple-500/30" />
        <div className="absolute bottom-[-24px] right-[-24px] w-[128px] h-[128px] rounded-full blur-3xl bg-gradient-to-br from-purple-500/20 to-pink-500/20" />

        {/* Floating Particles */}
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full opacity-40 bg-blue-400"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite alternate`,
            }}
          />
        ))}
      </div>

      {/* Back Button */}
      <div className="absolute top-6 left-6 z-20">
        <Link
          href="/"
          className="flex items-center space-x-2 px-4 py-2 backdrop-blur-md rounded-xl shadow-lg border border-slate-600 bg-slate-800/80 text-slate-300 hover:text-blue-400 hover:bg-slate-700/80 hover:scale-105 transition-all duration-200"
        >
          <ArrowLeft size={16} /> <span className="text-sm font-medium">Back</span>
        </Link>
      </div>

      {/* Header Section */}
      <section className="relative z-10 pt-24 pb-8">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 backdrop-blur-md bg-slate-800/50 text-blue-400">
              <Bot size={16} className="animate-pulse" />
              <span className="text-sm font-medium">AI Legal Assistant</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-white">
              EU Law Compliance Chat
            </h1>
            <p className="text-lg text-slate-300">
              Get instant expert guidance on European labor law
            </p>
          </div>
        </div>
      </section>

      {/* Chat Section */}
      <section className="relative z-10 px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-3xl shadow-2xl border border-slate-600/50 bg-slate-800/50 backdrop-blur-md overflow-hidden">
            <div className="h-[500px] overflow-y-auto p-6 space-y-6">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-6 animate-fade-in">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg">
                    <Bot size={28} />
                  </div>
                  <h3 className="text-xl font-semibold text-white">
                    Hello! Ask me your EU law questions
                  </h3>
                  <div className="w-full max-w-2xl">
                    <p className="text-sm mb-4 text-slate-400">Examples:</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {exampleQuestions.map((q, i) => (
                        <button
                          key={i}
                          onClick={() => setInputMessage(q)}
                          className="group p-4 text-left text-sm rounded-xl border border-slate-600 bg-slate-700/50 text-slate-300 hover:bg-slate-600/50 hover:border-blue-500/50 hover:scale-105 hover:-translate-y-1 transition-all duration-200"
                        >
                          <Lightbulb
                            size={14}
                            className="inline mr-2 text-slate-400 group-hover:text-blue-400 transition-colors"
                          />
                          "{q}"
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {messages.map((m, i) => (
                    <div key={i} className="animate-slide-in">
                      {m.type === 'user' && (
                        <div className="flex justify-end">
                          <div className="flex items-start gap-3 max-w-[80%]">
                            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-2xl px-6 py-4 shadow-lg">
                              {m.content}
                            </div>
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                              <User size={16} className="text-white" />
                            </div>
                          </div>
                        </div>
                      )}
                      {m.type === 'error' && (
                        <div className="flex justify-start">
                          <div className="px-6 py-4 rounded-2xl border bg-red-900/20 text-red-400 border-red-500/30">
                            ❌ {m.content}
                          </div>
                        </div>
                      )}
                      {m.type === 'ai' && (
                        <div className="flex justify-start">
                          <div className="flex items-start gap-3 max-w-[85%]">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1 bg-gradient-to-r from-blue-600 to-purple-600">
                              <Bot size={16} className="text-white" />
                            </div>
                            <div className="px-6 py-4 rounded-2xl shadow-lg border border-slate-600/50 bg-slate-700/50 text-slate-200">
                              <p>{m.content}</p>
                              {m.risks?.length > 0 && (
                                <div className="mt-4 space-y-3">
                                  {m.risks.map((r, j) => (
                                    <div
                                      key={j}
                                      className="border border-slate-600/50 bg-slate-800/50 rounded-xl p-4 hover:shadow-md transition-all duration-200"
                                    >
                                      <div className="flex items-center justify-between">
                                        <h5 className="font-medium text-slate-200">{r.type}</h5>
                                        <span
                                          className={`px-3 py-1 rounded-full text-xs ${getSeverityBadge(
                                            r.severity,
                                          )}`}
                                        >
                                          {getSeverityIcon(r.severity)} {r.severity}
                                        </span>
                                      </div>
                                      <p className="text-xs mt-2 text-blue-400">{r.law_reference}</p>
                                      <p className="text-sm mt-1 text-slate-300">{r.explanation}</p>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start animate-fade-in">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1 bg-gradient-to-r from-blue-600 to-purple-600">
                          <Bot size={16} className="text-white animate-pulse" />
                        </div>
                        <div className="px-6 py-4 rounded-2xl shadow-lg border border-slate-600/50 bg-slate-700/50">
                          <div className="flex items-center gap-2">
                            <div className="flex gap-1">
                              {[0, 150, 300].map(delay => (
                                <div
                                  key={delay}
                                  className="w-2 h-2 rounded-full animate-bounce bg-blue-400"
                                  style={{ animationDelay: `${delay}ms` }}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-slate-300">Analyzing...</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </>
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={sendMessage}
              className="border-t border-slate-600/50 bg-slate-800/30 p-6 backdrop-blur-md"
            >
              <div className="flex space-x-4">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={e => setInputMessage(e.target.value)}
placeholder={
  tokenError
    ? tokenError.status === 429
      ? 'Limit exceeded. Try again tomorrow.'
      : 'AI unavailable, try again later.'
    : 'Type your message...'
}
                    className="w-full rounded-2xl px-6 py-4 pr-12 bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    disabled={isLoading}
                  />
                  {inputMessage && (
                    <Sparkles className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400 animate-pulse" />
                  )}
                </div>
                <button
                  type="submit"
                  disabled={!inputMessage.trim() || isLoading || !token}
                  className="px-6 py-4 rounded-2xl shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50 disabled:scale-100"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Send size={20} />
                  )}
                </button>
              </div>

              {/* Quick Actions */}
              {messages.length === 0 && (
                <div className="mt-4 flex flex-wrap gap-2 justify-center">
                  {['GDPR', 'Employment', 'Contracts', 'Discrimination'].map(topic => (
                    <button
                      key={topic}
                      onClick={() => setInputMessage(`Tell me about ${topic} regulations in EU law`)}
                      disabled={!token}
                      className="px-3 py-1 rounded-full text-xs border border-slate-600 bg-slate-700/50 text-slate-300 hover:bg-slate-600/50 hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:hover:scale-100"
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0px) rotate(0deg);
          }
          100% {
            transform: translateY(-20px) rotate(180deg);
          }
        }
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
        .animate-slide-in {
          animation: slide-in 0.4s ease-out;
        }
      `}</style>
    </div>
  );
}