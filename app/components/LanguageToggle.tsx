'use client';

import { useLanguage } from '@/lib/language-context';
import { Languages } from 'lucide-react';

export function LanguageToggle({ isDark = true }: { isDark?: boolean }) {
  const { language, setLanguage } = useLanguage();

  return (
    <button
      onClick={() => setLanguage(language === 'en' ? 'fr' : 'en')}
      className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 hover:border-white/30 backdrop-blur-md transition-all duration-300 hover:scale-105 text-white"
      title={language === 'en' ? 'Switch to French' : "Passer à l'anglais"}
    >
      <Languages size={16} className="text-slate-400" />
      <span className="text-sm font-medium uppercase">{language}</span>
    </button>
  );
}
