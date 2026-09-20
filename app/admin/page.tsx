'use client'

import { useEffect, useState } from 'react'
import { Download, LogIn, RefreshCw, Trash2, ChevronRight, ArrowLeft } from 'lucide-react'

type Participant = { name: string; mobile: string; standard: 'PUC I' | 'PUC II' }
type Registration = { id: string; eventName: string; college: string; participants: Participant[]; createdAt: string }
type EventSummary = { eventId: string; eventName: string; count: number }

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const [summary, setSummary] = useState<EventSummary[]>([])
  const [activeEventId, setActiveEventId] = useState<string | null>(null)
  const [registrations, setRegistrations] = useState<Registration[]>([])
  
  const [query, setQuery] = useState('')
  const [authMessage, setAuthMessage] = useState('')

  const loadSummary = async () => { 
    try { 
      const token = sessionStorage.getItem('avishkar-admin-token'); 
      if (!token) return; 
      const res = await fetch('http://localhost:5000/api/events/all/summary', { headers: { Authorization: `Bearer ${token}` } }); 
      const json = await res.json(); 
      if (json.success) setSummary(json.data); 
    } catch { setSummary([]) } 
  }

  const loadEventRegistrations = async (eventId: string) => {
    try {
      const token = sessionStorage.getItem('avishkar-admin-token');
      if (!token) return;
      const res = await fetch(`http://localhost:5000/api/events/${eventId}/registrations`, { headers: { Authorization: `Bearer ${token}` } });
      const json = await res.json();
      if (json.success) setRegistrations(json.data);
    } catch { setRegistrations([]) }
  }

  useEffect(() => { 
    const token = sessionStorage.getItem('avishkar-admin-token'); 
    if (token) { 
      setAuthenticated(true); 
      loadSummary(); 
    } 
  }, [])

  useEffect(() => {
    if (activeEventId) {
      loadEventRegistrations(activeEventId);
    }
  }, [activeEventId])

  const signIn = async (e: React.FormEvent) => { 
    e.preventDefault(); 
    if (!email.trim() || !password.trim()) { setAuthMessage('Enter credentials to continue.'); return; } 
    try { 
      const res = await fetch('http://localhost:5000/api/auth/admin/login', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({ email, password }) 
      }); 
      const data = await res.json(); 
      if (data.success) { 
        sessionStorage.setItem('avishkar-admin-token', data.token); 
        setAuthenticated(true); 
        setAuthMessage(''); 
        loadSummary(); 
      } else { 
        setAuthMessage('Invalid credentials.'); 
      } 
    } catch (err) { setAuthMessage('Login failed.'); } 
  }

  const remove = async (id: string) => { 
    const token = sessionStorage.getItem('avishkar-admin-token'); 
    if (!token) return; 
    try { 
      const res = await fetch(`http://localhost:5000/api/events/registrations/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } }); 
      if (res.ok) { setRegistrations(prev => prev.filter(r => r.id !== id)); loadSummary(); } 
    } catch (e) {} 
  }

  const exportEventCsv = (eventId: string) => {
    const token = sessionStorage.getItem('avishkar-admin-token');
    if (!token) return;
    
    // We can just redirect to the endpoint or fetch and trigger download
    fetch(`http://localhost:5000/api/events/${eventId}/registrations/export`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      const filename = res.headers.get('content-disposition')?.split('filename="')[1]?.replace('"', '') || `${eventId}_Registrations.csv`;
      return res.blob().then(blob => ({ blob, filename }));
    })
    .then(({ blob, filename }) => {
      const a = document.createElement('a'); 
      a.href = URL.createObjectURL(blob); 
      a.download = filename; 
      a.click(); 
      URL.revokeObjectURL(a.href);
    })
    .catch(console.error);
  }

  if (!authenticated) return (
    <main className="admin-gate">
      <div className="admin-gate-card">
        <div className="admin-lock"><LogIn /></div>
        <p className="eyebrow">AVISHKAR 5.0 · ORGANIZER</p>
        <h1>Registration <em>desk.</em></h1>
        <p>Private access for the festival team. Connect this gate to your production identity provider before launch.</p>
        <form onSubmit={signIn}>
          <label>Organizer email<input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="name@college.edu" /></label>
          <label>Password<input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" /></label>
          {authMessage && <span className="admin-message">{authMessage}</span>}
          <button className="button button-primary wide"><LogIn /> Continue securely</button>
        </form>
        <a href="/" className="admin-home-link">Return to student website</a>
      </div>
    </main>
  )

  const activeEvent = summary.find(s => s.eventId === activeEventId);
  const filteredRegistrations = registrations.filter(r => `${r.id} ${r.eventName} ${r.college}`.toLowerCase().includes(query.toLowerCase()));

  return (
    <main className="admin-page">
      <div className="admin-topbar">
        <a href="/" className="wordmark"><span>AVISHKAR</span><b>5.0</b></a>
        <button className="admin-logout" onClick={() => { sessionStorage.removeItem('avishkar-admin-token'); setAuthenticated(false); setActiveEventId(null); }}>Log out</button>
      </div>

      <div className="admin-heading">
        <p className="eyebrow">PRIVATE ORGANIZER AREA</p>
        <h1>Registration <em>desk.</em></h1>
        <p>Manage entries captured in this preview. Connect a backend before launch.</p>
      </div>

      {!activeEventId ? (
        <>
          <div className="admin-stats">
            <strong>{summary.length}</strong><span>events</span>
            <strong>{summary.reduce((sum, s) => sum + s.count, 0)}</strong><span>total registrations</span>
          </div>
          
          <div className="admin-toolbar">
            <button onClick={loadSummary}><RefreshCw /> Refresh Events</button>
          </div>

          <div className="admin-list" style={{ marginTop: 24 }}>
            {summary.map(s => (
              <article key={s.eventId} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ fontSize: '0.8rem', color: '#666' }}>{s.eventId}</span>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 600, margin: '4px 0' }}>{s.eventName}</h2>
                  <p style={{ color: '#0066cc', fontWeight: 500 }}>{s.count} Registrations</p>
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                  <button className="button" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px', background: '#f0f0f0', border: 'none', borderRadius: 6, cursor: 'pointer' }} onClick={() => exportEventCsv(s.eventId)}>
                    <Download size={16} /> Download Excel
                  </button>
                  <button className="button button-primary" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px', background: '#000', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer' }} onClick={() => setActiveEventId(s.eventId)}>
                    View Data <ChevronRight size={16} />
                  </button>
                </div>
              </article>
            ))}
            {summary.length === 0 && <div className="admin-empty">No events found.</div>}
          </div>
        </>
      ) : (
        <>
          <div style={{ marginBottom: 24 }}>
            <button onClick={() => setActiveEventId(null)} style={{ background: 'transparent', border: 'none', display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: '1rem', fontWeight: 500 }}>
              <ArrowLeft size={20} /> Back to Events
            </button>
          </div>

          <div className="admin-toolbar">
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder={`Search in ${activeEvent?.eventName}...`} />
            <button onClick={() => loadEventRegistrations(activeEventId)}><RefreshCw /> Refresh</button>
            <button onClick={() => exportEventCsv(activeEventId)} disabled={!registrations.length}><Download /> Export Event CSV</button>
          </div>
          
          <div className="admin-stats">
            <strong>{registrations.length}</strong><span>registrations</span>
            <strong>{registrations.reduce((sum, r) => sum + r.participants.length, 0)}</strong><span>participants in {activeEvent?.eventName}</span>
          </div>
          
          {filteredRegistrations.length === 0 ? (
            <div className="admin-empty">No registrations yet for this event.</div>
          ) : (
            <div className="admin-list">
              {filteredRegistrations.map(r => (
                <article key={r.id}>
                  <div className="admin-list-head">
                    <div>
                      <span>{r.id}</span>
                      <h2>{r.eventName}</h2>
                      <p>{r.college}</p>
                    </div>
                    <button aria-label={`Delete ${r.id}`} onClick={() => remove(r.id)}><Trash2 /></button>
                  </div>
                  {r.participants.map((p, i) => (
                    <div className="admin-person" key={i}>
                      <b>{p.name}</b>
                      <span>{p.standard} · {p.mobile}</span>
                    </div>
                  ))}
                </article>
              ))}
            </div>
          )}
        </>
      )}
    </main>
  )
}
