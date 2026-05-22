'use client';

import Image from "next/image";
import Carousel from "@/components/Carousel";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function Home() {
  const servicesReveal = useScrollReveal();
  const aboutTextReveal = useScrollReveal();
  const aboutImageReveal = useScrollReveal();
  const portfolioReveal = useScrollReveal();

  return (
    <main>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-sage/20 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="font-serif text-2xl text-charcoal">Aidan Collins</h1>
            <div className="hidden md:flex gap-8 text-charcoal">
              <a href="#services" className="hover:text-darkgreen transition-colors font-medium">Services</a>
              <a href="#about" className="hover:text-darkgreen transition-colors font-medium">About</a>
              <a href="#portfolio" className="hover:text-darkgreen transition-colors font-medium">Portfolio</a>
              <a href="#contact" className="hover:text-darkgreen transition-colors font-medium">Contact</a>
            </div>
            <a
              href="#contact"
              className="bg-darkgreen text-white px-6 py-2 rounded-full hover:bg-darkgreen/90 transition-colors font-medium"
            >
              Book Now
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/IMG_8324.jpeg"
            alt="Luxury charcuterie board"
            fill
            className="object-cover brightness-[0.35]"
            priority
            quality={90}
            sizes="100vw"
          />
        </div>
        <div className="relative z-10 text-center text-white max-w-4xl px-6">
          <h2 className="font-serif text-5xl md:text-7xl mb-6 text-balance leading-tight">
            Elevate Your Celebration with Handcrafted Charcuterie
          </h2>
          <p className="text-xl md:text-2xl mb-8 text-balance opacity-95 font-light">
            Luxury grazing tables and artisan boards for weddings and special events in Seattle
          </p>
          <a
            href="#contact"
            className="inline-block bg-gold text-charcoal px-10 py-4 rounded-full text-lg font-semibold hover:bg-gold/90 transition-all shadow-lg hover:shadow-xl"
          >
            Schedule a Consultation
          </a>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-5xl md:text-6xl text-center mb-4 text-charcoal">Services</h2>
          <p className="text-center text-lg text-charcoal/70 mb-16 max-w-2xl mx-auto">
            From intimate gatherings to grand celebrations, each experience is thoughtfully crafted with premium ingredients and artistic presentation.
          </p>
          <div ref={servicesReveal.elementRef} className="grid md:grid-cols-2 gap-12">
            <div className={`space-y-4 fade-up ${servicesReveal.isVisible ? 'revealed' : ''}`}>
              <Carousel
                images={[
                  "/images/IMG_8324.jpeg",
                  "/images/IMG_3681.jpeg",
                  "/images/IMG_3682.jpeg",
                  "/images/IMG_3683.jpeg",
                  "/images/IMG_3684.jpeg",
                  "/images/IMG_5698.jpeg",
                ]}
                alt="Wedding grazing table"
              />
              <h3 className="font-serif text-3xl text-charcoal">Weddings & Receptions</h3>
              <p className="text-lg text-charcoal/80 leading-relaxed">
                Create unforgettable moments with custom grazing tables designed for your special day. Serving intimate gatherings to grand celebrations up to 200 guests.
              </p>
            </div>

            <div className={`space-y-4 fade-up ${servicesReveal.isVisible ? 'revealed' : ''}`}>
              <Carousel
                images={[
                  "/images/IMG_3589.jpeg",
                  "/images/IMG_1396.jpeg",
                  "/images/IMG_2476.jpeg",
                  "/images/IMG_5232.jpeg",
                ]}
                alt="Corporate event charcuterie"
              />
              <h3 className="font-serif text-3xl text-charcoal">Corporate & Private Events</h3>
              <p className="text-lg text-charcoal/80 leading-relaxed">
                Impress clients and guests with sophisticated charcuterie displays perfect for cocktail receptions, private dinners, and corporate functions.
              </p>
            </div>

            <div className={`space-y-4 fade-up ${servicesReveal.isVisible ? 'revealed' : ''}`}>
              <Carousel
                images={[
                  "/images/IMG_1772.jpeg",
                  "/images/IMG_1773.jpeg",
                  "/images/IMG_2001.jpeg",
                  "/images/IMG_2026.jpeg",
                  "/images/IMG_3552.jpeg",
                  "/images/IMG_3553.jpeg",
                ]}
                alt="Artisan charcuterie board"
              />
              <h3 className="font-serif text-3xl text-charcoal">Custom Charcuterie Boards</h3>
              <p className="text-lg text-charcoal/80 leading-relaxed">
                Handcrafted boards featuring premium meats, artisan cheeses, seasonal fruits, and house-made accompaniments tailored to your preferences.
              </p>
            </div>

            <div className={`space-y-4 fade-up ${servicesReveal.isVisible ? 'revealed' : ''}`}>
              <Carousel
                images={[
                  "/images/IMG_8517.jpeg",
                  "/images/IMG_1214.jpeg",
                  "/images/IMG_1327.jpeg",
                  "/images/IMG_4760.jpeg",
                  "/images/IMG_1275.jpeg",
                  "/images/IMG_8632.jpeg",
                ]}
                alt="Desserts and tarts"
              />
              <h3 className="font-serif text-3xl text-charcoal">Desserts & Pastries</h3>
              <p className="text-lg text-charcoal/80 leading-relaxed">
                Complete your event with elegant tarts and desserts crafted with the same attention to detail and quality as our charcuterie offerings.
              </p>
            </div>
          </div>
          <div className="mt-20 text-center bg-cream p-12 rounded-2xl">
            <p className="text-2xl text-charcoal mb-3">
              Investment: <span className="font-serif font-semibold text-darkgreen text-3xl">$20-35</span> <span className="text-xl">per person</span>
            </p>
            <p className="text-charcoal/70 text-lg">
              Custom quotes available based on your event size and menu preferences
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 bg-cream">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div ref={aboutTextReveal.elementRef} className={`space-y-6 fade-left ${aboutTextReveal.isVisible ? 'revealed' : ''}`}>
              <h2 className="font-serif text-5xl md:text-6xl text-charcoal">Meet Aidan</h2>
              <p className="text-lg text-charcoal/80 leading-relaxed">
                Hello! I'm Aidan Collins, a Seattle-based chef passionate about creating beautiful, delicious experiences for your most important moments.
              </p>
              <p className="text-lg text-charcoal/80 leading-relaxed">
                With 6 years in fine dining and experience as a sous chef, I've had the privilege of executing hundreds of weddings, private dinners, and luxury catered events. Now, as I pursue my Master's in Nutrition, I'm bringing my expertise to custom charcuterie experiences.
              </p>
              <p className="text-lg text-charcoal/80 leading-relaxed">
                Every board and grazing table I create is thoughtfully curated with premium ingredients and artistic presentation. From your initial consultation through the final toast, I'm committed to making your celebration delicious and completely stress-free.
              </p>
              <div className="flex flex-col gap-3 text-charcoal/80 pt-4">
                <p className="flex items-center gap-3">
                  <span className="text-darkgreen text-xl">✓</span>
                  <span className="font-medium">6 years fine dining experience</span>
                </p>
                <p className="flex items-center gap-3">
                  <span className="text-darkgreen text-xl">✓</span>
                  <span className="font-medium">Former sous chef</span>
                </p>
                <p className="flex items-center gap-3">
                  <span className="text-darkgreen text-xl">✓</span>
                  <span className="font-medium">Hundreds of events catered</span>
                </p>
                <p className="flex items-center gap-3">
                  <span className="text-darkgreen text-xl">✓</span>
                  <span className="font-medium">Serving Seattle & surrounding areas</span>
                </p>
              </div>
            </div>
            <div ref={aboutImageReveal.elementRef} className={`relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl fade-right ${aboutImageReveal.isVisible ? 'revealed' : ''}`}>
              <Image
                src="/images/IMG_3519.jpeg"
                alt="Fine dining plated dish by Chef Aidan Collins"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={85}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Gallery */}
      <section id="portfolio" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-serif text-5xl md:text-6xl text-center mb-4 text-charcoal">Portfolio</h2>
          <p className="text-center text-lg text-charcoal/70 mb-16 max-w-2xl mx-auto">
            A showcase of recent work, from elegant wedding boards to stunning grazing tables
          </p>
          <div ref={portfolioReveal.elementRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              "IMG_1326.jpeg",
              "IMG_1328.jpeg",
              "IMG_1690.jpeg",
              "IMG_2722.jpeg",
              "IMG_2721.jpeg",
              "IMG_3586.jpeg",
              "IMG_3599.jpeg",
              "IMG_3671.jpeg",
              "IMG_3754.jpeg",
              "IMG_3781.jpeg",
              "IMG_3807.jpeg",
              "IMG_4424.jpeg",
              "IMG_4704.jpeg",
              "IMG_4761.jpeg",
              "IMG_4827.jpeg",
              "IMG_5560.jpeg",
              "IMG_5699.jpeg",
              "IMG_5700.jpeg",
              "IMG_5702.jpeg",
              "IMG_5903.jpeg",
              "IMG_8325.jpeg",
              "IMG_8486.jpeg",
              "IMG_8488.jpeg",
              "IMG_8489.jpeg",
              "IMG_8633.jpeg",
              "IMG_8634.jpeg",
              "IMG_8635.jpeg",
              "IMG_8636.jpeg",
              "IMG_8637.jpeg",
              "IMG_8638.jpeg",
              "IMG_8639.jpeg",
              "IMG_8641.jpeg",
            ].map((img, i) => (
              <div key={i} className={`relative aspect-square rounded-lg overflow-hidden group cursor-pointer shadow-md hover:shadow-xl transition-shadow fade-scale ${portfolioReveal.isVisible ? 'revealed' : ''}`}>
                <Image
                  src={`/images/${img}`}
                  alt={`Portfolio image ${i + 1}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  quality={80}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 bg-gradient-to-br from-cream to-sage/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-5xl md:text-6xl mb-6 text-charcoal">Let's Create Something Beautiful</h2>
          <p className="text-xl text-charcoal/80 mb-12 max-w-2xl mx-auto leading-relaxed">
            I'd love to discuss your vision and show you what I can create for your special day.
            Reach out to schedule a consultation and let's make your event truly memorable.
          </p>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-10 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-darkgreen/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-darkgreen" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-serif text-2xl mb-4 text-charcoal">Email</h3>
              <a
                href="mailto:aidancollins17@gmail.com"
                className="text-lg text-darkgreen hover:text-sage transition-colors font-medium"
              >
                aidancollins17@gmail.com
              </a>
            </div>
            <div className="bg-white p-10 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-darkgreen/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-darkgreen" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="font-serif text-2xl mb-4 text-charcoal">Phone</h3>
              <a
                href="tel:+12482479183"
                className="text-lg text-darkgreen hover:text-sage transition-colors font-medium"
              >
                (248) 247-9183
              </a>
            </div>
          </div>
          <div className="bg-white p-10 rounded-2xl shadow-lg">
            <div className="w-16 h-16 bg-darkgreen/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-darkgreen" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="font-serif text-2xl mb-4 text-charcoal">Service Area</h3>
            <p className="text-lg text-charcoal/80">
              Proudly serving <span className="font-semibold text-darkgreen">Seattle, Washington</span> and surrounding areas
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-charcoal text-white py-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="font-serif text-3xl mb-3">Aidan Collins</h3>
          <p className="text-white/70 mb-6 text-lg">Luxury Wedding Charcuterie & Catering</p>
          <div className="flex justify-center gap-8 mb-8 flex-wrap">
            <a href="#services" className="hover:text-gold transition-colors">Services</a>
            <a href="#about" className="hover:text-gold transition-colors">About</a>
            <a href="#portfolio" className="hover:text-gold transition-colors">Portfolio</a>
            <a href="#contact" className="hover:text-gold transition-colors">Contact</a>
          </div>
          <div className="text-white/50 text-sm">
            © {new Date().getFullYear()} Aidan Collins. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}
