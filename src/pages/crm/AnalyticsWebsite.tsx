import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import AnalyticsEnhanced from './AnalyticsEnhanced';
import UserPathAnalytics from '@/components/crm/UserPathAnalytics';

export default function AnalyticsWebsite() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    supabase.auth.getSession().then(({ data }) => {
      if (cancelled) return;
      if (!data.session?.user) {
        navigate('/crm', { replace: true });
        return;
      }
      setReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, [navigate]);

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-current border-r-transparent" />
      </div>
    );
  }

  return (
    <>
      <AnalyticsEnhanced />
      <UserPathAnalytics />
    </>
  );
}
