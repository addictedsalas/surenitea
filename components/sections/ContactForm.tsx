'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-sofia text-surenitea-600 mb-2">
            First Name *
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-md border border-gray-300 focus:border-coral focus:outline-none focus:ring-2 focus:ring-coral/20 font-sofia"
            placeholder="Ex: John"
          />
        </div>
        
        <div>
          <label className="block text-sm font-sofia text-surenitea-600 mb-2">
            Last Name *
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-md border border-gray-300 focus:border-coral focus:outline-none focus:ring-2 focus:ring-coral/20 font-sofia"
            placeholder="Ex: Doe"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-sofia text-surenitea-600 mb-2">
          Email *
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-md border border-gray-300 focus:border-coral focus:outline-none focus:ring-2 focus:ring-coral/20 font-sofia"
          placeholder="example@gmail.com"
        />
      </div>

      <div>
        <label className="block text-sm font-sofia text-surenitea-600 mb-2">
          Phone *
        </label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-md border border-gray-300 focus:border-coral focus:outline-none focus:ring-2 focus:ring-coral/20 font-sofia"
          placeholder="Enter Phone Number"
        />
      </div>

      <div>
        <label className="block text-sm font-sofia text-surenitea-600 mb-2">
          Subject *
        </label>
        <input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-md border border-gray-300 focus:border-coral focus:outline-none focus:ring-2 focus:ring-coral/20 font-sofia"
          placeholder="Enter Subject"
        />
      </div>

      <div>
        <label className="block text-sm font-sofia text-surenitea-600 mb-2">
          Your Message *
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          className="w-full px-4 py-3 rounded-md border border-gray-300 focus:border-coral focus:outline-none focus:ring-2 focus:ring-coral/20 font-sofia resize-none"
          placeholder="Enter here..."
        />
      </div>

      <Button type="submit" variant="primary" size="lg" className="w-full md:w-auto">
        Send a Message
      </Button>
    </form>
  );
}
