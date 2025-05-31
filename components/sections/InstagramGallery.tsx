import Link from 'next/link';

interface InstagramGalleryProps {
  title?: string;
  subtitle?: string;
  instagramHandle?: string;
  images?: { src: string; alt: string }[];
}

export default function InstagramGallery({
  title = "Follow @surenitea",
  subtitle = "Join our community and share your tea moments",
  instagramHandle = "surenitea_official",
  images = [
    { src: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400", alt: "Tea moment 1" },
    { src: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400", alt: "Tea moment 2" },
    { src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400", alt: "Tea moment 3" },
    { src: "https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?w=400", alt: "Tea moment 4" },
    { src: "https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?w=400", alt: "Tea moment 5" },
    { src: "https://images.unsplash.com/photo-1558160074-4d7d8bdf4256?w=400", alt: "Tea moment 6" },
    { src: "https://images.unsplash.com/photo-1587888637140-849b25d80ef9?w=400", alt: "Tea moment 7" },
    { src: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=400", alt: "Tea moment 8" }
  ]
}: InstagramGalleryProps) {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-light mb-4 font-recoleta" style={{ color: 'var(--color-surenitea-700)' }}>
            {title}
          </h2>
          <p className="text-lg font-sofia font-light" style={{ color: 'var(--color-surenitea-600)' }}>
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto mb-12">
          {images.map((image, index) => (
            <a
              key={index}
              href={`https://instagram.com/${instagramHandle}`}
              target="_blank"
              rel="noopener noreferrer"
              className="relative group overflow-hidden rounded-lg aspect-square"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                <svg className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
                </svg>
              </div>
            </a>
          ))}
        </div>

        <div className="text-center">
          <p className="text-sm mb-4 font-sofia" style={{ color: 'var(--color-surenitea-600)' }}>
            Note: Instagram feed integration requires API setup. These are placeholder images.
          </p>
          <a
            href={`https://instagram.com/${instagramHandle}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center font-sofia font-bold transition-colors duration-200 hover:opacity-80"
            style={{ color: 'var(--color-coral)' }}
          >
            View More on Instagram
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
