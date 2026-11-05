import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { TabBar } from './components/TabBar';
import { Category } from './pages/Category';
import { Home } from './pages/Home';
import { NewsPage } from './pages/NewsPage';
import { Product } from './pages/Product';
import { PromoPage } from './pages/PromoPage';
import { AuthPage } from './pages/AuthPage';
import { AccountPage } from './pages/AccountPage';
import { CartPage } from './pages/CartPage';
import { ComparePage } from './pages/ComparePage';
import { CatalogPage, CatalogSectionPage } from './pages/CatalogPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { BaseStationsPage } from './pages/BaseStationsPage';
import { ServiceCenterPage } from './pages/ServiceCenterPage';
import { SupportPage } from './pages/SupportPage';
import { MetrologyPage } from './pages/MetrologyPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export function App() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog/gnss-oborudovanie" element={<Category />} />
        <Route path="/product/:slug" element={<Product />} />
        <Route path="/news/novaya-bazovaya-stanciya-v-zhezkazgane" element={<NewsPage />} />
        <Route path="/promo/baza-rover" element={<PromoPage />} />
        <Route path="/login" element={<AuthPage mode="login" />} />
        <Route path="/register" element={<AuthPage mode="register" />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/compare" element={<ComparePage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/catalog/s/:key" element={<CatalogSectionPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/services/base-stations" element={<BaseStationsPage />} />
        <Route path="/services/repair" element={<ServiceCenterPage />} />
        <Route path="/services/support" element={<SupportPage />} />
        <Route path="/services/metrology" element={<MetrologyPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
      <TabBar />
    </>
  );
}
