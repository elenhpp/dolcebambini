import { useEffect, useMemo, useRef, useState } from "react";
import { MapPin, Phone, Plus, Minus, RotateCcw, Search } from "lucide-react";
import { GREECE_PATH, MAP_WIDTH, MAP_HEIGHT, projectPoint } from "@/lib/greece-map";
import { SHOPS, REGION_ORDER, type Region, type Shop } from "@/lib/shops";
import { T } from "@/lib/site-content";
import { useLang } from "@/lib/lang";

type Box = { x: number; y: number; w: number; h: number };
const FULL: Box = { x: 0, y: 0, w: MAP_WIDTH, h: MAP_HEIGHT };
const MIN_W = MAP_WIDTH / 24;

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

/** Frame a set of shops with a margin, keeping the viewBox aspect ratio. */
function boxFor(shops: Shop[]): Box {
  if (!shops.length) return FULL;
  const pts = shops.map((s) => projectPoint(s.lat, s.lng));
  const xs = pts.map((p) => p.x);
  const ys = pts.map((p) => p.y);
  const pad = 60;
  let w = Math.max(...xs) - Math.min(...xs) + pad * 2;
  let h = Math.max(...ys) - Math.min(...ys) + pad * 2;
  // match the full map's aspect so nothing looks stretched
  const aspect = MAP_WIDTH / MAP_HEIGHT;
  if (w / h > aspect) h = w / aspect;
  else w = h * aspect;
  w = clamp(w, MIN_W, MAP_WIDTH);
  h = w / aspect;
  const cx = (Math.min(...xs) + Math.max(...xs)) / 2;
  const cy = (Math.min(...ys) + Math.max(...ys)) / 2;
  return {
    x: clamp(cx - w / 2, 0, Math.max(0, MAP_WIDTH - w)),
    y: clamp(cy - h / 2, 0, Math.max(0, MAP_HEIGHT - h)),
    w,
    h,
  };
}

