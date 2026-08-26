import { createClient } from "@/utils/supabase/client";

export interface ReservationData {
  slot_id: string;
  brand_name: string;
  brand_url?: string;
  logo_url: string;
  amount: number;
  contact_email?: string;
  status?: "pending" | "confirmed" | "sold";
}

/**
 * Uploads a logo file to Supabase Storage 'logos' bucket.
 * Falls back to client-side data URL if storage is not yet initialized.
 */
export async function uploadLogo(file: File, slotId: string): Promise<string> {
  const supabase = createClient();
  const fileExt = file.name.split(".").pop() || "png";
  const fileName = `${slotId}-${Date.now()}.${fileExt}`;
  const filePath = `user-uploads/${fileName}`;

  try {
    const { error: uploadError } = await supabase.storage
      .from("logos")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: true,
      });

    if (uploadError) {
      console.warn("Supabase Storage bucket upload note:", uploadError.message);
      // Return local FileReader dataUrl as fallback
      return await fileToDataUrl(file);
    }

    const { data: publicData } = supabase.storage
      .from("logos")
      .getPublicUrl(filePath);

    return publicData.publicUrl;
  } catch (err) {
    console.warn("Storage upload fallback used:", err);
    return await fileToDataUrl(file);
  }
}

/**
 * Saves a new sponsor reservation in Supabase.
 */
export async function saveReservation(reservation: ReservationData): Promise<boolean> {
  const supabase = createClient();

  try {
    const { error } = await supabase.from("reservations").insert([
      {
        slot_id: reservation.slot_id,
        brand_name: reservation.brand_name,
        brand_url: reservation.brand_url || null,
        logo_url: reservation.logo_url,
        amount: reservation.amount,
        contact_email: reservation.contact_email || null,
        status: reservation.status || "confirmed",
        created_at: new Date().toISOString(),
      },
    ]);

    if (error) {
      console.warn("Supabase insert note:", error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn("Error saving reservation:", err);
    return false;
  }
}

/**
 * Fetches all confirmed reservations from Supabase.
 */
export async function fetchLiveReservations(): Promise<Record<string, { logoUrl: string; brand: string }>> {
  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from("reservations")
      .select("slot_id, logo_url, brand_name, status")
      .in("status", ["confirmed", "sold"]);

    if (error || !data) {
      return {};
    }

    const map: Record<string, { logoUrl: string; brand: string }> = {};
    for (const item of data) {
      if (item.slot_id && item.logo_url) {
        map[item.slot_id] = {
          logoUrl: item.logo_url,
          brand: item.brand_name || "",
        };
      }
    }
    return map;
  } catch {
    return {};
  }
}

/**
 * Subscribes to realtime updates for the reservations table.
 */
export function subscribeToReservations(
  onUpdate: (payload: any) => void
) {
  const supabase = createClient();

  const channel = supabase
    .channel("realtime-reservations")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "reservations",
      },
      (payload) => {
        onUpdate(payload);
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => resolve("");
    reader.readAsDataURL(file);
  });
}
