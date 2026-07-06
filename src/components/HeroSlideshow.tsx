import { useEffect, useMemo, useState } from "react";
import { Tilt } from "@/components/Tilt";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";
import img1 from "@/assets/hero/hero-7017.png.asset.json";
import img2 from "@/assets/hero/hero-7021.png.asset.json";
import img3 from "@/assets/hero/hero-9905.png.asset.json";
import img4 from "@/assets/hero/hero-c11.png.asset.json";
import img5 from "@/assets/hero/hero-gentlemen.jpg.asset.json";
import img6 from "@/assets/hero/hero-7101.jpg.asset.json";
import img7 from "@/assets/hero/hero-7108.jpg.asset.json";

const BASE_SLIDES = [
  { url: img1.url, alt: "Ivory bow flower girl dress" },
  { url: img2.url, alt: "Lace puff-sleeve baptism dress" },
  { url: img3.url, alt: "Rosette organza baptism gown" },
  { url: img4.url, alt: "Blush sequin tulle dress" },
  { url: img5.url, alt: "Little gentlemen linen set with balloon" },
  { url: img6.url, alt: "Little gentlemen ivory vest and bow tie" },
  { url: img7.url, alt: "Little gentlemen with hat in garden" },
];

const INTERVAL_MS = 4200;

function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function HeroSlideshow() {
  // Shuffle once per mount so order changes each visit.
  const slides = useMemo(() => shuffle(BASE_SLIDES), []);
  const [index, setIndex] = useState(0);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    // Slow the rotation and lengthen the fade when motion is reduced.
    const interval = reduced ? 9000 : INTERVAL_MS;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, interval);
    return () => window.clearInterval(id);
  }, [slides.length, reduced]);

  return (
    <Tilt
      className="group relative w-full h-[46vh] md:h-[62vh] lg:h-[72vh] overflow-hidden bg-foreground"
      max={5}
      scale={1.01}
      glare={false}
    >
      {slides.map((slide, i) => (
        <img
          key={slide.url}
          src={slide.url}
          alt={slide.alt}
          loading={i === 0 ? "eager" : "lazy"}
          data-tilt-inner
          data-tilt-depth={reduced ? "0" : "24"}
          className="absolute inset-0 w-full h-full object-cover will-change-[opacity,transform]"
          style={{
            opacity: i === index ? 1 : 0,
            transition: reduced ? "opacity 600ms linear" : "opacity 1600ms ease-in-out",
          }}
        />
      ))}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/70" />
    </Tilt>
  );
}
