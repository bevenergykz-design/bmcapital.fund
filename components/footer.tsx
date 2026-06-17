'use client';

import Link from 'next/link';
import { useLang } from '@/lib/lang-context';
import { Mail, Linkedin } from 'lucide-react';

export default function Footer() {
  const { t } = useLang();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0a1f1a] border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6 py-10 md:py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-1">
            <span className="text-[#FFFFE7] font-semibold tracking-wide text-base">BM Capital Fund</span>
            <p className="text-xs text-white/40 font-light">{t('footer.description')}</p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <a
              href="mailto:info@bmcapital.fund"
              className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-[#FFFFE7] hover:border-[#FFFFE7] hover:bg-white/5 transition-all duration-200"
              title="Email"
            >
              <Mail className="w-4.5 h-4.5" />
            </a>
            <a
              href="https://www.linkedin.com/company/bm-capital-fund/about/?viewAsMember=true"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-[#FFFFE7] hover:border-[#FFFFE7] hover:bg-white/5 transition-all duration-200"
              title="LinkedIn"
            >
              <Linkedin className="w-4.5 h-4.5" />
            </a>
            <a
              href="https://t.me/bmcapitalfund"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-[#FFFFE7] hover:border-[#FFFFE7] hover:bg-white/5 transition-all duration-200"
              title="Telegram"
            >
              <svg viewBox="0 0 24 24" className="w-4.5 h-4.5 fill-current">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.69-.52.36-1 .53-1.42.52-.47-.01-1.37-.26-2.03-.48-.82-.27-1.47-.42-1.42-.88.03-.24.35-.49.96-.75 3.78-1.65 6.31-2.74 7.58-3.27 3.61-1.5 4.36-1.76 4.85-1.77.11 0 .35.03.51.16.13.12.17.28.19.39.02.07.02.16.01.22z"/>
              </svg>
            </a>
          </div>

          {/* Legal links */}
          <nav aria-label="Legal" className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <Link
              href="/privacy"
              className="text-xs text-white/50 hover:text-[#FFFFE7] transition-colors duration-200 underline-offset-4 hover:underline"
            >
              {t('footer.privacyPolicy')}
            </Link>
            <span className="text-white/20 text-xs hidden sm:inline">·</span>
            <Link
              href="/terms"
              className="text-xs text-white/50 hover:text-[#FFFFE7] transition-colors duration-200 underline-offset-4 hover:underline"
            >
              {t('footer.termsOfUse')}
            </Link>
          </nav>
        </div>

        {/* Bottom line */}
        <div className="mt-8 pt-6 border-t border-white/[0.07] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-white/30 font-light">
            © {currentYear} BM Capital Fund. {t('footer.rights')}
          </p>
          <p className="text-[11px] text-white/20 font-light">
            {t('footer.legalNote')}
          </p>
        </div>
      </div>
    </footer>
  );
}
