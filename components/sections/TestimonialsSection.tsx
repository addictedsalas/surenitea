'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function TestimonialsSection() {
  const testimonials = [
    {
      id: 1,
      name: "CRG 100",
      handle: "Local Guide",
      content: "Alyza was amazing, so welcoming and friendly! She really made the experience feel special. The vibe at the Kratom bar is fantastic, and you can tell they care about making you feel good. I loved it and will definitely be back!",
      rating: 5,
      bgColor: '#FFCBA4', // Peach/coral from top left logo
      textColor: '#E97451', // Coral text color
      image: '/CRG100Review.png'
    },
    {
      id: 2,
      name: "Happy Endings of Miami",
      handle: "24 reviews",
      content: "Visited Surenitea Wellness Bar in Wynwood it was amazing! The atmosphere was warm and inviting, with soft lighting and a laid-back vibe that makes you feel at home. The staff was friendly and attentive, creating a welcoming space for everyone...",
      rating: 5,
      bgColor: '#3D3D3D', // Dark gray from bottom left logo
      textColor: '#FFCBA4', // Peach text color
      image: '/happyEndingsreview.png'
    },
    {
      id: 3,
      name: "Jordan Levy",
      handle: "11 reviews",
      content: "This place is fantastic. It's beautiful and makes you feel like your in a Pacific Ocean island. The staff are very knowledgeable and helped me pick the best drink for me. I have been drinking Kradom for years and this may be the best product...",
      rating: 5,
      bgColor: '#E97451', // Coral from bottom right logo
      textColor: '#FFFFFF', // White text color
      image: '/jordanLevyReview.png'
    }
  ];

  return (
    <section className="py-24 px-4" style={{ backgroundColor: '#FFFFFF' }}>
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
            They Love&apos;s Us
          </h2>
          <p className="text-lg font-sofia max-w-2xl mx-auto" style={{ color: 'var(--color-surenitea-600)' }}>
            From classic favorites to modern culinary creations, our menu is designed to tantalize your taste buds. Every dish is made with the freshest ingredients and a whole lot of love.
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
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
                &ldquo;{testimonial.content}&rdquo;
              </p>

              {/* User Info */}
              <div className="flex items-center gap-3">
                <Image
                  src={testimonial.image}
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

        {/* Our Reviews Button */}
        <div className="text-center">
          <Link
            href="https://www.google.com/search?sca_esv=3cb799b7ed00e3de&rlz=1C1GEWG_enUS1051US1051&sxsrf=AE3TifNFlUgOjnecA6KJwGEahFe5QzXlyA:1749776211914&q=surenitea+miami&si=AMgyJEtREmoPL4P1I5IDCfuA8gybfVI2d5Uj7QMwYCZHKDZ-E5V34WFQx61lskQyE4yAxw3WcPC05R67e4eDVO9pL7ceEilNVR7nKPceR9PQVEvZaCf7TTIUS6XbqCi0ReL8j8QOtSWKZ9-8JsaiSHE2pQ0VLI6G_-abZ7PtEPknv0tCdg3Nkdc%3D&sa=X&ved=2ahUKEwiHxrCsmO2NAxXOwvACHf4fJWgQrrQLegQIGxAA&biw=1920&bih=945"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 rounded-full font-sofia font-bold text-base transition-all duration-200 transform hover:scale-[1.02] hover:bg-[#e55555] shadow-lg"
            style={{
              backgroundColor: '#FF6B6B',
              color: '#FFFFFF'
            }}
          >
            Our Reviews
          </Link>
        </div>
      </div>
    </section>
  );
}
