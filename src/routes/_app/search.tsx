import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Search as SearchIcon } from "lucide-react";
import { format } from "date-fns";
import { PageHeader } from "@/components/PageHeader";

export const Route = createFileRoute("/_app/search")({ component: SearchPage });

function SearchPage() {
  const nav = useNavigate();
  const [flight, setFlight] = useState("");
  const [date, setDate] = useState(format(new Date(), "yyyy-MM-dd"));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fn = flight.trim().toUpperCase().replace(/\s+/g, "");
    if (!fn) return;
    nav({ to: "/flight/$flightNumber/$date", params: { flightNumber: fn, date } });
  };

  return (
    <>
      <PageHeader title="Find your flight" subtitle="Type your flight number and date" back="/feed" />
      <form onSubmit={onSubmit} className="px-5 mt-4 space-y-4">
        <label className="block">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Flight number</span>
          <div className="relative mt-1">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <input
              autoFocus
              value={flight}
              onChange={(e) => setFlight(e.target.value.toUpperCase())}
              placeholder="e.g. AA1234"
              className="w-full pl-11 pr-4 py-4 rounded-2xl bg-input border border-border text-lg font-display font-semibold tracking-wider focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </label>

        <label className="block">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Flight date</span>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 w-full px-4 py-4 rounded-2xl bg-input border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </label>

        <button type="submit"
          className="w-full py-4 rounded-full bg-primary text-primary-foreground font-semibold shadow-glow active:scale-[0.98] transition-transform">
          Find seats
        </button>
      </form>
    </>
  );
}
