 'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  videoSrc?: string;
}

export default function HeroSection({ 
  title, 
  subtitle, 
  buttonText, 
  buttonLink,
  videoSrc = "/tea-hero.mp4"
}: HeroSectionProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="hero-section relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      <div className="hero-video-container">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="hero-video"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      </div>

      {/* Darker Gradient Overlay for better visibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60 z-10" />

      {/* Hero Content */}
      <div className="relative z-20 h-full flex items-center justify-center">
        <div className="text-center text-white px-4 max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 font-recoleta tracking-tight drop-shadow-lg">
            {title}
          </h1>
          <p className="text-xl md:text-2xl mb-10 font-sofia font-light max-w-3xl mx-auto leading-relaxed drop-shadow">
            {subtitle}
          </p>
          <Link
            href={buttonLink}
            className="btn-primary inline-block"
          >
            {buttonText}
          </Link>
        </div>
      </div>

      {/* Bottom Text Section with Animation */}
      <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/60 to-transparent pb-12 pt-20">
        <div className="container mx-auto px-8 md:px-12 lg:px-16">
          <div className="max-w-2xl text-left">
            <h2 
              className={`mb-3 text-3xl font-bold text-white drop-shadow-lg md:text-4xl lg:text-5xl transition-all duration-1000 ease-out ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
              style={{
                transitionDelay: '200ms'
              }}
            >
              GREAT TEA. NO BS.
            </h2>
            <p 
              className={`text-lg text-white/80 drop-shadow-md md:text-xl transition-all duration-1000 ease-out ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
              style={{
                transitionDelay: '600ms'
              }}
            >
              Pure ingredients. Honest flavors. Simply exceptional.
            </p>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 animate-bounce text-white">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
