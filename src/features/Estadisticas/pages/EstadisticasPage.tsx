// src/components/ResiduoTable.tsx
import "../styles/EstadisticasPage.css";

export default function EstadisticasPage() {
  const data = [
    { tipo: "Reciclable", cantidad: 0, puntos: 0 },
    { tipo: "Peligroso", cantidad: 0, puntos: 0 },
    { tipo: "Orgánico", cantidad: 0, puntos: 0 },
  ];

  return (
    <section className="residuo-table">
      <h2 className="table-title">Resumen de Residuos</h2>
      <table>
        <thead>
          <tr>
            <th>Tipo de Residuo</th>
            <th>Cantidad</th>
            <th>Puntos</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.tipo}>
              <td>{row.tipo}</td>
              <td>{row.cantidad}</td>
              <td>{row.puntos}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
