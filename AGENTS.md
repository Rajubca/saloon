# Free Bird Saloon - Architecture & Agent Guidelines

## Tech Stack
- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- Shadcn UI (Components: Button, Input, Card, Dialog, Tabs)
- Framer Motion (Animations, Page Transitions, Custom Drag Slider)
- Lenis (Smooth Scrolling)
- React Hook Form + Zod (Form Validation)
- Lucide React (Icons)

## Design System
- **Theme**: Dark Mode by default (`class="dark"` on `<html>`).
- **Colors**:
  - Background: Rich Black (`#050505`) mapped to `--background`.
  - Primary: Gold (`#D4AF37`) mapped to `--primary`.
  - Accent/Foreground text hints: Beige (`#F5F5DC`).
- **Typography**:
  - Headings: Playfair Display (`font-serif`).
  - Body: Inter (`font-sans`).

## Component Architecture (`src/components/`)
- `Navbar.tsx`: Sticky, glassmorphism, scroll-triggered shrink. Mobile responsive.
- `ServiceCard.tsx`: Reusable card with hover image scale and gold border transition.
- `BookingForm.tsx`: Multi-step form with Framer Motion transitions and native HTML5 validation alongside Zod schemas.
- `BeforeAfterSlider.tsx`: Custom Framer Motion drag component.
- `PageTransition.tsx`: Wrapper for entry/exit animations via `AnimatePresence`.
- `SmoothScroll.tsx`: Lenis wrapper for the entire application.

## Development Guidelines
- Always use `next/image` for images to maintain high LCP scores.
- Local images are placed in `/public` to avoid configuring remote patterns in `next.config.ts`.
- Page metadata and LocalBusiness JSON-LD schema are injected into `layout.tsx` for SEO.
- All Framer Motion animations should be thoughtful, smooth, and typically staggered.

## Contact Info
- Owner: Rajash Joshi
- Phone: +91 98986 78440
- Location: Vaghodia Road, Baroda, Gujarat 390019
