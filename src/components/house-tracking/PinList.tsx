
import React from 'react';
import { HousePin } from './types';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Edit, Trash2, Eye } from 'lucide-react';

type PinListProps = {
  pins: HousePin[];
  highlightedPinId: string | null;
  editingPin: string | null;
  statusFilters: Set<string>;
  searchAddress: string;
  onSelectPin: (pin: HousePin) => void;
  onEditPin: (id: string) => void;
  onDeletePin: (id: string) => void;
  onOpenStreetView: (pin: HousePin) => void;
  EditPinForm: React.ComponentType<{
    pin: HousePin;
    onSave: (updates: Partial<HousePin>) => void;
    onCancel: () => void;
  }> | undefined;
  onSavePin: (id: string, updates: Partial<HousePin>) => void;
  onCancelEdit: () => void;
  onSelectPersonalCalc: (pin: HousePin) => void;
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
  onCancelEdit,
  onSelectPersonalCalc,
}) => {
  const filteredPins = pins.filter(pin => statusFilters.has(pin.status) && (
    searchAddress.trim() === '' ||
    pin.address.toLowerCase().includes(searchAddress.toLowerCase()) ||
    (pin.notes && pin.notes.toLowerCase().includes(searchAddress.toLowerCase()))
  ));
  
  // Defensive: Wrap edit form in a boundary and check if EditPinForm is provided
  return (
    <div>
      {filteredPins.map((pin) => (
        <div key={pin.id}>
          {(editingPin === pin.id && EditPinForm) ? (
            <EditPinForm
              pin={pin}
              onSave={(updates: Partial<HousePin>) => onSavePin(pin.id, updates)}
              onCancel={onCancelEdit}
            />
          ) : (
            <Card
              className={`mb-2 transition-all ${highlightedPinId === pin.id ? 'ring-2 ring-blue-500' : ''}`}
            >
              <CardContent className="p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <h3 className="font-medium">{pin.address}</h3>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => onSelectPersonalCalc(pin)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => onEditPin(pin.id)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => onDeletePin(pin.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      ))}
    </div>
  );
};

export default PinList;

