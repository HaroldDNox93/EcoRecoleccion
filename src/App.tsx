import { Outlet } from "react-router-dom";
import Header from "./shared/components/Header";
import Footer from "./shared/components/Footer";
import "./shared/styles/layout.css";

export default function App() {
  return (
    <div className="home-page">
      <div className="shell">
        <Header />
        <main className="main">
          <Outlet /> {/* aquí se cargan Home, Solicitar, etc. */}
        </main>
        <Footer />
      </div>
    </div>
  );
}
