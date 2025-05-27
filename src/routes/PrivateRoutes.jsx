import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  const token = sessionStorage.getItem("token");

  // ✅ If token exists, allow access
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
