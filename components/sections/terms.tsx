'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import ScrollAnimate from '@/components/scroll-animate';
import { useLang } from '@/lib/lang-context';

interface AccordionSection {
  title: string;
  paragraphs: string[];
}

interface AccordionData {
  intro?: string;
  sections?: AccordionSection[];
  list?: string[];
  fields?: { label: string; text: string }[];
  text?: string;
  outro?: string;
}

function renderAccordionContent(content: AccordionData, index: number) {
  return (
    <div key={index} className="max-w-[860px] mx-auto space-y-4 text-base md:text-[17px] leading-relaxed md:leading-7">
      {content.intro && <p>{content.intro}</p>}

      {content.sections?.map((section, idx) => (
        <div key={idx}>
          <h4 className="font-semibold">{section.title}</h4>
          {section.paragraphs.map((para, pIdx) => (
            <p key={pIdx}>{para}</p>
          ))}
        </div>
      ))}

      {content.list && (
        <ul className="list-disc pl-5 space-y-2">
          {content.list.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      )}

      {content.fields?.map((field, idx) => (
        <p key={idx}>
          <strong>{field.label}</strong> {field.text}
        </p>
      ))}

      {content.text && <p>{content.text}</p>}

      {content.outro && <p>{content.outro}</p>}
    </div>
  );
}

export default function TermsSection() {
  const { t } = useLang();
  const accordionTitles = t('terms.accordionTitles') as string[];
  const accordionContent = t('terms.accordionContent') as AccordionData[];
  const footer = t('terms.footer') as string;
  const footerLabel = t('terms.footerLabel') as string;

  return (
    <section
      id="terms"
      className="relative overflow-hidden py-32 bg-foreground"
    >
      {/* Seamless top transition from previous section */}
      <div className="absolute left-0 right-0 top-0 h-[180px] pointer-events-none z-[1] bg-gradient-to-b from-[#163C34] dark:from-[#0a1f1a] via-[#163C34]/70 dark:via-[#0a1f1a]/70 to-transparent" />
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <ScrollAnimate>
          <h2 className="text-4xl md:text-5xl font-light mb-16 text-center text-background">
            {t('terms.title')}
          </h2>
        </ScrollAnimate>

        <ScrollAnimate delay={100}>
          <Accordion
            type="single"
            collapsible
            className="space-y-4"
          >
            {accordionContent.map((content, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="rounded-3xl overflow-hidden transition-all bg-background/5 border border-background/10"
              >
                <AccordionTrigger
                  className="px-6 py-5 hover:no-underline transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 text-background"
                  aria-label={`Toggle ${accordionTitles[index]}`}
                >
                  <span className="text-lg font-semibold text-left">
                    {accordionTitles[index]}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pt-3 pb-5 px-6 bg-[#F3F1E6] dark:bg-transparent border-t border-[#0F2F2A]/10 dark:border-background/10">
                  <div className="text-[#0F2F2A] dark:text-white/90">
                    {renderAccordionContent(content, index)}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ScrollAnimate>

        <ScrollAnimate delay={200}>
          <div className="mt-12 rounded-3xl p-8 bg-background/5 border border-background/10">
            <p className="font-light leading-relaxed text-center text-background/90">
              <strong className="font-semibold">{footerLabel}</strong> {footer}
            </p>
          </div>
        </ScrollAnimate>
      </div>
    </section>
  );
}
