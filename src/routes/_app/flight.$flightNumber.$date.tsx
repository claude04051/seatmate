import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { PageHeader } from "@/components/PageHeader";
import { format } from "date-fns";
import { Instagram, Phone, Plus } from "lucide-react";

export const Route = createFileRoute("/_app/flight/$flightNumber/$date")({
  component: FlightPage,
});

type Post = {
  id: string;
  user_id: string;
  seat: string;
  selfie_path: string;
  caption: string | null;
  show_instagram: boolean;
  show_phone: boolean;
};

function FlightPage() {
  const { flightNumber, date } = Route.useParams();
  const nav = useNavigate();
  const [seat, setSeat] = useState("");

  const { data: posts } = useQuery({
    queryKey: ["flight", flightNumber, date],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("seat_posts")
        .select("id, user_id, seat, selfie_path, caption, show_instagram, show_phone")
        .eq("flight_number", flightNumber)
        .eq("flight_date", date);
      if (error) throw error;
      return data as Post[];
    },
  });

  const claim = (e: React.FormEvent) => {
    e.preventDefault();
    const s = seat.trim().toUpperCase().replace(/\s+/g, "");
    if (!s) return;
    nav({ to: "/claim/$flightNumber/$date/$seat", params: { flightNumber, date, seat: s } });
  };

  const taken = new Set((posts ?? []).map((p) => p.seat));

  return (
    <>
      <PageHeader
        title={flightNumber}
        subtitle={format(new Date(date), "EEE, MMM d, yyyy")}
        back="/feed"
      />

      <div className="px-5 mt-2">
        <form onSubmit={claim} className="flex gap-2">
          <input
            value={seat}
            onChange={(e) => setSeat(e.target.value.toUpperCase())}
            placeholder="Your seat (e.g. 14A)"
            className="flex-1 px-4 py-3.5 rounded-2xl bg-input border border-border font-display font-semibold tracking-wider focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <button type="submit"
            className="px-5 rounded-2xl bg-primary text-primary-foreground font-semibold flex items-center gap-1.5 shadow-glow active:scale-[0.98]">
            <Plus className="size-4" /> Claim
          </button>
        </form>
      </div>

      <div className="px-5 mt-6">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
          {posts?.length ?? 0} on board
        </h2>
        {posts && posts.length === 0 && (
          <div className="text-center py-12 text-sm text-muted-foreground">
            Empty cabin. Be the first to claim a seat.
          </div>
        )}
        <div className="grid grid-cols-2 gap-3">
          {posts?.map((p) => <SeatCard key={p.id} post={p} />)}
        </div>
        {taken.size > 0 && (
          <p className="text-xs text-muted-foreground mt-6 text-center">
            Taken: {Array.from(taken).sort().join(" · ")}
          </p>
        )}
      </div>
    </>
  );
}

function SeatCard({ post }: { post: Post }) {
  const url = supabase.storage.from("selfies").getPublicUrl(post.selfie_path).data.publicUrl;
  return (
    <Link to="/profile/$userId" params={{ userId: post.user_id }} className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-muted shadow-card group">
      <img src={url} alt={`Seat ${post.seat}`} className="absolute inset-0 w-full h-full object-cover transition-transform group-active:scale-95" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/0" />
      <div className="absolute top-2 left-2 px-2.5 py-1 rounded-full bg-card/90 backdrop-blur text-xs font-display font-bold tracking-wider">
        {post.seat}
      </div>
      <div className="absolute bottom-2 left-2 right-2 flex items-center gap-1.5">
        {post.show_instagram && <Instagram className="size-3.5 text-white" />}
        {post.show_phone && <Phone className="size-3.5 text-white" />}
      </div>
    </Link>
  );
}
