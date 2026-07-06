import { useRef, type ReactNode, type CSSProperties } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";

type TiltProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** max rotation in degrees */
  max?: number;
  /** scale on hover */
  scale?: number;
  /** parallax depth for inner [data-tilt-inner] elements (px) */
  glare?: boolean;
};

/**
 * Smooth 3D tilt/parallax wrapper that follows the cursor.
 * Children marked with data-tilt-inner get a subtle counter-parallax translate.
 */
export function Tilt({
  children,
  className,
  style,
  max = 10,
  scale = 1.02,
  glare = true,
}: TiltProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const reduced = usePrefersReducedMotion();

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced) return;
    const el = wrapRef.current;
    const inner = innerRef.current;
    if (!el || !inner) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rx = (0.5 - py) * max * 2;
    const ry = (px - 0.5) * max * 2;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      inner.style.transform = `perspective(1000px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) scale(${scale})`;
      inner.style.setProperty("--tilt-x", `${(px * 100).toFixed(1)}%`);
      inner.style.setProperty("--tilt-y", `${(py * 100).toFixed(1)}%`);
      // parallax inner elements
      inner.querySelectorAll<HTMLElement>("[data-tilt-inner]").forEach((node) => {
        const depth = Number(node.dataset.tiltDepth ?? 12);
        node.style.transform = `translate3d(${(px - 0.5) * depth}px, ${(py - 0.5) * depth}px, 0)`;
      });
    });
  };

  const handleLeave = () => {
    const inner = innerRef.current;
    if (!inner) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    inner.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
    inner.querySelectorAll<HTMLElement>("[data-tilt-inner]").forEach((node) => {
      node.style.transform = "translate3d(0,0,0)";
    });
  };

  return (
    <div
      ref={wrapRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={className}
      style={{ perspective: "1000px", ...style }}
    >
      <div
        ref={innerRef}
        className="relative h-full w-full will-change-transform transition-transform duration-[350ms] ease-out"
        style={{ transformStyle: "preserve-3d" }}
      >
        {children}
        {glare && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background:
                "radial-gradient(circle at var(--tilt-x,50%) var(--tilt-y,50%), rgba(255,255,255,0.35), rgba(255,255,255,0) 45%)",
              mixBlendMode: "overlay",
            }}
          />
        )}
      </div>
    </div>
  );
}
