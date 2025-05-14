import { useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded) return null;

  if (!isSignedIn) return <Navigate to="/signup" />;

  const role = user?.publicMetadata?.role;

  if (role !== "admin") return <Navigate to="/" />;

  return children;
};

export default AdminRoute;
