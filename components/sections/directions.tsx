'use client';

import { ArrowRight, Handshake, Shield, Layers } from 'lucide-react';
import ScrollAnimate from '@/components/scroll-animate';
import { useLang } from '@/lib/lang-context';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function DirectionsSection() {
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
    <div className="space-y-16">
      {/* Section: Capital Architecture */}
      <section
        id="architecture"
        className="relative overflow-hidden py-16 md:py-24"
        style={{
          backgroundImage: 'url(/assets/Premium_corporate_website_background_texture_not_a_delpmaspu.png)',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      >
        {/* Subtle overlays */}
        <div className="absolute top-0 left-0 right-0 h-[180px] pointer-events-none z-10 bg-gradient-to-b from-[#163C34] via-[#163C34]/85 to-transparent" />
        <div className="absolute inset-0 pointer-events-none z-10 bg-radial-gradient(ellipse at center, rgba(22,60,52,0.2) 0%, rgba(22,60,52,0.75) 75%, rgba(22,60,52,0.9) 100%)" />
        <div className="absolute left-0 right-0 bottom-0 h-[180px] pointer-events-none z-10 bg-gradient-to-t from-[#163C34] via-transparent to-transparent" />

        <div className="relative z-20 max-w-6xl mx-auto px-6">
          <ScrollAnimate>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-light mb-4 text-foreground text-center">
                {t('architecture.title')}
              </h2>
              <p className="text-lg text-center font-light max-w-3xl mx-auto text-muted-foreground">
                {t('architecture.subtitle')}
              </p>
            </div>
          </ScrollAnimate>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-5xl mx-auto">
            {/* Major block: Special Situations (70%) */}
            <div className="lg:col-span-7">
              <ScrollAnimate delay={100} className="h-full">
                <div className="h-full bg-card/95 border border-primary/20 rounded-3xl p-8 md:p-10 flex flex-col justify-between transition-all duration-300 hover:border-primary/45 hover:shadow-2xl">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className="px-4 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
                        {t('architecture.major.tag')}
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Shield className="w-5 h-5 text-primary" />
                      </div>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-semibold text-card-foreground mb-4">
                      {t('architecture.major.title')}
                    </h3>
                    <p className="text-base md:text-lg leading-relaxed font-light text-muted-foreground">
                      {t('architecture.major.desc')}
                    </p>
                  </div>
                </div>
              </ScrollAnimate>
            </div>

            {/* Minor block: Liquidity Management (30%) */}
            <div className="lg:col-span-5">
              <ScrollAnimate delay={200} className="h-full">
                <div className="h-full bg-card/70 border border-border rounded-3xl p-8 md:p-10 flex flex-col justify-between transition-all duration-300 hover:border-primary/30 hover:shadow-xl">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className="px-4 py-1 rounded-full text-xs font-semibold bg-muted-foreground/10 text-muted-foreground border border-border">
                        {t('architecture.minor.tag')}
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-muted/20 flex items-center justify-center">
                        <Layers className="w-5 h-5 text-muted-foreground" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-semibold text-card-foreground mb-4">
                      {t('architecture.minor.title')}
                    </h3>
                    <p className="text-sm md:text-base leading-relaxed font-light text-muted-foreground">
                      {t('architecture.minor.desc')}
                    </p>
                  </div>
                </div>
              </ScrollAnimate>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Two Roles */}
      <section
        id="roles"
        className="relative overflow-hidden py-16 bg-background"
      >
        <div className="max-w-6xl mx-auto px-6 relative z-20">
          <ScrollAnimate>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-light text-foreground text-center">
                {t('roles.title')}
              </h2>
            </div>
          </ScrollAnimate>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* For Market Professionals */}
            <ScrollAnimate delay={100}>
              <div className="bg-card border border-border rounded-3xl p-8 flex flex-col justify-between h-full transition-all duration-300 hover:scale-[1.01] hover:border-primary/20 hover:shadow-lg">
                <div className="space-y-6">
                  <div className="text-primary text-xs font-semibold tracking-wider uppercase border-b border-border pb-3">
                    {t('roles.professional.tag')}
                  </div>
                  <p className="text-base font-light leading-relaxed text-muted-foreground">
                    {t('roles.professional.text')}
                  </p>
                  <p className="text-xs text-primary font-medium italic pt-2">
                    {t('roles.professional.footnote')}
                  </p>
                </div>
                <div className="mt-8">
                  <Link href="/apply">
                    <Button className="w-full rounded-full py-5 bg-primary text-primary-foreground hover:bg-primary/90 flex items-center justify-center gap-2 group transition-all">
                      <span>{t('cta.proposeDeal')}</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            </ScrollAnimate>

            {/* For Investors */}
            <ScrollAnimate delay={200}>
              <div className="bg-card border border-border rounded-3xl p-8 flex flex-col justify-between h-full transition-all duration-300 hover:scale-[1.01] hover:border-primary/20 hover:shadow-lg">
                <div className="space-y-6">
                  <div className="text-primary text-xs font-semibold tracking-wider uppercase border-b border-border pb-3">
                    {t('roles.investor.tag')}
                  </div>
                  <p className="text-base font-light leading-relaxed text-muted-foreground">
                    {t('roles.investor.text')}
                  </p>
                  <p className="text-xs text-primary font-medium italic pt-2">
                    {t('roles.investor.footnote')}
                  </p>
                </div>
                <div className="mt-8">
                  <Button
                    onClick={scrollToContact}
                    className="w-full rounded-full py-5 border border-primary text-primary bg-transparent hover:bg-primary/10 flex items-center justify-center gap-2 group transition-all"
                  >
                    <Handshake className="w-4 h-4" />
                    <span>{t('cta.becomePartner')}</span>
                  </Button>
                </div>
              </div>
            </ScrollAnimate>
          </div>
        </div>
      </section>
    </div>
  );
}
