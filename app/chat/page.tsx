'use client';

import { useState, useRef, useEffect, FormEvent } from 'react';
import Link from 'next/link';
import { ApiError, chatService } from '../../lib/api';
import { useToken } from '../hooks/useToken';
import { useLanguage } from '@/lib/language-context';
import { LanguageToggle } from '../components/LanguageToggle';
import {
  ArrowLeft,
  Send,
  Lightbulb,
  Bot,
  User,
  Sparkles,
  MessageCircle,
  AlertTriangle,
} from 'lucide-react';

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
  const { t } = useLanguage();

  const { token, isLoading: tokenLoading, error: tokenError, refetch } = useToken();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading || tokenLoading) return;

    if (!token) {
      setMessages(prev => [...prev, { type: 'error', content: t.chat.errors.tokenUnavailable }]);
      return;
    }

    const userMessage = inputMessage.trim();
    setInputMessage('');
    setIsLoading(true);

    const history = messages
      .filter((m): m is { type: 'user'; content: string } | { type: 'ai'; content: string; risks: Risk[] } =>
        m.type === 'user' || m.type === 'ai'
      )
      .slice(-4)
      .map(m => ({
        role: (m.type === 'user' ? 'user' : 'assistant') as 'user' | 'assistant',
        content: m.content,
      }));

    setMessages(prev => [...prev, { type: 'user', content: userMessage }]);

    try {
      const response = await chatService.sendMessage(userMessage, token, history);
      setMessages(prev => [
        ...prev,
        { type: 'ai', content: response.answer, risks: response.risks || [] },
      ]);
    } catch (err) {
      console.error('Chat error:', err);
      if (err instanceof ApiError && err.status === 429) {
        refetch();
        setMessages(prev => [...prev, { type: 'error', content: t.chat.errors.limitExceeded }]);
      } else {
        setMessages(prev => [...prev, { type: 'error', content: t.chat.errors.generalError }]);
      }
    } finally {
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

  const exampleQuestions = t.chat.exampleQuestions;

  if (tokenLoading) {
    return (
      <section className="min-h-screen relative overflow-hidden bg-black flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/10 via-black to-purple-900/10" />
        <div className="text-center space-y-6 relative z-10">
          <div className="relative inline-block">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 blur-xl opacity-50 animate-pulse" />
            <div className="relative w-20 h-20 rounded-full bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-md">
              <Bot size={32} className="text-cyan-400 animate-pulse" />
            </div>
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-white">{t.chat.loading}</h2>
            <div className="flex justify-center items-center space-x-2">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen relative overflow-hidden bg-black">
      <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/10 via-black to-purple-900/10" />

      {/* Navigation */}
      <div className="fixed top-6 left-6 z-50">
        <Link
          href="/"
          className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/15 border border-white/20 hover:border-white/30 rounded-xl backdrop-blur-md transition-all duration-300 group"
        >
          <ArrowLeft size={16} className="text-slate-400 group-hover:text-cyan-400 transition-colors" />
          <span className="text-sm font-medium text-white">{t.back}</span>
        </Link>
      </div>

      <div className="fixed top-6 right-6 z-50">
        <LanguageToggle isDark={true} />
      </div>

      <div className="min-h-screen flex flex-col items-center pt-24 pb-8 px-4 sm:px-6 relative z-10">
        <div className="max-w-4xl w-full">
          {/* Service Error Banner */}
          {tokenError && (
            <div className="mb-6 p-4 rounded-xl bg-amber-900/20 border border-amber-500/30 flex items-center gap-3 text-amber-400 animate-fade-in">
              <AlertTriangle size={20} className="shrink-0" />
              <span>{tokenError.status === 429 ? t.limitExceededError : t.serviceError}</span>
            </div>
          )}

          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-4">
              <MessageCircle className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span className="text-sm font-medium text-white">{t.chat.badge}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
              <span className="text-white">{t.chat.title}</span>
            </h1>
            <p className="text-slate-400 text-base md:text-lg">{t.chat.subtitle}</p>
          </div>

          {/* Chat Container */}
          <div className="bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md overflow-hidden">
            {/* Messages Area */}
            <div className="h-[55vh] sm:h-[500px] overflow-y-auto p-4 sm:p-6 space-y-4">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-6 animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                    <Bot size={28} className="text-cyan-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">{t.chat.greeting}</h3>
                  <div className="w-full max-w-2xl">
                    <p className="text-sm mb-4 text-slate-400">{t.chat.examples}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {exampleQuestions.map((q: string, i: number) => (
                        <button
                          key={i}
                          onClick={() => setInputMessage(q)}
                          className="group p-3 sm:p-4 text-left text-xs sm:text-sm rounded-xl bg-white/5 hover:bg-cyan-500/10 border border-white/10 hover:border-cyan-400/50 text-slate-300 transition-all duration-300 hover:scale-[1.02]"
                        >
                          <Lightbulb size={14} className="inline mr-2 text-slate-500 group-hover:text-cyan-400 transition-colors" />
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
                            <div className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-2xl px-5 py-3">
                              {m.content}
                            </div>
                            <div className="w-8 h-8 bg-white/10 border border-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                              <User size={14} className="text-white" />
                            </div>
                          </div>
                        </div>
                      )}
                      {m.type === 'error' && (
                        <div className="flex justify-start">
                          <div className="px-5 py-3 rounded-2xl bg-red-900/20 text-red-400 border border-red-500/30">
                            ❌ {m.content}
                          </div>
                        </div>
                      )}
                      {m.type === 'ai' && (
                        <div className="flex justify-start">
                          <div className="flex items-start gap-3 max-w-[85%]">
                            <div className="w-8 h-8 bg-white/10 border border-cyan-400/50 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                              <Bot size={14} className="text-cyan-400" />
                            </div>
                            <div className="bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-slate-200">
                              <p>{m.content}</p>
                              {m.risks?.length > 0 && (
                                <div className="mt-4 space-y-3">
                                  {m.risks.map((r, j) => (
                                    <div
                                      key={j}
                                      className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all duration-200"
                                    >
                                      <div className="flex items-center justify-between">
                                        <h5 className="font-medium text-white">{r.type}</h5>
                                        <span className={`px-3 py-1 rounded-full text-xs ${getSeverityBadge(r.severity)}`}>
                                          {getSeverityIcon(r.severity)} {r.severity}
                                        </span>
                                      </div>
                                      <p className="text-xs mt-2 text-cyan-400">{r.law_reference}</p>
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
                        <div className="w-8 h-8 bg-white/10 border border-cyan-400/50 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <Bot size={14} className="text-cyan-400 animate-pulse" />
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-2xl px-5 py-3">
                          <div className="flex items-center gap-2">
                            <div className="flex gap-1">
                              {[0, 150, 300].map(delay => (
                                <div
                                  key={delay}
                                  className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce"
                                  style={{ animationDelay: `${delay}ms` }}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-slate-400">{t.chat.analyzing}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </>
              )}
            </div>

            {/* Input Area */}
            <form onSubmit={sendMessage} className="border-t border-white/10 bg-white/5 p-4 sm:p-6">
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={e => setInputMessage(e.target.value)}
                    placeholder={
                      tokenError
                        ? tokenError.status === 429
                          ? t.chat.placeholderLimitExceeded
                          : t.chat.placeholderUnavailable
                        : t.chat.placeholder
                    }
                    className="w-full text-sm rounded-xl px-4 py-3 sm:px-5 sm:py-4 pr-12 bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all duration-200 outline-none"
                    disabled={isLoading}
                  />
                  {inputMessage && (
                    <Sparkles className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-400 animate-pulse" />
                  )}
                </div>
                <button
                  type="submit"
                  disabled={!inputMessage.trim() || isLoading || !token}
                  className="px-4 py-3 sm:px-6 sm:py-4 rounded-xl bg-white text-black font-medium hover:bg-slate-100 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Send size={20} />
                  )}
                </button>
              </div>

              {messages.length === 0 && (
                <div className="mt-4 flex flex-wrap gap-2 justify-center">
                  {t.chat.topics.map((topic: string) => (
                    <button
                      key={topic}
                      type="button"
                      onClick={() => setInputMessage(t.chat.topicPrompt.replace('{topic}', topic))}
                      disabled={!token}
                      className="px-3 py-1.5 rounded-full text-xs bg-white/5 hover:bg-cyan-500/10 border border-white/10 hover:border-cyan-400/50 text-slate-400 hover:text-cyan-400 transition-all duration-200 disabled:opacity-50"
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
