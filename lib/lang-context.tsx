'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Language, translations } from './translations';

interface LangContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => any;
}

const LangContext = createContext<LangContextType | undefined>(undefined);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>('ru');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedLang = localStorage.getItem('bm-lang') as Language | null;
    if (savedLang && ['ru', 'en', 'kz'].includes(savedLang)) {
      setLangState(savedLang);
    }
    setMounted(true);
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('bm-lang', newLang);
    document.documentElement.setAttribute('lang', newLang);
  };

  const t = (key: string): any => {
    const keys = key.split('.');
    let result: any = translations[lang];

    for (const k of keys) {
      if (result && typeof result === 'object') {
        result = result[k];
      } else {
        return key;
      }
    }

    return result !== undefined ? result : key;
  };

  useEffect(() => {
    if (mounted) {
      document.documentElement.setAttribute('lang', lang);
    }
  }, [lang, mounted]);

  if (!mounted) {
    return null;
  }

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const context = useContext(LangContext);
  if (context === undefined) {
    throw new Error('useLang must be used within a LangProvider');
  }
  return context;
}
