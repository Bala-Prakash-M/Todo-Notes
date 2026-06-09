import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import AuthPage from "../../features/auth/pages/AuthPage";
import { ProtectedRoute } from "./ProtectedRouter";

function HomePage() {
  return <h1>Home Page</h1>;
}

function DashboardPage() {
  return <h1>Dashboard</h1>;
}

export function AppRouter() {
  return (
    <Routes>

      <Route
        path="/"
        element={<HomePage />}
      />

      <Route
        path="/auth"
        element={<AuthPage />}
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />

    </Routes>
  );
}