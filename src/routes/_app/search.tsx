import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useMutation } from "@tanstack/react-query";
import { Search as SearchIcon, Plane } from "lucide-react";
import { format } from "date-fns";
import { PageHeader } from "@/components/PageHeader";
import { searchFlights, type FlightMatch } from "@/lib/flights.functions";

export const Route = createFileRoute("/_app/search")({ component: SearchPage });

function SearchPage() {
  const nav = useNavigate();
  const [airline, setAirline] = useState("");
  const [dep, setDep] = useState("");
  const [arr, setArr] = useState("");
  const [date, setDate] = useState(format(new Date(), "yyyy-MM-dd"));

  const fn = useServerFn(searchFlights);
  const m = useMutation({
    mutationFn: (input: { airline: string; depIata?: string; arrIata?: string; date: string }) =>
      fn({ data: input }),
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!airline.trim()) return;
    m.mutate({
      airline: airline.trim(),
      depIata: dep.trim() || undefined,
      arrIata: arr.trim() || undefined,
      date,
    });
  };

  const pick = (f: FlightMatch) => {
    nav({
      to: "/flight/$flightNumber/$date",
      params: { flightNumber: f.flight_number.toUpperCase(), date },
    });
  };

  return (
    <>
      <PageHeader title="Find your flight" subtitle="We'll match it to a real flight" back="/feed" />
      <form onSubmit={onSubmit} className="px-5 mt-4 space-y-3">
        <label className="block">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Airline</span>
          <div className="relative mt-1">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <input
              autoFocus
              value={airline}
              onChange={(e) => setAirline(e.target.value)}
              placeholder="e.g. Delta or DL"
              className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-input border border-border font-display font-semibold focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </label>

        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">From (IATA)</span>
            <input
              value={dep}
              onChange={(e) => setDep(e.target.value.toUpperCase())}
              maxLength={3}
              placeholder="JFK"
              className="mt-1 w-full px-4 py-3.5 rounded-2xl bg-input border border-border font-display font-semibold tracking-widest text-center focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </label>
          <label className="block">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">To (IATA)</span>
            <input
              value={arr}
              onChange={(e) => setArr(e.target.value.toUpperCase())}
              maxLength={3}
              placeholder="LAX"
              className="mt-1 w-full px-4 py-3.5 rounded-2xl bg-input border border-border font-display font-semibold tracking-widest text-center focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </label>
        </div>

        <label className="block">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Date</span>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 w-full px-4 py-3.5 rounded-2xl bg-input border border-border focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </label>

        <button type="submit" disabled={m.isPending}
          className="w-full py-4 rounded-full bg-primary text-primary-foreground font-semibold shadow-glow active:scale-[0.98] transition-transform disabled:opacity-60">
          {m.isPending ? "Searching…" : "Search flights"}
        </button>
      </form>

      <div className="px-5 mt-6 space-y-2">
        {m.data?.error && (
          <p className="text-sm text-destructive text-center">{m.data.error}</p>
        )}
        {m.data && !m.data.error && m.data.flights.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-6">
            No flights found. Try a different airline or route.
          </p>
        )}
        {m.data?.flights.map((f) => (
          <button
            key={`${f.flight_number}-${f.dep_time}`}
            onClick={() => pick(f)}
            className="w-full text-left p-4 rounded-2xl bg-card border border-border hover:border-primary/50 active:scale-[0.99] transition"
          >
            <div className="flex items-center justify-between">
              <div className="font-display font-bold tracking-wider">{f.flight_number}</div>
              <div className="text-xs text-muted-foreground">{f.airline_name}</div>
            </div>
            <div className="mt-2 flex items-center gap-2 text-sm">
              <span className="font-semibold">{f.dep_iata ?? "—"}</span>
              <Plane className="size-3.5 text-muted-foreground" />
              <span className="font-semibold">{f.arr_iata ?? "—"}</span>
              <span className="ml-auto text-xs text-muted-foreground">
                {f.dep_time ? format(new Date(f.dep_time), "HH:mm") : ""}
              </span>
            </div>
          </button>
        ))}
      </div>
    </>
  );
}
