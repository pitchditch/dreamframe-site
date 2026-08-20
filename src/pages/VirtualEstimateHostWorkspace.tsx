import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import VirtualEstimateHost from '@/pages/VirtualEstimateHost';
import { SalesRecordCreator, type SalesCreatorDefaults } from '@/components/crm/SalesRecordCreator';

const humanizeService = (value: string) =>
  value.replaceAll('_', ' ').replace(/\b\w/g, (letter) => letter.toUpperCase());

const VirtualEstimateHostWorkspace = () => {
  const { sessionId = '' } = useParams();
  const [sessionDefaults, setSessionDefaults] = useState<Partial<SalesCreatorDefaults>>({});
  const [detectedServices, setDetectedServices] = useState<string[]>([]);

  useEffect(() => {
    let cancelled = false;
    if (!sessionId) return undefined;

    void Promise.allSettled([
      supabase.functions.invoke('virtual-estimate-session', { body: { action: 'view', sessionId } }),
      supabase.functions.invoke('transcribe-voice-note', { body: { action: 'state_admin', sessionId } }),
    ]).then(([sessionResult, aiResult]) => {
      if (cancelled) return;

      if (sessionResult.status === 'fulfilled' && !sessionResult.value.error) {
        const session = sessionResult.value.data?.session;
        if (session) {
          setSessionDefaults({
            customerName: session.customerName || '',
            customerEmail: session.customerEmail || '',
            customerPhone: session.customerPhone || '',
            address: session.address || '',
          });
        }
      }

      if (aiResult.status === 'fulfilled' && !aiResult.value.error) {
        const services = aiResult.value.data?.summary?.services;
        if (Array.isArray(services)) setDetectedServices(services.map((service: string) => humanizeService(service)));
      }
    });

    return () => { cancelled = true; };
  }, [sessionId]);

  const defaults = useMemo<SalesCreatorDefaults>(() => ({
    ...sessionDefaults,
    services: detectedServices,
    source: 'virtual_estimate',
    sourceContextId: sessionId,
    internalNotes: sessionId ? `Created from Virtual Estimate ${sessionId}.` : 'Created from Virtual Estimate.',
  }), [detectedServices, sessionDefaults, sessionId]);

  return (
    <div className="relative">
      <VirtualEstimateHost />
      <div className="fixed bottom-4 right-4 z-[70] flex flex-wrap justify-end gap-2 rounded-2xl border border-slate-700 bg-slate-950/95 p-2 shadow-2xl backdrop-blur">
        <SalesRecordCreator kind="quote" defaults={defaults} />
        <SalesRecordCreator
          kind="plan"
          defaults={defaults}
          triggerVariant="outline"
          triggerClassName="border-slate-700 bg-slate-900 text-white hover:bg-slate-800 hover:text-white"
        />
      </div>
    </div>
  );
};

export default VirtualEstimateHostWorkspace;
