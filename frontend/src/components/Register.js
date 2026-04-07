import React, { useState } from 'react';
import { registerUser } from '../api';

function Register({ setUser, setCurrentPage }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await registerUser(name, email, password);
      setUser(data.user);
      setCurrentPage('home');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="auth-form">
        <div className="auth-header">
          <span className="auth-icon">🎉</span>
          <h2>Create Account</h2>
          <p>Join GroceryHub today</p>
        </div>
        {error && <div className="error-banner">{error}</div>}
        <div className="form-body">
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Min 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>
          <button className="btn-primary full-width" onClick={handleRegister} disabled={loading}>
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </div>
        <p className="auth-footer">
          Already have an account?
          <button className="link-btn" onClick={() => setCurrentPage('login')}>Login</button>
        </p>
      </div>
    </div>
  );
}

export default Register;
