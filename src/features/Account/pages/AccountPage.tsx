import { Link, useNavigate } from "react-router-dom";
import { useCallback } from "react";
import "../styles/AccountPage.css";

/* ====== Íconos (inline SVG) ====== */
function ChevronRight() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M9 6l6 6-6 6" />
    </svg>
  );
}
function IconUser() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z"
      />
    </svg>
  );
}
function IconLock() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M17 8h-1V6a4 4 0 0 0-8 0v2H7a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2ZM10 6a2 2 0 1 1 4 0v2h-4Zm2 10a2 2 0 1 1 2-2 2 2 0 0 1-2 2Z"
      />
    </svg>
  );
}
function IconPoints() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2l2.39 4.84 5.33.78-3.86 3.77.91 5.3L12 14.77 7.23 16.7l.91-5.3L4.28 7.62l5.33-.78L12 2z"
      />
    </svg>
  );
}
function IconHistory() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M13 3a9 9 0 1 0 8.95 8H20a7 7 0 1 1-2.05-4.95L16 8h5V3l-2.12 2.12A8.96 8.96 0 0 0 13 3Zm-1 4h2v5h4v2h-6V7Z"
      />
    </svg>
  );
}
function IconLogout() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M10 17v2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h5v2H5v10h5Zm9.59-5-3.3 3.29-1.42-1.41L16.34 13H10v-2h6.34l-1.47-1.88 1.42-1.41L19.59 12Z"
      />
    </svg>
  );
}

/* ====== Página ====== */
export default function AccountPage() {
  const navigate = useNavigate();

  const logout = useCallback(() => {
    localStorage.removeItem("auth:token");     // borra token
    navigate("/login", { replace: true });     // redirige y evita volver con "atrás"
  }, [navigate]);

  // TODO: reemplazar por datos reales (store/API)
  const user = { name: "Marta Pérez", email: "marta@email.com" };

  return (
    <div className="account">
      <div className="account-hero">
        <h1 className="account-title">Mi Cuenta</h1>
        <div className="avatar">
          <span>
            {user.name
              .split(" ")
              .map((p) => p[0])
              .slice(0, 2)
              .join("")
              .toUpperCase()}
          </span>
        </div>
        <div className="user-data">
          <div className="user-name">{user.name}</div>
          <div className="user-email">{user.email}</div>
        </div>
      </div>

      {/* Lista de acciones */}
      <nav aria-label="Acciones de cuenta" className="account-list">
        <Link to="/account/data" className="item">
          <span className="left">
            <i>
              <IconUser />
            </i>
            <span>Mis datos</span>
          </span>
          <i className="chev">
            <ChevronRight />
          </i>
        </Link>

        <Link to="/account/password" className="item">
          <span className="left">
            <i>
              <IconLock />
            </i>
            <span>Cambiar contraseña</span>
          </span>
          <i className="chev">
            <ChevronRight />
          </i>
        </Link>

        <Link to="/puntos" className="item">
          <span className="left">
            <i>
              <IconPoints />
            </i>
            <span>Mis puntos</span>
          </span>
          <i className="chev">
            <ChevronRight />
          </i>
        </Link>

        <Link to="/recolecciones" className="item">
          <span className="left">
            <i>
              <IconHistory />
            </i>
            <span>Historial de recolecciones</span>
          </span>
          <i className="chev">
            <ChevronRight />
          </i>
        </Link>

        <button className="item danger" onClick={logout} type="button">
          <span className="left">
            <i>
              <IconLogout />
            </i>
            <span>Cerrar sesión</span>
          </span>
        </button>
      </nav>
    </div>
  );
}
