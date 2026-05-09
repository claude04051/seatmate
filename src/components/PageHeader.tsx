import { Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import type { ReactNode } from "react";

export function PageHeader({
  title, subtitle, back, right,
}: { title: string; subtitle?: string; back?: string; right?: ReactNode }) {
  return (
    <header className="safe-top px-5 pt-4 pb-3 flex items-start justify-between gap-3">
      <div className="flex items-center gap-2 min-w-0 flex-1">
        {back && (
          <Link to={back} className="-ml-2 p-2 rounded-full hover:bg-muted/50">
            <ChevronLeft className="size-5" />
          </Link>
        )}
        <div className="min-w-0">
          <h1 className="text-2xl font-bold truncate">{title}</h1>
          {subtitle && <p className="text-sm text-muted-foreground truncate">{subtitle}</p>}
        </div>
      </div>
      {right}
    </header>
  );
}
