'use client';

import { ThemeProvider } from '@/lib/theme-context';
import { LangProvider, useLang } from '@/lib/lang-context';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface Section {
  title: string;
  content: string;
}

function TermsContent() {
  const { t } = useLang();

  const pageTitle = t('terms.pageTitle') as string;
  const lastUpdated = t('terms.lastUpdated') as string;
  const intro = t('terms.intro') as string;
  const sections = t('terms.sections') as Section[];

  return (
    <main className="min-h-screen bg-[#FFFFE7] dark:bg-[#163C34] py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <Link href="/">
          <Button
            variant="ghost"
            className="mb-8 -ml-2 text-[#163C34] dark:text-[#FFFFE7] hover:bg-[#163C34]/10 dark:hover:bg-[#FFFFE7]/10"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            BM Capital Fund
          </Button>
        </Link>

        <div className="bg-white dark:bg-[#0F2F2A] rounded-3xl p-8 md:p-12 shadow-lg">
          <h1 className="text-4xl md:text-5xl font-light mb-4 text-[#163C34] dark:text-[#FFFFE7]">
            {pageTitle}
          </h1>

          <p className="text-sm text-[#163C34]/60 dark:text-[#FFFFE7]/60 mb-8">
            {lastUpdated}
          </p>

          <p className="text-base md:text-lg leading-relaxed mb-8 text-[#163C34] dark:text-[#FFFFE7]">
            {intro}
          </p>

          <div className="space-y-8">
            {Array.isArray(sections) && sections.map((section, index) => (
              <div key={index}>
                <h2 className="text-xl md:text-2xl font-semibold mb-3 text-[#163C34] dark:text-[#FFFFE7]">
                  {section.title}
                </h2>
                <p className="text-base leading-relaxed text-[#163C34]/80 dark:text-[#FFFFE7]/80">
                  {section.content}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-[#163C34]/10 dark:border-[#FFFFE7]/10">
            <Link href="/#contact">
              <Button className="bg-[#163C34] text-[#FFFFE7] hover:bg-[#145544] dark:bg-[#FFFFE7] dark:text-[#163C34] dark:hover:bg-[#F3F2DE]">
                {t('nav.contact')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function TermsPage() {
  return (
    <ThemeProvider>
      <LangProvider>
        <TermsContent />
      </LangProvider>
    </ThemeProvider>
  );
}
