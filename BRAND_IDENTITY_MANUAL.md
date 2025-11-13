# Transition Marketing AI — Brand Identity Manual

**Version 1.0 | January 2025**

---

## 🎯 Brand Mission

**To empower Indian businesses with verified, AI-powered lead generation that delivers real conversations—not cold data.**

---

## 💡 Brand Story

Transition Marketing AI was founded on a simple truth: **most lead generation fails because it focuses on quantity over quality**. While competitors flood you with outdated databases and unqualified contacts, we've built a system that combines AI precision with human verification.

Our brand represents the **human-to-AI partnership**—where technology filters, but humans verify. The logo's funnel icon shows our process: raw leads go in, verified inquiries come out. The checkmark represents our promise: every inquiry is real, verified, and ready to convert.

---

## 🎨 Visual Identity

### Primary Logo Mark

**Concept**: Human + Verification Funnel + Success Checkmark

**Symbolism**:
- **Human head**: Human verification and personal touch
- **Funnel**: Filtering process (leads → verified inquiries)
- **Checkmark**: Verified, quality-assured output
- **Green dot**: Success indicator, verified status

---

## 🖌️ Color Palette

### Primary Colors

**Brand Blue (Primary)**
- `#0A3A8C` - Main brand color
- Usage: Logos, primary CTAs, headers, key text
- Psychology: Trust, professionalism, reliability
- **Do**: Use for primary actions and brand elements
- **Don't**: Use on dark backgrounds without white variant

**Success Green (Accent)**
- `#10B981` - Verification indicator
- Usage: Checkmarks, success states, verified badges
- Psychology: Success, verification, confidence
- **Do**: Use sparingly for emphasis and verification elements
- **Don't**: Use as primary brand color

### Secondary Colors

**Neutral Grays**
- `#111827` (Gray-900) - Primary text
- `#4B5563` (Gray-600) - Secondary text
- `#9CA3AF` (Gray-400) - Muted text
- `#E5E7EB` (Gray-200) - Borders, dividers
- `#F9FAFB` (Gray-50) - Background sections

### Background Colors

- **Primary**: `#FFFFFF` (White) - Main background
- **Secondary**: `#F9FAFB` (Gray-50) - Section backgrounds
- **Dark**: `#111827` (Gray-900) - Footer, dark sections

---

## ✍️ Typography

### Primary Font: Inter

**Rationale**: Modern, highly readable, professional. Designed for screens.

**Weights Used**:
- **Regular (400)**: Body text, descriptions
- **Medium (500)**: Secondary headlines, captions
- **Semibold (600)**: Headlines, CTAs, emphasis
- **Bold (700)**: Hero headlines, key statements

**Size Scale**:
- Hero Headline: `text-5xl md:text-6xl lg:text-7xl` (48px-72px)
- Section Headline: `text-4xl md:text-5xl` (36px-48px)
- Subheadline: `text-2xl md:text-3xl` (24px-30px)
- Body Large: `text-xl md:text-2xl` (20px-24px)
- Body: `text-base md:text-lg` (16px-18px)
- Small: `text-sm` (14px)
- Caption: `text-xs` (12px)

**Line Heights**:
- Headlines: `leading-tight` (1.25)
- Body: `leading-relaxed` (1.625)
- Small text: `leading-normal` (1.5)

---

## 🎭 Brand Personality

### Core Traits

1. **Trustworthy** — Every claim backed by verification
2. **Professional** — Enterprise-grade, not scrappy
3. **Transparent** — Clear about process and results
4. **Human-First** — Technology serves people, not replaces them
5. **Results-Driven** — Focused on measurable outcomes

### Tone of Voice

**In Writing**:
- Direct and clear (no jargon)
- Confident but not arrogant
- Professional but approachable
- Specific and metric-focused
- Solution-oriented

**Example**:
✅ "Get 30-50 verified inquiries in 30 days"
❌ "Transform your lead generation with cutting-edge AI technology"

---

## 📐 Logo Usage Guidelines

### Minimum Sizes

- **Horizontal logo**: Minimum 180px width
- **Icon-only logo**: Minimum 32px × 32px
- **Clear space**: 16px padding on all sides

### Placement Rules

**Header/Navigation**:
- Always left-aligned
- Height: 32-40px on mobile, 48-60px on desktop
- Clickable, routes to homepage

**Footer**:
- Use white variant on dark backgrounds
- Height: 32-48px
- Always include full logo (not icon-only)

