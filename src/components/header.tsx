import { Link, useLocation } from "react-router-dom";
import { Logo } from "./logo";
import { UserNav } from "./user-nav";
import { cn } from "@/lib/utils";

export function Header() {
  const { pathname } = useLocation();

  return (
    <header className="border-b bg-white border-[#E6E6E6] px-6 flex items-center h-16 col-span-full">
      <div className="flex justify-between items-center w-full max-w-[1352px] mx-auto">
        <nav className="flex items-center gap-16">
          <Link to="/" className="hidden md:block">
            <Logo />
          </Link>

          <ul>
            <li>
              <Link
                to="/"
                className={cn(
                  pathname === "/" &&
                    "before:content-[''] before:h-1 before:w-full before:bg-primary before:absolute",
                  "before:-bottom-3 before:left-0 before:rounded-t-lg",
                  "hover:opacity-70 transition-opacity",
                  "relative p-2 h-full",
                )}
              >
                Início
              </Link>
            </li>
          </ul>
        </nav>

        <UserNav />
      </div>
    </header>
  );
}
