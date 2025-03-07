import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "./\bstore/useAuthStore";

const ProtectedRoute = () => {
  const { username } = useAuthStore();

  return username ? <Outlet /> : <Navigate to="/loginpage" replace />;
};

export default ProtectedRoute;
