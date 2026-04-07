import React, { useState } from 'react';
import { loginUser } from '../api';

function Login({ setUser, setCurrentPage }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await loginUser(email, password);
      setUser(data.user);
      if (data.user.role === 'admin') {
        setCurrentPage('admin');
      } else {
        setCurrentPage('home');
      }
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
          <span className="auth-icon">👋</span>
          <h2>Welcome Back</h2>
          <p>Sign in to your account</p>
        </div>
        {error && <div className="error-banner">{error}</div>}
        <div className="form-body">
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
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="btn-primary full-width" onClick={handleLogin} disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </div>
        <p className="auth-footer">
          Don't have an account?
          <button className="link-btn" onClick={() => setCurrentPage('register')}>Register</button>
        </p>
        <div className="admin-hint">
          <small>Admin? Use: admin@groceryhub.com / admin123</small>
        </div>
      </div>
    </div>
  );
}

export default Login;
