"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => setIsLoading(false), 600);
    }, 900);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background transition-opacity duration-600 ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div
        className="relative w-24 h-24 md:w-32 md:h-32"
        style={{
          animation: "logo-spin-3d 1.4s linear infinite, neon-pulse-glow 1.4s ease-in-out infinite",
        }}
      >
        <Image
          src="/logo.jpg"
          alt="Emporri Logo"
          fill
          sizes="(max-width: 768px) 96px, 128px"
          className="object-contain mix-blend-screen"
          priority
        />
      </div>
      <div className="mt-8 flex items-center gap-1.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="block w-1.5 h-1.5 rounded-full bg-foreground"
            style={{
              animation: `float 1.2s ease-in-out infinite`,
              animationDelay: `${i * 0.15}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
