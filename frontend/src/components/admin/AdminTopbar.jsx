import React from 'react';
import { Search, Bell, Settings } from 'lucide-react';

const AdminTopbar = ({ title, subtitle }) => {
  return (
    <div className="admin-topbar">
      <div className="admin-topbar-left">
        {title && <div className="admin-topbar-title">{title}</div>}
        {subtitle && <div className="admin-topbar-subtitle">{subtitle}</div>}
      </div>

      <div className="admin-topbar-actions">
        <div className="action-icon">
          <Bell size={20} />
          <span className="notification-dot"></span>
        </div>
        <div className="action-icon">
          <Settings size={20} />
        </div>
        
        <div className="admin-profile-menu" style={{display: 'flex', alignItems: 'center', gap: '12px', marginLeft: '12px', cursor: 'pointer', paddingLeft: '16px', borderLeft: '1px solid #e2e8f0'}}>
          <span style={{fontSize: '0.9rem', fontWeight: '600', color: '#0f172a'}}>Admin Profile</span>
          <img 
            src="https://randomuser.me/api/portraits/women/44.jpg" 
            alt="Admin Profile" 
            className="profile-pic"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminTopbar;
