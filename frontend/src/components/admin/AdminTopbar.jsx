import React, { useContext } from 'react';
import { User } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';

const AdminTopbar = ({ title, subtitle }) => {
  const { user } = useContext(AuthContext);

  return (
    <div className="admin-topbar">
      <div className="admin-topbar-left">
        {title && <div className="admin-topbar-title">{title}</div>}
        {subtitle && <div className="admin-topbar-subtitle">{subtitle}</div>}
      </div>

      <div className="admin-topbar-actions">
        <div className="admin-profile-menu" style={{display: 'flex', alignItems: 'center', gap: '12px', marginLeft: '12px', cursor: 'pointer'}}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center' }}>
            <span style={{fontSize: '0.75rem', fontWeight: '500', color: '#64748b', lineHeight: '1.2', marginBottom: '-2px'}}>Admin</span>
            <span style={{fontSize: '0.95rem', fontWeight: '700', color: '#0f172a', lineHeight: '1.2'}}>Hello, {user?.name ? user.name.split(' ')[0] : 'User'}</span>
          </div>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            border: '2px solid #cbd5e1',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f8fafc',
            color: '#64748b'
          }}>
            <User size={20} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminTopbar;
