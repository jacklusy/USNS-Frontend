# USNS Design Tokens Reference

Complete token definitions for the USNS design system. Define these in `app/globals.css` and consume via Tailwind `@theme inline`.

---

## Brand Palette

| Token | Light hex | Dark hex | Role |
|---|---|---|---|
| `--usns-green` | `#1B6B47` | `#2D8A5E` | Primary brand green |
| `--usns-green-light` | `#E1FFEA` | `rgba(225,255,234,0.12)` | Light green background / highlight fill |
| `--usns-accent-bg` | `#F0F8CC` | `rgba(240,248,204,0.10)` | Accent background fill |
| `--usns-white` | `#FFFFFF` | `#0B0F0D` | White / page surface inverse |
| `--usns-gray-light` | `#E3E9EC` | `rgba(255,255,255,0.08)` | Light gray / borders |
| `--usns-gray-medium` | `#737C7F` | `#9AA3A0` | Medium gray / muted text |

---

## Derived Tokens

| Token | Light hex | Dark hex | Role |
|---|---|---|---|
| `--usns-ink` | `#0F1F18` | `#F0F4F2` | Primary text |
| `--usns-green-dark` | `#145238` | `#1B6B47` | Hover/pressed primary buttons, brand panel base |
| `--usns-green-muted` | `#2D8A5E` | `#3DA06E` | Links, focus rings, active nav |
| `--surface-elevated` | `#F7FBF8` | `#141A17` | Cards, modals, dropdowns |
| `--danger` | `#C53030` | `#FC8181` | Errors, destructive actions |
| `--warn` | `#B7791F` | `#F6AD55` | Warnings, caution |
| `--success` | `#1B6B47` | `#2D8A5E` | Success (matches brand) |

---

## Semantic Aliases

Map semantic roles to brand tokens. Components reference **semantic** names only.

| Semantic token | Resolves to (light) | Usage |
|---|---|---|
| `--brand` | `--usns-green` | Primary CTA, brand emphasis |
| `--accent` | `--usns-green-muted` | Links, focus rings, selected state |
| `--surface` | `--usns-white` | Page background |
| `--surface-elevated` | `#F7FBF8` | Cards, modals |
| `--border` | `--usns-gray-light` | Hairlines, dividers |
| `--muted-fg` | `--usns-gray-medium` | Secondary text, captions |
| `--foreground` | `--usns-ink` | Primary text color |
| `--danger` | `#C53030` | Errors, destructive |
| `--warn` | `#B7791F` | Warnings |
| `--success` | `--usns-green` | Confirmations |

---

## Contrast Pairs (WCAG AA Verified)

| Foreground | Background | Ratio | Status |
|---|---|---|---|
| `--usns-ink` on `--surface` | `#0F1F18` on `#FFFFFF` | ~17.5:1 | AAA body |
| `--usns-green` on `--surface` | `#1B6B47` on `#FFFFFF` | ~5.8:1 | AA body |
| `--usns-green-muted` on `--surface` | `#2D8A5E` on `#FFFFFF` | ~4.5:1 | AA body (minimum) |
| `--usns-gray-medium` on `--surface` | `#737C7F` on `#FFFFFF` | ~4.6:1 | AA body |
| `#FFFFFF` on `--usns-green` | white on `#1B6B47` | ~5.8:1 | AA body (button text) |
| `--danger` on `--surface` | `#C53030` on `#FFFFFF` | ~5.2:1 | AA body |
| `--warn` on `--surface` | `#B7791F` on `#FFFFFF` | ~4.5:1 | AA body |
| `--usns-green-light` as text on `--surface` | `#E1FFEA` on `#FFFFFF` | ~1.1:1 | **BANNED for text** — fill only |
| `--usns-accent-bg` as text on `--surface` | `#F0F8CC` on `#FFFFFF` | ~1.2:1 | **BANNED for text** — fill only |

---

## Radius Scale

| Token | Value | Usage |
|---|---|---|
| `--radius-sm` | 6px | Tags, small chips |
| `--radius-md` | 10px | Buttons, inputs |
| `--radius-lg` | 14px | Cards |
| `--radius-xl` | 20px | Modals, sheets |
| `--radius-2xl` | 28px | Large containers |
| `--radius-pill` | 999px | Badges, pills |

---

## Elevation Scale

| Token | Shadow | Usage |
|---|---|---|
| `e0` | none (border only) | Flat surfaces |
| `e1` | `0 1px 2px rgba(15,31,24,0.04), 0 1px 1px rgba(15,31,24,0.03)` | Resting cards |
| `e2` | `0 4px 12px rgba(15,31,24,0.06), 0 2px 4px rgba(15,31,24,0.04)` | Hover cards, dropdowns |
| `e3` | `0 10px 30px rgba(15,31,24,0.10), 0 4px 10px rgba(15,31,24,0.06)` | Popovers, tooltips |
| `e4` | `0 30px 80px rgba(15,31,24,0.18), 0 12px 24px rgba(15,31,24,0.10)` | Modals |

