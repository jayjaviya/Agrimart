import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { Eye, EyeOff, ShieldCheck, Lock } from 'lucide-react';
import '../../styles/auth/Login.css';

const AdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  
  const { adminLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) return;

    const res = await adminLogin(formData.email, formData.password);
    if (res.success) {
      navigate('/admin');
    } else {
      setError(res.message);
    }
  };

  return (
    <main className="login-page">
      {/* Left Pane */}
      <div className="login-form-pane">
        <div className="login-form-container">
          <h2>Admin Portal</h2>
          <p className="login-subtitle">Enter your administrator credentials.</p>

          <form className="login-form" onSubmit={handleSubmit}>
            {error && <div style={{ color: 'red', marginBottom: '15px' }}>{error}</div>}
            
            <div className="input-group">
              <input type="email" name="email" placeholder="Admin Email" value={formData.email} onChange={handleChange} required />
            </div>

            <div className="input-group">
              <input 
                type={showPassword ? "text" : "password"} 
                name="password"
                placeholder="Password" 
                value={formData.password}
                onChange={handleChange}
                required 
              />
              <button 
                type="button" 
                className="btn-toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <div className="login-options">
              <label className="checkbox-label login-remember">
                <input type="checkbox" defaultChecked />
                <span className="checkmark"></span>
                <span className="terms-text">Remember me</span>
              </label>
            </div>

            <button type="submit" className="btn-login">
              Login to Dashboard
            </button>
          </form>

          <div className="security-note">
            <Lock size={12} />
            <span>YOUR INFORMATION IS SECURELY PROTECTED</span>
          </div>
          
          {/* Omitted signup-link for admin */}

          <div className="login-footer-links">
            <Link to="/support">Support</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>
      </div>
      
      {/* Right Pane */}
      <div className="login-image-pane">
        <Link to="/" className="login-logo">
          AgriMart
        </Link>
        <div className="login-branding-text">
          <h1>AgriMart System</h1>
          <p>Secure Administration Portal. Authorized access only.</p>
        </div>
      </div>
    </main>
  );
};

export default AdminLogin;
