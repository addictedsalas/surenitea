import Link from 'next/link';

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
    "At Surenitea, we believe that every cup tells a story. Our journey began with a simple mission: to bring the world's finest teas to your doorstep.",
    "We work directly with tea gardens and farmers to ensure that every leaf is cultivated with care and harvested at the perfect moment. From the misty mountains of Darjeeling to the rolling hills of Ceylon, we source only the best."
  ],
  linkText = "Learn More About Us",
  linkHref = "/about",
  imageSrc = "https://images.unsplash.com/photo-1587888637140-849b25d80ef9?w=800",
  imageAlt = "Tea plantation"
}: BrandStoryProps) {
  return (
    <section className="py-24 relative overflow-hidden" style={{ backgroundColor: 'var(--color-surenitea-700)' }}>
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1920')] bg-cover bg-center opacity-10"></div>
      
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
              <img 
                src={imageSrc}
                alt={imageAlt}
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
