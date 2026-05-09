import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Mail, Phone, Plane, ChevronLeft } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-context";

const search = z.object({ mode: z.enum(["signin", "signup"]).catch("signup") });

export const Route = createFileRoute("/auth")({
  component: AuthPage,
  validateSearch: search,
});

type Method = "email" | "phone";
type Step = "form" | "otp";

function AuthPage() {
  const { mode } = Route.useSearch();
  const nav = useNavigate();
  const { session } = useAuth();
  const [method, setMethod] = useState<Method>("email");
  const [step, setStep] = useState<Step>("form");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => { if (session) nav({ to: "/feed" }); }, [session, nav]);

  const submitEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email, password,
          options: { emailRedirectTo: window.location.origin },
        });
        if (error) throw error;
        toast.success("Welcome aboard!");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
    } catch (e: any) { toast.error(e.message); }
    finally { setBusy(false); }
  };

  const sendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({ phone });
      if (error) throw error;
      setStep("otp");
      toast.success("Code sent");
    } catch (e: any) { toast.error(e.message); }
    finally { setBusy(false); }
  };

  const verifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      const { error } = await supabase.auth.verifyOtp({ phone, token: otp, type: "sms" });
      if (error) throw error;
    } catch (e: any) { toast.error(e.message); }
    finally { setBusy(false); }
  };

  return (
    <div className="min-h-screen flex flex-col safe-top safe-bottom px-6 max-w-md mx-auto w-full">
      <button onClick={() => step === "otp" ? setStep("form") : nav({ to: "/" })}
        className="-ml-2 p-2 self-start rounded-full hover:bg-muted/50">
        <ChevronLeft className="size-5" />
      </button>

      <div className="flex items-center gap-2 mt-2 mb-8">
        <div className="size-9 rounded-xl bg-primary flex items-center justify-center">
          <Plane className="size-4 text-primary-foreground" />
        </div>
        <span className="font-display font-bold tracking-tight">SeatMate</span>
      </div>

      {step === "form" ? (
        <>
          <h1 className="text-3xl font-bold">
            {mode === "signup" ? "Create your account" : "Welcome back"}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {mode === "signup" ? "Two taps and you're flying." : "Sign in to keep flying."}
          </p>

          <div className="mt-6 grid grid-cols-2 gap-2 p-1 bg-muted rounded-full">
            {(["email", "phone"] as Method[]).map((m) => (
              <button key={m} onClick={() => setMethod(m)}
                className={`py-2.5 rounded-full text-sm font-medium flex items-center justify-center gap-2 transition-colors ${
                  method === m ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
                }`}>
                {m === "email" ? <Mail className="size-4" /> : <Phone className="size-4" />}
                {m === "email" ? "Email" : "Phone"}
              </button>
            ))}
          </div>

          {method === "email" ? (
            <form onSubmit={submitEmail} className="mt-6 space-y-3">
              <Field label="Email" type="email" autoComplete="email"
                value={email} onChange={setEmail} placeholder="you@air.mail" required />
              <Field label="Password" type="password"
                autoComplete={mode === "signup" ? "new-password" : "current-password"}
                value={password} onChange={setPassword} placeholder="••••••••" minLength={6} required />
              <PrimaryButton busy={busy}>{mode === "signup" ? "Create account" : "Sign in"}</PrimaryButton>
            </form>
          ) : (
            <form onSubmit={sendOtp} className="mt-6 space-y-3">
              <Field label="Phone (with country code)" type="tel" autoComplete="tel"
                value={phone} onChange={setPhone} placeholder="+15551234567" required />
              <PrimaryButton busy={busy}>Send code</PrimaryButton>
              <p className="text-xs text-muted-foreground text-center">SMS rates may apply.</p>
            </form>
          )}

          <p className="mt-6 text-center text-sm text-muted-foreground">
            {mode === "signup" ? "Already have an account? " : "New here? "}
            <button onClick={() => nav({ to: "/auth", search: { mode: mode === "signup" ? "signin" : "signup" } })}
              className="text-primary font-medium">
              {mode === "signup" ? "Sign in" : "Create one"}
            </button>
          </p>
        </>
      ) : (
        <form onSubmit={verifyOtp} className="space-y-3">
          <h1 className="text-3xl font-bold">Enter the code</h1>
          <p className="text-sm text-muted-foreground">Sent to {phone}</p>
          <Field label="6-digit code" type="text" inputMode="numeric" maxLength={6}
            value={otp} onChange={setOtp} placeholder="123456" required />
          <PrimaryButton busy={busy}>Verify</PrimaryButton>
        </form>
      )}
    </div>
  );
}

function Field(props: {
  label: string; type: string; value: string; onChange: (v: string) => void;
  placeholder?: string; required?: boolean; minLength?: number; maxLength?: number;
  inputMode?: "numeric" | "text"; autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{props.label}</span>
      <input
        type={props.type}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        placeholder={props.placeholder}
        required={props.required}
        minLength={props.minLength}
        maxLength={props.maxLength}
        inputMode={props.inputMode}
        autoComplete={props.autoComplete}
        className="mt-1 w-full px-4 py-3.5 rounded-2xl bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
      />
    </label>
  );
}

function PrimaryButton({ busy, children }: { busy: boolean; children: React.ReactNode }) {
  return (
    <button type="submit" disabled={busy}
      className="w-full py-4 rounded-full bg-primary text-primary-foreground font-semibold shadow-glow disabled:opacity-50 transition-transform active:scale-[0.98]">
      {busy ? "Please wait…" : children}
    </button>
  );
}
