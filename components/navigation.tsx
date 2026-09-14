"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-background/80 backdrop-blur-xl border-b border-border/50"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex h-16 md:h-20 items-center justify-between">
            {/* Logo */}
            <a href="#" className="flex items-center gap-3 group" data-cursor-hover>
              <div className="relative w-9 h-9 md:w-10 md:h-10 overflow-hidden rounded-full transition-transform duration-300 group-hover:scale-110">
                <Image
                  src="/logo.jpg"
                  alt="Emporri"
                  fill
                  sizes="40px"
                  className="object-contain mix-blend-screen"
                />
              </div>
              <span className="text-lg md:text-xl font-semibold tracking-tight text-foreground">
                Emporri
              </span>
            </a>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="relative px-4 py-2 text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground group"
                  data-cursor-hover
                >
                  {link.label}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-px bg-primary transition-all duration-300 group-hover:w-3/4" />
                </a>
              ))}
            </div>

            {/* CTA */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href="#pricing"
                className="relative inline-flex items-center px-5 py-2.5 text-sm font-medium text-primary-foreground bg-primary rounded-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 hover:scale-105 active:scale-95"
                data-cursor-hover
              >
                <span className="relative z-10">Get Started</span>
              </a>
            </div>

            {/* Mobile toggle */}
            <button
              className="md:hidden relative z-50 p-2 text-foreground"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              aria-label="Toggle menu"
            >
              {isMobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 bg-background transition-all duration-500 md:hidden ${
          isMobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              className="text-3xl font-semibold text-foreground transition-all duration-300 hover:text-primary"
              style={{
                opacity: isMobileOpen ? 1 : 0,
                transform: isMobileOpen ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 0.4s ease ${i * 0.1}s, transform 0.4s ease ${i * 0.1}s, color 0.3s ease`,
              }}
              onClick={() => setIsMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#pricing"
            className="mt-4 inline-flex items-center px-8 py-3 text-base font-medium text-primary-foreground bg-primary rounded-full"
            style={{
              opacity: isMobileOpen ? 1 : 0,
              transform: isMobileOpen ? "translateY(0)" : "translateY(20px)",
              transition: `opacity 0.4s ease 0.3s, transform 0.4s ease 0.3s`,
            }}
            onClick={() => setIsMobileOpen(false)}
          >
            Get Started
          </a>
        </div>
      </div>
    </>
  );
}
