
-- Add search_path to trigger functions and revoke public execute
ALTER FUNCTION public.set_updated_at() SET search_path = public;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.set_updated_at() FROM PUBLIC, anon, authenticated;

-- Replace broad selfies SELECT with one that only allows reading individual objects
-- (URLs still work; listing is blocked).
DROP POLICY IF EXISTS "Selfies are publicly viewable" ON storage.objects;
CREATE POLICY "Selfies readable by authenticated"
  ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'selfies');