**Hero Sections**:
- Optional, use sparingly
- Height: 48-72px
- Center or left-aligned

### Color Variants

**Light Background (default)**:
- Use: `logo-header.svg` (dark blue #0A3A8C)
- Use: `logo-icon.svg` (dark blue)

**Dark Background**:
- Use: `logo-header-white.svg` (white)
- Use: `logo-icon-white.svg` (white)

### ❌ Do Not

- ❌ Rotate or skew the logo
- ❌ Change colors (use variants instead)
- ❌ Add shadows or effects
- ❌ Stretch or compress
- ❌ Place on busy backgrounds
- ❌ Use icon-only in header (except mobile nav)
- ❌ Make logo smaller than minimum sizes

---

## 🧩 Logo Components

### Component: Logo.tsx

**Props**:
```typescript
interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';      // Size scale
  variant?: 'full' | 'icon' | 'text';    // Logo variant
  theme?: 'light' | 'dark';              // Background theme
  className?: string;                     // Additional classes
  href?: string;                         // Link destination (default: '/')
}
```

**Usage Examples**:
```tsx
// Header (default - light background)
<Logo size="md" href="/" />

// Footer (dark background)
<Logo size="md" theme="dark" />

// Icon-only (mobile nav)
<Logo variant="icon" size="sm" />

// Icon on dark background
<Logo variant="icon" theme="dark" size="md" />
```

---

## 🎪 Header/Navigation Design

### Structure

**Desktop Header**:
- Height: 64px (h-16) on mobile, 80px (h-20) on desktop
- Background: Semi-transparent white with backdrop blur (`bg-white/95 backdrop-blur-sm`)
- Border: Subtle border-bottom (`border-slate-200/80`)
- Shadow: Light shadow for depth (`shadow-sm`)
- Padding: 16px horizontal (px-4 sm:px-6 lg:px-8)
- Max-width: 1280px (max-w-7xl)

**Layout**:
```
[Logo] [Badge] | [Nav Links] | [CTAs]
```

**Mobile Header**:
- Height: 64px (h-16)
- Hamburger menu (on small screens)
- Logo: Max 40px height

### Navigation Links

**Spacing**: 32px gap between links (gap-8)
**Style**: 
- Font: Medium weight
- Color: Gray-700 default, Gray-900 on hover
- Size: Base (16px)
- No underline, subtle hover effect

### CTAs in Header

**Primary CTA**: "See If You Qualify"
- Background: Brand Blue (#2563EB / blue-600)
- Text: White
- Hover: Darker blue (blue-700)
- Size: Default button size

**Secondary CTA**: "Client Login" (optional)
- Style: Outline variant
- Lower visual weight

---

## 🎨 Component Design System

### Buttons

**Primary Button**:
- Background: `bg-blue-600` (#2563EB)
- Hover: `bg-blue-700` (#1D4ED8)
- Text: White
- Padding: `px-6 py-3` (24px × 12px)
- Border radius: `rounded-lg` (8px)
- Font weight: Semibold (600)

**Secondary Button**:
- Background: Transparent
- Border: `border-2 border-gray-300`
- Text: Gray-900
- Hover: `bg-gray-50`

### Cards

- Background: White
- Border: `border-2 border-gray-200`
- Shadow: `shadow-lg`
- Border radius: `rounded-xl` (12px)
- Padding: `p-6` (24px)

### Badges

- Background: `bg-blue-50`
- Text: `text-blue-700`
- Border: `border-blue-200`
- Border radius: `rounded-full`
- Padding: `px-3 py-1`

---

## 📱 Responsive Design

### Breakpoints

- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1024px (md)
- **Desktop**: > 1024px (lg)
- **Large Desktop**: > 1280px (xl)

### Mobile Considerations

- Logo max height: 40px
- Simplified navigation (hamburger menu)
- Stacked CTAs
- Larger touch targets (min 44px)
- Reduced padding on small screens

---

## 🎯 Brand Application Examples

### Website Header
```
[Logo] | Nav Links | [Primary CTA]
```

### Email Signature
```
[Logo Icon 32px]
Transition Marketing AI
[Website] | [Phone] | [Email]
```

### Social Media Profile
- Use horizontal logo with wordmark
- White variant for dark backgrounds
- Icon-only for profile pictures (square)

### Presentation Slides
- Logo top-left or top-right
- Brand blue accent color
- Minimal, clean design

---

## 📊 Brand Metrics & Goals

### What We Measure

1. **Brand Recognition**: Logo recall in target audience
2. **Trust Signals**: Professional appearance scores
3. **Conversion**: CTA click-through rates
4. **Consistency**: Uniform application across touchpoints

### Success Indicators

- Consistent logo usage across all channels
- Professional, trustworthy brand perception
- High brand recall in Indian B2B market
- Association with "verified" and "quality"

---

## 🔄 Brand Evolution Guidelines

### When to Update Branding

- After significant product pivots
- When entering new markets
- Every 3-5 years (refresh, not rebrand)
- When brand perception misaligns with reality

### What Never Changes

- Core brand promise (verification + AI)
- Logo mark concept (human + funnel + checkmark)
- Trust-first messaging
- Professional tone

---

## 📱 Favicon & App Icons

### Favicon Set

**Location**: `/public/` and Next.js App Router icon files

**Required Sizes**:
- `favicon.svg` — Modern SVG favicon (scalable)
- `favicon.ico` — Legacy fallback (16×16, 32×32, 48×48)
- `favicon-16x16.png` — Browser tab icon
- `favicon-32x32.png` — Browser tab icon (high-DPI)
- `favicon-96x96.png` — Desktop shortcuts
- `favicon-192x192.png` — Android home screen
- `favicon-512x512.png` — Android splash screen
- `apple-touch-icon.png` — iOS home screen (180×180)
- `mstile-144x144.png` — Windows tile

**Source**: All favicons derived from `logo-icon.svg` (brand logo mark)

**Implementation**:
- Next.js generates dynamic favicons via `src/app/icon.tsx`
- Apple touch icon via `src/app/apple-icon.tsx`
- Manifest config in `src/app/manifest.ts`

---

## 📱 Social Media Assets

### Open Graph Image

**Size**: 1200 × 630px (1.91:1 ratio)

**Specifications**:
- Background: White or brand blue gradient
- Logo: Horizontal logo, centered or top-left
- Headline: "Transition Marketing AI" (Inter Semibold)
- Subtext: Value proposition tagline
- Brand colors: #0A3A8C primary, #10B981 accent

**File**: `/public/og-image.png`

**Usage**: Automatically used for Facebook, LinkedIn, Twitter cards

### Twitter Card Image

**Size**: Same as OG (1200 × 630px)

**Alternative**: 1200 × 600px for summary cards

### LinkedIn Company Page

**Logo**: Horizontal logo (white variant)
**Cover Image**: 1192 × 220px (branded background)
**Square Logo**: 300 × 300px (icon logo)

---

## 🎨 CSS Brand Variables

### Brand Color Variables

All brand colors are available as CSS variables in `src/app/globals.css`:

```css
/* Brand Colors */
--color-brand-primary: #0A3A8C;
--color-brand-primary-light: #2563EB;
--color-brand-primary-dark: #05245C;
--color-brand-accent: #10B981;
--color-brand-accent-dark: #059669;
```

**Usage**:
```css
.button-primary {
  background-color: var(--color-brand-primary);
  color: white;
}

.button-primary:hover {
  background-color: var(--color-brand-primary-dark);
}
```

---

## 📚 Resources

### Logo Files Location
`/public/branding/`

**Files**:
- `logo-header.svg` — Horizontal logo (dark)
- `logo-header-white.svg` — Horizontal logo (white)
- `logo-icon.svg` — Icon-only (dark)
- `logo-icon-white.svg` — Icon-only (white)

### Favicon Files
`/public/` and Next.js App Router

**Files**:
- `favicon.svg` — Modern SVG favicon
- `src/app/icon.tsx` — Dynamic favicon generator
- `src/app/apple-icon.tsx` — Apple touch icon generator
- `src/app/manifest.ts` — Web app manifest

### Component Usage
See `src/components/Logo.tsx` for implementation.

### Design Tokens
See `src/app/globals.css` for color variables and spacing.

---

## ✅ Brand Checklist

### New Asset Creation

Before creating any new branded asset, ensure:

- [ ] Uses approved logo variant
- [ ] Follows color palette
- [ ] Uses Inter font family
- [ ] Maintains minimum logo sizes
- [ ] Includes proper clear space
- [ ] Matches brand personality in tone
- [ ] Reviewed for accessibility (contrast, alt text)
- [ ] Mobile-responsive if applicable

---

**Document Owner**: Brand Team  
**Last Updated**: January 2025  
**Version**: 1.0

For questions or brand approval requests, contact: brand@transitionmarketingai.com