export function ShopsMap() {
  const { t } = useLang();
  const [view, setView] = useState<Box>(FULL);
  const [selected, setSelected] = useState<string | null>(null);
  const [region, setRegion] = useState<Region | "all">("all");
  const [query, setQuery] = useState("");
  const svgRef = useRef<SVGSVGElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const drag = useRef<{ x: number; y: number; box: Box } | null>(null);

  const shops = useMemo(() => {
    const q = query.trim().toLowerCase();
    return SHOPS.filter(
      (s) =>
        (region === "all" || s.region === region) &&
        (!q ||
          s.name.toLowerCase().includes(q) ||
          s.area.toLowerCase().includes(q) ||
          s.address.toLowerCase().includes(q)),
    );
  }, [region, query]);

  // Refocus the map whenever the visible set changes.
  useEffect(() => {
    setView(region === "all" && !query.trim() ? FULL : boxFor(shops));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [region, query]);

  const zoom = (factor: number, cx?: number, cy?: number) => {
    setView((v) => {
      const w = clamp(v.w * factor, MIN_W, MAP_WIDTH);
      const h = w / (MAP_WIDTH / MAP_HEIGHT);
      const ax = cx ?? v.x + v.w / 2;
      const ay = cy ?? v.y + v.h / 2;
      // keep the anchor point under the cursor
      const nx = ax - ((ax - v.x) * w) / v.w;
      const ny = ay - ((ay - v.y) * h) / v.h;
      return {
        w,
        h,
        x: clamp(nx, Math.min(0, MAP_WIDTH - w), Math.max(0, MAP_WIDTH - w)),
        y: clamp(ny, Math.min(0, MAP_HEIGHT - h), Math.max(0, MAP_HEIGHT - h)),
      };
    });
  };

  // Non-passive so the page doesn't scroll while zooming the map.
  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const r = el.getBoundingClientRect();
      setView((v) => {
        const factor = e.deltaY > 0 ? 1.15 : 1 / 1.15;
        const w = clamp(v.w * factor, MIN_W, MAP_WIDTH);
        const h = w / (MAP_WIDTH / MAP_HEIGHT);
        const ax = v.x + ((e.clientX - r.left) / r.width) * v.w;
        const ay = v.y + ((e.clientY - r.top) / r.height) * v.h;
        const nx = ax - ((ax - v.x) * w) / v.w;
        const ny = ay - ((ay - v.y) * h) / v.h;
        return {
          w,
          h,
          x: clamp(nx, Math.min(0, MAP_WIDTH - w), Math.max(0, MAP_WIDTH - w)),
          y: clamp(ny, Math.min(0, MAP_HEIGHT - h), Math.max(0, MAP_HEIGHT - h)),
        };
      });
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  const onPointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    drag.current = { x: e.clientX, y: e.clientY, box: view };
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    const d = drag.current;
    if (!d || !svgRef.current) return;
    const r = svgRef.current.getBoundingClientRect();
    const dx = ((e.clientX - d.x) / r.width) * d.box.w;
    const dy = ((e.clientY - d.y) / r.height) * d.box.h;
    setView({
      ...d.box,
      x: clamp(d.box.x - dx, Math.min(0, MAP_WIDTH - d.box.w), Math.max(0, MAP_WIDTH - d.box.w)),
      y: clamp(d.box.y - dy, Math.min(0, MAP_HEIGHT - d.box.h), Math.max(0, MAP_HEIGHT - d.box.h)),
    });
  };
  const endDrag = () => {
    drag.current = null;
  };

  const pick = (shop: Shop) => {
    setSelected(shop.name + shop.area);
    listRef.current
      ?.querySelector(`[data-shop="${CSS.escape(shop.name + shop.area)}"]`)
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  // Pin radius in user units, so pins keep a constant on-screen size while zooming.
  const pinR = (view.w / MAP_WIDTH) * 7;
  const grouped = REGION_ORDER.map((r) => ({
    region: r,
    items: shops.filter((s) => s.region === r),
  })).filter((g) => g.items.length);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative flex-1 min-w-[220px]">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t(T.copy.searchShop)}
            className="w-full rounded-full border border-border/60 bg-card pl-9 pr-4 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          />
        </div>
        <span className="text-xs tracking-[0.18em] uppercase text-muted-foreground">
          {shops.length} {t(T.copy.shopsFound)}
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {(["all", ...REGION_ORDER] as const).map((r) => {
          const count = r === "all" ? SHOPS.length : SHOPS.filter((s) => s.region === r).length;
          const active = region === r;
          return (
            <button
              key={r}
              type="button"
              onClick={() => setRegion(r)}
              aria-pressed={active}
              className={`rounded-full border px-3.5 py-1.5 text-xs tracking-wide transition ${
                active
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border/60 bg-card hover:border-foreground/40"
              }`}
            >
              {r === "all" ? t(T.copy.allRegions) : t(T.regions[r])}{" "}
              <span className={active ? "opacity-80" : "text-muted-foreground"}>{count}</span>
            </button>
          );
        })}
      </div>

      <div className="relative rounded-3xl border border-border/60 bg-sky/20 soft-shadow overflow-hidden">
        <svg
          ref={svgRef}
          viewBox={`${view.x} ${view.y} ${view.w} ${view.h}`}
          className="w-full h-auto touch-none cursor-grab active:cursor-grabbing select-none"
          style={{ aspectRatio: `${MAP_WIDTH} / ${MAP_HEIGHT}` }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
          role="img"
          aria-label={`${SHOPS.length} ${t(T.copy.shopsFound)}`}
        >
          <path
            d={GREECE_PATH}
            className="fill-background stroke-border"
            strokeWidth={view.w / MAP_WIDTH}
          />
          {shops.map((s) => {
            const { x, y } = projectPoint(s.lat, s.lng);
            const isSel = selected === s.name + s.area;
            return (
              <g
                key={s.name + s.area}
                onPointerDown={(e) => e.stopPropagation()}
                onClick={() => pick(s)}
              >
                <circle
                  cx={x}
                  cy={y}
                  r={isSel ? pinR * 1.6 : pinR}
                  className={isSel ? "fill-foreground" : "fill-primary"}
                  stroke="white"
                  strokeWidth={pinR * 0.35}
                  style={{ cursor: "pointer" }}
                />
                <title>{`${s.name} — ${s.area}`}</title>
              </g>
            );
          })}
        </svg>

        <div className="absolute top-3 right-3 flex flex-col gap-1.5">
          {[
            { label: t(T.copy.zoomIn), icon: Plus, run: () => zoom(1 / 1.4) },
            { label: t(T.copy.zoomOut), icon: Minus, run: () => zoom(1.4) },
            { label: t(T.copy.resetMap), icon: RotateCcw, run: () => setView(FULL) },
          ].map(({ label, icon: Icon, run }) => (
            <button
              key={label}
              type="button"
              onClick={run}
              aria-label={label}
              title={label}
              className="grid place-items-center h-9 w-9 rounded-full bg-background/90 backdrop-blur border border-border/60 text-foreground/80 hover:bg-background transition"
            >
              <Icon size={16} />
            </button>
          ))}
        </div>
      </div>

      <p className="text-xs text-muted-foreground text-center">{t(T.copy.mapHint)}</p>

      <div ref={listRef} className="space-y-10">
        {grouped.map(({ region: r, items }) => (
          <section key={r}>
            <h2 className="font-display text-2xl mb-4 flex items-baseline gap-3">
              {t(T.regions[r])}
              <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground">
                {items.length}
              </span>
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((s) => {
                const id = s.name + s.area;
                const isSel = selected === id;
                return (
                  <button
                    key={id}
                    type="button"
                    data-shop={id}
                    onClick={() => {
                      setSelected(id);
                      setView(boxFor([s]));
                    }}
                    className={`text-left rounded-2xl border bg-card p-4 transition ${
                      isSel
                        ? "border-primary ring-2 ring-primary/25"
                        : "border-border/60 hover:border-foreground/30"
                    }`}
                  >
                    <div className="font-medium leading-snug">{s.name}</div>
                    <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                      <div className="flex items-start gap-2">
                        <MapPin size={14} className="mt-0.5 shrink-0 text-primary" />
                        <span>{[s.address, s.area].filter(Boolean).join(", ")}</span>
                      </div>
                      {s.phone && (
                        <a
                          href={`tel:${s.phone}`}
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-2 hover:text-primary"
                        >
                          <Phone size={14} className="shrink-0 text-primary" />
                          {s.phone}
                        </a>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </section>
        ))}
        {!shops.length && (
          <p className="text-center text-muted-foreground py-10">{t(T.copy.noShops)}</p>
        )}
      </div>
    </div>
  );
}
