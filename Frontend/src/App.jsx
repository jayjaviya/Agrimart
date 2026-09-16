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
import MyOrders from './pages/shop/MyOrders';
import OrderDetails from './pages/shop/OrderDetails';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminLogin from './pages/admin/AdminLogin';
import AdminOrders from './pages/admin/orders/AdminOrders';
import AdminOrderDetails from './pages/admin/orders/AdminOrderDetails';
import AdminProducts from './pages/admin/products/AdminProducts';
import AdminAddProduct from './pages/admin/products/AdminAddProduct';
import AdminEditProduct from './pages/admin/products/AdminEditProduct';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AdminSupport from './pages/admin/support/AdminSupport';
import AdminTicketDetails from './pages/admin/support/AdminTicketDetails';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

function App() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/signup' || location.pathname === '/login' || location.pathname === '/admin/login';
  const isAdminRoute = location.pathname.startsWith('/admin');
  const showNavFooter = !isAuthPage && !isAdminRoute;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.15,
      smoothWheel: true,
      wheelMultiplier: 1.5,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <AuthProvider>
      <CartProvider>
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
          <Route path="/orders" element={<MyOrders />} />
          <Route path="/orders/:id" element={<OrderDetails />} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<ProtectedRoute adminOnly={true}><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/orders" element={<ProtectedRoute adminOnly={true}><AdminOrders /></ProtectedRoute>} />
          <Route path="/admin/orders/:id" element={<ProtectedRoute adminOnly={true}><AdminOrderDetails /></ProtectedRoute>} />
          <Route path="/admin/products" element={<ProtectedRoute adminOnly={true}><AdminProducts /></ProtectedRoute>} />
          <Route path="/admin/products/add" element={<ProtectedRoute adminOnly={true}><AdminAddProduct /></ProtectedRoute>} />
          <Route path="/admin/products/edit/:id" element={<ProtectedRoute adminOnly={true}><AdminEditProduct /></ProtectedRoute>} />
          <Route path="/admin/support" element={<ProtectedRoute adminOnly={true}><AdminSupport /></ProtectedRoute>} />
          <Route path="/admin/support/:id" element={<ProtectedRoute adminOnly={true}><AdminTicketDetails /></ProtectedRoute>} />
        </Routes>
        {showNavFooter && <Footer />}
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
