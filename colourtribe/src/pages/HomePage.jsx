import React, { useEffect } from 'react';
import { setPageMeta, setJsonLd, removeJsonLd, buildFaqSchema, ORGANIZATION_SCHEMA } from '../utils/seo';
import HeroSection from '../components/homepage/HeroSection';
import MarqueeStrip from '../components/homepage/MarqueeStrip';
import CategoriesShowcase from '../components/homepage/CategoriesShowcase';
import StatsBar from '../components/homepage/StatsBar';
import FeaturedProducts from '../components/homepage/FeaturedProducts';
import HowItWorks from '../components/homepage/HowItWorks';
import WhyChooseUs from '../components/homepage/WhyChooseUs';
import Testimonials from '../components/homepage/Testimonials';
import CTABand from '../components/homepage/CTABand';
import LeadModal from '../components/homepage/LeadModal';

const HOME_FAQS = [
  {
    q: 'What is the minimum order quantity at Colour Tribe?',
    a: 'The minimum order quantity is 10 pieces per design. Bulk discounts apply at 50+ and 100+ pieces.',
  },
  {
    q: 'Does Colour Tribe offer custom logo embroidery on uniforms?',
    a: 'Yes. All orders can include custom logo embroidery at no extra setup charge. Embroidery adds approximately 2 days to production.',
  },
  {
    q: 'Do you supply and deliver uniforms to Mumbai, Bangalore, and Delhi?',
    a: 'Absolutely. We are a top uniform manufacturer supplying all across India. We regularly deliver bulk corporate wear and hotel uniforms to Mumbai, Delhi, Bangalore, Chennai, and all other top 10 Indian cities.',
  },
  {
    q: 'What is the best fabric material for corporate uniforms and chef wear?',
    a: 'For corporate wear, Poly-Viscose is the best fabric as it offers a premium look while being highly durable and wrinkle-resistant. For chef coats and hospital scrubs, we recommend 100% Cotton or Terry Cotton (PC) for maximum breathability.',
  },
  {
    q: 'How long does delivery take for bulk uniform orders?',
    a: 'Standard production and delivery takes 7–10 days for orders under 100 pieces. Larger or customised orders may take up to 15 days.',
  },
];

const HomePage = () => {
  useEffect(() => {
    setPageMeta({
      title: 'Colour Tribe | Premium B2B Uniform Manufacturer in India',
      description:
        'Colour Tribe manufactures custom uniforms for hotels, restaurants, hospitals & corporates. Chef wear, housekeeping, corporate suits — factory-direct pricing, custom embroidery, pan-India delivery.',
    });
    setJsonLd('ld-home-faq', buildFaqSchema(HOME_FAQS));
    return () => removeJsonLd('ld-home-faq');
  }, []);

  return (
    <div className="w-full flex justify-center">
      {/* AEO: Visually-hidden FAQ block — crawlable by AI engines */}
      <div className="sr-only" aria-hidden="false" role="complementary">
        <h2>Frequently Asked Questions about Colour Tribe</h2>
        {HOME_FAQS.map(({ q, a }) => (
          <div key={q}>
            <h3>{q}</h3>
            <p>{a}</p>
          </div>
        ))}
      </div>

      <div className="w-full max-w-full overflow-hidden">
        <LeadModal />
        <HeroSection />
        <MarqueeStrip />
        <CategoriesShowcase />
        <StatsBar />
        <FeaturedProducts />
        <HowItWorks />
        <WhyChooseUs />
        <Testimonials />
        <CTABand />
      </div>
    </div>
  );
};

export default HomePage;
