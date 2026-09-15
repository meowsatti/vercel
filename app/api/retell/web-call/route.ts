import { NextResponse } from "next/server";
import { z } from "zod";

const requestSchema = z.object({
  businessName: z.string().trim().min(2).max(80),
  businessType: z.string().trim().min(2).max(80),
});

export async function POST(request: Request) {
  const parsed = requestSchema.safeParse(await request.json().catch(() => null));

  if (!parsed.success) {
    return NextResponse.json({ error: "Please provide a valid business name and business type." }, { status: 400 });
  }

  const apiKey = process.env.API_KEY;
  const agentId = "agent_17485ba3bdce21b2fc05f752fd";

  if (!apiKey || !agentId) {
    return NextResponse.json({ error: "The live agent is not configured yet." }, { status: 503 });
  }

  const { businessName, businessType } = parsed.data;
  const retellResponse = await fetch("https://api.retellai.com/v2/create-web-call", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      agent_id: agentId,
      max_call_duration_ms: 60000,
      retell_llm_dynamic_variables: { business_name: businessName, business_type: businessType, wrap_up_instruction: "At 55 seconds, politely let the caller know the demo is ending soon and say goodbye. End the call at 60 seconds." },
    }),
  });

  if (!retellResponse.ok) {
    return NextResponse.json({ error: "We could not start the demo call. Please try again." }, { status: 502 });
  }

  const data = (await retellResponse.json()) as { access_token?: string; call_id?: string };
  if (!data.access_token) return NextResponse.json({ error: "Retell did not return a call token." }, { status: 502 });

  return NextResponse.json({ accessToken: data.access_token, callId: data.call_id ?? null });
}

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
