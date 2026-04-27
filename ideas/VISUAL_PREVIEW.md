# 👁️ Comptable AI - Visual Preview

## What You'll See

This document describes the visual appearance of Comptable AI to help you understand what the application looks like.

---

## 🏠 Welcome Screen (Empty State)

```
┌─────────────────────────────────────────────────────────────┐
│  [🧮] Comptable AI                                          │
│      Assistant Comptable Marocain                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│                                                             │
│                        [🧮]                                 │
│                                                             │
│              Bienvenue sur Comptable AI                     │
│                                                             │
│    Votre assistant comptable intelligent basé sur le        │
│           Plan Comptable Marocain                           │
│                                                             │
│                                                             │
│              Questions suggérées :                          │
│                                                             │
│  ┌───────────────────────────────────────────────────┐    │
│  │ [?] Comment calculer la TVA au Maroc ?            │    │
│  └───────────────────────────────────────────────────┘    │
│                                                             │
│  ┌───────────────────────────────────────────────────┐    │
│  │ [?] Quelles sont les obligations fiscales         │    │
│  │     d'une SARL ?                                   │    │
│  └───────────────────────────────────────────────────┘    │
│                                                             │
│  ┌───────────────────────────────────────────────────┐    │
│  │ [?] Quelle est la différence entre l'IS et l'IR ? │    │
│  └───────────────────────────────────────────────────┘    │
│                                                             │
│                                                             │
│  ┌─────────────────────────────────────────────────┐      │
│  │ Posez votre question... اطرح سؤالك        [↑]  │      │
│  └─────────────────────────────────────────────────┘      │
│                                                             │
│    Basé sur le Plan Comptable Marocain et la Loi de        │
│                     Finances                                │
└─────────────────────────────────────────────────────────────┘
```

### Colors:
- **Header**: White background with emerald border
- **AI Icon**: Emerald green gradient with gold calculator icon
- **Example Cards**: White with emerald border, hover → light green
- **Input Area**: White with emerald border
- **Send Button**: Emerald gradient
- **Background**: Soft gradient (slate → emerald → amber)

---

## 💬 Chat Interface (Active Conversation)

```
┌─────────────────────────────────────────────────────────────┐
│  [🧮] Comptable AI                                          │
│      Assistant Comptable Marocain                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  [🧮] ┌─────────────────────────────────────┐             │
│       │ Bonjour! Je suis votre assistant    │             │
│       │ comptable. Comment puis-je vous     │             │
│       │ aider aujourd'hui?                  │             │
│       └─────────────────────────────────────┘             │
│                                                             │
│                          ┌──────────────────────────┐ [👤] │
│                          │ Comment calculer la TVA  │      │
│                          │ au Maroc ?               │      │
│                          └──────────────────────────┘      │
│                                                             │
│  [🧮] ┌─────────────────────────────────────┐             │
│       │ Au Maroc, la TVA se calcule en      │             │
│       │ appliquant le taux approprié        │             │
│       │ (20%, 14%, 10% ou 7%) sur le        │             │
│       │ montant hors taxes...               │             │
│       └─────────────────────────────────────┘             │
│                                                             │
│                          ┌──────────────────────────┐ [👤] │
│                          │ Merci! Et pour une SARL? │      │
│                          └──────────────────────────┘      │
│                                                             │
│  [🧮] ┌─┐                                                  │
│       │●│ (typing...)                                      │
│       └─┘                                                  │
│                                                             │
│  ┌─────────────────────────────────────────────────┐      │
│  │ Posez votre question... اطرح سؤالك        [↑]  │      │
│  └─────────────────────────────────────────────────┘      │
│                                                             │
│    Basé sur le Plan Comptable Marocain et la Loi de        │
│                     Finances                                │
└─────────────────────────────────────────────────────────────┘
```

### Colors:
- **AI Messages**: White background, emerald border, left-aligned
- **User Messages**: Amber gradient, white text, right-aligned
- **AI Avatar**: Emerald gradient with gold calculator icon
- **User Avatar**: Amber gradient with white user icon
- **Loading Dots**: Emerald green, bouncing animation

---

## 📱 Mobile View

```
┌─────────────────────────┐
│ [🧮] Comptable AI       │
│     Assistant Comptable │
├─────────────────────────┤
│                         │
│ [🧮] ┌────────────────┐ │
│      │ Bonjour! Je    │ │
│      │ suis votre     │ │
│      │ assistant...   │ │
│      └────────────────┘ │
│                         │
│      ┌──────────┐ [👤] │
│      │ Comment  │      │
│      │ calculer │      │
│      │ la TVA?  │      │
│      └──────────┘      │
│                         │
│ [🧮] ┌────────────────┐ │
│      │ Au Maroc, la   │ │
│      │ TVA se calcule │ │
│      │ en appliquant  │ │
│      │ le taux...     │ │
│      └────────────────┘ │
│                         │
│ ┌─────────────────────┐ │
│ │ Question...   [↑]  │ │
│ └─────────────────────┘ │
│                         │
│ Basé sur le Plan        │
│ Comptable Marocain      │
└─────────────────────────┘
```

