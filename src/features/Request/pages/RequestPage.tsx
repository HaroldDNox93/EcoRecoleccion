import { type FormEvent, useState } from "react";
import "../styles/RequestPage.css";
import { FaEdit } from "react-icons/fa"; // Icono de lápiz
import { Link } from "react-router-dom";

type Residuo = 1 | 2 | 3; // 1 = Orgánico, 2 = Reciclable, 3 = Peligroso

export default function RequestPage() {
  const user = JSON.parse(String(localStorage.getItem("auth:user")));
  console.log(user);

  const [direccion, setDireccion] = useState(user.direccion);
  const [fecha, setFecha] = useState<string>("");
  const [tipo, setTipo] = useState<Residuo | null>(null);
  let valor: string;
  const onSubmit = async (e: FormEvent) => {
    console.log('hola')
    e.preventDefault();

    const token = localStorage.getItem("auth:token");

    try {
      console.log(tipo)
      if (tipo == 1) {
        if (!direccion || !tipo) return;

        if (user.recoleccionProgramada == 'Y') {
          valor = 'N';

        } else if (user.recoleccionProgramada == 'N') {
          valor = 'Y'
        }

        const res = await fetch("http://localhost:4000/api/request/recoProgramada", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
          },
          body: JSON.stringify({
            "valor": valor
          }),
        });
        const data = await res.json();

        if (res.ok) {
          console.log("Solicitud enviada:", data);
          alert("¡Solicitud enviada con éxito!");
          setDireccion(user.direccion);
          setFecha("");
          setTipo(null);
          user.recoleccionProgramada = valor;
          localStorage.setItem("auth:user", JSON.stringify(user));
        } else {
          console.error("Error en la solicitud:", data);
          alert("Error al enviar la solicitud");
        }


      } else if (tipo == 2 || tipo == 3) {
        if (!direccion || !fecha || !tipo) return;
        const res = await fetch("http://localhost:4000/api/request/solicitudes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
          },
          body: JSON.stringify({
            residuos: {
              idTipoResiduo: tipo,
              fecha: fecha,
              direccion: direccion,
            },
          }),
        });
        const data = await res.json();

        if (res.ok) {
          console.log("Solicitud enviada:", data);
          alert("¡Solicitud enviada con éxito!");
          setDireccion(user.direccion);
          setFecha("");
          setTipo(null);
        } else {
          console.error("Error en la solicitud:", data);
          alert("Error al enviar la solicitud");
        }
      }




    } catch (err) {
      console.error("Error en fetch:", err);
      alert("Error al conectar con el servidor");
    }
  };

  type Action = "Programar" | "Detener programación" | "Solicitar" | "Selecciona";
  type ButtonStatus = "btn-primary" | "btn-danger" | "Selecciona";

  function StatusButton(IdResiduo: Residuo | null): {
    text: Action;
    style: ButtonStatus;
  } {
    if (!IdResiduo) return { text: "Selecciona", style: "btn-primary" };

    switch (IdResiduo) {
      case 1: {
        const recoleccionProgramada: string = user.recoleccionProgramada;
        if (recoleccionProgramada === "Y") {
          return { text: "Detener programación", style: "btn-danger" };
        } else {
          return { text: "Programar", style: "btn-primary" };
        }
      }
      case 2:
      case 3:
        return { text: "Solicitar", style: "btn-primary" };
      default:
        return { text: "Selecciona", style: "btn-primary" };
    }
  }

  const buttonConfig = StatusButton(tipo);

  return (
    <section className="request">
      <header className="request-head">
        <h1 className="request-title">
          Solicitud de
          <br />
          Servicio
        </h1>
      </header>

      <form className="request-form" onSubmit={onSubmit} noValidate>
        {/* Dirección */}
        <label className="group">
          <span className="label">Dirección</span>
          <div className="input-button-wrapper">
            <input
              type="text"
              placeholder="Dirección"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
              disabled
              required
            />
        <Link to="/account/data" className="link-button">            
            <button
              type="button"
              className="btn-primary"
            >
              <FaEdit className="edit-icon" />
            </button>
            </Link>
          </div>
        </label>

        {/* Fecha */}
        {tipo !== 1 && (
          <label className="group">
            <span className="label">Fecha</span>
            <input
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              required
            />
          </label>
        )}

        {/* Tipo de residuos */}
        <label className="group">
          <span className="label">Tipo de Residuos</span>
          <select
            value={tipo ?? ""}
            onChange={(e) => setTipo(Number(e.target.value) as Residuo)}
            required
          >
            <option value="" disabled>
              Selecciona una opción
            </option>
            <option value={1}>Orgánico</option>
            <option value={2}>Reciclable</option>
            <option value={3}>Peligroso</option>
          </select>
        </label>

        {/* Botón dinámico */}
        <button type="submit" className={buttonConfig.style}>
          {buttonConfig.text}
        </button>
      </form>
    </section>
  );
}
