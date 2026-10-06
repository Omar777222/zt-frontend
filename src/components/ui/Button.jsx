export default function Button({ children, variant = 'primary', loading = false, ...props }) {
  return (
    <button className={`btn btn--${variant}`} disabled={loading || props.disabled} {...props}>
      {loading ? 'Verificando…' : children}
    </button>
  );
}
