'use server'

import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { consultationLeads, user } from '@/lib/db/schema'
import { and, desc, eq } from 'drizzle-orm'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'

export async function submitConsultation(formData: FormData) {
  const name = String(formData.get('name') ?? '').trim()
  const email = String(formData.get('email') ?? '').trim().toLowerCase()
  const contactNumber = String(formData.get('contactNumber') ?? '').trim()
  const annualRevenue = String(formData.get('annualRevenue') ?? '').trim()
  const teamSize = String(formData.get('teamSize') ?? '').trim()
  const monthlyBudget = String(formData.get('monthlyBudget') ?? '').trim()
  if (!name || !email || !contactNumber || !annualRevenue || !teamSize || !monthlyBudget) return { error: 'Please complete every field.' }
  const session = await auth.api.getSession({ headers: await headers() })
  await db.insert(consultationLeads).values({ name, email, contactNumber, annualRevenue, teamSize, monthlyBudget, userId: session?.user?.id ?? null })
  return { success: true }
}

async function requireAdmin() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Unauthorized')
  const [currentUser] = await db.select({ role: user.role }).from(user).where(eq(user.id, session.user.id)).limit(1)
  if (currentUser?.role !== 'admin') throw new Error('Forbidden')
}

export async function getLeads() {
  await requireAdmin()
  return db.select().from(consultationLeads).orderBy(desc(consultationLeads.createdAt))
}

export async function updateLeadStatus(id: string, status: string) {
  await requireAdmin()
  if (!['new', 'contacted', 'qualified', 'closed'].includes(status)) throw new Error('Invalid status')
  await db.update(consultationLeads).set({ status, updatedAt: new Date() }).where(and(eq(consultationLeads.id, id)))
  revalidatePath('/admin/leads')
}

export async function updateLeadStatusFromForm(formData: FormData) {
  await updateLeadStatus(String(formData.get('id') ?? ''), String(formData.get('status') ?? ''))
}
