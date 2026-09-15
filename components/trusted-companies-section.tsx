"use client";

import { useMemo, useState } from "react";

const companies = ["Google", "Microsoft", "Amazon", "Salesforce", "HubSpot", "Shopify", "Stripe", "Notion", "Webflow", "Deloitte"];

export function TrustedCompaniesSection() {
  return <section aria-labelledby="trusted-heading" className="overflow-hidden border-y border-border/40 py-12 md:py-16"><div className="mx-auto max-w-7xl px-6"><p className="text-center text-xs font-medium uppercase tracking-[0.28em] text-muted-foreground">Trusted by fast-growing global companies</p><h2 id="trusted-heading" className="sr-only">Trusted by fast-growing global companies</h2></div><div className="mt-10 flex w-max animate-[ticker-scroll_28s_linear_infinite] gap-4 hover:[animation-play-state:paused]">{[...companies, ...companies].map((company, index) => <div key={`${company}-${index}`} className="flex h-16 min-w-[170px] items-center justify-center rounded-2xl border border-border/60 bg-card/30 px-8 text-lg font-semibold tracking-tight text-foreground/60 grayscale">{company}</div>)}</div></section>;
}

export function TestimonialsSection() {
  const testimonials = [{ quote: "Emporri gave our team back the hours we were losing to repetitive calls.", name: "Maya Chen", role: "COO, Northstar Health" }, { quote: "The voice quality feels genuinely human, and our customers noticed immediately.", name: "James Okafor", role: "Founder, Atlas Commerce" }, { quote: "We launched in days and saw a measurable lift in booked appointments.", name: "Sofia Martin", role: "Growth Lead, Lumen" }];
  return <section id="testimonials" className="px-6 py-16 md:py-20"><div className="mx-auto max-w-7xl"><div className="mb-10 max-w-2xl"><p className="text-xs font-medium uppercase tracking-[0.28em] text-primary">Customer stories</p><h2 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">Built for teams that move fast.</h2></div><div className="grid gap-5 md:grid-cols-3">{testimonials.map((item) => <figure key={item.name} className="rounded-3xl border border-border/60 bg-card/30 p-7"><div className="text-primary" aria-label="5 out of 5 stars">★★★★★</div><blockquote className="mt-6 text-lg leading-relaxed text-foreground">“{item.quote}”</blockquote><figcaption className="mt-8 text-sm text-muted-foreground"><span className="block font-semibold text-foreground">{item.name}</span>{item.role}</figcaption></figure>)}</div></div></section>;
}

export function BlogSection() {
  const posts = [{ title: "What is an AI receptionist?", excerpt: "A practical guide to answering every call without adding another shift.", date: "May 14, 2026" }, { title: "The economics of never missing a lead", excerpt: "How fast-growing teams turn response time into a competitive advantage.", date: "Apr 28, 2026" }, { title: "Designing a voice agent customers trust", excerpt: "The conversation principles behind helpful, natural AI experiences.", date: "Apr 09, 2026" }];
  return <section id="blog" aria-labelledby="blog-heading" className="px-6 py-16 md:py-20"><div className="mx-auto max-w-7xl"><div><p className="text-xs font-medium uppercase tracking-[0.28em] text-primary">Emporri journal</p><h2 id="blog-heading" className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">Ideas for better conversations.</h2></div><div className="mt-10 grid gap-5 md:grid-cols-3">{posts.map((post) => <article key={post.title} className="rounded-3xl border border-border/60 bg-card/30 p-7 transition-colors hover:border-primary/40"><p className="text-xs text-muted-foreground">{post.date}</p><h3 className="mt-5 text-xl font-semibold">{post.title}</h3><p className="mt-3 leading-relaxed text-muted-foreground">{post.excerpt}</p><a href="#" className="mt-7 inline-block text-sm font-medium text-primary">Read article →</a></article>)}</div></div></section>;
}

