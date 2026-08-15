import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Lock } from 'lucide-react';
import '../../styles/auth/Login.css';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="login-page">
      {/* Left Pane (Now Form due to row-reverse) */}
      <div className="login-form-pane">
        <div className="login-form-container">
          <h2>Welcome Back</h2>
          <p className="login-subtitle">Enter your credentials to access your account.</p>

          <form className="login-form" onSubmit={e => e.preventDefault()}>
            <div className="input-group">
              <input type="email" placeholder="Email Address" required />
            </div>

            <div className="input-group">
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Password" 
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
