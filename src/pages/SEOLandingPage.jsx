import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { setPageMeta, setJsonLd, removeJsonLd, buildFaqSchema, buildBreadcrumbSchema } from '../utils/seo';
import { SEO_LANDING_PAGES } from '../data/seoLandingPages';
import { 
  ArrowRight, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  MessageSquare, 
  Shield, 
  Award, 
  HelpCircle, 
  Layers, 
  Sparkles,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';
import NotFoundPage from './NotFoundPage';

const SEOLandingPage = ({ slug: propSlug }) => {
  const { slug: paramSlug } = useParams();
  const currentSlug = propSlug || paramSlug;
  const pageData = SEO_LANDING_PAGES[currentSlug];

  const [openFaqs, setOpenFaqs] = useState({});

  const toggleFaq = (index) => {
    setOpenFaqs(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  useEffect(() => {
    if (!pageData) return;

    // Set page title, description, and canonical link
    setPageMeta({
      title: pageData.title,
      description: pageData.description,
      canonicalPath: pageData.canonicalPath
    });

    // Inject JSON-LD structured data for FAQ and Breadcrumbs
    setJsonLd(`ld-faq-${currentSlug}`, buildFaqSchema(pageData.faqs));
    setJsonLd(`ld-crumbs-${currentSlug}`, buildBreadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: pageData.h1, path: pageData.canonicalPath }
    ]));

    // Scroll to top on page mount/change
    window.scrollTo(0, 0);

    return () => {
      removeJsonLd(`ld-faq-${currentSlug}`);
      removeJsonLd(`ld-crumbs-${currentSlug}`);
    };
  }, [currentSlug, pageData]);

  if (!pageData) {
    return <NotFoundPage />;
  }

  const paragraphs = pageData.intro.split('\n\n').filter(Boolean);

  return (
    <div className="bg-cream min-h-screen font-body text-navy selection:bg-gold/30 selection:text-navy">
      {/* Dynamic Header/Hero Banner */}
      <section 
        className="relative pt-32 pb-24 md:py-40 text-white overflow-hidden transition-all duration-500"
        style={{
          background: `linear-gradient(135deg, ${pageData.accentColor || '#0f1b2d'} 0%, #0f1b2d 100%)`
        }}
      >
        {/* Abstract background graphics */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]"></div>
        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-gold/10 rounded-full blur-[120px] -mr-40 -mt-40"></div>
        <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-white/5 rounded-full blur-[100px] -ml-40 -mb-40"></div>

        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          <nav className="flex items-center gap-2 text-xs text-white/50 mb-8 uppercase tracking-wider font-semibold">
            <Link to="/" className="hover:text-gold transition-colors">Home</Link>
            <span className="text-white/30">/</span>
            <span className="text-white">{pageData.badge}</span>
          </nav>

          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-8">
              {/* Category Badge */}
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2.5 px-4.5 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md mb-6"
              >
                <span className="text-lg">{pageData.icon}</span>
                <span className="text-gold uppercase tracking-widest text-[10px] font-bold">{pageData.badge}</span>
              </motion.div>

              {/* Main Heading */}
              <motion.h1 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
              >
                {pageData.h1}
              </motion.h1>

              {/* H1 Subheading */}
              <motion.p 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg md:text-xl text-white/80 max-w-2xl font-light mb-10 leading-relaxed"
              >
                {pageData.h1Sub}
              </motion.p>

              {/* CTA Actions */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center"
              >
                <Link 
                  to="/get-quote" 
                  className="bg-gold hover:bg-white text-navy font-bold py-4 px-10 rounded-full transition-all duration-300 text-center shadow-lg hover:shadow-gold/20 flex items-center justify-center gap-2"
                >
                  Request Bulk Quote <ArrowRight className="w-4 h-4" />
                </Link>
                <Link 
                  to="/products" 
                  className="border border-white/30 text-white hover:bg-white/10 font-bold py-4 px-8 rounded-full transition-all duration-300 text-center"
                >
                  Explore Catalogue
                </Link>
              </motion.div>
            </div>

            {/* Accent Side Card */}
            <div className="lg:col-span-4 hidden lg:block">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, type: 'spring', stiffness: 80 }}
                className="bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl p-8 shadow-2xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gold/10 rounded-full blur-2xl"></div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-gold/20 flex items-center justify-center text-gold text-2xl font-bold">CT</div>
                  <div>
                    <h3 className="font-bold text-white text-sm">Colour Tribe</h3>
                    <p className="text-[10px] text-white/50 uppercase tracking-widest font-semibold">Verified B2B Supplier</p>
                  </div>
                </div>
                
                <ul className="space-y-4 text-sm text-white/80 mb-6">
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                    <span>Low MOQ: Just 10 Pcs</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                    <span>In-House Manufacturing</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                    <span>GST B2B Invoicing</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                    <span>Pan-India Doorstep Delivery</span>
                  </li>
                </ul>

                <a 
                  href={`https://wa.me/919717355779?text=Hi, I would like to get a quote for ${pageData.h1}`}
                  target="_blank" 
                  rel="noreferrer" 
                  className="w-full bg-white/10 hover:bg-white/20 text-white font-bold py-3.5 px-4 rounded-xl transition-all block text-center text-sm border border-white/10"
                >
                  Quick Inquiry (WhatsApp)
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content & Intro */}
      <section className="py-20 bg-cream">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* Intro text */}
            <div className="lg:col-span-8">
              <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100/60 mb-12">
                <h2 className="font-display text-2xl md:text-3xl font-bold text-navy mb-6">Premium Manufacturing Quality</h2>
                <div className="space-y-6 text-gray-600 leading-relaxed text-base md:text-lg">
                  {paragraphs.map((p, index) => (
                    <p key={index}>{p}</p>
                  ))}
                </div>
              </div>

              {/* Products Section */}
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-8 w-1.5 rounded-full bg-gold"></div>
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-navy">Featured Departmental Uniforms</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {pageData.products.map((product, idx) => (
                    <motion.div 
                      key={product.name}
                      whileHover={{ y: -5 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      className="bg-white p-6.5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-gold/30 transition-all duration-300 flex gap-4"
                    >
                      <div className="text-4xl bg-cream/80 w-14 h-14 rounded-xl flex items-center justify-center shrink-0 shadow-inner">
                        {product.icon}
                      </div>
                      <div>
                        <h3 className="font-bold text-navy text-lg mb-2">{product.name}</h3>
                        <p className="text-sm text-gray-500 leading-relaxed">{product.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Why Us Sidebar */}
            <div className="lg:col-span-4 sticky top-28">
              <div className="bg-navy text-white rounded-3xl p-8 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-gold/10 rounded-full blur-3xl"></div>
                <h3 className="font-display text-xl md:text-2xl font-bold mb-6 text-gold flex items-center gap-2">
                  <Sparkles className="w-5 h-5" /> Why Choose Us
                </h3>
                
                <div className="space-y-6">
                  {pageData.whyUs.map((item, idx) => (
                    <div key={idx} className="border-b border-white/10 pb-5 last:border-0 last:pb-0">
                      <h4 className="font-bold text-white text-base mb-2 flex items-start gap-2.5">
                        <span className="text-gold font-mono font-bold text-sm">0{idx + 1}.</span>
                        {item.title}
                      </h4>
                      <p className="text-sm text-white/70 leading-relaxed pl-6">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fabrics & Customization Details */}
      <section className="py-20 bg-cream border-t border-gray-100">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl p-8 md:p-10 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-gold/10 flex items-center justify-center text-gold mb-6">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="font-display text-2xl font-bold text-navy mb-4">Fabric Specifications</h3>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                {pageData.fabrics}
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 md:p-10 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-gold/10 flex items-center justify-center text-gold mb-6">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-display text-2xl font-bold text-navy mb-4">Bespoke Customization</h3>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                {pageData.customization}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-cream border-t border-gray-100">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-12">
            <HelpCircle className="w-10 h-10 text-gold mx-auto mb-4" />
            <h2 className="font-display text-3xl md:text-4xl font-bold text-navy mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 max-w-lg mx-auto">
              Everything you need to know about purchasing and customizing your {pageData.badge.toLowerCase()} uniforms.
            </p>
          </div>

          <div className="space-y-4">
            {pageData.faqs.map((faq, index) => {
              const isOpen = !!openFaqs[index];
              return (
                <div 
                  key={index} 
                  className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm transition-all duration-300 hover:border-gold/30"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between text-left p-6 font-bold text-navy focus:outline-none"
                  >
                    <span className="text-base md:text-lg pr-4">{faq.q}</span>
                    <span className="shrink-0 text-gold p-1 bg-cream rounded-full transition-transform duration-300">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                      >
                        <div className="px-6 pb-6 pt-2 border-t border-gray-50 text-gray-600 text-sm md:text-base leading-relaxed">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Related Pages Section */}
      {pageData.relatedPages && pageData.relatedPages.length > 0 && (
        <section className="py-20 bg-cream border-t border-gray-100">
          <div className="container mx-auto px-6 max-w-6xl">
            <h3 className="font-display text-2xl font-bold text-navy mb-8 text-center">Other Industry Segments We Serve</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {pageData.relatedPages.map((related, idx) => (
                <Link 
                  key={related.href} 
                  to={related.href} 
                  className="bg-white hover:bg-navy p-6 rounded-2xl border border-gray-100 hover:border-navy text-center shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col items-center justify-center gap-3"
                >
                  <span className="text-4xl group-hover:scale-110 transition-transform duration-300">{related.icon}</span>
                  <span className="font-bold text-navy group-hover:text-white transition-colors text-sm md:text-base">{related.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA Block */}
      <section className="py-16 bg-navy text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl"></div>
        <div className="container mx-auto px-6 max-w-5xl text-center relative z-10">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Ready to Outfit Your Entire Roster?</h2>
          <p className="text-white/75 max-w-xl mx-auto mb-8 text-sm md:text-base">
            Get premium, custom-embroidered uniforms delivered direct to your facility. Talk to our designers today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              to="/get-quote" 
              className="bg-gold text-navy hover:bg-white hover:text-navy font-bold py-4 px-10 rounded-full transition-all duration-300 shadow-lg text-center"
            >
              Get Custom Bulk Quote
            </Link>
            <a 
              href="https://wa.me/919717355779?text=Hi, I would like to make a bulk uniform enquiry." 
              target="_blank" 
              rel="noreferrer" 
              className="border border-white/20 text-white hover:bg-white/10 font-bold py-4 px-8 rounded-full transition-all duration-300 flex items-center justify-center gap-2 text-center"
            >
              <MessageSquare className="w-5 h-5 text-gold" /> Chat on WhatsApp
            </a>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto mt-16 pt-8 border-t border-white/10 text-white/50 text-xs">
            <div className="flex flex-col items-center gap-2">
              <Phone className="w-4 h-4 text-gold" />
              <span>+91 97173 55779</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Mail className="w-4 h-4 text-gold" />
              <span>adorabletradingk08@gmail.com</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <MapPin className="w-4 h-4 text-gold" />
              <span>KH 58, Tigri Gol Chakkar, Greater Noida</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SEOLandingPage;