export function RoiCalculator() {
  const [salary, setSalary] = useState(4500);
  const [calls, setCalls] = useState(50);
  const [missedRate, setMissedRate] = useState(15);
  const [conversion, setConversion] = useState(20);
  const [orderValue, setOrderValue] = useState(150);
  const annual = useMemo(() => {
    const recovered = calls * 30 * 12 * (missedRate / 100) * (conversion / 100) * orderValue;
    const afterHours = calls * 30 * 12 * 0.1 * orderValue * 0.3;
    return { recovered, afterHours, upside: salary * 12 + recovered + afterHours - 1919 };
  }, [salary, calls, missedRate, conversion, orderValue]);
  const fields: Array<[string, number, string, (value: number) => void, number, number, number]> = [
    ["Current receptionist salary", salary, "$", setSalary, 2500, 9000, 500],
    ["Daily incoming calls", calls, "", setCalls, 10, 150, 5],
    ["Missed call rate", missedRate, "%", setMissedRate, 5, 50, 1],
    ["Call-to-customer conversion", conversion, "%", setConversion, 5, 60, 1],
    ["Average order value", orderValue, "$", setOrderValue, 25, 500, 25],
  ];
  // @ts-expect-error Range field tuples are rendered from a homogeneous calculator definition.
  return <section id="roi" aria-labelledby="roi-heading" className="px-6 py-16 md:py-20"><div className="mx-auto max-w-5xl text-center"><p className="text-xs font-medium uppercase tracking-[0.28em] text-primary">ROI calculator</p><h2 id="roi-heading" className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">Price the calls you are already losing.</h2><p className="mx-auto mt-4 max-w-2xl text-muted-foreground">Move the sliders to estimate labor savings, recovered missed-call revenue, and after-hours upside.</p></div><div className="mx-auto mt-10 grid max-w-5xl gap-4 rounded-3xl border border-primary/15 bg-card/40 p-4 md:grid-cols-[1fr_1.1fr] md:p-5"><div className="rounded-2xl border border-border/60 bg-background/60 p-5"><div className="mb-5 flex items-center justify-between"><p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Inputs</p><span className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary">Live estimate</span></div><h3 className="mb-4 text-xl font-semibold">Your call economics</h3><div className="space-y-3">{fields.map(([label, value, prefix, setter, min, max, step]) => <label key={label} className="block rounded-xl border border-border/60 bg-card/50 p-4 text-left"><span className="flex justify-between text-xs text-muted-foreground"><span>{label}</span><b className="rounded-full bg-primary/10 px-2 py-1 text-primary">{prefix}{value.toLocaleString()}{prefix === "%" ? "%" : ""}</b></span><input aria-label={label} type="range" min={Number(min)} max={Number(max)} step={Number(step)} value={Number(value)} onChange={(event) => (setter as (value: number) => void)(Number(event.target.value))} className="mt-3 w-full accent-primary" /></label>)}</div></div><div className="rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-primary/60 p-6 text-left text-white md:p-7"><p className="text-xs uppercase tracking-[0.2em] text-cyan-200">Estimated annual upside</p><p className="mt-2 text-5xl font-bold">${Math.max(0, Math.round(annual.upside)).toLocaleString()}</p><span className="mt-2 inline-block rounded-full bg-white/10 px-3 py-1 text-xs">Based on Emporri plan cost</span><div className="mt-6 space-y-2">{[["Human receptionist cost", salary * 12], ["Emporri annual cost", 1919], ["Recovered missed-call revenue", annual.recovered], ["After-hours opportunity", annual.afterHours]].map(([label, value], index) => <div key={label} className="flex items-center justify-between rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm"><span className="text-white/75">{label}</span><b className={index > 1 ? "text-teal-200" : ""}>{index > 1 ? "+" : ""}${Math.round(value).toLocaleString()}</b></div>)}</div><p className="mt-4 rounded-xl border border-teal-300/20 bg-teal-300/10 p-4 text-xs leading-relaxed text-teal-50">Conservative model: assumes 10% of calls happen after hours and converts 30% lower than daily calls.</p></div></div></section>;
}
