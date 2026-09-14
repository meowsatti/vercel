"use client";

import { useEffect, useRef, useState } from "react";
import {
  Phone,
  MessageSquare,
  CalendarCheck,
  Clock,
  Shield,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: Phone,
    title: "Intelligent Call Handling",
    description:
      "AI agents answer every call with natural, human-like conversation. Route calls, take messages, and handle inquiries seamlessly.",
    accent: "primary",
  },
  {
    icon: MessageSquare,
    title: "FAQ Resolution",
    description:
      "Trained on your business knowledge base, the agent instantly resolves common customer questions without human intervention.",
    accent: "secondary",
  },
  {
    icon: CalendarCheck,
    title: "Appointment Booking",
    description:
      "Directly integrates with your calendar to check availability and book appointments in real-time during the call.",
    accent: "primary",
  },
  {
    icon: Clock,
    title: "24/7 Availability",
    description:
      "Never miss a lead. Your AI receptionist works around the clock, weekends and holidays included.",
    accent: "secondary",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description:
      "End-to-end encryption, HIPAA-compliant call handling, and SOC 2 certified infrastructure to protect your data.",
    accent: "primary",
  },
  {
    icon: Zap,
    title: "Instant Deployment",
    description:
      "Go live in minutes. Simply connect your phone system and let Emporri handle the rest with zero downtime.",
    accent: "secondary",
  },
];

function FeatureCard({
  feature,
  index,
}: {
  feature: (typeof features)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const Icon = feature.icon;
  const isPrimary = feature.accent === "primary";

  return (
    <div
      ref={ref}
      className="group relative rounded-2xl border border-border/50 bg-card/30 p-6 md:p-8 transition-all duration-500 hover:border-primary/20 hover:bg-card/60"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s, border-color 0.3s ease, background-color 0.3s ease`,
      }}
    >
      {/* Glow on hover */}
      <div
        className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
          isPrimary
            ? "bg-[radial-gradient(ellipse_at_top_left,hsl(336_100%_50%/0.05),transparent_60%)]"
            : "bg-[radial-gradient(ellipse_at_top_left,hsl(168_100%_45%/0.05),transparent_60%)]"
        }`}
      />

      <div className="relative z-10">
        <div
          className={`inline-flex items-center justify-center w-11 h-11 rounded-xl mb-5 ${
            isPrimary
              ? "bg-primary/10 text-primary"
              : "bg-accent/10 text-accent"
          }`}
        >
          <Icon size={22} />
        </div>

        <h3 className="text-lg font-semibold text-foreground mb-2">
          {feature.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {feature.description}
        </p>
      </div>
    </div>
  );
}

export function FeaturesSection() {
  return (
    <section id="features" className="relative py-16 md:py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16 md:mb-20">
          <span className="inline-block text-sm font-medium text-primary tracking-wider uppercase mb-4">
            Features
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight text-balance">
            Everything Your Business
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, hsl(336 100% 50%), hsl(168 100% 45%))",
              }}
            >
              Needs to Scale
            </span>
          </h2>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
