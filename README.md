# TRVL — Travel Planning That Gives Back Time

A collaborative travel planning app that consolidates flights, accommodations, budgets, food, and maps into one shareable itinerary.

## Stack

| Layer        | Tech                  | Why                                      |
| ------------ | --------------------- | ---------------------------------------- |
| Framework    | Next.js 14 (App Router) | Fullstack in one repo, file-based routing |
| Database     | Supabase (Postgres)   | Instant backend, auth, real-time sync    |
| Styling      | Tailwind CSS          | Fast, consistent, no CSS conflicts       |
| Maps         | Mapbox via react-map-gl | Strava-style route visualization        |
| Charts       | Recharts              | Budget tracking visualizations           |
| Calendar     | Custom + date-fns     | Lightweight calendar view                |
| Deployment   | Vercel                | One-click deploy, edge functions         |

## Quick Start

```bash
# 1. Clone & install
git clone <your-repo-url>
cd trvl-app
npm install

# 2. Set up Supabase
#    - Create a project at https://supabase.com
#    - Run the SQL in /supabase/schema.sql in the SQL editor
#    - Copy your keys into .env.local

# 3. Copy env template
cp .env.example .env.local
# Fill in your Supabase URL + anon key

# 4. Run dev server
npm run dev
```

## Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_MAPBOX_TOKEN=your-mapbox-token
OPENAI_API_KEY=your-openai-key
```

## AI Endpoints (Person 1)

### Smart Import — Email Parser

Route:

`POST /api/ai/import-email`

Example request:

```json
{
  "trip_id": "0c3f2d2c-8c4d-4c8f-9b5a-2b7cc7f1a9c1",
  "email_subject": "Your reservation is confirmed — Hotel Example",
  "email_body": "Thanks for booking! Check-in: Apr 12, 2026. Check-out: Apr 15, 2026. Hotel Example, Shibuya. Confirmation: ABC123.",
  "default_currency": "USD"
}
```

Example response:

```json
{
  "created": 1,
  "items": [
    {
      "id": "...",
      "day_id": "...",
      "trip_id": "0c3f2d2c-8c4d-4c8f-9b5a-2b7cc7f1a9c1",
      "type": "hotel",
      "status": "confirmed",
      "title": "Hotel Example",
      "detail": "Check-in Apr 12, 2026; check-out Apr 15, 2026",
      "time": null,
      "end_time": null,
      "location_name": "Shibuya",
      "latitude": null,
      "longitude": null,
      "booking_ref": "ABC123",
      "booking_url": null,
      "cost": 0,
      "currency": "USD",
      "notes": null,
      "added_by": "...",
      "sort_order": 0,
      "created_at": "...",
      "updated_at": "..."
    }
  ]
}
```

### Trip Builder — Generate Trip From Prompt

Route:

`POST /api/ai/trip-builder`

Example request:

```json
{
  "name": "Tokyo Spring Break",
  "destination": "Tokyo, Japan",
  "start_date": "2026-04-12",
  "end_date": "2026-04-16",
  "currency": "USD",
  "budget": 2500,
  "travelers": 2,
  "preferences": "Food-heavy, neighborhoods: Shibuya, Asakusa, Ginza; include 1 museum and 1 day trip. Avoid early mornings."
}
```

Example response (shape):

```json
{
  "trip": { "id": "...", "name": "Tokyo Spring Break", "destination": "Tokyo, Japan", "start_date": "2026-04-12", "end_date": "2026-04-16" },
  "days": [ { "id": "...", "trip_id": "...", "date": "2026-04-12", "label": "Arrival + Shibuya" } ],
  "items": [ { "id": "...", "day_id": "...", "type": "activity", "status": "suggestion", "title": "Shibuya Crossing + Hachiko" } ]
}
```

## Team Work Split (3-hour sprint)

### Person 1 — Core & Itinerary
- `app/(auth)/*` — Login/signup pages
- `app/trips/*` — Trip CRUD, itinerary day/item management
- `lib/supabase.ts` — Client setup
- `lib/types.ts` — Shared TypeScript types
- Branch: `feat/core-itinerary`

### Person 2 — Visuals & Budget
- `app/trips/[id]/map/*` — Mapbox route visualization
- `app/trips/[id]/calendar/*` — Calendar view
- `app/trips/[id]/budget/*` — Budget tracker + charts
- `components/ui/*` — Shared UI components
- Branch: `feat/visuals-budget`

### Person 3 — Social & Search
- `app/trips/[id]/share/*` — Sharing, invites, real-time collab
- `app/trips/[id]/food/*` — Restaurant discovery
- `app/api/flights/*` — Flight comparison API routes
- `app/api/places/*` — Place search API routes
- Branch: `feat/social-search`

## Project Structure

```
trvl-app/
├── app/
│   ├── layout.tsx              # Root layout + fonts + providers
│   ├── page.tsx                # Landing / redirect to dashboard
│   ├── globals.css             # Tailwind + custom styles
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── signup/page.tsx
│   ├── dashboard/
│   │   └── page.tsx            # All trips overview
│   ├── trips/
│   │   └── [id]/
│   │       ├── page.tsx        # Itinerary view (default)
│   │       ├── map/page.tsx    # Map visualization
│   │       ├── calendar/page.tsx
│   │       ├── budget/page.tsx
│   │       ├── food/page.tsx
│   │       └── share/page.tsx
│   └── api/
│       ├── flights/route.ts    # Flight comparison endpoint
│       └── places/route.ts     # Restaurant/place search
├── components/
│   ├── ui/                     # Shared primitives (Button, Card, Modal, etc.)
│   ├── trip/                   # Trip-specific components
│   │   ├── TripCard.tsx
│   │   ├── ItineraryItem.tsx
│   │   ├── DayTabs.tsx
│   │   └── AddItemForm.tsx
│   ├── map/
│   │   └── TripMap.tsx
│   ├── budget/
│   │   ├── BudgetChart.tsx
│   │   └── ExpenseRow.tsx
│   ├── food/
│   │   └── RestaurantCard.tsx
│   ├── share/
│   │   ├── ShareModal.tsx
│   │   └── CollaboratorBadge.tsx
│   └── layout/
│       ├── Navbar.tsx
│       ├── TripSidebar.tsx
│       └── MobileNav.tsx
├── lib/
│   ├── supabase.ts             # Supabase client (browser)
│   ├── supabase-server.ts      # Supabase client (server components)
│   ├── types.ts                # Shared TypeScript types
│   └── utils.ts                # Helpers (date formatting, currency, etc.)
├── supabase/
│   └── schema.sql              # Full database schema
├── public/
│   └── ...
├── .env.example
├── .gitignore
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## Database Schema

See `supabase/schema.sql` for the full schema. Key tables:
- `profiles` — User profiles (extends Supabase auth)
- `trips` — Core trip info (destination, dates, budget)
- `trip_members` — Who's on each trip (owner, editor, viewer)
- `days` — Each day of a trip
- `itinerary_items` — Flights, hotels, activities, restaurants
- `expenses` — Budget tracking per item
- `shared_links` — Public share links

## Git Workflow

```bash
# Create your feature branch
git checkout -b feat/your-feature

# Work on your stuff...
git add .
git commit -m "feat: add itinerary CRUD"

# Push and PR
git push origin feat/your-feature
# Open PR → merge to main
```
