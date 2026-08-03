// app/AppRouter.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "../../features/auth/pages/AuthPage";
import { ProtectedRoute } from "./ProtectedRouter";
import { LandingPage } from "../../features/Landing/pages/LandingPage";
import { TasksPage } from "../../features/todos/pages/Todos";
import { NotebookDashboard } from "../../features/notebooks/pages/NotebookGrid";
import { WorkspacePage } from "../../features/notes/pages/WorkspacePage";
import { SmoothScrollLayout } from "../layouts/SmoothScrollLayout";

export function AppRouter() {
  return (
    <Routes>
      {/* Routes wrapped in smooth scrolling (e.g., Landing Page) */}
      <Route element={<SmoothScrollLayout />}>
        <Route path="/" element={<LandingPage />} />
      </Route>

      {/* App routes using standard browser scrolling */}
      <Route path="/auth" element={<AuthPage />} />
      
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
        path="/:notebookId"
        element={
          <ProtectedRoute>
            <WorkspacePage />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}