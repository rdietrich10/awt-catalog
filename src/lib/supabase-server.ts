import { createClient, SupabaseClient } from "@supabase/supabase-js";

let _supabase: SupabaseClient | null = null;

function getSupabaseClient(): SupabaseClient {
  if (_supabase) return _supabase;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseKey) {
    throw new Error(
      "Missing Supabase environment variables. Check NEXT_PUBLIC_SUPABASE_URL and SUPABASE_ANON_KEY."
    );
  }
  _supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false },
  });
  return _supabase;
}

export const supabase = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    return (getSupabaseClient() as unknown as Record<string | symbol, unknown>)[prop];
  },
});

interface AuditEntry {
  event_type: string;
  table_name?: string;
  record_id?: string;
  actor?: string;
  ip_address?: string;
  details?: Record<string, unknown>;
}

export async function logAuditEvent(entry: AuditEntry): Promise<void> {
  try {
    await supabase.from("audit_log").insert({
      event_type: entry.event_type,
      table_name: entry.table_name ?? null,
      record_id: entry.record_id ?? null,
      actor: entry.actor ?? "system",
      ip_address: entry.ip_address ?? null,
      details: entry.details ?? {},
    });
  } catch (err) {
    console.error("Audit log write failed:", err);
  }
}
