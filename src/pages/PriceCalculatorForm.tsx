
import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface PriceCalculatorFormProps {
  initialStep?: string;
}

const PriceCalculatorForm = ({ initialStep }: PriceCalculatorFormProps) => {
  const [formData, setFormData] = useState({
    from_name: '',
    from_email: '',
    phone: '',
    address: '',
    city: '',
    postal_code: '',
    surface_type: '',
    square_footage: '',
    additional_services: '',
    additional_notes: '',
    home_size: '',
    selected_services: '',
    referral_name: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Log what you're sending to EmailJS
    console.log("📤 Sending form data to EmailJS:", formData);

    try {
      // Use environment variables or hardcoded values as fallbacks
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_xrk4vas';
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_b2y5ak4';
      const userId = process.env.NEXT_PUBLIC_EMAILJS_USER_ID || 'MMzAmk5eWrjFgC_nP';

      const result = await emailjs.send(
        serviceId,
        templateId,
        formData,
        userId
      );
      console.log("✅ Email sent successfully:", result);
      alert("Your inquiry has been submitted successfully!");
    } catch (error) {
      console.error("❌ Email send error:", error);
      alert("There was an error submitting your inquiry. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Request a Quote</h2>
      
      <div>
        <label htmlFor="from_name" className="block text-sm font-medium mb-1">Full Name</label>
        <Input 
          id="from_name"
          name="from_name" 
          type="text" 
          placeholder="John Smith" 
          value={formData.from_name} 
          onChange={handleChange}
          className="w-full"
          required
        />
      </div>
      
      <div>
        <label htmlFor="from_email" className="block text-sm font-medium mb-1">Email</label>
        <Input 
          id="from_email"
          name="from_email" 
          type="email" 
          placeholder="john@example.com" 
          value={formData.from_email} 
          onChange={handleChange}
          className="w-full"
          required
        />
      </div>
      
      <div>
        <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone Number</label>
        <Input 
          id="phone"
          name="phone" 
          type="tel" 
          placeholder="(604) 555-1234" 
          value={formData.phone} 
          onChange={handleChange}
          className="w-full"
          required
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="address" className="block text-sm font-medium mb-1">Service Address</label>
          <Input 
            id="address"
            name="address" 
            type="text" 
            placeholder="123 Main St" 
            value={formData.address} 
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="city" className="block text-sm font-medium mb-1">City</label>
          <Input 
            id="city"
            name="city" 
            type="text" 
            placeholder="White Rock" 
            value={formData.city} 
            onChange={handleChange}
            required
          />
        </div>
      </div>
      
      <div>
        <label htmlFor="postal_code" className="block text-sm font-medium mb-1">Postal Code</label>
        <Input 
          id="postal_code"
          name="postal_code" 
          type="text" 
          placeholder="V4B 1G1" 
          value={formData.postal_code} 
          onChange={handleChange}
          className="w-full"
          required
        />
      </div>
      
      <div>
        <label htmlFor="surface_type" className="block text-sm font-medium mb-1">Surface Type</label>
        <Input 
          id="surface_type"
          name="surface_type" 
          type="text" 
          placeholder="Vinyl, Brick, etc." 
          value={formData.surface_type} 
          onChange={handleChange}
          className="w-full"
        />
      </div>
      
      <div>
        <label htmlFor="square_footage" className="block text-sm font-medium mb-1">Approximate Square Footage</label>
        <Input 
          id="square_footage"
          name="square_footage" 
          type="text" 
          placeholder="1500" 
          value={formData.square_footage} 
          onChange={handleChange}
          className="w-full"
        />
      </div>
      
      <div>
        <label htmlFor="selected_services" className="block text-sm font-medium mb-1">Requested Services</label>
        <Input 
          id="selected_services"
          name="selected_services" 
          type="text" 
          placeholder="Window Cleaning, Pressure Washing, etc." 
          value={formData.selected_services} 
          onChange={handleChange}
          className="w-full"
          required
        />
      </div>
      
      <div>
        <label htmlFor="additional_services" className="block text-sm font-medium mb-1">Additional Services</label>
        <Input 
          id="additional_services"
          name="additional_services" 
          type="text" 
          placeholder="Gutter Cleaning, Moss Treatment, etc." 
          value={formData.additional_services} 
          onChange={handleChange}
          className="w-full"
        />
      </div>
      
      <div>
        <label htmlFor="additional_notes" className="block text-sm font-medium mb-1">Additional Notes</label>
        <Textarea 
          id="additional_notes"
          name="additional_notes" 
          placeholder="Any specific details or requirements" 
          value={formData.additional_notes} 
          onChange={handleChange}
          className="w-full"
          rows={3}
        />
      </div>
      
      <div>
        <label htmlFor="referral_name" className="block text-sm font-medium mb-1">Referred By</label>
        <Input 
          id="referral_name"
          name="referral_name" 
          type="text" 
          placeholder="Friend or family member who referred you" 
          value={formData.referral_name} 
          onChange={handleChange}
          className="w-full"
        />
      </div>

      <Button type="submit" className="w-full bg-bc-red hover:bg-red-700 text-white">
        Submit Quote Request
      </Button>
    </form>
  );
};

export default PriceCalculatorForm;
