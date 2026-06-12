import React, { Suspense, lazy } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import NavBar from './components/layout/NavBar';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/layout/ScrollToTop';

// Lazy loaded pages for performance optimization
const HomePage = lazy(() => import('./pages/HomePage'));
const CataloguePage = lazy(() => import('./pages/CataloguePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const ProductPage = lazy(() => import('./pages/ProductPage'));
const QuotePage = lazy(() => import('./pages/QuotePage'));
const CityLandingPage = lazy(() => import('./pages/CityLandingPage'));
const MaterialGuidePage = lazy(() => import('./pages/MaterialGuidePage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const SEOLandingPage = lazy(() => import('./pages/SEOLandingPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

// Admin pages
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const AdminLayout = lazy(() => import('./components/admin/AdminLayout'));
const ProtectedRoute = lazy(() => import('./components/admin/ProtectedRoute'));
const Dashboard = lazy(() => import('./pages/admin/Dashboard'));
const ProductsManager = lazy(() => import('./pages/admin/ProductsManager'));
const QuotesManager = lazy(() => import('./pages/admin/QuotesManager'));
const CustomersManager = lazy(() => import('./pages/admin/CustomersManager'));
const SettingsManager = lazy(() => import('./pages/admin/SettingsManager'));

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-cream">
    <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
  </div>
);

/**
 * Layout — no animation key on the outlet wrapper.
 * React Router swaps <Outlet /> content internally without unmounting
 * the parent, so Suspense + lazy loading never causes a blank page.
 */
const Layout = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="flex flex-col min-h-screen">
      {/* Global Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gold origin-left z-[100]"
        style={{ scaleX }}
      />
      <NavBar />
      <main className="flex-grow">
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="products" element={<CataloguePage hub="products" />} />
          <Route path="products/:categorySlug" element={<CataloguePage hub="products" />} />
          <Route path="uniforms" element={<CataloguePage hub="uniforms" />} />
          <Route path="uniforms/:categorySlug" element={<CataloguePage hub="uniforms" />} />
          <Route path="industries" element={<CataloguePage hub="industries" />} />
          <Route path="industries/:categorySlug" element={<CataloguePage hub="industries" />} />
          <Route path="product/:sku" element={<ProductPage />} />
          <Route path="get-quote" element={<QuotePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="fabric-guide" element={<MaterialGuidePage />} />
          <Route path="uniform-manufacturer-in-:citySlug" element={<CityLandingPage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="blog/:slug" element={<BlogPage />} />
          
          {/* SEO Category Landing Pages */}
          <Route path="hotel-uniforms" element={<SEOLandingPage slug="hotel-uniforms" />} />
          <Route path="chef-uniforms" element={<SEOLandingPage slug="chef-uniforms" />} />
          <Route path="corporate-uniforms" element={<SEOLandingPage slug="corporate-uniforms" />} />
          <Route path="housekeeping-uniforms" element={<SEOLandingPage slug="housekeeping-uniforms" />} />
          <Route path="restaurant-uniforms" element={<SEOLandingPage slug="restaurant-uniforms" />} />
          <Route path="industrial-workwear" element={<SEOLandingPage slug="industrial-workwear" />} />

          <Route path="*" element={<NotFoundPage />} />
        </Route>

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="products" element={<ProductsManager />} />
            <Route path="quotes" element={<QuotesManager />} />
            <Route path="customers" element={<CustomersManager />} />
            <Route path="settings" element={<SettingsManager />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
