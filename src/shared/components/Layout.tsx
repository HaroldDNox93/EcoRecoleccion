import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import "../styles/layout.css";

export default function Layout() {
  return (
    <div className="home-page">
      <div className="shell">
        <Header />
        {/* El contenido cambia según la ruta */}
        <Outlet />
        <Footer />
      </div>
    </div>
  );
}
