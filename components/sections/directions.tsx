'use client';

import { useState } from 'react';
import { ArrowRight, Handshake, Shield } from 'lucide-react';
import ScrollAnimate from '@/components/scroll-animate';
import { useLang } from '@/lib/lang-context';
import { Button } from '@/components/ui/button';
import SpecialSituationsModal from '@/components/special-situations-modal';
import InvestorModal from '@/components/investor-modal';

export default function DirectionsSection() {
  const { t } = useLang();
  const [isSpecialOpen, setIsSpecialOpen] = useState(false);
  const [isInvestorOpen, setIsInvestorOpen] = useState(false);

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

          <div className="max-w-3xl mx-auto">
            {/* Major block: Special Situations */}
            <ScrollAnimate delay={100} className="h-full">
              <div 
                onClick={() => setIsSpecialOpen(true)}
                className="group h-full bg-card/95 border border-primary/20 rounded-3xl p-8 md:p-10 flex flex-col justify-between transition-all duration-300 hover:border-primary/45 hover:shadow-2xl hover:scale-[1.01] cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="px-4 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
                      {t('architecture.major.tag')}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Shield className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-semibold text-card-foreground mb-4 group-hover:text-primary transition-colors">
                    {t('architecture.major.title')}
                  </h3>
                  <p className="text-base md:text-lg leading-relaxed font-light text-muted-foreground">
                    {t('architecture.major.desc')}
                  </p>
                </div>
                <div className="mt-8 flex items-center gap-2 text-primary font-semibold group-hover:translate-x-1 transition-transform">
                  <span>{t('directions.applyButton')}</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </ScrollAnimate>
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
                  <Button 
                    onClick={() => setIsSpecialOpen(true)}
                    className="w-full rounded-full py-5 bg-primary text-primary-foreground hover:bg-primary/90 flex items-center justify-center gap-2 group transition-all"
                  >
                    <span>{t('cta.proposeDeal')}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Button>
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
                    onClick={() => setIsInvestorOpen(true)}
                    className="w-full rounded-full py-5 border border-primary text-primary bg-transparent hover:bg-primary/10 flex items-center justify-center gap-2 group transition-all"
                  >
                    <Handshake className="w-4 h-4 animate-pulse" />
                    <span>{t('cta.becomePartner')}</span>
                  </Button>
                </div>
              </div>
            </ScrollAnimate>
          </div>
        </div>
      </section>

      {/* Modals */}
      <SpecialSituationsModal isOpen={isSpecialOpen} onClose={() => setIsSpecialOpen(false)} />
      <InvestorModal isOpen={isInvestorOpen} onClose={() => setIsInvestorOpen(false)} />
    </div>
  );
}
