'use client'

import { useEffect, useState } from 'react'
import { Download, LogIn, RefreshCw, Trash2 } from 'lucide-react'

type Participant = { name: string; mobile: string; standard: 'PUC I' | 'PUC II' }
type Registration = { id: string; eventName: string; college: string; participants: Participant[]; createdAt: string }

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false)
  const [email, setEmail] = useState('')
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [query, setQuery] = useState('')
  const [authMessage, setAuthMessage] = useState('')
  const load = () => { try { setRegistrations(JSON.parse(localStorage.getItem('avishkar-registrations') || '[]')) } catch { setRegistrations([]) } }
  useEffect(() => { setAuthenticated(sessionStorage.getItem('avishkar-admin-session') === 'active'); load() }, [])
  const signIn = (e: React.FormEvent) => { e.preventDefault(); if (!email.trim()) { setAuthMessage('Enter your organizer email to continue.'); return } sessionStorage.setItem('avishkar-admin-session', 'active'); setAuthenticated(true); setAuthMessage('') }
  const remove = (id: string) => { const next = registrations.filter(r => r.id !== id); localStorage.setItem('avishkar-registrations', JSON.stringify(next)); setRegistrations(next) }
  const exportCsv = () => { const rows = [['Registration ID', 'Event', 'College', 'Participant', 'Mobile', 'Standard'], ...registrations.flatMap(r => r.participants.map(p => [r.id, r.eventName, r.college, p.name, p.mobile, p.standard]))]; const blob = new Blob([rows.map(row => row.map(cell => `"${cell.replaceAll('"', '""')}"`).join(',')).join('\n')], { type: 'text/csv' }); const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'avishkar-registrations.csv'; a.click(); URL.revokeObjectURL(a.href) }
  if (!authenticated) return <main className="admin-gate"><div className="admin-gate-card"><div className="admin-lock"><LogIn /></div><p className="eyebrow">AVISHKAR 5.0 · ORGANIZER</p><h1>Registration <em>desk.</em></h1><p>Private access for the festival team. Connect this gate to your production identity provider before launch.</p><form onSubmit={signIn}><label>Organizer email<input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="name@college.edu" /></label>{authMessage && <span className="admin-message">{authMessage}</span>}<button className="button button-primary wide"><LogIn /> Continue securely</button></form><a href="/" className="admin-home-link">Return to student website</a></div></main>
  const filtered = registrations.filter(r => `${r.id} ${r.eventName} ${r.college}`.toLowerCase().includes(query.toLowerCase()))
  return <main className="admin-page"><div className="admin-topbar"><a href="/" className="wordmark"><span>AVISHKAR</span><b>5.0</b></a><button className="admin-logout" onClick={() => { sessionStorage.removeItem('avishkar-admin-session'); setAuthenticated(false) }}>Log out</button></div><div className="admin-heading"><p className="eyebrow">PRIVATE ORGANIZER AREA</p><h1>Registration <em>desk.</em></h1><p>Manage entries captured in this preview. Connect a backend before launch.</p></div><div className="admin-toolbar"><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search event or college" /><button onClick={load}><RefreshCw /> Refresh</button><button onClick={exportCsv} disabled={!registrations.length}><Download /> Export all CSV</button></div><div className="admin-stats"><strong>{registrations.length}</strong><span>registrations</span><strong>{registrations.reduce((sum, r) => sum + r.participants.length, 0)}</strong><span>participants</span></div>{filtered.length === 0 ? <div className="admin-empty">No registrations yet.</div> : <div className="admin-list">{filtered.map(r => <article key={r.id}><div className="admin-list-head"><div><span>{r.id}</span><h2>{r.eventName}</h2><p>{r.college}</p></div><button aria-label={`Delete ${r.id}`} onClick={() => remove(r.id)}><Trash2 /></button></div>{r.participants.map((p, i) => <div className="admin-person" key={i}><b>{p.name}</b><span>{p.standard} · {p.mobile}</span></div>)}</article>)}</div>}</main>
}
