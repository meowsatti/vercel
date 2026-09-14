"use client";

import { useEffect, useState, useRef } from "react";
import { ArrowRight, Phone, Clock, Calendar, MessageSquare } from "lucide-react";

const heroWords = ["Calls", "FAQs", "Bookings", "Availability"];

function AnimatedCounter({ end, suffix = "", prefix = "" }: { end: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 1500;
          const startTime = performance.now();
          const animate = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * end));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-2xl md:text-3xl font-bold text-foreground font-mono">
        {prefix}{count}{suffix}
      </div>
    </div>
  );
}

export function HeroSection() {
  const [currentWord, setCurrentWord] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % heroWords.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[calc(100svh-1rem)] flex flex-col items-center justify-center overflow-hidden px-6 pt-16 pb-8">
      {/* Background glow effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20 blur-[120px]"
          style={{ background: "radial-gradient(circle, hsl(336 100% 50%), transparent 70%)" }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full opacity-15 blur-[100px]"
          style={{ background: "radial-gradient(circle, hsl(168 100% 45%), transparent 70%)" }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-border/60 bg-card/50 backdrop-blur-sm"
          style={{ animation: "fade-up 0.8s ease-out forwards" }}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
          </span>
          <span className="text-sm text-muted-foreground">AI-Powered Voice Agents</span>
        </div>

        {/* Main heading */}
        <h1
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground leading-[1.05] text-balance"
          style={{ animation: "fade-up 0.8s ease-out 0.15s forwards", opacity: 0 }}
        >
          Your AI Handles
          <br />
          <span className="relative inline-block">
            <span
              key={currentWord}
              className="inline-block bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg, hsl(336 100% 50%), hsl(168 100% 45%))",
                animation: "fade-up 0.5s ease-out forwards",
              }}
            >
              {heroWords[currentWord]}
            </span>
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className="mt-6 md:mt-8 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed text-balance"
          style={{ animation: "fade-up 0.8s ease-out 0.3s forwards", opacity: 0 }}
        >
          Never miss a customer call again. Emporri deploys intelligent voice agents that answer calls, schedule appointments, and resolve queries 24/7.
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
          style={{ animation: "fade-up 0.8s ease-out 0.45s forwards", opacity: 0 }}
        >
          <a
            href="#pricing"
            className="group inline-flex items-center gap-2 px-7 py-3.5 text-base font-medium text-primary-foreground bg-primary rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 hover:scale-105 active:scale-95"
            data-cursor-hover
          >
            Calculate Your Savings
            <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          <a
            href="#features"
            className="inline-flex items-center gap-2 px-7 py-3.5 text-base font-medium text-foreground border border-border rounded-full transition-all duration-300 hover:bg-card hover:border-muted-foreground/30 bg-transparent"
            data-cursor-hover
          >
            See How It Works
          </a>
        </div>

        {/* Floating feature pills */}
        <div
          className="flex flex-wrap items-center justify-center gap-3 mt-16"
          style={{ animation: "fade-up 0.8s ease-out 0.6s forwards", opacity: 0 }}
        >
          {[
            { icon: Phone, label: "Call Handling" },
            { icon: MessageSquare, label: "FAQ Resolution" },
            { icon: Clock, label: "24/7 Availability" },
            { icon: Calendar, label: "Appointment Booking" },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-border/50 bg-card/30 backdrop-blur-sm text-sm text-muted-foreground transition-all duration-300 hover:border-primary/30 hover:text-foreground"
            >
              <item.icon size={15} className="text-primary" />
              {item.label}
            </div>
          ))}
        </div>

        {/* Stats row */}
        <div
          className="grid grid-cols-3 gap-6 md:gap-12 mt-20 max-w-lg mx-auto"
          style={{ animation: "fade-up 0.8s ease-out 0.75s forwards", opacity: 0 }}
        >
          <div className="text-center">
            <AnimatedCounter end={99} suffix="%" />
            <p className="text-xs md:text-sm text-muted-foreground mt-1">Uptime</p>
          </div>
          <div className="text-center">
            <AnimatedCounter end={500} suffix="+" />
            <p className="text-xs md:text-sm text-muted-foreground mt-1">Businesses</p>
          </div>
          <div className="text-center">
            <AnimatedCounter end={2} suffix="M+" />
            <p className="text-xs md:text-sm text-muted-foreground mt-1">Calls Handled</p>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
        <div className="w-5 h-8 rounded-full border border-muted-foreground/40 flex justify-center pt-1.5">
          <div className="w-1 h-2 rounded-full bg-muted-foreground" style={{ animation: "float 2s ease-in-out infinite" }} />
        </div>
      </div>
    </section>
  );
}
