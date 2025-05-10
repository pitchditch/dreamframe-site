import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

const PriceCalculatorForm = ({ initialStep }: { initialStep?: string }) => {
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

    // ✅ Log what you're sending to EmailJS
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

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input name="from_name" type="text" placeholder="Full Name" value={formData.from_name} onChange={handleChange} />
      <input name="from_email" type="email" placeholder="Email" value={formData.from_email} onChange={handleChange} />
      <input name="phone" type="tel" placeholder="Phone Number" value={formData.phone} onChange={handleChange} />
      <input name="address" type="text" placeholder="Service Address" value={formData.address} onChange={handleChange} />
      <input name="city" type="text" placeholder="City" value={formData.city} onChange={handleChange} />
      <input name="postal_code" type="text" placeholder="Postal Code" value={formData.postal_code} onChange={handleChange} />
      <input name="surface_type" type="text" placeholder="Surface Type (e.g., Vinyl, Brick)" value={formData.surface_type} onChange={handleChange} />
      <input name="square_footage" type="text" placeholder="Approximate Sq. Ft." value={formData.square_footage} onChange={handleChange} />
      <input name="additional_services" type="text" placeholder="Additional Services (comma separated)" value={formData.additional_services} onChange={handleChange} />
      <textarea name="additional_notes" placeholder="Additional Notes" value={formData.additional_notes} onChange={handleChange} />
      <input name="home_size" type="text" placeholder="Home Size" value={formData.home_size} onChange={handleChange} />
      <input name="selected_services" type="text" placeholder="Selected Services (comma separated)" value={formData.selected_services} onChange={handleChange} />
      <input name="referral_name" type="text" placeholder="Referral Name (if any)" value={formData.referral_name} onChange={handleChange} />

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Submit
      </button>
    </form>
  );
};

export default PriceCalculatorForm;
