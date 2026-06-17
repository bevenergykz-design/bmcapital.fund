'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useLang } from '@/lib/lang-context';
import LangSwitcher from './lang-switcher';

export default function Navigation() {
  const { t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const navItems = [
    { id: 'mission', label: t('nav.mission') },
    { id: 'who', label: t('nav.who') },
    { id: 'architecture', label: t('nav.architecture') },
    { id: 'roles', label: t('nav.roles') },
    { id: 'team', label: t('nav.team') },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [drawerOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && drawerOpen) {
        setDrawerOpen(false);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [drawerOpen]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth',
      });
      setDrawerOpen(false);
    }
  };

  return (
    <>
      <nav
        className={`sticky top-0 z-50 bg-background md:bg-background/70 md:backdrop-blur-xl border-b border-border transition-all duration-300 ${
          scrolled ? 'shadow-sm' : ''
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 pt-[calc(1rem+env(safe-area-inset-top))]">
          <div className="flex items-center justify-between">
            <button
              onClick={() => scrollToSection('hero')}
              className="flex items-center gap-3 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-foreground rounded-lg text-foreground"
              aria-label="Go to homepage"
            >
              <img
                src="/assets/Vector-2.png"
                alt="BM Capital Fund"
                className="h-10 sm:h-11 w-auto shrink-0 block object-contain"
              />
              <span className="text-xl sm:text-2xl font-semibold leading-none">BM Capital Fund</span>
            </button>

            <div className="flex items-center gap-3">
              <div className="hidden md:block">
                <LangSwitcher />
              </div>
              <button
                onClick={() => setDrawerOpen(true)}
                className="h-10 w-10 rounded-full flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-foreground transition-colors hover:bg-card text-foreground"
                aria-label="Open navigation menu"
                aria-expanded={drawerOpen}
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {drawerOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm transition-opacity"
          onClick={() => setDrawerOpen(false)}
          aria-hidden="true"
        />
      )}

      <div
        className={`fixed top-0 right-0 bottom-0 z-[101] w-[320px] sm:w-[380px] bg-background/95 backdrop-blur-xl border-l border-border transition-transform duration-300 ease-in-out ${
          drawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between p-6 border-b border-border">
            <span className="text-lg font-semibold text-foreground">
              {t('nav.menu') || 'Menu'}
            </span>
            <button
              onClick={() => setDrawerOpen(false)}
              className="h-10 w-10 rounded-full flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-foreground transition-colors hover:bg-card text-foreground"
              aria-label="Close navigation menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 border-b border-border md:hidden">
            <LangSwitcher />
          </div>

          <nav className="flex-1 overflow-y-auto p-6">
            <ul className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className="w-full px-5 py-4 text-left rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-foreground focus-visible:ring-2 text-foreground hover:bg-card"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
