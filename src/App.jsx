import React, { Suspense, lazy } from 'react';
import { Routes, Route, Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import NavBar from './components/layout/NavBar';
import Footer from './components/layout/Footer';

// Lazy loaded pages for performance optimization
const HomePage = lazy(() => import('./pages/HomePage'));
const CataloguePage = lazy(() => import('./pages/CataloguePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const ProductPage = lazy(() => import('./pages/ProductPage'));
const QuotePage = lazy(() => import('./pages/QuotePage'));

// Admin pages
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const AdminLayout = lazy(() => import('./components/admin/AdminLayout'));
const ProtectedRoute = lazy(() => import('./components/admin/ProtectedRoute'));
const Dashboard = lazy(() => import('./pages/admin/Dashboard'));
const ProductsManager = lazy(() => import('./pages/admin/ProductsManager'));
const QuotesManager = lazy(() => import('./pages/admin/QuotesManager'));

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-cream">
    <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.4, ease: "easeOut" }}
    className="w-full h-full"
  >
    {children}
  </motion.div>
);

const Layout = () => {
  const location = useLocation();
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <PageTransition key={location.pathname}>
            <Outlet />
          </PageTransition>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <Suspense fallback={<PageLoader />}>
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
        </Route>

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="products" element={<ProductsManager />} />
            <Route path="quotes" element={<QuotesManager />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
