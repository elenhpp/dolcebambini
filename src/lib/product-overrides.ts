import { useEffect, useState } from "react";
import { useQuery, useQueryClient, type QueryClient } from "@tanstack/react-query";
import type { Lang, Tr } from "./site-content";
import { supabase } from "@/integrations/supabase/client";

export type FieldMap = Partial<Record<Lang, string>>;
export type ProductOverride = {
  title: FieldMap;
  desc: FieldMap;
  longDesc: FieldMap;
  images: string[];
};
export type OverridesMap = Record<string, Record<string, ProductOverride>>;

type Row = {
  category: string;
  code: string;
  title: FieldMap | null;
  description: FieldMap | null;
  long_description: FieldMap | null;
  images: string[] | null;
};

function rowsToMap(rows: Row[]): OverridesMap {
  const map: OverridesMap = {};
  for (const r of rows) {
    if (!map[r.category]) map[r.category] = {};
    map[r.category][r.code] = {
      title: r.title ?? {},
      desc: r.description ?? {},
      longDesc: r.long_description ?? {},
      images: Array.isArray(r.images) ? r.images : [],
    };
  }
  return map;
}

async function fetchOverrides(): Promise<OverridesMap> {
  const { data, error } = await supabase
    .from("product_overrides")
    .select("category, code, title, description, long_description, images");
  if (error) throw error;
  return rowsToMap((data ?? []) as Row[]);
}

let realtimeSubscribers = 0;
let realtimeChannel: ReturnType<typeof supabase.channel> | null = null;

function ensureRealtime(qc: QueryClient) {
  realtimeSubscribers++;
  if (!realtimeChannel) {
    realtimeChannel = supabase
      .channel("product_overrides_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "product_overrides" },
        () => {
          qc.invalidateQueries({ queryKey: ["product_overrides"] });
        },
      )
      .subscribe();
  }
  return () => {
    realtimeSubscribers--;
    if (realtimeSubscribers <= 0 && realtimeChannel) {
      supabase.removeChannel(realtimeChannel);
      realtimeChannel = null;
      realtimeSubscribers = 0;
    }
  };
}

export function useOverrides() {
  const qc = useQueryClient();
  const q = useQuery({
    queryKey: ["product_overrides"],
    queryFn: fetchOverrides,
    staleTime: 60_000,
  });

  useEffect(() => ensureRealtime(qc), [qc]);

  return q.data ?? {};
}

/** Upsert a single override row. Requires admin RLS. */
export async function saveProductOverride(
  category: string,
  code: string,
  fields: {
    title: FieldMap;
    description: FieldMap;
    long_description: FieldMap;
    images: string[];
  },
): Promise<void> {
  const { error } = await supabase
    .from("product_overrides")
    .upsert(
      { category, code, ...fields },
      { onConflict: "category,code" },
    );
  if (error) throw error;
}

export async function deleteProductOverride(category: string, code: string) {
  const { error } = await supabase
    .from("product_overrides")
    .delete()
    .eq("category", category)
    .eq("code", code);
  if (error) throw error;
}

export function mergeTr(
  base: Tr<string> | undefined,
  override: FieldMap | undefined,
): Tr<string> | undefined {
  const hasOverride = override && Object.values(override).some((v) => v && v.trim() !== "");
  if (!hasOverride) return base;
  const cleaned: FieldMap = {};
  for (const [k, v] of Object.entries(override!)) {
    if (v && v.trim() !== "") cleaned[k as Lang] = v;
  }
  if (!base) return { en: cleaned.en ?? "", ...cleaned } as Tr<string>;
  return { ...base, ...cleaned } as Tr<string>;
}

/** Small hook used by admin for local editing before flushing to the server. */
export function useDebouncedSave(
  category: string,
  code: string,
  initial: { title: FieldMap; desc: FieldMap; longDesc: FieldMap; images: string[] },
) {
  const [state, setState] = useState(initial);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  useEffect(() => {
    setState(initial);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, code]);

  useEffect(() => {
    if (state === initial) return;
    const handle = setTimeout(async () => {
      setStatus("saving");
      try {
        await saveProductOverride(category, code, {
          title: state.title,
          description: state.desc,
          long_description: state.longDesc,
          images: state.images,
        });
        setStatus("saved");
        setTimeout(() => setStatus("idle"), 1200);
      } catch (e) {
        console.error(e);
        setStatus("error");
      }
    }, 600);
    return () => clearTimeout(handle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return { state, setState, status };
}
