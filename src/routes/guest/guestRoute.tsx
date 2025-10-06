import { checkAuthentication } from "@/utils";
import { Navigate, Outlet } from "react-router-dom";

export const GuestRoute = () => {
  return checkAuthentication() ? <Navigate to="/" replace /> : <Outlet />;
};
