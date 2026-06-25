import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import AuthPage from "../../features/auth/pages/AuthPage";
import { ProtectedRoute } from "./ProtectedRouter";
import { LandingPage } from "../../features/Landing/pages/LandingPage";
import { TasksPage } from "../../features/todos/pages/Todos";
import { NotebookDashboard } from "../../features/notebooks/pages/NotebookGrid";
import { EditorPage } from "../../features/notes/pages/EditorPage";

export function AppRouter() {
  return (
    <Routes>

      <Route
        path="/"
        element={<LandingPage />}
      />

      <Route
        path="/auth"
        element={<AuthPage />}
      />

      <Route
        path="/tasks"
        element={
          <ProtectedRoute>
            <TasksPage />
          </ProtectedRoute>
        }
      />

      <Route 
        path="/notebooks"
        element={
          <ProtectedRoute>
            <NotebookDashboard />
          </ProtectedRoute>
        }
      />

      <Route 
        path="/edit"
        element={
          <ProtectedRoute>
            <EditorPage />
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