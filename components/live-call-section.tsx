"use client";

import { useEffect, useRef, useState } from "react";
import { Headphones, Mic, Phone, RotateCcw, ShieldCheck, Timer } from "lucide-react";
import { RetellWebClient } from "retell-client-js-sdk";

type CallState = "idle" | "starting" | "live" | "ended" | "error";
const MAX_SECONDS = 60;

export function LiveCallSection() {
  const [businessName, setBusinessName] = useState("");
  const [agentName, setAgentName] = useState("");
  const [agentType, setAgentType] = useState("");
  const [state, setState] = useState<CallState>("idle");
  const [seconds, setSeconds] = useState(0);
  const [message, setMessage] = useState("");
  const clientRef = useRef<RetellWebClient | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const endCall = async (reason = "The demo has ended. Thanks for trying Emporri.") => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
    try { await clientRef.current?.stopCall(); } catch { /* session may already be closed */ }
    clientRef.current = null;
    setState("ended");
    setMessage(reason);
  };

  useEffect(() => () => { if (timerRef.current) clearInterval(timerRef.current); void clientRef.current?.stopCall(); }, []);

  async function startCall(event: React.FormEvent) {
    event.preventDefault();
    if (!businessName.trim() || !agentName.trim() || !agentType.trim()) {
      setState("error"); setMessage("Please complete all three fields before starting the call."); return;
    }
    setState("starting"); setMessage("Preparing your secure demo call…"); setSeconds(0);
    try {
      const response = await fetch("/api/retell/web-call", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ businessName, agentName, agentType }) });
      const data = await response.json();
      if (!response.ok || !data.accessToken) throw new Error(data.error || "Unable to start the call.");
      const client = new RetellWebClient();
      clientRef.current = client;
      client.on("call_started", () => { setState("live"); setMessage("You are connected. Your agent is listening."); });
      client.on("call_ended", () => { if (clientRef.current) void endCall("Call ended. Thanks for trying the live agent."); });
      client.on("error", () => { void endCall("We lost the connection. Please try the demo again."); setState("error"); });
      await client.startCall({ accessToken: data.accessToken });
      timerRef.current = setInterval(() => setSeconds((current) => {
        if (current + 1 >= MAX_SECONDS) { void endCall("Your 60-second demo is complete. The agent has politely ended the call."); return MAX_SECONDS; }
        return current + 1;
      }), 1000);
    } catch (error) {
      setState("error"); setMessage(error instanceof Error ? error.message : "We could not start the call. Please try again."); clientRef.current = null;
    }
  }

  const isBusy = state === "starting" || state === "live";
  return (
    <section id="live-demo" className="relative overflow-hidden px-6 py-24 md:py-32">
      <div className="absolute left-1/2 top-1/3 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/10 blur-[110px]" />
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-primary"><span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_10px_hsl(320_100%_55%)]" />Live demo</div>
          <h2 className="max-w-xl text-4xl font-bold tracking-tight text-foreground md:text-6xl">Talk to live AI agent</h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg">Give your agent a quick test drive. Tell us who it represents, then hear how naturally it can handle your next customer conversation.</p>
          <div className="mt-8 flex items-center gap-3 text-sm text-muted-foreground"><ShieldCheck size={18} className="text-secondary" /> Private demo · microphone access required</div>
        </div>
        <div className="rounded-3xl border border-border bg-card/70 p-5 shadow-2xl shadow-primary/5 backdrop-blur md:p-8">
          {isBusy ? <div className="flex min-h-[360px] flex-col items-center justify-center text-center"><div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-secondary/40 bg-secondary/10 text-secondary shadow-[0_0_35px_hsl(170_100%_50%_/_0.25)]"><Mic size={30} className={state === "live" ? "animate-pulse" : ""} /></div><p className="text-sm font-medium uppercase tracking-[0.18em] text-secondary">{state === "live" ? "Live connection" : "Connecting"}</p><p className="mt-3 text-muted-foreground">{message}</p><div className="mt-6 flex items-center gap-2 font-mono text-2xl text-foreground"><Timer size={20} className="text-primary" /> {String(Math.max(0, MAX_SECONDS - seconds)).padStart(2, "0")}s</div><button type="button" onClick={() => void endCall()} className="mt-8 inline-flex items-center gap-2 rounded-full border border-destructive/50 px-5 py-2.5 text-sm text-destructive transition-colors hover:bg-destructive/10"><Phone size={16} /> End call</button></div> : <form onSubmit={startCall} className="space-y-5"><div className="flex items-center gap-3 border-b border-border pb-5"><Headphones className="text-primary" size={22} /><div><p className="font-semibold text-foreground">Set up your demo</p><p className="text-sm text-muted-foreground">Your agent will use these details in the conversation.</p></div></div><Field label="Business name" value={businessName} onChange={setBusinessName} placeholder="e.g. Acme Dental" /><Field label="Agent name" value={agentName} onChange={setAgentName} placeholder="e.g. Alex" /><Field label="Agent type" value={agentType} onChange={setAgentType} placeholder="e.g. Receptionist, sales rep" />{message && <p role="alert" className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">{message}</p>}<button type="submit" disabled={isBusy} className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 font-medium text-primary-foreground shadow-lg shadow-primary/20 transition hover:scale-[1.01] hover:shadow-primary/35 disabled:cursor-wait disabled:opacity-60"><Phone size={18} />Start demo call</button><p className="flex items-center justify-center gap-2 text-center text-xs text-muted-foreground"><Timer size={14} /> Demo calls automatically end after 60 seconds</p></form>}
          {state === "ended" && <div className="mt-5 flex items-center justify-between rounded-xl border border-secondary/25 bg-secondary/5 px-4 py-3 text-sm text-secondary"><span>{message}</span><button type="button" aria-label="Try again" onClick={() => { setState("idle"); setMessage(""); }}><RotateCcw size={17} /></button></div>}
        </div>
      </div>
    </section>
  );
}

function Field({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (value: string) => void; placeholder: string }) { return <label className="block text-sm font-medium text-foreground">{label}<input required value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} className="mt-2 w-full rounded-xl border border-input bg-background/70 px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/20" /></label>; }
