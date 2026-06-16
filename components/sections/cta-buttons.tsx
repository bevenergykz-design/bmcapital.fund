'use client';

import Link from 'next/link';
import { ArrowRight, Handshake } from 'lucide-react';
import ScrollAnimate from '@/components/scroll-animate';
import { useLang } from '@/lib/lang-context';

export default function CtaButtonsSection() {
  const { t } = useLang();

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="cta-actions"
      className="relative py-20 md:py-28 overflow-hidden"
      style={{ backgroundColor: '#163C34' }}
    >
      {/* subtle texture overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,231,0.04)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-[120px] pointer-events-none bg-gradient-to-b from-[#163C34] to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-[120px] pointer-events-none bg-gradient-to-t from-[#163C34] to-transparent" />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <ScrollAnimate>
          <div className="text-center mb-10 md:mb-14">
            <p className="text-[10px] md:text-xs tracking-[0.22em] uppercase text-[#E8E08C]/70 mb-4">
              {t('cta.label')}
            </p>
            <h2 className="text-3xl md:text-5xl font-light text-[#FFFFE7] leading-tight mb-4">
              {t('cta.title')}
            </h2>
            <p className="text-base md:text-lg font-light text-[#FFFFE7]/60 max-w-2xl mx-auto leading-relaxed">
              {t('cta.subtitle')}
            </p>
          </div>
        </ScrollAnimate>

        <ScrollAnimate delay={150}>
          <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6">
            {/* Предложить сделку */}
            <Link href="/apply" className="group">
              <button
                className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-5 rounded-full bg-[#FFFFE7] text-[#163C34] text-base font-semibold transition-all duration-300 hover:scale-[1.03] hover:bg-white hover:shadow-[0_8px_32px_rgba(255,255,231,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8E08C]"
                aria-label="Submit a deal"
              >
                <ArrowRight className="w-5 h-5 flex-shrink-0" />
                <span>{t('cta.proposeDeal')}</span>
              </button>
            </Link>

            {/* Стать партнёром */}
            <button
              onClick={scrollToContact}
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-5 rounded-full border border-[#FFFFE7]/30 bg-transparent text-[#FFFFE7] text-base font-semibold transition-all duration-300 hover:scale-[1.03] hover:bg-[#FFFFE7]/10 hover:border-[#FFFFE7]/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8E08C]"
              aria-label="Become a partner"
            >
              <Handshake className="w-5 h-5 flex-shrink-0" />
              <span>{t('cta.becomePartner')}</span>
            </button>
          </div>
        </ScrollAnimate>

        {/* Three trust signals */}
        <ScrollAnimate delay={250}>
          <div className="mt-14 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
            {(t('cta.signals') as { label: string; value: string }[]).map((sig, i) => (
              <div
                key={i}
                className="border border-[rgba(255,255,231,0.12)] rounded-2xl p-6 text-center bg-[rgba(255,255,231,0.04)] hover:bg-[rgba(255,255,231,0.07)] transition-colors"
              >
                <div className="text-2xl md:text-3xl font-semibold text-[#FFFFE7] mb-2">
                  {sig.value}
                </div>
                <div className="text-sm font-light text-[#E8E08C]/70">{sig.label}</div>
              </div>
            ))}
          </div>
        </ScrollAnimate>
      </div>
    </section>
  );
}
