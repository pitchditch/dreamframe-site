
import React, { useState } from 'react';
import { Facebook, ExternalLink, User, MapPin, Phone, Mail, Calendar, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { HousePin } from './types';

interface FacebookLeadsPanelProps {
  pins: HousePin[];
  onUpdatePin: (pinId: string, updates: Partial<HousePin>) => void;
  onCreatePin: (pin: Omit<HousePin, 'id'>) => void;
}

const FacebookLeadsPanel: React.FC<FacebookLeadsPanelProps> = ({
  pins,
  onUpdatePin,
  onCreatePin
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newLead, setNewLead] = useState({
    customerName: '',
    phoneNumber: '',
    email: '',
    address: '',
    facebookProfileUrl: '',
    facebookLeadId: '',
    facebookCampaignName: '',
    facebookAdSetName: '',
    notes: '',
    leadScore: 'medium' as 'low' | 'medium' | 'high'
  });

  // Filter pins that are Facebook leads
  const facebookLeads = pins.filter(pin => pin.leadSource === 'facebook');

  const handleAddLead = () => {
    if (!newLead.customerName || !newLead.address) return;

    const pin: Omit<HousePin, 'id'> = {
      lat: 49.0504, // Default Surrey coordinates
      lng: -122.8056,
      address: newLead.address,
      status: 'interested',
      notes: newLead.notes,
      dateAdded: new Date().toISOString().split('T')[0],
      customerName: newLead.customerName,
      phoneNumber: newLead.phoneNumber || undefined,
      email: newLead.email || undefined,
      leadSource: 'facebook',
      facebookProfileUrl: newLead.facebookProfileUrl || undefined,
      facebookLeadId: newLead.facebookLeadId || undefined,
      facebookCampaignName: newLead.facebookCampaignName || undefined,
      facebookAdSetName: newLead.facebookAdSetName || undefined,
      leadScore: newLead.leadScore
    };

    onCreatePin(pin);
    setNewLead({
      customerName: '',
      phoneNumber: '',
      email: '',
      address: '',
      facebookProfileUrl: '',
      facebookLeadId: '',
      facebookCampaignName: '',
      facebookAdSetName: '',
      notes: '',
      leadScore: 'medium'
    });
    setShowAddForm(false);
  };

  const openFacebookProfile = (url: string) => {
    if (url) {
      window.open(url, '_blank');
    }
  };

  const leadScoreConfig = {
    'low': { color: '#94a3b8', label: 'Low', stars: 1 },
    'medium': { color: '#fbbf24', label: 'Medium', stars: 2 },
    'high': { color: '#10b981', label: 'High', stars: 3 }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Facebook className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-bold">Facebook Leads</h2>
          <Badge variant="secondary">{facebookLeads.length}</Badge>
        </div>
        <Button onClick={() => setShowAddForm(!showAddForm)} className="bg-blue-600 hover:bg-blue-700">
          Add Facebook Lead
        </Button>
      </div>

      {showAddForm && (
        <Card className="border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Facebook className="w-5 h-5 text-blue-600" />
              Add New Facebook Lead
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="customerName">Customer Name *</Label>
                <Input
                  id="customerName"
                  value={newLead.customerName}
                  onChange={(e) => setNewLead({ ...newLead, customerName: e.target.value })}
                  placeholder="Enter customer name"
                />
              </div>
              <div>
                <Label htmlFor="address">Address *</Label>
                <Input
                  id="address"
                  value={newLead.address}
                  onChange={(e) => setNewLead({ ...newLead, address: e.target.value })}
                  placeholder="Enter property address"
                />
              </div>
              <div>
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  value={newLead.phoneNumber}
                  onChange={(e) => setNewLead({ ...newLead, phoneNumber: e.target.value })}
                  placeholder="Enter phone number"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newLead.email}
                  onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
                  placeholder="Enter email address"
                />
              </div>
              <div>
                <Label htmlFor="facebookProfileUrl">Facebook Profile URL</Label>
                <Input
                  id="facebookProfileUrl"
                  value={newLead.facebookProfileUrl}
                  onChange={(e) => setNewLead({ ...newLead, facebookProfileUrl: e.target.value })}
                  placeholder="https://facebook.com/profile"
                />
              </div>
              <div>
                <Label htmlFor="leadScore">Lead Score</Label>
                <Select value={newLead.leadScore} onValueChange={(value: 'low' | 'medium' | 'high') => setNewLead({ ...newLead, leadScore: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low Priority</SelectItem>
                    <SelectItem value="medium">Medium Priority</SelectItem>
                    <SelectItem value="high">High Priority</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="facebookLeadId">Facebook Lead ID</Label>
                <Input
                  id="facebookLeadId"
                  value={newLead.facebookLeadId}
                  onChange={(e) => setNewLead({ ...newLead, facebookLeadId: e.target.value })}
                  placeholder="FB Lead ID (optional)"
                />
              </div>
              <div>
                <Label htmlFor="facebookCampaignName">Campaign Name</Label>
                <Input
                  id="facebookCampaignName"
                  value={newLead.facebookCampaignName}
                  onChange={(e) => setNewLead({ ...newLead, facebookCampaignName: e.target.value })}
                  placeholder="Campaign name (optional)"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="facebookAdSetName">Ad Set Name</Label>
              <Input
                id="facebookAdSetName"
                value={newLead.facebookAdSetName}
                onChange={(e) => setNewLead({ ...newLead, facebookAdSetName: e.target.value })}
                placeholder="Ad set name (optional)"
              />
            </div>
            <div>
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={newLead.notes}
                onChange={(e) => setNewLead({ ...newLead, notes: e.target.value })}
                placeholder="Add any notes about this lead..."
                rows={3}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleAddLead} className="bg-blue-600 hover:bg-blue-700">
                Add Lead
              </Button>
              <Button variant="outline" onClick={() => setShowAddForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-3">
        {facebookLeads.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center">
              <Facebook className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No Facebook leads yet. Add your first Facebook lead to get started!</p>
            </CardContent>
          </Card>
        ) : (
          facebookLeads.map((pin) => (
            <Card key={pin.id} className="border-blue-100">
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <Facebook className="w-4 h-4 text-blue-600 flex-shrink-0" />
                      <h3 className="font-semibold text-gray-900 truncate">{pin.customerName}</h3>
                      <Badge className="bg-blue-100 text-blue-800">Facebook Lead</Badge>
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
                    
                    <div className="space-y-1 text-sm">
                      <p className="flex items-center gap-2">
                        <MapPin className="w-3 h-3 text-gray-500" />
                        {pin.address}
                      </p>
                      
                      {pin.phoneNumber && (
                        <p className="flex items-center gap-2">
                          <Phone className="w-3 h-3 text-gray-500" />
                          {pin.phoneNumber}
                        </p>
                      )}
                      
                      {pin.email && (
                        <p className="flex items-center gap-2">
                          <Mail className="w-3 h-3 text-gray-500" />
                          {pin.email}
                        </p>
                      )}
                      
                      {pin.facebookCampaignName && (
                        <p className="text-xs text-gray-500">
                          <strong>Campaign:</strong> {pin.facebookCampaignName}
                        </p>
                      )}
                      
                      {pin.facebookAdSetName && (
                        <p className="text-xs text-gray-500">
                          <strong>Ad Set:</strong> {pin.facebookAdSetName}
                        </p>
                      )}
                      
                      {pin.notes && (
                        <p className="text-sm text-gray-600 mt-2">{pin.notes}</p>
                      )}
                      
                      <p className="text-xs text-gray-400 mt-2">
                        Added: {pin.dateAdded}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2 flex-shrink-0">
                    {pin.facebookProfileUrl && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openFacebookProfile(pin.facebookProfileUrl!)}
                        className="text-blue-600 border-blue-200 hover:bg-blue-50"
                        title="Open Facebook Profile"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default FacebookLeadsPanel;
