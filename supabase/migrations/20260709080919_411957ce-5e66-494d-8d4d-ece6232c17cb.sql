ALTER TABLE public.product_overrides
  ADD COLUMN IF NOT EXISTS images jsonb NOT NULL DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS long_description jsonb NOT NULL DEFAULT '{}'::jsonb;