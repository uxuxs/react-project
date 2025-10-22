import React, { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "./AuthContext";

export default function ProtectedRoute({ requireAdmin = false }) {
  const auth = useContext(AuthContext);
  const location = useLocation();

  if (!auth.isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  if (requireAdmin && !auth.isAdmin) {
    return (
      <div style={{ padding: 20 }}>
        <h3>Доступ запрещён</h3>
        <div>Требуются права администратора</div>
      </div>
    );
  }

  return <Outlet />;
}
