import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Package, 
  ClipboardList, 
  Users, 
  LifeBuoy, 
  BarChart3, 
  Settings, 
  LogOut,
  Sprout
} from 'lucide-react';

const AdminSidebar = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Orders', path: '/admin/orders', icon: ShoppingCart },
    { name: 'Products', path: '/admin/products', icon: Package },
    { name: 'Inventory', path: '/admin/inventory', icon: ClipboardList },
    { name: 'Customers', path: '/admin/customers', icon: Users },
    { name: 'Support', path: '/admin/support', icon: LifeBuoy },
    { name: 'Reports', path: '/admin/reports', icon: BarChart3 },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="admin-sidebar">
      <div className="admin-brand">
        <Sprout className="brand-icon" size={32} />
        <div className="brand-text">
          <h2>AgriMart</h2>
          <p>Admin Portal</p>
        </div>
      </div>

      <nav className="admin-nav">
        {navItems.map((item) => (
          <Link 
            key={item.name} 
            to={item.path} 
            className={`admin-nav-item ${location.pathname === item.path ? 'active' : ''}`}
          >
            <item.icon size={20} />
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>

      <div className="admin-nav-bottom">
        <Link to="/login" className="admin-nav-item logout">
          <LogOut size={20} />
          <span>Logout</span>
        </Link>
      </div>
    </div>
  );
};

export default AdminSidebar;
