import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Lock } from 'lucide-react';
import '../styles/Signup.css';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

          <form className="signup-form" onSubmit={e => e.preventDefault()}>
            <div className="input-group">
              <input type="text" placeholder="Full Name" required />
            </div>
            
            <div className="input-group">
              <input type="email" placeholder="Email Address" required />
            </div>

            <div className="input-group">
              <input type="tel" placeholder="Phone Number (Optional)" />
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

            <div className="input-group">
              <input 
                type={showConfirmPassword ? "text" : "password"} 
                placeholder="Confirm Password" 
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
