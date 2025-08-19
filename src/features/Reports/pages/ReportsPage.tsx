import { useEffect, useState } from "react";
import "../styles/ReportsPage.css";

type ReportStatus = "PROGRAMADA" | "resolved";

type Report = {
  IdSolicitud: string;
  FechaSolicitud: string;        
  Direccion: string;
  Observaciones: string;
  FechaReporte: string;
  Estado: ReportStatus;
};

function StatusBadge({ status }: { status: ReportStatus }) {
  return (
    <span className={`badge ${status === "PROGRAMADA" ? "badge--pending" : "badge--resolved"}`}>
      {status === "PROGRAMADA" ? "Programada" : "Resuelto"}
    </span>
  );
}

export default function ReportsPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const GetReports = async () => {
      const token = localStorage.getItem("auth:token"); // token del login
      try {
        const res = await fetch("http://localhost:4000/api/request/reporte", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
          },
        });

        const data = await res.json();

        if (res.ok) {
          setReports(data.reporte); 
        }
      } catch (e) {
        console.error("Error al obtener reportes:", e);
      } finally {
        setLoading(false);
      }
    };

    GetReports();
  }, []);
  
  return (
    <section className="reports">
      <header className="reports-head">
        <h1 className="reports-title">Reportes</h1>
      </header>

      {loading ? (
        <p className="reports-loading">Cargando...</p>
      ) : reports.length > 0 ? (
        <div className="reports-list" role="list">
          {reports.map((r) => (
            <article className="report-card" key={r.IdSolicitud} role="listitem">
              <div className="report-row">
                <div className="report-date">{ new Date(r.FechaSolicitud).toLocaleDateString('es-CO', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
                <StatusBadge status={r.Estado} />
              </div>

              <div className="report-address">{r.Direccion}</div>
              <div className="report-desc">{r.Observaciones}</div>
            </article>
          ))}
        </div>
      ) : (
        <p className="reports-empty">No hay solicitudes registradas</p>
      )}
    </section>
  );
}