### Mobile Optimizations:
- Stacked layout
- Full-width messages
- Larger touch targets
- Optimized font sizes
- Compact spacing

---

## 🎨 Color Swatches

### Primary Palette
```
████ Emerald 700 (#047857) - Main brand color
████ Emerald 600 (#059669) - Gradients
████ Emerald 500 (#10b981) - Accents
████ Emerald 200 (#a7f3d0) - Borders
████ Emerald 100 (#d1fae5) - Backgrounds
████ Emerald 50  (#ecfdf5) - Subtle backgrounds
```

### Accent Palette
```
████ Amber 600 (#d97706) - Dark gold
████ Amber 500 (#f59e0b) - Medium gold
████ Amber 400 (#fbbf24) - Primary gold
```

### Neutral Palette
```
████ White (#ffffff) - Backgrounds
████ Slate 50 (#f8fafc) - Subtle backgrounds
████ Gray 400 (#9ca3af) - Disabled states
```

---

## 🎭 Component States

### Button States
```
Normal:   [  Send  ]  ← Emerald gradient
Hover:    [  Send  ]  ← Darker emerald, shadow
Disabled: [  Send  ]  ← Gray, no pointer
Active:   [  Send  ]  ← Pressed effect
```

### Input States
```
Empty:    [ Type here...           ]  ← Placeholder visible
Typing:   [ Comment calculer...    ]  ← Text visible
Focus:    [ Comment calculer...    ]  ← Border highlighted
Disabled: [ Type here...           ]  ← Grayed out
```

### Message States
```
Sending:  Message slides up, appears on right
Waiting:  ● ● ● (bouncing dots)
Received: Message slides up, appears on left
Error:    Red border, error icon
```

---

## 🌈 Visual Hierarchy

### Size Hierarchy
```
1. Welcome Icon (largest)
   ↓
2. Header Title
   ↓
3. Welcome Message
   ↓
4. Example Questions
   ↓
5. Chat Messages
   ↓
6. Input Text
   ↓
7. Disclaimer (smallest)
```

### Color Hierarchy
```
1. Emerald Green (primary attention)
   ↓
2. Amber Gold (secondary attention)
   ↓
3. White (content)
   ↓
4. Gray (supporting text)
```

---

## ✨ Animation Preview

### Message Appear
```
Frame 1: [          ]  (invisible, below)
Frame 2: [    ▁     ]  (fading in, moving up)
Frame 3: [   ▂▂▂    ]  (more visible)
Frame 4: [  ▃▃▃▃▃   ]  (almost there)
Frame 5: [ ▄▄▄▄▄▄▄  ]  (fully visible)
```

### Loading Dots
```
Frame 1: ●  ○  ○
Frame 2: ○  ●  ○
Frame 3: ○  ○  ●
Frame 4: ○  ●  ○
(repeats)
```

### Hover Effect
```
Normal: [ Example Question ]
        ↓
Hover:  [ Example Question ]  ← Lifts up, shadow grows
        ↓
Click:  [ Example Question ]  ← Presses down
```

---

## 🖼️ Layout Grid

### Desktop Layout (> 1024px)
```
┌─────────────────────────────────────────────────────────┐
│                      Header (full width)                │
├─────────────────────────────────────────────────────────┤
│                                                         │
│    ┌───────────────────────────────────────────┐      │
│    │                                           │      │
│    │         Content (max-width: 896px)       │      │
│    │              (centered)                   │      │
│    │                                           │      │
│    └───────────────────────────────────────────┘      │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Mobile Layout (< 640px)
```
┌─────────────────────┐
│   Header (full)     │
├─────────────────────┤
│                     │
│  Content (full)     │
│                     │
│                     │
│                     │
└─────────────────────┘
```

---

## 🎯 Visual Focus Points

### Primary Focus
1. **AI Avatar** - First thing users see
2. **Welcome Message** - Clear value proposition
3. **Example Questions** - Immediate call to action

### Secondary Focus
1. **Input Area** - Where users interact
2. **Send Button** - Action button
3. **Chat Messages** - Conversation history

### Tertiary Focus
1. **Header** - Branding
2. **Disclaimer** - Legal information
3. **Scrollbar** - Navigation

---

## 📐 Spacing System

```
Tight:    4px   (0.25rem) - Between related items
Normal:   8px   (0.5rem)  - Default spacing
Relaxed:  12px  (0.75rem) - Between messages
Loose:    16px  (1rem)    - Between sections
Extra:    24px  (1.5rem)  - Major sections
```

---

## 🎨 Design Mood Board

**Keywords:**
- Professional
- Trustworthy
- Moroccan
- Modern
- Clean
- Minimal
- Friendly
- Intelligent

**Inspiration:**
- Moroccan architecture (green tiles, gold accents)
- Modern fintech apps (clean, professional)
- Premium chat interfaces (smooth, polished)
- Accounting software (trustworthy, organized)

---

**This visual guide helps you understand the look and feel of Comptable AI! 👁️**
