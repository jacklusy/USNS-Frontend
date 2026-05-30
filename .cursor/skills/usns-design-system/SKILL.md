---
name: usns-design-system
description: Applies USNS brand, color, typography, spacing, component, accessibility, and layout standards for the usns-next Next.js app. Use when building or reviewing UI, pages, forms, buttons, cards, tables, navigation, dashboards, responsive layouts, loading/error/empty states, or styling in Tailwind/CSS.
---

# USNS Design System

Source of truth for the USNS Next.js application. Apply these standards whenever creating or reviewing UI. For token values and contrast pairs, see [tokens-reference.md](tokens-reference.md). For code snippets, see [examples.md](examples.md).

**Hard rules:**
- Never use raw hex in components — always reference CSS tokens.
- Light mode is the primary USNS brand experience.
- Color is never the only carrier of meaning — pair with icon + text.

---

## 1. Design Philosophy & Principles

USNS is a **modern enterprise application**. Visual priorities:

1. **Trustworthy & calm** — clear hierarchy, no aggressive or cluttered UI.
2. **Premium & modern** — polished surfaces, purposeful motion, generous whitespace.
3. **Brand-recognizable** — USNS green anchors every screen; no random palette choices.

Style direction: **Editorial minimalism + flat-elevated surfaces on light backgrounds.** Reduce visual noise; let structure and motion communicate state.

---

## 2. Brand Identity Guidelines

- **Primary anchor:** USNS brand green (`--brand`, `#1B6B47`) on white surfaces.
- **Wordmark:** USNS logo/wordmark in primary ink (`--usns-ink`) or white on dark brand panels.
- **Accent backgrounds:** `--usns-green-light` and `--usns-accent-bg` for highlights, badges, and brand panels — never as body text on white.
- **No decorative gradients** on cards, buttons, or data surfaces. Subtle mesh gradients are allowed **only** on auth brand panels.
- **Copyright/footer:** `© USNS {year}` in `--muted-fg`, `small` typography.

---

## 3. Color System

Tokens live in `app/globals.css` as CSS variables and are consumed via Tailwind `@theme`. Full palette: [tokens-reference.md](tokens-reference.md).

### Semantic roles (DO NOT rebind in components)

| Role | Token | Usage |
|---|---|---|
| Primary CTA | `--brand` | Buttons, key actions |
| Links / focus / active nav | `--accent` | Interactive emphasis |
| Page background | `--surface` | Main canvas |
| Cards / modals | `--surface-elevated` | Raised surfaces |
| Borders | `--border` | Hairlines, dividers |
| Secondary text | `--muted-fg` | Captions, helpers |
| Errors / destructive | `--danger` | Validation, delete |
| Warnings | `--warn` | Caution states |
| Success | `--success` | Confirmations (same as brand green) |

**Rules:**
- Primary CTAs use **green** (`--brand`), not black — USNS is green-forward.
- Accent backgrounds (`#E1FFEA`, `#F0F8CC`) are **fills only** — never body text on white.
- Data visualization palette: green → gray → danger. No fourth accent color outside tokens.
- Verify contrast at AA (4.5:1 body, 3:1 large text) before shipping new pairings.

---

## 4. Typography System

Stack: **Geist Sans + Geist Mono** via `next/font/google` (configured in `app/layout.tsx`).

| Role | Size (desktop / mobile) | Line-height | Weight | Tracking |
|---|---|---|---|---|
| `display` | 56px / 72px | 1.05 | 600 | -0.02em |
| `h1` | 36px / 48px | 1.1 | 600 | -0.015em |
| `h2` | 24px / 32px | 1.2 | 600 | -0.01em |
| `h3` | 18px / 24px | 1.3 | 600 | -0.005em |
| `body` | 15px / 16px | 1.6 | 400 | 0 |
| `small` | 13px / 20px | 1.5 | 400 | 0 |
| `label` | 12px / 16px | 1.4 | 500 | 0.04em (uppercase) |
| `mono` | 13px / 20px | 1.5 | 500 | tabular figures |

**Rules:**
- Apply `font-feature-settings: "cv11", "ss01", "ss03"` on Geist for refined forms.
- Dashboard numbers and metrics: `font-variant-numeric: tabular-nums`.
- Minimum body: **15px desktop, 16px mobile** (prevents iOS auto-zoom on inputs).

---

## 5. Spacing & Layout System

**Spacing scale (4px base):** 0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24 → multiply ×4 for px (e.g., `4` = 16px).

