import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { Package, ChevronRight, Clock, CheckCircle, Truck, XCircle, Filter, Search } from 'lucide-react';
import '../../styles/shop/MyOrders.css';

const MyOrders = () => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      navigate('/login');
      return;
    }
    fetchOrders();
  }, [user, authLoading, navigate]);

  const fetchOrders = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';
      const response = await fetch(`${API_URL}/api/orders`);
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered': return <CheckCircle size={18} />;
      case 'shipped': return <Truck size={18} />;
      case 'cancelled': return <XCircle size={18} />;
      default: return <Clock size={18} />;
    }
  };

  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered': return 'status--delivered';
      case 'shipped': return 'status--shipped';
      case 'cancelled': return 'status--cancelled';
      default: return 'status--processing';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const filteredOrders = orders.filter(order => {
    const matchesFilter = activeFilter === 'all' || order.status?.toLowerCase() === activeFilter;
    const matchesSearch = searchQuery === '' || 
      order.orderId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items?.some(item => item.name?.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const filters = [
    { key: 'all', label: 'All Orders' },
    { key: 'processing', label: 'Processing' },
    { key: 'shipped', label: 'Shipped' },
    { key: 'delivered', label: 'Delivered' },
    { key: 'cancelled', label: 'Cancelled' },
  ];

  if (loading) {
    return (
      <div className="myorders-page">
        <div className="myorders-container">
          <div className="myorders-loading">
            <div className="loading-spinner"></div>
            <p>Loading your orders...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="myorders-page">
      <div className="myorders-container">
        {/* Page Header */}
        <div className="myorders-header">
          <div className="myorders-header-left">
            <div className="myorders-icon-wrap">
              <Package size={28} />
            </div>
            <div>
              <h1 className="myorders-title">My Orders</h1>
              <p className="myorders-subtitle">
                {orders.length > 0 
                  ? `You have placed ${orders.length} order${orders.length > 1 ? 's' : ''}`
                  : 'No orders yet'
                }
              </p>
            </div>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="myorders-toolbar">
          <div className="myorders-search">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search by order ID or product name..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="myorders-filters">
            {filters.map(filter => (
              <button 
                key={filter.key}
                className={`filter-chip ${activeFilter === filter.key ? 'filter-chip--active' : ''}`}
                onClick={() => setActiveFilter(filter.key)}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="myorders-empty">
            <Package size={64} strokeWidth={1} />
            <h3>No orders found</h3>
            <p>{activeFilter !== 'all' ? 'Try changing the filter' : 'Start shopping to place your first order!'}</p>
            <Link to="/products" className="myorders-shop-btn">Browse Products</Link>
          </div>
        ) : (
          <div className="myorders-list">
            {filteredOrders.map((order) => (
              <Link 
                to={`/orders/${order._id}`} 
                key={order._id} 
                className="order-card"
              >
                <div className="order-card-top">
                  <div className="order-card-meta">
                    <span className="order-id">{order.orderId}</span>
                    <span className="order-date">{formatDate(order.createdAt)} • {formatTime(order.createdAt)}</span>
                  </div>
                  <div className={`order-status ${getStatusClass(order.status)}`}>
                    {getStatusIcon(order.status)}
                    <span>{order.status}</span>
                  </div>
                </div>

                <div className="order-card-items">
                  {order.items?.slice(0, 3).map((item, idx) => (
                    <div key={idx} className="order-item-row">
                      <div className="order-item-info">
                        <span className="order-item-name">{item.name}</span>
                        <span className="order-item-qty">Qty: {item.quantity} × ₹{item.price?.toLocaleString('en-IN')}</span>
                      </div>
                      <span className="order-item-price">₹{(item.price * item.quantity)?.toLocaleString('en-IN')}</span>
                    </div>
                  ))}
                  {order.items?.length > 3 && (
                    <div className="order-item-more">
                      +{order.items.length - 3} more item{order.items.length - 3 > 1 ? 's' : ''}
                    </div>
                  )}
                </div>

                <div className="order-card-bottom">
                  <div className="order-total">
                    <span className="order-total-label">Total</span>
                    <span className="order-total-value">₹{order.totalAmount?.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="order-view-details">
                    View Details <ChevronRight size={16} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
