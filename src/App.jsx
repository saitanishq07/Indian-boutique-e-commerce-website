import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';

// Common Components
import Toast from './components/common/Toast';
import AnnouncementBar from './components/common/AnnouncementBar';
import Navbar from './components/common/Navbar';
import SearchModal from './components/common/SearchModal';
import Footer from './components/common/Footer';

// Customer Pages
import Home from './pages/customer/Home';
import Shop from './pages/customer/Shop';
import ProductDetail from './pages/customer/ProductDetail';
import Cart from './pages/customer/Cart';
import Checkout from './pages/customer/Checkout';
import OrderSuccess from './pages/customer/OrderSuccess';
import Wishlist from './pages/customer/Wishlist';
import Account from './pages/customer/Account';
import TrackOrder from './pages/customer/TrackOrder';
import Lookbook from './pages/customer/Lookbook';
import Journal from './pages/customer/Journal';
import About from './pages/customer/About';

// Admin Components & Pages
import AdminSidebar from './components/admin/AdminSidebar';
import AdminHeader from './components/admin/AdminHeader';
import AdminLogin from './pages/admin/AdminLogin';
import DashboardOverview from './pages/admin/DashboardOverview';
import ProductsAdmin from './pages/admin/ProductsAdmin';
import InventoryAdmin from './pages/admin/InventoryAdmin';
import OrdersAdmin from './pages/admin/OrdersAdmin';
import CustomersAdmin from './pages/admin/CustomersAdmin';
import CouponsAdmin from './pages/admin/CouponsAdmin';
import ReviewsAdmin from './pages/admin/ReviewsAdmin';
import CategoriesAdmin from './pages/admin/CategoriesAdmin';
import BannersAdmin from './pages/admin/BannersAdmin';
import ReportsAdmin from './pages/admin/ReportsAdmin';
import SettingsAdmin from './pages/admin/SettingsAdmin';

function MainApp() {
  const { isAdminLoggedIn, adminLogout } = useApp();
  
  // Navigation State
  const [currentPath, setCurrentPath] = useState(() => {
    return window.location.hash ? window.location.hash.replace('#', '') : '/';
  });

  const [completedOrder, setCompletedOrder] = useState(null);
  const [adminSidebarCollapsed, setAdminSidebarCollapsed] = useState(false);

  // Sync Hash with path
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      setCurrentPath(hash || '/');
      window.scrollTo(0, 0);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (path) => {
    window.location.hash = path;
    setCurrentPath(path);
    window.scrollTo(0, 0);
  };

  const isAdminRoute = currentPath.startsWith('/admin');

  // Parse path & params
  const [pathBase, queryString] = currentPath.split('?');
  const searchParams = new URLSearchParams(queryString || '');

  // Extract ID if path matches /product/:id
  const productMatch = pathBase.match(/^\/product\/(.+)$/);
  const productId = productMatch ? productMatch[1] : searchParams.get('id');

  // Admin Guard
  if (isAdminRoute && pathBase !== '/admin/login' && !isAdminLoggedIn) {
    return (
      <AppProvider>
        <AdminLogin onNavigate={navigate} />
        <Toast />
      </AppProvider>
    );
  }

  // Admin Interface Layout
  if (isAdminRoute && pathBase !== '/admin/login') {
    return (
      <div className="flex h-screen bg-slate-100 font-sans text-slate-800 overflow-hidden">
        <AdminSidebar
          currentPath={pathBase}
          onNavigate={navigate}
          onLogout={adminLogout}
          collapsed={adminSidebarCollapsed}
          setCollapsed={setAdminSidebarCollapsed}
        />

        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <AdminHeader onNavigate={navigate} />

          <main className="flex-1 overflow-y-auto p-6 sm:p-8">
            {pathBase === '/admin/dashboard' && <DashboardOverview onNavigate={navigate} />}
            {pathBase === '/admin/products' && (
              <ProductsAdmin
                onNavigate={navigate}
                editProductId={searchParams.get('edit')}
              />
            )}
            {pathBase === '/admin/products/new' && (
              <ProductsAdmin onNavigate={navigate} isNewMode={true} />
            )}
            {pathBase === '/admin/inventory' && <InventoryAdmin />}
            {pathBase === '/admin/orders' && (
              <OrdersAdmin initialOrderId={searchParams.get('id')} />
            )}
            {pathBase === '/admin/customers' && <CustomersAdmin />}
            {pathBase === '/admin/coupons' && <CouponsAdmin />}
            {pathBase === '/admin/reviews' && <ReviewsAdmin />}
            {pathBase === '/admin/categories' && <CategoriesAdmin />}
            {pathBase === '/admin/collections' && <CategoriesAdmin />}
            {pathBase === '/admin/banners' && <BannersAdmin />}
            {pathBase === '/admin/reports' && <ReportsAdmin />}
            {pathBase === '/admin/settings' && <SettingsAdmin />}
            {pathBase === '/admin' && <DashboardOverview onNavigate={navigate} />}
          </main>

          <footer className="h-10 border-t border-slate-200 bg-white px-6 flex items-center justify-between text-[11px] text-slate-500">
            <span>AAVANI Boutique Business Management Suite</span>
            <span>AAVANI Admin · Demo by <strong>TanovaX</strong></span>
          </footer>
        </div>
        
        <Toast />
      </div>
    );
  }

  // Customer Interface Layout
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF6F0] text-[#222222]">
      <AnnouncementBar />
      <Navbar onNavigate={navigate} currentPath={currentPath} />

      <main className="flex-1">
        {pathBase === '/' && <Home onNavigate={navigate} />}
        {pathBase === '/shop' && (
          <Shop
            onNavigate={navigate}
            initialCategory={searchParams.get('category') || ''}
            initialOccasion={searchParams.get('occasion') || ''}
            initialCraft={searchParams.get('craft') || ''}
          />
        )}
        {productId && <ProductDetail productId={productId} onNavigate={navigate} />}
        {pathBase === '/cart' && <Cart onNavigate={navigate} />}
        {pathBase === '/checkout' && <Checkout onNavigate={navigate} setCompletedOrder={setCompletedOrder} />}
        {pathBase === '/order-success' && <OrderSuccess order={completedOrder} onNavigate={navigate} />}
        {pathBase === '/wishlist' && <Wishlist onNavigate={navigate} />}
        {pathBase === '/account' && <Account onNavigate={navigate} />}
        {pathBase === '/track-order' && <TrackOrder initialOrderId={searchParams.get('orderId')} onNavigate={navigate} />}
        {pathBase === '/lookbook' && <Lookbook onNavigate={navigate} />}
        {pathBase === '/journal' && <Journal onNavigate={navigate} />}
        {pathBase === '/about' && <About onNavigate={navigate} />}
        {pathBase === '/admin/login' && <AdminLogin onNavigate={navigate} />}
      </main>

      <Footer onNavigate={navigate} />
      <SearchModal onNavigate={navigate} />
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}
