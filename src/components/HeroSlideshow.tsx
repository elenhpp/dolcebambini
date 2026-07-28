import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";

// All hero slides, bundled from src/assets/hero-v2. Dropping a new .webp in that
// folder adds it to the slideshow automatically. Sorted for a stable order.
const HERO_IMAGES = import.meta.glob("../assets/hero-v2/*.webp", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

export const HERO_SLIDES: string[] = Object.keys(HERO_IMAGES)
  .sort((a, b) => a.localeCompare(b, "en"))
  .map((k) => HERO_IMAGES[k]);

const SLIDE_MS = 5000;

export function HeroSlideshow() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion || HERO_SLIDES.length < 2) return;
    const id = setInterval(() => setActive((i) => (i + 1) % HERO_SLIDES.length), SLIDE_MS);
    return () => clearInterval(id);
  }, [prefersReducedMotion]);

  return (
    <div
      className="relative w-full h-full md:h-[62vh] lg:h-[72vh] overflow-hidden bg-foreground"
      aria-roledescription="carousel"
      aria-label="Dolce Bambini Collection 2026"
    >
      {HERO_SLIDES.map((src, i) => (
        <img
          key={src}
          src={src}
          alt={i === active ? "Dolce Bambini Collection 2026" : ""}
          aria-hidden={i !== active}
          loading={i === 0 ? "eager" : "lazy"}
          fetchPriority={i === 0 ? "high" : "low"}
          decoding={i === 0 ? "sync" : "async"}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {HERO_SLIDES.length > 1 && (
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-[2] flex items-center gap-2.5">
          {HERO_SLIDES.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Slide ${i + 1} of ${HERO_SLIDES.length}`}
              aria-current={i === active}
              className={`h-1.5 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-background/80 ${
                i === active ? "w-7 bg-background" : "w-1.5 bg-background/50 hover:bg-background/75"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
