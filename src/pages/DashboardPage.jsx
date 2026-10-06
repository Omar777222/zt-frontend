import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth.js';
import { dashboardService } from '../api/dashboardService.js';
import Navbar from '../components/layout/Navbar.jsx';
import Panel from '../components/ui/Panel.jsx';
import Alert from '../components/ui/Alert.jsx';
import CheckList from '../components/dashboard/CheckList.jsx';
import InfoRow from '../components/dashboard/InfoRow.jsx';

const formatTime = (iso) => new Date(iso).toLocaleTimeString('es-MX');

export default function DashboardPage() {
  const { token, user, logout } = useAuth();
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    dashboardService
      .get(token)
      .then((res) => active && setData(res))
      .catch((err) => {
        if (err.status === 401) logout(); // token invalido o expirado
        else if (active) setError(err.message);
      });
    return () => { active = false; };
  }, [token, logout]);

  return (
    <>
      <Navbar username={user?.username} onLogout={logout} />
      <main className="dashboard">
        <h1 className="dashboard__title">Hola, {user?.username}</h1>
        <Alert>{error}</Alert>
        {!data && !error && <p className="muted">Cargando datos protegidos…</p>}
        {data && (
          <div className="dashboard__grid">
            <Panel title="Verificaciones de esta petición" className="panel--wide">
              <CheckList checks={data.checks} />
            </Panel>
            <Panel title="Tu sesión">
              <dl>
                <InfoRow label="Usuario" value={data.user.username} />
                <InfoRow label="Rol" value={data.user.role} />
                <InfoRow label="El token expira" value={formatTime(data.tokenExpiresAt)} />
              </dl>
            </Panel>
            <Panel title="Servidor que respondió">
              <dl>
                <InfoRow label="Host" value={data.backend.hostname} />
                <InfoRow label="IP privada" value={data.backend.privateIps.join(', ') || '—'} />
                <InfoRow label="Hora del servidor" value={formatTime(data.backend.serverTime)} />
              </dl>
            </Panel>
          </div>
        )}
      </main>
    </>
  );
}
