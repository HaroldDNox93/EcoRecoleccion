import "../styles/ReportsPage.css";

type ReportStatus = "pending" | "resolved";

type Report = {
  id: string;
  date: string;        // ISO o texto legible
  address: string;
  description: string;
  status: ReportStatus;
};

// Mock de datos — cámbialo por tu fetch
const REPORTS: Report[] = [
  {
    id: "r1",
    date: "24 abr. 2024",
    address: "Calle Falsa 123",
    description: "No han recogido los residuos",
    status: "pending",
  },
  {
    id: "r2",
    date: "15 abr. 2024",
    address: "Calle Falsa 123",
    description: "El camión llegó con retraso",
    status: "resolved",
  },
  {
    id: "r3",
    date: "02 mar. 2024",
    address: "Calle Falsa 123",
    description: "Hubo un error en los residuos",
    status: "resolved",
  },
  {
    id: "r4",
    date: "20 feb. 2024",
    address: "20 feb. 2024",
    description: "Se saltaron mi dirección",
    status: "resolved",
  },
];

function StatusBadge({ status }: { status: ReportStatus }) {
  return (
    <span className={`badge ${status === "pending" ? "badge--pending" : "badge--resolved"}`}>
      {status === "pending" ? "Pendiente" : "Resuelto"}
    </span>
  );
}

export default function ReportsPage() {
  return (
    <section className="reports">
      <header className="reports-head">
        <h1 className="reports-title">Reportes</h1>
      </header>

      <div className="reports-list" role="list">
        {REPORTS.map((r) => (
          <article className="report-card" key={r.id} role="listitem">
            <div className="report-row">
              <div className="report-date">{r.date}</div>
              <StatusBadge status={r.status} />
            </div>

            <div className="report-address">{r.address}</div>
            <div className="report-desc">{r.description}</div>
          </article>
        ))}
      </div>
    </section>
  );
}
