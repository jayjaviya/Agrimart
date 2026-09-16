import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminLayout from '../../../components/admin/AdminLayout';
import '../../../styles/admin/products/AdminAddProduct.css';

const AdminEditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    category: 'Fertilizers',
    price: '',
    image: '',
    sku: '',
    description: '',
    meta: '',
    stockQuantity: 100
  });

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:5001/api/products/${id}`);
        if (res.ok) {
          const data = await res.json();
          setFormData({
            name: data.name || '',
            category: data.category || 'Fertilizers',
            price: data.price || '',
            image: data.image || '',
            sku: data.sku || '',
            description: data.description || '',
            meta: data.meta || '',
            stockQuantity: data.stockQuantity !== undefined ? data.stockQuantity : 100
          });
        } else {
          alert('Product not found!');
          navigate('/admin/products');
        }
      } catch (err) {
        console.error(err);
        alert('Error fetching product data');
      } finally {
        setFetching(false);
      }
    };
    if (id) fetchProduct();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5001/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        alert('Product updated successfully!');
        navigate('/admin/products');
      } else {
        alert('Failed to update product');
      }
    } catch (error) {
      console.error(error);
      alert('Error connecting to server');
    }
    setLoading(false);
  };

  if (fetching) {
    return <AdminLayout headerTitle="Loading..."><div style={{padding: '50px'}}>Loading product data...</div></AdminLayout>;
  }

  return (
    <AdminLayout 
      headerTitle={<><span style={{color: '#64748b'}}>Products &gt; </span>Edit Product</>}
    >
      <div className="add-product-page">
        <form className="add-product-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            {/* Left Column */}
            <div className="form-main-col">
              <div className="form-card">
                <div className="form-card-header">
                  <h2>Basic Information</h2>
                  <p>Update details about the product.</p>
                </div>
                
                <div className="form-group">
                  <label>PRODUCT NAME <span className="required">*</span></label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="e.g. Premium Organic Fertilizer 50lb" />
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>CATEGORY</label>
                    <select className="form-select" name="category" value={formData.category} onChange={handleChange}>
                      <option value="Seeds">Seeds</option>
                      <option value="Fertilizers">Fertilizers</option>
                      <option value="Tools & Equipment">Tools & Equipment</option>
                      <option value="Crop Protection">Crop Protection</option>
                      <option value="Irrigation">Irrigation</option>
                      <option value="Sprayers">Sprayers</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>SKU</label>
                    <input type="text" name="sku" value={formData.sku} onChange={handleChange} placeholder="e.g. FERT-ORG-50" />
                  </div>
                </div>

                <div className="form-group">
                  <label>IMAGE URL <span className="required">*</span></label>
                  <input type="text" name="image" value={formData.image} onChange={handleChange} required placeholder="e.g. https://example.com/image.png" />
                </div>

                <div className="form-group">
                  <label>SHORT META / SUBTITLE</label>
                  <input type="text" name="meta" value={formData.meta} onChange={handleChange} placeholder="e.g. Industrial Grade Steel" />
                </div>

                <div className="form-group">
                  <label>DESCRIPTION</label>
                  <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Provide a detailed description of the product..."></textarea>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="form-sidebar-col">
              
              <div className="form-card">
                <div className="form-card-header">
                  <h2>Pricing & Status</h2>
                </div>
                
                <div className="form-group">
                  <label>SELLING PRICE ($) <span className="required">*</span></label>
                  <input type="number" name="price" value={formData.price} onChange={handleChange} required placeholder="0.00" step="0.01" />
                </div>

                <div className="form-group" style={{marginTop: '20px'}}>
                  <label>STOCK QUANTITY</label>
                  <input type="number" name="stockQuantity" value={formData.stockQuantity} onChange={handleChange} required placeholder="0" min="0" />
                </div>
              </div>
            </div>
          </div>

          <div className="form-action-bar">
            <div className="action-bar-inner">
              <button type="button" className="btn-cancel" onClick={() => navigate('/admin/products')}>Cancel</button>
              <div className="action-right">
                <button type="submit" className="btn-save" disabled={loading}>
                  {loading ? 'Updating...' : 'Update Product'}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AdminEditProduct;
