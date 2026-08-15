import React from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../../components/admin/AdminLayout';
import { 
  Plus, 
  Search, 
  SlidersHorizontal,
  Eye,
  Edit2,
  Trash2,
  Image as ImageIcon
} from 'lucide-react';
import '../../../styles/admin/products/AdminProducts.css';

import fertImg from '../../../assets/images/premium-seeds.png';
import irrImg from '../../../assets/images/tools-equipment.png';

const AdminProducts = () => {
  const products = [
    {
      id: 'FERT-N50-001',
      name: 'AgriYield Pro Nitrogen 50lb',
      sku: 'FERT-N50-001',
      image: fertImg,
      category: 'FERTILIZERS',
      price: '$45.99',
      stock: 452,
      stockStatus: 'high', // determines progress bar color
      status: 'ACTIVE',
      added: 'Oct 12, 2026'
    },
    {
      id: 'IRR-B100-24',
      name: 'ProFlow Impact Sprinkler Brass',
      sku: 'IRR-B100-24',
      image: irrImg,
      category: 'IRRIGATION',
      price: '$28.50',
      stock: 12,
      stockStatus: 'low',
      status: 'ACTIVE',
      added: 'Nov 05, 2026'
    },
    {
      id: 'SD-CRN-DR01',
      name: 'Drought-Resistant Corn Seed (Trial)',
      sku: 'SD-CRN-DR01',
      image: null, // Test placeholder
      category: 'SEEDS',
      price: '$110.00',
      stock: 0,
      stockStatus: 'out',
      status: 'DRAFT',
      added: 'Jan 15, 2027'
    }
  ];

  return (
    <AdminLayout 
      headerTitle="Products" 
      headerSubtitle="Manage your catalog of agricultural supplies and equipment."
    >
      <div className="admin-products-page">
        <div className="page-search-header" style={{ marginBottom: '20px' }}>
          <div className="search-input-wrapper" style={{maxWidth: '400px', position: 'relative', display: 'flex', alignItems: 'center'}}>
            <Search size={16} className="search-icon" style={{position: 'absolute', left: '12px', color: '#94a3b8'}} />
            <input type="text" placeholder="Search orders, products, customers..." style={{width: '100%', padding: '10px 12px 10px 36px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem', outline: 'none'}} />
          </div>
        </div>

        {/* Header Section */}
        <div className="products-header" style={{ justifyContent: 'space-between', marginBottom: '20px', display: 'flex' }}>
          <div className="products-filters">
            <select className="filter-select">
              <option>All Categories</option>
              <option>Fertilizers</option>
              <option>Irrigation</option>
            </select>
            <select className="filter-select">
              <option>All Statuses</option>
              <option>Active</option>
              <option>Draft</option>
            </select>
          </div>
          
          <Link to="/admin/products/add" className="btn-add-product">
            <Plus size={18} />
            Add Product
          </Link>
        </div>

        {/* Filters Panel */}
        <div className="products-filters-panel">
          <div className="filter-group search-group">
            <label>Search Products</label>
            <div className="search-input-wrapper">
              <Search size={16} className="search-icon" />
              <input type="text" placeholder="Search by name or SKU..." />
            </div>
          </div>
          
          <div className="filter-group">
            <label>Category</label>
            <select className="filter-select">
              <option>All Categories</option>
              <option>Fertilizers</option>
              <option>Irrigation</option>
              <option>Seeds</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Stock Status</label>
            <select className="filter-select">
              <option>All Stock</option>
              <option>In Stock</option>
              <option>Low Stock</option>
              <option>Out of Stock</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Status</label>
            <select className="filter-select">
              <option>All Statuses</option>
              <option>Active</option>
              <option>Draft</option>
            </select>
          </div>

          <div className="filter-group action-group">
            <button className="btn-more-filters">
              <SlidersHorizontal size={16} />
              More Filters
            </button>
          </div>
        </div>

        {/* Products Table */}
        <div className="products-table-panel">
          <div className="products-table-wrapper">
            <table className="full-products-table">
              <thead>
                <tr>
                  <th>Product Details</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock Level</th>
                  <th>Status</th>
                  <th>Added</th>
                  <th className="actions-header">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <div className="product-details-cell">
                        <div className="product-img-wrapper">
                          {product.image ? (
                            <img src={product.image} alt={product.name} />
                          ) : (
                            <div className="product-img-placeholder">
                              <ImageIcon size={20} />
                            </div>
                          )}
                        </div>
                        <div className="product-info">
                          <h4>{product.name}</h4>
                          <p>SKU: {product.sku}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="category-badge">{product.category}</span>
                    </td>
                    <td className="price-cell">{product.price}</td>
                    <td>
                      <div className="stock-level-cell">
                        <span className={`stock-text ${product.stockStatus}`}>
                          {product.stock} units
                        </span>
                        <div className="stock-bar-bg">
                          <div 
                            className={`stock-bar-fill ${product.stockStatus}`}
                            style={{ width: product.stockStatus === 'high' ? '80%' : product.stockStatus === 'low' ? '15%' : '0%' }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="status-badge">{product.status}</span>
                    </td>
                    <td className="date-cell">{product.added}</td>
                    <td>
                      <div className="actions-cell">
                        <Link to={`/admin/products/${product.id}`} className="action-icon-btn view">
                          <Eye size={18} />
                        </Link>
                        <Link to={`/admin/products/edit/${product.id}`} className="action-icon-btn edit">
                          <Edit2 size={18} />
                        </Link>
                        <button className="action-icon-btn delete">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pagination-footer">
            <div className="pagination-info">Showing 1 to 10 of 97 results</div>
            <div className="pagination-controls">
              <button className="page-btn">&lt;</button>
              <button className="page-btn active">1</button>
              <button className="page-btn">2</button>
              <button className="page-btn">3</button>
              <span className="page-dots">...</span>
              <button className="page-btn">&gt;</button>
            </div>
          </div>
        </div>

      </div>
    </AdminLayout>
  );
};

export default AdminProducts;
