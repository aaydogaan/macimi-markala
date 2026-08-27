import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("site_stats")
      .select("total_visits")
      .eq("id", "global")
      .maybeSingle();

    if (error || !data) {
      return NextResponse.json(
        { total_visits: 4, source: "fallback" },
        {
          headers: {
            "Cache-Control": "no-store, max-age=0",
          },
        }
      );
    }

    return NextResponse.json(
      { total_visits: Number(data.total_visits) || 4, source: "db" },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  } catch (err) {
    console.error("GET /api/stats/visit error:", err);
    return NextResponse.json(
      { total_visits: 4, source: "fallback_error" },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  }
}

export async function POST() {
  try {
    const supabase = await createClient();

    // 1. Try atomic RPC function first
    const { data: rpcData, error: rpcError } = await supabase.rpc(
      "increment_site_visits"
    );

    if (!rpcError && rpcData !== null && rpcData !== undefined) {
      return NextResponse.json(
        { total_visits: Number(rpcData), source: "rpc" },
        {
          headers: {
            "Cache-Control": "no-store, max-age=0",
          },
        }
      );
    }

    // 2. Fallback if RPC is not defined in Supabase: Direct query / upsert
    const { data: existingData } = await supabase
      .from("site_stats")
      .select("total_visits")
      .eq("id", "global")
      .maybeSingle();

    const currentVisits = existingData?.total_visits
      ? Number(existingData.total_visits)
      : 4;
    const newVisits = currentVisits + 1;

    const { error: upsertError } = await supabase.from("site_stats").upsert({
      id: "global",
      total_visits: newVisits,
      updated_at: new Date().toISOString(),
    });

    if (upsertError) {
      console.warn("Direct site_stats update notice:", upsertError.message);
      return NextResponse.json(
        { total_visits: newVisits, source: "optimistic" },
        {
          headers: {
            "Cache-Control": "no-store, max-age=0",
          },
        }
      );
    }

    return NextResponse.json(
      { total_visits: newVisits, source: "upsert" },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  } catch (err) {
    console.error("POST /api/stats/visit error:", err);
    return NextResponse.json(
      { total_visits: 4, source: "fallback_error" },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  }
}
