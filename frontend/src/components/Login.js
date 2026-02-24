import React, { useState } from 'react';
<<<<<<< HEAD
import { loginUser } from '../api';
=======
>>>>>>> b4a8c264d86c1742d142285c94bcb5332e0fe3f5

function Login({ setUser, setCurrentPage }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
<<<<<<< HEAD
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await loginUser(email, password);
      setUser(data.user);
      setCurrentPage('home');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
=======

  const handleLogin = (e) => {
    e.preventDefault();
    // Simple hardcoded login
    if (email && password) {
      setUser({ name: email.split('@')[0], email });
      setCurrentPage('home');
>>>>>>> b4a8c264d86c1742d142285c94bcb5332e0fe3f5
    }
  };

  return (
    <div className="container">
      <div className="auth-form">
        <h2>Login</h2>
<<<<<<< HEAD
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
=======
>>>>>>> b4a8c264d86c1742d142285c94bcb5332e0fe3f5
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email:</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
<<<<<<< HEAD
          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
=======
          <button type="submit">Login</button>
>>>>>>> b4a8c264d86c1742d142285c94bcb5332e0fe3f5
        </form>
        <p>
          Don't have an account? 
          <button className="link-btn" onClick={() => setCurrentPage('register')}>
            Register
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;
