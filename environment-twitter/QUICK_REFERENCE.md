# Quick Reference Card - Dark Theme & Green Buttons

## 🎨 Color Codes Cheat Sheet

```
PRIMARY GREEN:    #22C55E  (rgb(34, 197, 94))
DARK GREEN:       #16A34A  (rgb(22, 163, 74))
FOREST GREEN:     #059669  (rgb(5, 150, 105))

DARK BG:          #111827  (rgb(17, 24, 39))
PRIMARY BG:       #1F2937  (rgb(31, 41, 55))
SECONDARY BG:     #374151  (rgb(55, 65, 81))

LIGHT TEXT:       #E5E7EB  (rgb(229, 231, 235))
DARK TEXT:        #9CA3AF  (rgb(156, 163, 175))
```

---

## 🎯 CSS Copy-Paste Snippets

### Green Button Gradient
```css
background: linear-gradient(135deg, #22C55E 0%, #16A34A 100%);
```

### Button Glow Shadow
```css
box-shadow: 0 4px 15px rgba(34, 197, 94, 0.4);
```

### Button Hover State
```css
transform: translateY(-2px);
box-shadow: 0 6px 20px rgba(34, 197, 94, 0.6);
```

### Dark Card Background
```css
background: #1F2937;
border: 1px solid rgba(34, 197, 94, 0.2);
```

### Input Focus
```css
border-color: #22C55E;
box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.1);
```

### Message Bubble (Green)
```css
background: linear-gradient(135deg, #22C55E 0%, #16A34A 100%);
box-shadow: 0 4px 15px rgba(34, 197, 94, 0.3);
```

---

## 📁 Image File Paths

### Avatar Images
```
assets/images/avatar1.svg           (Green gradient)
assets/images/avatar2.svg           (Cyan gradient)
assets/images/avatar3.svg           (Orange gradient)
assets/images/default-avatar.svg    (Default green)
```

### Post Images
```
assets/images/post-nature.svg       (Trees, landscape)
assets/images/post-ocean.svg        (Water, fish)
assets/images/post-solar.svg        (Solar panels)
assets/images/post-recycle.svg      (Waste bins)
```

---

## 🔧 Common CSS Classes

### Buttons
```css
.btn-primary        /* Green gradient button */
.btn-secondary      /* Green outlined button */
.btn-outline        /* Transparent with border */
```

### Cards
```css
.card               /* Dark card with border */
.card:hover         /* Lifted with green border */
```

### Messages
```css
.message.own        /* Your message (green) */
.message.other      /* Received message (dark) */
```

### Inputs
```css
.form-input         /* Dark input field */
.form-input:focus   /* Green border + glow */
```

---

## 📐 Sizing Defaults

```
Avatar Size:        120x120px
Post Image:         500x300px
Button Padding:     8px 16px (or 10px 20px)
Card Padding:       20px
Border Radius:      6px (buttons), 12px (cards), 50% (avatars)
```

---

## ⚡ Quick Modifications

### Change Button Color
```css
/* Replace #22C55E with your color */
background: linear-gradient(135deg, #YOUR_COLOR 0%, #DARKER_VERSION 100%);
```

### Change Button Size
```css
padding: 12px 24px;  /* Larger */
padding: 6px 12px;   /* Smaller */
```

### Change Card Styling
```css
border-radius: 20px;      /* More rounded */
box-shadow: 0 8px 32px;   /* Stronger shadow */
```

---

## 🎬 Animation Timings

```css
Standard Transition:    0.3s ease
Button Lift:           translateY(-2px)
Fade In Animation:     0.3s ease opacity + transform
```

---

## 📱 Responsive Breakpoints

```css
Desktop:     1920px+
Laptop:      1024px - 1920px
Tablet:      768px - 1023px
Mobile:      320px - 767px
```

---

## ✅ Verification Checklist

- [ ] All buttons have green color (#22C55E)
- [ ] All avatars display properly (SVG files)
- [ ] All post images visible (SVG files)
- [ ] Dark background applied (#1F2937)
- [ ] Light text readable (#E5E7EB)
- [ ] Hover effects work smoothly
- [ ] No broken image references
- [ ] Mobile responsive on all sizes
- [ ] No console errors

---

## 🐛 Debugging Tips

### Images Not Showing
```javascript
// Check these in browser console
console.log(document.querySelectorAll('img'));
// Verify paths: assets/images/*.svg
```

### Color Not Applied
```css
/* Make sure to use correct color value */
#22C55E not #1D9E6B (old color)
```

### Button Not Hovering
```css
/* Ensure transition and transform are set */
transition: all 0.3s ease;
transform: translateY(-2px);
```

---

## 📚 File Locations

```
/css
  ├── style.css       (Main styles, dark theme)
  ├── feed.css        (Feed styling)
  ├── profile.css     (Profile styling)
  ├── group.css       (Groups styling)
  └── chat.css        (Chat styling)

/js
  ├── app.js          (Global state + sample data)
  ├── auth.js         (Authentication)
  ├── post.js         (Post creation)
  ├── feed.js         (Feed display)
  ├── profile.js      (Profile page)
  ├── group.js        (Group pages)
  ├── chat.js         (Chat functionality)
  └── utils.js        (Utility functions)

/assets/images
  ├── avatar1.svg           (Avatar)
  ├── avatar2.svg           (Avatar)
  ├── avatar3.svg           (Avatar)
  ├── default-avatar.svg    (Default avatar)
  ├── post-nature.svg       (Post image)
  ├── post-ocean.svg        (Post image)
  ├── post-solar.svg        (Post image)
  └── post-recycle.svg      (Post image)
```

---

## 🚀 Quick Start Commands

```bash
# Open app in browser
index.html

# Check file structure
ls -la assets/images/

# Verify SVG files
ls *.svg

# Test in different browsers
# Chrome, Firefox, Safari, Edge
```

---

## 💡 Pro Tips

1. **Color Consistency**
   - Always use #22C55E for primary green
   - Use #16A34A for darker hover states

2. **Shadow Depth**
   - Smaller shadows for hover (4px)
   - Larger shadows for focus (6px+)

3. **Transitions**
   - Use 0.3s ease for smooth feels
   - Combine with transforms for depth

4. **Images**
   - Always verify SVG files exist before using
   - Check file paths are relative (assets/images/)

5. **Dark Theme**
   - Text should be #E5E7EB or lighter
   - Backgrounds should be #1F2937 or darker

---

## 🔗 Related Documentation

- DARK_THEME_UPDATE.md - Complete theme documentation
- DESIGN_GUIDE.md - Design system details
- VISUAL_REFERENCE.md - Visual styling guide
- CODE_CHANGES_BEFORE_AFTER.md - Detailed code examples
- COMPLETION_CHECKLIST.md - Full feature checklist
- FINAL_SUMMARY.md - Project completion summary

---

## 🎨 Visual Palette Quick View

```
┌──────────────────────────────────────┐
│ PRIMARY GREEN    #22C55E ████ 22C55E │
│ DARK GREEN       #16A34A ████ 16A34A │
│ FOREST GREEN     #059669 ████ 059669 │
│ DARK BG          #1F2937 ████ 1F2937 │
│ LIGHT TEXT       #E5E7EB ████ E5E7EB │
└──────────────────────────────────────┘
```

---

**Quick Reference Ready** ✅
**All Codes Available** ✅
**Ready to Use** ✅

Print this page for quick reference!
