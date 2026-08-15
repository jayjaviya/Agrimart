import React, { useState } from 'react';
import AdminLayout from '../../../components/admin/AdminLayout';
import { 
  Package, 
  AlertTriangle, 
  XCircle, 
  RefreshCcw,
  SlidersHorizontal,
  Plus,
  Settings2,
  Clock,
  Search
} from 'lucide-react';
import '../../../styles/admin/inventory/AdminInventory.css';

import fertImg from '../../../assets/images/premium-seeds.png';
import irrImg from '../../../assets/images/tools-equipment.png';

const AdminInventory = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [adjustAction, setAdjustAction] = useState('add');
  const [adjustQty, setAdjustQty] = useState(1);

  const inventory = [
    {
      id: 'FERT-N50-001',
      name: 'AgriYield Pro Nitrogen 50lb',
      sku: 'FERT-N50-001',
      category: 'Fertilizers',
      image: fertImg,
      stock: 452,
      minStock: 50,
      status: 'In Stock',
      lastUpdated: 'Oct 12, 2026'
    },
    {
      id: 'IRR-B100-24',
      name: 'ProFlow Impact Sprinkler Brass',
      sku: 'IRR-B100-24',
      category: 'Irrigation',
      image: irrImg,
      stock: 12,
      minStock: 20,
      status: 'Low Stock',
      lastUpdated: 'Nov 05, 2026'
    },
    {
      id: 'SD-CRN-DR01',
      name: 'Drought-Resistant Corn Seed',
      sku: 'SD-CRN-DR01',
      category: 'Seeds',
      image: fertImg,
      stock: 0,
      minStock: 10,
      status: 'Out of Stock',
      lastUpdated: 'Jan 15, 2027'
    }
  ];

  const handleAdjustClick = (item) => {
    setSelectedItem(item);
    setAdjustQty(1);
    setAdjustAction('add');
  };

  const renderStatusBadge = (status) => {
    if (status === 'In Stock') return <span className="inv-badge normal">In Stock</span>;
    if (status === 'Low Stock') return <span className="inv-badge warning"><AlertTriangle size={12}/> Low Stock</span>;
    if (status === 'Out of Stock') return <span className="inv-badge critical"><XCircle size={12}/> Out of Stock</span>;
  };

  return (
    <AdminLayout 
      headerTitle="Inventory Management" 
    >
      <div className="admin-inventory-page">
        <div className="page-search-header" style={{ marginBottom: '24px' }}>
          <div className="search-input-wrapper" style={{maxWidth: '400px', position: 'relative', display: 'flex', alignItems: 'center'}}>
            <Search size={16} className="search-icon" style={{position: 'absolute', left: '12px', color: '#94a3b8'}} />
            <input type="text" placeholder="Search orders, products, customers..." style={{width: '100%', padding: '10px 12px 10px 36px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem', outline: 'none'}} />
          </div>
        </div>
        
        <div className="inventory-grid">
          {/* Left Column - Main Content */}
          <div className="inv-main-col">
            
            {/* KPI Cards */}
            <div className="kpi-row">
              <div className="kpi-card normal-top">
                <div className="kpi-header">
                  <h3>TOTAL STOCK ITEMS</h3>
                </div>
                <div className="kpi-content">
                  <h2>1,240</h2>
                  <span className="kpi-tag"><Package size={14}/> items</span>
                </div>
              </div>
              
              <div className="kpi-card warning-top">
                <div className="kpi-header">
                  <h3>LOW STOCK</h3>
                </div>
                <div className="kpi-content">
                  <h2>12</h2>
                  <span className="kpi-tag warning-tag"><AlertTriangle size={14}/> items</span>
                </div>
              </div>

              <div className="kpi-card critical-top">
                <div className="kpi-header">
                  <h3>OUT OF STOCK</h3>
                </div>
                <div className="kpi-content">
                  <h2 className="critical-text">3</h2>
                  <span className="kpi-tag critical-tag"><XCircle size={14}/> critical</span>
                </div>
              </div>

              <div className="kpi-card success-top">
                <div className="kpi-header">
                  <h3>RECENTLY RESTOCKED</h3>
                </div>
                <div className="kpi-content">
                  <h2>45</h2>
                  <span className="kpi-tag success-tag"><RefreshCcw size={14}/> this week</span>
                </div>
              </div>
            </div>

            {/* Inventory Table Container */}
            <div className="inv-table-container">
              <div className="inv-table-filters">
                <div className="left-filters">
                  <select className="filter-select">
                    <option>All Categories</option>
                    <option>Fertilizers</option>
                    <option>Irrigation</option>
                  </select>
                  <select className="filter-select">
                    <option>All Statuses</option>
                    <option>In Stock</option>
                    <option>Low Stock</option>
                    <option>Out of Stock</option>
                  </select>
                </div>
                <button className="btn-add-inv">
                  <Plus size={16}/> Add Product
                </button>
              </div>

              <div className="inv-table-wrapper">
                <table className="inv-table">
                  <thead>
                    <tr>
                      <th>PRODUCT</th>
                      <th>SKU</th>
                      <th>CATEGORY</th>
                      <th>STOCK</th>
                      <th>STATUS</th>
                      <th>LAST UPDATED</th>
                      <th className="actions-header">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inventory.map(item => (
                      <tr key={item.id} className={item.status === 'Out of Stock' ? 'row-critical' : ''}>
                        <td>
                          <div className="inv-product-cell">
                            <img src={item.image} alt={item.name} />
                            <span>{item.name}</span>
                          </div>
                        </td>
                        <td>{item.sku}</td>
                        <td>{item.category}</td>
                        <td>
                          <div className="stock-info">
                            <span className={`stock-qty ${item.status === 'Out of Stock' ? 'critical-text' : item.status === 'Low Stock' ? 'warning-text' : ''}`}>
                              {item.stock} units
                            </span>
                            <span className="stock-min">Min: {item.minStock}</span>
                          </div>
                        </td>
                        <td>{renderStatusBadge(item.status)}</td>
                        <td className="date-cell">{item.lastUpdated}</td>
                        <td className="actions-cell">
                          <button 
                            className="btn-adjust"
                            onClick={() => handleAdjustClick(item)}
                          >
                            Adjust
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>

          {/* Right Column - Sidebars */}
          <div className="inv-side-col">
            
            {/* Adjust Stock Widget */}
            <div className="sidebar-card">
              <div className="sidebar-header">
                <Settings2 size={20} />
                <h2>Adjust Stock</h2>
              </div>
              
              <div className="sidebar-body">
                {selectedItem ? (
                  <div className="adjust-form">
                    <div className="selected-item-info">
                      <span className="label">Selected Item:</span>
                      <h4>{selectedItem.name}</h4>
                      <p>Current: {selectedItem.stock} units</p>
                    </div>

                    <div className="form-group">
                      <label>ACTION</label>
                      <div className="toggle-group">
                        <button 
                          className={`toggle-btn ${adjustAction === 'add' ? 'active' : ''}`}
                          onClick={() => setAdjustAction('add')}
                        >
                          + Add
                        </button>
                        <button 
                          className={`toggle-btn ${adjustAction === 'remove' ? 'active' : ''}`}
                          onClick={() => setAdjustAction('remove')}
                        >
                          - Remove
                        </button>
                      </div>
                    </div>

                    <div className="form-group">
                      <label>QUANTITY</label>
                      <input 
                        type="number" 
                        value={adjustQty} 
                        onChange={(e) => setAdjustQty(e.target.value)}
                        min="1"
                      />
                    </div>

                    <div className="form-group">
                      <label>REASON</label>
                      <select className="form-select">
                        <option>New Shipment</option>
                        <option>Returned Item</option>
                        <option>Damaged Goods</option>
                        <option>Inventory Correction</option>
                      </select>
                      <textarea placeholder="Add notes..." className="reason-notes"></textarea>
                    </div>

                    <div className="form-actions">
                      <button className="btn-cancel" onClick={() => setSelectedItem(null)}>Cancel</button>
                      <button className="btn-confirm">Confirm</button>
                    </div>
                  </div>
                ) : (
                  <div className="empty-state">
                    <p>Select a product from the table to adjust its stock level.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Recent Activity Widget */}
            <div className="sidebar-card">
              <div className="sidebar-header">
                <Clock size={20} />
                <h2>Recent Activity</h2>
              </div>
              <div className="activity-list">
                <div className="activity-item">
                  <p><strong>+100 units</strong> added to AgriYield Pro Nitrogen</p>
                  <span>Reason: New Shipment • 2 hours ago</span>
                </div>
                <div className="activity-item">
                  <p><strong>-5 units</strong> removed from ProFlow Sprinkler</p>
                  <span>Reason: Damaged Goods • Yesterday, 14:30</span>
                </div>
                <div className="activity-item">
                  <p><strong>0 units</strong> adjusted on Drought-Resistant Corn</p>
                  <span>Reason: Inventory Audit • Oct 20, 09:15</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </AdminLayout>
  );
};

export default AdminInventory;
