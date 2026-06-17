'use client';

import { useState } from 'react';
import { useLang } from '@/lib/lang-context';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Check, Send, X, CircleCheck as CheckCircle2, CircleAlert as AlertCircle } from 'lucide-react';

const TOTAL_SLIDES = 4;

interface FormData {
  companyName: string;
  country: string;
  jurisdiction: string;
  industry: string;
  role: string;
  situationGroup: string;
  situationDescription: string;
  dealSize: string;
  urgency: string;
  fullName: string;
  phone: string;
  applicantEmail: string;
  dataConfirmed: boolean;
  hasAuthority: boolean;
  consentPersonalData: boolean;
}

interface SpecialSituationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SpecialSituationsModal({ isOpen, onClose }: SpecialSituationsModalProps) {
  const { t } = useLang();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showClassificationModal, setShowClassificationModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    country: '',
    jurisdiction: '',
    industry: '',
    role: '',
    situationGroup: '',
    situationDescription: '',
    dealSize: '',
    urgency: '',
    fullName: '',
    phone: '',
    applicantEmail: '',
    dataConfirmed: false,
    hasAuthority: false,
    consentPersonalData: false,
  });

  if (!isOpen) return null;

  const industries = t('applicationForm.industries') as string[] || [];
  const roles = t('applicationForm.roles') as string[] || [];
  const situationGroups = t('applicationForm.situationGroups') as string[] || [];
  const dealSizes = t('applicationForm.dealSizes') as string[] || [];
  const urgencies = t('applicationForm.urgencies') as string[] || [];

  const update = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const canGoNext = () => {
    switch (currentSlide) {
      case 0: return formData.companyName && formData.country && formData.jurisdiction && formData.industry;
      case 1: return formData.role && formData.situationGroup;
      case 2: return formData.situationDescription && formData.dealSize && formData.urgency && formData.fullName && formData.phone && formData.applicantEmail;
      case 3: return formData.dataConfirmed && formData.hasAuthority && formData.consentPersonalData;
      default: return false;
    }
  };

  const handleSubmit = async () => {
    if (!canGoNext()) return;
    setSubmitting(true);
    setError(false);

    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      const res = await fetch(`${supabaseUrl}/functions/v1/special-situations-form`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseKey}`,
          'apikey': supabaseKey || '',
        },
        body: JSON.stringify({
          company_name: formData.companyName,
          country: formData.country,
          jurisdiction: formData.jurisdiction,
          industry: formData.industry,
          role: formData.role,
          situation_group: formData.situationGroup,
          situation_description: formData.situationDescription,
          deal_size: formData.dealSize,
          urgency: formData.urgency,
          full_name: formData.fullName,
          phone: formData.phone,
          applicant_email: formData.applicantEmail,
          data_confirmed: formData.dataConfirmed,
          has_authority: formData.hasAuthority,
          consent_personal_data: formData.consentPersonalData,
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

  const slideTitles = [
    t('applicationForm.slide1Title'),
    t('applicationForm.slide2Title'),
    t('applicationForm.slide3Title'),
    t('applicationForm.slide4Title'),
  ];

  const inputClass = "w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      {/* Click outside to close (disabled for multi-step to avoid losing inputs, but Close button is active) */}
      <div className="absolute inset-0" onClick={() => {}} />

      <div className="relative bg-card border border-border w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh] z-10 animate-in fade-in-50 zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border bg-card">
          <div>
            <h2 className="text-xl md:text-2xl font-light text-foreground">
              {t('applicationForm.title')}
            </h2>
            <p className="text-xs text-muted-foreground mt-1 font-light">
              {t('applicationForm.subtitle')}
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

        {/* Modal Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
          
          {/* Progress bar */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground">
                {t('applicationForm.step')} {currentSlide + 1} {t('applicationForm.of')} {TOTAL_SLIDES}
              </span>
              <span className="text-xs font-semibold text-foreground">
                {slideTitles[currentSlide]}
              </span>
            </div>
            <div className="h-1 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-500"
                style={{ width: `${((currentSlide + 1) / TOTAL_SLIDES) * 100}%` }}
              />
            </div>
          </div>

          {submitted ? (
            <div className="py-8 text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8 text-green-500" />
              </div>
              <div>
                <h3 className="text-xl font-medium text-foreground mb-2">
                  {t('applicationForm.successTitle')}
                </h3>
                <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                  {t('applicationForm.successDescription')}
                </p>
              </div>
              <Button onClick={onClose} className="rounded-full px-8 bg-primary text-primary-foreground hover:bg-primary/90">
                {t('applicationForm.back')}
              </Button>
            </div>
          ) : (
            <div>
              {/* Slide 1 — Company */}
              {currentSlide === 0 && (
                <div className="space-y-4">
                  {/* Classification notice */}
                  <div className="flex items-start gap-3 bg-primary/5 border border-primary/20 rounded-xl p-4">
                    <span className="text-primary mt-0.5 flex-shrink-0">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                    </span>
                    <p className="text-[11px] text-card-foreground/80 leading-relaxed">
                      {t('applicationForm.classificationNote')}{' '}
                      <button
                        type="button"
                        onClick={() => setShowClassificationModal(true)}
                        className="underline text-primary hover:opacity-80 transition-opacity inline font-medium"
                      >
                        {t('applicationForm.classificationLinkText')}
                      </button>
                    </p>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-card-foreground mb-1.5">
                      {t('applicationForm.companyName')} *
                    </label>
                    <input
                      type="text"
                      value={formData.companyName}
                      onChange={e => update('companyName', e.target.value)}
                      placeholder={t('applicationForm.companyNamePlaceholder')}
                      className={inputClass}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-card-foreground mb-1.5">
                        {t('applicationForm.country')} *
                      </label>
                      <input
                        type="text"
                        value={formData.country}
                        onChange={e => update('country', e.target.value)}
                        placeholder={t('applicationForm.countryPlaceholder')}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-card-foreground mb-1.5">
                        {t('applicationForm.jurisdiction')} *
                      </label>
                      <input
                        type="text"
                        value={formData.jurisdiction}
                        onChange={e => update('jurisdiction', e.target.value)}
                        placeholder={t('applicationForm.jurisdictionPlaceholder')}
                        className={inputClass}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-card-foreground mb-1.5">
                      {t('applicationForm.industry')} *
                    </label>
                    <select
                      value={formData.industry}
                      onChange={e => update('industry', e.target.value)}
                      className={inputClass}
                    >
                      <option value="">{t('applicationForm.industryPlaceholder')}</option>
                      {industries.map((ind: string) => (
                        <option key={ind} value={ind}>{ind}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* Slide 2 — Role & Category */}
              {currentSlide === 1 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-card-foreground mb-2">
                      {t('applicationForm.role')} *
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-[220px] overflow-y-auto pr-1">
                      {roles.map((r: string) => (
                        <div
                          key={r}
                          onClick={() => update('role', r)}
                          className={`flex items-center gap-2.5 p-2.5 rounded-xl border cursor-pointer transition-colors ${
                            formData.role === r
                              ? 'border-primary bg-primary/5'
                              : 'border-border hover:border-primary/20'
                          }`}
                        >
                          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                            formData.role === r ? 'border-primary' : 'border-muted-foreground/30'
                          }`}>
                            {formData.role === r && <div className="w-2 h-2 rounded-full bg-primary" />}
                          </div>
                          <span className="text-xs text-card-foreground leading-tight">{r}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-card-foreground mb-1.5">
                      {t('applicationForm.situationGroup')} *
                    </label>
                    <select
                      value={formData.situationGroup}
                      onChange={e => update('situationGroup', e.target.value)}
                      className={inputClass}
                    >
                      <option value="">{t('applicationForm.situationGroupPlaceholder')}</option>
                      {situationGroups.map((sg: string) => (
                        <option key={sg} value={sg}>{sg}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* Slide 3 — Situation & Contacts */}
              {currentSlide === 2 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-card-foreground mb-1.5">
                      {t('applicationForm.situationDescription')} *
                    </label>
                    <textarea
                      value={formData.situationDescription}
                      onChange={e => update('situationDescription', e.target.value)}
                      placeholder={t('applicationForm.situationDescriptionPlaceholder')}
                      rows={3}
                      className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-card-foreground mb-2">
                      {t('applicationForm.dealSize')} *
                    </label>
                    <div className="grid grid-cols-2 gap-2 max-h-[140px] overflow-y-auto pr-1">
                      {dealSizes.map((ds: string) => (
                        <div
                          key={ds}
                          onClick={() => update('dealSize', ds)}
                          className={`flex items-center gap-2 p-2.5 rounded-xl border cursor-pointer transition-colors text-xs ${
                            formData.dealSize === ds
                              ? 'border-primary bg-primary/5'
                              : 'border-border hover:border-primary/20'
                          }`}
                        >
                          <div className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                            formData.dealSize === ds ? 'border-primary' : 'border-muted-foreground/30'
                          }`}>
                            {formData.dealSize === ds && <div className="w-1.5 h-1.5 rounded-full bg-primary" />}
                          </div>
                          <span className="text-card-foreground leading-none">{ds}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-card-foreground mb-2">
                      {t('applicationForm.urgency')} *
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {urgencies.map((u: string) => (
                        <div
                          key={u}
                          onClick={() => update('urgency', u)}
                          className={`flex items-center gap-2 p-2.5 rounded-xl border cursor-pointer transition-colors text-xs ${
                            formData.urgency === u
                              ? 'border-primary bg-primary/5'
                              : 'border-border hover:border-primary/20'
                          }`}
                        >
                          <div className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                            formData.urgency === u ? 'border-primary' : 'border-muted-foreground/30'
                          }`}>
                            {formData.urgency === u && <div className="w-1.5 h-1.5 rounded-full bg-primary" />}
                          </div>
                          <span className="text-card-foreground leading-none">{u}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-border space-y-3">
                    <p className="text-[10px] text-muted-foreground">{t('applicationForm.contactDetailsSectionNote')}</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div>
                        <input
                          type="text"
                          value={formData.fullName}
                          onChange={e => update('fullName', e.target.value)}
                          placeholder={t('applicationForm.fullName')}
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={e => update('phone', e.target.value)}
                          placeholder={t('applicationForm.phone')}
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <input
                          type="email"
                          value={formData.applicantEmail}
                          onChange={e => update('applicantEmail', e.target.value)}
                          placeholder={t('applicationForm.applicantEmail')}
                          className={inputClass}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Slide 4 — Declarations */}
              {currentSlide === 3 && (
                <div className="space-y-4">
                  <p className="text-xs text-muted-foreground">
                    {t('applicationForm.slide4Title')}
                  </p>
                  <div className="space-y-2.5">
                    {[
                      { key: 'dataConfirmed' as const, label: t('applicationForm.confirmData') },
                      { key: 'hasAuthority' as const, label: t('applicationForm.confirmAuthority') },
                      { key: 'consentPersonalData' as const, label: t('applicationForm.confirmPersonalData') },
                    ].map(({ key, label }) => (
                      <div
                        key={key}
                        onClick={() => update(key, !formData[key])}
                        className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                          formData[key]
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/20'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          formData[key] ? 'border-primary bg-primary' : 'border-muted-foreground/30'
                        }`}>
                          {formData[key] && <Check className="w-2.5 h-2.5 text-primary-foreground" />}
                        </div>
                        <span className="text-xs text-card-foreground leading-relaxed">{label}</span>
                      </div>
                    ))}
                  </div>

                  {error && (
                    <div className="flex items-center gap-2 p-3 rounded-xl bg-red-900/60 text-white text-xs">
                      <AlertCircle className="w-4 h-4 flex-shrink-0 text-white" />
                      {t('applicationForm.errorDescription')}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Navigation (only if not submitted) */}
        {!submitted && (
          <div className="p-6 border-t border-border flex justify-between bg-card">
            <Button
              variant="outline"
              className="rounded-full"
              onClick={() => setCurrentSlide(prev => prev - 1)}
              disabled={currentSlide === 0}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t('applicationForm.back')}
            </Button>

            {currentSlide < TOTAL_SLIDES - 1 ? (
              <Button
                className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={() => setCurrentSlide(prev => prev + 1)}
                disabled={!canGoNext()}
              >
                {t('applicationForm.next')}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={handleSubmit}
                disabled={!canGoNext() || submitting}
              >
                {submitting ? t('applicationForm.submitting') : t('applicationForm.submit')}
                <Send className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Nested Classification Modal */}
      {showClassificationModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-card border border-border w-full max-w-3xl max-h-[80vh] flex flex-col rounded-3xl overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between p-5 border-b border-border bg-card">
              <h3 className="text-lg md:text-xl font-semibold text-card-foreground">
                {t('directions.classificationTitle')}
              </h3>
              <button
                type="button"
                onClick={() => setShowClassificationModal(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 md:p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(t('directions.classificationCategories') as { title: string; items: string[] }[] || []).map((cat, idx) => (
                  <div
                    key={idx}
                    className="bg-background border border-border/60 rounded-xl p-4 hover:border-primary/20 transition-colors"
                  >
                    <h4 className="font-semibold text-card-foreground mb-2.5 text-sm leading-tight">
                      {cat.title}
                    </h4>
                    <ul className="space-y-1.5">
                      {cat.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-[11px] text-muted-foreground font-light leading-relaxed">
                          <span className="w-1 h-1 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 border-t border-border flex justify-end bg-card">
              <Button
                type="button"
                className="rounded-full px-6 py-1.5 bg-primary text-primary-foreground hover:bg-primary/90 text-sm"
                onClick={() => setShowClassificationModal(false)}
              >
                {t('applicationForm.back')}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
