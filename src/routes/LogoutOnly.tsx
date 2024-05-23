import { useAuthStore } from "@/stores/use-auth-store";
import { Loader2 } from "lucide-react";
import { Suspense } from "react";
import { Navigate, Outlet } from "react-router-dom";

export function LogoutOnly() {
  const auth = useAuthStore();

  if (auth.isLoggedIn) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="min-h-[100dvh] bg-slate-100 flex justify-center items-center">
      <Suspense fallback={<Loader2 />}>
        <Outlet />
      </Suspense>
    </div>
  );
}
