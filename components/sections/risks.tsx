'use client';

import { Handshake, MessageSquare } from 'lucide-react';
import ScrollAnimate from '@/components/scroll-animate';
import { useLang } from '@/lib/lang-context';
import { Button } from '@/components/ui/button';

export default function RisksSection() {
  const { t } = useLang();

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      const off = 80;
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.pageYOffset - off,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      id="partnership"
      className="relative overflow-hidden py-16 md:py-24"
      style={{
        backgroundImage: 'url(/assets/risks-bg.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'scroll',
      }}
    >
      {/* Dark gradient overlays */}
      <div
        className="absolute left-0 right-0 top-0 h-[220px] pointer-events-none z-[15]"
        style={{
          background: 'linear-gradient(to bottom, #163C34 0%, rgba(22,60,52,0.85) 40%, transparent 100%)',
        }}
      />

      <div
        className="absolute left-0 right-0 bottom-0 h-[180px] pointer-events-none z-[15]"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, rgba(22,60,52,0.60) 50%, #0a1f1a 100%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: 'linear-gradient(to bottom, rgba(22,60,52,0.8) 0%, rgba(22,60,52,0.85) 35%, rgba(22,60,52,0.95) 70%, #0a1f1a 100%), radial-gradient(ellipse at top, rgba(22,60,52,0.20) 0%, rgba(22,60,52,0.65) 55%, rgba(22,60,52,0.95) 100%)',
        }}
      />

      <div className="relative z-20 max-w-4xl mx-auto px-6">
        <ScrollAnimate>
          <div className="bg-card/95 border border-primary/20 rounded-[32px] p-8 md:p-12 shadow-2xl backdrop-blur-md hover:border-primary/40 transition-colors">
            <div className="flex items-center gap-3 mb-6">
              <span className="px-4 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
                {t('partnership.tag')}
              </span>
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Handshake className="w-4 h-4 text-primary" />
              </div>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-foreground leading-tight mb-8">
              {t('partnership.title')}
            </h2>

            <div className="space-y-6 text-base md:text-lg font-light leading-relaxed text-muted-foreground whitespace-pre-line">
              {t('partnership.text')}
            </div>

            <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center gap-4">
              <Button
                onClick={scrollToContact}
                className="w-full sm:w-auto rounded-full px-8 py-6 bg-primary text-primary-foreground hover:bg-primary/90 flex items-center justify-center gap-2 group transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{t('hero.contact')}</span>
              </Button>
            </div>
          </div>
        </ScrollAnimate>
      </div>
    </section>
  );
}
