import Image from 'next/image';

export default function TestimonialsSection() {
  const testimonials = [
    {
      id: 1,
      name: "Larry Alexander",
      handle: "@larryalexander",
      content: "Every sip is like a little piece of heaven. I've never tasted anything quite like this before. I'm obsessed! For every special occasion, and it's always a hit!",
      rating: 5,
      bgColor: '#FFCBA4', // Peach/coral from top left logo
      textColor: '#E97451' // Coral text color
    },
    {
      id: 2,
      name: "Larry Alexander",
      handle: "@larryalexander",
      content: "Every sip is like a little piece of heaven. I've never tasted anything quite like this before. I'm obsessed! For every special occasion, and it's always a hit!",
      rating: 5,
      bgColor: '#3D3D3D', // Dark gray from bottom left logo
      textColor: '#FFCBA4' // Peach text color
    },
    {
      id: 3,
      name: "Larry Alexander",
      handle: "@larryalexander",
      content: "Every sip is like a little piece of heaven. I've never tasted anything quite like this before. I'm obsessed! For every special occasion, and it's always a hit!",
      rating: 5,
      bgColor: '#E97451', // Coral from bottom right logo
      textColor: '#FFFFFF' // White text color
    }
  ];

  return (
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header with green heart */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <Image
              src="/green_heart.webp"
              alt="Green Heart"
              width={60}
              height={60}
              className="object-contain"
            />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-recoleta mb-4" style={{ color: 'var(--color-surenitea-700)' }}>
            They Love's Us
          </h2>
          <p className="text-lg font-sofia max-w-2xl mx-auto" style={{ color: 'var(--color-surenitea-600)' }}>
            From classic favorites to modern culinary creations, our menu is designed to tantalize your taste buds. Every dish is made with the freshest ingredients and a whole lot of love.
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
              style={{ backgroundColor: testimonial.bgColor }}
            >
              {/* Rating Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5" fill={testimonial.textColor} viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Testimonial Content */}
              <p className="text-base mb-6 font-sofia" style={{ color: testimonial.textColor }}>
                "{testimonial.content}"
              </p>

              {/* User Info */}
              <div className="flex items-center gap-3">
                <Image
                  src="/testimonial_placeholder.webp"
                  alt={testimonial.name}
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />
                <div>
                  <h4 className="font-bold text-sm" style={{ color: testimonial.textColor }}>
                    {testimonial.name}
                  </h4>
                  <p className="text-sm opacity-70" style={{ color: testimonial.textColor }}>
                    {testimonial.handle}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
