'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import ScrollAnimate from '@/components/scroll-animate';
import { useLang } from '@/lib/lang-context';

export default function ContactSection() {
  const { t } = useLang();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [showPrivacyError, setShowPrivacyError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!privacyConsent) {
      setShowPrivacyError(true);
      return;
    }

    setShowPrivacyError(false);
    setIsSubmitting(true);

    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/contact-form`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      toast({
        title: t('contact.form.successTitle'),
        description: t('contact.form.successDescription'),
      });
      setFormData({ name: '', email: '', message: '' });
      setPrivacyConsent(false);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: t('contact.form.errorTitle'),
        description: t('contact.form.errorDescription'),
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden py-32 bg-background"
    >
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/bg/view-downtown-shanghai-china.webp"
          alt=""
          className="w-full h-full object-cover object-center"
        />
        {/* Dark green overlay for readability and brand consistency */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1f1a]/95 via-[#0d2820]/92 to-[#0a1f1a]/95" />

        {/* Seamless top transition from previous section */}
        <div className="absolute left-0 right-0 top-0 h-[180px] pointer-events-none z-[1] bg-gradient-to-b from-[#0a1f1a] via-[#0a1f1a]/70 to-transparent" />

        {/* Seamless bottom transition to next section */}
        <div className="absolute left-0 right-0 bottom-0 h-[180px] pointer-events-none z-[1] bg-gradient-to-b from-transparent via-[#163C34]/70 to-[#163C34]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <ScrollAnimate>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light mb-4 text-foreground">
              {t('contact.formTitle')}
            </h2>
            <p className="text-base md:text-lg font-light text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {t('contact.formSubtitle')}
            </p>
          </div>
        </ScrollAnimate>

        <div className="max-w-2xl mx-auto">
          <ScrollAnimate delay={100}>
            <form
              onSubmit={handleSubmit}
              className="bg-card/95 backdrop-blur-sm border border-border rounded-3xl p-8 space-y-6 shadow-2xl"
            >
              <div className="space-y-2">
                <Label htmlFor="name" className="text-card-foreground">
                  {t('contact.form.name')}
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 border-border bg-background text-foreground"
                  aria-label="Your name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-card-foreground">
                  {t('contact.form.email')}
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 border-border bg-background text-foreground"
                  aria-label="Your email address"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-card-foreground">
                  {t('contact.form.message')}
                </Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={5}
                  className="rounded-3xl resize-none focus:outline-none focus:ring-2 focus:ring-offset-2 border-border bg-background text-foreground"
                  aria-label="Your message"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="privacy-consent"
                    checked={privacyConsent}
                    onCheckedChange={(checked) => {
                      setPrivacyConsent(checked as boolean);
                      if (checked) setShowPrivacyError(false);
                    }}
                    className="mt-1 border-border data-[state=checked]:bg-foreground data-[state=checked]:border-foreground"
                    aria-label="Privacy policy consent"
                  />
                  <label
                    htmlFor="privacy-consent"
                    className="text-sm font-light leading-relaxed text-card-foreground cursor-pointer"
                  >
                    {t('privacy.checkbox.label').split(t('privacy.checkbox.linkText'))[0]}
                    <Link
                      href="/privacy"
                      className="underline hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-offset-1 rounded"
                    >
                      {t('privacy.checkbox.linkText')}
                    </Link>
                    {t('privacy.checkbox.label').split(t('privacy.checkbox.linkText'))[1]}
                  </label>
                </div>
                {showPrivacyError && (
                  <p className="text-sm text-red-600 dark:text-red-400 ml-8">
                    {t('privacy.checkbox.error')}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting || !privacyConsent}
                className="w-full rounded-full py-6 transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-foreground text-background hover:bg-foreground/90 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                aria-label="Submit contact form"
              >
                {isSubmitting ? t('contact.form.submitting') : t('contact.form.submit')}
              </Button>
            </form>
          </ScrollAnimate>
        </div>
      </div>
    </section>
  );
}