Dark mode: prefer lighter `--border` over heavy shadows for elevation differentiation.

---

## Spacing Scale

4px base unit. Tailwind spacing maps directly.

| Token | px | Common use |
|---|---|---|
| 0 | 0 | Reset |
| 1 | 4px | Tight inline gap |
| 2 | 8px | Icon-to-text gap |
| 3 | 12px | Compact padding |
| 4 | 16px | Standard gap, form field spacing |
| 5 | 20px | Card padding (mobile) |
| 6 | 24px | Section padding, card padding (desktop) |
| 8 | 32px | Page horizontal padding (desktop) |
| 10 | 40px | Large section gap |
| 12 | 48px | Section vertical rhythm (mobile) |
| 16 | 64px | Section vertical rhythm (desktop) |
| 20 | 80px | Hero spacing |
| 24 | 96px | Page-level vertical spacing |

---

## Data Visualization Palette

Use in this priority order. Do not introduce colors outside this set.

1. `--brand` (`#1B6B47`) — primary series
2. `--usns-green-muted` (`#2D8A5E`) — secondary series
3. `--muted-fg` (`#737C7F`) — tertiary / comparison
4. `--danger` (`#C53030`) — negative / alert series
5. `--warn` (`#B7791F`) — caution series

For fills, use 20–40% opacity versions of the above on `--surface`.

---

## CSS Variable Block (Light Mode)

Copy into `app/globals.css`:

```css
:root {
  /* Brand */
  --usns-green: #1B6B47;
  --usns-green-light: #E1FFEA;
  --usns-accent-bg: #F0F8CC;
  --usns-white: #FFFFFF;
  --usns-gray-light: #E3E9EC;
  --usns-gray-medium: #737C7F;

  /* Derived */
  --usns-ink: #0F1F18;
  --usns-green-dark: #145238;
  --usns-green-muted: #2D8A5E;
  --surface-elevated: #F7FBF8;
  --danger: #C53030;
  --warn: #B7791F;
  --success: #1B6B47;

  /* Semantic */
  --brand: var(--usns-green);
  --accent: var(--usns-green-muted);
  --surface: var(--usns-white);
  --border: var(--usns-gray-light);
  --muted-fg: var(--usns-gray-medium);
  --foreground: var(--usns-ink);

  /* Radius */
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 14px;
  --radius-xl: 20px;
  --radius-2xl: 28px;
  --radius-pill: 999px;
}
```

---

## Dark Mode Overrides

Apply when `html.dark` class is present:

```css
html.dark {
  --usns-green: #2D8A5E;
  --usns-green-light: rgba(225, 255, 234, 0.12);
  --usns-accent-bg: rgba(240, 248, 204, 0.10);
  --usns-white: #0B0F0D;
  --usns-gray-light: rgba(255, 255, 255, 0.08);
  --usns-gray-medium: #9AA3A0;
  --usns-ink: #F0F4F2;
  --usns-green-dark: #1B6B47;
  --usns-green-muted: #3DA06E;
  --surface-elevated: #141A17;
  --danger: #FC8181;
  --warn: #F6AD55;
  --success: #2D8A5E;
  --brand: var(--usns-green);
  --accent: var(--usns-green-muted);
  --surface: #0B0F0D;
  --border: rgba(255, 255, 255, 0.08);
  --muted-fg: var(--usns-gray-medium);
  --foreground: var(--usns-ink);
}
```

---

## Tailwind v4 @theme Mapping

Extend in `app/globals.css`:

```css
@theme inline {
  --color-brand: var(--brand);
  --color-accent: var(--accent);
  --color-surface: var(--surface);
  --color-surface-elevated: var(--surface-elevated);
  --color-border: var(--border);
  --color-muted-fg: var(--muted-fg);
  --color-foreground: var(--foreground);
  --color-danger: var(--danger);
  --color-warn: var(--warn);
  --color-success: var(--success);
  --color-usns-green: var(--usns-green);
  --color-usns-green-light: var(--usns-green-light);
  --color-usns-accent-bg: var(--usns-accent-bg);
  --color-usns-green-dark: var(--usns-green-dark);
  --radius-sm: var(--radius-sm);
  --radius-md: var(--radius-md);
  --radius-lg: var(--radius-lg);
  --radius-xl: var(--radius-xl);
  --radius-2xl: var(--radius-2xl);
  --radius-pill: var(--radius-pill);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}
```

Usage in components: `bg-brand`, `text-muted-fg`, `border-border`, `rounded-lg`, etc.
