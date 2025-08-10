import { Link, NavLink } from "react-router-dom";

function EcoLogo() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 3c1.2 0 2.3.5 3 1.4l1.3 1.7-2.2.6c-1.3.4-2.6-.2-3.3-1.3L4.9 4l.6-.4C6 3.2 6.5 3 7 3zm10.8 6.1c.8 1 .9 2.4.3 3.6l-.9 1.9-1.6-1.7c-.9-1-1.1-2.4-.6-3.6l.4-1 .7.1c.7.1 1.3.3 1.7.7zm-9 10.7c-1.3.1-2.6-.6-3.3-1.8l-1-1.8 2.3.1c1.4 0 2.6.8 3.2 2l.4.9-.5.4c-.4.2-.8.3-1.1.2zm9.2-1.1c-.9 1-2.2 1.4-3.5 1.1l-2-.5 1.3-1.7c.8-1.1 2.1-1.6 3.4-1.3l1 .2-.1.7c-.1.6-.3 1.1-.6 1.5zM11.3 9.2c.5-.6 1.4-.8 2.1-.4.7.4.9 1.3.6 2-.5 1.3-1.1 2.6-1.7 3.8-.3.7-1.1 1-1.8.7-.7-.3-1.1-1.1-.9-1.8.4-1.5 1-3 1.7-4.3z" fill="currentColor"/>
    </svg>
  );
}

export default function Header() {
  return (
    <nav className="nav">
      <Link to="/" className="brand">
        <span className="logo"><EcoLogo/></span>
        <span className="brand-name">EcoRecolección</span>
      </Link>

      <ul className="menu">
        <li><NavLink to="/" end>Inicio</NavLink></li>
        <li><NavLink to="/request">Solicitar Recolección</NavLink></li>
        <li><NavLink to="/puntos">Puntos</NavLink></li>
        <li><NavLink to="/reports">Reportes</NavLink></li>
        <li><NavLink to="/account">Mi Cuenta</NavLink></li>
      </ul>
    </nav>
  );
}
