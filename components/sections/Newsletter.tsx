'use client';

import { useState } from 'react';

interface NewsletterProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
}

export default function Newsletter({
  title = "Join Our Tea Family",
  subtitle = "Subscribe to receive exclusive offers, tea tips, and be the first to know about new arrivals",
  buttonText = "Subscribe"
}: NewsletterProps) {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Banner Image */}
      <div className="absolute inset-0 bg-[url('/kava-banner.png')] bg-cover bg-center opacity-70 z-0"></div>
      {/* Optional: overlay for extra contrast */}
      <div className="absolute inset-0 bg-gradient-to-br from-peach/60 to-coral/70 z-10"></div>
      <div className="container mx-auto px-4 relative z-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-light text-white mb-6 font-recoleta">
            {title}
          </h2>
          <p className="text-xl text-white/90 mb-10 font-sofia font-light">
            {subtitle}
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-md bg-white/90 backdrop-blur-sm placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white/30 font-sofia"
              style={{ color: 'var(--color-surenitea-700)' }}
              required
            />
            <button
              type="submit"
              className="px-8 py-4 rounded-full font-sofia font-bold text-white transition-all duration-300 transform hover:scale-105 shadow-lg"
              style={{ 
                backgroundColor: 'var(--color-coral)'
              }}
            >
              {buttonText}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
