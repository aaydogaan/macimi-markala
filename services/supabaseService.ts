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
 * Saves a new sponsor reservation in Supabase and local cache backup.
 */
export async function saveReservation(reservation: ReservationData): Promise<{ success: boolean; orderCode: string }> {
  const supabase = createClient();
  const orderCode = reservation.order_code || `MAC-${reservation.slot_id.toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;

  const newRecord: ReservationData = {
    id: `local-${Date.now()}`,
    slot_id: reservation.slot_id,
    brand_name: reservation.brand_name,
    brand_url: reservation.brand_url || undefined,
    logo_url: reservation.logo_url,
    amount: reservation.amount,
    contact_email: reservation.contact_email || undefined,
    order_code: orderCode,
    status: reservation.status || "pending",
    created_at: new Date().toISOString(),
  };

  // Local backup cache for reliability
  try {
    const existingStr = localStorage.getItem("mac_pending_reservations");
    const existing: ReservationData[] = existingStr ? JSON.parse(existingStr) : [];
    existing.unshift(newRecord);
    localStorage.setItem("mac_pending_reservations", JSON.stringify(existing));
  } catch {
    // ignore
  }

  // Supabase Database Insert
  try {
    const { data, error } = await supabase.from("reservations").insert([
      {
        slot_id: reservation.slot_id,
        brand_name: reservation.brand_name,
        brand_url: reservation.brand_url || null,
        logo_url: reservation.logo_url,
        amount: reservation.amount,
        contact_email: reservation.contact_email || null,
        order_code: orderCode,
        status: reservation.status || "pending",
      },
    ]).select();

    if (error) {
      console.warn("Supabase insert note:", error.message);
    } else if (data && data[0]?.id) {
      newRecord.id = data[0].id;
    }
  } catch (err) {
    console.warn("Error saving reservation to Supabase:", err);
  }

  return { success: true, orderCode };
}

/**
 * Fetches all confirmed/sold sponsor reservations to render on the MacBook.
 */
export async function fetchLiveReservations(): Promise<Record<string, { logoUrl: string; brand: string; brandUrl?: string }>> {
  const supabase = createClient();
  const map: Record<string, { logoUrl: string; brand: string; brandUrl?: string }> = {};

  try {
    const { data, error } = await supabase
      .from("reservations")
      .select("slot_id, logo_url, brand_name, brand_url, status")
      .in("status", ["confirmed", "sold"]);

    if (!error && data) {
      for (const item of data) {
        if (item.slot_id && item.logo_url) {
          map[item.slot_id] = {
            logoUrl: item.logo_url,
            brand: item.brand_name || "",
            brandUrl: item.brand_url || undefined,
          };
        }
      }
    }
  } catch {
    // ignore
  }

  // Check local confirmed cache as backup
  try {
    const existingStr = localStorage.getItem("mac_pending_reservations");
    if (existingStr) {
      const list: ReservationData[] = JSON.parse(existingStr);
      for (const item of list) {
        if ((item.status === "sold" || item.status === "confirmed") && !map[item.slot_id]) {
          map[item.slot_id] = {
            logoUrl: item.logo_url,
            brand: item.brand_name || "",
            brandUrl: item.brand_url,
          };
        }
      }
    }
  } catch {
    // ignore
  }

  return map;
}

/**
 * Fetches ALL reservations for /recep admin dashboard (combining Supabase + Local).
 */
export async function fetchAllReservations(): Promise<ReservationData[]> {
  const supabase = createClient();
  let serverList: ReservationData[] = [];

  try {
    const { data, error } = await supabase
      .from("reservations")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      serverList = data as ReservationData[];
    }
  } catch {
    // ignore
  }

  // Merge with local list for zero data loss
  try {
    const localStr = localStorage.getItem("mac_pending_reservations");
    if (localStr) {
      const localList: ReservationData[] = JSON.parse(localStr);
      const serverIds = new Set(serverList.map((s) => s.id || s.order_code));
      for (const loc of localList) {
        if (!serverIds.has(loc.id) && !serverIds.has(loc.order_code)) {
          serverList.push(loc);
        }
      }
    }
  } catch {
    // ignore
  }

  return serverList;
}

/**
 * Updates a reservation status (e.g. approve to 'sold' or 'rejected').
 */
export async function updateReservationStatus(id: string, status: "sold" | "confirmed" | "rejected" | "pending"): Promise<boolean> {
  const supabase = createClient();

  // 1. Update Supabase
  try {
    await supabase
      .from("reservations")
      .update({ status })
      .eq("id", id);
  } catch {
    // ignore
  }

  // 2. Update local storage backup
  try {
    const localStr = localStorage.getItem("mac_pending_reservations");
    if (localStr) {
      const list: ReservationData[] = JSON.parse(localStr);
      const updated = list.map((item) => (item.id === id ? { ...item, status } : item));
      localStorage.setItem("mac_pending_reservations", JSON.stringify(updated));
    }
  } catch {
    // ignore
  }

  return true;
}

/**
 * Deletes a reservation from Supabase and local cache.
 */
export async function deleteReservation(id: string): Promise<boolean> {
  const supabase = createClient();

  try {
    await supabase
      .from("reservations")
      .delete()
      .eq("id", id);
  } catch {
    // ignore
  }

  try {
    const localStr = localStorage.getItem("mac_pending_reservations");
    if (localStr) {
      const list: ReservationData[] = JSON.parse(localStr);
      const updated = list.filter((item) => item.id !== id);
      localStorage.setItem("mac_pending_reservations", JSON.stringify(updated));
    }
  } catch {
    // ignore
  }

  return true;
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
