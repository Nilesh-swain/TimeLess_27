# Color Palette & Design Guide

## 🎨 Dark Theme Color System

### Primary Colors
```
#111827  - Darkest Background (nearly black)
#1F2937  - Dark Background (primary)
#374151  - Secondary Background (cards, hover)
#4B5563  - Tertiary Background (subtle)
```

### Accent Colors
```
#22C55E  - Vibrant Green (primary accent) ✨
#16A34A  - Dark Green (button hover)
#15803D  - Darker Green (button pressed)
#059669  - Forest Green (alternate)
```

### Text Colors
```
#E5E7EB  - Primary Text (light gray)
#9CA3AF  - Secondary Text (muted gray)
#6B7280  - Tertiary Text (darker gray)
```

### Border Colors
```
rgba(107, 114, 128, 0.2)  - Subtle borders
rgba(34, 197, 94, 0.2)    - Green accent borders
```

## 🎯 Component Styling

### Buttons

#### Primary Button
```css
background: linear-gradient(135deg, #22C55E 0%, #16A34A 100%);
color: white;
box-shadow: 0 4px 15px rgba(34, 197, 94, 0.4);
border-radius: 6-20px;
```

#### On Hover
```css
box-shadow: 0 6px 20px rgba(34, 197, 94, 0.6);
transform: translateY(-2px);
transition: all 0.3s ease;
```

### Message Bubbles

#### Your Messages (Own)
```css
background: linear-gradient(135deg, #22C55E 0%, #16A34A 100%);
color: white;
box-shadow: 0 4px 15px rgba(34, 197, 94, 0.3);
border-radius: 18px;
```

#### Others' Messages
```css
background: #374151;
color: #E5E7EB;
border-radius: 18px;
```

### Form Inputs

#### Focused State
```css
border-color: #22C55E;
box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.1);
```

### Cards & Panels

#### Default
```css
background: #1F2937;
border: 1px solid rgba(107, 114, 128, 0.2);
border-radius: 12px;
```

#### On Hover
```css
box-shadow: 0 4px 15px rgba(34, 197, 94, 0.2);
border-color: #22C55E;
transform: translateY(-2px);
```

## 🖼️ Image Assets

### Avatar SVGs
- **Format:** Scalable Vector Graphics (SVG)
- **Size:** 120x120px
- **Style:** Circular gradient fills
- **Colors:** 
  - Green gradient: #22C55E → #059669
  - Cyan gradient: #06B6D4 → #0891B2
  - Orange gradient: #F59E0B → #D97706

### Post Image SVGs
- **Format:** SVG with detailed illustrations
- **Size:** 500x300px responsive
- **Themes:**
  - Nature: Green landscape with trees
  - Ocean: Blue water with fish and bubbles
  - Solar: Dark background with golden sun
  - Recycle: Colorful waste bins and icons

## 📐 Spacing & Layout

### Standard Padding
```
Small: 8px
Medium: 12-15px
Large: 20px
Extra: 40px
```

### Border Radius
```
Small: 6px (buttons, inputs)
Medium: 12px (cards)
Large: 20px (rounded buttons)
Full: 50% (avatars, perfect circles)
```

### Shadows
```
Small: 0 2px 8px rgba(0, 0, 0, 0.3)
Medium: 0 4px 15px rgba(34, 197, 94, 0.2)
Large: 0 6px 20px rgba(34, 197, 94, 0.3)
```

## ⚡ Transitions & Animations

### Standard Transition
```css
transition: all 0.3s ease;
```

### Button Animations
```css
Hover Lift: transform: translateY(-2px)
Glow Effect: enhanced box-shadow
```

### Slide-In Animation
```css
@keyframes slideIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}
Duration: 0.3s ease
```

## 🌙 Dark Theme Benefits

✅ Reduces eye strain in low-light conditions
✅ Saves battery on OLED/AMOLED screens
✅ Modern, professional appearance
✅ High contrast for accessibility
✅ Vibrant green accents pop against dark
✅ Consistent across all pages
✅ SVG images match theme perfectly

## 🎭 Light Theme Comparison (Original)

**Was:**
- Light (#FFFFFF) backgrounds
- Muted (#1D9E6B) green
- Low contrast borders
- Flat button styling
- Broken image links

**Now:**
- Dark (#1F2937-#111827) backgrounds
- Vibrant (#22C55E) green
- High contrast design
- Gradient button styling
- Working SVG images

## 📱 Responsive Design

All colors and styling scale perfectly on:
- Desktop (1920px+)
- Laptop (1024-1919px)
- Tablet (768-1023px)
- Mobile (320-767px)

SVG images maintain quality at all sizes!

## ✨ Visual Hierarchy

### Primary Focus
- Vibrant green buttons (#22C55E)
- User avatars
- Post content with images
- CTA buttons

### Secondary Focus
- Card backgrounds (#1F2937)
- Text content (#E5E7EB)
- Secondary buttons

### Tertiary Focus
- Borders
- Helper text (#9CA3AF)
- Timestamps

---

**Design System Complete** ✅
**Colors Tested & Verified** ✅
**SVG Images Optimized** ✅
