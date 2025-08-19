// src/pages/CentrosPage.tsx
import "../styles/CentrosAcopioPage.css";

export default function CentrosAcopioPage() {
  const centros = [
    { nombre: "Centro Verde Norte", ubicacion: "Calle 12 #34-56" },
    { nombre: "EcoPunto Centro", ubicacion: "Carrera 7 #45-23" },
    { nombre: "Recicla Bogotá", ubicacion: "Av. Las Palmas #78-90" },
    { nombre: "Punto Limpio Sur", ubicacion: "Calle 45 #12-34" },
    { nombre: "Centro Ecológico La Esperanza", ubicacion: "Carrera 15 #67-89" },
  ];

  return (
    <section className="centros-page">
      <h1 className="page-title">Centros de Acopio</h1>
      <table className="centros-table">
        <thead>
          <tr>
            <th>Nombre del Centro</th>
            <th>Ubicación</th>
          </tr>
        </thead>
        <tbody>
          {centros.map((centro) => (
            <tr key={centro.nombre}>
              <td>{centro.nombre}</td>
              <td>{centro.ubicacion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
