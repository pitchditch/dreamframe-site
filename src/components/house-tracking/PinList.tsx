import React, { useMemo } from 'react';
import { MapPin, Edit, Trash2, Eye, Phone, Mail, Calendar, Star, Bell, Store, Route } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { HousePin } from './types';
import StreetViewPreview from './StreetViewPreview';

interface PinListProps {
  pins: HousePin[];
  highlightedPinId: string | null;
  editingPin: string | null;
  statusFilters: Set<string>;
  searchAddress: string;
  onSelectPin: (pin: HousePin) => void;
  onEditPin: (pinId: string) => void;
  onDeletePin: (pinId: string) => void;
  onOpenStreetView: (pin: HousePin) => void;
  EditPinForm: React.ComponentType<any>;
  onSavePin: (pinId: string, updates: Partial<HousePin>) => void;
  onCancelEdit: () => void;
  onSelectPersonalCalc?: (pin: HousePin) => void;
}

const statusConfig: Record<HousePin['status'], { color: string; label: string }> = {
  visited: { color: '#3b82f6', label: 'Visited' },
  interested: { color: '#10b981', label: 'Interested' },
  'not-interested': { color: '#ef4444', label: 'Not Interested' },
  completed: { color: '#8b5cf6', label: 'Completed' },
  'revisit-later': { color: '#fbbf24', label: 'Revisit Later' },
  'needs-quote': { color: '#f97316', label: 'Needs Quote' },
};

const leadScoreConfig = {
  low: { color: '#94a3b8', label: 'Low' },
  medium: { color: '#fbbf24', label: 'Medium' },
  high: { color: '#10b981', label: 'High' },
};

const timestamp = (pin: HousePin) => {
  const value = new Date(pin.updatedAt || pin.routeTimestamp || pin.dateAdded || 0).getTime();
  return Number.isFinite(value) ? value : 0;
};

const searchableText = (pin: HousePin) => [
  pin.address,
  pin.notes,
  pin.customerName,
  pin.businessName,
  pin.phoneNumber,
  pin.email,
  pin.contactInfo,
  pin.campaignName,
  pin.neighborhood,
  pin.streetSegment,
  pin.serviceType,
].filter(Boolean).join(' ').toLowerCase();

