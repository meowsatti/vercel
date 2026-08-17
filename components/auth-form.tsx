'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { authClient } from '@/lib/auth-client'

export function AuthForm({ mode }: { mode: 'sign-in' | 'sign-up' }) {
  const router = useRouter(); const [error, setError] = useState(''); const [pending, setPending] = useState(false)
  async function onSubmit(event: React.FormEvent<HTMLFormElement>) { event.preventDefault(); setPending(true); setError(''); const data = new FormData(event.currentTarget); const response = mode === 'sign-up' ? await authClient.signUp.email({ name: String(data.get('name')), email: String(data.get('email')), password: String(data.get('password')) }) : await authClient.signIn.email({ email: String(data.get('email')), password: String(data.get('password')) }); setPending(false); if (response.error) setError('We could not complete that request. Check your details and try again.'); else { router.push('/'); router.refresh() } }
  return <form onSubmit={onSubmit} className="mx-auto w-full max-w-md space-y-4">{mode === 'sign-up' && <input required name="name" placeholder="Your name" className="neon-input" />}<input required name="email" type="email" placeholder="Email" className="neon-input" /><input required name="password" type="password" minLength={8} placeholder="Password" className="neon-input" /><button disabled={pending} className="neon-button w-full" type="submit">{pending ? 'Please wait…' : mode === 'sign-in' ? 'Sign in' : 'Create account'}</button>{error && <p role="alert" className="text-sm text-pink-300">{error}</p>}</form>
}
