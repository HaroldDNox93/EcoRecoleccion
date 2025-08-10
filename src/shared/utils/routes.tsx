import { createBrowserRouter, Navigate } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";

// Páginas públicas
import LoginPage from "../../features/Login/pages/LoginPage";

// Layout (contiene Header, Footer y <Outlet/>)
import App from "../../App";

// Páginas dentro del cuadro (protegidas)
import RegisterPage from "../../features/Register/pages/RegisterPage";
import HomePage from "../../features/Home/pages/HomePage";
import AccountPage from "../../features/Account/pages/AccountPage";
import RequestPage from "../../features/Request/pages/RequestPage";
//import PuntosPage from "../../features/Puntos/pages/PuntosPage";
import ReportesPage from "../../features/Reports/pages/ReportsPage";

export const router = createBrowserRouter([
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  //{ path: "/reports", element: <ReportesPage /> },

  {
    path: "/",
    element: (
      <ProtectedRoute>
         <>
        <App /> {/* debe renderizar <Outlet/> adentro */}
        </>
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <HomePage /> },
      { path: "request", element: <RequestPage /> },
      //{ path: "puntos", element: <PuntosPage /> },
      { path: "reports", element: <ReportesPage /> },
      { path: "account", element: <AccountPage /> },
    ],
  },

  // catch-all
  { path: "*", element: <Navigate to="/" replace /> },
]);
