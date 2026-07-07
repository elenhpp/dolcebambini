import heroImg from "@/assets/hero-v2/7003.png.asset.json";

export function HeroSlideshow() {
  return (
    <div className="relative w-full h-full md:h-[62vh] lg:h-[72vh] overflow-hidden bg-foreground">
      <img
        src={heroImg.url}
        alt="Flower girl in ivory satin dress by the lake with tulips"
        loading="eager"
        fetchPriority="high"
        decoding="sync"
        className="absolute inset-0 w-full h-full object-cover"
      />
    </div>
  );
}
