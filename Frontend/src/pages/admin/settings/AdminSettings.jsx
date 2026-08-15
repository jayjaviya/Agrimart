import React from 'react';
import AdminLayout from '../../../components/admin/AdminLayout';
import { 
  Search, 
  User, 
  Shield, 
  Bell, 
  Store, 
  LogOut 
} from 'lucide-react';
import '../../../styles/admin/settings/AdminSettings.css';

const AdminSettings = () => {
  return (
    <AdminLayout 
      headerTitle="Settings"
      headerSubtitle="Manage your administrative preferences and system configurations."
    >
      <div className="admin-settings-page">
        
        {/* Established Format: Search Bar at the top of content */}
        <div className="page-search-header" style={{ marginBottom: '32px' }}>
          <div className="search-input-wrapper" style={{maxWidth: '400px', position: 'relative', display: 'flex', alignItems: 'center'}}>
            <Search size={16} className="search-icon" style={{position: 'absolute', left: '12px', color: '#94a3b8'}} />
            <input type="text" placeholder="Search settings..." style={{width: '100%', padding: '10px 12px 10px 36px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem', outline: 'none'}} />
          </div>
        </div>

        <div className="settings-layout-grid">
          
          {/* Settings Sidebar Menu */}
          <div className="settings-sidebar">
            <nav className="settings-nav">
              <button className="settings-nav-btn active">
                <User size={18} /> Admin Profile
              </button>
              <button className="settings-nav-btn">
                <Shield size={18} /> Security
              </button>
              <button className="settings-nav-btn">
                <Bell size={18} /> Notifications
              </button>
              <button className="settings-nav-btn">
                <Store size={18} /> Store Settings
              </button>
              <div className="nav-divider"></div>
              <button className="settings-nav-btn btn-logout">
                <LogOut size={18} /> Logout
              </button>
            </nav>
          </div>

          {/* Settings Main Content Area */}
          <div className="settings-content-panel">
            
            <div className="settings-panel-header">
              <h2>Admin Profile</h2>
            </div>
            
            <div className="settings-panel-body">
              
              {/* Profile Picture Section */}
              <div className="settings-section">
                <div className="profile-picture-container">
                  <div className="profile-avatar-box">
                    <User size={48} color="#94a3b8" />
                  </div>
                  <div className="profile-picture-actions">
                    <h3>Profile Picture</h3>
                    <p>PNG, JPG up to 5MB. Recommended 400x400px.</p>
                    <div className="action-buttons-row">
                      <button className="btn-change">Change</button>
                      <button className="btn-remove">Remove</button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="settings-divider"></div>

              {/* Form Fields Section */}
              <div className="settings-section">
                <div className="form-row-2col">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input type="text" defaultValue="System Administrator" className="settings-input" />
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input type="email" defaultValue="admin@agrimart.com" className="settings-input" />
                  </div>
                </div>

                <div className="form-group" style={{marginTop: '24px'}}>
                  <label>Role</label>
                  <input 
                    type="text" 
                    value="Executive Administrator (AgriMart Portal)" 
                    className="settings-input input-disabled" 
                    readOnly 
                  />
                  <span className="input-helper-text">Role changes require Super Admin approval.</span>
                </div>
              </div>

              {/* Save Button */}
              <div className="settings-footer-actions">
                <button className="btn-save-changes">Save Changes</button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
