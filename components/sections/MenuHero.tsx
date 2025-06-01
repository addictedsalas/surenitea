'use client';

import Link from 'next/link';

export default function MenuHero() {
  return (
    <section className="relative h-[300px] md:h-[400px] overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/p-banner.png')" }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-surenitea-700/80 to-surenitea-600/70" />
      
      {/* Content */}
      <div className="relative h-full flex items-center justify-center text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-recoleta font-bold text-white mb-4">
            Our Menu
          </h1>
          <nav className="flex items-center justify-center gap-2 text-white/90 font-sofia">
            <Link href="/" className="hover:text-coral transition-colors">Home</Link>
            <span>/</span>
            <span className="text-coral">Menu</span>
          </nav>
        </div>
      </div>
    </section>
  );
}
