// Muestra el recorrido de una peticion por la arquitectura (VPC Frontend -> Peering -> VPC Backend)
const HOPS = [
  { name: 'Tu navegador', net: 'Internet' },
  { name: 'Nginx + React', net: 'VPC Frontend · 10.0.0.0/17' },
  { name: 'API Express', net: 'VPC Backend · 10.0.128.0/17' },
];
const LINKS = ['HTTPS · TLS', 'VPC Peering · puerto 3000'];

export default function NetworkPath() {
  return (
    <ol className="netpath" aria-label="Recorrido de la petición">
      {HOPS.map((hop, i) => (
        <li key={hop.name} className="netpath__item">
          <div className="netpath__hop">
            <strong>{hop.name}</strong>
            <span>{hop.net}</span>
          </div>
          {LINKS[i] && <div className="netpath__link">{LINKS[i]}</div>}
        </li>
      ))}
    </ol>
  );
}
