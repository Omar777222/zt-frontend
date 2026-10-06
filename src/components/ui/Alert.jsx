export default function Alert({ children, tone = 'error' }) {
  if (!children) return null;
  return (
    <div className={`alert alert--${tone}`} role="alert">
      {children}
    </div>
  );
}
