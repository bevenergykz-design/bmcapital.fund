'use client';

import ScrollAnimate from '@/components/scroll-animate';
import { useLang } from '@/lib/lang-context';
import Image from 'next/image';

export default function MissionSection() {
  const { t } = useLang();

  return (
    <section
      id="mission"
      className="relative overflow-hidden isolate py-16 md:py-20 bg-[#163C34]"
    >
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/bg/mission-who.webp"
          alt=""
          fill
          className="object-cover object-center opacity-[0.12]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-[#163C34] opacity-[0.22] dark:opacity-[0.40]" />

        {/* Seamless top transition from previous section */}
        <div className="absolute left-0 right-0 top-0 h-[160px] pointer-events-none z-[1] bg-gradient-to-b from-[#163C34] via-[#163C34]/60 to-transparent" />

        {/* Seamless bottom transition to next section */}
        <div className="absolute left-0 right-0 bottom-0 h-[160px] pointer-events-none z-[1] bg-gradient-to-b from-transparent via-[#163C34]/60 to-[#163C34]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <ScrollAnimate>
          <h2 className="text-4xl md:text-5xl font-light mb-8 text-center text-[#FFFFE7]">
            {t('mission.title')}
          </h2>
        </ScrollAnimate>

        <ScrollAnimate delay={200}>
          <div className="text-center">
            <p className="text-lg md:text-xl leading-relaxed font-light text-[#FFFFE7]/90">
              {t('mission.text')}
            </p>
          </div>
        </ScrollAnimate>
      </div>
    </section>
  );
}