**Common layout values:**
- Page horizontal padding: 16px mobile, 24px tablet, 32px desktop.
- Section vertical rhythm: 48px mobile, 64px desktop between major sections.
- Form max-width: **420px** (auth, narrow flows).
- Content max-width: **1200px** (standard pages), **1440px** (dashboards).
- Stack gap between form fields: 16px; between form groups: 24px.

---

## 6. Grid System

- **Desktop (≥1024px):** 12-column grid, 24px gutters, 32px outer margin.
- **Tablet (768–1023px):** 8-column grid, 20px gutters.
- **Mobile (<768px):** 4-column grid, 16px gutters.
- Align content to grid; avoid arbitrary widths that break rhythm.
- Auth split layout: brand panel 45%, form panel 55% at ≥1024px.

---

## 7. Component Design Standards

Shared anatomy for all components:

- **Padding:** consistent internal spacing from the 4px scale.
- **Radius:** `sm=6px`, `md=10px`, `lg=14px`, `xl=20px`, `2xl=28px`, `pill=999px`.
- **Elevation:** five tiers (`e0`–`e4`); see tokens-reference for shadow values.
- **States:** default, hover, focus, active, disabled, loading, error — every interactive component defines all applicable states.
- **Focus:** 2px `--accent` ring with 2px offset on **every** interactive element — never removed.
- **Disabled:** 50% opacity + `cursor-not-allowed`; do not rely on color alone.

Component assignment:
- Cards: `radius-lg`, `e1` at rest.
- Buttons / inputs: `radius-md`.
- Modals / sheets: `radius-xl`.
- Badges / pills: `radius-pill`.

---

## 8. Form Design Guidelines

- Input height: **44px**; radius `md`; 1px `--border` at rest.
- Focus: 2px ring in `--accent` with 4px offset.
- **Floating label pattern:** label inside field, animates to top-left on focus or when filled.
- Errors render **below** the input in `--danger` with an icon — never as placeholder color change.
- Helper text: `--muted-fg`, `small`, below label area.
- Required fields: asterisk in label + `aria-required="true"`.
- Group related fields with `fieldset` + `legend` when semantically appropriate.
- Submit buttons: full-width on mobile auth forms; inline on desktop multi-field forms.

---

## 9. Button Standards

Three variants:

| Variant | Style | Use |
|---|---|---|
| `brand` | Green bg, white text | Primary actions |
| `secondary` | White bg, green border, green text | Secondary actions |
| `ghost` | Transparent, border on hover | Tertiary / inline actions |

**Heights:** 36px (compact), 44px (default), 52px (prominent).

**Rules:**
- One primary button per view section.
- Loading: replace label with spinner; preserve width via `min-width`.
- Destructive actions: use `--danger` variant, require confirmation for irreversible ops.
- Icon + label buttons: 8px gap; icon 20px.
- Press feedback visible ≥80ms.

---

## 10. Card Design Standards

- Background: `--surface-elevated`.
- Radius: `lg`; elevation: `e1` at rest → `e2` on hover (120ms transition).
- Internal padding: 20px mobile, 24px desktop.
- No gradients on cards by default.
- Card header: `h3` title + optional `small` subtitle in `--muted-fg`.
- Interactive cards: entire surface clickable with visible focus ring; use `<a>` or `<button>` wrapper.

---

## 11. Table Design Standards

- Header: sticky, `--surface-elevated` background, `label` typography, bottom border `--border`.
- Body rows: `body` or `small` typography; 48px row height minimum.
- Row hover: subtle `--usns-green-light` tint (10% opacity overlay).
- Zebra striping: optional; use `--surface-elevated` on alternate rows if needed.
- Actions column: right-aligned; icon buttons with aria-labels.
- Empty table: show empty state component (see §18), not a blank tbody.
- Responsive: horizontal scroll wrapper on mobile; consider card-list pattern below 768px for complex tables.

---

## 12. Navigation Standards

**Top navigation:**
- Height: **56px**; background `--surface`; bottom border `--border`.
- Logo left; nav links center or left; user menu right.
- Active link: green underline (2px) or `--brand` text color.
- Focus: standard 2px ring.

**Sidebar (dashboard):**
- Width: 240px expanded, 64px collapsed.
- Active item: `--usns-green-light` background + `--brand` text.
- Section labels: `label` typography in `--muted-fg`.

**Mobile:**
- Hamburger → slide-in drawer (full height, 280px width).
- Trap focus inside drawer when open; close on Escape.

---

## 13. Dashboard Design Patterns

Layout: sidebar + scrollable content area with 24px padding.

**Metric cards:**
- Large number in `mono` tabular; label in `small` `--muted-fg`.
- Trend indicator: icon + text + color (green up, danger down) — never color alone.

