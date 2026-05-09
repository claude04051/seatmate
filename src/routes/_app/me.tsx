import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-context";
import { PageHeader } from "@/components/PageHeader";
import { LogOut, Plane } from "lucide-react";
import { format } from "date-fns";

export const Route = createFileRoute("/_app/me")({ component: Me });

function Me() {
  const { user, signOut } = useAuth();

  const { data: profile } = useQuery({
    queryKey: ["me", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data } = await supabase.from("profiles").select("*").eq("id", user!.id).single();
      return data;
    },
  });

  const { data: posts } = useQuery({
    queryKey: ["my-posts", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("seat_posts")
        .select("id, flight_number, flight_date, seat, selfie_path")
        .eq("user_id", user!.id)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  return (
    <>
      <PageHeader
        title={profile?.display_name ?? "You"}
        subtitle={user?.email ?? user?.phone ?? ""}
        right={
          <button onClick={signOut} className="p-2 rounded-full hover:bg-muted/50">
            <LogOut className="size-5 text-muted-foreground" />
          </button>
        }
      />

      <div className="px-5 mt-4">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
          Your flights
        </h2>

        {!posts?.length ? (
          <div className="text-center py-12">
            <Plane className="size-7 mx-auto text-muted-foreground" />
            <p className="text-sm text-muted-foreground mt-3">No flights yet.</p>
            <Link to="/search" className="mt-5 inline-block px-6 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold">
              Find a flight
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-2">
            {posts.map((p) => {
              const url = supabase.storage.from("selfies").getPublicUrl(p.selfie_path).data.publicUrl;
              return (
                <Link
                  key={p.id}
                  to="/flight/$flightNumber/$date"
                  params={{ flightNumber: p.flight_number, date: p.flight_date }}
                  className="relative aspect-square rounded-2xl overflow-hidden bg-muted"
                >
                  <img src={url} alt="" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-1.5 left-1.5 right-1.5">
                    <p className="text-[10px] font-display font-bold text-white">{p.flight_number}</p>
                    <p className="text-[9px] text-white/80">Seat {p.seat}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
