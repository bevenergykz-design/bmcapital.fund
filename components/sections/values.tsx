'use client';

import { ShieldCheck, TrendingUp, FileText, Search, Users, Award, Shield } from 'lucide-react';
import ScrollAnimate from '@/components/scroll-animate';
import { useTheme } from '@/lib/theme-context';
import { useLang } from '@/lib/lang-context';

const iconMap = [ShieldCheck, TrendingUp, FileText, Search, Users, Award];

export default function ValuesSection() {
  const { theme } = useTheme();
  const { t } = useLang();
  const isDark = theme === 'dark';
  const filterData = t('filter.items');

  return (
    <section
      id="filter"
      data-testid="values-root"
      className="relative overflow-hidden py-16 lg:py-20"
      style={{
        backgroundColor: isDark ? '#163C34' : '#FFFFE7',
      }}
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(/assets/values-bg.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            opacity: 0.15,
          }}
        />
      </div>

      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: isDark
            ? 'radial-gradient(ellipse at center, rgba(22,60,52,0.3) 0%, rgba(22,60,52,0.7) 70%, rgba(22,60,52,0.85) 100%)'
            : 'radial-gradient(ellipse at center, rgba(255,255,231,0.2) 0%, rgba(255,255,231,0.6) 70%, rgba(255,255,231,0.75) 100%)',
        }}
      />

      {/* Seamless top transition */}
      <div
        className="absolute top-0 left-0 right-0 h-[160px] z-[11] pointer-events-none"
        style={{
          background: isDark
            ? 'linear-gradient(to bottom, #163C34 0%, rgba(22,60,52,0.4) 55%, transparent 100%)'
            : 'linear-gradient(to bottom, #FFFFE7 0%, rgba(255,255,231,0.4) 55%, transparent 100%)',
        }}
      />

      <div
        className="absolute bottom-0 left-0 right-0 h-[140px] md:h-[220px] z-[11] pointer-events-none"
        style={{
          background: isDark
            ? 'linear-gradient(to bottom, transparent 0%, rgba(22,60,52,0.6) 45%, #163C34 100%)'
            : 'linear-gradient(to bottom, transparent 0%, rgba(255,255,231,0.6) 45%, #FFFFE7 100%)',
        }}
      />

      <div className="relative z-20 max-w-6xl mx-auto px-6">
        <ScrollAnimate>
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-light mb-6"
              style={{ color: isDark ? '#FFFFE7' : '#163C34' }}
            >
              {t('filter.title')}
            </h2>
          </div>
        </ScrollAnimate>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {Array.isArray(filterData) && filterData.map((item: any, index: number) => {
              const Icon = iconMap[index] || Shield;
              return (
                <ScrollAnimate key={index} delay={30 * index}>
                  <div
                    className="relative overflow-hidden rounded-[28px] border p-8 backdrop-blur-md transition-all duration-300 hover:shadow-lg hover:border-primary/30 group"
                    style={{
                      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(255, 255, 231, 0.7)',
                      borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(22, 60, 52, 0.1)',
                    }}
                  >
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
                      <Icon
                        className="w-5 h-5"
                        strokeWidth={1.5}
                        style={{ color: isDark ? '#FFFFE7' : '#163C34' }}
                      />
                    </div>
                    <h3
                      className="text-lg font-semibold mb-3 text-card-foreground"
                    >
                      {item.title}
                    </h3>
                    <p
                      className="text-sm leading-relaxed text-muted-foreground font-light"
                    >
                      {item.description}
                    </p>
                  </div>
                </ScrollAnimate>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