**Charts:**
- Palette order: `--brand` → `--muted-fg` → `--danger`.
- Grid lines: `--border`; axis labels: `small` `--muted-fg`.
- Tooltips: `--surface-elevated`, `e3` shadow, `small` text.

**Page header:**
- `h1` title + optional date-range filter right-aligned.
- Breadcrumbs above title on nested views.

---

## 14. Responsive Design Rules

Mobile-first breakpoints (Tailwind defaults):

| Token | Min-width | Typical use |
|---|---|---|
| `sm` | 640px | Large phones |
| `md` | 768px | Tablets |
| `lg` | 1024px | Desktop, auth split |
| `xl` | 1280px | Wide desktop |
| `2xl` | 1536px | Large monitors |

**Rules:**
- Design mobile layout first, enhance at each breakpoint.
- Auth: stacked below 1024px (hero strip ~25vh + form below).
- Hide non-essential columns in tables at `md` and below.
- Navigation collapses to drawer below `lg`.

---

## 15. Accessibility (WCAG)

Target: **WCAG 2.1 AA** minimum.

- **Contrast:** 4.5:1 body text, 3:1 large text (18px+ or 14px+ bold).
- **Focus:** visible on all interactive elements; never `outline: none` without replacement.
- **Keyboard:** all actions reachable via Tab; modals trap focus; Escape closes overlays.
- **Screen readers:** semantic HTML (`main`, `nav`, `aside`, headings in order).
- **Live regions:** toasts and dynamic status use `aria-live="polite"`; urgent errors use `assertive`.
- **Forms:** every input has a visible label linked via `htmlFor`/`id`; errors linked via `aria-describedby`.
- **Motion:** respect `prefers-reduced-motion`; provide non-animated fallbacks.
- **Images/icons:** meaningful `alt` text; decorative elements `aria-hidden="true"`.
- **Touch targets:** minimum 44×44px on mobile.

---

## 16. Iconography Guidelines

- Use **Lucide React** exclusively when icons are needed.
- Stroke width: **1.75**; sizes: 20px (inline), 24px (standalone).
- Never use emojis as UI icons.
- Icons paired with text for primary actions; icon-only buttons require `aria-label`.
- Status icons: success (CheckCircle), error (AlertCircle), warning (AlertTriangle), info (Info).
- Icon color follows text color token — do not assign independent icon colors unless indicating status.

---

## 17. Animation & Transition Standards

One consistent motion rhythm across the product:

- **Easing:** spring `{ stiffness: 260, damping: 26, mass: 1 }` for state changes; `cubic-bezier(0.2, 0.8, 0.2, 1)` for enter; `cubic-bezier(0.4, 0, 1, 1)` for exit.
- **Durations:** micro 120ms (hover/press), standard 240ms (panels/routes), emphasized 360ms (modals/reveals). Never exceed 500ms.
- **Stagger:** 40ms between sibling items in lists/grids.
- **Exit < enter:** exit duration = 70% of enter duration.
- **Reduced motion:** wrap animated components in a boundary that reads `prefers-reduced-motion`; fall back to opacity-only or instant state changes.
- **Interruptible:** user clicks should cancel in-flight animations.

CSS transitions are acceptable for v1; use Framer Motion when complex choreography is needed.

---

## 18. Empty States

Structure:
1. Optional illustration or icon (48px, `--muted-fg`).
2. Headline (`h3`): what is empty.
3. Description (`small`, `--muted-fg`): why or what to do next.
4. Primary CTA button to resolve (e.g., "Create first item").

Center vertically and horizontally in the content area. Do not show empty tables/lists without this pattern.

---

## 19. Loading States

| Context | Pattern |
|---|---|
| Button action | Spinner replaces label; button disabled |
| Content area | Skeleton placeholders matching layout shape |
| Full page | Prefer skeleton over centered spinner |
| Inline refresh | Small spinner in header/toolbar |

Skeleton: `--border` base with shimmer overlay using `--surface-elevated`. Match approximate dimensions of loaded content to prevent layout shift.

---

## 20. Error Handling UI

**Field-level:** red border + icon + message below input (`--danger`). Link via `aria-describedby`.

**Form-level:** alert banner at top of form with summary of errors and anchor links to fields.

**Page-level:** centered error panel with icon, `h2` message, description, and retry/go-back CTA.

**Network errors:** toast with retry action; preserve user input.

Never expose raw error codes or stack traces to users.

---

## 21. Success & Feedback Patterns

**Toasts:**
- Desktop: bottom-right; mobile: top-center.
- Auto-dismiss after **4s**; user can dismiss manually.
- `aria-live="polite"` on container.
- Variants: success (green left border), error (danger), info (accent).

