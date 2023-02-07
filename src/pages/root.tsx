import { Navigate } from "react-router-dom";
import { useAuth } from "../context/auth";

export default function RootPage() {
  const { hasAuth } = useAuth();

  return (
    <>
      {hasAuth ? (
        <Navigate to="/lobby" replace />
      ) : (
        <Navigate to="/login" replace />
      )}
    </>
  );
}
