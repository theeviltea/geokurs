import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { TabBar } from './components/TabBar';
import { NotFoundPage, OfflinePage, PageErrorBoundary, ServerErrorPage, useOffline } from './components/errors/SystemPage';
import { Toaster } from './components/Toaster';
import { Category } from './pages/Category';
import { Home } from './pages/Home';
import { NewsPage } from './pages/NewsPage';
import { Product } from './pages/Product';
import { PromoPage } from './pages/PromoPage';
import { PromosPage } from './pages/PromosPage';
import { ServicesPage } from './pages/ServicesPage';
import { DemoServicePage, EducationPage, PilotPage, RentPage, TradeInPage } from './pages/ServiceExtraPages';
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
import { GnssBrandsPage } from './pages/GnssBrandsPage';
import { AboutPage } from './pages/AboutPage';
import { CreditPage, DeliveryPage, MetrologyHelpPage, PaymentPage, RequisitesPage, ServiceHelpPage, WarrantyPage } from './pages/HelpPages';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export function App() {
  const { pathname } = useLocation();
  const [offline, recheck] = useOffline();
  return (
    <>
      <ScrollToTop />
      <Header />
      <Toaster />
      {offline ? <OfflinePage onRetry={recheck} /> : (
      <PageErrorBoundary resetKey={pathname}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog/gnss-oborudovanie" element={<Category />} />
        <Route path="/catalog/gnss-oborudovanie/priemniki" element={<GnssBrandsPage />} />
        <Route path="/product/:slug" element={<Product />} />
        <Route path="/news/novaya-bazovaya-stanciya-v-zhezkazgane" element={<NewsPage />} />
        <Route path="/promo" element={<PromosPage />} />
        <Route path="/promo/baza-rover" element={<PromoPage />} />
        <Route path="/login" element={<AuthPage mode="login" />} />
        <Route path="/register" element={<AuthPage mode="register" />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/compare" element={<ComparePage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/catalog/s/:key" element={<CatalogSectionPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/base-stations" element={<BaseStationsPage />} />
        <Route path="/services/repair" element={<ServiceCenterPage />} />
        <Route path="/services/support" element={<SupportPage />} />
        <Route path="/services/metrology" element={<MetrologyPage />} />
        <Route path="/services/trade-in" element={<TradeInPage />} />
        <Route path="/services/rent" element={<RentPage />} />
        <Route path="/services/education" element={<EducationPage />} />
        <Route path="/services/demo" element={<DemoServicePage />} />
        <Route path="/services/pilot" element={<PilotPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/help/delivery" element={<DeliveryPage />} />
        <Route path="/help/payment" element={<PaymentPage />} />
        <Route path="/help/warranty" element={<WarrantyPage />} />
        <Route path="/help/credit" element={<CreditPage />} />
        <Route path="/help/metrology" element={<MetrologyHelpPage />} />
        <Route path="/help/service" element={<ServiceHelpPage />} />
        <Route path="/help/metrology-service" element={<Navigate to="/help/metrology" replace />} />
        <Route path="/help/requisites" element={<RequisitesPage />} />
        <Route path="/500" element={<ServerErrorPage />} />
        <Route path="/offline" element={<OfflinePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      </PageErrorBoundary>
      )}
      <Footer />
      <TabBar />
    </>
  );
}
