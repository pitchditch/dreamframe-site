
import React, { useState } from 'react';
import { useTranslation } from '@/hooks/use-translation';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';

const ContactForm = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    // Handle form submission here
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">{t('Name')} *</Label>
          <Input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="email">{t('Email')} *</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="mt-1"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="phone">{t('Phone')}</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="service">{t('Service Needed')}</Label>
          <select
            id="service"
            name="service"
            value={formData.service}
            onChange={handleChange}
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bc-red"
          >
            <option value="">{t('Select a service')}</option>
            <option value="window-cleaning">{t('Window Cleaning')}</option>
            <option value="pressure-washing">{t('House Washing (Soft Washing)')}</option>
            <option value="gutter-cleaning">{t('Gutter Cleaning')}</option>
            <option value="roof-cleaning">{t('Roof Cleaning')}</option>
            <option value="commercial">{t('Commercial Services')}</option>
          </select>
        </div>
      </div>

      <div>
        <Label htmlFor="message">{t('Message')} *</Label>
        <Textarea
          id="message"
          name="message"
          rows={4}
          required
          value={formData.message}
          onChange={handleChange}
          placeholder={t('Tell us about your project...')}
          className="mt-1"
        />
      </div>

      <Button type="submit" className="w-full bg-bc-red hover:bg-red-700 text-white">
        {t('Send Message')}
      </Button>
    </form>
  );
};

export default ContactForm;
