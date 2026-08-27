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
    order_code TEXT,
    status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'confirmed', 'sold', 'rejected'
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Eğer tablo önceden oluşturulduysa order_code kolonunu garanti ekleyelim:
ALTER TABLE public.reservations ADD COLUMN IF NOT EXISTS order_code TEXT;

-- RLS (Row Level Security) Etkinleştirme
ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;

-- Okuma (Herkes görebilir)
CREATE POLICY "Public can view reservations"
ON public.reservations FOR SELECT
USING (true);

-- Ekleme (Müşteriler sipariş oluşturabilir)
CREATE POLICY "Public can insert reservations"
ON public.reservations FOR INSERT
WITH CHECK (true);

-- Güncelleme (Admin panel onaylayabilir)
CREATE POLICY "Public can update reservations"
ON public.reservations FOR UPDATE
USING (true);

-- Silme (Admin panel silebilir)
CREATE POLICY "Public can delete reservations"
ON public.reservations FOR DELETE
USING (true);

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

-- 3. Toplam Ziyaretçi / Site İstatistikleri Tablosu (Sıfırlanmayan Sayaç)
CREATE TABLE IF NOT EXISTS public.site_stats (
    id TEXT PRIMARY KEY,
    total_visits BIGINT NOT NULL DEFAULT 4,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- İlk kaydı ekle (eğer yoksa 4'ten başlat)
INSERT INTO public.site_stats (id, total_visits)
VALUES ('global', 4)
ON CONFLICT (id) DO NOTHING;

-- RLS (Row Level Security)
ALTER TABLE public.site_stats ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view site stats" ON public.site_stats;
CREATE POLICY "Public can view site stats"
ON public.site_stats FOR SELECT
USING (true);

DROP POLICY IF EXISTS "Public can update site stats" ON public.site_stats;
CREATE POLICY "Public can update site stats"
ON public.site_stats FOR UPDATE
USING (true);

DROP POLICY IF EXISTS "Public can insert site stats" ON public.site_stats;
CREATE POLICY "Public can insert site stats"
ON public.site_stats FOR INSERT
WITH CHECK (true);

-- Realtime yayınına site_stats ekleme
ALTER PUBLICATION supabase_realtime ADD TABLE public.site_stats;

-- Atomik Ziyaret Sayacı Artırma Fonksiyonu
CREATE OR REPLACE FUNCTION increment_site_visits()
RETURNS BIGINT
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    new_count BIGINT;
BEGIN
    INSERT INTO public.site_stats (id, total_visits, updated_at)
    VALUES ('global', 4, NOW())
    ON CONFLICT (id)
    DO UPDATE SET 
        total_visits = public.site_stats.total_visits + 1,
        updated_at = NOW()
    RETURNING total_visits INTO new_count;
    
    RETURN new_count;
END;
$$;

