import { Routes, Route, Navigate } from "react-router-dom";
import RoomPage from "./pages/room";
import LobbyPage from "./pages/lobby";
import RootPage from "./pages/root";
import LoginPage from "./pages/login";
import { AuthProvider, useAuth } from "./context/auth";

export default function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<RootPage />} />
          <Route
            path="/lobby"
            element={
              <RequireAuth>
                <LobbyPage />
              </RequireAuth>
            }
          />
          <Route
            path="/room/:roomId"
            element={
              <RequireAuth>
                <RoomPage />
              </RequireAuth>
            }
          />
          <Route
            path="/login"
            element={
              <NoNeedAuth>
                <LoginPage />
              </NoNeedAuth>
            }
          />
        </Routes>
      </AuthProvider>
    </>
  );
}

function RequireAuth({ children }: { children: JSX.Element }) {
  const { hasAuth } = useAuth();
  return <>{hasAuth ? children : <Navigate to="/login" replace />}</>;
}

function NoNeedAuth({ children }: { children: JSX.Element }) {
  const { hasAuth } = useAuth();
  return <>{hasAuth ? <Navigate to="/" replace /> : children}</>;
}
