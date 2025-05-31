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
  videoSrc = "/hero_video.mp4"
}: HeroSectionProps) {
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

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce z-20">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
