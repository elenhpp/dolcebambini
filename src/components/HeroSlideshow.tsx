import { useEffect, useState } from "react";
import img1 from "@/assets/hero/hero-7017.png.asset.json";
import img2 from "@/assets/hero/hero-7021.png.asset.json";
import img3 from "@/assets/hero/hero-9905.png.asset.json";
import img4 from "@/assets/hero/hero-c11.png.asset.json";
import img5 from "@/assets/hero/hero-gentlemen.jpg.asset.json";

const SLIDES = [
  { url: img1.url, alt: "Ivory bow flower girl dress" },
  { url: img2.url, alt: "Lace puff-sleeve baptism dress" },
  { url: img3.url, alt: "Rosette organza baptism gown" },
  { url: img4.url, alt: "Blush sequin tulle dress" },
  { url: img5.url, alt: "Little gentlemen linen set" },
];

const INTERVAL_MS = 4200;

export function HeroSlideshow() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="relative w-full h-[46vh] md:h-[62vh] lg:h-[72vh] overflow-hidden bg-foreground">
      {SLIDES.map((slide, i) => (
        <img
          key={slide.url}
          src={slide.url}
          alt={slide.alt}
          loading={i === 0 ? "eager" : "lazy"}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-[1600ms] ease-in-out will-change-[opacity,transform]"
          style={{
            opacity: i === index ? 1 : 0,
            transform: i === index ? "scale(1.05)" : "scale(1)",
            transitionProperty: "opacity, transform",
            transitionDuration: "1600ms, 5000ms",
          }}
        />
      ))}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/70" />
    </div>
  );
}
