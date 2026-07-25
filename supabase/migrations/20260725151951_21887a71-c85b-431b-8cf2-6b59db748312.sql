GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated, anon;

CREATE OR REPLACE FUNCTION public.claim_admin()
RETURNS boolean LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  uid uuid := auth.uid();
  existing int;
BEGIN
  IF uid IS NULL THEN RETURN false; END IF;
  SELECT count(*) INTO existing FROM public.user_roles WHERE role = 'admin';
  IF existing = 0 THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (uid, 'admin')
    ON CONFLICT DO NOTHING;
    RETURN true;
  END IF;
  RETURN public.has_role(uid, 'admin');
END; $$;
REVOKE EXECUTE ON FUNCTION public.claim_admin() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.claim_admin() TO authenticated;