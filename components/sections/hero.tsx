'use client';

import ScrollAnimate from '@/components/scroll-animate';
import { useLang } from '@/lib/lang-context';

export default function HeroSection() {
  const { t } = useLang();

  const facts = [
    { label: t('hero.facts.minInvestment'), value: t('hero.facts.minInvestmentValue') },
    { label: t('hero.facts.managementFee'), value: t('hero.facts.managementFeeValue') },
    { label: t('hero.facts.performanceFee'), value: t('hero.facts.performanceFeeValue') },
    { label: t('hero.facts.hurdleRate'), value: t('hero.facts.hurdleRateValue') },
    { label: t('hero.facts.horizon'), value: t('hero.facts.horizonValue') },
  ];

  return (
    <section
      id="hero"
      className="relative isolate min-h-[calc(100vh-80px)] md:min-h-screen flex md:items-center pt-24 md:pt-20 overflow-hidden"
      style={{ backgroundColor: '#163C34' }}
    >
      {/* Background Image - High Priority Loading */}
      <img
        src="/assets/hero-v3.webp"
        alt=""
        fetchPriority="high"
        loading="eager"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover object-center -z-10"
      />

      {/* Light Theme Overlays */}
      <div className="absolute inset-0 z-[1] bg-[#FFFFE7]/70 dark:hidden pointer-events-none" />
      <div className="absolute inset-0 z-[2] bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(22,60,52,0.25)_65%,rgba(22,60,52,0.50)_100%)] dark:hidden pointer-events-none" />
      <div className="absolute inset-0 z-[3] bg-gradient-to-b from-[rgba(22,60,52,0.55)] via-transparent to-[#FFFFE7]/55 dark:hidden pointer-events-none" />

      {/* Dark Theme Overlays */}
      <div className="absolute inset-0 z-[1] hidden dark:block bg-[#163C34]/72 pointer-events-none" />
      <div className="absolute inset-0 z-[2] hidden dark:block bg-[radial-gradient(ellipse_at_center,transparent_15%,rgba(22,60,52,0.70)_60%,rgba(22,60,52,0.95)_100%)] pointer-events-none" />
      <div className="absolute inset-0 z-[3] hidden dark:block bg-gradient-to-b from-[rgba(22,60,52,0.95)] via-[#163C34]/60 to-transparent pointer-events-none" />

      {/* Seamless bottom transition to next section */}
      <div className="absolute left-0 right-0 bottom-0 h-[200px] pointer-events-none z-[4] bg-gradient-to-b from-transparent via-[#163C34]/30 to-[#163C34]" />

      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 py-12 md:py-20">
        <ScrollAnimate>
          <div className="max-w-4xl mx-auto text-center mb-10 md:mb-16">
            <h1 className="text-[clamp(2rem,7vw,4.5rem)] md:text-7xl font-bold md:font-light mb-4 md:mb-6 tracking-tight md:tracking-normal leading-[1.15] text-[#163C34] dark:text-[#FFFFE7] whitespace-nowrap">
              BM CAPITAL FUND
            </h1>

            <p className="text-base md:text-2xl font-semibold md:font-normal leading-relaxed max-w-[28ch] md:max-w-3xl mx-auto text-balance text-[#163C34] dark:text-[#FFFFE7] drop-shadow-[0_2px_8px_rgba(22,60,52,0.4)] uppercase">
              {t('hero.subtitle')}
            </p>
          </div>
        </ScrollAnimate>

        <div className="max-w-5xl mx-auto">
          {/* MOBILE */}
          <div className="md:hidden mb-3">
            <ScrollAnimate delay={0}>
              <div className="w-full min-h-[136px] rounded-[32px] border border-[rgba(255,255,231,0.18)] bg-[#163C34] p-5 text-center flex flex-col items-center justify-center transition-transform duration-300 hover:scale-[1.02]">
                <div className="text-2xl font-semibold mb-2 text-[#FFFFFF]">
                  {facts[0].value}
                </div>
                <div className="text-sm font-light text-[#E8E08C]">
                  {facts[0].label}
                </div>
              </div>
            </ScrollAnimate>
          </div>

          <div className="md:hidden grid grid-cols-2 gap-3">
            {facts.slice(1).map((fact, index) => (
              <ScrollAnimate key={index + 1} delay={100 * (index + 1)}>
                <div className="w-full h-full min-h-[136px] rounded-[32px] border border-[rgba(255,255,231,0.18)] bg-[#163C34] p-5 text-center flex flex-col items-center justify-center transition-transform duration-300 hover:scale-[1.02]">
                  <div className="text-2xl font-semibold mb-2 text-[#FFFFFF]">
                    {fact.value}
                  </div>
                  <div className="text-sm font-light text-[#E8E08C]">
                    {fact.label}
                  </div>
                </div>
              </ScrollAnimate>
            ))}
          </div>

          {/* DESKTOP */}
          <div className="hidden md:grid grid-cols-3 lg:grid-cols-5 gap-4">
            {facts.map((fact, index) => (
              <ScrollAnimate key={index} delay={100 * index}>
                <div className="min-h-[164px] rounded-[32px] border border-[rgba(255,255,231,0.18)] bg-[#163C34] p-6 text-center flex flex-col items-center justify-center transition-transform duration-300 hover:scale-[1.02]">
                  <div className="text-3xl font-semibold mb-2 text-[#FFFFFF]">
                    {fact.value}
                  </div>
                  <div className="text-sm font-light text-[#E8E08C]">
                    {fact.label}
                  </div>
                </div>
              </ScrollAnimate>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}