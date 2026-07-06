import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";
import img1 from "@/assets/hero-new/7017b-2.png.asset.json";
import img2 from "@/assets/hero-new/9804-4.png.asset.json";
import img3 from "@/assets/hero-new/9905.png.asset.json";
import img4 from "@/assets/hero-new/C11-4.png.asset.json";
import img5 from "@/assets/hero-new/7101-a-2.jpg.asset.json";
import img6 from "@/assets/hero-new/7109.jpg.asset.json";
import img7 from "@/assets/hero-new/7129.jpg.asset.json";

const BASE_SLIDES = [
  { url: img1.url, alt: "Ivory bow flower girl dress from behind in blossom garden" },
  { url: img2.url, alt: "Blush floral high-low tulle dress in flower path" },
  { url: img3.url, alt: "Ivory bubble-hem dress with vintage pram" },
  { url: img4.url, alt: "Pink sequin tulle dress by rose bench" },
  { url: img5.url, alt: "Little gentleman with ivory vest and bow tie by tree" },
  { url: img6.url, alt: "Little boy in grey vest blowing bubbles in garden" },
  { url: img7.url, alt: "Little boy in blue linen shirt at greenhouse path" },
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
  const [slides, setSlides] = useState(BASE_SLIDES);
  const [index, setIndex] = useState(0);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    setSlides(shuffle(BASE_SLIDES));
  }, []);

  useEffect(() => {
    const interval = reduced ? 9000 : INTERVAL_MS;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, interval);
    return () => window.clearInterval(id);
  }, [slides.length, reduced]);

  return (
    <div className="group relative w-full h-full md:h-[62vh] lg:h-[72vh] overflow-hidden bg-foreground">
      {slides.map((slide, i) => (
        <img
          key={slide.url}
          src={slide.url}
          alt={slide.alt}
          loading={i === 0 ? "eager" : "lazy"}
          fetchPriority={i === 0 ? "high" : "auto"}
          decoding={i === 0 ? "sync" : "async"}
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            opacity: i === index ? 1 : 0,
            transition: reduced ? "opacity 600ms linear" : "opacity 1600ms ease-in-out",
          }}
        />
      ))}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/70" />
    </div>
  );
}
