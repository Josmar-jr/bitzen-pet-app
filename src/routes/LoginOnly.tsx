import { useAuthStore } from "@/stores/use-auth-store";
import { Navigate, Outlet } from "react-router";

export function LoginOnly() {
  const auth = useAuthStore();

  if (!auth.isLoggedIn) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="min-h-[100dvh] bg-slate-100">
      <Outlet />
    </div>
  );
}
