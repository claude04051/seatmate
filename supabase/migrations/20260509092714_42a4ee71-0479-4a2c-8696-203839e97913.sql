
-- Profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  instagram TEXT,
  contact_phone TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Profiles are viewable by authenticated users"
  ON public.profiles FOR SELECT TO authenticated USING (true);

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id);

-- Seat posts table
CREATE TABLE public.seat_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  flight_number TEXT NOT NULL,
  flight_date DATE NOT NULL,
  seat TEXT NOT NULL,
  selfie_path TEXT NOT NULL,
  ticket_path TEXT NOT NULL,
  show_instagram BOOLEAN NOT NULL DEFAULT false,
  show_phone BOOLEAN NOT NULL DEFAULT false,
  caption TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (flight_number, flight_date, seat)
);

CREATE INDEX seat_posts_flight_idx ON public.seat_posts (flight_number, flight_date);
CREATE INDEX seat_posts_user_idx ON public.seat_posts (user_id);

ALTER TABLE public.seat_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Seat posts viewable by authenticated"
  ON public.seat_posts FOR SELECT TO authenticated USING (true);

CREATE POLICY "Users insert own seat posts"
  ON public.seat_posts FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users update own seat posts"
  ON public.seat_posts FOR UPDATE TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users delete own seat posts"
  ON public.seat_posts FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1)))
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- updated_at trigger
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Storage buckets
INSERT INTO storage.buckets (id, name, public) VALUES ('selfies', 'selfies', true)
  ON CONFLICT (id) DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('tickets', 'tickets', false)
  ON CONFLICT (id) DO NOTHING;

-- Storage policies: selfies (public read, owner write)
CREATE POLICY "Selfies are publicly viewable"
  ON storage.objects FOR SELECT USING (bucket_id = 'selfies');

CREATE POLICY "Users upload own selfies"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'selfies' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users update own selfies"
  ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'selfies' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users delete own selfies"
  ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'selfies' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Storage policies: tickets (owner only, private)
CREATE POLICY "Users view own tickets"
  ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'tickets' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users upload own tickets"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'tickets' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users delete own tickets"
  ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'tickets' AND auth.uid()::text = (storage.foldername(name))[1]);
