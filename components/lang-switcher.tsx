'use client';

import { useLang } from '@/lib/lang-context';
import { Language } from '@/lib/translations';

export default function LangSwitcher() {
  const { lang, setLang } = useLang();

  const languages: { code: Language; label: string }[] = [
    { code: 'ru', label: 'RU' },
    { code: 'en', label: 'EN' },
    { code: 'kz', label: 'KZ' },
  ];

  return (
    <div className="flex items-center gap-1">
      {languages.map((l, index) => (
        <span key={l.code} className="flex items-center">
          <button
            onClick={() => setLang(l.code)}
            className={`px-2 py-1 text-sm font-medium transition-colors ${
              lang === l.code
                ? 'text-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
            aria-label={`Switch to ${l.label}`}
          >
            {l.label}
          </button>
          {index < languages.length - 1 && (
            <span className="text-muted-foreground">|</span>
          )}
        </span>
      ))}
    </div>
  );
}
