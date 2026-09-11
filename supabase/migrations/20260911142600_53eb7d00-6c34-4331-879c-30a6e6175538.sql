CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

CREATE TABLE public.health_facilities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  facility_type text NOT NULL DEFAULT 'clinic',
  region text,
  town text,
  address text,
  phone text,
  email text,
  hours text,
  services text[] NOT NULL DEFAULT '{}',
  is_public boolean NOT NULL DEFAULT true,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.health_facilities TO anon;
GRANT SELECT ON public.health_facilities TO authenticated;
GRANT ALL ON public.health_facilities TO service_role;
ALTER TABLE public.health_facilities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Health facilities are viewable by everyone" ON public.health_facilities FOR SELECT USING (true);
CREATE POLICY "Admins manage health facilities" ON public.health_facilities FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER update_health_facilities_updated_at BEFORE UPDATE ON public.health_facilities FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.stock_listings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ticker text NOT NULL UNIQUE,
  company_name text NOT NULL,
  sector text,
  market text NOT NULL DEFAULT 'Eswatini Stock Exchange',
  last_price numeric,
  currency text NOT NULL DEFAULT 'SZL',
  price_updated_at timestamptz,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.stock_listings TO anon;
GRANT SELECT ON public.stock_listings TO authenticated;
GRANT ALL ON public.stock_listings TO service_role;
ALTER TABLE public.stock_listings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Stock listings are viewable by everyone" ON public.stock_listings FOR SELECT USING (true);
CREATE POLICY "Admins manage stock listings" ON public.stock_listings FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER update_stock_listings_updated_at BEFORE UPDATE ON public.stock_listings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX idx_health_facilities_region ON public.health_facilities (region);
CREATE INDEX idx_health_facilities_name ON public.health_facilities (name);