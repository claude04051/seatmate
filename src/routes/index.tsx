import { createFileRoute, Navigate } from "@tanstack/react-router";
import { Plane, Camera, Users } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: Landing });

function Landing() {
  const { session, loading } = useAuth();
  if (loading) return <div className="min-h-screen" />;
  if (session) return <Navigate to="/feed" />;

  return (
    <div className="min-h-screen flex flex-col safe-top safe-bottom px-6">
      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
        <div className="flex items-center gap-2 mb-8">
          <div className="size-10 rounded-xl bg-primary flex items-center justify-center shadow-glow">
            <Plane className="size-5 text-primary-foreground" />
          </div>
          <span className="font-display font-bold text-lg tracking-tight">SeatMate</span>
        </div>

        <h1 className="text-5xl font-bold leading-[1.05]">
          Meet who's<br />on your <span className="text-gradient">flight.</span>
        </h1>
        <p className="mt-5 text-muted-foreground text-base leading-relaxed">
          Claim your seat, drop a selfie, and discover the people sitting around you — before takeoff.
        </p>

        <div className="mt-10 space-y-4">
          {[
            { icon: Plane, text: "Find your flight & pick your seat" },
            { icon: Camera, text: "Verify with your ticket, add your face" },
            { icon: Users, text: "See who's beside you. Maybe say hi." },
          ].map(({ icon: Icon, text }, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="size-9 rounded-lg bg-muted flex items-center justify-center shrink-0">
                <Icon className="size-4 text-primary" />
              </div>
              <p className="text-sm">{text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3 pb-4">
        <Link to="/auth" search={{ mode: "signup" }}
          className="block w-full text-center py-4 rounded-full bg-primary text-primary-foreground font-semibold shadow-glow transition-transform active:scale-[0.98]">
          Get started
        </Link>
        <Link to="/auth" search={{ mode: "signin" }}
          className="block w-full text-center py-4 rounded-full border border-border text-foreground font-medium">
          I already have an account
        </Link>
      </div>
    </div>
  );
}
