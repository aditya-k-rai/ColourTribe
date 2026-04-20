import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    quote: "Colour Tribe completely transformed our front office and housekeeping look. The fabric quality handles daily washes beautifully.",
    author: "Hotel Royal",
    city: "New Delhi",
    stars: 5
  },
  {
    id: 2,
    quote: "Finding bulk chef coats that actually fit well was a challenge until we found them. Fast delivery and perfect custom embroidery.",
    author: "Spice Garden Restaurant",
    city: "Mumbai",
    stars: 5
  },
  {
    id: 3,
    quote: "We ordered 200 security uniforms. The price was unbeatable and the material is durable enough for tough shifts.",
    author: "SecureServe India",
    city: "Gurgaon",
    stars: 5
  },
  {
    id: 4,
    quote: "Excellent B2B service. They sent samples before production and accommodated our custom branding flawlessly.",
    author: "Grand Corporate Events",
    city: "Noida",
    stars: 5
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-navy py-24 text-white overflow-hidden relative">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto flex flex-col items-center text-center relative h-[320px] md:h-[280px]">
          
          <div className="text-gold opacity-20 relative w-full flex justify-center mb-6">
            <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="absolute top-20 w-full"
            >
              <p className="font-display text-2xl md:text-3xl italic mb-8 leading-snug">
                "{testimonials[currentIndex].quote}"
              </p>
              
              <div className="flex justify-center text-gold mb-2">
                {[...Array(testimonials[currentIndex].stars)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              
              <div className="text-white">
                <span className="font-bold tracking-wider">{testimonials[currentIndex].author}</span>
                <span className="text-white/50 text-sm ml-2">â€” {testimonials[currentIndex].city}</span>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="absolute bottom-0 flex gap-2 justify-center w-full">
            {testimonials.map((_, i) => (
              <button 
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${i === currentIndex ? 'bg-gold w-6' : 'bg-white/30 hover:bg-white/50'}`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
