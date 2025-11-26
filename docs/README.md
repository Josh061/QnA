# Persona – Personality Test Frontend

A beautiful React/Next.js (App Router) + Tailwind CSS frontend inspired by personality.co. It ships with a polished landing page, Login and Registration flows, and a simple component system you can extend.

## Tech Stack
- Next.js 14 (App Router, TypeScript)
- Tailwind CSS (v4 style setup via `@import "tailwindcss"`)
- React Hook Form + Zod for forms and validation
- Minimal custom components (Navbar, AuthCard, GradientBackground)

## Features
- Modern, responsive UI (gradients, glassmorphism, soft shadows)
- Accessible, validated forms with loading states
- Route grouping for auth: `/(auth)/login` and `/(auth)/register`
- Clean project structure ready for future test pages and real authentication

## Project Structure (frontend)
```
frontend/
├─ src/
│  ├─ app/
│  │  ├─ layout.tsx              # Global layout: fonts, gradient bg, Navbar
│  │  ├─ globals.css             # Tailwind + global CSS vars
│  │  ├─ page.tsx                # Landing page
│  │  └─ (auth)/
│  │     ├─ login/page.tsx       # Login
│  │     └─ register/page.tsx    # Registration
│  └─ components/
│     ├─ Navbar.tsx
│     ├─ AuthCard.tsx
│     └─ GradientBackground.tsx
├─ package.json
└─ ...
```

## Prerequisites
- Node.js 18 or 20 (LTS recommended)
- npm (comes with Node)

Tip for Windows: avoid special characters like `&` in the project path (e.g., rename `Q&A` to `QnA`) as it can break npm scripts.

## Getting Started
1) Install dependencies
```
cd frontend
npm install
```

2) Install form libraries (if not already present)
```
npm install react-hook-form zod @hookform/resolvers
```

3) Run the dev server
```
npm run dev
```
Visit http://localhost:3000, http://localhost:3000/login and http://localhost:3000/register.

If you previously had install errors on Windows referencing `napi-postinstall` or `unrs-resolver`, ensure your folder path has no `&` and then remove and reinstall:
```
# PowerShell in frontend/
rmdir -Recurse -Force node_modules
Remove-Item package-lock.json -Force
npm install
```

## Styling and Theming
- Tailwind is used via `@import "tailwindcss"` and simple CSS variables in `globals.css`.
- The layout (`layout.tsx`) applies a radial gradient and dark theme-friendly colors.
- Components (AuthCard, Navbar) use translucent backgrounds and backdrop blur for a refined look.

To tweak base colors, adjust CSS vars in `globals.css`:
- `--background`, `--foreground`

## Core Components
- Navbar: sticky, translucent header with brand and auth links.
- AuthCard: glassmorphism card with title/subtitle section.
- GradientBackground: subtle decorative gradients behind content.

Example: using AuthCard

```tsx
// src/app/(auth)/login/page.tsx (excerpt)
<AuthCard title="Welcome back" subtitle="Log in to continue your test">
  {/* form here */}
</AuthCard>
```

## Pages
- Landing (`/`): hero with CTA, feature highlights.
- Login (`/login`): email + password with validation.
- Register (`/register`): name, email, password, confirm with validation.

Validation: React Hook Form + Zod. Errors are shown inline and submit buttons have loading states.

Example: Zod schema (login)

```ts
// (excerpt)
const LoginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "At least 6 characters"),
});
```

## Routing notes (App Router)
- We use a route group `/(auth)` purely for organization. URLs remain `/login` and `/register`.
- Global layout wraps every page with Navbar and gradient background.

## Accessibility
- Inputs have labels; focus rings via Tailwind focus utilities.
- Keep contrast readable: tweak shades if needed for your brand colors.

## Adding Real Authentication (optional, later)
Option A: NextAuth (Credentials)
- Install: `npm install next-auth`.
- Create `src/app/api/auth/[...nextauth]/route.ts` with a Credentials provider.
- In your login/register forms, call your credential endpoints or use `signIn("credentials")`.

Option B: Your own API
- Create `src/app/api/auth/login/route.ts` and `src/app/api/auth/register/route.ts`.
- POST from the forms to these endpoints and handle responses/tokens.

Keep secrets in environment vars via `.env.local` and access with `process.env.MY_KEY`.

## Deployment
- Easiest: Vercel. Import the repo, set root to `frontend`, and deploy.
- Ensure Node 18/20 is selected in your project settings.

## Testing (recommended next)
- Unit tests with Vitest or Jest for form logic.
- Example stack: `vitest`, `@testing-library/react`, `@testing-library/user-event`.

Install:
```
npm install -D vitest @testing-library/react @testing-library/user-event jsdom
```
Basic script in `package.json`:
```
"test": "vitest"
```

## Where to customize
- Copy, headings, and CTA: `src/app/page.tsx`
- Brand and nav: `src/components/Navbar.tsx`
- Card look: `src/components/AuthCard.tsx`
- Global gradients/colors: `src/app/layout.tsx` and `src/app/globals.css`

## Known caveats
- Windows path with `&` can break npm scripts. Rename the folder (e.g., `QnA`).
- Prefer Node 18/20 LTS for best compatibility.

## Roadmap ideas
- Add test flow pages and progress UI
- Persist user results and history
- Add OAuth providers (Google, GitHub) with NextAuth
- Theming switch (light/dark toggle) and brand palette utility classes

---
If you want, I can also provide a brief design system guide (spacing, colors, components) or wire up real auth next.

