# Scroll Animations & Photo Cleanup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add subtle scroll-triggered fade-in animations and remove 23 unused/duplicate images

**Architecture:** Intersection Observer hook with CSS transitions for zero-dependency animations. Clean up public/images folder while preserving pics/ backup.

**Tech Stack:** React hooks, Intersection Observer API, CSS transitions, Next.js

---

## File Structure

**New Files:**
- `hooks/useScrollReveal.ts` - Intersection Observer hook for scroll animations
- `app/animations.css` - Animation class definitions (fade-up, fade-left, fade-right, fade-scale)

**Modified Files:**
- `app/page.tsx` - Add scroll reveal hooks and animation classes to sections
- `app/globals.css` - Import animations.css
- `app/layout.tsx` - Ensure animations.css is loaded (if needed)

**Deleted Files:**
- 23 image files from `public/images/` (duplicates, corrupted, unused)

---

### Task 1: Create useScrollReveal Hook

**Files:**
- Create: `hooks/useScrollReveal.ts`

- [ ] **Step 1: Create hooks directory**

```bash
mkdir -p hooks
```

- [ ] **Step 2: Write useScrollReveal hook**

```typescript
'use client';

import { useEffect, useRef, useState } from 'react';

interface UseScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useScrollReveal(options: UseScrollRevealOptions = {}) {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    triggerOnce = true,
  } = options;

  const elementRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce]);

  return { elementRef, isVisible };
}
```

- [ ] **Step 3: Verify TypeScript compiles**

Run: `npm run build`
Expected: No TypeScript errors

- [ ] **Step 4: Commit**

```bash
git add hooks/useScrollReveal.ts
git commit -m "feat: add useScrollReveal hook for scroll animations"
```

---

### Task 2: Create Animation CSS Classes

**Files:**
- Create: `app/animations.css`
- Modify: `app/globals.css`

- [ ] **Step 1: Create animations.css**

