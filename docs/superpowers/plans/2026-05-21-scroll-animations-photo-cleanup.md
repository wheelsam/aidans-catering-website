# Scroll Animations, Branding & Photo Cleanup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add scroll animations, rebrand to Collins Charcuterie, add loading screen + social links, remove unused images

**Architecture:** Intersection Observer hook with CSS transitions for zero-dependency animations. Loading screen with logo fade-out. Rebrand all text to Collins Charcuterie. Clean up public/images folder.

**Tech Stack:** React hooks, Intersection Observer API, CSS transitions, Next.js

---

## File Structure

**New Files:**
- `hooks/useScrollReveal.ts` - Intersection Observer hook for scroll animations
- `app/animations.css` - Animation class definitions (fade-up, fade-left, fade-right, fade-scale)
- `components/LoadingScreen.tsx` - Full-screen logo loading animation
- `public/images/logo.jpeg` - Collins Charcuterie logo (copied from pics/)

**Modified Files:**
- `app/page.tsx` - Add scroll reveal hooks, animation classes, update branding text, add social links
- `app/layout.tsx` - Update metadata to Collins Charcuterie, add loading screen, replace favicon
- `app/globals.css` - Import animations.css
- `app/icon.svg` - Replace with logo-based favicon (or use logo.jpeg directly)

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

### Task 9: Rebrand to Collins Charcuterie

**Files:**
- Modify: `app/layout.tsx:15-25`
- Modify: `app/page.tsx:11,42,320-330`

- [ ] **Step 1: Update page metadata**

In `app/layout.tsx`, change:

```typescript
export const metadata: Metadata = {
  title: "Aidan Collins | Luxury Wedding Charcuterie & Catering | Seattle",
  description: "Elevate your Seattle wedding or special event with handcrafted charcuterie boards, grazing tables, and luxury catering. 6 years fine dining experience. Serving up to 200 guests. Custom menus for weddings, corporate events, and private dinners.",
```

To:

```typescript
export const metadata: Metadata = {
  title: "Collins Charcuterie | Luxury Wedding Catering | Seattle",
  description: "Elevate your Seattle wedding or special event with handcrafted charcuterie boards and grazing tables by Collins Charcuterie. 6 years fine dining experience. Serving up to 200 guests. Custom menus for weddings, corporate events, and private dinners.",
```

- [ ] **Step 2: Update OpenGraph metadata**

In `app/layout.tsx`, change:

```typescript
  openGraph: {
    title: "Aidan Collins | Luxury Wedding Charcuterie",
    description: "Handcrafted charcuterie boards and grazing tables for Seattle weddings and special events",
    type: "website",
  },
```

To:

```typescript
  openGraph: {
    title: "Collins Charcuterie | Luxury Wedding Catering",
    description: "Handcrafted charcuterie boards and grazing tables for Seattle weddings and special events by Collins Charcuterie",
    type: "website",
  },
```

- [ ] **Step 3: Update nav header**

In `app/page.tsx`, change:

```typescript
<h1 className="font-serif text-2xl text-charcoal">Aidan Collins</h1>
```

To:

```typescript
<h1 className="font-serif text-2xl text-charcoal">Collins Charcuterie</h1>
```

- [ ] **Step 4: Update hero heading**

In `app/page.tsx`, change:

```typescript
<h2 className="font-serif text-5xl md:text-7xl mb-6 text-balance leading-tight">
  Elevate Your Celebration with Handcrafted Charcuterie
</h2>
```

To:

```typescript
<h2 className="font-serif text-5xl md:text-7xl mb-6 text-balance leading-tight">
  Collins Charcuterie
</h2>
<p className="font-serif text-3xl md:text-4xl mb-8 text-balance opacity-90">
  Elevate Your Celebration with Handcrafted Charcuterie
</p>
```

- [ ] **Step 5: Update footer**

In `app/page.tsx`, change footer:

```typescript
<h3 className="font-serif text-3xl mb-3">Aidan Collins</h3>
<p className="text-white/70 mb-6 text-lg">Luxury Wedding Charcuterie & Catering</p>
```

To:

```typescript
<h3 className="font-serif text-3xl mb-3">Collins Charcuterie</h3>
<p className="text-white/70 mb-6 text-lg">by Chef Aidan Collins</p>
```

