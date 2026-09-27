'use client'
import { Phone } from 'lucide-react'
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
  faculty: {
  name: string
  phone: string
}
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

const EVENTS: Event[] = [
  {
    id: 'drawing',
    name: 'Drawing',
    group: 'Creative',
    teamSize: 1,
    accent: 'pink',
    image: '/events/drawing.jpg',
    description: 'Turn an empty canvas into a world of your own.',
    prize: 'Exciting Cash Prizes',
    rules: [
  'Individual participation.',
  'Theme: Village Life.',
  'Time limit: 2 hours.',
  'A4 sheet or card sheet will be provided.',
  'Participants must bring their own drawing materials.',
  'Digital drawing is not allowed.',
  'Mobile phones are prohibited during the event.',
],
    faculty: {
  name: 'Prof. Shruti Patil',
  phone: '8123025476',
}
,
    icon: Palette,
  },

  {
  id: 'rangoli',
  name: 'Rangoli',
  group: 'Creative',
  teamSize: 2,
  accent: 'orange',
  image: '/events/Rangoli.webp',
  description: 'Create colour, symmetry and wonder on the floor.',
  prize: 'Exciting Cash Prizes',
  rules: [
    '1–2 participants per team.',
    'Theme: Festival and Nature.',
    'Rangoli must strictly follow the given theme.',
    'Time limit: 2 hours.',
    'Bring your own Rangoli materials, such as coloured Rangoli powder.',
    'Rangoli moulds/stencils are not allowed.',
    'Mobile phones are strictly prohibited during the competition.',
    'Judges’ decision will be final and binding.',
  ],
  faculty: {
    name: 'Prof. Shruti Patil',
    phone: '8123025476',
  },
  icon: Sparkles,
},

  {
  id: 'mehandi',
  name: 'Mehandi',
  group: 'Creative',
  teamSize: 2,
  accent: 'pink',
  image: '/events/mehndi.jpeg',
  description: 'Precision, patterns and a signature touch.',
  prize: 'Exciting Cash Prizes',
  rules: [
    'Two participants per team.',
    'Each participant must bring their own partner for applying Mehendi.',
    'Any type of Mehendi design is allowed.',
    'Time limit: 2 hours.',
    'Participants must bring their own Mehendi.',
    'Design area: One full hand.',
    'Mobile phones are strictly prohibited during the competition.',
    'Judges’ decision will be final and binding.',
  ],
  faculty: {
    name: 'Prof. Shruti Patil',
    phone: '8123025476',
  },
  icon: Sparkles,
},

  {
  id: 'dance-solo',
  name: 'Dance — Solo',
  group: 'Cultural',
  teamSize: 1,
  accent: 'violet',
  image: '/events/solo-dance.jpg',
  description: 'Own the stage. Make every beat yours.',
  prize: 'Exciting Cash Prizes',
  rules: [
    'Individual participation.',
    'Theme: Open Choice.',
    'Performance duration: 3–5 minutes.',
    'Participants are free to choose their song/music.',
    'Submit the song in .mp3 format to the co-coordinator before the competition.',
    'Participants must bring their own props, if required.',
    'Lighting matchsticks, candles, cigarettes, or performing unsafe acts on stage is strictly prohibited.',
    'Judging will be based on rhythm, formation, expression, costumes, and makeup.',
    'Judges’ decision will be final and binding.',
  ],
  faculty: {
    name: 'Prof. Amruta Patil',
    phone: '9945053740',
  },
  icon: Play,
},

  {
  id: 'group-dance',
  name: 'Group Dance',
  group: 'Cultural',
  teamSize: { min: 2, max: 12 },
  accent: 'violet',
  image: '/events/group-dance.webp',
  description: 'Bring your crew and make the room move.',
  prize: 'Exciting Cash Prizes',
  rules: [
    'Minimum 2 and maximum 12 participants.',
    'Theme: Open Choice.',
    'Performance duration: 5–8 minutes.',
    'Participants are free to choose their song/music.',
    'Submit the song in .mp3 format to the co-coordinator before the competition.',
    'Participants must bring their own props, if required.',
    'Lighting matchsticks, candles, cigarettes, or performing unsafe acts on stage is strictly prohibited.',
    'Judging will be based on rhythm, formation, expression, costumes, and makeup.',
    'Judges’ decision will be final and binding.',
  ],
  faculty: {
    name: 'Prof. Amruta Patil',
    phone: '9945053740',
  },
  icon: Users,
},

  {
  id: 'solo-singing',
  name: 'Solo Singing',
  group: 'Cultural',
  teamSize: 1,
  accent: 'pink',
  image: '/events/solo-singing.jpg',
  description:
    'Step onto the stage, own the spotlight, and let your voice shine.',
  prize: 'Exciting Cash Prizes',
  rules: [
    'Only 1 participant allowed.',
    'Participants are free to choose their song/music.',
    'Submit the song in .mp3 format to the co-coordinator before the competition.',
    'Performance duration: 3–5 minutes.',
    'Participants must bring their own props, if required.',
    'Lighting matchsticks, candles, cigarettes, or performing unsafe acts on stage is strictly prohibited.',
    'Judging will be based on voice quality, rhythm, expression, clarity, and overall performance.',
    'Judges’ decision will be final and binding.',
  ],
  faculty: {
    name: 'Prof. Amruta Patil',
    phone: '9945053740',
  },
  icon: Play,
},

{
  id: 'singing',
  name: 'Group Singing',
  group: 'Cultural',
  teamSize: { min: 2, max: 6 },
  accent: 'blue',
  image: '/events/group-singing.jpg',
  description: 'Bring your voices together and own the stage.',
  prize: 'Exciting Cash Prizes',
  rules: [
    'Minimum 2 and maximum 6 participants.',
    'Participants are free to choose their song/music.',
    'Submit the song in .mp3 format to the co-coordinator before the competition.',
    'Performance duration: 5–8 minutes.',
    'Participants must bring their own props, if required.',
    'Lighting matchsticks, candles, cigarettes, or performing unsafe acts on stage is strictly prohibited.',
    'Judging will be based on voice quality, rhythm, expression, clarity, and overall performance.',
    'Judges’ decision will be final and binding.',
  ],
  faculty: {
    name: 'Prof. Amruta Patil',
    phone: '9945053740',
  },
  icon: Play,
},

  {
  id: 'bgmi-solo',
  name: 'BGMI Solo',
  group: 'Gaming',
  teamSize: 1,
  accent: 'blue',
  image: '/events/PUBG-solo.jpg',
  description: 'Stay sharp. Survive longer. Take the win.',
  prize: 'Exciting Cash Prizes',
  rules: [
    'Participants can register individually (Solo).',
    'The competition will consist of 2 rounds of BGMI.',
    'Participants must have their own internet connection.',
    'Participants are advised to use a reliable internet connection.',
    'BGMI must be installed and updated on the mobile phone before the competition.',
    'The competition may be played on Erangel, Miramar, and Rondo maps, as decided by the organizers.',
    'Hacks, cheats, or unauthorized third-party software are strictly prohibited.',
    'Exploiting bugs, glitches, or game errors is strictly prohibited.',
    'If a player disconnects after the match starts, the match will continue and no rematch will be provided.',
    'GFX Tools or unauthorized game-enhancement tools are strictly prohibited.',
    'Organizers’ decision will be final and binding.',
  ],
  faculty: {
    name: 'Mrs. Ujwala Bhosale',
    phone: '9860082930',
  },
  icon: Gamepad2,
},

  {
  id: 'bgmi-squad',
  name: 'BGMI Squad',
  group: 'Gaming',
  teamSize: 4,
  accent: 'blue',
  image: '/events/PUBG-Squad.jpg',
  description: 'Four players. One strategy. No second chances.',
  prize: 'Exciting Cash Prizes',
  rules: [
    'Exactly 4 participants.',
    'The competition will consist of 2 rounds of BGMI.',
    'Participants must have their own internet connection.',
    'Participants are advised to use a reliable internet connection.',
    'BGMI must be installed and updated on the mobile phone before the competition.',
    'The competition may be played on Erangel, Miramar, and Rondo maps, as decided by the organizers.',
    'Hacks, cheats, or unauthorized third-party software are strictly prohibited.',
    'Exploiting bugs, glitches, or game errors is strictly prohibited.',
    'If a player disconnects after the match starts, the match will continue and no rematch will be provided.',
    'GFX Tools or unauthorized game-enhancement tools are strictly prohibited.',
    'Organizers’ decision will be final and binding.',
  ],
  faculty: {
    name: 'Mrs. Ujwala Bhosale',
    phone: '9860082930',
  },
  icon: Gamepad2,
},

  {
  id: 'freefire-max-solo',
  name: 'FREE FIRE MAX Solo',
  group: 'Gaming',
  teamSize: 1,
  accent: 'orange',
  image: '/events/free-fire.jpg',
  description: 'Fast decisions for players who never back down.',
  prize: 'Exciting Cash Prizes',
  rules: [
    'Participants can register individually (Solo).',
    'The competition will consist of 2 rounds of Free Fire MAX.',
    'Participants must have their own internet connection. If any network issue occurs after the game has started, the college/organizers will not be responsible.',
    'Participants are advised to use a reliable internet connection. Airtel SIM users are recommended for better connectivity.',
    'Free Fire MAX must be installed and updated on the Android mobile phone before the competition.',
    'Only Android phones are allowed. iPhones are not permitted.',
    'If a player gets disconnected after the match has started, the match will continue, and no rematch will be provided.',
    'Download all maps on your phone.',
    'No character skills.',
    'No gun skins.',
    'DPI and Pointer must be set to default.',
  ],
  faculty: {
    name: 'Mrs. Ujwala Bhosale',
    phone: '9860082930',
  },
  icon: Gamepad2,
},

  {
  id: 'freefire-max-team',
  name: 'FREE FIRE MAX Team',
  group: 'Gaming',
  teamSize: 4,
  accent: 'orange',
  image: '/events/freefire-squad.jpg',
  description: 'Squad up and make your mark on the arena.',
  prize: 'Exciting Cash Prizes',
  rules: [
    'Participants can register as a group of 4 players.',
    'The competition will consist of 2 rounds of Free Fire MAX.',
    'Participants must have their own internet connection. If any network issue occurs after the game has started, the college/organizers will not be responsible.',
    'Participants are advised to use a reliable internet connection. Airtel SIM users are recommended for better connectivity.',
    'Free Fire MAX must be installed and updated on their Android mobile phone before the competition.',
    'Only Android phones are allowed. iPhones are not permitted.',
    'If a player gets disconnected after the match has started, the match will continue, and no rematch will be provided.',
    'Download all maps on your phone.',
    'No character skills.',
    'No gun skins.',
    'DPI and Pointer must be default.',
  ],
  faculty: {
    name: 'Mrs. Ujwala Bhosale',
    phone: '9860082930',
  },
  icon: Gamepad2,
},

  {
  id: 'quiz',
  name: 'Quiz',
  group: 'Challenge & Fun',
  teamSize: 2,
  accent: 'blue',
  image: '/events/Quiz.jpg',
  description: 'Fast minds, bold answers and one winning pair.',
  prize: 'Exciting Cash Prizes',
    rules: [
    'Maximum 2 participants per team.',
    'Quiz topics: General Knowledge, Reasoning, and Current Affairs.',
    'The competition will consist of 3 rounds.',
    'Questions may include Multiple Choice, True/False, Specific-Answer, Rapid Fire, and other formats decided by the organizers.',
    'Mobile phones are strictly prohibited.',
    'Smart watches, Bluetooth devices, and other electronic devices are not allowed.',
    'Judges’ decision will be final and binding.',
  ],
  faculty: {
    name: 'Prof. Snehal Gidd',
    phone: '9008484862',
  },
  icon: Trophy,
},

{
  id: 'treasure-hunt',
  name: 'Treasure Hunt',
  group: 'Challenge & Fun',
  teamSize: 2,
  accent: 'orange',
  image: '/events/treasure-hunt.jpeg',
  description: 'Decode clues. Chase the trail. Find the prize.',
  prize: 'Exciting Cash Prizes',
  rules: [
    'Exactly 2 participants per team.',
    'The competition will consist of a series of clues, challenges, and tasks leading to the final treasure.',
    'Participants must report at the designated starting point before the scheduled time.',
    'Mobile phones may be used only if permitted by the organizers.',
    'Participants must follow all safety instructions given by the organizers.',
    'Judges’ / Organizing Committee’s decision will be final and binding.',
  ],
  faculty: {
    name: 'Prof. Pallavi Mane',
    phone: '+91 8762790801',
  },
  icon: ArrowDown,
},

  {
  id: 'tug-of-war',
  name: 'Tug of War',
  group: 'Challenge & Fun',
  teamSize: 8,
  accent: 'pink',
  image: '/events/Tug-of-war.jpg',
  description: 'Eight on a rope. One team left standing.',
  prize: 'Exciting Cash Prizes',
  rules: [
    'Each team must have exactly 8 members.',
    'Both teams must have an equal number of players.',
    'Participants must wear comfortable and suitable sportswear.',
    'Participants should wear comfortable sports shoes for safety.',
    'Participants must follow the instructions given by the organizers.',
    'No pushing, kicking, tripping, or any unfair practice is allowed.',
    'Judges’ / referees’ decision will be final and binding.',
  ],
  faculty: {
    name: 'Prof. Ashwini Hirekudi',
    phone: '9535001767',
  },
  icon: Users,
},

  {
  id: 'roadies',
  name: 'ROADIES GAME',
  group: 'Challenge & Fun',
  teamSize: 2,
  accent: 'pink',
  image: '/events/roadies.jpg',
  description: 'Courage, chaos and challenges that test everything.',
  prize: 'Exciting Cash Prizes',
  rules: [
    'Each team must consist of exactly 2 participants.',
    'The Roadies Game will consist of multiple rounds and challenges.',
    'All participants must strictly follow the instructions given by the organizers throughout the competition.',
    'Each round will have its own specific rules and time limit, which must be followed by all participants.',
    'Participants should wear comfortable and suitable clothing for the challenges.',
    'The decision of the judges regarding scores, penalties, and elimination will be final and binding.',
  ],
  faculty: {
    name: 'Varsha Khot',
    phone: '+91 8792211479',
  },
  icon: Zap,
},

  {
  id: 'photography-and-videography',
  name: 'PHOTOGRAPHY AND VIDEOGRAPHY',
  group: 'Digital',
  teamSize: 2,
  accent: 'violet',
  image: '/events/photo-reels.jpeg',
  description:
    'Capture the energy. Create the moment. Share the story.',
  prize: 'Exciting Cash Prizes',
  rules: [
    'Theme: “On the Spot”.',
    'Each team must have 2 participants.',
    'The competition will have 2 rounds: Round 1 – Photography and Round 2 – Reel Making.',
    'Participants must bring their own mobile phones (Android or iPhone).',
    'Professional cameras/DSLR cameras are not allowed.',
    'Photographs must be captured on the spot during the competition.',
    'Reels must be created using content captured during the competition.',
    'Previously captured photographs, videos, or downloaded content must not be used.',
    'The decision of the judges will be final and binding.',
  ],
  faculty: {
    name: 'Prof. Keerti Devakatte',
    phone: '9740892360',
  },
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
  const [isSubmitting, setIsSubmitting] = useState(false)

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

  const submit = async () => {
  if (isSubmitting) return
  if (!selected || !validate()) return

  setIsSubmitting(true)

    const entry: Registration = {
      id: `AVK-${Date.now().toString().slice(-6)}`,
      eventId: selected.id,
      eventName: selected.name,
      college: college.trim(),
      participants,
      createdAt: new Date().toISOString(),
    }

    try {
const res = await fetch(`https://avishkar-5-0.onrender.com/api/events/${selected.id}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entry),
      })
      if (!res.ok) throw new Error('Registration failed')
   } catch (e) {
  setErrors(['Failed to register. Please try again.'])
  setIsSubmitting(false)
  return
}
    setIsSubmitting(false)
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
  onClick={() =>
    document
      .getElementById('rules')
      ?.scrollIntoView({ behavior: 'smooth' })
  }
>
  View Rules & Guidelines
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
          <section className="rules-section" id="rules">
  <div className="rules-intro">
    <p className="eyebrow">BEFORE YOU PARTICIPATE</p>

    <h2>
      General <em>Rules & Guidelines.</em>
    </h2>

    <p>
      A few important things to know before registering.
    </p>

    
  </div>

  <div className="rules-list">
    <div className="rule-item">
      <span>01</span>
      <p>Avishkar 5.0 is open to PU/HSC students (11th & 12th).</p>
    </div>

    <div className="rule-item">
      <span>02</span>
      <p>Participants must carry their valid college ID card.</p>
    </div>

    <div className="rule-item">
      <span>03</span>
      <p>
        Participants should register at the Registration Committee
        on the day of the fest.
      </p>
    </div>

    <div className="rule-item">
      <span>04</span>
      <p>
        Participants must follow the rules and guidelines of their
        respective events.
      </p>
    </div>

    <div className="rule-item">
      <span>05</span>
      <p>
        Judges&apos; / Organizing Committee&apos;s decisions are final
        and binding.
      </p>
    </div>

    <div className="rule-item">
      <span>06</span>
      <p>
        Refer to the detailed official rules document for complete
        event-wise guidelines.
      </p>
    </div>
  </div>

  <a
      href="/AVISHKAR-5.0-Rules.pdf"
      target="_blank"
      rel="noopener noreferrer"
      className="button button-secondary"
    >
      View Detailed Rules & Guidelines
    </a>

</section>

          <section className="about-section" id="about">
            <div>
              <p className="eyebrow">THE AVISHKAR SPIRIT</p>

              <h2>
                Bring your <em>boldest</em> self.
              </h2>
            </div>

            <p>
              One campus. Sixteen ways to stand out. AVISHKAR 5.0 is
              where ideas get loud, teams get competitive, and every
              participant gets their moment.
            </p>
          </section>

          <footer>
  <div className="footer-brand">
    <div className="hero-mark">
      <span>AVISHKAR</span>
      <b>5.0</b>
    </div>

    <p>KLE BCA COLLEGE, NIPANI</p>
  </div>

  <div className="developer-credit">
    <span>Developed by </span>
    <strong>Sakshi Swami &amp; Aniket Fagare</strong>
  </div>
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
          isSubmitting={isSubmitting}
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

  <div className="faculty-contact">
    <span className="faculty-name">
      {event.faculty.name}
    </span>

    <a
      href={`tel:${event.faculty.phone}`}
      className="faculty-phone"
    >
      <Phone size={15} />
      {event.faculty.phone}
    </a>
  </div>
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
              <a
                href="/AVISHKAR-5.0-Rules.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="button button-secondary wide"
              >
                View Guidelines & Rules
              </a>

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
  isSubmitting,
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
            setCollege(e.target.value);
            setErrors([]);
          }}
          placeholder="Enter your college name"
        />
      </label>

      <button
        className="button button-primary wide"
        onClick={() => {
          if (!college.trim()) {
            setErrors(['Enter your college name.']);
            return;
          }

          setErrors([]);
          setStep(2);
        }}
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
                onChange={(e: any) => {
                  updateParticipant(
                    i,
                    'name',
                    e.target.value,
                  );
                  setErrors([]);
                }}
                placeholder="Enter full name"
              />
            </label>

            <label>
              Mobile number

              <input
                type="tel"
                inputMode="numeric"
                maxLength={10}
                value={p.mobile}
                onChange={(e: any) => {
                  updateParticipant(
                    i,
                    'mobile',
                    e.target.value.replace(/\D/g, ''),
                  );
                  setErrors([]);
                }}
                placeholder="10-digit mobile number"
              />
            </label>

            <label>
              Standard

              <select
                value={p.standard}
                onChange={(e: any) => {
                  updateParticipant(
                    i,
                    'standard',
                    e.target.value,
                  );
                  setErrors([]);
                }}
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
          onClick={() => {
            setErrors([]);
            setStep(1);
          }}
        >
          Back
        </button>

        <button
          className="button button-primary"
          onClick={() => {
            const validationErrors: string[] = [];

            // Validate every participant before going to review
            participants.forEach(
              (p: Participant, i: number) => {
                const participantNumber = i + 1;

                if (!p.name.trim()) {
                  validationErrors.push(
                    `Enter the full name for Participant ${participantNumber}.`,
                  );
                }

                if (!p.mobile.trim()) {
                  validationErrors.push(
                    `Enter the mobile number for Participant ${participantNumber}.`,
                  );
                } else if (!/^[6-9]\d{9}$/.test(p.mobile)) {
                  validationErrors.push(
                    `Enter a valid 10-digit mobile number for Participant ${participantNumber}.`,
                  );
                }

                if (!p.standard) {
                  validationErrors.push(
                    `Select the standard for Participant ${participantNumber}.`,
                  );
                }
              },
            );

            if (validationErrors.length > 0) {
              setErrors(validationErrors);
              return;
            }

            setErrors([]);
            setStep(3);
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
          onClick={() => {
            setErrors([]);
            setStep(2);
          }}
        >
          Edit details
        </button>

        <button
  className="button button-primary"
  onClick={submit}
  disabled={isSubmitting}
>
  {isSubmitting ? 'Submitting...' : 'Submit registration'}
  {!isSubmitting && <Check />}
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