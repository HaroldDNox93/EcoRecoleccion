import { type FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/LoginPage.css";

function EcoLogo() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 3c1.2 0 2.3.5 3 1.4l1.3 1.7-2.2.6c-1.3.4-2.6-.2-3.3-1.3L4.9 4l.6-.4C6 3.2 6.5 3 7 3zm10.8 6.1c.8 1 .9 2.4.3 3.6l-.9 1.9-1.6-1.7c-.9-1-1.1-2.4-.6-3.6l.4-1 .7.1c.7.1 1.3.3 1.7.7zm-9 10.7c-1.3.1-2.6-.6-3.3-1.8l-1-1.8 2.3.1c1.4 0 2.6.8 3.2 2l.4.9-.5.4c-.4.2-.8.3-1.1.2zm9.2-1.1c-.9 1-2.2 1.4-3.5 1.1l-2-.5 1.3-1.7c.8-1.1 2.1-1.6 3.4-1.3l1 .2-.1.7c-.1.6-.3 1.1-.6 1.5zM11.3 9.2c.5-.6 1.4-.8 2.1-.4.7.4.9 1.3.6 2-.5 1.3-1.1 2.6-1.7 3.8-.3.7-1.1 1-1.8.7-.7-.3-1.1-1.1-.9-1.8.4-1.5 1-3 1.7-4.3z" fill="currentColor"/>
    </svg>
  );
}

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const nav = useNavigate();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErr(null);

    if (!email || !pwd) {
      setErr("Completa correo y contraseña.");
      return;
    }

    try {
      setLoading(true);

      // TODO: Reemplazar por tu API real:
      // const res = await axios.post('/api/auth/login', { email, password: pwd });
      // const token = res.data.token;
      // Simulación:
      await new Promise((r) => setTimeout(r, 500));
      const token = "fake-token-" + Math.random().toString(36).slice(2);

      localStorage.setItem("auth:token", token); // <— guarda el token
      nav("/", { replace: true });               // <— redirige al Home
    } catch (e) {
      setErr("Credenciales inválidas o error de servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card" role="region" aria-labelledby="login-title">
          <div className="card-brand">
            <span className="card-logo"><EcoLogo /></span>
            <span className="card-brand-name">EcoRecolección</span>
          </div>

          <h2 id="login-title" className="title">Iniciar Sesión</h2>

          <form className="form" onSubmit={onSubmit} noValidate>
            <label className="group">
              <span className="label">Correo Electrónico</span>
              <input
                type="email"
                placeholder="Ingrese su correo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </label>

            <label className="group">
              <span className="label">Contraseña</span>
              <input
                type="password"
                placeholder="Ingrese su contraseña"
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
                autoComplete="current-password"
                required
              />
            </label>

            {err && <div className="form-error">{err}</div>}

            <button className="btn-primary" type="submit" disabled={loading}>
              {loading ? "Ingresando..." : "Iniciar Sesión"}
            </button>
          </form>

          <div className="auth-links">
            <Link to="/recover" className="auth-link">
              ¿Olvidaste tu contraseña?
            </Link>
            <div>
              ¿No tienes una cuenta?{" "}
              <Link to="/register" className="auth-link auth-link--primary">
                Regístrate aquí
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
