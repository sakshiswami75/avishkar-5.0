'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Camera,
  Check,
  Clipboard,
  Gamepad2,
  Menu,
  Palette,
  Play,
  Sparkles,
  Trophy,
  Users,
  X,
  Zap,
} from 'lucide-react'

type Event = {
  id: string
  name: string
  group: string
  teamSize: number | { min: number; max: number }
  accent: string
  image: string
  description: string
  prize: string
  rules: string[]
  faculty: string[]
  icon: typeof Palette
}

type Participant = {
  name: string
  mobile: string
  standard: 'PUC I' | 'PUC II'
}

type Registration = {
  id: string
  eventId: string
  eventName: string
  college: string
  participants: Participant[]
  createdAt: string
}

const image = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=82`

const EVENTS: Event[] = [
  {
    id: 'drawing',
    name: 'Drawing',
    group: 'Creative',
    teamSize: 1,
    accent: 'pink',
    image: image('photo-1547891654-e66ed7ebb968'),
    description: 'Turn an empty canvas into a world of your own.',
    prize: 'Prize details to be announced',
    rules: [
      'One participant per entry.',
      'Bring your own materials.',
      'Theme will be shared at the venue.',
    ],
    faculty: ['Shruti Mam', 'Amruta Mam'],
    icon: Palette,
  },

  {
    id: 'rangoli',
    name: 'Rangoli',
    group: 'Creative',
    teamSize: 2,
    accent: 'orange',
    image: image('photo-1582562124811-c09040d0a901'),
    description: 'Create colour, symmetry and wonder on the floor.',
    prize: 'Prize details to be announced',
    rules: [
      'Teams of two participants.',
      'Materials and time limits will be shared soon.',
    ],
    faculty: ['Shruti Mam', 'Amruta Mam'],
    icon: Sparkles,
  },

  {
    id: 'mehandi',
    name: 'Mehandi',
    group: 'Creative',
    teamSize: 2,
    accent: 'pink',
    image: image('photo-1516979187457-637abb4f9353'),
    description: 'Precision, patterns and a signature touch.',
    prize: 'Prize details to be announced',
    rules: [
      'Teams of two participants.',
      'Bring your own cone and materials.',
    ],
    faculty: ['Shruti Mam', 'Amruta Mam'],
    icon: Sparkles,
  },

  {
    id: 'dance-solo',
    name: 'Dance — Solo',
    group: 'Cultural',
    teamSize: 1,
    accent: 'violet',
    image: image('photo-1508700115892-45ecd05ae2ad'),
    description: 'Own the stage. Make every beat yours.',
    prize: 'Prize details to be announced',
    rules: [
      'One participant per entry.',
      'Performance duration will be shared soon.',
    ],
    faculty: ['Shruti Mam', 'Amruta Mam'],
    icon: Play,
  },

  {
    id: 'group-dance',
    name: 'Group Dance',
    group: 'Cultural',
    teamSize: { min: 2, max: 12 },
    accent: 'violet',
    image: image('photo-1517457373958-b7bdd4587245'),
    description: 'Bring your crew and make the room move.',
    prize: 'Prize details to be announced',
    rules: [
      'Minimum 2 and maximum 12 participants.',
      'Music and time limits will be shared soon.',
    ],
    faculty: ['Shruti Mam', 'Amruta Mam'],
    icon: Users,
  },

  {
    id: 'singing',
    name: 'Group Singing',
    group: 'Cultural',
    teamSize: { min: 2, max: 6 },
    accent: 'blue',
    image: image('photo-1516280440614-37939bbacd81'),
    description: 'Bring your voices together and own the stage.',
    prize: 'Prize details to be announced',
    rules: [
      'Minimum 2 and maximum 6 participants.',
      'Bring backing track if required.',
      'Performance details will be shared soon.',
    ],
    faculty: ['Shruti Mam', 'Amruta Mam'],
    icon: Play,
  },

  {
    id: 'pubg-solo',
    name: 'PUBG Solo',
    group: 'Gaming',
    teamSize: 1,
    accent: 'blue',
    image:
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=900&q=82',
    description: 'Stay sharp. Survive longer. Take the win.',
    prize: 'Prize details to be announced',
    rules: [
      'One participant per entry.',
      'Match format will be shared soon.',
    ],
    faculty: ['Ujjwala Mam'],
    icon: Gamepad2,
  },

  {
    id: 'pubg-squad',
    name: 'PUBG Squad',
    group: 'Gaming',
    teamSize: 4,
    accent: 'blue',
    image:
      'https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=900&q=82',
    description: 'Four players. One strategy. No second chances.',
    prize: 'Prize details to be announced',
    rules: [
      'Exactly 4 participants.',
      'Match format will be shared soon.',
    ],
    faculty: ['Ujjwala Mam'],
    icon: Gamepad2,
  },

  {
    id: 'freefire-solo',
    name: 'Free Fire Solo',
    group: 'Gaming',
    teamSize: 1,
    accent: 'orange',
    image:
      'https://images.unsplash.com/photo-1560253023-3ec5d502959f?auto=format&fit=crop&w=900&q=82',
    description: 'Fast decisions for players who never back down.',
    prize: 'Prize details to be announced',
    rules: [
      'One participant per entry.',
      'Match format will be shared soon.',
    ],
    faculty: ['Ujjwala Mam'],
    icon: Gamepad2,
  },

  {
    id: 'freefire-squad',
    name: 'Free Fire Squad',
    group: 'Gaming',
    teamSize: 4,
    accent: 'orange',
    image:
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=900&q=82',
    description: 'Squad up and make your mark on the arena.',
    prize: 'Prize details to be announced',
    rules: [
      'Exactly 4 participants.',
      'Match format will be shared soon.',
    ],
    faculty: ['Ujjwala Mam'],
    icon: Gamepad2,
  },

  {
    id: 'quiz',
    name: 'Quiz',
    group: 'Challenge & Fun',
    teamSize: 2,
    accent: 'blue',
    image: image('photo-1523240795612-9a054b0db644'),
    description: 'Fast minds, bold answers and one winning pair.',
    prize: 'Prize details to be announced',
    rules: [
      'Teams of two participants.',
      'Quiz format will be shared soon.',
    ],
    faculty: ['Snehal Mam'],
    icon: Trophy,
  },

  {
    id: 'treasure-hunt',
    name: 'Treasure Hunt',
    group: 'Challenge & Fun',
    teamSize: 2,
    accent: 'orange',
    image: image('photo-1516979187457-637abb4f9353'),
    description: 'Decode clues. Chase the trail. Find the prize.',
    prize: 'Prize details to be announced',
    rules: [
      'Teams of two participants.',
      'Be ready to move around campus.',
    ],
    faculty: ['Pallavi Mam'],
    icon: ArrowDown,
  },

  {
    id: 'tug-of-war',
    name: 'Tug of War',
    group: 'Challenge & Fun',
    teamSize: 8,
    accent: 'pink',
    image: image('photo-1552674605-db6ffd4facb5'),
    description: 'Eight on a rope. One team left standing.',
    prize: 'Prize details to be announced',
    rules: [
      'Exactly 8 participants.',
      'Wear comfortable sportswear.',
    ],
    faculty: ['Ashwini Mam'],
    icon: Users,
  },

  {
    id: 'rodies',
    name: 'Rodies',
    group: 'Challenge & Fun',
    teamSize: 2,
    accent: 'pink',
    image: image('photo-1517245386807-bb43f82c33c4'),
    description: 'Courage, chaos and challenges that test everything.',
    prize: 'Prize details to be announced',
    rules: [
      '2 participants per group.',
      'Challenge format will be shared soon.',
    ],
    faculty: ['Namrata Mam', 'Varsha Mam', 'Najima Mam', 'Anusha Mam'],
    icon: Zap,
  },

  {
    id: 'photo-reels',
    name: 'Photo & Reels',
    group: 'Digital',
    teamSize: 2,
    accent: 'violet',
    image: image('photo-1516035069371-29a1b244cc32'),
    description: 'Capture the energy. Create the moment. Share the story.',
    prize: 'Prize details to be announced',
    rules: [
      'Teams of two participants.',
      'Submission details will be shared soon.',
    ],
    faculty: ['Kirti Mam'],
    icon: Camera,
  },
]

const groups = [
  'Creative',
  'Cultural',
  'Gaming',
  'Challenge & Fun',
  'Digital',
]

const teamLabel = (size: Event['teamSize']) =>
  typeof size === 'number'
    ? `${size} participant${size === 1 ? '' : 's'}`
    : `${size.min}–${size.max} participants`

const initialParticipants = (event: Event): Participant[] =>
  Array.from(
    {
      length:
        typeof event.teamSize === 'number'
          ? event.teamSize
          : event.teamSize.min,
    },
    () => ({
      name: '',
      mobile: '',
      standard: 'PUC I',
    }),
  )

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [selected, setSelected] = useState<Event | null>(null)
  const [screen, setScreen] = useState<'home' | 'register' | 'success'>(
    'home',
  )
  const [step, setStep] = useState(1)
  const [college, setCollege] = useState('')
  const [participants, setParticipants] = useState<Participant[]>([])
  const [registration, setRegistration] =
    useState<Registration | null>(null)
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [copied, setCopied] = useState(false)
  const [errors, setErrors] = useState<string[]>([])

  useEffect(() => {
    try {
      setRegistrations(
        JSON.parse(
          localStorage.getItem('avishkar-registrations') || '[]',
        ),
      )
    } catch {}
  }, [])

  const grouped = useMemo(
    () =>
      groups.map((group) => ({
        group,
        events: EVENTS.filter((event) => event.group === group),
      })),
    [],
  )

  const openRegister = (event: Event) => {
    setSelected(event)
    setParticipants(initialParticipants(event))
    setCollege('')
    setStep(1)
    setErrors([])
    setScreen('register')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const updateParticipant = (
    index: number,
    key: keyof Participant,
    value: string,
  ) => {
    setParticipants((prev) =>
      prev.map((p, i) =>
        i === index ? { ...p, [key]: value } : p,
      ),
    )
  }

  const validate = () => {
    const next: string[] = []

    if (!college.trim()) {
      next.push('Enter your college name.')
    }

    participants.forEach((p, i) => {
      if (!p.name.trim()) {
        next.push(`Enter participant ${i + 1}'s full name.`)
      }

      if (!/^\d{10}$/.test(p.mobile)) {
        next.push(
          `Participant ${i + 1}'s mobile number must be 10 digits.`,
        )
      }
    })

    setErrors(next)
    return !next.length
  }

  const submit = () => {
    if (!selected || !validate()) return

    const entry: Registration = {
      id: `AVK-${Date.now().toString().slice(-6)}`,
      eventId: selected.id,
      eventName: selected.name,
      college: college.trim(),
      participants,
      createdAt: new Date().toISOString(),
    }

    const next = [...registrations, entry]

    localStorage.setItem(
      'avishkar-registrations',
      JSON.stringify(next),
    )

    setRegistrations(next)
    setRegistration(entry)
    setScreen('success')

    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const copyId = async () => {
    if (!registration) return

    await navigator.clipboard?.writeText(registration.id)
    setCopied(true)

    setTimeout(() => setCopied(false), 1800)
  }

  return (
    <main className="site-shell">
      <header className="site-header">
        <a
          href="#home"
          className="wordmark"
          onClick={() => {
            setScreen('home')
            setMenuOpen(false)
          }}
        >
          <span>AVISHKAR</span>
          <b>5.0</b>
        </a>

        <button
          className="menu-button"
          aria-label="Open menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>

        {menuOpen && (
          <nav className="mobile-menu">
            <a
              href="#events"
              onClick={() => setMenuOpen(false)}
            >
              Events
            </a>

            <a
              href="#about"
              onClick={() => setMenuOpen(false)}
            >
              About
            </a>
          </nav>
        )}
      </header>

      {screen === 'home' && (
        <>
          <section className="hero" id="home">
            <div className="hero-copy">
              <p className="eyebrow host-eyebrow">
                KLE BCA COLLEGE, NIPANI
              </p>

              <div className="hero-mark">
                <span>AVISHKAR</span>
                <b>5.0</b>
              </div>

              <p className="hero-tagline">
                Where talent meets competition.
              </p>

              <p className="hero-description">
                An inter-college fest for PUC I &amp; PUC II students
                ready to show what they&apos;ve got.
              </p>

              <div className="hero-meta">
                <span>25 OCTOBER 2026</span>
                <span>KLE BCA COLLEGE, NIPANI</span>
              </div>

              <div className="hero-actions">
                <button
                  className="button button-primary"
                  onClick={() =>
                    document
                      .getElementById('events')
                      ?.scrollIntoView({ behavior: 'smooth' })
                  }
                >
                  Explore events
                  <ArrowRight />
                </button>

                <button
                  className="button button-secondary"
                  onClick={() => openRegister(EVENTS[0])}
                >
                  Register now
                </button>
              </div>
            </div>

            <div className="scroll-cue">
              <ArrowDown />
              Scroll to discover
            </div>
          </section>

          <section
            className="highlights"
            aria-label="Festival highlights"
          >
            <div className="highlight">
              <strong>FREE</strong>
              <span>REGISTRATION</span>
            </div>

            <div className="highlight">
              <strong>CASH</strong>
              <span>PRIZES</span>
            </div>

            <div className="highlight">
              <strong>16</strong>
              <span>EVENTS</span>
            </div>

            <div className="highlight">
              <strong>PUC I</strong>
              <span>&amp; PUC II</span>
            </div>
          </section>

          <section className="events-section" id="events">
            <div className="section-heading">
              <p className="eyebrow">THE LINEUP</p>

              <h2>
                Choose your <em>challenge.</em>
              </h2>

              <p>
                Tap an event to see details and register.
              </p>
            </div>

            {grouped.map(({ group, events }) => (
              <div className="event-group" key={group}>
                <div className="group-title">
                  <span>{group}</span>

                  <i>
                    {String(events.length).padStart(2, '0')} EVENTS
                  </i>
                </div>

                <div className="event-grid">
                  {events.map((event) => (
                    <EventCard
                      key={event.id}
                      event={event}
                      number={EVENTS.indexOf(event) + 1}
                      onClick={() => setSelected(event)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </section>

          <section className="about-section" id="about">
            <div>
              <p className="eyebrow">THE AVISHKAR SPIRIT</p>

              <h2>
                Bring your <em>boldest</em> self.
              </h2>
            </div>

            <p>
              One campus. Fifteen ways to stand out. AVISHKAR 5.0 is
              where ideas get loud, teams get competitive, and every
              participant gets their moment.
            </p>
          </section>

          <footer>
            <div className="wordmark">
              <span>AVISHKAR</span>
              <b>5.0</b>
            </div>

            <p>KLE BCA COLLEGE, NIPANI</p>

            <span>
              Registration information will be announced soon.
            </span>
          </footer>
        </>
      )}

      {screen === 'register' && selected && (
        <RegistrationFlow
          event={selected}
          step={step}
          setStep={setStep}
          college={college}
          setCollege={setCollege}
          participants={participants}
          setParticipants={setParticipants}
          updateParticipant={updateParticipant}
          errors={errors}
          setErrors={setErrors}
          submit={submit}
          back={() => setScreen('home')}
        />
      )}

      {screen === 'success' && registration && (
        <SuccessScreen
          registration={registration}
          copied={copied}
          copyId={copyId}
          again={() =>
            openRegister(
              EVENTS.find(
                (e) => e.id === registration.eventId,
              ) || EVENTS[0],
            )
          }
          back={() => setScreen('home')}
        />
      )}

      {selected && screen === 'home' && (
        <EventPreview
          event={selected}
          close={() => setSelected(null)}
          register={() => openRegister(selected)}
        />
      )}
    </main>
  )
}

function EventCard({
  event,
  number,
  onClick,
}: {
  event: Event
  number: number
  onClick: () => void
}) {
  const Icon = event.icon

  return (
    <button
      className={`event-card accent-${event.accent}`}
      onClick={onClick}
    >
      <div className="event-image">
        <img
          src={event.image}
          alt=""
          loading="lazy"
        />

        <div className="image-shade" />

        <Icon />

        <span className="card-number">
          {String(number).padStart(2, '0')}
        </span>
      </div>

      <div className="event-info">
        <span>{event.group}</span>

        <h3>{event.name}</h3>

        <small>
          <Users />
          {teamLabel(event.teamSize)}
        </small>
      </div>

      <ArrowRight className="card-arrow" />
    </button>
  )
}

function EventPreview({
  event,
  close,
  register,
}: {
  event: Event
  close: () => void
  register: () => void
}) {
  return (
    <div
      className="overlay"
      role="presentation"
      onClick={close}
    >
      <section
        className="sheet"
        role="dialog"
        aria-modal="true"
        aria-labelledby="preview-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="close-button"
          onClick={close}
          aria-label="Close"
        >
          <X />
        </button>

        <div className={`sheet-art accent-${event.accent}`}>
          <img src={event.image} alt="" />
          <div className="image-shade" />
          <span>{event.group}</span>
        </div>

        <div className="sheet-content">
          <p className="eyebrow">{event.group}</p>

          <h2 id="preview-title">{event.name}</h2>

          <div className="team-pill">
            <Users />
            {teamLabel(event.teamSize)}
          </div>

          <p className="preview-description">
            {event.description}
          </p>

          <div className="preview-detail">
            <h4>Faculty in-charge</h4>

            <p className="faculty-list">
              {event.faculty.map((faculty) => (
                <span key={faculty}>{faculty}</span>
              ))}
            </p>
          </div>

          <div className="preview-detail">
            <h4>Prize</h4>

            <p className="muted prize-value">
              {event.prize}
            </p>
          </div>

          <div className="preview-detail">
            <h4>Rules</h4>

            <ul className="rules-list">
              {event.rules.map((rule) => (
                <li key={rule}>{rule}</li>
              ))}
            </ul>
          </div>

          <button
            className="button button-primary wide preview-register"
            onClick={register}
          >
            Register now
            <ArrowRight />
          </button>
        </div>
      </section>
    </div>
  )
}

function Progress({ step }: { step: number }) {
  return (
    <div className="progress">
      {['College details', 'Participants', 'Review'].map(
        (label, i) => (
          <div
            className={step >= i + 1 ? 'active' : ''}
            key={label}
          >
            <span>{i + 1}</span>
            {label}
          </div>
        ),
      )}
    </div>
  )
}

function RegistrationFlow({
  event,
  step,
  setStep,
  college,
  setCollege,
  participants,
  setParticipants,
  updateParticipant,
  errors,
  setErrors,
  submit,
  back,
}: any) {
  const isTeam = typeof event.teamSize !== 'number'

  return (
    <section className="registration-page">
      <button className="back-link" onClick={back}>
        <ArrowLeft />
        Back to events
      </button>

      <div className="registration-heading">
        <p className="eyebrow">
          REGISTRATION / {event.group.toUpperCase()}
        </p>

        <h1>
          Join <em>{event.name}</em>
        </h1>

        <p>
          {teamLabel(event.teamSize)} · Registration is free.
        </p>
      </div>

      <Progress step={step} />

      {errors.length > 0 && (
        <div className="error-box">
          {errors.map((error: string) => (
            <span key={error}>{error}</span>
          ))}
        </div>
      )}

      {step === 1 && (
        <div className="form-card">
          <h2>College details</h2>

          <p>Tell us where your team is from.</p>

          <label>
            College name

            <input
              value={college}
              onChange={(e: any) => {
                setCollege(e.target.value)
                setErrors([])
              }}
              placeholder="Enter your college name"
            />
          </label>

          <button
            className="button button-primary wide"
            onClick={() =>
              college.trim()
                ? setStep(2)
                : setErrors(['Enter your college name.'])
            }
          >
            Continue
            <ArrowRight />
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="form-card">
          <div className="form-card-title">
            <div>
              <h2>Participants</h2>

              <p>
                Add everyone competing in this event.
              </p>
            </div>

            {isTeam && (
              <div className="stepper">
                <button
                  onClick={() =>
                    participants.length >
                      event.teamSize.min &&
                    setParticipants((p: Participant[]) =>
                      p.slice(0, -1),
                    )
                  }
                  disabled={
                    participants.length <=
                    event.teamSize.min
                  }
                >
                  −
                </button>

                <strong>{participants.length}</strong>

                <button
                  onClick={() =>
                    participants.length <
                      event.teamSize.max &&
                    setParticipants((p: Participant[]) => [
                      ...p,
                      {
                        name: '',
                        mobile: '',
                        standard: 'PUC I',
                      },
                    ])
                  }
                  disabled={
                    participants.length >=
                    event.teamSize.max
                  }
                >
                  +
                </button>
              </div>
            )}
          </div>

          {participants.map(
            (p: Participant, i: number) => (
              <div
                className="participant-block"
                key={i}
              >
                <h3>Participant {i + 1}</h3>

                <label>
                  Full name

                  <input
                    value={p.name}
                    onChange={(e: any) =>
                      updateParticipant(
                        i,
                        'name',
                        e.target.value,
                      )
                    }
                    placeholder="Enter full name"
                  />
                </label>

                <label>
                  Mobile number

                  <input
                    inputMode="numeric"
                    maxLength={10}
                    value={p.mobile}
                    onChange={(e: any) =>
                      updateParticipant(
                        i,
                        'mobile',
                        e.target.value.replace(/\D/g, ''),
                      )
                    }
                    placeholder="10-digit mobile number"
                  />
                </label>

                <label>
                  Standard

                  <select
                    value={p.standard}
                    onChange={(e: any) =>
                      updateParticipant(
                        i,
                        'standard',
                        e.target.value,
                      )
                    }
                  >
                    <option>PUC I</option>
                    <option>PUC II</option>
                  </select>
                </label>
              </div>
            ),
          )}

          <div className="form-actions">
            <button
              className="button button-secondary"
              onClick={() => setStep(1)}
            >
              Back
            </button>

            <button
              className="button button-primary"
              onClick={() => {
                setErrors([])
                setStep(3)
              }}
            >
              Review
              <ArrowRight />
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="form-card">
          <h2>Review your registration</h2>

          <div className="review-row">
            <span>Event</span>
            <strong>{event.name}</strong>
          </div>

          <div className="review-row">
            <span>College</span>
            <strong>{college}</strong>
          </div>

          <div className="review-participants">
            <span>Participants</span>

            {participants.map(
              (p: Participant, i: number) => (
                <div key={i}>
                  <strong>
                    {p.name ||
                      `Participant ${i + 1}`}
                  </strong>

                  <small>
                    {p.standard} ·{' '}
                    {p.mobile || 'Mobile pending'}
                  </small>
                </div>
              ),
            )}
          </div>

          <div className="form-actions">
            <button
              className="button button-secondary"
              onClick={() => setStep(2)}
            >
              Edit details
            </button>

            <button
              className="button button-primary"
              onClick={submit}
            >
              Submit registration
              <Check />
            </button>
          </div>
        </div>
      )}
    </section>
  )
}

function SuccessScreen({
  registration,
  copied,
  copyId,
  again,
  back,
}: any) {
  return (
    <section className="success-page">
      <div className="success-mark">
        <Check />
      </div>

      <p className="eyebrow">
        REGISTRATION CONFIRMED
      </p>

      <h1>
        You&apos;re <em>in.</em>
      </h1>

      <p className="success-lede">
        Bring your best. We&apos;ll see you at
        AVISHKAR 5.0.
      </p>

      <div className="ticket">
        <span>EVENT</span>

        <strong>{registration.eventName}</strong>

        <span>REGISTRATION ID</span>

        <b>{registration.id}</b>

        <button onClick={copyId}>
          {copied ? <Check /> : <Clipboard />}

          {copied
            ? 'Copied'
            : 'Save registration ID'}
        </button>
      </div>

      <div className="success-actions">
        <button
          className="button button-primary"
          onClick={again}
        >
          Register another event
          <ArrowRight />
        </button>

        <button
          className="button button-secondary"
          onClick={back}
        >
          Back to events
        </button>
      </div>
    </section>
  )
}