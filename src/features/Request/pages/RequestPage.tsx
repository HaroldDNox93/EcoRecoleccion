import { type FormEvent, useState } from "react";
import "../styles/RequestPage.css";

type Residuo = "organico" | "plastico" | "papel" | "vidrio" | "electrico";

export default function RequestPage() {
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [fecha, setFecha] = useState<string>("");
  const [tipo, setTipo] = useState<Residuo | "">("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!nombre || !direccion || !fecha || !tipo) return;

    // TODO: reemplazar por tu llamada real (axios/fetch)
    console.log("Solicitud enviada:", { nombre, direccion, fecha, tipo });
    alert("¡Solicitud enviada!");
    setNombre(""); setDireccion(""); setFecha(""); setTipo("");
  };

  return (
    <section className="request">
      <header className="request-head">
        <h1 className="request-title">Solicitud de<br/>Servicio</h1>
      </header>

      <form className="request-form" onSubmit={onSubmit} noValidate>
        <label className="group">
          <span className="label">Nombre</span>
          <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </label>

        <label className="group">
          <span className="label">Dirección</span>
          <input
            type="text"
            placeholder="Dirección"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            required
          />
        </label>

        <label className="group">
          <span className="label">Fecha</span>
          <input
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            required
          />
        </label>

        <label className="group">
          <span className="label">Tipo de Residuos</span>
          <select
            value={tipo}
            onChange={(e) => setTipo(e.target.value as Residuo)}
            required
          >
            <option value="" disabled>Selecciona una opción</option>
            <option value="organico">Orgánico</option>
            <option value="plastico">Plástico</option>
            <option value="papel">Papel/Cartón</option>
            <option value="vidrio">Vidrio</option>
            <option value="electrico">Electrónicos</option>
          </select>
        </label>

        <button type="submit" className="btn-primary">Solicitar</button>
      </form>
    </section>
  );
}
