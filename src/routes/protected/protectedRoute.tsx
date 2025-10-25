import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { authApi } from "@/api/auth";
import { useAppDispatch } from "@/hooks/storeHooks";
import { setUser } from "@/store/slices/authSlice";

export const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const dispatch = useAppDispatch();
  const location = useLocation();

  useEffect(() => {
    const validateAuth = async () => {
      try {
        const user = await authApi.refresh();
        dispatch(setUser(user));
        localStorage.setItem("accessToken", user.token);
        setIsAuthenticated(true);
      } catch {
        localStorage.removeItem("accessToken");
        setIsAuthenticated(false);
      }
    };
    validateAuth();
  }, [dispatch]);

  if (isAuthenticated === null) {
    return null;
  }

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/auth" state={{ from: location }} replace />
  );
};
