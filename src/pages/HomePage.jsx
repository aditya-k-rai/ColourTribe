import React from 'react';
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

const HomePage = () => {
  return (
    <div className="w-full flex justify-center">
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
