import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const PublicRoute = () => {
  const {
    isAuthenticated,
    authLoading,
  } = useAuth();

  if (authLoading) {
    return (
      <div className="auth-loading">
        Checking authentication...
      </div>
    );
  }

  return isAuthenticated ? (
    <Navigate
      to="/"
      replace
    />
  ) : (
    <Outlet />
  );
};

export default PublicRoute;