```css
/* Scroll Reveal Animations */

/* Fade Up */
.fade-up {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 600ms ease-out, transform 600ms ease-out;
}

.fade-up.revealed {
  opacity: 1;
  transform: translateY(0);
}

/* Fade Left */
.fade-left {
  opacity: 0;
  transform: translateX(-30px);
  transition: opacity 700ms ease-out, transform 700ms ease-out;
}

.fade-left.revealed {
  opacity: 1;
  transform: translateX(0);
}

/* Fade Right */
.fade-right {
  opacity: 0;
  transform: translateX(30px);
  transition: opacity 700ms ease-out, transform 700ms ease-out;
  transition-delay: 150ms;
}

.fade-right.revealed {
  opacity: 1;
  transform: translateX(0);
}

/* Fade Scale (for portfolio grid) */
.fade-scale {
  opacity: 0;
  transform: scale(0.95) translateY(20px);
  transition: opacity 600ms ease-out, transform 600ms ease-out;
}

.fade-scale.revealed {
  opacity: 1;
  transform: scale(1) translateY(0);
}

/* Stagger delays for service cards (4 items) */
.fade-up:nth-child(1) { transition-delay: 0ms; }
.fade-up:nth-child(2) { transition-delay: 100ms; }
.fade-up:nth-child(3) { transition-delay: 200ms; }
.fade-up:nth-child(4) { transition-delay: 300ms; }

/* Stagger delays for portfolio grid (32 items, 50ms per item) */
.fade-scale:nth-child(1) { transition-delay: 0ms; }
.fade-scale:nth-child(2) { transition-delay: 50ms; }
.fade-scale:nth-child(3) { transition-delay: 100ms; }
.fade-scale:nth-child(4) { transition-delay: 150ms; }
.fade-scale:nth-child(5) { transition-delay: 200ms; }
.fade-scale:nth-child(6) { transition-delay: 250ms; }
.fade-scale:nth-child(7) { transition-delay: 300ms; }
.fade-scale:nth-child(8) { transition-delay: 350ms; }
.fade-scale:nth-child(9) { transition-delay: 400ms; }
.fade-scale:nth-child(10) { transition-delay: 450ms; }
.fade-scale:nth-child(11) { transition-delay: 500ms; }
.fade-scale:nth-child(12) { transition-delay: 550ms; }
.fade-scale:nth-child(13) { transition-delay: 600ms; }
.fade-scale:nth-child(14) { transition-delay: 650ms; }
.fade-scale:nth-child(15) { transition-delay: 700ms; }
.fade-scale:nth-child(16) { transition-delay: 750ms; }
.fade-scale:nth-child(17) { transition-delay: 800ms; }
.fade-scale:nth-child(18) { transition-delay: 850ms; }
.fade-scale:nth-child(19) { transition-delay: 900ms; }
.fade-scale:nth-child(20) { transition-delay: 950ms; }
.fade-scale:nth-child(21) { transition-delay: 1000ms; }
.fade-scale:nth-child(22) { transition-delay: 1050ms; }
.fade-scale:nth-child(23) { transition-delay: 1100ms; }
.fade-scale:nth-child(24) { transition-delay: 1150ms; }
.fade-scale:nth-child(25) { transition-delay: 1200ms; }
.fade-scale:nth-child(26) { transition-delay: 1250ms; }
.fade-scale:nth-child(27) { transition-delay: 1300ms; }
.fade-scale:nth-child(28) { transition-delay: 1350ms; }
.fade-scale:nth-child(29) { transition-delay: 1400ms; }
.fade-scale:nth-child(30) { transition-delay: 1450ms; }
.fade-scale:nth-child(31) { transition-delay: 1500ms; }
.fade-scale:nth-child(32) { transition-delay: 1550ms; }

/* Stagger delays for contact cards (3 items) */
.contact-card:nth-child(1) { transition-delay: 0ms; }
.contact-card:nth-child(2) { transition-delay: 150ms; }
.contact-card:nth-child(3) { transition-delay: 300ms; }

/* Mobile optimization - reduce movement distance */
@media (max-width: 768px) {
  .fade-up {
    transform: translateY(10px);
  }
  
  .fade-left {
    transform: translateX(-15px);
  }
  
  .fade-right {
    transform: translateX(15px);
  }
  
  .fade-scale {
    transform: scale(0.95) translateY(10px);
  }
}

/* Accessibility - respect prefers-reduced-motion */
@media (prefers-reduced-motion: reduce) {
  .fade-up,
  .fade-left,
  .fade-right,
  .fade-scale {
    opacity: 1;
    transform: none;
    transition: none;
  }
}

/* Performance optimization */
.fade-up,
.fade-left,
.fade-right,
.fade-scale {
  will-change: transform, opacity;
}

.fade-up.revealed,
.fade-left.revealed,
.fade-right.revealed,
.fade-scale.revealed {
  will-change: auto;
}
```

- [ ] **Step 2: Import animations in globals.css**

Add to `app/globals.css` after existing imports:

```css
@import './animations.css';
```

- [ ] **Step 3: Verify styles load**

Run: `npm run dev`
Open: http://localhost:3000
Check: No CSS errors in console

- [ ] **Step 4: Commit**

```bash
git add app/animations.css app/globals.css
git commit -m "feat: add scroll animation CSS classes"
```

---

### Task 3: Add Animations to Services Section

**Files:**
- Modify: `app/page.tsx:55-143`

- [ ] **Step 1: Import useScrollReveal hook**

At top of `app/page.tsx`, add:

```typescript
import { useScrollReveal } from "@/hooks/useScrollReveal";
```

- [ ] **Step 2: Convert page to client component and add hook**

Change from:

```typescript
export default function Home() {
```

To:

```typescript
'use client';

import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function Home() {
  const servicesReveal = useScrollReveal();
```

- [ ] **Step 3: Add ref and classes to services section container**

Find the services section div (around line 59):

```typescript
<div className="grid md:grid-cols-2 gap-12">
```

Replace with:

```typescript
<div ref={servicesReveal.elementRef} className="grid md:grid-cols-2 gap-12">
```

- [ ] **Step 4: Add animation classes to service cards**

Find each service card div (4 total, around lines 65, 83, 99, 117):

```typescript
<div className="space-y-4">
```

Replace with:

```typescript
<div className={`space-y-4 fade-up ${servicesReveal.isVisible ? 'revealed' : ''}`}>
```

- [ ] **Step 5: Test services animations**

Run: `npm run dev`
Open: http://localhost:3000
Action: Scroll down to services section
Expected: Cards fade up with 100ms stagger

