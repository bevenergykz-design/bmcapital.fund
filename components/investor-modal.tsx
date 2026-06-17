'use client';

import { useState } from 'react';
import { useLang } from '@/lib/lang-context';
import { Button } from '@/components/ui/button';
import { Check, Send, X, CircleCheck as CheckCircle2, CircleAlert as AlertCircle } from 'lucide-react';

interface FormData {
  fullName: string;
  phone: string;
  email: string;
  capital: string;
  consentPersonalData: boolean;
}

interface InvestorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function InvestorModal({ isOpen, onClose }: InvestorModalProps) {
  const { t } = useLang();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    phone: '',
    email: '',
    capital: '',
    consentPersonalData: false,
  });

  if (!isOpen) return null;

  const capitalOptions = t('investorForm.capitalOptions') as string[] || [];

  const update = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isFormValid = () => {
    return formData.fullName && formData.phone && formData.email && formData.capital && formData.consentPersonalData;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid()) return;

    setSubmitting(true);
    setError(false);

    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      const formattedMessage = `Заявка от инвестора.\nТелефон: ${formData.phone}\nНаличие свободного капитала: ${formData.capital}`;

      const res = await fetch(`${supabaseUrl}/functions/v1/contact-form`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseKey}`,
          'apikey': supabaseKey || '',
        },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          message: formattedMessage,
        }),
      });

      if (!res.ok) throw new Error('Failed');
      setSubmitted(true);
    } catch {
      setError(true);
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = "w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative bg-card border border-border w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh] z-10 animate-in fade-in-50 zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border bg-card">
          <div>
            <h2 className="text-xl md:text-2xl font-light text-foreground">
              {t('investorForm.title')}
            </h2>
            <p className="text-xs text-muted-foreground mt-1 font-light">
              {t('investorForm.subtitle')}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          {submitted ? (
            <div className="py-8 text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8 text-green-500" />
              </div>
              <div>
                <h3 className="text-xl font-medium text-foreground mb-2">
                  {t('investorForm.successTitle')}
                </h3>
                <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                  {t('investorForm.successDescription')}
                </p>
              </div>
              <Button onClick={onClose} className="rounded-full px-8 bg-primary text-primary-foreground hover:bg-primary/90">
                {t('applicationForm.back')}
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-card-foreground mb-1.5">
                  {t('investorForm.fullName')} *
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={e => update('fullName', e.target.value)}
                  placeholder={t('investorForm.fullNamePlaceholder')}
                  className={inputClass}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-card-foreground mb-1.5">
                    {t('investorForm.phone')} *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={e => update('phone', e.target.value)}
                    placeholder={t('investorForm.phonePlaceholder')}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-card-foreground mb-1.5">
                    {t('investorForm.email')} *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => update('email', e.target.value)}
                    placeholder={t('investorForm.emailPlaceholder')}
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-card-foreground mb-1.5">
                  {t('investorForm.capital')} *
                </label>
                <select
                  required
                  value={formData.capital}
                  onChange={e => update('capital', e.target.value)}
                  className={inputClass}
                >
                  <option value="">{t('investorForm.capitalPlaceholder')}</option>
                  {capitalOptions.map((opt: string) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              <div className="pt-2">
                <div
                  onClick={() => update('consentPersonalData', !formData.consentPersonalData)}
                  className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                    formData.consentPersonalData
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/20'
                  }`}
                >
                  <div className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    formData.consentPersonalData ? 'border-primary bg-primary' : 'border-muted-foreground/30'
                  }`}>
                    {formData.consentPersonalData && <Check className="w-2.5 h-2.5 text-primary-foreground" />}
                  </div>
                  <span className="text-xs text-card-foreground leading-relaxed">
                    {t('investorForm.confirmPersonalData')}
                  </span>
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-red-900/60 text-white text-xs">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 text-white" />
                  {t('investorForm.errorDescription')}
                </div>
              )}

              <div className="pt-4 border-t border-border flex justify-end gap-3 bg-card">
                <Button
                  type="button"
                  variant="outline"
                  className="rounded-full"
                  onClick={onClose}
                >
                  {t('applicationForm.back')}
                </Button>
                <Button
                  type="submit"
                  className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
                  disabled={!isFormValid() || submitting}
                >
                  {submitting ? t('investorForm.submitting') : t('investorForm.submit')}
                  <Send className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
