import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { Eye, EyeOff, Lock } from 'lucide-react';
import '../../styles/auth/Login.css';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  
  const { login } = useContext(AuthContext);
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

    const res = await login(formData.email, formData.password);
    if (res.success) {
      if (res.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } else {
      setError(res.message);
    }
  };

  return (
    <main className="login-page">
      {/* Left Pane (Now Form due to row-reverse) */}
      <div className="login-form-pane">
        <div className="login-form-container">
          <h2>Welcome Back</h2>
          <p className="login-subtitle">Enter your credentials to access your account.</p>

          <form className="login-form" onSubmit={handleSubmit}>
            {error && <div style={{ color: 'red', marginBottom: '15px' }}>{error}</div>}
            
            <div className="input-group">
              <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
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
              <Link to="/forgot-password" className="forgot-password">Forgot Password?</Link>
            </div>

            <button type="submit" className="btn-login">
              Log In
            </button>
          </form>

          <div className="security-note">
            <Lock size={12} />
            <span>YOUR INFORMATION IS SECURELY PROTECTED</span>
          </div>

          <div className="signup-link">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </div>

          <div className="login-footer-links">
            <Link to="/support">Support</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>
      </div>

      {/* Right Pane (Now Image due to row-reverse) */}
      <div className="login-image-pane">
        <Link to="/" className="login-logo">
          AgriMart
        </Link>
        <div className="login-branding-text">
          <h1>Equipping the<br />Modern Farm.</h1>
          <p>Join a network of professional agriculturalists. Access premium tools, advanced seed varieties, and technical specifications tailored for scale.</p>
        </div>
      </div>
    </main>
  );
};

export default Login;
