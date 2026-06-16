'use client';

import { CircleCheck as CheckCircle2 } from 'lucide-react';
import ScrollAnimate from '@/components/scroll-animate';
import { useLang } from '@/lib/lang-context';
import Image from 'next/image';

export default function WhoSection() {
  const { t } = useLang();
  const paragraphs = t('who.paragraphs');
  const highlights = t('who.highlights');
  return (
    <section
      id="who"
      className="relative overflow-hidden isolate py-16 bg-background"
    >
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/bg/who-bg.webp"
          alt=""
          fill
          loading="lazy"
          className="object-cover object-[center_bottom] md:object-[right_bottom] opacity-20 pointer-events-none select-none"
        />
      </div>

      <div className="absolute inset-0 z-[1] bg-[#163C34]/70" />

      {/* Seamless top transition from previous section */}
      <div className="absolute left-0 right-0 top-0 h-[160px] pointer-events-none z-[2] bg-gradient-to-b from-[#163C34] via-[#163C34]/70 to-transparent" />

      {/* Seamless bottom transition to next section */}
      <div className="absolute left-0 right-0 bottom-0 h-[160px] pointer-events-none z-[2] bg-gradient-to-b from-transparent via-[#163C34]/70 to-[#163C34]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <ScrollAnimate>
          <h2 className="text-4xl md:text-5xl font-light mb-12 text-center text-foreground">
            {t('who.title')}
          </h2>
        </ScrollAnimate>

        <ScrollAnimate delay={150}>
          <div className="mb-16 max-w-4xl mx-auto">
            {Array.isArray(paragraphs) && paragraphs.map((para: string, index: number) => (
              <p key={index} className="text-lg leading-relaxed mb-6 font-light text-foreground text-center">
                {para}
              </p>
            ))}
          </div>
        </ScrollAnimate>

        <div className="grid md:grid-cols-2 gap-6">
          {Array.isArray(highlights) && highlights.map((item: any, index: number) => (
            <ScrollAnimate key={index} delay={100 * index}>
              <div className="bg-card border border-border rounded-3xl p-8 transition-all hover:scale-105">
                <div className="flex items-start space-x-4">
                  <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-1 text-card-foreground" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-card-foreground">
                      {item.title}
                    </h3>
                    <p className="font-light leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollAnimate>
          ))}
        </div>
      </div>
    </section>
  );
}
