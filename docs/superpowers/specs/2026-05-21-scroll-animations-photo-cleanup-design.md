# Scroll Animations & Photo Cleanup Design

**Date:** 2026-05-21  
**Project:** Aidan's Wedding Catering Website  
**Goal:** Add subtle scroll-triggered animations and remove redundant images

---

## Overview

Enhance user experience with elegant fade-in animations as content scrolls into view, while cleaning up duplicate and unused images to improve load times and deployment size.

---

## Animation Implementation

### Technical Approach

Use **Intersection Observer API** with CSS transitions for maximum browser compatibility and performance.

**Why this approach:**
- Zero external dependencies (no bundle size increase)
- Works across all modern browsers
- Excellent mobile performance
- Fine-grained control over timing and staggering

### Core Hook: `useScrollReveal`

Create reusable React hook that:
- Accepts ref to element to watch
- Triggers at 10% viewport intersection (good for mobile)
- Adds `revealed` class when element enters view
- Cleans up observer on unmount
- Returns boolean `isVisible` state

**Configuration:**
- `threshold: 0.1` - triggers at 10% visibility
- `rootMargin: '0px'` - no offset (can adjust if needed)
- `triggerOnce: true` - animation runs once per element

### Animated Sections

#### 1. Services Grid (4 cards)
**Effect:** Fade up with stagger
- Initial: `opacity: 0`, `translateY(20px)`
- Final: `opacity: 1`, `translateY(0)`
- Duration: 600ms ease-out
- Stagger: 100ms between cards (0ms, 100ms, 200ms, 300ms)

#### 2. About Section
**Effect:** Split reveal
- Text content: Fade + slide from left
  - Initial: `opacity: 0`, `translateX(-30px)`
  - Final: `opacity: 1`, `translateX(0)`
  - Duration: 700ms ease-out
- Image: Fade + slide from right
  - Initial: `opacity: 0`, `translateX(30px)`
  - Final: `opacity: 1`, `translateX(0)`
  - Duration: 700ms ease-out
  - Delay: 150ms after text starts

#### 3. Portfolio Grid (32 images)
**Effect:** Wave reveal with scale
- Initial: `opacity: 0`, `scale(0.95)`, `translateY(20px)`
- Final: `opacity: 1`, `scale(1)`, `translateY(0)`
- Duration: 600ms ease-out
- Stagger: 50ms per item
- Group reveal: 4 items per wave (8 waves total)

#### 4. Contact Cards (3 cards)
**Effect:** Fade up with stagger
- Initial: `opacity: 0`, `translateY(20px)`
- Final: `opacity: 1`, `translateY(0)`
- Duration: 600ms ease-out
- Stagger: 150ms between cards

### Mobile Optimization

Reduce movement distance on mobile for smoother feel:
- Desktop: `translateY(20px)`, `translateX(30px)`
- Mobile (< 768px): `translateY(10px)`, `translateX(15px)`
- Same duration/easing to maintain elegance

### CSS Structure

```css
/* Base state - hidden before reveal */
.fade-up {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 600ms ease-out, transform 600ms ease-out;
}

.fade-up.revealed {
  opacity: 1;
  transform: translateY(0);
}

/* Mobile optimization */
@media (max-width: 768px) {
  .fade-up {
    transform: translateY(10px);
  }
}
```

Similar patterns for `.fade-left`, `.fade-right`, `.fade-scale` variants.

---

## Photo Cleanup

### Problem

- 79 images in public/images/
- Only 56 used in site (24 in carousels + 32 in portfolio)
- Duplicates and corrupted files present
- ~50-60MB of unused images

### Files to Remove

**Duplicates:**
- `IMG_1167 (1).jpeg` - exact duplicate of `IMG_1167.jpeg`

**Corrupted:**
- `IMG_5701.jpeg` - 0 bytes, corrupted

**Non-wedding/unclear context (23 files):**
- `2B9B6AAC-9E4D-4E5A-8148-A170F85EC7BB.JPG`
- `71306658765__7FF5097E-94BA-4E27-B9D0-A54F10B016EA.jpeg`
- `79861477-068B-4DFE-A627-CE3C57EE6F08.JPG`
- `IMG_0621.JPG`
- `IMG_1167 (1).jpeg`
- `IMG_1398.eml` (not an image)
- `IMG_5701.jpeg`
- `imagejpeg_0.jpeg`
- `imagejpeg_0 (1).jpeg`
- `IMG_9169.jpeg`
- `IMG_9354.jpeg`
- `IMG_9355.jpeg`
- `IMG_9356.jpeg`
- `IMG_9357.jpeg`
- Plus additional unused numbered images

**Strategy:**
1. Keep pics/ folder untouched (backup)
2. Remove only from public/images/
3. Verify no code references before deletion
4. Test site after cleanup

### Expected Impact

- Deployment size: -50-60MB
- Faster Vercel deployments
- Reduced bandwidth costs
- Cleaner project structure

---

## Implementation Components

### New Files

1. **`hooks/useScrollReveal.ts`**
   - Intersection Observer hook
   - ~30 lines

2. **`app/animations.css`** (or add to globals.css)
   - Animation class definitions
   - ~80 lines

### Modified Files

1. **`app/page.tsx`**
   - Add `useScrollReveal` to sections
   - Add animation classes to elements
   - ~20 line additions

2. **`app/layout.tsx`**
   - Import animations.css if separate file

### Deleted Files

- 23 unused images from public/images/

---

## Performance Considerations

**Animation Performance:**
- CSS transforms (not layout properties) for 60fps
- `will-change: transform, opacity` for smoother animations
- Intersection Observer runs off main thread
- No JavaScript animation loops

**Mobile:**
- Reduced movement distances
- 10% threshold catches elements early on small screens
- Hardware-accelerated transforms

**Accessibility:**
- Respect `prefers-reduced-motion` media query
- Instant reveal (no animation) if user prefers
- All content accessible regardless of animation state

---

## Testing Checklist

- [ ] Animations trigger at correct scroll positions
- [ ] Stagger timing feels natural
- [ ] Mobile animations smooth on real devices
- [ ] Works with reduced motion preference
- [ ] No layout shift during animations
- [ ] Portfolio grid wave effect flows nicely
- [ ] All images still load after cleanup
- [ ] No 404s in browser console
- [ ] Vercel deployment size reduced

---

## Success Criteria

1. Subtle "wow factor" without being gimmicky
2. Smooth 60fps animations on mobile
3. ~50MB smaller deployment
4. No duplicate or corrupted images
5. Maintains luxury/elegant brand feel
