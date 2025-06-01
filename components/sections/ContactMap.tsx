export default function ContactMap() {
  return (
    <section className="relative h-[400px] w-full">
      {/* Google Maps embed for 50 NW 23rd St. Miami, FL 33127 */}
      <div className="absolute inset-0 bg-gray-200">
        <iframe
          src="https://maps.google.com/maps?q=50%20NW%2023rd%20St%20Suite%20112%20Miami%20FL%2033127&t=&z=15&ie=UTF8&iwloc=&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="grayscale"
        />
      </div>
      
      {/* Map Marker */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="relative">
          <div className="absolute -inset-4 bg-coral/20 rounded-full animate-ping" />
          <div className="relative w-12 h-12 bg-coral rounded-full flex items-center justify-center shadow-lg">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