- [ ] **Step 6: Commit**

```bash
git add app/page.tsx
git commit -m "feat: add scroll animations to services section"
```

---

### Task 4: Add Animations to About Section

**Files:**
- Modify: `app/page.tsx:145-190`

- [ ] **Step 1: Add hook for about section**

After `servicesReveal` hook declaration:

```typescript
const aboutTextReveal = useScrollReveal();
const aboutImageReveal = useScrollReveal();
```

- [ ] **Step 2: Add animation to about text**

Find the about text div (around line 150):

```typescript
<div className="space-y-6">
```

Replace with:

```typescript
<div ref={aboutTextReveal.elementRef} className={`space-y-6 fade-left ${aboutTextReveal.isVisible ? 'revealed' : ''}`}>
```

- [ ] **Step 3: Add animation to about image**

Find the about image div (around line 180):

```typescript
<div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
```

Replace with:

```typescript
<div ref={aboutImageReveal.elementRef} className={`relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl fade-right ${aboutImageReveal.isVisible ? 'revealed' : ''}`}>
```

- [ ] **Step 4: Test about animations**

Run: `npm run dev`
Open: http://localhost:3000
Action: Scroll to about section
Expected: Text fades from left, image fades from right with 150ms delay

- [ ] **Step 5: Commit**

```bash
git add app/page.tsx
git commit -m "feat: add scroll animations to about section"
```

---

### Task 5: Add Animations to Portfolio Grid

**Files:**
- Modify: `app/page.tsx:192-248`

- [ ] **Step 1: Add hook for portfolio section**

After other reveal hooks:

```typescript
const portfolioReveal = useScrollReveal();
```

- [ ] **Step 2: Add ref to portfolio grid**

Find portfolio grid container (around line 201):

```typescript
<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
```

Replace with:

```typescript
<div ref={portfolioReveal.elementRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
```

- [ ] **Step 3: Add animation class to portfolio items**

Find portfolio item div (around line 236):

```typescript
<div key={i} className="relative aspect-square rounded-lg overflow-hidden group cursor-pointer shadow-md hover:shadow-xl transition-shadow">
```

Replace with:

```typescript
<div key={i} className={`relative aspect-square rounded-lg overflow-hidden group cursor-pointer shadow-md hover:shadow-xl transition-shadow fade-scale ${portfolioReveal.isVisible ? 'revealed' : ''}`}>
```

- [ ] **Step 4: Test portfolio animations**

Run: `npm run dev`
Open: http://localhost:3000
Action: Scroll to portfolio section
Expected: Images fade + scale in waves with 50ms stagger

- [ ] **Step 5: Commit**

```bash
git add app/page.tsx
git commit -m "feat: add scroll animations to portfolio grid"
```

---

### Task 6: Add Animations to Contact Section

**Files:**
- Modify: `app/page.tsx:250-320`

- [ ] **Step 1: Add hook for contact section**

After other reveal hooks:

```typescript
const contactReveal = useScrollReveal();
```

- [ ] **Step 2: Add ref to contact cards container**

Find contact cards grid (around line 270):

```typescript
<div className="grid md:grid-cols-2 gap-8 mb-12">
```

Replace with:

```typescript
<div ref={contactReveal.elementRef} className="grid md:grid-cols-2 gap-8 mb-12">
```

- [ ] **Step 3: Add animation class to contact cards**

Find each contact card div (2 cards around lines 271, 290):

```typescript
<div className="bg-white p-10 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
```

Replace with:

```typescript
<div className={`bg-white p-10 rounded-2xl shadow-lg hover:shadow-xl transition-shadow contact-card fade-up ${contactReveal.isVisible ? 'revealed' : ''}`}>
```

- [ ] **Step 4: Add animation to service area card**

Find service area card (around line 306):

```typescript
<div className="bg-white p-10 rounded-2xl shadow-lg">
```

Replace with:

```typescript
<div className={`bg-white p-10 rounded-2xl shadow-lg contact-card fade-up ${contactReveal.isVisible ? 'revealed' : ''}`}>
```

- [ ] **Step 5: Test contact animations**

Run: `npm run dev`
Open: http://localhost:3000
Action: Scroll to contact section
Expected: Cards fade up with 150ms stagger

