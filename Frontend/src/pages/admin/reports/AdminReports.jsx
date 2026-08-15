import React from 'react';
import AdminLayout from '../../../components/admin/AdminLayout';
import { 
  Search, 
  Download,
  Calendar,
  Banknote,
  ShoppingBag,
  CheckCircle,
  Receipt,
  MoreHorizontal,
  TriangleAlert
} from 'lucide-react';
import '../../../styles/admin/reports/AdminReports.css';

const AdminReports = () => {
  return (
    <AdminLayout 
      headerTitle="Reports & Analytics"
      headerSubtitle="Comprehensive overview of platform performance."
    >
      <div className="admin-reports-page">
        
        {/* Established Format: Search Bar at the top of content */}
        <div className="page-search-header" style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="search-input-wrapper" style={{maxWidth: '400px', position: 'relative', display: 'flex', alignItems: 'center', width: '100%'}}>
            <Search size={16} className="search-icon" style={{position: 'absolute', left: '12px', color: '#94a3b8'}} />
            <input type="text" placeholder="Search reports..." style={{width: '100%', padding: '10px 12px 10px 36px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem', outline: 'none'}} />
          </div>
          <button className="btn-export-dark">
            <Download size={16} /> Export Report
          </button>
        </div>

        {/* Filters Panel */}
        <div className="reports-filters-panel">
          <div className="filter-group">
            <label>Date Range</label>
            <div className="filter-input-with-icon">
              <Calendar size={14} className="filter-icon" />
              <input type="text" value="Oct 1, 2023 - Oct 31, 2023" readOnly />
            </div>
          </div>
          <div className="filter-group">
            <label>Category</label>
            <select className="filter-select">
              <option>All Categories</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Product</label>
            <select className="filter-select">
              <option>All Products</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Order Status</label>
            <select className="filter-select">
              <option>All Statuses</option>
            </select>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="reports-kpi-row">
          <div className="kpi-card border-green">
            <div className="kpi-header">
              <span>Total Revenue</span>
              <Banknote size={16} className="kpi-icon" />
            </div>
            <div className="kpi-value-row">
              <span className="kpi-value">$128,450</span>
              <span className="kpi-trend trend-up">~+12%</span>
            </div>
          </div>
          
          <div className="kpi-card border-darkgreen">
            <div className="kpi-header">
              <span>Total Orders</span>
              <ShoppingBag size={16} className="kpi-icon" />
            </div>
            <div className="kpi-value-row">
              <span className="kpi-value">1,240</span>
              <span className="kpi-trend trend-up">~+5%</span>
            </div>
          </div>

          <div className="kpi-card border-dark">
            <div className="kpi-header">
              <span>Completed Orders</span>
              <CheckCircle size={16} className="kpi-icon" />
            </div>
            <div className="kpi-value-row">
              <span className="kpi-value">1,150</span>
            </div>
          </div>

          <div className="kpi-card border-dark">
            <div className="kpi-header">
              <span>Avg Order Value</span>
              <Receipt size={16} className="kpi-icon" />
            </div>
            <div className="kpi-value-row">
              <span className="kpi-value">$103.50</span>
            </div>
          </div>
        </div>

        {/* Revenue Analytics Panel */}
        <div className="reports-panel">
          <div className="panel-header">
            <h3>Revenue Analytics</h3>
            <button className="btn-icon-only"><MoreHorizontal size={18} /></button>
          </div>
          <div className="panel-content">
            <div className="chart-placeholder">
              <div className="chart-line-graphic"></div>
              <span>Interactive Revenue Chart Canvas</span>
            </div>
            
            <table className="reports-table">
              <thead>
                <tr>
                  <th>Month</th>
                  <th>Total Revenue</th>
                  <th>Growth</th>
                  <th style={{textAlign: 'right'}}>Transactions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-bold">October 2023</td>
                  <td className="text-bold">$128,450</td>
                  <td className="text-green">+12.4%</td>
                  <td style={{textAlign: 'right'}} className="text-bold">1,240</td>
                </tr>
                <tr>
                  <td className="text-bold">September 2023</td>
                  <td className="text-bold">$114,280</td>
                  <td className="text-green">+4.1%</td>
                  <td style={{textAlign: 'right'}} className="text-bold">1,105</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom Grid */}
        <div className="reports-bottom-grid">
          
          {/* Order Analytics */}
          <div className="reports-panel">
            <div className="panel-header">
              <h3>Order Analytics</h3>
            </div>
            <div className="panel-content">
              <div className="bar-chart-placeholder">
                <div className="bar-container">
                  <div className="bar completed-bar"></div>
                  <div className="bar pending-bar"></div>
                  <div className="bar cancelled-bar"></div>
                </div>
                <span className="chart-overlay-text">Orders Bar Chart</span>
              </div>
              
              <div className="analytics-legend">
                <div className="legend-row">
                  <div className="legend-label">
                    <span className="dot dot-completed"></span> Completed
                  </div>
                  <span className="legend-value">1,150</span>
                  <span className="legend-percent">92.7%</span>
                </div>
                <div className="legend-row">
                  <div className="legend-label">
                    <span className="dot dot-pending"></span> Pending
                  </div>
                  <span className="legend-value">75</span>
                  <span className="legend-percent">6.0%</span>
                </div>
                <div className="legend-row">
                  <div className="legend-label">
                    <span className="dot dot-cancelled"></span> Cancelled
                  </div>
                  <span className="legend-value">15</span>
                  <span className="legend-percent">1.2%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Product Performance */}
          <div className="reports-panel">
            <div className="panel-header">
              <h3>Product Performance</h3>
            </div>
            <div className="panel-content product-performance-content">
              
              <div className="performance-section">
                <h4 className="section-subtitle">Top Selling Products</h4>
                
                <div className="product-rank-row">
                  <span className="product-name">1. Premium Organic Soil (50lb)</span>
                  <span className="unit-badge">342 units</span>
                </div>
                
                <div className="product-rank-row">
                  <span className="product-name">2. Drip Irrigation Kit Pro</span>
                  <span className="unit-badge">289 units</span>
                </div>
              </div>

              <div className="performance-alert-card">
                <div className="alert-header">
                  <TriangleAlert size={16} />
                  <span>Low Performing</span>
                </div>
                <div className="alert-body">
                  <span className="alert-product-name">Basic Hand Trowel</span>
                  <span className="alert-metric">- 45% (MoM)</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </AdminLayout>
  );
};

export default AdminReports;
