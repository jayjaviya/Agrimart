import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { 
  ArrowLeft, Package, MapPin, CreditCard, Clock, 
  CheckCircle, Truck, XCircle, Phone, User, Copy, Check
} from 'lucide-react';
import '../../styles/shop/OrderDetails.css';

const OrderDetails = () => {
  const { id } = useParams();
  const { user, loading: authLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      navigate('/login');
      return;
    }
    fetchOrderDetails();
  }, [id, user, authLoading, navigate]);

  const fetchOrderDetails = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';
      const response = await fetch(`${API_URL}/api/orders`);
      if (response.ok) {
        const data = await response.json();
        const found = data.find(o => o._id === id);
        if (found) {
          setOrder(found);
        } else {
          navigate('/orders');
        }
      }
    } catch (error) {
      console.error('Error fetching order:', error);
    } finally {
      setLoading(false);
    }
  };

  const copyOrderId = () => {
    navigator.clipboard.writeText(order.orderId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      weekday: 'short',
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

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered': return <CheckCircle size={20} />;
      case 'shipped': return <Truck size={20} />;
      case 'cancelled': return <XCircle size={20} />;
      default: return <Clock size={20} />;
    }
  };

  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered': return 'detail-status--delivered';
      case 'shipped': return 'detail-status--shipped';
      case 'cancelled': return 'detail-status--cancelled';
      default: return 'detail-status--processing';
    }
  };

  // Order timeline steps
  const getTimelineSteps = (status) => {
    const steps = [
      { label: 'Order Placed', completed: true },
      { label: 'Processing', completed: ['processing', 'shipped', 'delivered'].includes(status?.toLowerCase()) },
      { label: 'Shipped', completed: ['shipped', 'delivered'].includes(status?.toLowerCase()) },
      { label: 'Delivered', completed: status?.toLowerCase() === 'delivered' },
    ];
    return steps;
  };

  if (loading) {
    return (
      <div className="orderdetails-page">
        <div className="orderdetails-container">
          <div className="orderdetails-loading">
            <div className="loading-spinner"></div>
            <p>Loading order details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!order) return null;

  const subtotal = order.items?.reduce((sum, item) => sum + (item.price * item.quantity), 0) || 0;

  return (
    <div className="orderdetails-page">
      <div className="orderdetails-container">
        {/* Back Navigation */}
        <Link to="/orders" className="orderdetails-back">
          <ArrowLeft size={20} />
          <span>Back to My Orders</span>
        </Link>

        {/* Order Header */}
        <div className="orderdetails-header">
          <div className="orderdetails-header-left">
            <h1 className="orderdetails-title">Order Summary</h1>
            <div className="orderdetails-id-row">
              <span className="orderdetails-id">{order.orderId}</span>
              <button className="copy-btn" onClick={copyOrderId} title="Copy Order ID">
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <p className="orderdetails-date">
              Placed on {formatDate(order.createdAt)} at {formatTime(order.createdAt)}
            </p>
          </div>
          <div className={`orderdetails-status-badge ${getStatusClass(order.status)}`}>
            {getStatusIcon(order.status)}
            <span>{order.status}</span>
          </div>
        </div>

        {/* Order Progress Timeline */}
        {order.status?.toLowerCase() !== 'cancelled' && (
          <div className="orderdetails-timeline">
            <h3 className="section-label">Order Progress</h3>
            <div className="timeline-track">
              {getTimelineSteps(order.status).map((step, idx) => (
                <div key={idx} className={`timeline-step ${step.completed ? 'timeline-step--done' : ''}`}>
                  <div className="timeline-dot">
                    {step.completed && <Check size={12} />}
                  </div>
                  <span className="timeline-label">{step.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="orderdetails-body">
          {/* Items Section */}
          <div className="orderdetails-section">
            <h3 className="section-label">
              <Package size={18} />
              {order.items?.length} item{order.items?.length > 1 ? 's' : ''} in this order
            </h3>
            <div className="orderdetails-items">
              {order.items?.map((item, idx) => (
                <div key={idx} className="detail-item">
                  <div className="detail-item-info">
                    <h4 className="detail-item-name">{item.name}</h4>
                    <p className="detail-item-meta">Qty: {item.quantity} × ₹{item.price?.toLocaleString('en-IN')}</p>
                  </div>
                  <span className="detail-item-price">
                    ₹{(item.price * item.quantity)?.toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Bill Details */}
          <div className="orderdetails-section">
            <h3 className="section-label">Bill Details</h3>
            <div className="bill-details">
              <div className="bill-row">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="bill-row">
                <span>Delivery Charges</span>
                <span className="bill-free">FREE</span>
              </div>
              <div className="bill-row bill-row--total">
                <span>Total Amount</span>
                <span>₹{order.totalAmount?.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
              </div>
            </div>
          </div>

          {/* Order Info Cards */}
          <div className="orderdetails-info-grid">
            {/* Shipping Address */}
            <div className="info-card">
              <div className="info-card-header">
                <MapPin size={18} />
                <h4>Shipping Address</h4>
              </div>
              <div className="info-card-body">
                {order.shippingAddress ? (
                  <>
                    <p>{order.shippingAddress.street}</p>
                    <p>{order.shippingAddress.city}, {order.shippingAddress.state}</p>
                    <p>PIN: {order.shippingAddress.zip}</p>
                  </>
                ) : (
                  <p className="info-na">Not available</p>
                )}
              </div>
            </div>

            {/* Customer Info */}
            <div className="info-card">
              <div className="info-card-header">
                <User size={18} />
                <h4>Customer</h4>
              </div>
              <div className="info-card-body">
                <p>{order.customerName || 'N/A'}</p>
                {order.customerPhone && (
                  <p className="info-phone">
                    <Phone size={14} />
                    {order.customerPhone}
                  </p>
                )}
              </div>
            </div>

            {/* Payment Info */}
            <div className="info-card">
              <div className="info-card-header">
                <CreditCard size={18} />
                <h4>Payment</h4>
              </div>
              <div className="info-card-body">
                <p className="payment-method">{order.paymentMethod || 'N/A'}</p>
                <p className="payment-amount">₹{order.totalAmount?.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
