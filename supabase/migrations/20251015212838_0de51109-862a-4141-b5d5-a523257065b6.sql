-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL DEFAULT 'user',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create certificates table
CREATE TABLE public.certificates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    certificate_number TEXT UNIQUE NOT NULL,
    company_name TEXT NOT NULL,
    certificate_standard TEXT NOT NULL,
    issue_date DATE NOT NULL,
    surveillance_date DATE NOT NULL,
    expiry_date DATE NOT NULL,
    certification_body TEXT NOT NULL DEFAULT 'Americo',
    accreditation_body TEXT NOT NULL DEFAULT 'UAF',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    created_by UUID REFERENCES auth.users(id)
);

ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;

-- Create index for fast certificate number lookups
CREATE INDEX certificates_number_idx ON public.certificates(certificate_number);

-- Create security definer function for role checking
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS Policies for user_roles
CREATE POLICY "Admins can view all roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can view own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "Admins can insert roles"
ON public.user_roles
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update roles"
ON public.user_roles
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete roles"
ON public.user_roles
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for certificates
CREATE POLICY "Anyone can view certificates"
ON public.certificates
FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "Admins can insert certificates"
ON public.certificates
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update certificates"
ON public.certificates
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete certificates"
ON public.certificates
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Create trigger function for updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Create trigger for certificates updated_at
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.certificates
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Insert sample certificate data
INSERT INTO public.certificates (certificate_number, company_name, certificate_standard, issue_date, surveillance_date, expiry_date)
VALUES 
  ('AMER33442', 'PT AHMAD PUTRA INDO KARYA', 'ISO 9001:2015', '2025-10-06', '2026-10-05', '2028-10-05'),
  ('AMER33443', 'PT AHMAD PUTRA INDO KARYA', 'ISO 14001:2015', '2025-10-06', '2026-10-05', '2028-10-05'),
  ('AMER33444', 'PT AHMAD PUTRA INDO KARYA', 'ISO 45001:2018', '2025-10-06', '2026-10-05', '2028-10-05'),
  ('AMER33445', 'PT AHMAD PUTRA INDO KARYA', 'ISO 37001:2016', '2025-10-06', '2026-10-05', '2028-10-05');