**Inline success:** green check icon + confirmation text adjacent to the affected element.

**Confirmation dialogs:** for destructive actions; primary = confirm (danger), secondary = cancel (ghost).

---

## 22. Page Structure Standards

```html
<body>
  <a href="#main" class="skip-link">Skip to content</a>
  <header><!-- nav --></header>
  <main id="main"><!-- page content --></main>
  <footer><!-- copyright, links --></footer>
</body>
```

- One `<h1>` per page; subsequent headings descend in order.
- Decorative brand panels: `<aside aria-hidden="true">`.
- Max-width containers centered with horizontal padding.
- Footer: `© USNS {year}`, build version optional, `--muted-fg` `small` text.

---

## 23. Mobile-First Design Requirements

- Touch targets ≥ **44×44px**.
- Input font-size ≥ **16px** on mobile (prevents iOS zoom).
- Never set `user-scalable=no` on viewport meta.
- Full-width primary buttons on mobile forms.
- Bottom-safe padding for fixed footers (env(safe-area-inset-bottom)).
- Test at 375px width minimum.

---

## 24. Dark Mode Considerations

Light mode is the **primary USNS brand experience.** Dark mode is optional enhancement.

If implemented (`html.dark` class, system preference default):
- `--surface`: `#0B0F0D`; `--surface-elevated`: `#141A17`.
- `--usns-ink` → `#F0F4F2` (primary text).
- `--brand` lightened to `#2D8A5E` for contrast on dark surfaces.
- `--border`: `rgba(255,255,255,0.08)`.
- No accent-background fills at full opacity on dark — reduce to 10–15% opacity overlays.
- Elevation uses lighter borders rather than heavy shadows.

See dark column in [tokens-reference.md](tokens-reference.md).

---

## 25. Design QA Checklist

Before shipping any UI, verify:

- [ ] All colors use CSS tokens — no raw hex in components
- [ ] Contrast meets AA for all text/background pairings
- [ ] Focus rings visible on every interactive element
- [ ] Typography follows the scale; body ≥15px desktop / 16px mobile
- [ ] Spacing uses the 4px scale consistently
- [ ] Buttons have one primary CTA per section; loading states preserve width
- [ ] Forms have labels, error messages below fields, and aria attributes
- [ ] Empty, loading, and error states implemented
- [ ] Responsive layout tested at 375px, 768px, 1024px, 1280px
- [ ] Touch targets ≥44px on mobile
- [ ] Icons from Lucide; no emojis as icons
- [ ] Motion respects `prefers-reduced-motion`
- [ ] Semantic HTML with single `<h1>`, skip link, and `<main>`
- [ ] Toast/live-region accessibility configured
- [ ] No gradients on cards/buttons (except auth brand panel)
- [ ] USNS branding consistent — green primary, correct footer copyright

---

## Auth Split Layout Pattern

Reusable layout for login and registration pages:

```
┌─────────────────────────┬────────────────────────────┐
│   BRAND PANEL (45%)     │   FORM PANEL (55%)         │
│   - USNS logo           │   - Title + subtitle       │
│   - Tagline (display)   │   - Form fields            │
│   - Green mesh bg       │   - Primary CTA            │
│   - © USNS {year}       │   - Helper links + footer  │
└─────────────────────────┴────────────────────────────┘
```

Mobile (<1024px): brand panel becomes hero strip (~25vh); form stacks below.

Brand panel: near-black green base (`--usns-green-dark`) with low-opacity `--usns-green-light` / `--usns-accent-bg` mesh blobs. Decorative — `aria-hidden="true"`.

Form panel: `--surface` background; max-width 420px centered; content in `<main>`.

See [examples.md](examples.md) for implementation skeleton.

---

## Anti-Patterns (Do Not)

- Heavy color gradients on cards or buttons.
- Emojis as icons.
- Glassmorphism on light surfaces (only auth brand panel may use subtle blur).
- Accent background colors (`#E1FFEA`, `#F0F8CC`) as text on white.
- Hard-coded hex in components.
- Sub-80ms press feedback on interactive elements.
- `user-scalable=no` on viewport.
- Placeholder text replacing labels.
- Color as the sole indicator of state or meaning.

---

## Implementation Notes

- Define tokens in `app/globals.css` using Tailwind v4 `@theme inline`.
- Fonts: Geist Sans + Geist Mono via `app/layout.tsx`.
- Icons: Lucide React (install when needed).
- Motion: CSS transitions for v1; Framer Motion for complex sequences.
- Components: build from tokens; restyle any UI library imports to match these standards.
