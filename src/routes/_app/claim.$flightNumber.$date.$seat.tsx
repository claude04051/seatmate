import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { Camera, Ticket, Check, Instagram, Phone } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-context";
import { PageHeader } from "@/components/PageHeader";
import { format } from "date-fns";

export const Route = createFileRoute("/_app/claim/$flightNumber/$date/$seat")({
  component: ClaimPage,
});

function ClaimPage() {
  const { flightNumber, date, seat } = Route.useParams();
  const { user } = useAuth();
  const nav = useNavigate();

  const [ticket, setTicket] = useState<File | null>(null);
  const [selfie, setSelfie] = useState<File | null>(null);
  const [instagram, setInstagram] = useState("");
  const [phone, setPhone] = useState("");
  const [showIg, setShowIg] = useState(false);
  const [showPhone, setShowPhone] = useState(false);
  const [caption, setCaption] = useState("");
  const [busy, setBusy] = useState(false);

  const ticketRef = useRef<HTMLInputElement>(null);
  const selfieRef = useRef<HTMLInputElement>(null);

  const ticketUrl = ticket ? URL.createObjectURL(ticket) : null;
  const selfieUrl = selfie ? URL.createObjectURL(selfie) : null;

  const submit = async () => {
    if (!user) return;
    if (!ticket) return toast.error("Add a photo of your ticket to verify");
    if (!selfie) return toast.error("Add your selfie");
    setBusy(true);
    try {
      const ext = (f: File) => f.name.split(".").pop()?.toLowerCase() || "jpg";
      const slug = `${user.id}/${flightNumber}-${date}-${seat}-${Date.now()}`;
      const ticketPath = `${slug}-ticket.${ext(ticket)}`;
      const selfiePath = `${slug}-selfie.${ext(selfie)}`;

      const [t, s] = await Promise.all([
        supabase.storage.from("tickets").upload(ticketPath, ticket, { upsert: false }),
        supabase.storage.from("selfies").upload(selfiePath, selfie, { upsert: false }),
      ]);
      if (t.error) throw t.error;
      if (s.error) throw s.error;

      // Update profile contact info if user wants to share
      if (showIg && instagram || showPhone && phone) {
        await supabase.from("profiles").update({
          instagram: instagram || null,
          contact_phone: phone || null,
        }).eq("id", user.id);
      }

      const { error } = await supabase.from("seat_posts").insert({
        user_id: user.id,
        flight_number: flightNumber,
        flight_date: date,
        seat,
        selfie_path: selfiePath,
        ticket_path: ticketPath,
        show_instagram: showIg && !!instagram,
        show_phone: showPhone && !!phone,
        caption: caption || null,
      });
      if (error) {
        if (error.code === "23505") throw new Error("That seat is already taken on this flight.");
        throw error;
      }

      toast.success("You're on board!");
      nav({ to: "/flight/$flightNumber/$date", params: { flightNumber, date } });
    } catch (e: any) {
      toast.error(e.message);
    } finally { setBusy(false); }
  };

  return (
    <>
      <PageHeader
        title={`Seat ${seat}`}
        subtitle={`${flightNumber} · ${format(new Date(date), "MMM d")}`}
        back="/flight/$flightNumber/$date"
      />

      <div className="px-5 mt-2 space-y-5">
        {/* Step 1: ticket */}
        <Section step={1} title="Verify your ticket" desc="Upload a photo so we know it's really your seat. Only you can see it.">
          <UploadCard
            icon={Ticket}
            label="Ticket photo"
            previewUrl={ticketUrl}
            onPick={() => ticketRef.current?.click()}
          />
          <input ref={ticketRef} type="file" accept="image/*" capture="environment" className="hidden"
            onChange={(e) => setTicket(e.target.files?.[0] ?? null)} />
        </Section>

        {/* Step 2: selfie */}
        <Section step={2} title="Add your face" desc="The seat-mates next to you will see this.">
          <UploadCard
            icon={Camera}
            label="Selfie or photo"
            previewUrl={selfieUrl}
            onPick={() => selfieRef.current?.click()}
            tall
          />
          <input ref={selfieRef} type="file" accept="image/*" capture="user" className="hidden"
            onChange={(e) => setSelfie(e.target.files?.[0] ?? null)} />

          <input
            value={caption}
            onChange={(e) => setCaption(e.target.value.slice(0, 80))}
            placeholder="Say hi (optional)"
            className="mt-3 w-full px-4 py-3 rounded-2xl bg-input border border-border text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </Section>

        {/* Step 3: contacts */}
        <Section step={3} title="Share contact (optional)" desc="Let aboard travelers reach out.">
          <ToggleField
            icon={Instagram} label="Instagram"
            enabled={showIg} onToggle={setShowIg}
            value={instagram} onChange={setInstagram} placeholder="@yourhandle"
          />
          <div className="h-3" />
          <ToggleField
            icon={Phone} label="Phone"
            enabled={showPhone} onToggle={setShowPhone}
            value={phone} onChange={setPhone} placeholder="+1 555 0100"
          />
        </Section>

        <button onClick={submit} disabled={busy}
          className="w-full py-4 rounded-full bg-primary text-primary-foreground font-semibold shadow-glow disabled:opacity-50 active:scale-[0.98] transition-transform mb-6">
          {busy ? "Boarding…" : "Take my seat"}
        </button>
      </div>
    </>
  );
}

function Section({ step, title, desc, children }: { step: number; title: string; desc: string; children: React.ReactNode }) {
  return (
    <section className="p-4 rounded-3xl bg-card border border-border shadow-card">
      <div className="flex items-start gap-3">
        <div className="size-7 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">
          {step}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold">{title}</h3>
          <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
        </div>
      </div>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function UploadCard({
  icon: Icon, label, previewUrl, onPick, tall,
}: { icon: any; label: string; previewUrl: string | null; onPick: () => void; tall?: boolean }) {
  return (
    <button type="button" onClick={onPick}
      className={`w-full ${tall ? "aspect-[3/4]" : "aspect-[5/3]"} rounded-2xl border-2 border-dashed border-border bg-muted/40 flex items-center justify-center overflow-hidden relative active:scale-[0.99] transition-transform`}>
      {previewUrl ? (
        <>
          <img src={previewUrl} alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute top-2 right-2 size-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
            <Check className="size-4" />
          </div>
        </>
      ) : (
        <div className="text-center">
          <Icon className="size-7 mx-auto text-muted-foreground" />
          <p className="text-xs text-muted-foreground mt-2">Tap to add {label.toLowerCase()}</p>
        </div>
      )}
    </button>
  );
}

function ToggleField({
  icon: Icon, label, enabled, onToggle, value, onChange, placeholder,
}: { icon: any; label: string; enabled: boolean; onToggle: (v: boolean) => void; value: string; onChange: (v: string) => void; placeholder: string }) {
  return (
    <div>
      <label className="flex items-center gap-2.5">
        <Icon className="size-4 text-muted-foreground" />
        <span className="text-sm font-medium flex-1">{label}</span>
        <button type="button" onClick={() => onToggle(!enabled)}
          className={`w-10 h-6 rounded-full transition-colors ${enabled ? "bg-primary" : "bg-muted"} relative`}>
          <span className={`absolute top-0.5 size-5 rounded-full bg-white transition-transform ${enabled ? "translate-x-[18px]" : "translate-x-0.5"}`} />
        </button>
      </label>
      {enabled && (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="mt-2 w-full px-4 py-3 rounded-2xl bg-input border border-border text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
      )}
    </div>
  );
}
