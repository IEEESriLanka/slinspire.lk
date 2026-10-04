# IEEE Sri Lanka Inspire - Career Guidance Platform

Official web platform for **IEEE Sri Lanka Inspire**, a national project by **IEEE Young Professionals Sri Lanka** dedicated to empowering Sri Lankan school students with guidance, tools, and resources for educational, vocational, and career pathways.

- **Live Website**: [https://slinspire.lk](https://slinspire.lk)
- **Alternative Mirror**: [https://slinspire.ieeeyp.lk](https://slinspire.ieeeyp.lk)
- **Hosting**: GitHub Pages with custom domain and single-page application routing

---

## Tech Stack

- **Framework & Runtime**: [React 18](https://react.dev/) + [Vite 6](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict mode)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + PostCSS + Autoprefixer
- **UI & Animation**: [Framer Motion](https://www.framer.com/motion/), [Lucide React](https://lucide.dev/), [Radix UI](https://www.radix-ui.com/), [Material UI](https://mui.com/)
- **Routing**: [React Router DOM v6](https://reactrouter.com/) (`HashRouter` for GitHub Pages compatibility)
- **Search & Filtering**: [Fuse.js](https://www.fusejs.io/) fuzzy search, live Google Sheets TSV pipeline

---

## Project Structure & Architecture

The codebase follows a **Feature-First (Domain-Driven Modular) Architecture**, separating reusable design-system primitives from business domain features:

```
src/
├── app/                              # Core application setup
│   ├── App.tsx                       # Main application shell & router
│   └── routes.tsx                    # Centralized route definitions
├── components/                       # Shared, domain-agnostic components
│   ├── common/                       # Cross-cutting application utilities
│   │   ├── ErrorBoundary.tsx         # Global error boundary fallback
│   │   └── Modal.tsx                 # Reusable dialog modal wrapper
│   ├── layout/                       # Layout components & wrappers
│   │   ├── PageLayout.tsx            # Unified page container (Header + Main + Footer)
│   │   ├── Header.tsx                # Main navigation header
│   │   ├── Footer.tsx                # Global footer with social & legal links
│   │   └── ScrollTop.tsx             # Automatic scroll-to-top on route change
│   └── ui/                           # Pure UI primitives (design system)
│       ├── badge.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── dialog.tsx
│       ├── navigation-menu.tsx
│       ├── pagination.tsx
│       └── separator.tsx
├── config/                           # Application configuration & constants
│   ├── constants.ts                  # External endpoints (Google Script, Sheets TSV, Socials)
│   └── routes.ts                     # Type-safe route paths
├── data/                             # Static datasets
│   ├── about.ts                      # About us goals and statements
│   ├── careerData.json               # Career paths and jobs database
│   ├── partners.ts                   # Partner organizations & university branches
│   ├── sessions.ts                   # Career Compass session archive
│   ├── team.ts                       # Organizing committee directory (strongly typed)
│   ├── videoCategories.ts            # Video playlist categories
│   └── videos.ts                     # Video catalog
├── features/                         # Encapsulated domain feature modules
│   ├── about/
│   │   ├── components/               # AboutUsSection
│   │   └── types.ts                  # Goal, AboutData types
│   ├── career-explorer/
│   │   ├── components/               # CareerFinder, MajorSelector, SubFieldSelector, JobList, JobSearch
│   │   ├── hooks/                    # useCareerData.ts
│   │   └── types.ts                  # CareerData
│   ├── degree-compass/
│   │   ├── components/               # DegreeCardGrid, DegreeCard, DegreePopup, DegreeTableFilters
│   │   ├── services/                 # degreeService.ts (TSV fetcher, parser, cache)
│   │   └── types.ts                  # DegreeRecord, FilterOptions, StreamType
│   ├── events/
│   │   ├── step-up/
│   │   │   ├── components/           # StepUpPopup, InfoRow
│   │   │   ├── hooks/                # useRegistrationCount.ts
│   │   │   └── types.ts              # StepUpStats, RegistrationForm
│   │   └── web-launch/
│   │       └── components/           # LaunchCeremony
│   ├── gallery/
│   │   ├── components/               # GallerySection
│   │   └── types.ts                  # GalleryItem
│   ├── landing/
│   │   └── components/               # HeroSection, ServicesSection
│   ├── partners/
│   │   ├── components/               # PartnersSection, VolunteeringInterest
│   │   └── types.ts                  # Partner, UniversityPartner
│   ├── sessions/
│   │   ├── components/               # MonthlySeminarsSection, SeminarPagination
│   │   └── types.ts                  # SeminarSession, ProvinceType
│   ├── team/
│   │   ├── components/               # TeamDetailsSection, TeamMemberCard
│   │   └── types.ts                  # TeamMember
│   ├── testimonials/
│   │   ├── components/               # FeedbacksSection
│   │   └── types.ts                  # FeedbackItem
│   └── videos/
│       ├── components/               # VideoCard, VideoCategoryCard
│       └── types.ts                  # Video, VideoCategory
├── lib/                              # Low-level utility functions
│   └── utils.ts                      # cn() tailwind class merger
├── pages/                            # Thin route page containers
│   ├── AboutUsPage.tsx
│   ├── CareerCompassBookPage.tsx
│   ├── CareerCompassWebPage.tsx
│   ├── CareerExplorerPage.tsx
│   ├── GalleryPage.tsx
│   ├── HomePage.tsx
│   ├── PartnersPage.tsx              (includes backward-compatible PatnersPage export)
│   ├── SessionRecordingsPage.tsx
│   ├── TeamPage.tsx
│   ├── VideoPlaylistPage.tsx
│   ├── step-up/
│   │   ├── page.tsx                  (Step Up event landing)
│   │   ├── register.tsx              (Registration form)
│   │   └── success.tsx               (Confirmation invitation)
│   └── web-launch/
│       └── page.tsx                  (Interactive ceremony page)
└── types/                            # Global & centralized type declarations
```

---

## Getting Started

### Prerequisites

- Node.js >= 18
- npm >= 9

### Installation

```bash
# Clone the repository
git clone https://github.com/IEEESriLanka/slinspire.lk.git

# Navigate into the project directory
cd slinspire.lk

# Install dependencies
npm install
```

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts Vite local development server with Hot Module Replacement (HMR) |
| `npm run build` | Compiles and builds the production bundle into `./dist` |
| `npm run typecheck` | Runs TypeScript compiler verification (`tsc --noEmit`) without emitting files |
| `npm run preview` | Locally previews the production build in `./dist` |
| `npm run deploy` | Deploys the built `./dist` folder to GitHub Pages via `gh-pages` |

---

## Architectural Guidelines

1. **Path Aliasing**:
   - Use the `@/*` alias to reference modules inside `src/` (e.g. `@/features/team/types` or `@/components/ui/button`).
   - Brittle relative parent paths (e.g. `../../../../components`) should be avoided.

2. **Domain Isolation**:
   - Domain-specific logic, cards, popups, and services belong within their respective `src/features/<domain>/` directory.
   - `src/components/ui/` is reserved exclusively for reusable design-system primitives (Button, Card, Badge, Dialog, etc.).

3. **Page Container Pattern**:
   - Route components in `src/pages/` should remain thin and declarative, composing `PageLayout` with feature components.

4. **GitHub Pages Routing**:
   - GitHub Pages does not have server-side URL rewrites for SPAs. Routing is handled via `HashRouter` (`/#/aboutus`, `/#/career-compass-web`), complemented by `public/404.html` SPA redirect fallback.
   - When introducing new routes, update `src/config/routes.ts` and test that deep linking functions properly.

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Create a feature branch: `git checkout -b feature/your-feature-name`
2. Commit your changes: `git commit -m "feat: describe your change"`
3. Verify type checking and build pass: `npm run typecheck && npm run build`
4. Push to your branch and open a Pull Request against `development`.