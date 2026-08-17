'use client'

import { useRef, useState, useTransition } from 'react'
import { submitConsultation } from '@/app/actions/leads'

const fields = [
  ['name', 'Name', 'Your full name', 'text'],
  ['email', 'Email', 'you@company.com', 'email'],
  ['contactNumber', 'Contact number', '+1 555 000 0000', 'tel'],
] as const

export function ConsultationForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const [pending, startTransition] = useTransition()
  const [result, setResult] = useState<string | null>(null)
  return <form ref={formRef} className="space-y-5" action={(data) => startTransition(async () => { const response = await submitConsultation(data); if (response.error) setResult(response.error); else { setResult('Thanks — your consultation is reserved. We will be in touch shortly.'); formRef.current?.reset() } })}>
    <div className="grid gap-5 sm:grid-cols-2">
      {fields.map(([name, label, placeholder, type]) => <label key={name} className="space-y-2 text-sm"><span className="text-white/70">{label}</span><input required name={name} type={type} placeholder={placeholder} className="neon-input" /></label>)}
      <label className="space-y-2 text-sm"><span className="text-white/70">Revenue in the past year</span><select required name="annualRevenue" className="neon-input"><option value="">Select a range</option><option>Under $100k</option><option>$100k–$500k</option><option>$500k–$2m</option><option>$2m+</option></select></label>
      <label className="space-y-2 text-sm"><span className="text-white/70">Company / team size</span><select required name="teamSize" className="neon-input"><option value="">Select a size</option><option>1–5</option><option>6–25</option><option>26–100</option><option>100+</option></select></label>
      <label className="space-y-2 text-sm sm:col-span-2"><span className="text-white/70">Monthly AI budget range</span><select required name="monthlyBudget" className="neon-input"><option value="">Select a range</option><option>Under $1,000</option><option>$1,000–$5,000</option><option>$5,000–$15,000</option><option>$15,000+</option></select></label>
    </div>
    <button disabled={pending} className="neon-button w-full sm:w-auto" type="submit">{pending ? 'Reserving…' : 'Reserve my free consultation'}</button>
    {result && <p role="status" className="text-sm text-cyan-300">{result}</p>}
  </form>
}
