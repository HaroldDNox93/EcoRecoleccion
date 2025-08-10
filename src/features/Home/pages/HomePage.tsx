import { Link } from "react-router-dom";
import "../styles/HomePage.css";

function SearchIcon(){ return (<svg width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79L20 21.5 21.5 20 15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>); }
function StatsIcon(){ return (<svg width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M3 3h2v18H3zM19 10h2v11h-2zM11 6h2v15h-2zM7 13h2v8H7zM15 3h2v18h-2z"/></svg>); }

export default function HomePage() {
  return (
    <section className="hero">
      <h1 className="hero-title">
        Recicla fácil, gana puntos<br/>y ayuda al planeta
      </h1>

      <Link to="/request" className="btn-primary">Solicitar Recolección</Link>

      <div className="quick-actions">
        <Link to="/centros" className="quick-link"><SearchIcon/> <span>Buscar centros de acopio</span></Link>
        <span className="dot">•</span>
        <Link to="/estadisticas" className="quick-link"><StatsIcon/> <span>Ver mis estadísticas</span></Link>
      </div>
    </section>
  );
}
