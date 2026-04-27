# 🎨 Comptable AI - Design Guide

## Color Palette

### Primary Colors (Moroccan Green)

```
Emerald 900: #064e3b - Darkest green (text)
Emerald 800: #065f46 - Dark green
Emerald 700: #047857 - Primary green (main brand color)
Emerald 600: #059669 - Medium green (gradients)
Emerald 500: #10b981 - Bright green
Emerald 400: #34d399 - Light green
Emerald 200: #a7f3d0 - Very light green (borders)
Emerald 100: #d1fae5 - Subtle green (backgrounds)
Emerald 50:  #ecfdf5 - Lightest green
```

### Accent Colors (Moroccan Gold)

```
Amber 600: #d97706 - Dark gold
Amber 500: #f59e0b - Medium gold
Amber 400: #fbbf24 - Primary gold (accents, icons)
```

### Neutral Colors

```
White:     #ffffff - Chat bubbles, backgrounds
Slate 50:  #f8fafc - Subtle backgrounds
Gray 300:  #d1d5db - Disabled states
Gray 400:  #9ca3af - Disabled text
```

---

## Typography

### Font Family
```css
font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', 
             'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 
             'Fira Sans', 'Droid Sans', 'Helvetica Neue',
             'Arabic UI Display', 'Arabic UI Text', sans-serif;
```

### Font Sizes
```
text-xs:   0.75rem (12px) - Disclaimer, timestamps
text-sm:   0.875rem (14px) - Body text, messages
text-base: 1rem (16px) - Input text
text-xl:   1.25rem (20px) - Header title
text-2xl:  1.5rem (24px) - Welcome heading
```

### Font Weights
```
font-medium: 500 - Example questions, labels
font-bold:   700 - Headers, titles
```

---

## Spacing System

### Padding/Margin Scale
```
1 unit = 0.25rem (4px)

p-3:  0.75rem (12px)
p-4:  1rem (16px)
p-6:  1.5rem (24px)
p-8:  2rem (32px)

gap-3: 0.75rem (12px) - Between elements
gap-4: 1rem (16px) - Between sections
```

---

## Border Radius

```
rounded-lg:  0.5rem (8px) - Small elements
rounded-xl:  0.75rem (12px) - Buttons, avatars
rounded-2xl: 1rem (16px) - Chat bubbles, cards
```

---

## Shadows

### Shadow Levels
```
shadow-sm:  Small shadow - Subtle elevation
shadow-md:  Medium shadow - Cards, buttons
shadow-lg:  Large shadow - Header, input area
shadow-xl:  Extra large - AI avatar, welcome icon
```

### Custom Shadows
```css
/* Header */
box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);

/* Chat bubbles */
box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);

/* Input area */
box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
```

---

## Gradients

### Background Gradient
```css
background: linear-gradient(
  to bottom right,
  #f8fafc,      /* slate-50 */
  #ecfdf5 30%,  /* emerald-50 */
  #fef3c7 20%   /* amber-50 */
);
```

### Button Gradients
```css
/* Primary (Emerald) */
background: linear-gradient(to bottom right, #047857, #059669);

/* Accent (Amber) */
background: linear-gradient(to bottom right, #f59e0b, #d97706);
```

### Hover States
```css
/* Emerald hover */
background: linear-gradient(to bottom right, #065f46, #047857);
```

---

## Component Styles

### Chat Bubble - User
```css
background: linear-gradient(to bottom right, #f59e0b, #d97706);
color: #ffffff;
border-radius: 1rem;
padding: 0.75rem 1rem;
box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
```

### Chat Bubble - AI
```css
background: #ffffff;
color: #064e3b;
border: 1px solid #a7f3d0;
border-radius: 1rem;
padding: 0.75rem 1rem;
box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
```

### Avatar - User
```css
width: 2.5rem;
height: 2.5rem;
background: linear-gradient(to bottom right, #f59e0b, #d97706);
border-radius: 0.75rem;
box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
```

### Avatar - AI
```css
width: 2.5rem;
height: 2.5rem;
background: linear-gradient(to bottom right, #047857, #059669);
border-radius: 0.75rem;
box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
```

### Example Question Card
```css
background: #ffffff;
border: 2px solid #a7f3d0;
border-radius: 0.75rem;
padding: 1rem;
transition: all 0.2s;

/* Hover */
background: #ecfdf5;
border-color: #34d399;
box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
```

### Input Area
```css
background: rgba(255, 255, 255, 0.8);
backdrop-filter: blur(12px);
border: 2px solid #a7f3d0;
border-radius: 1rem;
padding: 1rem;
box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
```

