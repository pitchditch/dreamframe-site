import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { HousePin } from './types';

interface EditPinFormProps {
  pin: HousePin;
  onSave: (updates: Partial<HousePin>) => void;
  onCancel: () => void;
}

const EditPinForm: React.FC<EditPinFormProps> = ({ pin, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    customerName: pin.customerName || '',
    phoneNumber: pin.phoneNumber || '',
    email: pin.email || '',
    status: pin.status,
    notes: pin.notes,
    address: pin.address,
    leadSource: pin.leadSource || 'door-to-door',
    leadScore: pin.leadScore || 'medium',
    facebookProfileUrl: pin.facebookProfileUrl || '',
    facebookLeadId: pin.facebookLeadId || '',
    facebookCampaignName: pin.facebookCampaignName || '',
    followUpDate: pin.followUpDate || '',
    followUpNote: pin.followUpNote || '',
    squareFootage: pin.squareFootage || '',
    // New job completion fields
    jobCompletedDate: pin.jobCompletedDate || '',
    jobDetails: pin.jobDetails || '',
    serviceType: pin.serviceType || '',
    jobValue: pin.jobValue || '',
    isPreviousClient: pin.isPreviousClient || false,
    lastServiceDate: pin.lastServiceDate || '',
    serviceReminder: pin.serviceReminder || false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const updates: Partial<HousePin> = {
      customerName: formData.customerName || undefined,
      phoneNumber: formData.phoneNumber || undefined,
      email: formData.email || undefined,
      status: formData.status,
      notes: formData.notes,
      address: formData.address,
      leadSource: formData.leadSource as HousePin['leadSource'],
      leadScore: formData.leadScore as HousePin['leadScore'],
      facebookProfileUrl: formData.facebookProfileUrl || undefined,
      facebookLeadId: formData.facebookLeadId || undefined,
      facebookCampaignName: formData.facebookCampaignName || undefined,
      followUpDate: formData.followUpDate || undefined,
      followUpNote: formData.followUpNote || undefined,
      squareFootage: formData.squareFootage ? Number(formData.squareFootage) : undefined,
      // New job completion fields
      jobCompletedDate: formData.jobCompletedDate || undefined,
      jobDetails: formData.jobDetails || undefined,
      serviceType: formData.serviceType || undefined,
      jobValue: formData.jobValue ? Number(formData.jobValue) : undefined,
      isPreviousClient: formData.isPreviousClient,
      lastServiceDate: formData.lastServiceDate || undefined,
      serviceReminder: formData.serviceReminder
    };
    
    onSave(updates);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="customerName">Customer Name</Label>
          <Input
            id="customerName"
            value={formData.customerName}
            onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
            placeholder="Enter customer name"
          />
        </div>
        
        <div>
          <Label htmlFor="phoneNumber">Phone Number</Label>
          <Input
            id="phoneNumber"
            value={formData.phoneNumber}
            onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
            placeholder="Enter phone number"
          />
        </div>
        
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="Enter email"
          />
        </div>
        
        <div>
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            placeholder="Enter address"
          />
        </div>
        
        <div>
          <Label htmlFor="status">Status</Label>
          <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value as HousePin['status'] })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="visited">Visited</SelectItem>
              <SelectItem value="interested">Interested</SelectItem>
              <SelectItem value="not-interested">Not Interested</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="revisit-later">Revisit Later</SelectItem>
              <SelectItem value="needs-quote">Needs Quote</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="leadSource">Lead Source</Label>
          <Select value={formData.leadSource} onValueChange={(value) => setFormData({ ...formData, leadSource: value as HousePin['leadSource'] })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="door-to-door">Door-to-Door</SelectItem>
              <SelectItem value="facebook">Facebook</SelectItem>
              <SelectItem value="google">Google</SelectItem>
              <SelectItem value="referral">Referral</SelectItem>
              <SelectItem value="website">Website</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="leadScore">Lead Score</Label>
          <Select value={formData.leadScore} onValueChange={(value) => setFormData({ ...formData, leadScore: value as HousePin['leadScore'] })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="squareFootage">Square Footage</Label>
          <Input
            id="squareFootage"
            type="number"
            value={formData.squareFootage}
            onChange={(e) => setFormData({ ...formData, squareFootage: e.target.value })}
            placeholder="Enter square footage"
          />
        </div>
        
        {formData.leadSource === 'facebook' && (
          <>
            <div>
              <Label htmlFor="facebookProfileUrl">Facebook Profile URL</Label>
              <Input
                id="facebookProfileUrl"
                value={formData.facebookProfileUrl}
                onChange={(e) => setFormData({ ...formData, facebookProfileUrl: e.target.value })}
                placeholder="https://facebook.com/profile"
              />
            </div>
            
            <div>
              <Label htmlFor="facebookLeadId">Facebook Lead ID</Label>
              <Input
                id="facebookLeadId"
                value={formData.facebookLeadId}
                onChange={(e) => setFormData({ ...formData, facebookLeadId: e.target.value })}
                placeholder="FB Lead ID"
              />
            </div>
            
            <div className="md:col-span-2">
              <Label htmlFor="facebookCampaignName">Facebook Campaign Name</Label>
              <Input
                id="facebookCampaignName"
                value={formData.facebookCampaignName}
                onChange={(e) => setFormData({ ...formData, facebookCampaignName: e.target.value })}
                placeholder="Campaign name"
              />
            </div>
          </>
        )}
        
        {/* Job Completion Section */}
        <div>
          <Label htmlFor="jobCompletedDate">Job Completed Date</Label>
          <Input
            id="jobCompletedDate"
            type="date"
            value={formData.jobCompletedDate}
            onChange={(e) => setFormData({ ...formData, jobCompletedDate: e.target.value })}
          />
        </div>
        
        <div>
          <Label htmlFor="serviceType">Service Type</Label>
          <Input
            id="serviceType"
            value={formData.serviceType}
            onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
            placeholder="e.g., House Wash, Driveway Clean, Roof Clean"
          />
        </div>
        
        <div>
          <Label htmlFor="jobValue">Job Value ($)</Label>
          <Input
            id="jobValue"
            type="number"
            value={formData.jobValue}
            onChange={(e) => setFormData({ ...formData, jobValue: e.target.value })}
            placeholder="Enter job value"
          />
        </div>
        
        <div>
          <Label htmlFor="lastServiceDate">Last Service Date</Label>
          <Input
            id="lastServiceDate"
            type="date"
            value={formData.lastServiceDate}
            onChange={(e) => setFormData({ ...formData, lastServiceDate: e.target.value })}
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox
            id="isPreviousClient"
            checked={formData.isPreviousClient}
            onCheckedChange={(checked) => setFormData({ ...formData, isPreviousClient: checked as boolean })}
          />
          <Label htmlFor="isPreviousClient">Previous Client</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox
            id="serviceReminder"
            checked={formData.serviceReminder}
            onCheckedChange={(checked) => setFormData({ ...formData, serviceReminder: checked as boolean })}
          />
          <Label htmlFor="serviceReminder">Set Yearly Service Reminder</Label>
        </div>
        
        <div>
          <Label htmlFor="followUpDate">Follow-up Date</Label>
          <Input
            id="followUpDate"
            type="date"
            value={formData.followUpDate}
            onChange={(e) => setFormData({ ...formData, followUpDate: e.target.value })}
          />
        </div>
        
        <div>
          <Label htmlFor="followUpNote">Follow-up Note</Label>
          <Input
            id="followUpNote"
            value={formData.followUpNote}
            onChange={(e) => setFormData({ ...formData, followUpNote: e.target.value })}
            placeholder="Follow-up note"
          />
        </div>
      </div>
      
      <div>
        <Label htmlFor="jobDetails">Job Details</Label>
        <Textarea
          id="jobDetails"
          value={formData.jobDetails}
          onChange={(e) => setFormData({ ...formData, jobDetails: e.target.value })}
          placeholder="Detailed description of the work completed..."
          rows={3}
        />
      </div>
      
      <div>
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          placeholder="Add notes about this location..."
          rows={3}
        />
      </div>
      
      <div className="flex gap-2">
        <Button type="submit">Save Changes</Button>
        <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
      </div>
    </form>
  );
};

export default EditPinForm;
