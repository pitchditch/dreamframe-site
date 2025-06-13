
import React from 'react';
import { MapPin, Edit, Trash2, Eye, Phone, Mail, Calendar, Star, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { HousePin } from './types';

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
}

const statusConfig = {
  'visited': { color: '#3b82f6', label: 'Visited' },
  'interested': { color: '#10b981', label: 'Interested' },
  'not-interested': { color: '#ef4444', label: 'Not Interested' },
  'completed': { color: '#8b5cf6', label: 'Completed' },
  'revisit-later': { color: '#fbbf24', label: 'Revisit Later' },
  'needs-quote': { color: '#f97316', label: 'Needs Quote' }
};

const leadScoreConfig = {
  'low': { color: '#94a3b8', label: 'Low', stars: 1 },
  'medium': { color: '#fbbf24', label: 'Medium', stars: 2 },
  'high': { color: '#10b981', label: 'High', stars: 3 }
};

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
  onCancelEdit
}) => {
  const filteredPins = pins.filter(pin => 
    statusFilters.has(pin.status) && (
      pin.address.toLowerCase().includes(searchAddress.toLowerCase()) ||
      pin.notes.toLowerCase().includes(searchAddress.toLowerCase()) ||
      (pin.customerName && pin.customerName.toLowerCase().includes(searchAddress.toLowerCase()))
    )
  );

  const handlePhoneCall = (phoneNumber: string) => {
    window.open(`tel:${phoneNumber}`, '_self');
  };

  const handleEmail = (email: string) => {
    window.open(`mailto:${email}`, '_self');
  };

  const isFollowUpDue = (followUpDate?: string) => {
    if (!followUpDate) return false;
    const today = new Date();
    const followUp = new Date(followUpDate);
    return followUp <= today;
  };

  if (filteredPins.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 sm:p-8 text-center">
          <MapPin className="w-8 sm:w-12 h-8 sm:h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-sm sm:text-base text-gray-600">
            No houses tracked yet. Click on the map or search for an address to start tracking!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-3 sm:space-y-4">
      {filteredPins.map((pin) => (
        <Card 
          key={pin.id}
          className={`transition-all ${highlightedPinId === pin.id ? 'ring-2 ring-yellow-400 shadow-lg' : ''}`}
        >
          <CardContent className="p-3 sm:p-4">
            {editingPin === pin.id ? (
              <EditPinForm 
                pin={pin} 
                onSave={(updates: Partial<HousePin>) => onSavePin(pin.id, updates)}
                onCancel={onCancelEdit}
              />
            ) : (
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4 text-bc-red flex-shrink-0" />
                    <h3 
                      className="font-semibold text-gray-900 text-sm sm:text-base truncate cursor-pointer hover:text-blue-600 hover:underline"
                      onClick={() => onSelectPin(pin)}
                    >
                      {pin.address}
                    </h3>
                    <Badge 
                      style={{ 
                        backgroundColor: statusConfig[pin.status].color, 
                        color: 'white' 
                      }}
                      className="text-xs"
                    >
                      {statusConfig[pin.status].label}
                    </Badge>
                    {pin.routeId && (
                      <Badge variant="outline" className="text-xs">
                        Route #{pin.routeOrder}
                      </Badge>
                    )}
                    {pin.followUpDate && isFollowUpDue(pin.followUpDate) && (
                      <Badge className="bg-red-500 text-white text-xs flex items-center gap-1">
                        <Bell className="w-3 h-3" />
                        Follow-up Due
                      </Badge>
                    )}
                    {pin.leadScore && (
                      <Badge 
                        style={{ 
                          backgroundColor: leadScoreConfig[pin.leadScore].color, 
                          color: 'white' 
                        }}
                        className="text-xs flex items-center gap-1"
                      >
                        <Star className="w-3 h-3" />
                        {leadScoreConfig[pin.leadScore].label}
                      </Badge>
                    )}
                  </div>
                  
                  {pin.customerName && (
                    <p className="text-sm text-gray-700 mb-1">
                      <strong>Customer:</strong> {pin.customerName}
                    </p>
                  )}
                  
                  {pin.phoneNumber && (
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm text-gray-700">
                        <strong>Phone:</strong> {pin.phoneNumber}
                      </p>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handlePhoneCall(pin.phoneNumber!)}
                        className="h-6 w-6 p-0 text-green-600 hover:text-green-700"
                        title="Call"
                      >
                        <Phone className="w-3 h-3" />
                      </Button>
                    </div>
                  )}
                  
                  {pin.email && (
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm text-gray-700">
                        <strong>Email:</strong> {pin.email}
                      </p>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleEmail(pin.email!)}
                        className="h-6 w-6 p-0 text-blue-600 hover:text-blue-700"
                        title="Send Email"
                      >
                        <Mail className="w-3 h-3" />
                      </Button>
                    </div>
                  )}
                  
                  {pin.followUpDate && (
                    <p className="text-sm text-gray-700 mb-1 flex items-center gap-2">
                      <Calendar className="w-3 h-3" />
                      <strong>Follow-up:</strong> {new Date(pin.followUpDate).toLocaleDateString()}
                      {pin.followUpNote && <span className="text-gray-500">- {pin.followUpNote}</span>}
                    </p>
                  )}
                  
                  {pin.notes && (
                    <p className="text-sm text-gray-600 mb-2">{pin.notes}</p>
                  )}
                  
                  {pin.contactInfo && (
                    <p className="text-sm text-gray-500 mb-1">Contact: {pin.contactInfo}</p>
                  )}
                  
                  {(pin.beforePhoto || pin.afterPhoto) && (
                    <div className="flex gap-2 mb-2">
                      {pin.beforePhoto && (
                        <div className="flex flex-col">
                          <span className="text-xs text-gray-500 mb-1">Before</span>
                          <img 
                            src={pin.beforePhoto} 
                            alt="Before" 
                            className="w-16 h-16 object-cover rounded border cursor-pointer hover:scale-110 transition-transform"
                            onClick={() => window.open(pin.beforePhoto, '_blank')}
                          />
                        </div>
                      )}
                      {pin.afterPhoto && (
                        <div className="flex flex-col">
                          <span className="text-xs text-gray-500 mb-1">After</span>
                          <img 
                            src={pin.afterPhoto} 
                            alt="After" 
                            className="w-16 h-16 object-cover rounded border cursor-pointer hover:scale-110 transition-transform"
                            onClick={() => window.open(pin.afterPhoto, '_blank')}
                          />
                        </div>
                      )}
                    </div>
                  )}
                  
                  <div className="flex flex-wrap gap-2 text-xs text-gray-400">
                    <span>Added: {pin.dateAdded}</span>
                    <span>•</span>
                    <span>Coordinates: {pin.lat.toFixed(6)}, {pin.lng.toFixed(6)}</span>
                    {pin.routeTimestamp && (
                      <>
                        <span>•</span>
                        <span>Route: {new Date(pin.routeTimestamp).toLocaleString()}</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <Button size="sm" variant="outline" onClick={() => onOpenStreetView(pin)} title="View in Street View">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => onEditPin(pin.id)} title="Edit">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => onDeletePin(pin.id)} title="Delete">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PinList;
