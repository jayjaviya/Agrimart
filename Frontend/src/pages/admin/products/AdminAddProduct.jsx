import React from 'react';
import AdminLayout from '../../../components/admin/AdminLayout';
import { Search, CloudUpload, Image as ImageIcon, Bold, Italic, Underline, List, ListOrdered } from 'lucide-react';
import '../../../styles/admin/products/AdminAddProduct.css';

const AdminAddProduct = () => {
  return (
    <AdminLayout 
      headerTitle={<><span style={{color: '#64748b'}}>Products &gt; </span>Add New Product</>}
    >
      <div className="add-product-page">
        <div className="page-search-header" style={{ marginBottom: '20px' }}>
          <div className="search-input-wrapper" style={{maxWidth: '400px', position: 'relative', display: 'flex', alignItems: 'center'}}>
            <Search size={16} className="search-icon" style={{position: 'absolute', left: '12px', color: '#94a3b8'}} />
            <input type="text" placeholder="Search orders, products, customers..." style={{width: '100%', padding: '10px 12px 10px 36px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem', outline: 'none'}} />
          </div>
        </div>

        <form className="add-product-form">
          <div className="form-grid">
            
            {/* Left Column */}
            <div className="form-main-col">
              
              {/* Basic Information */}
              <div className="form-card">
                <div className="form-card-header">
                  <h2>Basic Information</h2>
                  <p>General details about the product.</p>
                </div>
                
                <div className="form-group">
                  <label>PRODUCT NAME <span className="required">*</span></label>
                  <input type="text" placeholder="e.g. Premium Organic Fertilizer 50lb" />
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>CATEGORY</label>
                    <select className="form-select">
                      <option>Select a category</option>
                      <option>Fertilizers</option>
                      <option>Irrigation</option>
                      <option>Seeds</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>BRAND</label>
                    <input type="text" placeholder="e.g. AgriCorp" />
                  </div>
                </div>

                <div className="form-group">
                  <label>SKU</label>
                  <input type="text" placeholder="e.g. FERT-ORG-50" />
                </div>

                <div className="form-group">
                  <label>DESCRIPTION</label>
                  <div className="rich-text-editor">
                    <div className="editor-toolbar">
                      <button type="button" className="editor-btn active"><Bold size={14}/></button>
                      <button type="button" className="editor-btn"><Italic size={14}/></button>
                      <button type="button" className="editor-btn"><Underline size={14}/></button>
                      <div className="toolbar-divider"></div>
                      <button type="button" className="editor-btn"><List size={14}/></button>
                      <button type="button" className="editor-btn"><ListOrdered size={14}/></button>
                    </div>
                    <textarea placeholder="Provide a detailed description of the product..."></textarea>
                  </div>
                </div>
              </div>

              {/* Product Media */}
              <div className="form-card">
                <div className="form-card-header">
                  <h2>Product Media</h2>
                  <p>Upload product images. Recommended size: 1080x1080px.</p>
                </div>
                
                <div className="upload-area">
                  <div className="upload-icon-circle">
                    <CloudUpload size={24} color="#475569" />
                  </div>
                  <p className="upload-text"><strong>Click to upload</strong> or drag and drop</p>
                  <p className="upload-hint">SVG, PNG, JPG or GIF (max. 10MB)</p>
                </div>

                <div className="media-preview-list">
                  <div className="media-preview-item active">
                    <ImageIcon size={20} color="#94a3b8" />
                    <span className="main-badge">Main</span>
                  </div>
                  <div className="media-preview-add">
                    <span>+</span>
                  </div>
                </div>
              </div>

              {/* Agricultural Specifications */}
              <div className="form-card">
                <div className="form-card-header">
                  <h2>Agricultural Specifications</h2>
                  <p>Technical details and usage guidelines.</p>
                </div>

                <div className="form-group">
                  <label>PRODUCT SPECIFICATIONS</label>
                  <textarea placeholder="e.g. NPK Ratio: 10-10-10, Water Soluble..."></textarea>
                </div>

                <div className="form-group">
                  <label>USAGE INFORMATION</label>
                  <textarea placeholder="Application instructions, safety warnings..."></textarea>
                </div>

                <div className="form-group">
                  <label>SUITABLE CROPS</label>
                  <input type="text" placeholder="e.g. Tomatoes, Corn, Wheat..." />
                </div>

                <div className="form-group">
                  <label>ADDITIONAL DETAILS</label>
                  <textarea placeholder="Storage requirements, shelf life..."></textarea>
                </div>
              </div>

            </div>

            {/* Right Column */}
            <div className="form-sidebar-col">
              
              {/* Status & Visibility */}
              <div className="form-card">
                <div className="form-card-header">
                  <h2>Status & Visibility</h2>
                </div>
                <div className="radio-group">
                  <label className="radio-option">
                    <input type="radio" name="status" defaultChecked />
                    <span className="radio-custom active"></span>
                    Active
                  </label>
                  <label className="radio-option">
                    <input type="radio" name="status" />
                    <span className="radio-custom"></span>
                    Draft
                  </label>
                  <label className="radio-option">
                    <input type="radio" name="status" />
                    <span className="radio-custom"></span>
                    Out of Stock
                  </label>
                </div>
              </div>

              {/* Pricing */}
              <div className="form-card">
                <div className="form-card-header">
                  <h2>Pricing</h2>
                </div>
                
                <div className="form-group">
                  <label>SELLING PRICE ($)</label>
                  <input type="text" placeholder="0.00" />
                </div>
                
                <div className="form-group">
                  <label>ORIGINAL PRICE ($)</label>
                  <input type="text" placeholder="0.00" />
                  <span className="input-hint">Leave blank if no discount is applied.</span>
                </div>
                
                <div className="form-group">
                  <label>DISCOUNT (%)</label>
                  <input type="text" placeholder="0%" />
                </div>
              </div>

              {/* Inventory */}
              <div className="form-card">
                <div className="form-card-header">
                  <h2>Inventory</h2>
                </div>
                
                <div className="form-group">
                  <label>STOCK QUANTITY</label>
                  <input type="number" placeholder="0" />
                </div>
                
                <div className="form-group">
                  <label>LOW STOCK THRESHOLD</label>
                  <input type="number" placeholder="5" />
                </div>
              </div>

            </div>
          </div>
        </form>

        {/* Action Footer */}
        <div className="form-action-bar">
          <div className="action-bar-inner">
            <button type="button" className="btn-cancel">Cancel</button>
            <div className="action-right">
              <button type="button" className="btn-draft">Save as Draft</button>
              <button type="submit" className="btn-save">Save Product</button>
            </div>
          </div>
        </div>

      </div>
    </AdminLayout>
  );
};

export default AdminAddProduct;
