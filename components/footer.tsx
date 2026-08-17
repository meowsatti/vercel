"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative px-6">
      {/* CTA section */}
      <div className="max-w-5xl mx-auto mb-20">
        <div className="relative rounded-3xl border border-border/30 bg-card/20 backdrop-blur-sm overflow-hidden p-10 md:p-16 text-center">
          {/* Glow */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full opacity-15 blur-[100px]"
              style={{
                background:
                  "linear-gradient(135deg, hsl(336 100% 50%), hsl(168 100% 45%))",
              }}
            />
          </div>

          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight mb-4 text-balance">
              Ready to Never Miss
              <br />a Call Again?
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto mb-8 text-balance">
              Join hundreds of businesses using Emporri to handle calls, book
              appointments, and delight customers around the clock.
            </p>
            <a
              href="#"
              className="group inline-flex items-center gap-2 px-8 py-4 text-base font-medium text-primary-foreground bg-primary rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 hover:scale-105 active:scale-95"
              data-cursor-hover
            >
              Get Started Free
              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
          </div>
        </div>
      </div>

      {/* Footer bottom */}
      <div className="max-w-7xl mx-auto border-t border-border/30 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="relative w-8 h-8 overflow-hidden rounded-lg">
              <Image
                src="/logo.jpg"
                alt="Emporri"
                fill
                sizes="32px"
                className="object-contain"
              />
            </div>
            <span className="text-sm font-medium text-foreground">
              Emporri
            </span>
          </div>

          <div className="flex items-center gap-6">
            {["Privacy", "Terms", "Contact"].map((link) => (
              <a
                key={link}
                href="#"
                className="text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground"
                data-cursor-hover
              >
                {link}
              </a>
            ))}
          </div>

          <p className="text-sm text-muted-foreground">
            {"© 2026 Emporri. All rights reserved."}
          </p>
        </div>
      </div>
    </footer>
  );
}
