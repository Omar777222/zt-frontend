export default function CheckList({ checks }) {
  return (
    <ol className="checks">
      {checks.map((check) => (
        <li key={check.name} className="checks__item">
          <strong>{check.name}</strong>
          <span>{check.detail}</span>
        </li>
      ))}
    </ol>
  );
}
