import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface StepReviewProps {
  formData: any;
  onBack: () => void;
  onSubmit: () => void;
}

const StepReview = ({ formData, onBack, onSubmit }: StepReviewProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Review Your Information</h2>
        <p className="text-gray-600">Please confirm the details below before submitting your request.</p>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold">Contact Information</h3>
          <p><strong>Name:</strong> {formData.firstName} {formData.lastName}</p>
          <p><strong>Email:</strong> {formData.email}</p>
          <p><strong>Phone:</strong> {formData.phone}</p>
          <p><strong>Address:</strong> {formData.address}, {formData.city}, {formData.postalCode}</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold">Service Details</h3>
          <p><strong>Service Type:</strong> {formData.serviceType}</p>
          <p><strong>Property Size:</strong> {formData.propertySize}</p>
          {formData.additionalDetails && (
            <p><strong>Additional Details:</strong> {formData.additionalDetails}</p>
          )}
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg flex items-center gap-4 border border-gray-200">
        <img
          src="/lovable-uploads/620a8898-e5ca-48f4-b13b-518ab06cc30e.jpg"
          alt="Jayden - Owner"
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <p className="text-sm text-gray-600">Every job is personally checked by me, Jayden, to ensure the highest quality of service.</p>
          <p className="text-sm font-medium">- Jayden, Owner/Lead Technician</p>
        </div>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button onClick={onSubmit}>
          Submit Request
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default StepReview;
