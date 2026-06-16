'use client';

import { useLang } from '@/lib/lang-context';
import { translations } from '@/lib/translations';
import ScrollAnimate from '@/components/scroll-animate';
import { Phone } from 'lucide-react';

export default function TeamSection() {
  const { lang } = useLang();
  const t = translations[lang].team;

  return (
    <section id="team" className="relative py-12 md:py-16 overflow-hidden">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/bg/view-downtown-shanghai-china.webp"
          alt=""
          className="w-full h-full object-cover object-[center_40%] opacity-[0.08]"
        />
        {/* Strong dark green overlay for subtle, integrated premium atmosphere */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1f1a] via-[#0d2820]/98 to-[#0a1f1a]" />
        {/* Additional subtle texture layer */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,31,26,0.4)_100%)]" />

        {/* Seamless top transition from previous section */}
        <div className="absolute left-0 right-0 top-0 h-[180px] pointer-events-none z-[1] bg-gradient-to-b from-[#0a1f1a] via-[#0a1f1a]/70 to-transparent" />

        {/* Seamless bottom transition to next section */}
        <div className="absolute left-0 right-0 bottom-0 h-[180px] pointer-events-none z-[1] bg-gradient-to-b from-transparent via-[#0a1f1a]/70 to-[#0a1f1a]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <ScrollAnimate>
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-4xl md:text-5xl font-light mb-4 text-foreground">
              {t.title}
            </h2>
            <p className="text-muted-foreground text-lg font-light max-w-3xl mx-auto">
              {t.subtitle}
            </p>
          </div>
        </ScrollAnimate>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
          {t.members.map((member: any, index) => (
            <ScrollAnimate
              key={member.role}
            >
              <div className="bg-card/98 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300 border border-border/50">
                <div className="aspect-[1/1] md:aspect-[3/4] bg-muted relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center bg-[#0d2820]">
                    <span className="text-5xl font-light text-primary/60 select-none">
                      {member.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
                    </span>
                  </div>
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-full h-full object-cover object-top relative z-10"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                  />
                </div>

                <div className="p-4 md:p-6">
                  <div className="mb-4">
                    <div className="text-sm font-semibold text-primary mb-2">
                      {member.role}
                    </div>
                    <h3 className="text-xl font-bold text-card-foreground mb-1">
                      {member.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {member.title}
                    </p>
                  </div>

                  <div className="space-y-3 text-sm text-card-foreground/80 mb-4">
                    {member.description.map((paragraph: string, idx: number) => (
                      <p key={idx}>{paragraph}</p>
                    ))}
                  </div>

                  {member.education && (
                    <div className="mb-4 text-sm">
                      <p className="font-semibold text-card-foreground">
                        {member.education.school}
                      </p>
                      <p className="text-muted-foreground">
                        {member.education.degree}
                      </p>
                    </div>
                  )}

                  <div className="pt-4 border-t border-border">
                    <p className="font-semibold text-card-foreground text-sm mb-2">
                      {member.responsibility}
                    </p>
                  </div>

                  <div className="pt-4 space-y-2">
                    <div className="flex items-center gap-2 text-primary">
                      <Phone className="w-4 h-4 flex-shrink-0" />
                      <a
                        href={`tel:${member.phone.replace(/[\s()]/g, '')}`}
                        className="text-sm hover:underline"
                      >
                        {member.phone}
                      </a>
                    </div>
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
