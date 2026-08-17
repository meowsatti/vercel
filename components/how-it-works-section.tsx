"use client";

import { useEffect, useRef, useState } from "react";
import { Globe, Cpu, PhoneCall, BarChart3 } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Globe,
    title: "Connect Your Business",
    description:
      "Link your phone system and share your business details. Our AI learns your services, FAQs, and scheduling rules.",
  },
  {
    number: "02",
    icon: Cpu,
    title: "AI Trains Instantly",
    description:
      "Emporri builds a custom voice agent tailored to your business. No coding, no scripts, no templates.",
  },
  {
    number: "03",
    icon: PhoneCall,
    title: "Go Live in Minutes",
    description:
      "Your AI receptionist starts handling calls immediately. Answers questions, books appointments, and routes calls.",
  },
  {
    number: "04",
    icon: BarChart3,
    title: "Track & Optimize",
    description:
      "Monitor call analytics, customer satisfaction, and conversion rates through your real-time dashboard.",
  },
];

export function HowItWorksSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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

  return (
    <section
      id="how-it-works"
      ref={ref}
      className="relative py-24 md:py-32 px-6"
    >
      {/* Background accent */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/2 left-0 w-[500px] h-[500px] rounded-full opacity-10 blur-[120px]"
          style={{
            background:
              "radial-gradient(circle, hsl(168 100% 45%), transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16 md:mb-20">
          <span className="inline-block text-sm font-medium text-accent tracking-wider uppercase mb-4">
            How It Works
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight text-balance">
            Live in Minutes,
            <br />
            Not Months
          </h2>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="group relative flex gap-5 p-6 md:p-8 rounded-2xl border border-border/40 bg-card/20 backdrop-blur-sm transition-all duration-500 hover:border-accent/20 hover:bg-card/40"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(30px)",
                  transition: `opacity 0.6s ease ${index * 0.12}s, transform 0.6s ease ${index * 0.12}s, border-color 0.3s ease, background-color 0.3s ease`,
                }}
              >
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-accent/10 text-accent transition-all duration-300 group-hover:bg-accent/15 group-hover:scale-110">
                    <Icon size={22} />
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-mono text-accent/60">
                      {step.number}
                    </span>
                    <h3 className="text-lg font-semibold text-foreground">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
