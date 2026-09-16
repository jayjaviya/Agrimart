import React from 'react';
import AdminSidebar from './AdminSidebar';
import AdminTopbar from './AdminTopbar';
import '../../styles/admin/AdminDashboard.css';

const AdminLayout = ({ children, headerTitle, headerSubtitle }) => {
  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-main">
        <AdminTopbar title={headerTitle} subtitle={headerSubtitle} />
        <div className="dashboard-content" data-lenis-prevent="true">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
