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
    q: 'Which industries does Colour Tribe supply uniforms to?',
    a: 'Colour Tribe supplies uniforms to the hospitality, hotel & restaurant, healthcare, corporate, security, and industrial sectors across India.',
  },
  {
    q: 'How long does delivery take for bulk uniform orders?',
    a: 'Standard production and delivery takes 7–10 days for orders under 100 pieces. Larger or customised orders may take up to 15 days.',
  },
  {
    q: 'Does Colour Tribe deliver pan-India?',
    a: 'Yes. Colour Tribe ships to all major cities and towns across India directly from our manufacturing unit in Greater Noida, UP.',
  },
  {
    q: 'What fabric is used in Colour Tribe uniforms?',
    a: 'We primarily use a premium 65/35 polyviscose blend designed for durability and breathability. We also offer 100% cotton options for kitchen and chef wear.',
  },
];

const HomePage = () => {
  useEffect(() => {
    setPageMeta({
      title: 'B2B Uniform Manufacturer India | Colour Tribe',
      description:
        "India's factory-direct B2B uniform manufacturer. Hotel, chef, corporate & industrial uniforms. Custom logo embroidery. Min. 10 pcs. Pan-India delivery.",
      canonicalPath: '/',
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
