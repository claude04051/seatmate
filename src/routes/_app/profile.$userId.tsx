import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { PageHeader } from "@/components/PageHeader";
import { Instagram, Phone } from "lucide-react";
import { format } from "date-fns";

export const Route = createFileRoute("/_app/profile/$userId")({ component: Profile });

function Profile() {
  const { userId } = Route.useParams();

  const { data: profile } = useQuery({
    queryKey: ["profile", userId],
    queryFn: async () => {
      const { data } = await supabase.from("profiles").select("*").eq("id", userId).single();
      return data;
    },
  });

  const { data: posts } = useQuery({
    queryKey: ["user-posts", userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("seat_posts")
        .select("id, flight_number, flight_date, seat, selfie_path, caption, show_instagram, show_phone, created_at")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const latest = posts?.[0];
  const photoUrl = latest ? supabase.storage.from("selfies").getPublicUrl(latest.selfie_path).data.publicUrl : null;
  const showIg = !!profile?.instagram && posts?.some((p) => p.show_instagram);
  const showPhone = !!profile?.contact_phone && posts?.some((p) => p.show_phone);

  return (
    <>
      <PageHeader title={profile?.display_name ?? "Traveler"} back="/feed" />

      <div className="px-5 mt-2">
        {photoUrl && (
          <div className="aspect-square rounded-3xl overflow-hidden bg-muted shadow-card">
            <img src={photoUrl} alt="" className="w-full h-full object-cover" />
          </div>
        )}

        {(showIg || showPhone) && (
          <div className="mt-4 flex flex-wrap gap-2">
            {showIg && (
              <a href={`https://instagram.com/${profile!.instagram!.replace("@", "")}`}
                target="_blank" rel="noreferrer"
                className="px-4 py-2 rounded-full bg-card border border-border flex items-center gap-2 text-sm">
                <Instagram className="size-4 text-primary" /> {profile!.instagram}
              </a>
            )}
            {showPhone && (
              <a href={`tel:${profile!.contact_phone}`}
                className="px-4 py-2 rounded-full bg-card border border-border flex items-center gap-2 text-sm">
                <Phone className="size-4 text-primary" /> {profile!.contact_phone}
              </a>
            )}
          </div>
        )}

        <h2 className="mt-8 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
          Flights
        </h2>
        <div className="space-y-2">
          {posts?.map((p) => (
            <Link
              key={p.id}
              to="/flight/$flightNumber/$date"
              params={{ flightNumber: p.flight_number, date: p.flight_date }}
              className="flex items-center gap-3 p-3 rounded-2xl bg-card border border-border"
            >
              <div className="px-3 py-1.5 rounded-lg bg-primary/15 text-primary font-display font-bold text-sm">
                {p.seat}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold">{p.flight_number}</p>
                <p className="text-xs text-muted-foreground">{format(new Date(p.flight_date), "MMM d, yyyy")}</p>
              </div>
              {p.caption && <p className="text-xs text-muted-foreground italic max-w-[40%] truncate">"{p.caption}"</p>}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
