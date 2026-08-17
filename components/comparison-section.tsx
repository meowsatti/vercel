"use client";

import { useEffect, useRef, useState } from "react";
import { Check, X } from "lucide-react";

const comparisons = [
  { feature: "Available 24/7", ai: true, traditional: false },
  { feature: "Handles Unlimited Calls", ai: true, traditional: false },
  { feature: "Consistent Performance", ai: true, traditional: false },
  { feature: "Scales Instantly", ai: true, traditional: false },
  { feature: "No Training Required", ai: true, traditional: false },
  { feature: "Cost Under $500/mo", ai: true, traditional: false },
];

export function ComparisonSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative py-24 md:py-32 px-6" ref={ref}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-medium text-primary tracking-wider uppercase mb-4">
            The Clear Choice
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight text-balance">
            AI Agent vs Traditional
            <br />
            Receptionist
          </h2>
        </div>

        {/* Comparison table */}
        <div
          className="rounded-2xl border border-border/50 overflow-hidden"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          {/* Header row */}
          <div className="grid grid-cols-3 bg-card/50">
            <div className="px-6 py-4 text-sm font-medium text-muted-foreground">
              Feature
            </div>
            <div className="px-6 py-4 text-sm font-medium text-center">
              <span
                className="bg-clip-text text-transparent font-semibold"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, hsl(336 100% 50%), hsl(168 100% 45%))",
                }}
              >
                AI Agent
              </span>
            </div>
            <div className="px-6 py-4 text-sm font-medium text-muted-foreground text-center">
              Traditional
            </div>
          </div>

          {/* Rows */}
          {comparisons.map((row, i) => (
            <div
              key={row.feature}
              className="grid grid-cols-3 border-t border-border/30 transition-colors duration-200 hover:bg-card/30"
              style={{
                opacity: isVisible ? 1 : 0,
                transition: `opacity 0.4s ease ${0.1 + i * 0.06}s`,
              }}
            >
              <div className="px-6 py-4 text-sm text-foreground flex items-center">
                {row.feature}
              </div>
              <div className="px-6 py-4 flex items-center justify-center">
                <div className="w-6 h-6 rounded-full bg-accent/15 flex items-center justify-center">
                  <Check size={14} className="text-accent" />
                </div>
              </div>
              <div className="px-6 py-4 flex items-center justify-center">
                <div className="w-6 h-6 rounded-full bg-muted/50 flex items-center justify-center">
                  <X size={14} className="text-muted-foreground" />
                </div>
              </div>
            </div>
          ))}

          {/* Cost row */}
          <div className="grid grid-cols-3 border-t border-border/30 bg-card/30">
            <div className="px-6 py-5 text-sm font-medium text-foreground flex items-center">
              Monthly Cost
            </div>
            <div className="px-6 py-5 flex items-center justify-center">
              <span className="text-lg font-bold text-accent font-mono">
                ~$300
              </span>
            </div>
            <div className="px-6 py-5 flex items-center justify-center">
              <span className="text-lg font-bold text-muted-foreground font-mono line-through">
                $3,500
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
