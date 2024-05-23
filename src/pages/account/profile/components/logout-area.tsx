import { Button } from "@/components/ui/button";

import { useAuthStore } from "@/stores/use-auth-store";
import { LogOut } from "lucide-react";

export function LogoutArea() {
  const { logout } = useAuthStore();

  return (
    <Button
      size="lg"
      variant="outline"
      className="gap-2 text-destructive hover:!text-red-600 hover:!bg-red-100 w-full justify-start pl-10"
      onClick={logout}
    >
      <LogOut className="size-5" />
      Sair da minha conta
    </Button>
  );
}
