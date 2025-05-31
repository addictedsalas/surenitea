import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative" style={{ backgroundColor: 'var(--color-surenitea-700)' }}>
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section - Larger */}
          <div className="lg:col-span-2">
            <Image
              src="/surentiea-logo.png"
              alt="Surenitea"
              width={150}
              height={40}
              className="h-10 w-auto brightness-0 invert mb-6"
            />
            <p className="text-white/80 font-sofia font-light mb-6 max-w-sm">
              Experience the art of tea with our carefully curated collection of premium blends. 
              Each cup is a journey to tranquility and wellness.
            </p>
            {/* Social Icons */}
            <div className="flex space-x-4">
              <a 
                href="https://facebook.com/surenitea" 
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                style={{ backgroundColor: 'var(--color-peach)' }}
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a 
                href="https://instagram.com/surenitea_official" 
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                style={{ backgroundColor: 'var(--color-coral)' }}
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"/>
                </svg>
              </a>
              <a 
                href="https://twitter.com/surenitea" 
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                style={{ backgroundColor: 'var(--color-peach)' }}
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="font-recoleta text-lg mb-6 text-white">Shop</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/shop" className="text-white/70 hover:text-white font-sofia font-light transition-colors duration-200">
                  All Teas
                </Link>
              </li>
              <li>
                <Link href="/shop/green-tea" className="text-white/70 hover:text-white font-sofia font-light transition-colors duration-200">
                  Green Tea
                </Link>
              </li>
              <li>
                <Link href="/shop/black-tea" className="text-white/70 hover:text-white font-sofia font-light transition-colors duration-200">
                  Black Tea
                </Link>
              </li>
              <li>
                <Link href="/shop/herbal-tea" className="text-white/70 hover:text-white font-sofia font-light transition-colors duration-200">
                  Herbal Tea
                </Link>
              </li>
              <li>
                <Link href="/shop/gift-sets" className="text-white/70 hover:text-white font-sofia font-light transition-colors duration-200">
                  Gift Sets
                </Link>
              </li>
            </ul>
          </div>

          {/* About Links */}
          <div>
            <h3 className="font-recoleta text-lg mb-6 text-white">About</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-white/70 hover:text-white font-sofia font-light transition-colors duration-200">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/sustainability" className="text-white/70 hover:text-white font-sofia font-light transition-colors duration-200">
                  Sustainability
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-white/70 hover:text-white font-sofia font-light transition-colors duration-200">
                  Tea Blog
                </Link>
              </li>
              <li>
                <Link href="/wholesale" className="text-white/70 hover:text-white font-sofia font-light transition-colors duration-200">
                  Wholesale
                </Link>
              </li>
              <li>
                <Link href="/locations" className="text-white/70 hover:text-white font-sofia font-light transition-colors duration-200">
                  Store Locations
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-recoleta text-lg mb-6 text-white">Help</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/contact" className="text-white/70 hover:text-white font-sofia font-light transition-colors duration-200">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-white/70 hover:text-white font-sofia font-light transition-colors duration-200">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-white/70 hover:text-white font-sofia font-light transition-colors duration-200">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-white/70 hover:text-white font-sofia font-light transition-colors duration-200">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/track-order" className="text-white/70 hover:text-white font-sofia font-light transition-colors duration-200">
                  Track Order
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-12 pt-12 border-t border-white/10">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="font-recoleta text-2xl mb-4 text-white">Stay Connected</h3>
            <p className="text-white/70 font-sofia font-light mb-6">
              Subscribe to receive exclusive offers and be the first to know about new tea arrivals
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-md bg-white/10 backdrop-blur-sm placeholder-white/50 text-white focus:outline-none focus:ring-2 focus:ring-peach font-sofia"
              />
              <button
                type="submit"
                className="px-8 py-3 rounded-md font-sofia font-bold transition-all duration-200 hover:scale-105"
                style={{ backgroundColor: 'var(--color-coral)', color: 'white' }}
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10" style={{ backgroundColor: 'var(--color-surenitea-800)' }}>
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/60 text-sm font-sofia font-light mb-4 md:mb-0">
              &copy; {currentYear} Surenitea. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-6 text-sm">
              <Link href="/privacy" className="text-white/60 hover:text-white font-sofia font-light transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-white/60 hover:text-white font-sofia font-light transition-colors duration-200">
                Terms of Service
              </Link>
              <Link href="/accessibility" className="text-white/60 hover:text-white font-sofia font-light transition-colors duration-200">
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
