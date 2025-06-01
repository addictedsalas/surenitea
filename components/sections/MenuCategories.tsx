'use client';

import { useState } from 'react';
import Image from 'next/image';

interface MenuItem {
  name: string;
  description?: string;
  price: string;
  isNew?: boolean;
  isSpecial?: boolean;
}

interface MenuCategory {
  id: string;
  name: string;
  items: MenuItem[];
}

const menuData: MenuCategory[] = [
  {
    id: 'teas',
    name: 'Surenitea\'s Farmacy',
    items: [
      {
        name: 'Mitragyna Speciosa',
        description: 'A tropical tree native to Southeast Asia with traditional wellness benefits',
        price: '15.00'
      },
      {
        name: 'Superhuman Protocol',
        description: 'Choose your feeling - Enhanced energy, focus, and wellness',
        price: '20.00'
      },
      {
        name: 'Kaviar Teflon',
        description: 'Formulated with mitragynine, Lava, Kava, Ashwagandha',
        price: '15.00'
      },
      {
        name: 'Kaviar Rose',
        description: 'Formulated with mitragynine, Lava, Kava, Ashwagandha',
        price: '15.00'
      },
      {
        name: 'Kaviar Matcha',
        description: 'Formulated with mitragynine, Lava, Kava, Ashwagandha',
        price: '15.00'
      }
    ]
  },
  {
    id: 'kava',
    name: 'Kava Root',
    items: [
      {
        name: 'Kava Ceremonial',
        description: 'VANUATU CEREMONIAL - Regarded as the finest piece of kava',
        price: '16.00/78.00'
      },
      {
        name: 'Tongan',
        description: 'Sourced from the most exclusive locations',
        price: '16.00/78.00'
      },
      {
        name: 'Kava Matcha',
        description: 'Recovery milk matcha, kava ceremonial',
        price: '16.00'
      },
      {
        name: 'Kava Nutella',
        description: 'Recovery milk, nutella, kava ceremonial',
        price: '16.00'
      },
      {
        name: 'Kava Coconut Mango Punch',
        description: 'Mango, coconut milk, raspberry, kava ceremonial',
        price: '17.00'
      },
      {
        name: 'Kava Raspberry Lychee',
        description: 'Lychee, raspberry, kava ceremonial',
        price: '17.00'
      }
    ]
  },
  {
    id: 'katsumoto',
    name: 'Katsumoto',
    items: [
      {
        name: 'Katsumoto',
        description: 'Mixed with Kaviar Superhuman Protocol',
        price: '20.00'
      }
    ]
  },
  {
    id: 'boosters',
    name: 'Boosters',
    items: [
      {
        name: 'Brain & Mental Health',
        description: "Lion's Mane - Enhance memory, mental and mental clarity",
        price: '5.00'
      },
      {
        name: 'Gut & Immune Health',
        description: 'Turkey Tail - Gut health and immune system support',
        price: '5.00'
      },
      {
        name: 'Sexual & Hormonal Health',
        description: 'Horny Goat Weed - Boost libido and sexual health',
        price: '5.00'
      },
      {
        name: 'Cardiovascular Health',
        description: 'Cordyceps - Supports heart and anti-inflammatory properties',
        price: '5.00'
      },
      {
        name: "Men's & Women's Health",
        description: 'Maca - Boosts male sexual performance and energy',
        price: '5.00'
      }
    ]
  },
  {
    id: 'coffee',
    name: 'Coffee & More',
    items: [
      {
        name: 'Mushroom Coffee',
        description: 'Bio Hacking ingredients all USDA Certified organic',
        price: '14.00'
      },
      {
        name: 'Matcha Drinks',
        description: 'Our matcha is sourced from Kagoshima, situated in a lush valley',
        price: '15.00'
      }
    ]
  }
];

