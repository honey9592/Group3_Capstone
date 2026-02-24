import React, { useState } from 'react';
<<<<<<< HEAD
import { registerUser } from '../api';
=======
>>>>>>> b4a8c264d86c1742d142285c94bcb5332e0fe3f5

function Register({ setUser, setCurrentPage }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
<<<<<<< HEAD
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
=======

  const handleRegister = (e) => {
    e.preventDefault();
    if (name && email && password) {
      setUser({ name, email });
      setCurrentPage('home');
>>>>>>> b4a8c264d86c1742d142285c94bcb5332e0fe3f5
    }
  };

  return (
    <div className="container">
      <div className="auth-form">
        <h2>Register</h2>
<<<<<<< HEAD
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
=======
>>>>>>> b4a8c264d86c1742d142285c94bcb5332e0fe3f5
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label>Name:</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
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
<<<<<<< HEAD
              minLength={6}
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
=======
            />
          </div>
          <button type="submit">Register</button>
>>>>>>> b4a8c264d86c1742d142285c94bcb5332e0fe3f5
        </form>
        <p>
          Already have an account? 
          <button className="link-btn" onClick={() => setCurrentPage('login')}>
            Login
          </button>
        </p>
      </div>
    </div>
  );
}

export default Register;
