'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/language-context';
import { LanguageToggle } from './components/LanguageToggle';

import {
  MessageCircle,
  FileText,
  ChevronRight,
  Moon,
  Sun,
  Sparkles,
  Zap,
  Shield,
  Clock,
} from 'lucide-react';

function parseHighlight(text: string, isDark: boolean) {
  const regex = /{(.*?)}/g;
  return text.split('\n').map((line, i) => {
    const parts: (string | JSX.Element)[] = [];
    let lastIndex = 0,
      match;

    while ((match = regex.exec(line)) !== null) {
      if (match.index > lastIndex) parts.push(line.slice(lastIndex, match.index));
      parts.push(
        <span
          key={`${i}-${match.index}`}
          className={`bg-gradient-to-r ${isDark ? 'from-blue-400 to-cyan-300' : 'from-[#0092BB] to-blue-600'
            } bg-clip-text text-transparent font-extrabold`}
        >
          {match[1]}
        </span>
      );
      lastIndex = regex.lastIndex;
    }
    if (lastIndex < line.length) parts.push(line.slice(lastIndex));
    if (i < text.split('\n').length - 1) parts.push(<br key={`br-${i}`} />);
    return parts;
  }).flat();
}

export default function Home() {
  const [isDark, setIsDark] = useState(true);
  const [mounted, setMounted] = useState(false);
  const { t } = useLanguage();

  useEffect(() => setMounted(true), []);

  const heroData = {
    title: t.home.title,
    description: t.home.description,
    stats: [
      { value: '99.8%', label: t.home.stats.accuracy, icon: Shield },
      { value: '24/7', label: t.home.stats.availability, icon: Clock },
      { value: 'LIVE', label: t.home.stats.realTime, icon: Zap },
      { value: 'EU', label: t.home.stats.compliant, icon: Sparkles },
    ],
  };

  if (!mounted) return null;

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${isDark
          ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'
          : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'
        }`}
    >
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <LanguageToggle isDark={isDark} />
        <button
          onClick={() => setIsDark(!isDark)}
          className={`p-2 sm:p-3 rounded-full shadow-lg border backdrop-blur-md transition-all duration-300 hover:scale-110 ${isDark
              ? 'bg-slate-800/80 border-slate-600 text-yellow-400 hover:bg-slate-700/80'
              : 'bg-white/80 border-gray-200 text-gray-600 hover:bg-white'
            }`}
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>

      <section
        className={`relative overflow-hidden min-h-screen flex flex-col justify-center ${isDark
            ? 'bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900'
            : 'bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50'
          }`}
      >
        <div className={`absolute inset-0 ${isDark ? 'opacity-20' : 'opacity-30'}`}>
          <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-72 sm:h-72 bg-blue-400 rounded-full blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute top-1/3 right-1/4 w-48 h-48 sm:w-72 sm:h-72 bg-purple-400 rounded-full blur-3xl opacity-30 animate-pulse delay-1000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-48 h-48 sm:w-72 sm:h-72 bg-cyan-400 rounded-full blur-3xl opacity-30 animate-pulse delay-2000"></div>
        </div>

        <div className="relative mx-auto px-4 sm:px-6 xl:px-12 z-10 flex flex-col justify-center items-center py-16 sm:py-20">
          <div className="text-center mb-8">
            <h1
              className={`text-2xl sm:text-4xl md:text-6xl font-bold mb-4 leading-tight ${isDark ? 'text-white' : 'text-slate-800'
                } animate-fade-in-up`}
            >
              {parseHighlight(heroData.title, isDark)}
            </h1>
            <p
              className={`text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed ${isDark ? 'text-slate-300' : 'text-gray-600'
                }`}
            >
              {heroData.description}
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-10 w-full max-w-5xl">
            {heroData.stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div
                  key={idx}
                  className={`group relative rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center backdrop-blur-md border transition-all duration-500 hover:scale-105 hover:-translate-y-2 cursor-pointer ${isDark
                      ? 'bg-slate-800/50 border-slate-600/50 hover:bg-slate-700/60'
                      : 'bg-white/70 border-white/50 hover:bg-white/90'
                    } shadow-lg hover:shadow-2xl`}
                >
                  <Icon
                    className={`w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 sm:mb-3 ${isDark
                        ? idx % 2 === 0
                          ? 'text-blue-400'
                          : 'text-purple-400'
                        : idx % 2 === 0
                          ? 'text-[#0092BB]'
                          : 'text-orange-500'
                      }`}
                  />
                  <div
                    className={`text-lg sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2 ${isDark
                        ? idx % 2 === 0
                          ? 'text-blue-400'
                          : 'text-purple-400'
                        : idx % 2 === 0
                          ? 'text-[#0092BB]'
                          : 'text-orange-500'
                      }`}
                  >
                    {stat.value}
                  </div>
                  <div
                    className={`${isDark ? 'text-slate-300' : 'text-slate-600'
                      } text-xs sm:text-sm font-medium`}
                  >
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-10 w-full sm:w-auto">
            <Link
              href="/chat"
              className="group relative overflow-hidden bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold rounded-xl sm:rounded-2xl px-4 py-3 sm:px-8 sm:py-4 flex items-center justify-center gap-2 sm:gap-3 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 w-full sm:w-auto"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <MessageCircle size={18} className="relative z-10 group-hover:rotate-12 transition-transform duration-300" />
              <span className="relative z-10 text-sm sm:text-base">{t.home.buttons.startChat}</span>
              <ChevronRight size={14} className="relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>

            <Link
              href="/pdf-analyzer"
              className={`group relative font-semibold rounded-xl sm:rounded-2xl px-4 py-3 sm:px-8 sm:py-4 flex items-center justify-center gap-2 sm:gap-3 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 w-full sm:w-auto ${isDark
                  ? 'bg-slate-800/50 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-slate-900'
                  : 'bg-white/80 border-[#0092BB] text-[#0092BB] hover:bg-[#0092BB] hover:text-white'
                }`}
            >
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isDark ? 'bg-blue-400' : 'bg-[#0092BB]'
                  }`}
              />
              <FileText size={18} className="relative z-10 group-hover:-rotate-12 transition-transform duration-300" />
              <span className="relative z-10 text-sm sm:text-base">{t.home.buttons.documentAnalyzer}</span>
              <ChevronRight size={14} className="relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
