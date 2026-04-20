import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import NavBar from './components/layout/NavBar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import CataloguePage from './pages/CataloguePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ProductPage from './pages/ProductPage';
import QuotePage from './pages/QuotePage';
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './components/admin/AdminLayout';
import ProtectedRoute from './components/admin/ProtectedRoute';
import Dashboard from './pages/admin/Dashboard';
import ProductsManager from './pages/admin/ProductsManager';
import QuotesManager from './pages/admin/QuotesManager';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
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
  );
}

export default App;
