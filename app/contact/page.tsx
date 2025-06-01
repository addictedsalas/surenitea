import Image from 'next/image';
import ContactHero from '@/components/sections/ContactHero';
import ContactForm from '@/components/sections/ContactForm';
import ContactInfo from '@/components/sections/ContactInfo';
import ContactMap from '@/components/sections/ContactMap';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <ContactHero />
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="flex justify-center gap-2 mb-4">
            <span className="text-coral text-2xl">•</span>
            <span className="text-coral text-2xl">•</span>
            <span className="text-coral text-2xl">•</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-recoleta font-light text-surenitea-700 mb-4">
            CONTACT US
          </h2>
          <h3 className="text-4xl md:text-5xl font-recoleta font-bold text-surenitea-700">
            Get in <span className="text-coral">Touch with Us</span>
          </h3>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <ContactForm />
          <div className="relative h-[400px] lg:h-auto">
            <Image
              src="/kava-banner.png"
              alt="Contact us"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>
        
        <ContactInfo />
      </div>
      <ContactMap />
    </div>
  );
}
