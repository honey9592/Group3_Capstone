import React, { useState } from 'react';

function Login({ setUser, setCurrentPage }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Simple hardcoded login
    if (email && password) {
      setUser({ name: email.split('@')[0], email });
      setCurrentPage('home');
    }
  };

  return (
    <div className="container">
      <div className="auth-form">
        <h2>Login</h2>
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
          <button type="submit">Login</button>
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
