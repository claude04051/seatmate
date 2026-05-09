import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { PageHeader } from "@/components/PageHeader";
import { Plane, Search, ArrowRight } from "lucide-react";
import { format } from "date-fns";

export const Route = createFileRoute("/_app/feed")({ component: Feed });

type Post = {
  id: string;
  flight_number: string;
  flight_date: string;
  seat: string;
  selfie_path: string;
  created_at: string;
};

function Feed() {
  const { data: posts, isLoading } = useQuery({
    queryKey: ["recent-posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("seat_posts")
        .select("id, flight_number, flight_date, seat, selfie_path, created_at")
        .order("created_at", { ascending: false })
        .limit(30);
      if (error) throw error;
      return data as Post[];
    },
  });

  // Group by flight
  const flights = Array.from(
    (posts ?? []).reduce((map, p) => {
      const key = `${p.flight_number}|${p.flight_date}`;
      if (!map.has(key)) map.set(key, { flight_number: p.flight_number, flight_date: p.flight_date, posts: [] as Post[] });
      map.get(key)!.posts.push(p);
      return map;
    }, new Map<string, { flight_number: string; flight_date: string; posts: Post[] }>()).values()
  );

  return (
    <>
      <PageHeader title="On board" subtitle="Flights with people aboard" />

      <div className="px-5 mt-2">
        <Link to="/search"
          className="flex items-center gap-3 px-4 py-3.5 rounded-2xl bg-card/60 border border-border glass">
          <Search className="size-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground flex-1">Search a flight…</span>
          <ArrowRight className="size-4 text-muted-foreground" />
        </Link>
      </div>

      <div className="px-5 mt-6 space-y-4">
        {isLoading && <SkeletonList />}
        {!isLoading && flights.length === 0 && (
          <div className="text-center py-16">
            <div className="mx-auto size-14 rounded-2xl bg-muted flex items-center justify-center">
              <Plane className="size-6 text-muted-foreground" />
            </div>
            <p className="mt-4 font-semibold">No one's flying yet</p>
            <p className="text-sm text-muted-foreground mt-1">Be the first to claim your seat.</p>
            <Link to="/search" className="mt-5 inline-block px-6 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold">
              Find your flight
            </Link>
          </div>
        )}
        {flights.map((f) => (
          <FlightCard key={f.flight_number + f.flight_date} flight={f} />
        ))}
      </div>
    </>
  );
}

function FlightCard({ flight }: { flight: { flight_number: string; flight_date: string; posts: Post[] } }) {
  return (
    <Link
      to="/flight/$flightNumber/$date"
      params={{ flightNumber: flight.flight_number, date: flight.flight_date }}
      className="block p-4 rounded-3xl bg-card border border-border shadow-card hover:border-primary/40 transition-colors"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="font-display text-2xl font-bold tracking-tight">{flight.flight_number}</p>
          <p className="text-xs text-muted-foreground mt-0.5">
            {format(new Date(flight.flight_date), "EEE, MMM d")}
          </p>
        </div>
        <div className="size-9 rounded-xl bg-primary/15 flex items-center justify-center">
          <Plane className="size-4 text-primary -rotate-45" />
        </div>
      </div>

      <div className="mt-4 flex items-center">
        <div className="flex -space-x-2">
          {flight.posts.slice(0, 5).map((p) => (
            <Avatar key={p.id} path={p.selfie_path} />
          ))}
        </div>
        <p className="ml-3 text-sm text-muted-foreground">
          <span className="text-foreground font-semibold">{flight.posts.length}</span> on board
        </p>
      </div>
    </Link>
  );
}

function Avatar({ path }: { path: string }) {
  const url = supabase.storage.from("selfies").getPublicUrl(path).data.publicUrl;
  return <img src={url} alt="" className="size-9 rounded-full border-2 border-card object-cover bg-muted" />;
}

function SkeletonList() {
  return (
    <>
      {[0, 1, 2].map((i) => (
        <div key={i} className="h-32 rounded-3xl bg-card/40 animate-pulse" />
      ))}
    </>
  );
}
