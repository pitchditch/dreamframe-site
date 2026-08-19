import { useState } from 'react';
import Quotes from '@/pages/crm/Quotes';
import { SalesRecordCreator } from '@/components/crm/SalesRecordCreator';

type WorkspaceTab = 'quotes' | 'followups' | 'finance' | 'plans';

const SalesWorkspace = ({ initialTab = 'quotes' as WorkspaceTab }) => {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="relative">
      <Quotes key={refreshKey} initialTab={initialTab} />
      <div className="fixed bottom-4 right-4 z-[70] flex flex-wrap justify-end gap-2 rounded-2xl border border-slate-800 bg-slate-950/95 p-2 shadow-2xl backdrop-blur">
        <SalesRecordCreator
          kind="quote"
          onCreated={() => setRefreshKey((value) => value + 1)}
        />
        <SalesRecordCreator
          kind="plan"
          triggerVariant="outline"
          triggerClassName="border-slate-700 bg-slate-900 text-white hover:bg-slate-800 hover:text-white"
          onCreated={() => setRefreshKey((value) => value + 1)}
        />
      </div>
    </div>
  );
};

export default SalesWorkspace;
