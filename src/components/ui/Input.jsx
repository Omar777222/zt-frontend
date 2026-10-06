export default function Input({ label, id, ...props }) {
  return (
    <div className="field">
      <label className="field__label" htmlFor={id}>{label}</label>
      <input className="field__input" id={id} {...props} />
    </div>
  );
}
