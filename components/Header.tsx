'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import CartSidebar from './CartSidebar';
import { getCart } from '@/lib/shopify';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const pathname = usePathname();

  // Check if we're on a product page
  const isProductPage = pathname?.startsWith('/shop/') && pathname !== '/shop';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    loadCartCount();

    const handleCartUpdate = () => {
      loadCartCount();
    };

    window.addEventListener('cartUpdated', handleCartUpdate);
    return () => window.removeEventListener('cartUpdated', handleCartUpdate);
  }, []);

  const loadCartCount = async () => {
    try {
      const cartId = localStorage.getItem('cartId');
      if (cartId) {
        const cart = await getCart(cartId);
        setCartItemsCount(cart.totalQuantity || 0);
      }
    } catch (error) {
      console.error('Error loading cart count:', error);
    }
  };

  const navLinks = [
    { href: '/shop', label: 'Shop' },
    { href: '/menu', label: 'Menu' },
    { href: '', label: 'Learn' },
    { href: '', label: 'Our Bar' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <>
      <header 
        className={`fixed top-0 w-full z-40 transition-all duration-500 ${
          isScrolled
            ? 'py-3 shadow-lg' 
            : 'py-6'
        }`}
        style={{
          backgroundColor: isScrolled || isProductPage ? 'var(--color-surenitea-700)' : 'transparent',
          backdropFilter: isScrolled || isProductPage ? 'none' : 'blur(8px)',
        }}
      >
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src="/surentiea-logo.png"
                alt="Surenitea"
                width={140}
                height={36}
                className={`h-9 w-auto transition-all duration-300 ${
                  isScrolled || isProductPage ? 'brightness-0 invert' : ''
                }`}
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <div key={link.href} className="relative group">
                  <Link
                    href={link.href}
                    className={`font-sofia font-regular text-sm tracking-wide transition-colors duration-200 flex items-center ${
                      isScrolled || isProductPage
                        ? 'text-white hover:text-peach'
                        : 'text-white hover:text-peach'
                    }`}
                  >
                    {link.label}
                  </Link>
                </div>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-6">
              {/* Search Icon */}
              <button
                className={`hidden lg:block transition-colors duration-200 ${
                  isScrolled || isProductPage ? 'text-white hover:text-peach' : 'text-white hover:text-peach'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              {/* Cart */}
              <button
                onClick={() => setIsCartOpen(true)}
                className={`relative transition-colors duration-200 ${
                  isScrolled || isProductPage ? 'text-white hover:text-peach' : 'text-white hover:text-peach'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {cartItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white"
                    style={{ backgroundColor: 'var(--color-coral)' }}
                  >
                    {cartItemsCount}
                  </span>
                )}
              </button>

              {/* Order Now Button */}
              <a
                href="https://order.surenitea.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden lg:block px-6 py-2 rounded-full font-sofia font-bold text-sm transition-all duration-200 hover:scale-105"
                style={{
                  backgroundColor: 'var(--color-peach)',
                  color: 'var(--color-surenitea-700)',
                }}
              >
                Order Now
              </a>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`lg:hidden transition-colors duration-200 ${
                  isScrolled || isProductPage ? 'text-white' : 'text-white'
                }`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={isMobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                  />
                </svg>
              </button>
            </div>
          </nav>

          {/* Mobile Menu */}
          <div
            className={`lg:hidden transition-all duration-300 overflow-hidden ${
              isMobileMenuOpen ? 'max-h-96 mt-4' : 'max-h-0'
            }`}
          >
            <div className="py-4 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block font-sofia text-white hover:text-peach transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="https://order.surenitea.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full px-6 py-3 rounded-full font-sofia font-bold text-center transition-all duration-200"
                style={{
                  backgroundColor: 'var(--color-peach)',
                  color: 'var(--color-surenitea-700)',
                }}
              >
                Order Now
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Cart Sidebar - Outside of header for proper positioning */}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