- [ ] **Step 6: Commit**

```bash
git add app/page.tsx
git commit -m "feat: add scroll animations to contact section"
```

---

### Task 7: Remove Duplicate and Corrupted Images

**Files:**
- Delete: `public/images/IMG_1167 (1).jpeg`
- Delete: `public/images/IMG_5701.jpeg`

- [ ] **Step 1: Remove duplicate image**

```bash
rm "public/images/IMG_1167 (1).jpeg"
```

- [ ] **Step 2: Remove corrupted image**

```bash
rm public/images/IMG_5701.jpeg
```

- [ ] **Step 3: Verify site still works**

Run: `npm run dev`
Open: http://localhost:3000
Check: No broken images, no 404s in console

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: remove duplicate and corrupted images"
```

---

### Task 8: Remove Unused Images

**Files:**
- Delete: 21 unused image files from `public/images/`

- [ ] **Step 1: Remove non-wedding/unclear context images**

```bash
cd public/images
rm 2B9B6AAC-9E4D-4E5A-8148-A170F85EC7BB.JPG
rm 71306658765__7FF5097E-94BA-4E27-B9D0-A54F10B016EA.jpeg
rm 79861477-068B-4DFE-A627-CE3C57EE6F08.JPG
rm IMG_0621.JPG
rm IMG_1398.eml
rm "imagejpeg_0 (1).jpeg"
rm imagejpeg_0.jpeg
rm IMG_9169.jpeg
rm IMG_9354.jpeg
rm IMG_9355.jpeg
rm IMG_9356.jpeg
rm IMG_9357.jpeg
cd ../..
```

- [ ] **Step 2: Remove additional unused numbered images**

```bash
cd public/images
rm IMG_1276.jpeg
rm IMG_2650.jpeg
rm IMG_4424.jpeg
rm IMG_4704.jpeg
rm IMG_4805.PNG
rm IMG_5560.jpeg
rm IMG_8642.jpeg
rm IMG_8643.jpeg
rm IMG_8644.jpeg
cd ../..
```

- [ ] **Step 3: Verify remaining image count**

Run: `find public/images -type f \( -name "*.jpeg" -o -name "*.JPG" -o -name "*.PNG" \) | wc -l`
Expected: ~56 images remaining

- [ ] **Step 4: Test site thoroughly**

Run: `npm run dev`
Open: http://localhost:3000
Check: All sections load correctly, no 404s

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: remove unused images to reduce deployment size"
```

---

### Task 9: Test on Mobile and Final Verification

**Files:**
- No file changes

- [ ] **Step 1: Test mobile animations**

Run: `npm run dev`
Open: http://localhost:3000 in Chrome DevTools mobile emulation
Device: iPhone 12 Pro
Action: Scroll through all sections
Expected: Smooth 60fps animations with reduced movement (10px vs 20px)

- [ ] **Step 2: Test prefers-reduced-motion**

In Chrome DevTools:
1. Open Command Palette (Cmd+Shift+P)
2. Type "Emulate CSS prefers-reduced-motion"
3. Select "prefers-reduced-motion: reduce"
4. Refresh page
Expected: No animations, instant reveal

- [ ] **Step 3: Check bundle size**

Run: `npm run build`
Check: Build completes successfully, no size warnings

- [ ] **Step 4: Deploy to Vercel**

```bash
git push origin main
```

Wait for Vercel auto-deploy
Expected: Deployment succeeds, site loads correctly

- [ ] **Step 5: Verify deployment size reduction**

In Vercel dashboard:
Check: Deployment size reduced by ~50-60MB compared to previous

- [ ] **Step 6: Final commit (if any fixes needed)**

```bash
git add -A
git commit -m "fix: final mobile animation adjustments"
git push origin main
```

---

## Completion Checklist

- [ ] Animations trigger at correct scroll positions
- [ ] Stagger timing feels natural (100ms services, 50ms portfolio, 150ms contact)
- [ ] Mobile animations smooth on real devices
- [ ] Works with reduced motion preference
- [ ] No layout shift during animations
- [ ] Portfolio grid wave effect flows nicely
- [ ] All images still load after cleanup
- [ ] No 404s in browser console
- [ ] Vercel deployment size reduced by ~50-60MB
- [ ] Site maintains luxury/elegant brand feel
