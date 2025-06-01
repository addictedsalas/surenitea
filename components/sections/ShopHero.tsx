'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function ShopHero() {
  return (
    <section className="relative h-[40vh] min-h-[400px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/p-banner.png"
          alt="Shop banner"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-surenitea-700/80 to-surenitea-700/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4">
        {/* Breadcrumb */}
        <div className="flex items-center justify-center gap-2 text-sm font-sofia mb-6">
          <Link href="/" className="hover:text-peach transition-colors">Home</Link>
          <span>/</span>
          <span>Shop</span>
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-recoleta font-bold mb-4">
          Our Collection
        </h1>
        <p className="text-lg md:text-xl font-sofia font-light max-w-2xl mx-auto">
          Discover our curated selection of premium wellness teas and elixirs
        </p>
      </div>
    </section>
  );
}
