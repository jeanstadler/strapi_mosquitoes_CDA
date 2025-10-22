import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("jwt");

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}
