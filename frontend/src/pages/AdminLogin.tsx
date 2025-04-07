import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:3000/auth/login', {
        email,
        password,
      });
      localStorage.setItem('token', res.data.access_token);
      navigate('/admin/dashboard');
    } catch  {
      alert('Échec de la connexion');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Connexion admin</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        className="border p-2 rounded block mb-2"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        className="border p-2 rounded block mb-4"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin} className="bg-blue-600 text-white px-4 py-2 rounded">
        Se connecter
      </button>
    </div>
  );
}
