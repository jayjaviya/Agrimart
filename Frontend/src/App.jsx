import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/shop/Navbar';
import Footer from './components/shop/Footer';
import Landing from './pages/shop/Landing';
import Products from './pages/shop/Products';
import Contact from './pages/shop/Contact';
import Signup from './pages/auth/Signup';
import Login from './pages/auth/Login';
import ProductDetails from './pages/shop/ProductDetails';
import Cart from './pages/shop/Cart';
import Checkout from './pages/shop/Checkout';
import OrderSuccess from './pages/shop/OrderSuccess';
import OrderTrack from './pages/shop/OrderTrack';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminOrders from './pages/admin/orders/AdminOrders';
import AdminOrderDetails from './pages/admin/orders/AdminOrderDetails';
import AdminProducts from './pages/admin/products/AdminProducts';
import AdminAddProduct from './pages/admin/products/AdminAddProduct';
import AdminInventory from './pages/admin/inventory/AdminInventory';
import AdminCustomers from './pages/admin/customers/AdminCustomers';
import AdminCustomerDetails from './pages/admin/customers/AdminCustomerDetails';
import AdminSupport from './pages/admin/support/AdminSupport';
import AdminTicketDetails from './pages/admin/support/AdminTicketDetails';
import AdminReports from './pages/admin/reports/AdminReports';
import AdminSettings from './pages/admin/settings/AdminSettings';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

function App() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/signup' || location.pathname === '/login';
  const isAdminRoute = location.pathname.startsWith('/admin');
  const showNavFooter = !isAuthPage && !isAdminRoute;

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Initialize Lenis for smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.15, // વધુ સ્નેપી (snappy) અને ફાસ્ટ રિસ્પોન્સ માટે
      smoothWheel: true,
      wheelMultiplier: 1.5, // માઉસ વ્હીલ ફેરવતા થોડું વધારે સ્ક્રોલ થશે (ઝડપી લાગશે)
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      {showNavFooter && <Navbar />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/products" element={<Products />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/order-track" element={<OrderTrack />} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="/admin/orders/:id" element={<AdminOrderDetails />} />
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="/admin/products/add" element={<AdminAddProduct />} />
        <Route path="/admin/inventory" element={<AdminInventory />} />
        <Route path="/admin/customers" element={<AdminCustomers />} />
        <Route path="/admin/customers/:id" element={<AdminCustomerDetails />} />
        <Route path="/admin/support" element={<AdminSupport />} />
        <Route path="/admin/support/:id" element={<AdminTicketDetails />} />
        <Route path="/admin/reports" element={<AdminReports />} />
        <Route path="/admin/settings" element={<AdminSettings />} />
      </Routes>
      {showNavFooter && <Footer />}
    </>
  );
}

export default App;
