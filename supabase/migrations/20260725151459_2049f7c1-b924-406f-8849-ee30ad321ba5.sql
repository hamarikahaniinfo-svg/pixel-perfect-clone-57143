-- Roles
CREATE TYPE public.app_role AS ENUM ('admin','user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "read own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$ SELECT EXISTS(SELECT 1 FROM public.user_roles WHERE user_id=_user_id AND role=_role) $$;

CREATE TABLE public.services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  heading text NOT NULL,
  intro text NOT NULL DEFAULT '',
  meta_title text NOT NULL DEFAULT '',
  meta_desc text NOT NULL DEFAULT '',
  pricing_label text,
  price_suffix text NOT NULL DEFAULT '/one time',
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.services TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.services TO authenticated;
GRANT ALL ON public.services TO service_role;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read services" ON public.services FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "admin write services" ON public.services FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

CREATE TABLE public.plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  service_slug text NOT NULL REFERENCES public.services(slug) ON DELETE CASCADE ON UPDATE CASCADE,
  name text NOT NULL,
  note text NOT NULL DEFAULT '',
  price text NOT NULL DEFAULT '0',
  features text[] NOT NULL DEFAULT '{}',
  featured boolean NOT NULL DEFAULT false,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.plans TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.plans TO authenticated;
GRANT ALL ON public.plans TO service_role;
ALTER TABLE public.plans ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read plans" ON public.plans FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "admin write plans" ON public.plans FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

CREATE TABLE public.site_content (
  key text PRIMARY KEY,
  value jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.site_content TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.site_content TO authenticated;
GRANT ALL ON public.site_content TO service_role;
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read site_content" ON public.site_content FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "admin write site_content" ON public.site_content FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

CREATE TABLE public.faqs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question text NOT NULL,
  answer text NOT NULL,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.faqs TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.faqs TO authenticated;
GRANT ALL ON public.faqs TO service_role;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read faqs" ON public.faqs FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "admin write faqs" ON public.faqs FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

CREATE OR REPLACE FUNCTION public.touch_updated_at() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;
CREATE TRIGGER services_touch BEFORE UPDATE ON public.services FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
CREATE TRIGGER plans_touch BEFORE UPDATE ON public.plans FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
CREATE TRIGGER site_content_touch BEFORE UPDATE ON public.site_content FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();