export default function MenuCategories() {
  const [activeCategory, setActiveCategory] = useState('teas');

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center gap-2 mb-4">
            <span className="text-coral text-2xl">•</span>
            <span className="text-coral text-2xl">•</span>
            <span className="text-coral text-2xl">•</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-recoleta font-light text-surenitea-700 mb-4">
            EXPLORE OUR
          </h2>
          <h3 className="text-4xl md:text-5xl font-recoleta font-bold text-surenitea-700">
            Wellness <span className="text-coral">Menu</span>
          </h3>
        </div>

        {/* Order Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
          <a
            href="#"
            className="flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-black text-white font-sofia font-medium hover:bg-gray-800 transition-all transform hover:scale-105"
          >
            <Image
              src="/ubereatsicon.png"
              alt="Uber Eats"
              width={24}
              height={24}
              className="w-6 h-6"
            />
            Order on Uber Eats
          </a>
          <a
            href="#"
            className="flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#FF3008] text-white font-sofia font-medium hover:bg-[#E02A07] transition-all transform hover:scale-105"
          >
            <Image
              src="/doordashicon.png"
              alt="DoorDash"
              width={24}
              height={24}
              className="w-6 h-6"
            />
            Order on DoorDash
          </a>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {menuData.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-full font-sofia font-medium transition-all ${
                activeCategory === category.id
                  ? 'shadow-lg'
                  : 'border'
              }`}
              style={{
                backgroundColor: activeCategory === category.id ? '#FF6B6B' : '#FFFFFF',
                color: activeCategory === category.id ? '#FFFFFF' : '#2D5F3F',
                borderColor: activeCategory === category.id ? '#FF6B6B' : '#E5E7EB',
              }}
              onMouseEnter={(e) => {
                if (activeCategory !== category.id) {
                  e.currentTarget.style.backgroundColor = '#FF6B6B';
                  e.currentTarget.style.color = '#FFFFFF';
                  e.currentTarget.style.borderColor = '#FF6B6B';
                }
              }}
              onMouseLeave={(e) => {
                if (activeCategory !== category.id) {
                  e.currentTarget.style.backgroundColor = '#FFFFFF';
                  e.currentTarget.style.color = '#2D5F3F';
                  e.currentTarget.style.borderColor = '#E5E7EB';
                }
              }}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Menu Items */}
          <div className="space-y-6">
            {menuData
              .find(cat => cat.id === activeCategory)
              ?.items.map((item, index) => (
                <div key={index} className="border-b border-gray-200 pb-6 last:border-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-sofia font-semibold text-surenitea-700">
                          {item.name}
                        </h3>
                        {item.isNew && (
                          <span className="px-2 py-1 bg-coral text-white text-xs rounded-full">
                            NEW
                          </span>
                        )}
                        {item.isSpecial && (
                          <span className="px-2 py-1 bg-surenitea-500 text-white text-xs rounded-full">
                            SPECIAL
                          </span>
                        )}
                      </div>
                      {item.description && (
                        <p className="text-gray-600 text-sm font-sofia">{item.description}</p>
                      )}
                    </div>
                    <span className="text-xl font-bold text-coral ml-4 font-sofia">
                      ${item.price}
                    </span>
                  </div>
                </div>
              ))}
          </div>

          {/* Right Column - Images */}
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="relative h-48 rounded-lg overflow-hidden">
                <Image
                  src="/tea_selection.jpg"
                  alt="Tea selection"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-48 rounded-lg overflow-hidden">
                <Image
                  src="/premium_tea.jpg"
                  alt="Premium tea"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="relative h-64 rounded-lg overflow-hidden">
              <Image
                src="/kava-banner.png"
                alt="Wellness drinks"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Flavors Section */}
        <div className="mt-16 text-center bg-peach/10 rounded-2xl p-8">
          <h3 className="text-2xl font-recoleta font-bold text-surenitea-700 mb-4">
            Flavors
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto font-sofia">
            Raspberry • Hibiscus • Lavender • Watermelon • Cucumber • Sour Sop • Peach • 
            Grapefruit • Basil • Strawberry • Mango • Lychee
          </p>
        </div>

        {/* Footer Icons */}
        <div className="mt-12 flex justify-center gap-12">
          <div className="text-center">
            <div className="w-20 h-20 bg-coral/10 rounded-full flex items-center justify-center mb-3">
              <svg className="w-10 h-10 text-coral" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-sm font-sofia text-gray-600">0% Alcohol</p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 bg-coral/10 rounded-full flex items-center justify-center mb-3">
              <svg className="w-10 h-10 text-coral" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
              </svg>
            </div>
            <p className="text-sm font-sofia text-gray-600">Organic</p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 bg-coral/10 rounded-full flex items-center justify-center mb-3">
              <svg className="w-10 h-10 text-coral" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <p className="text-sm font-sofia text-gray-600">Premium</p>
          </div>
        </div>
      </div>
    </section>
  );
}
