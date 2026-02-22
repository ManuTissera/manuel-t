

import { Link } from 'react-router-dom';
import '../Files_CSS/navStyle.css'

export default function NavIndex() {
  return (
    <nav className="container-nav">
      <Link to="/pilots">Pilotos</Link>
      <Link to="/records_tires">Registros</Link>
      <Link to="/">Agragr Registro</Link>
    </nav>
  );
}
