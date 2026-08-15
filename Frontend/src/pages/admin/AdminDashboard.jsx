import React from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { 
  Banknote, 
  Truck, 
  AlertTriangle, 
  Users,
  Download,
  MoreHorizontal,
  Package,
  Search
} from 'lucide-react';
import '../../styles/admin/AdminDashboard.css';

const AdminDashboard = () => {
  // Get current date formatted
  const today = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = today.toLocaleDateString('en-US', options);

  const kpis = [
    {
      title: 'Total Revenue',
      value: '$124,500.00',
      trend: '+12%',
      trendType: 'up',
      icon: Banknote,
      alert: false,
      subtext: 'from last month'
    },
    {
      title: 'Active Orders',
      value: '156',
      icon: Truck,
      alert: false,
      subtext: '24 pending shipment'
    },
    {
      title: 'Inventory Alerts',
      value: '8',
      icon: AlertTriangle,
      alert: true,
      subtext: 'Items low on stock'
    },
    {
      title: 'Active Customers',
      value: '1,240',
      icon: Users,
      alert: false,
      subtext: '5 new today'
    }
  ];

  const lowStockItems = [
    { name: 'Pro-Grade Submersible Pump', sku: 'PUMP-204', stock: 2, unit: 'left' },
    { name: 'Premium Hybrid Corn Seed', sku: 'SEED-HC50', stock: 5, unit: 'bags' },
    { name: 'Industrial Drip Line (100m)', sku: 'IRR-D100', stock: 1, unit: 'roll' },
  ];

  const recentOrders = [
    { id: '#ORD-9082', customer: 'Midwest Agritech Co.', product: 'Irrigation Kit Pro', amount: '$4,250.00', status: 'Processing' },
    { id: '#ORD-9081', customer: 'Valley Farms LLC', product: 'Bulk Fertilizer (Nitrogen)', amount: '$12,800.00', status: 'Shipped' },
  ];

  return (
    <AdminLayout 
      headerTitle="Good Morning, Admin" 
      headerSubtitle="Friday, August 14, 2026"
    >
      <div className="page-search-header">
        <div className="search-input-wrapper" style={{maxWidth: '400px'}}>
          <Search size={16} className="search-icon" style={{position: 'absolute', left: '12px', color: '#94a3b8'}} />
          <input type="text" placeholder="Search orders, products, customers..." style={{width: '100%', padding: '10px 12px 10px 36px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem', outline: 'none'}} />
        </div>
        <button className="btn-export">
          <Download size={18} />
          Download Monthly Report
        </button>
      </div>

      <div className="kpi-grid">
        {kpis.map((kpi, index) => (
          <div key={index} className={`kpi-card ${kpi.alert ? 'alert' : ''}`}>
            <div className="kpi-header">
              <span className="kpi-title">{kpi.title}</span>
              <kpi.icon size={20} className="kpi-icon" />
            </div>
            <div className="kpi-value">{kpi.value}</div>
            <div className="kpi-trend">
              {kpi.trend && (
                <span className={kpi.trendType === 'up' ? 'trend-up' : ''}>
                  {kpi.trendType === 'up' ? '↗ ' : ''}{kpi.trend}
                </span>
              )}
              <span>{kpi.trend ? kpi.subtext : kpi.subtext}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-middle">
        <div className="card-panel">
          <div className="panel-header">
            <div className="panel-title">Sales Trends</div>
            <select style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid #e2e8f0', background: 'white', color: '#64748b' }}>
              <option>This Week</option>
              <option>This Month</option>
            </select>
          </div>
          <div className="chart-container">
            {/* SVG Chart Placeholder to match design */}
            <svg className="chart-svg" viewBox="0 0 500 200" preserveAspectRatio="none">
              <defs>
                <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#4b6a5f" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#4b6a5f" stopOpacity="0" />
                </linearGradient>
              </defs>
              
              {/* Grid Lines */}
              <line x1="0" y1="50" x2="500" y2="50" className="chart-grid-line" />
              <line x1="0" y1="100" x2="500" y2="100" className="chart-grid-line" />
              <line x1="0" y1="150" x2="500" y2="150" className="chart-grid-line" />
              <line x1="0" y1="200" x2="500" y2="200" className="chart-grid-line" />
              
              {/* Y Axis Labels */}
              <text x="0" y="45" className="chart-label">15k</text>
              <text x="0" y="95" className="chart-label">10k</text>
              <text x="0" y="145" className="chart-label">5k</text>
              <text x="0" y="195" className="chart-label">0</text>

              {/* Data Line & Area */}
              <path d="M 20 180 C 100 190, 150 160, 250 100 C 350 40, 420 50, 480 70" className="chart-path" />
              <path d="M 20 180 C 100 190, 150 160, 250 100 C 350 40, 420 50, 480 70 L 480 200 L 20 200 Z" className="chart-gradient" />
            </svg>
          </div>
        </div>

        <div className="card-panel">
          <div className="panel-header">
            <div className="panel-title">
              <Package size={20} className="icon" />
              Low Stock Alerts
            </div>
          </div>
          <div className="alerts-list">
            {lowStockItems.map((item, idx) => (
              <div key={idx} className="alert-item">
                <div className="alert-info">
                  <h4>{item.name}</h4>
                  <p>SKU: {item.sku}</p>
                </div>
                <div className="alert-badge">
                  {item.stock} {item.unit}
                </div>
              </div>
            ))}
          </div>
          <a href="/admin/inventory" className="btn-link">VIEW ALL ALERTS</a>
        </div>
      </div>

      <div className="card-panel table-panel">
        <div className="panel-header">
          <div className="panel-title">Recent Orders</div>
          <MoreHorizontal size={20} color="#94a3b8" cursor="pointer" />
        </div>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Product</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((order, idx) => (
              <tr key={idx}>
                <td style={{ fontWeight: 500 }}>{order.id}</td>
                <td>{order.customer}</td>
                <td>{order.product}</td>
                <td style={{ fontWeight: 600 }}>{order.amount}</td>
                <td>
                  <span className={`status-badge status-${order.status.toLowerCase()}`}>
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
