'use client';

import { useLanguage } from '@/lib/language-context';
import { Languages } from 'lucide-react';

export function LanguageToggle({ isDark = true }: { isDark?: boolean }) {
  const { language, setLanguage } = useLanguage();

  return (
    <button
      onClick={() => setLanguage(language === 'en' ? 'fr' : 'en')}
      className={`flex items-center gap-2 px-3 py-2 rounded-full shadow-lg border backdrop-blur-md transition-all duration-300 hover:scale-110 ${
        isDark
          ? 'bg-slate-800/80 border-slate-600 text-slate-300 hover:bg-slate-700/80'
          : 'bg-white/80 border-gray-200 text-gray-600 hover:bg-white'
      }`}
      title={language === 'en' ? 'Switch to French' : 'Passer à l\'anglais'}
    >
      <Languages size={16} />
      <span className="text-sm font-medium uppercase">{language}</span>
    </button>
  );
}
