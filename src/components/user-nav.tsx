import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";
import { useAuthStore } from "@/stores/use-auth-store";
import { Link } from "react-router-dom";
import { UserCog } from "lucide-react";

export function UserNav() {
  const { user, logout } = useAuthStore();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative size-9 rounded-full select-none">
          <Avatar className="size-9">
            <AvatarImage src={user?.profile_photo_url} alt={user?.name ?? ""} />
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-2">
            <p className="text-sm font-medium leading-none">{user?.name}</p>
            <p className="text-xs leading-none text-slate-400">{user?.email}</p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup className="*:flex *:justify-between">
          <DropdownMenuItem asChild>
            <Link to="/account/profile">
              Configurações da conta
              <UserCog className="size-5" />
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/#">Preferencias</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem onSelect={logout}>Sair da conta</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
