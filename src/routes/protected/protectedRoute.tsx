import { Navigate, Outlet } from "react-router-dom";
import { checkAuthentication } from "@/utils";

export const ProtectedRoute = () => {
  return checkAuthentication() ? <Outlet /> : <Navigate to="/auth" replace />;
};
