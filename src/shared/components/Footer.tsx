import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="links">
        <Link to="/politica-datos">Política de datos</Link>
        <Link to="/terminos">Términos de uso</Link>
        <Link to="/contacto">Contacto</Link>
      </div>
      <div className="social">
        <a href="#" aria-label="Facebook">󰈎</a>
        <a href="#" aria-label="Twitter">𝕏</a>
        <a href="#" aria-label="Instagram">◎</a>
      </div>
    </footer>
  );
}