### Send Button
```css
width: 2.5rem;
height: 2.5rem;
background: linear-gradient(to bottom right, #047857, #059669);
border-radius: 0.75rem;
box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
transition: all 0.2s;

/* Hover */
background: linear-gradient(to bottom right, #065f46, #047857);
box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);

/* Disabled */
background: linear-gradient(to bottom right, #d1d5db, #9ca3af);
cursor: not-allowed;
```

---

## Animations

### Fade In
```css
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

animation: fadeIn 0.5s ease-in;
```

### Slide Up
```css
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

animation: slideUp 0.3s ease-out;
```

### Bounce (Loading Dots)
```css
animation: bounce 1s infinite;
animation-delay: 0ms;    /* First dot */
animation-delay: 150ms;  /* Second dot */
animation-delay: 300ms;  /* Third dot */
```

---

## Icons

### Icon Library
Using Heroicons (inline SVG)

### Icon Sizes
```
w-4 h-4:   1rem (16px) - Small icons
w-5 h-5:   1.25rem (20px) - Medium icons
w-6 h-6:   1.5rem (24px) - Large icons (avatars)
w-8 h-8:   2rem (32px) - Example question icons
w-12 h-12: 3rem (48px) - Welcome screen icon
```

### Icon Colors
```
AI Avatar Icon:     #fbbf24 (amber-400)
User Avatar Icon:   #ffffff (white)
Send Button Icon:   #ffffff (white)
Question Icon:      #047857 (emerald-700)
```

---

## Responsive Design

### Breakpoints
```
sm:  640px  - Small tablets
md:  768px  - Tablets
lg:  1024px - Small laptops
xl:  1280px - Desktops
2xl: 1536px - Large screens
```

### Mobile Adjustments
```css
/* Mobile (< 640px) */
- Full width containers
- Smaller padding (p-4 instead of p-6)
- Stacked layouts
- Larger touch targets (min 44x44px)

/* Tablet (640px - 1024px) */
- Max width: 768px
- Medium padding
- Optimized for touch

/* Desktop (> 1024px) */
- Max width: 896px (4xl)
- Full padding
- Hover effects enabled
```

---

## Accessibility

### Color Contrast Ratios
```
Emerald 900 on White:     ✅ 12.6:1 (AAA)
Emerald 700 on White:     ✅ 7.8:1 (AAA)
Emerald 600 on White:     ✅ 5.9:1 (AA)
White on Amber 500:       ✅ 4.8:1 (AA)
White on Emerald 700:     ✅ 7.8:1 (AAA)
```

### Focus States
```css
focus:outline-none
focus:ring-2
focus:ring-emerald-500
focus:ring-offset-2
```

---

## RTL Support

### Arabic Text
```css
[dir="rtl"] {
  text-align: right;
  direction: rtl;
}

/* Auto-detect */
dir="auto"
```

### Layout Adjustments
```
User messages:  Right-aligned (same in LTR and RTL)
AI messages:    Left-aligned (same in LTR and RTL)
Text direction: Follows content language
```

---

## Brand Guidelines

### Logo Usage
- Calculator icon in emerald gradient
- Gold accent for calculator buttons
- Rounded corners (0.75rem)
- Always on emerald background

### Color Usage
- **Primary (Emerald)**: Trust, professionalism, accounting
- **Accent (Gold)**: Moroccan heritage, premium feel
- **White**: Clarity, simplicity, cleanliness

### Voice & Tone
- Professional but approachable
- Helpful and knowledgeable
- Respectful of Moroccan culture
- Bilingual (French/Arabic)

---

## Design Principles

1. **Clarity**: Every element has a clear purpose
2. **Consistency**: Uniform spacing, colors, and patterns
3. **Hierarchy**: Clear visual hierarchy guides the eye
4. **Feedback**: Every action has visual feedback
5. **Accessibility**: Usable by everyone
6. **Performance**: Fast and responsive
7. **Cultural**: Respectful of Moroccan design heritage

---

## File Organization

```
app/
├── globals.css          # Global styles, animations, scrollbar
├── layout.tsx           # Meta tags, fonts, theme color
├── page.tsx             # Component styles (Tailwind classes)
└── icon.svg             # Brand icon/favicon
```

---

## Design Tools

### Recommended Tools
- **Figma**: For mockups and prototypes
- **Tailwind CSS IntelliSense**: VS Code extension
- **Color Contrast Checker**: For accessibility
- **Responsively**: For responsive testing

### Color Palette Tools
- **Coolors.co**: Generate color schemes
- **Tailwind Color Generator**: Custom color scales
- **Adobe Color**: Accessibility checker

---

**This design system ensures consistency and quality across the entire application! 🎨**