- [ ] **Step 6: Verify branding throughout**

Run: `npm run dev`
Open: http://localhost:3000
Check: "Collins Charcuterie" appears in browser tab, nav, hero, footer

- [ ] **Step 7: Commit**

```bash
git add app/layout.tsx app/page.tsx
git commit -m "feat: rebrand to Collins Charcuterie"
```

---

### Task 10: Add Social Media Links

**Files:**
- Modify: `app/page.tsx:320-350`

- [ ] **Step 1: Add social links to footer**

In `app/page.tsx`, after the navigation links in footer (around line 332):

```typescript
<div className="flex justify-center gap-8 mb-8 flex-wrap">
  <a href="#services" className="hover:text-gold transition-colors">Services</a>
  <a href="#about" className="hover:text-gold transition-colors">About</a>
  <a href="#portfolio" className="hover:text-gold transition-colors">Portfolio</a>
  <a href="#contact" className="hover:text-gold transition-colors">Contact</a>
</div>
```

Add after this div:

```typescript
<div className="flex justify-center gap-6 mb-8">
  <a
    href="https://www.facebook.com/share/17sV7SmQfL/"
    target="_blank"
    rel="noopener noreferrer"
    className="text-white/70 hover:text-gold transition-colors"
    aria-label="Facebook"
  >
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  </a>
  <a
    href="https://www.instagram.com/collinscharcuterie"
    target="_blank"
    rel="noopener noreferrer"
    className="text-white/70 hover:text-gold transition-colors"
    aria-label="Instagram"
  >
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
    </svg>
  </a>
</div>
```

- [ ] **Step 2: Test social links**

Run: `npm run dev`
Open: http://localhost:3000
Scroll to footer
Click: Facebook and Instagram icons
Expected: Opens in new tab to correct pages

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat: add social media links to footer"
```

---

### Task 11: Replace Favicon with Logo

**Files:**
- Delete: `app/icon.svg`
- Modify: `app/layout.tsx:30-32`

- [ ] **Step 1: Remove old SVG icon**

```bash
rm app/icon.svg
```

- [ ] **Step 2: Update favicon in layout**

In `app/layout.tsx`, change:

```typescript
  icons: {
    icon: '/icon.svg',
  },
```

To:

```typescript
  icons: {
    icon: '/images/logo.jpeg',
  },
```

- [ ] **Step 3: Test favicon**

Run: `npm run dev`
Open: http://localhost:3000
Check: Logo appears in browser tab (may need hard refresh)

- [ ] **Step 4: Commit**

```bash
git add app/icon.svg app/layout.tsx public/images/logo.jpeg
git commit -m "feat: replace favicon with Collins Charcuterie logo"
```

---

### Task 12: Add Loading Screen with Logo

**Files:**
- Create: `components/LoadingScreen.tsx`
- Modify: `app/layout.tsx:40-50`

- [ ] **Step 1: Create loading screen component**

```typescript
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fade out after 1.5 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-cream flex items-center justify-center transition-opacity duration-500 ${
        isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="w-64 h-64 md:w-80 md:h-80 relative animate-pulse">
        <Image
          src="/images/logo.jpeg"
          alt="Collins Charcuterie"
          fill
          className="object-contain"
          priority
        />
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Add loading screen to layout**

In `app/layout.tsx`, import at top:

```typescript
import LoadingScreen from "@/components/LoadingScreen";
```

Then in the body, add LoadingScreen before children:

```typescript
<body className="font-sans antialiased bg-cream text-charcoal">
  <LoadingScreen />
  {children}
</body>
```

- [ ] **Step 3: Test loading screen**

Run: `npm run dev`
Open: http://localhost:3000
Expected: Logo fades in for 1.5s then fades out

Hard refresh (Cmd+Shift+R) to test again

- [ ] **Step 4: Commit**

```bash
git add components/LoadingScreen.tsx app/layout.tsx
git commit -m "feat: add loading screen with Collins Charcuterie logo"
```

---

### Task 13: Test on Mobile and Final Verification

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
- [ ] "Collins Charcuterie" branding throughout site
- [ ] Loading screen shows logo on first visit
- [ ] Social media links work (Facebook + Instagram)
- [ ] Logo appears as favicon in browser tab
