"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let frame = 0;
    let x = -100;
    let y = -100;
    let ringX = x;
    let ringY = y;

    const render = () => {
      ringX += (x - ringX) * 0.2;
      ringY += (y - ringY) * 0.2;
      dot.style.transform = `translate3d(${x - 4}px, ${y - 4}px, 0)`;
      ring.style.transform = `translate3d(${ringX - 20}px, ${ringY - 20}px, 0)`;
      frame = requestAnimationFrame(render);
    };

    const handleMove = (event: MouseEvent) => {
      x = event.clientX;
      y = event.clientY;
      dot.style.opacity = "1";
      ring.style.opacity = "1";
    };

    const handleLeave = () => {
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    document.addEventListener("mouseleave", handleLeave);
    frame = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", handleLeave);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <style jsx global>{`
        @media (pointer: fine) {
          body { cursor: none; }
          a, button, input, textarea, select { cursor: none; }
        }
      `}</style>
      <div ref={dotRef} className="custom-cursor pointer-events-none fixed left-0 top-0 z-[110] opacity-0">
        <span className="block h-2 w-2 rounded-full bg-foreground" />
      </div>
      <div ref={ringRef} className="custom-cursor pointer-events-none fixed left-0 top-0 z-[109] opacity-0">
        <span className="block h-10 w-10 rounded-full border border-foreground/35" />
      </div>
    </>
  );
}
