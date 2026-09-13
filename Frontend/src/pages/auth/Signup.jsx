import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { Eye, EyeOff, Lock } from 'lucide-react';
import '../../styles/auth/Signup.css';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all required fields');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
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

    const res = await register(formData.name, formData.email, formData.password, formData.phone);
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
    <main className="signup-page">
      {/* Left Pane - Image & Branding */}
      <div className="signup-image-pane">
        <Link to="/" className="signup-logo">
          AgriMart
        </Link>
        <div className="signup-branding-text">
          <h1>Equipping the<br />Modern Farm.</h1>
          <p>Join a network of professional agriculturalists. Access premium tools, advanced seed varieties, and technical specifications tailored for scale.</p>
        </div>
      </div>

      {/* Right Pane - Form */}
      <div className="signup-form-pane">
        <div className="signup-form-container">
          <h2>Create Account</h2>
          <p className="signup-subtitle">Enter your details to access professional agricultural resources.</p>

          <form className="signup-form" onSubmit={handleSubmit}>
            {error && <div style={{ color: 'red', marginBottom: '15px' }}>{error}</div>}
            
            <div className="input-group">
              <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
            </div>
            
            <div className="input-group">
              <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
            </div>

            <div className="input-group">
              <input type="tel" name="phone" placeholder="Phone Number (Optional)" value={formData.phone} onChange={handleChange} />
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

            <div className="input-group">
              <input 
                type={showConfirmPassword ? "text" : "password"} 
                name="confirmPassword"
                placeholder="Confirm Password" 
                value={formData.confirmPassword}
                onChange={handleChange}
                required 
              />
              <button 
                type="button" 
                className="btn-toggle-password"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label="Toggle confirm password visibility"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <label className="checkbox-label signup-terms">
              <input type="checkbox" required />
              <span className="checkmark"></span>
              <span className="terms-text">
                I agree to the <strong>Terms of Service</strong> and <strong>Privacy Policy</strong>.
              </span>
            </label>

            <button type="submit" className="btn-create-account">
              Create Account
            </button>
          </form>

          <div className="security-note">
            <Lock size={12} />
            <span>YOUR INFORMATION IS SECURELY PROTECTED</span>
          </div>

          <div className="login-link">
            Already have an account? <Link to="/login">Log in</Link>
          </div>

          <div className="signup-footer-links">
            <Link to="/support">Support</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Signup;
