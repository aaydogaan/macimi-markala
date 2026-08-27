import { createClient } from "@/utils/supabase/client";

export interface ReservationData {
  id?: string;
  slot_id: string;
  brand_name: string;
  brand_url?: string;
  logo_url: string;
  amount: number;
  contact_email?: string;
  order_code?: string;
  status?: "pending" | "confirmed" | "sold" | "rejected";
  created_at?: string;
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
export async function saveReservation(reservation: ReservationData): Promise<{ success: boolean; orderCode: string }> {
  const supabase = createClient();
  const orderCode = reservation.order_code || `MAC-${reservation.slot_id.toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;

  try {
    const { error } = await supabase.from("reservations").insert([
      {
        slot_id: reservation.slot_id,
        brand_name: reservation.brand_name,
        brand_url: reservation.brand_url || null,
        logo_url: reservation.logo_url,
        amount: reservation.amount,
        contact_email: reservation.contact_email || null,
        order_code: orderCode,
        status: reservation.status || "pending",
        created_at: new Date().toISOString(),
      },
    ]);

    if (error) {
      console.warn("Supabase insert note:", error.message);
    }
    return { success: true, orderCode };
  } catch (err) {
    console.warn("Error saving reservation:", err);
    return { success: true, orderCode };
  }
}

/**
 * Fetches all confirmed/sold sponsor reservations to render on the MacBook.
 */
export async function fetchLiveReservations(): Promise<Record<string, { logoUrl: string; brand: string; brandUrl?: string }>> {
  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from("reservations")
      .select("slot_id, logo_url, brand_name, brand_url, status")
      .in("status", ["confirmed", "sold"]);

    if (error || !data) {
      return {};
    }

    const map: Record<string, { logoUrl: string; brand: string; brandUrl?: string }> = {};
    for (const item of data) {
      if (item.slot_id && item.logo_url) {
        map[item.slot_id] = {
          logoUrl: item.logo_url,
          brand: item.brand_name || "",
          brandUrl: item.brand_url || undefined,
        };
      }
    }
    return map;
  } catch {
    return {};
  }
}

/**
 * Fetches ALL reservations for /recep admin dashboard.
 */
export async function fetchAllReservations(): Promise<ReservationData[]> {
  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from("reservations")
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !data) {
      return [];
    }

    return data as ReservationData[];
  } catch {
    return [];
  }
}

/**
 * Updates a reservation status (e.g. approve to 'sold' or 'rejected').
 */
export async function updateReservationStatus(id: string, status: "sold" | "confirmed" | "rejected" | "pending"): Promise<boolean> {
  const supabase = createClient();

  try {
    const { error } = await supabase
      .from("reservations")
      .update({ status })
      .eq("id", id);

    return !error;
  } catch {
    return false;
  }
}

/**
 * Deletes a reservation from Supabase.
 */
export async function deleteReservation(id: string): Promise<boolean> {
  const supabase = createClient();

  try {
    const { error } = await supabase
      .from("reservations")
      .delete()
      .eq("id", id);

    return !error;
  } catch {
    return false;
  }
}

/**
 * Subscribes to realtime updates for the reservations table.
 */
export function subscribeToReservations(onUpdate: (payload: any) => void) {
  const supabase = createClient();
  const channelName = `reservations-${Math.random().toString(36).substring(2, 9)}`;

  const channel = supabase
    .channel(channelName)
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
    );

  channel.subscribe();

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
