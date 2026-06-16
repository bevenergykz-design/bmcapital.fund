'use client';

import Link from 'next/link';
import { useLang } from '@/lib/lang-context';

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

          {/* Social links placeholder — add icons here later */}
          {/* <div className="flex items-center gap-4"> */}
          {/* </div> */}

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
