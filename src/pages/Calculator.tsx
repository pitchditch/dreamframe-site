import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

const PriceCalculatorForm = ({ initialStep }: { initialStep?: string }) => {
  // Step 1: Form Data State
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

  // Step 2: Track Current Step
  const [currentStep, setCurrentStep] = useState(initialStep || 'address');

  // Step 3: Handle Input Changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Step 4: Handle Form Submission (EmailJS)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("📤 Sending form data to EmailJS:", formData);

    try {
      const result = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        formData,
        process.env.NEXT_PUBLIC_EMAILJS_USER_ID
      );
      console.log("✅ Email sent successfully:", result);
    } catch (error) {
      console.error("❌ Email send error:", error);
    }
  };

  // Step 5: Move to Next Step (handleNext)
  const handleNext = () => {
    setCurrentStep((prevStep) => {
      switch (prevStep) {
        case 'address':
          return 'property';
        case 'property':
          return 'services';
        case 'services':
          return 'contact';
        case 'contact':
          return 'summary';
        default:
          return 'address';
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {currentStep === 'address' && (
        <div>
          <input
            name="from_name"
            type="text"
            placeholder="Full Name"
            value={formData.from_name}
            onChange={handleChange}
          />
          <input
            name="from_email"
            type="email"
            placeholder="Email"
            value={formData.from_email}
            onChange={handleChange}
          />
          <input
            name="phone"
            type="tel"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
          />
          <input
            name="address"
            type="text"
            placeholder="Service Address"
            value={formData.address}
            onChange={handleChange}
          />
          <input
            name="city"
            type="text"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
          />
          <input
            name="postal_code"
            type="text"
            placeholder="Postal Code"
            value={formData.postal_code}
            onChange={handleChange}
          />
        </div>
      )}

      {currentStep === 'property' && (
        <div>
          <input
            name="surface_type"
            type="text"
            placeholder="Surface Type (e.g., Vinyl, Brick)"
            value={formData.surface_type}
            onChange={handleChange}
          />
          <input
            name="square_footage"
            type="text"
            placeholder="Approximate Sq. Ft."
            value={formData.square_footage}
            onChange={handleChange}
          />
        </div>
      )}

      {currentStep === 'services' && (
        <div>
          <input
            name="additional_services"
            type="text"
            placeholder="Additional Services (comma separated)"
            value={formData.additional_services}
            onChange={handleChange}
          />
          <textarea
            name="additional_notes"
            placeholder="Additional Notes"
            value={formData.additional_notes}
            onChange={handleChange}
          />
        </div>
      )}

      {currentStep === 'contact' && (
        <div>
          <input
            name="home_size"
            type="text"
            placeholder="Home Size"
            value={formData.home_size}
            onChange={handleChange}
          />
          <input
            name="selected_services"
            type="text"
            placeholder="Selected Services (comma separated)"
            value={formData.selected_services}
            onChange={handleChange}
          />
          <input
            name="referral_name"
            type="text"
            placeholder="Referral Name (if any)"
            value={formData.referral_name}
            onChange={handleChange}
          />
        </div>
      )}

      {currentStep === 'summary' && (
        <div>
          <p><strong>Summary:</strong></p>
          <p>Full Name: {formData.from_name}</p>
          <p>Email: {formData.from_email}</p>
          <p>Phone: {formData.phone}</p>
          <p>Address: {formData.address}, {formData.city}, {formData.postal_code}</p>
          <p>Surface Type: {formData.surface_type}</p>
          <p>Square Footage: {formData.square_footage}</p>
          <p>Additional Services: {formData.additional_services}</p>
          <p>Additional Notes: {formData.additional_notes}</p>
          <p>Home Size: {formData.home_size}</p>
          <p>Selected Services: {formData.selected_services}</p>
          <p>Referral Name: {formData.referral_name}</p>
        </div>
      )}

      {/* Navigation Buttons */}
      {currentStep !== 'summary' && (
        <button type="button" onClick={handleNext}>
          Next
        </button>
      )}
      {currentStep === 'summary' && (
        <button type="submit">
          Submit
        </button>
      )}
    </form>
  );
};

export default PriceCalculatorForm;
