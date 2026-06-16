'use client';

import { ThemeProvider } from '@/lib/theme-context';
import { LangProvider } from '@/lib/lang-context';
import Navigation from '@/components/navigation';
import HeroSection from '@/components/sections/hero';
import MissionSection from '@/components/sections/mission';
import WhoSection from '@/components/sections/who';
import ValuesSection from '@/components/sections/values';
import DirectionsSection from '@/components/sections/directions';
import TeamSection from '@/components/sections/team';
import RisksSection from '@/components/sections/risks';
import ContactSection from '@/components/sections/contact';
import CtaButtonsSection from '@/components/sections/cta-buttons';
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
          <ValuesSection />
          <RisksSection />
          <TeamSection />
          <CtaButtonsSection />
          <ContactSection />
          <Footer />
        </main>
      </LangProvider>
    </ThemeProvider>
  );
}
