import { Navigate } from "react-router-dom";
import { useAuthContext } from "../providers/AuthContext";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({
  children,
}: ProtectedRouteProps) {
  const { user, accessToken, isLoading, isLoggingOut } = useAuthContext();

  if (isLoading) {
    return (
      <div className="min-h-screen w-full bg-[#e9ecf0] flex flex-col items-center justify-center font-['Plus_Jakarta_Sans'] select-none">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-neutral-800 stroke-[1.5]" />
          <span className="text-xs font-medium text-neutral-500 tracking-wider">
            Verifying secure session...
          </span>
        </div>
      </div>
    );
  }

  if (!accessToken || !user) {
    return (
      <Navigate
        to={isLoggingOut ? "/" : "/auth"}
        replace
      />
    );
  }

  return <>{children}</>;
}
