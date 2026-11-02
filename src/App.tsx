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
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
      <TabBar />
    </>
  );
}
