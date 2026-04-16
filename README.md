<div align="center">

# ✨ Aurora
### AI-Powered Event Planner & Party Planning Agent

**URL**: [Project Link](https://aurora-even-planner.lovable.app/)

[![Status](https://img.shields.io/badge/status-in_development-amber)](.)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen)](CONTRIBUTING.md)
[![Built with Claude](https://img.shields.io/badge/powered_by-Claude_AI-blueviolet)](https://anthropic.com)

**Aurora turns a 5-minute conversation into a fully planned, vendor-confirmed event.**  
From birthday parties to corporate offsites — no spreadsheets, no browser tabs, no chaos.

[Features](#features) · [How it works](#how-it-works) · [Tech stack](#tech-stack) · [Getting started](#getting-started) · [Roadmap](#roadmap)

</div>

---

## Project brief

Event planning is fragmented and manual. The average person spends 15–40 hours researching venues, caterers, decorators, and entertainers — juggling browser tabs, emails, and spreadsheets — before anything is confirmed.

Aurora is a vertical AI agent that automates the entire planning lifecycle. It starts with a conversational intake (no forms), performs automated vendor research, filters results by location, availability, budget, and service fit, and presents every planning category as an approvable card. Users approve or reject each recommendation. On rejection, Aurora re-searches and tries again — no restart required.

The result: a confirmed, ready-to-execute event plan in minutes.

---

## Features

- **Conversational intake** — guided Q&A collects event type, date, location, headcount, theme, budget, and food preferences
- **Automated vendor discovery** — searches and surfaces relevant vendors across all planning categories
- **Multi-factor filtering** — cross-filters by location radius, date availability, budget range, service match, and ratings simultaneously
- **Modular planning dashboard** — each category (venue, catering, decor, entertainment, photography, logistics) renders as an independent approvable card
- **Approve / reject loop** — users confirm or reject each recommendation; Aurora re-searches on rejection without restarting the flow
- **Consolidated event brief** — approved vendors, contact details, budget summary, and a planning checklist generated on completion
- **Category-agnostic** — adapts dynamically to birthdays, corporate events, hackathons, weddings, and community gatherings

---

## How it works

```
User opens Aurora
       │
       ▼
┌─────────────────────┐
│  Conversational     │  ← Collects: event type, date, location,
│  intake (Q&A)       │    headcount, theme, budget, food prefs
└────────┬────────────┘
         │
         ▼
┌─────────────────────┐
│  Vendor research    │  ← Automated web search across all
│  & discovery        │    planning categories
└────────┬────────────┘
         │
         ▼
┌─────────────────────┐
│  Multi-factor       │  ← Filters by: location, date availability,
│  filtering          │    budget, service match, ratings
└────────┬────────────┘
         │
         ▼
┌─────────────────────┐
│  Modular dashboard  │  ← Each module = one approvable card
│  (approve / reject) │    Rejected → agent re-searches
└────────┬────────────┘
         │
         ▼
┌─────────────────────┐
│  Event summary &    │  ← Confirmed vendors, checklist,
│  action plan        │    timeline, contact details
└─────────────────────┘
```

---

## Use cases

| Event type | Modules activated |
|---|---|
| Children's birthday party | Venue, catering, decor, entertainment, photography |
| Corporate offsite | Venue, catering, AV/tech, logistics, accommodation |
| Hackathon | Venue, catering, AV/tech, logistics |
| Wedding | Venue, catering, decor, entertainment, photography, logistics |
| Community event | Venue, catering, logistics, entertainment |

---

## Tech stack

### Frontend
| Layer | Technology |
|---|---|
| Framework | React 18 |
| Styling | Tailwind CSS |
| State management | Zustand |
| Component library | shadcn/ui |
| Routing | React Router v6 |

### Backend
| Layer | Technology |
|---|---|
| Runtime | Node.js 20 + Express |
| AI orchestration | Claude API (Anthropic) — `claude-sonnet-4-20250514` |
| Web search | Claude web search tool (built-in) |
| Auth | Clerk |
| Database | PostgreSQL via Prisma ORM |
| Caching | Redis |

### Infrastructure
| Layer | Technology |
|---|---|
| Hosting | Vercel (frontend) + Railway (backend) |
| Storage | AWS S3 (vendor assets, event briefs) |
| Email | Resend |
| Monitoring | Sentry |

---

## Getting started

### Prerequisites

- Node.js 20+
- PostgreSQL 15+
- Redis 7+
- An [Anthropic API key](https://console.anthropic.com)



The app will be available at `http://localhost:3000](https://aurora-even-planner.lovable.app/`.

---

## Project structure

```
aurora/
├── apps/
│   ├── web/                  # React frontend
│   │   ├── src/
│   │   │   ├── components/   # UI components (cards, dashboard, chat)
│   │   │   ├── pages/        # Route-level pages
│   │   │   ├── stores/       # Zustand state stores
│   │   │   └── lib/          # Utilities, API client
│   └── api/                  # Express backend
│       ├── src/
│       │   ├── agents/       # Aurora agent orchestration logic
│       │   ├── routes/       # API route handlers
│       │   ├── services/     # Vendor search, filtering, brief generation
│       │   └── db/           # Prisma schema & queries
├── packages/
│   ├── types/                # Shared TypeScript types
│   └── config/               # Shared ESLint, Tailwind config
├── prisma/
│   └── schema.prisma
└── README.md
```

---

## Agent architecture

Aurora uses a **modular agent loop** built on the Claude API. Each planning category is handled by an independent sub-agent that:

1. Receives the user's event profile as structured context
2. Executes a web search query optimised for that category
3. Filters and ranks results against the multi-factor criteria
4. Returns a ranked shortlist (3–5 options) to the dashboard
5. On rejection, adjusts the search criteria and repeats from step 2

The orchestrator agent coordinates sub-agents, tracks approval state, and generates the final event brief once all modules are confirmed.

```
Orchestrator agent
├── Venue sub-agent
├── Catering sub-agent
├── Decor sub-agent
├── Entertainment sub-agent
├── Photography / AV sub-agent
└── Logistics sub-agent
```

---

## Roadmap

- [x] Conversational intake flow
- [x] Event profile extraction
- [x] Modular dashboard UI (approve / reject cards)
- [ ] Live vendor search integration (Google Places API)
- [ ] Vendor availability calendar sync
- [ ] In-app vendor messaging
- [ ] PDF event brief export
- [ ] Multi-language support (NL, DE, FR)
- [ ] Vendor portal (self-listing & availability management)
- [ ] Mobile app (React Native)

---

## Contributing

Contributions are welcome. Please open an issue to discuss what you'd like to change before submitting a pull request.



---

<div align="center">
  <sub>Built with Claude by Anthropic · Designed for humans who have better things to do than plan events manually</sub>
</div>
