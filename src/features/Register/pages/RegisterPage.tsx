import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/RegisterPage.css";

function EcoLogo() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M7 3c1.2 0 2.3.5 3 1.4l1.3 1.7-2.2.6c-1.3.4-2.6-.2-3.3-1.3L4.9 4l.6-.4C6 3.2 6.5 3 7 3zm10.8 6.1c.8 1 .9 2.4.3 3.6l-.9 1.9-1.6-1.7c-.9-1-1.1-2.4-.6-3.6l.4-1 .7.1c.7.1 1.3.3 1.7.7zm-9 10.7c-1.3.1-2.6-.6-3.3-1.8l-1-1.8 2.3.1c1.4 0 2.6.8 3.2 2l.4.9-.5.4c-.4.2-.8.3-1.1.2zm9.2-1.1c-.9 1-2.2 1.4-3.5 1.1l-2-.5 1.3-1.7c.8-1.1 2.1-1.6 3.4-1.3l1 .2-.1.7c-.1.6-.3 1.1-.6 1.5zM11.3 9.2c.5-.6 1.4-.8 2.1-.4.7.4.9 1.3.6 2-.5 1.3-1.1 2.6-1.7 3.8-.3.7-1.1 1-1.8.7-.7-.3-1.1-1.1-.9-1.8.4-1.5 1-3 1.7-4.3z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function RegisterPage() {
  const nav = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
    telefono: "",
    direccion: "",
  });
  const [loading, setLoading] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      alert("Las contraseñas no coinciden");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("http://localhost:4000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          nombre: form.name,
          email: form.email,
          password: form.password,
          celphone: form.telefono,
          adrees: form.direccion
        })
      });

      const data = await res.json();

      if (res.ok) {
        alert("Registro exitoso ✔️");
        nav("/login");
      } else {
        alert(data.error || "Error al registrar usuario");
      }
    } catch (err) {
      alert("Error de red o del servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-card" role="region" aria-labelledby="register-title">
          {/* Marca arriba */}
          <div className="card-brand">
            <span className="card-logo"><EcoLogo /></span>
            <span className="card-brand-name">EcoRecolección</span>
          </div>

          <h2 id="register-title" className="title">
            Registro de<br/>Cuenta
          </h2>

          <form className="form" onSubmit={onSubmit} noValidate>
            <label className="group">
              <span className="label">Nombre</span>
              <input
                name="name"
                type="text"
                placeholder="Nombre"
                autoComplete="name"
                value={form.name}
                onChange={onChange}
                required
              />
            </label>

            <label className="group">
              <span className="label">Correo Electrónico</span>
              <input
                name="email"
                type="email"
                placeholder="Correo Electrónico"
                autoComplete="email"
                value={form.email}
                onChange={onChange}
                required
              />
            </label>

            <label className="group">
              <span className="label">Teléfono</span>
              <input
                name="telefono"
                type="tel"
                placeholder="Teléfono"
                autoComplete="tel"
                value={form.telefono}
                onChange={onChange}
                required
              />
            </label>

            <label className="group">
              <span className="label">Dirección</span>
              <input
                name="direccion"
                type="text"
                placeholder="Dirección"
                autoComplete="street-address"
                value={form.direccion}
                onChange={onChange}
                required
              />
            </label>

            <label className="group">
              <span className="label">Contraseña</span>
              <input
                name="password"
                type="password"
                placeholder="Contraseña"
                autoComplete="new-password"
                value={form.password}
                onChange={onChange}
                required
                minLength={6}
              />
            </label>

            <label className="group">
              <span className="label">Confirmar Contraseña</span>
              <input
                name="confirm"
                type="password"
                placeholder="Confirmar Contraseña"
                autoComplete="new-password"
                value={form.confirm}
                onChange={onChange}
                required
                minLength={6}
              />
            </label>

            <button className="btn-primary" type="submit" disabled={loading}>
              {loading ? "Registrando..." : "Registrarse"}
            </button>
          </form>

          <div className="auth-links">
            <div>
              ¿Ya tienes cuenta?{" "}
              <Link to="/login" className="auth-link auth-link--primary">
                Inicia sesión
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}