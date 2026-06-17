'use client';

import { ThemeProvider } from '@/lib/theme-context';
import { LangProvider } from '@/lib/lang-context';
import Navigation from '@/components/navigation';
import HeroSection from '@/components/sections/hero';
import MissionSection from '@/components/sections/mission';
import WhoSection from '@/components/sections/who';
import DirectionsSection from '@/components/sections/directions';
import TeamSection from '@/components/sections/team';
import Footer from '@/components/footer';

export default function Home() {
  return (
    <ThemeProvider>
      <LangProvider>
        <main className="min-h-screen" style={{ backgroundColor: 'var(--bm-bg)' }}>
          <Navigation />
          <HeroSection />
          <MissionSection />
          <WhoSection />
          <DirectionsSection />
          <TeamSection />
          <Footer />
        </main>
      </LangProvider>
    </ThemeProvider>
  );
}
