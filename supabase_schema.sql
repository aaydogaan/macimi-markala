-- =======================================================
-- Mac'imi Markala — Supabase Veritabanı ve Storage Kurulumu
-- Bu SQL kodunu Supabase Dashboard > SQL Editor alanına yapıştırıp "RUN" butonuna basabilirsiniz.
-- =======================================================

-- 1. Rezervasyonlar / Sponsorlar Tablosu
CREATE TABLE IF NOT EXISTS public.reservations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slot_id TEXT NOT NULL,
    brand_name TEXT NOT NULL,
    brand_url TEXT,
    logo_url TEXT NOT NULL,
    amount NUMERIC NOT NULL,
    contact_email TEXT,
    status TEXT NOT NULL DEFAULT 'confirmed', -- 'pending', 'confirmed', 'sold'
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- RLS (Row Level Security) Etkinleştirme
ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;

-- Herkesin onaylanmış rezervasyonları okuyabilmesi için kural
CREATE POLICY "Public can view confirmed reservations"
ON public.reservations
FOR SELECT
USING (true);

-- Herkesin yeni rezervasyon talebi oluşturabilmesi için kural
CREATE POLICY "Public can insert reservations"
ON public.reservations
FOR INSERT
WITH CHECK (true);

-- Realtime yayını etkinleştirme
ALTER PUBLICATION supabase_realtime ADD TABLE public.reservations;

-- 2. Storage Bucket Kurulumu (logos)
INSERT INTO storage.buckets (id, name, public)
VALUES ('logos', 'logos', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Storage için Public Okuma ve Yükleme Kuralları
CREATE POLICY "Public can view logos"
ON storage.objects FOR SELECT
USING (bucket_id = 'logos');

CREATE POLICY "Public can upload logos"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'logos');
