import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';
import Input from '../components/ui/Input.jsx';
import Button from '../components/ui/Button.jsx';
import Alert from '../components/ui/Alert.jsx';
import NetworkPath from '../components/layout/NetworkPath.jsx';

export default function LoginPage() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(form.username.trim(), form.password);
      navigate(location.state?.from?.pathname ?? '/dashboard', { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login">
      <div className="login__form-side">
        <form className="login__form" onSubmit={handleSubmit} noValidate>
          <h1 className="login__title">Inicia sesión</h1>
          <p className="login__subtitle">Cada petición se verifica, incluso después de entrar.</p>
          <Alert>{error}</Alert>
          <Input
            id="username" name="username" label="Usuario" autoComplete="username"
            value={form.username} onChange={handleChange} required maxLength={50}
          />
          <Input
            id="password" name="password" type="password" label="Contraseña"
            autoComplete="current-password" value={form.password}
            onChange={handleChange} required maxLength={128}
          />
          <Button type="submit" loading={loading}
            disabled={!form.username || !form.password}>
            Entrar
          </Button>
        </form>
      </div>
      <aside className="login__info-side">
        <h2>Así viaja tu inicio de sesión</h2>
        <NetworkPath />
      </aside>
    </main>
  );
}
