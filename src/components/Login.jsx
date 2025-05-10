import { useState } from 'react';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'LIARE' && password === 'liare') {
      localStorage.setItem('isLoggedIn', 'true');
      onLogin();
    } else {
      setError('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div style={{
      maxWidth: '400px',
      margin: '80px auto',
      backgroundColor: '#1e293b',
      padding: '30px',
      borderRadius: '8px',
      border: '1px solid #334155',
      boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
      textAlign: 'center'
    }}>
      <h2 style={{ color: '#4ade80', marginBottom: '20px' }}>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '10px',
            borderRadius: '6px',
            border: '1px solid #334155',
            backgroundColor: '#0f172a',
            color: '#e2e8f0'
          }}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '10px',
            borderRadius: '6px',
            border: '1px solid #334155',
            backgroundColor: '#0f172a',
            color: '#e2e8f0'
          }}
        />
        {error && <p style={{ color: '#fb7185', marginBottom: '10px' }}>{error}</p>}
        <button type="submit" style={{
          backgroundColor: '#334155',
          border: 'none',
          borderRadius: '6px',
          color: '#94a3b8',
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer'
        }}>
          Acceder
        </button>
      </form>
    </div>
  );
}

export default Login;
