import { FormEvent, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CheckCircle2, Gift, MessageSquareText, PhoneCall, ShieldCheck } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const SMS_CONSENT_TEXT = 'I agree to receive occasional marketing text messages from BC Pressure Washing about local pricing, nearby service availability and referral discounts. Message frequency varies. Reply STOP to unsubscribe.';
const AI_CONSENT_TEXT = 'I agree to receive automated or AI-generated voice calls from BC Pressure Washing at this phone number, no more than once per month, about storefront cleaning, pricing and availability. I can withdraw consent at any time.';

const StorefrontUpdates = () => {
  const [searchParams] = useSearchParams();
  const referralCode = useMemo(() => searchParams.get('ref')?.trim().toUpperCase() || '', [searchParams]);
  const [businessName, setBusinessName] = useState('');
  const [contactName, setContactName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [smsConsent, setSmsConsent] = useState(false);
  const [aiConsent, setAiConsent] = useState(false);
  const [website, setWebsite] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<{ referral_code?: string; referral_url?: string; confirmation_sms_sent?: boolean } | null>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError('');
    if (!smsConsent) {
      setError('Please approve the text-message consent to join storefront updates.');
      return;
    }

    setSubmitting(true);
    try {
      const { data, error: invokeError } = await supabase.functions.invoke('storefront-sms-quote', {
        body: {
          action: 'marketing_opt_in',
          business_name: businessName.trim(),
          contact_name: contactName.trim() || null,
          contact_email: email.trim() || null,
          phone: phone.trim(),
          city: city.trim() || null,
          sms_consent: smsConsent,
          ai_call_consent: aiConsent,
          referral_code: referralCode || null,
          website,
        },
      });

      if (invokeError) throw invokeError;
      if (!data?.success) throw new Error(data?.error || 'Could not save your preferences.');
      setResult(data);
    } catch (submitError: any) {
      setError(submitError?.message || 'Could not save your preferences. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const copyReferral = async () => {
    if (!result?.referral_url) return;
    await navigator.clipboard.writeText(result.referral_url);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:py-16">
        <div className="mx-auto mb-8 max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-200">
            <ShieldCheck className="h-4 w-4" />
            BC Pressure Washing storefront updates
          </div>
          <h1 className="text-3xl font-black tracking-tight sm:text-5xl">Get local pricing updates and referral discounts</h1>
          <p className="mt-4 text-base text-slate-300 sm:text-lg">
            Join the storefront update list. Text updates and automated voice calls are separate choices — you control both.
          </p>
        </div>

        {result ? (
          <Card className="mx-auto max-w-2xl border-emerald-500/30 bg-white text-slate-950 shadow-2xl">
            <CardHeader className="text-center">
              <CheckCircle2 className="mx-auto mb-2 h-12 w-12 text-emerald-600" />
              <CardTitle className="text-2xl">You're subscribed</CardTitle>
              <CardDescription>
                Your preferences were saved. {result.confirmation_sms_sent ? 'A confirmation text was sent.' : 'Your preferences are active.'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="rounded-xl border bg-slate-50 p-4">
                <div className="mb-1 flex items-center gap-2 font-semibold"><Gift className="h-4 w-4" /> Your referral link</div>
                <p className="break-all text-sm text-slate-600">{result.referral_url}</p>
                <Button type="button" className="mt-3 w-full" onClick={copyReferral}>Copy referral link</Button>
              </div>
              <p className="text-center text-xs text-slate-500">Reply STOP to a marketing text to stop text updates. You can also ask us to stop automated calls at any time.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1.15fr_.85fr]">
            <Card className="border-white/10 bg-white text-slate-950 shadow-2xl">
              <CardHeader>
                <CardTitle>Storefront update preferences</CardTitle>
                <CardDescription>Enter the number you want BC Pressure Washing to use.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="business-name">Business name *</Label>
                      <Input id="business-name" value={businessName} onChange={(e) => setBusinessName(e.target.value)} required placeholder="Example Restaurant" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact-name">Owner / contact name</Label>
                      <Input id="contact-name" value={contactName} onChange={(e) => setContactName(e.target.value)} placeholder="First name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input id="city" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Surrey" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Mobile / business phone *</Label>
                      <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required placeholder="604-555-0123" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="owner@example.com" />
                    </div>
                  </div>

                  <div className="absolute -left-[9999px]" aria-hidden="true">
                    <Label htmlFor="website">Website</Label>
                    <Input id="website" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
                  </div>

                  <label className="flex cursor-pointer gap-3 rounded-xl border-2 border-slate-200 p-4 transition hover:border-red-300">
                    <input className="mt-1 h-5 w-5 shrink-0 accent-red-600" type="checkbox" checked={smsConsent} onChange={(e) => setSmsConsent(e.target.checked)} />
                    <span>
                      <span className="mb-1 flex items-center gap-2 font-semibold"><MessageSquareText className="h-4 w-4 text-red-600" /> Text updates *</span>
                      <span className="block text-sm leading-5 text-slate-600">{SMS_CONSENT_TEXT}</span>
                    </span>
                  </label>

                  <label className="flex cursor-pointer gap-3 rounded-xl border-2 border-slate-200 p-4 transition hover:border-red-300">
                    <input className="mt-1 h-5 w-5 shrink-0 accent-red-600" type="checkbox" checked={aiConsent} onChange={(e) => setAiConsent(e.target.checked)} />
                    <span>
                      <span className="mb-1 flex items-center gap-2 font-semibold"><PhoneCall className="h-4 w-4 text-red-600" /> Monthly AI voice follow-up — optional</span>
                      <span className="block text-sm leading-5 text-slate-600">{AI_CONSENT_TEXT}</span>
                    </span>
                  </label>

                  {referralCode && <div className="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-800">Referral code applied: <strong>{referralCode}</strong></div>}
                  {error && <div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>}
                  <Button type="submit" className="w-full bg-red-600 hover:bg-red-700" disabled={submitting}>{submitting ? 'Saving…' : 'Join storefront updates'}</Button>
                </form>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <Card className="border-white/10 bg-white/5 text-white">
                <CardHeader><CardTitle className="text-lg">What you can receive</CardTitle></CardHeader>
                <CardContent className="space-y-4 text-sm text-slate-300">
                  <div className="flex gap-3"><MessageSquareText className="mt-0.5 h-5 w-5 shrink-0 text-red-400" /><span>Occasional pricing, nearby-service and referral updates by text.</span></div>
                  <div className="flex gap-3"><Gift className="mt-0.5 h-5 w-5 shrink-0 text-red-400" /><span>A personal referral link you can share with another local business.</span></div>
                  <div className="flex gap-3"><PhoneCall className="mt-0.5 h-5 w-5 shrink-0 text-red-400" /><span>Only if you separately check the AI option: automated voice follow-up no more than monthly.</span></div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StorefrontUpdates;
