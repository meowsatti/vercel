import { pgTable, text, timestamp, boolean, uuid } from 'drizzle-orm/pg-core';

export const user = pgTable('user', {
  id: text('id').primaryKey(), name: text('name').notNull(), email: text('email').notNull().unique(), emailVerified: boolean('emailVerified').notNull().default(false), image: text('image'), role: text('role').notNull().default('customer'), createdAt: timestamp('createdAt').notNull().defaultNow(), updatedAt: timestamp('updatedAt').notNull().defaultNow(),
});
export const session = pgTable('session', { id: text('id').primaryKey(), expiresAt: timestamp('expiresAt').notNull(), token: text('token').notNull().unique(), createdAt: timestamp('createdAt').notNull().defaultNow(), updatedAt: timestamp('updatedAt').notNull().defaultNow(), ipAddress: text('ipAddress'), userAgent: text('userAgent'), userId: text('userId').notNull().references(() => user.id, { onDelete: 'cascade' }) });
export const account = pgTable('account', { id: text('id').primaryKey(), accountId: text('accountId').notNull(), providerId: text('providerId').notNull(), userId: text('userId').notNull().references(() => user.id, { onDelete: 'cascade' }), accessToken: text('accessToken'), refreshToken: text('refreshToken'), idToken: text('idToken'), accessTokenExpiresAt: timestamp('accessTokenExpiresAt'), refreshTokenExpiresAt: timestamp('refreshTokenExpiresAt'), scope: text('scope'), password: text('password'), createdAt: timestamp('createdAt').notNull().defaultNow(), updatedAt: timestamp('updatedAt').notNull().defaultNow() });
export const verification = pgTable('verification', { id: text('id').primaryKey(), identifier: text('identifier').notNull(), value: text('value').notNull(), expiresAt: timestamp('expiresAt').notNull(), createdAt: timestamp('createdAt').defaultNow(), updatedAt: timestamp('updatedAt').defaultNow() });
export const consultationLeads = pgTable('consultation_leads', { id: uuid('id').defaultRandom().primaryKey(), name: text('name').notNull(), email: text('email').notNull(), contactNumber: text('contact_number').notNull(), annualRevenue: text('annual_revenue').notNull(), teamSize: text('team_size').notNull(), monthlyBudget: text('monthly_budget').notNull(), status: text('status').notNull().default('new'), userId: text('user_id'), createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(), updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow() });
export type ConsultationLead = typeof consultationLeads.$inferSelect;
export type User = typeof user.$inferSelect;

// Keep auth tables aligned with Better Auth's default camelCase columns.

export const leads = consultationLeads;
