import Button from '../ui/Button.jsx';

export default function Navbar({ username, onLogout }) {
  return (
    <header className="navbar">
      <span className="navbar__brand">Acceso seguro</span>
      <div className="navbar__right">
        <span className="navbar__user">{username}</span>
        <Button variant="ghost" onClick={onLogout}>Cerrar sesión</Button>
      </div>
    </header>
  );
}
