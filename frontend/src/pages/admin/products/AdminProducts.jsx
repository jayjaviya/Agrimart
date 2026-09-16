import React, { useState, useEffect } from 'react';
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

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [stockFilter, setStockFilter] = useState('All Stock');
  const [statusFilter, setStatusFilter] = useState('All Statuses');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:5001/api/products');
        if (res.ok) {
          const data = await res.json();
          setProducts(data);
        }
      } catch (err) {
        console.error('Failed to fetch products', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const res = await fetch(`http://localhost:5001/api/products/${id}`, {
          method: 'DELETE'
        });
        if (res.ok) {
          setProducts(products.filter(p => p._id !== id));
        } else {
          alert('Failed to delete product');
        }
      } catch (err) {
        console.error('Failed to delete product', err);
      }
    }
  };

  const filteredProducts = products.filter(product => {
    // Search
    if (searchTerm && !product.name.toLowerCase().includes(searchTerm.toLowerCase()) && !(product.sku && product.sku.toLowerCase().includes(searchTerm.toLowerCase()))) {
      return false;
    }
    // Category
    if (categoryFilter !== 'All Categories' && product.category !== categoryFilter) {
      return false;
    }
    // Stock Status
    if (stockFilter !== 'All Stock') {
      const stockValue = product.stockQuantity || 0;
      if (stockFilter === 'In Stock' && stockValue <= 0) return false;
      if (stockFilter === 'Out of Stock' && stockValue > 0) return false;
      if (stockFilter === 'Low Stock' && (stockValue <= 0 || stockValue > 50)) return false;
    }
    // Status (Currently all active)
    if (statusFilter !== 'All Statuses' && statusFilter !== 'Active') {
      return false;
    }
    return true;
  });

  return (
    <AdminLayout 
      headerTitle="Products" 
      headerSubtitle="Manage your catalog of agricultural supplies and equipment."
    >
      <div className="admin-products-page">
        {/* Header Section */}
        <div className="products-header" style={{ justifyContent: 'flex-end', marginBottom: '20px', display: 'flex' }}>

          
          <Link to="/admin/products/add" className="btn-add-product">
            <Plus size={18} />
            Add Product
          </Link>
        </div>

        <div className="products-filters-panel">
          <div className="filter-group search-group">
            <label>Search Products</label>
            <div className="search-input-wrapper">
              <Search size={16} className="search-icon" />
              <input 
                type="text" 
                placeholder="Search by name or SKU..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="filter-group">
            <label>Category</label>
            <select className="filter-select" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
              <option>All Categories</option>
              <option>Seeds</option>
              <option>Fertilizers</option>
              <option>Tools & Equipment</option>
              <option>Crop Protection</option>
              <option>Irrigation</option>
              <option>Sprayers</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Stock Status</label>
            <select className="filter-select" value={stockFilter} onChange={(e) => setStockFilter(e.target.value)}>
              <option>All Stock</option>
              <option>In Stock</option>
              <option>Low Stock</option>
              <option>Out of Stock</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Status</label>
            <select className="filter-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option>All Statuses</option>
              <option>Active</option>
              <option>Draft</option>
            </select>
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
                {loading ? (
                  <tr><td colSpan="7" style={{textAlign: 'center', padding: '20px'}}>Loading products...</td></tr>
                ) : filteredProducts.length === 0 ? (
                  <tr><td colSpan="7" style={{textAlign: 'center', padding: '20px'}}>No products found.</td></tr>
                ) : (
                  filteredProducts.map((product) => {
                    const stockValue = product.stockQuantity || 0;
                    const stockStatus = stockValue > 50 ? 'high' : (stockValue > 0 ? 'low' : 'out');
                    return (
                      <tr key={product._id}>
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
                              <p>SKU: {product.sku || 'N/A'}</p>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className="category-badge" style={{ textTransform: 'uppercase' }}>{product.category}</span>
                        </td>
                        <td className="price-cell">₹{product.price?.toFixed(2)}</td>
                        <td>
                          <div className="stock-level-cell">
                            <span className={`stock-text ${stockStatus}`}>
                              {stockValue} units
                            </span>
                            <div className="stock-bar-bg">
                              <div 
                                className={`stock-bar-fill ${stockStatus}`}
                                style={{ width: stockStatus === 'high' ? '80%' : '0%' }}
                              ></div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className="status-badge">ACTIVE</span>
                        </td>
                        <td className="date-cell">Today</td>
                        <td>
                          <div className="actions-cell">
                            <Link to={`/product/${product._id}`} className="action-icon-btn view">
                              <Eye size={18} />
                            </Link>
                            <Link to={`/admin/products/edit/${product._id}`} className="action-icon-btn edit">
                              <Edit2 size={18} />
                            </Link>
                            <button className="action-icon-btn delete" onClick={() => handleDelete(product._id)}>
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          <div className="pagination-footer">
            <div className="pagination-info">Showing {filteredProducts.length} results</div>
            <div className="pagination-controls">
              <button className="page-btn">&lt;</button>
              <button className="page-btn active">1</button>
              <button className="page-btn">&gt;</button>
            </div>
          </div>
        </div>

      </div>
    </AdminLayout>
  );
};

export default AdminProducts;
