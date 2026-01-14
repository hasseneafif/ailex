'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/language-context';
import { LanguageToggle } from './components/LanguageToggle';
import {
  MessageCircle,
  FileText,
  ArrowUpRight,
  Shield,
  Clock,
  Zap,
  Sparkles,
  Scale,
} from 'lucide-react';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const { t } = useLanguage();

  useEffect(() => setMounted(true), []);

  const stats = [
    { value: '99.8%', label: t.home.stats.accuracy, icon: Shield },
    { value: '24/7', label: t.home.stats.availability, icon: Clock },
    { value: 'LIVE', label: t.home.stats.realTime, icon: Zap },
    { value: 'EU', label: t.home.stats.compliant, icon: Sparkles },
  ];

  if (!mounted) return null;

  return (
    <section className="min-h-screen relative overflow-hidden bg-black">
      <div className="min-h-screen flex flex-col items-center justify-center py-12 md:py-20 px-4 sm:px-6 bg-black">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/10 via-black to-cyan-900/10" />

        {/* Language toggle */}
        <div className="fixed top-6 right-6 z-50">
          <LanguageToggle isDark={true} />
        </div>

        <div className="max-w-5xl w-full relative z-10">
          {/* Badge */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md">
              <Scale className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-medium text-white">AI-Powered EU Law Expert</span>
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-10 md:mb-16">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-4 md:mb-6">
              <span className="text-white">Navigate </span>
              <span className="animate-color-sweep">EU Law</span>
              <br />
              <span className="text-white">with confidence</span>
            </h1>

            <p className="text-slate-400 text-base md:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed px-4">
              {t.home.description}
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-10 md:mb-12 px-4">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div
                  key={idx}
                  className="group relative rounded-xl p-4 sm:p-6 text-center bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:-translate-y-1"
                >
                  <Icon className={`w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 sm:mb-3 ${
                    idx === 0 ? 'text-cyan-400' : 
                    idx === 1 ? 'text-purple-400' : 
                    idx === 2 ? 'text-pink-400' : 'text-blue-400'
                  }`} />
                  <div className={`text-lg sm:text-xl md:text-2xl font-bold mb-1 ${
                    idx === 0 ? 'text-cyan-400' : 
                    idx === 1 ? 'text-purple-400' : 
                    idx === 2 ? 'text-pink-400' : 'text-blue-400'
                  }`}>
                    {stat.value}
                  </div>
                  <div className="text-slate-400 text-xs sm:text-sm font-medium">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 md:gap-6 mb-8 md:mb-12 px-4">
            <Link
              href="/chat"
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-5 sm:px-6 py-3 sm:py-4 bg-white/10 hover:bg-cyan-500/20 border border-white/20 hover:border-cyan-400 rounded-xl transition-all duration-300 group"
            >
              <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" />
              <span className="text-white font-medium text-sm sm:text-base">{t.home.buttons.startChat}</span>
              <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </Link>

            <Link
              href="/pdf-analyzer"
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-5 sm:px-6 py-3 sm:py-4 bg-white/10 hover:bg-purple-500/20 border border-white/20 hover:border-purple-400 rounded-xl transition-all duration-300 group"
            >
              <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
              <span className="text-white font-medium text-sm sm:text-base">{t.home.buttons.documentAnalyzer}</span>
              <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-purple-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </Link>
          </div>

          {/* CTA Button */}
          <div className="text-center mb-10 md:mb-16 px-4">
            <Link
              href="/chat"
              className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-white text-black font-bold rounded-full hover:bg-slate-100 transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:shadow-[0_0_60px_rgba(255,255,255,0.3)] transform hover:-translate-y-1 text-sm sm:text-base"
            >
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
              Get Started Now
            </Link>
          </div>

          {/* Footer */}
          <div className="border-t border-white/10 pt-6 md:pt-8 mx-4">
            <div className="flex flex-row items-center justify-center gap-4 md:gap-8 text-center flex-wrap">
              <div className="flex items-center gap-2 text-slate-400 text-xs sm:text-sm">
                <Shield className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>GDPR Compliant</span>
              </div>
              
              <p className="text-xs sm:text-sm text-slate-400 font-mono">
                Powered by <span className="text-white">Ailex AI</span>
              </p>
              
              <p className="text-xs text-slate-500 font-mono">
                © {new Date().getFullYear()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