const PinList: React.FC<PinListProps> = ({
  pins,
  highlightedPinId,
  editingPin,
  statusFilters,
  searchAddress,
  onSelectPin,
  onEditPin,
  onDeletePin,
  onOpenStreetView,
  EditPinForm,
  onSavePin,
  onCancelEdit,
  onSelectPersonalCalc,
}) => {
  const filteredPins = useMemo(() => {
    const query = searchAddress.trim().toLowerCase();
    return pins
      .filter((pin) => statusFilters.has(pin.status))
      .filter((pin) => !query || searchableText(pin).includes(query))
      .sort((a, b) => timestamp(b) - timestamp(a));
  }, [pins, searchAddress, statusFilters]);

  const isFollowUpDue = (followUpDate?: string) => {
    if (!followUpDate) return false;
    const followUp = new Date(followUpDate).getTime();
    return Number.isFinite(followUp) && followUp <= Date.now();
  };

  const isServiceReminderDue = (pin: HousePin) => {
    if (!pin.serviceReminder || !pin.lastServiceDate) return false;
    const last = new Date(pin.lastServiceDate).getTime();
    if (!Number.isFinite(last)) return false;
    return Date.now() - last >= 365 * 24 * 60 * 60 * 1000;
  };

  if (filteredPins.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <MapPin className="mx-auto mb-4 h-10 w-10 text-muted-foreground" />
          <p className="font-medium">No matching properties</p>
          <p className="mt-1 text-sm text-muted-foreground">Clear the search or status filters, or add a property from the map.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {filteredPins.map((pin) => {
        const status = statusConfig[pin.status];
        return (
          <Card
            key={pin.id}
            className={`overflow-hidden transition-all ${highlightedPinId === pin.id ? 'ring-2 ring-yellow-400 shadow-lg' : ''}`}
          >
            <CardContent className="p-3 sm:p-4">
              {editingPin === pin.id ? (
                <EditPinForm
                  pin={pin}
                  onSave={(updates: Partial<HousePin>) => onSavePin(pin.id, updates)}
                  onCancel={onCancelEdit}
                />
              ) : (
                <div className="grid grid-cols-1 gap-3 md:grid-cols-[240px_minmax(0,1fr)] lg:grid-cols-[280px_minmax(0,1fr)] xl:grid-cols-[280px_minmax(0,1fr)_auto]">
                  <StreetViewPreview pin={pin} onOpen={() => onOpenStreetView(pin)} />

                  <div className="min-w-0">
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      {pin.isStorefront ? <Store className="h-4 w-4 shrink-0 text-orange-600" /> : <MapPin className="h-4 w-4 shrink-0 text-bc-red" />}
                      <button
                        type="button"
                        className="min-w-0 truncate text-left text-sm font-semibold hover:text-blue-600 hover:underline sm:text-base"
                        onClick={() => onSelectPin(pin)}
                      >
                        {pin.businessName || pin.address}
                      </button>
                      <Badge style={{ backgroundColor: status.color, color: 'white' }} className="text-xs">
                        {status.label}
                      </Badge>
                      {pin.isStorefront && <Badge variant="outline" className="text-xs">Storefront</Badge>}
                      {pin.isPreviousClient && <Badge className="bg-blue-500 text-xs text-white">Previous Client</Badge>}
                      {isServiceReminderDue(pin) && (
                        <Badge className="flex items-center gap-1 bg-orange-500 text-xs text-white"><Bell className="h-3 w-3" />Service Due</Badge>
                      )}
                      {pin.followUpDate && isFollowUpDue(pin.followUpDate) && (
                        <Badge className="flex items-center gap-1 bg-red-500 text-xs text-white"><Bell className="h-3 w-3" />Follow-up Due</Badge>
                      )}
                      {pin.leadScore && (
                        <Badge style={{ backgroundColor: leadScoreConfig[pin.leadScore].color, color: 'white' }} className="flex items-center gap-1 text-xs">
                          <Star className="h-3 w-3" />{leadScoreConfig[pin.leadScore].label}
                        </Badge>
                      )}
                    </div>

                    {pin.businessName && <p className="mb-1 text-sm text-muted-foreground">{pin.address}</p>}
                    {pin.customerName && <p className="mb-1 text-sm"><strong>Customer:</strong> {pin.customerName}</p>}

                    <div className="mb-2 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                      {pin.phoneNumber && (
                        <button type="button" onClick={() => window.location.href = `tel:${pin.phoneNumber}`} className="flex items-center gap-1 text-green-700 hover:underline">
                          <Phone className="h-3.5 w-3.5" />{pin.phoneNumber}
                        </button>
                      )}
                      {pin.email && (
                        <button type="button" onClick={() => window.location.href = `mailto:${pin.email}`} className="flex items-center gap-1 text-blue-700 hover:underline">
                          <Mail className="h-3.5 w-3.5" />{pin.email}
                        </button>
                      )}
                    </div>

                    {pin.followUpDate && (
                      <p className="mb-1 flex items-center gap-1 text-sm"><Calendar className="h-3.5 w-3.5" /><strong>Follow-up:</strong> {new Date(pin.followUpDate).toLocaleDateString()} {pin.followUpNote ? `· ${pin.followUpNote}` : ''}</p>
                    )}
                    {pin.notes && <p className="mb-2 text-sm text-muted-foreground">{pin.notes}</p>}

                    <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-muted-foreground sm:grid-cols-3">
                      {pin.squareFootage ? <span><strong>Sqft:</strong> {pin.squareFootage.toLocaleString()}</span> : null}
                      {pin.stories ? <span><strong>Stories:</strong> {pin.stories}</span> : null}
                      {pin.serviceType ? <span><strong>Service:</strong> {pin.serviceType}</span> : null}
                      {pin.jobValue ? <span><strong>Job:</strong> ${pin.jobValue.toLocaleString()}</span> : null}
                      {pin.routeId ? <span className="flex items-center gap-1"><Route className="h-3 w-3" />Route #{pin.routeOrder || '—'}</span> : null}
                      <span><strong>Added:</strong> {new Date(pin.dateAdded).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-start gap-2 md:col-start-2 xl:col-start-auto xl:flex-col xl:items-stretch">
                    <Button size="sm" variant="outline" onClick={() => onOpenStreetView(pin)}><Eye className="mr-1.5 h-4 w-4" />Street View</Button>
                    <Button size="sm" variant="outline" onClick={() => onEditPin(pin.id)}><Edit className="mr-1.5 h-4 w-4" />Edit</Button>
                    <Button size="sm" variant="outline" onClick={() => onDeletePin(pin.id)}><Trash2 className="mr-1.5 h-4 w-4" />Delete</Button>
                    {onSelectPersonalCalc && (
                      <Button size="sm" variant="secondary" className="bg-amber-200 text-amber-900 hover:bg-amber-300" onClick={() => onSelectPersonalCalc(pin)}>
                        💸 Estimate
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default PinList;
