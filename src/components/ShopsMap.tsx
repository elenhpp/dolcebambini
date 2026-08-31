import { useMemo, useRef, useState } from "react";
import { MapPin, Phone, Search } from "lucide-react";
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from "@react-google-maps/api";
import { SHOPS, REGION_ORDER, type Region, type Shop } from "@/lib/shops";
import { T } from "@/lib/site-content";
import { useLang } from "@/lib/lang";

const GREECE_CENTER = { lat: 39.074, lng: 21.824 };
const DEFAULT_ZOOM = 7;

export function ShopsMap() {
  const { t } = useLang();
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "",
  });

  const [selected, setSelected] = useState<string | null>(null);
  const [region, setRegion] = useState<Region | "all">("all");
  const [query, setQuery] = useState("");
  const [mapZoom, setMapZoom] = useState(DEFAULT_ZOOM);
  const [mapCenter, setMapCenter] = useState(GREECE_CENTER);
  const listRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);

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

  const pick = (shop: Shop) => {
    const id = shop.name + shop.area;
    setSelected(id);
    setMapCenter({ lat: shop.lat, lng: shop.lng });
    setMapZoom(15);
    listRef.current
      ?.querySelector(`[data-shop="${CSS.escape(id)}"]`)
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const grouped = REGION_ORDER.map((r) => ({
    region: r,
    items: shops.filter((s) => s.region === r),
  })).filter((g) => g.items.length);

  if (!isLoaded) {
    return (
      <div className="space-y-6">
        <div className="rounded-3xl border border-border/60 bg-card h-96 flex items-center justify-center text-muted-foreground">
          Loading map...
        </div>
      </div>
    );
  }

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
              onClick={() => {
                setRegion(r);
                setMapCenter(GREECE_CENTER);
                setMapZoom(DEFAULT_ZOOM);
              }}
              aria-pressed={active}
              className={`rounded-full border px-3.5 py-1.5 text-xs tracking-wide transition ${active
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
        <GoogleMap
          mapContainerStyle={{
            width: "100%",
            height: "400px",
          }}
          center={mapCenter}
          zoom={mapZoom}
          onLoad={(map) => {
            mapRef.current = map;
          }}
          options={{
            restriction: {
              latLngBounds: {
                north: 46.5,
                south: 36.5,
                east: 29.5,
                west: 19,
              },
              strictBounds: false,
            },
            styles: [
              {
                elementType: "geometry",
                stylers: [{ color: "#fdfbf7" }],
              },
              {
                elementType: "labels.icon",
                stylers: [{ visibility: "off" }],
              },
              {
                elementType: "labels.text.fill",
                stylers: [{ color: "#7d6b74" }],
              },
              {
                elementType: "labels.text.stroke",
                stylers: [{ color: "#fdfbf7" }],
              },
              {
                featureType: "administrative",
                elementType: "geometry.stroke",
                stylers: [{ color: "#f5f5f0" }, { weight: 0.5 }],
              },
              {
                featureType: "administrative.land_parcel",
                elementType: "labels.text.fill",
                stylers: [{ color: "#9d8b92" }],
              },
              {
                featureType: "landscape.natural",
                elementType: "geometry",
                stylers: [{ color: "#ede5e2" }],
              },
              {
                featureType: "poi",
                elementType: "geometry",
                stylers: [{ color: "#f5f5f0" }],
              },
              {
                featureType: "poi",
                elementType: "labels.text.fill",
                stylers: [{ color: "#7d6b74" }],
              },
              {
                featureType: "poi.park",
                elementType: "geometry",
                stylers: [{ color: "#f5f5f0" }],
              },
              {
                featureType: "poi.park",
                elementType: "labels.text.fill",
                stylers: [{ color: "#9d8b92" }],
              },
              {
                featureType: "road",
                elementType: "geometry",
                stylers: [{ color: "#ffffff" }],
              },
              {
                featureType: "road",
                elementType: "geometry.stroke",
                stylers: [{ color: "#f0ebe8" }],
              },
              {
                featureType: "road.arterial",
                elementType: "labels.text.fill",
                stylers: [{ color: "#7d6b74" }],
              },
              {
                featureType: "road.highway",
                elementType: "geometry",
                stylers: [{ color: "#fbf9f6" }],
              },
              {
                featureType: "road.highway",
                elementType: "geometry.stroke",
                stylers: [{ color: "#e8dfd9" }],
              },
              {
                featureType: "road.highway",
                elementType: "labels.text.fill",
                stylers: [{ color: "#7d6b74" }],
              },
              {
                featureType: "road.local",
                elementType: "labels.text.fill",
                stylers: [{ color: "#9d8b92" }],
              },
              {
                featureType: "transit.line",
                elementType: "geometry",
                stylers: [{ color: "#f5f5f0" }],
              },
              {
                featureType: "transit.station",
                elementType: "geometry",
                stylers: [{ color: "#faf8f5" }],
              },
              {
                featureType: "water",
                elementType: "geometry",
                stylers: [{ color: "#f5f5f0" }],
              },
              {
                featureType: "water",
                elementType: "labels.text.fill",
                stylers: [{ color: "#7d6b74" }],
              },
            ],
            disableDefaultUI: false,
            zoomControl: true,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: true,
          }}
        >
          {shops.map((shop) => {
            const id = shop.name + shop.area;
            const isSel = selected === id;
            return (
              <Marker
                key={id}
                position={{ lat: shop.lat, lng: shop.lng }}
                onClick={() => pick(shop)}
                title={`${shop.name} — ${shop.area}`}
                icon={{
                  path: google.maps.SymbolPath.CIRCLE,
                  scale: isSel ? 10 : 7,
                  fillColor: isSel ? "#a64969" : "#c97d95",
                  fillOpacity: 1,
                  strokeColor: "#ffffff",
                  strokeWeight: 2.5,
                }}
              >
                {isSel && (
                  <InfoWindow onCloseClick={() => setSelected(null)}>
                    <div className="max-w-xs">
                      <div className="font-semibold text-sm">{shop.name}</div>
                      <div className="text-xs text-gray-600 mt-1">
                        <div className="flex gap-2 mb-1">
                          <MapPin size={12} className="shrink-0 mt-0.5" />
                          <span>{[shop.address, shop.area].filter(Boolean).join(", ")}</span>
                        </div>
                        {shop.phone && (
                          <a
                            href={`tel:${shop.phone}`}
                            className="flex gap-2 text-blue-600 hover:underline"
                          >
                            <Phone size={12} className="shrink-0 mt-0.5" />
                            {shop.phone}
                          </a>
                        )}
                      </div>
                    </div>
                  </InfoWindow>
                )}
              </Marker>
            );
          })}
        </GoogleMap>
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
                    onClick={() => pick(s)}
                    className={`text-left rounded-2xl border bg-card p-4 transition ${isSel
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
