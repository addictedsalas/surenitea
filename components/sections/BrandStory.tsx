'use client';

import Link from  'next/link';
import Image from 'next/image';

interface BrandStoryProps {
  title?: string;
  paragraphs?: string[];
  linkText?: string;
  linkHref?: string;
  imageSrc?: string;
  imageAlt?: string;
}

export default function BrandStory({
  title = "Our Story",
  paragraphs = [
    "SÜRENITEA FARMACY was born from a deeply personal journey. After suffering a life-altering injury over 15 years ago, our founder began a relentless search for relief—one that conventional medicine couldn’t offer. That path led him into the world of natural healing, where plants became both remedy and revelation.",
    "Through years of exploration—from the rainforests of Southeast Asia to the volcanic soils of the Pacific Islands and the mountains of Oregon—he uncovered the power of ancient botanicals. What started as a personal healing mission evolved into a global pursuit to share these remedies with others."
  ],
  linkText = "Learn More About Us",
  linkHref = "/about",
  imageSrc = "/Instant-and-Ground-kava.png",
  imageAlt = "Instant and Ground Kava"
}: BrandStoryProps) {
  return (
    <section className="py-24 relative overflow-hidden" style={{ backgroundColor: 'var(--color-surenitea-700)' }}>
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/p-banner.png')] bg-cover bg-center opacity-80"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <div className="text-white">
            <h2 className="text-4xl md:text-5xl font-light mb-6 font-recoleta">
              {title}
            </h2>
            {paragraphs.map((paragraph, index) => (
              <p key={index} className="text-lg mb-6 font-sofia font-light leading-relaxed opacity-90">
                {paragraph}
              </p>
            ))}
            <Link
              href={linkHref}
              className="inline-flex items-center transition-colors duration-200 font-sofia font-bold text-lg hover:opacity-80"
              style={{ color: 'var(--color-peach)' }}
            >
              {linkText}
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
          <div className="relative">
            <div className="aspect-w-4 aspect-h-3 rounded-lg overflow-hidden shadow-2xl">
              <Image 
                src={imageSrc}
                alt={imageAlt}
                width={800}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full opacity-80 blur-xl" style={{ backgroundColor: 'var(--color-peach)' }}></div>
            <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full opacity-80 blur-xl" style={{ backgroundColor: 'var(--color-coral)' }}></div>
          </div>
        </div>
      </div>
    </section>
  );
}
