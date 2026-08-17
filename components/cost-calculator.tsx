"use client";

import { useState, useEffect, useRef } from "react";
import { Calculator, TrendingDown, DollarSign, Clock } from "lucide-react";

export function CostCalculator() {
  const [avd, setAvd] = useState(30);
  const [acd, setAcd] = useState(5);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const monthlyCost = avd * acd * 30 * 0.3;
  const traditionalCost = 3500;
  const savings = traditionalCost - monthlyCost;
  const savingsPercentage = Math.round((savings / traditionalCost) * 100);

  return (
    <section id="pricing" className="relative py-24 md:py-32 px-6" ref={ref}>
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full opacity-15 blur-[120px]"
          style={{
            background:
              "radial-gradient(circle, hsl(336 100% 50%), transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <span className="inline-block text-sm font-medium text-primary tracking-wider uppercase mb-4">
            Pricing Calculator
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight text-balance">
            See What You{"'"}ll
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, hsl(336 100% 50%), hsl(168 100% 45%))",
              }}
            >
              Actually Pay
            </span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto text-balance">
            Transparent pricing based on your actual usage. No hidden fees, no
            contracts, no surprises.
          </p>
        </div>

        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          {/* Input card */}
          <div className="rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm p-8 md:p-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Calculator size={20} className="text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                Your Usage
              </h3>
            </div>

            {/* AVD Slider */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm text-muted-foreground">
                  Average Calls Per Day (AVD)
                </label>
                <span className="text-lg font-bold font-mono text-foreground">
                  {avd}
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={200}
                value={avd}
                onChange={(e) => setAvd(Number(e.target.value))}
                className="w-full h-1.5 rounded-full appearance-none bg-muted cursor-pointer accent-primary"
                style={{
                  background: `linear-gradient(to right, hsl(336 100% 50%) ${(avd / 200) * 100}%, hsl(0 0% 14%) ${(avd / 200) * 100}%)`,
                }}
              />
              <div className="flex justify-between mt-1.5 text-xs text-muted-foreground font-mono">
                <span>1</span>
                <span>200</span>
              </div>
            </div>

            {/* ACD Slider */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm text-muted-foreground">
                  Avg Call Duration in Minutes (ACD)
                </label>
                <span className="text-lg font-bold font-mono text-foreground">
                  {acd} min
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={30}
                value={acd}
                onChange={(e) => setAcd(Number(e.target.value))}
                className="w-full h-1.5 rounded-full appearance-none bg-muted cursor-pointer accent-primary"
                style={{
                  background: `linear-gradient(to right, hsl(168 100% 45%) ${(acd / 30) * 100}%, hsl(0 0% 14%) ${(acd / 30) * 100}%)`,
                }}
              />
              <div className="flex justify-between mt-1.5 text-xs text-muted-foreground font-mono">
                <span>1 min</span>
                <span>30 min</span>
              </div>
            </div>

            {/* Formula */}
            <div className="rounded-xl bg-muted/30 border border-border/30 p-4">
              <p className="text-xs text-muted-foreground mb-1">Formula</p>
              <p className="text-sm font-mono text-foreground">
                {avd} calls x {acd} min x 30 days x $0.30/min
              </p>
            </div>
          </div>

          {/* Result card */}
          <div className="rounded-2xl border border-primary/20 bg-card/30 backdrop-blur-sm p-8 md:p-10 flex flex-col justify-between"
            style={{ animation: isVisible ? "glow-pulse 3s ease-in-out infinite" : "none" }}
          >
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                  <DollarSign size={20} className="text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  Your Estimate
                </h3>
              </div>

              {/* Monthly cost */}
              <div className="mb-8">
                <p className="text-sm text-muted-foreground mb-2">
                  Estimated Monthly Cost
                </p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl md:text-5xl font-bold font-mono text-foreground">
                    ${monthlyCost.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                  </span>
                  <span className="text-muted-foreground text-sm">/month</span>
                </div>
              </div>

              {/* Savings cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-accent/5 border border-accent/10 p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingDown size={14} className="text-accent" />
                    <span className="text-xs text-accent">You Save</span>
                  </div>
                  <p className="text-xl font-bold font-mono text-foreground">
                    {savings > 0
                      ? `$${savings.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`
                      : "$0"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    vs. traditional receptionist
                  </p>
                </div>
                <div className="rounded-xl bg-primary/5 border border-primary/10 p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock size={14} className="text-primary" />
                    <span className="text-xs text-primary">Savings</span>
                  </div>
                  <p className="text-xl font-bold font-mono text-foreground">
                    {savings > 0 ? `${savingsPercentage}%` : "0%"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    cost reduction
                  </p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <a
              href="#"
              className="mt-8 w-full inline-flex items-center justify-center px-6 py-3.5 text-base font-medium text-primary-foreground bg-primary rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 hover:scale-[1.02] active:scale-[0.98]"
              data-cursor-hover
            >
              Start Free Trial
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
