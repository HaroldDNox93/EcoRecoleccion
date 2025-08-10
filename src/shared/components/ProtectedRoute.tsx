import type { JSX } from "react";
import { Navigate, useLocation } from "react-router-dom";

type Props = { children: JSX.Element };

export default function ProtectedRoute({ children }: Props) {
  const token = localStorage.getItem("auth:token");
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return children;
}
