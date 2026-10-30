# AVISHKAR 5.0

AVISHKAR 5.0 is an inter-college fest registration website for PUC I and PUC II students, hosted by KLE BCA College, Nipani. It presents the fest programme, event-specific rules, faculty contacts, and a guided registration flow backed by a protected organizer dashboard.

The website is designed for a real event-registration workflow: students choose an event, submit college and participant details, receive a registration ID, and organizers manage the resulting registrations from a private admin area.

## Verified features

- Landing page for the fest scheduled for **25 October 2026** at KLE BCA College, Nipani.
- **16 events** grouped as Creative, Cultural, Gaming, Challenge & Fun, and Digital.
- Event cards with images, descriptions, participant/team limits, prize text, event rules, faculty contacts, and selected student-coordinator contacts.
- General rules plus the downloadable [`AVISHKAR-5.0-Rules.pdf`](public/AVISHKAR-5.0-Rules.pdf).
- Three-step registration flow:
  1. College details
  2. Participant names, mobile numbers, and PUC standard
  3. Review and submission
- Client-side validation for required fields and Indian 10-digit mobile numbers.
- Registration confirmation screen with a generated registration ID and copy-to-clipboard action.
- Organizer login at `/admin` using a JWT issued by the backend.
- Admin event summary, registration search, participant details, deletion, refresh, and per-event CSV export.
- Responsive layout with mobile navigation, responsive event grids, modal event previews, and mobile-friendly registration forms.
- Vercel Analytics in production builds.

## Technology stack

### Frontend

- Next.js `16.3.3` App Router
- React `19`
- TypeScript
- Tailwind CSS `4` with `@tailwindcss/postcss`
- Base UI and selected shadcn-style utilities
- `lucide-react` icons
- Vercel Analytics

### Backend and data

- Node.js with Express `5`
- TypeScript with `ts-node`
- PostgreSQL
- Prisma `5` ORM and generated Prisma Client
- JWT authentication with `jsonwebtoken`
- CORS and dotenv

The Prisma schema contains `Registration` and related `Participant` records. A registration stores its event, college, creation time, and participant rows; deleting a registration cascades to its participants.

## Architecture and workflow

```text
Next.js student site
        |
        | POST /api/events/:eventId/register
        v
Express API on Render
        |
        | Prisma Client
        v
PostgreSQL database

Organizer /admin
        |
        | POST /api/auth/admin/login
        | JWT-protected event-management requests
        v
Express API -> PostgreSQL
```

1. Event definitions are currently maintained in [`app/page.tsx`](app/page.tsx).
2. The student completes the client-side registration form.
3. The frontend creates an `AVK-######` registration ID and posts the registration to the backend.
4. The backend validates required data, avoids duplicating an existing registration ID, and creates the registration and participants through Prisma.
5. The admin logs in, stores the returned 24-hour JWT in `sessionStorage`, and uses it for protected requests.
6. The backend returns event summaries and registration data or generates a UTF-8 CSV download for the selected event.

## API surface

The frontend currently references this backend base URL:

```text
https://avishkar-5-0.onrender.com
```

Implemented routes:

| Method | Route | Access | Purpose |
|---|---|---|---|
| `POST` | `/api/auth/admin/login` | Public | Issue an admin JWT |
| `POST` | `/api/events/:eventId/register` | Public | Submit a registration |
| `GET` | `/api/events/all/summary` | Admin JWT | Return registration counts by event |
| `GET` | `/api/events/:eventId/registrations` | Admin JWT | List registrations for an event |
| `GET` | `/api/events/:eventId/registrations/export` | Admin JWT | Download event registrations as CSV |
| `DELETE` | `/api/events/registrations/:id` | Admin JWT | Delete a registration |

## Project structure

```text
.
├── app/
│   ├── page.tsx                 # Student site, event data, and registration flow
│   ├── admin/page.tsx           # Organizer login and registration desk
│   ├── layout.tsx               # Metadata and analytics
│   └── globals.css              # Site and responsive styles
├── api/index.ts                 # Serverless entry point exporting the Express app
├── backend/
│   ├── prisma/schema.prisma     # PostgreSQL data model
│   └── src/
│       ├── app.ts               # Express middleware and route mounting
│       ├── server.ts            # Local backend server
│       ├── controllers/         # Auth, registration, summary, deletion, and export logic
│       ├── middleware/auth.ts   # JWT verification
│       └── routes/              # Auth and event route definitions
├── public/                      # Event images, icons, and official rules PDF
├── components/                  # Shared UI components
├── lib/                         # Shared frontend utilities
├── next.config.mjs
└── vercel.json
```

## Local setup

### Prerequisites

- Node.js with npm
- A PostgreSQL database
- Environment variables configured for the backend

### Install dependencies

From the repository root:

```bash
npm install
```

Install and prepare the backend separately:

```bash
cd backend
npm install
npx prisma generate
```

Set the backend environment variables described below, then create/update the Prisma schema in the configured PostgreSQL database:

```bash
npm run db:push
```

### Run the application

Run the frontend from the repository root:

```bash
npm run dev
```

Run the backend in a second terminal:

```bash
cd backend
npm run dev
```

The frontend development server uses the standard Next.js local URL, `http://localhost:3000`. The backend defaults to port `5000`.

Available scripts verified in the manifests:

- Root: `npm run dev`, `npm run build`, `npm run start`
- Backend: `npm run dev`, `npm start`, `npm run db:push`

The root manifest does not define test or lint scripts.

## Environment variables

Create `backend/.env` using [`backend/.env.example`](backend/.env.example). Do not commit real credentials.

| Variable | Required purpose |
|---|---|
| `PORT` | Backend listening port; defaults to `5000` in the server code |
| `DATABASE_URL` | PostgreSQL connection string used by Prisma |
| `JWT_SECRET` | Secret used to sign and verify admin JWTs |
| `ADMIN_EMAIL` | Admin login email |
| `ADMIN_PASSWORD` | Admin login password |

The frontend currently uses the backend URL directly in its fetch calls rather than reading a frontend API URL environment variable. Update deployment configuration and the frontend references together if that URL changes.

## Deployment notes

- [`vercel.json`](vercel.json) defines a Vercel build command that installs the backend dependencies, generates Prisma Client, and then runs the root Next.js build.
- [`api/index.ts`](api/index.ts) exports the Express app as a serverless entry point.
- The frontend and admin pages currently call the Render backend URL shown above.
- The repository does not verify a public frontend deployment URL. **Manual information needed:** add the current student-site URL here when it is confirmed.

## Skills demonstrated

- Next.js App Router and client-side UI state management
- TypeScript data modelling and form validation
- Responsive, accessible event-focused UI design
- REST API design with Express
- Prisma relational data modelling
- JWT-based admin authentication and protected routes
- Registration lifecycle management and CSV generation
- Vercel/Render-oriented deployment configuration

## Author

**Repository owner:** [@sakshiswami75](https://github.com/sakshiswami75)

The repository does not include a verified author name, so the GitHub profile is used here. Add the preferred display name and the confirmed frontend live-demo URL manually.
