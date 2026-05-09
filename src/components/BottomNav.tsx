import { Link, useRouterState } from "@tanstack/react-router";
import { Plane, Search, User } from "lucide-react";

const items = [
  { to: "/feed", label: "Feed", icon: Plane },
  { to: "/search", label: "Search", icon: Search },
  { to: "/me", label: "Profile", icon: User },
] as const;

export function BottomNav() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 glass border-t border-border safe-bottom">
      <ul className="flex justify-around items-center px-4 pt-2">
        {items.map(({ to, label, icon: Icon }) => {
          const active = path === to || path.startsWith(to + "/");
          return (
            <li key={to}>
              <Link
                to={to}
                className={`flex flex-col items-center gap-1 px-4 py-1.5 rounded-xl transition-colors ${
                  active ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <Icon className="size-5" strokeWidth={active ? 2.5 : 2} />
                <span className="text-[10px] font-medium tracking-wide uppercase">{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
