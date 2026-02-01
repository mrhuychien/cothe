# 📘 BLUEPRINT: COTHE.INFO
## Atlas Cơ Thể Số - Interactive 3D Anatomy Platform for Vietnamese Kids
### Vibecode Kit v5.0 | Version 1.0

---

## 📋 PROJECT INFO

| Field | Value |
|-------|-------|
| **Dự án** | cothe.info - Atlas Cơ Thể Số |
| **Loại** | Interactive 3D Educational Platform |
| **Target** | Trẻ em Việt Nam 6-12 tuổi + Phụ huynh |
| **Ngày tạo** | 01/02/2026 |
| **Timeline** | 3 ngày |
| **Approach** | Fork + Customize từ phdevApps/threejs-human-body-v1 |

---

## 🎯 MỤC TIÊU

### Primary Goal
Xây dựng nền tảng giáo dục giải phẫu học tương tác 3D cho trẻ em Việt Nam, lấy cảm hứng từ Innerbody.com nhưng được thiết kế lại hoàn toàn cho đối tượng trẻ em với giao diện trực quan, vui nhộn và song ngữ Việt-Anh.

### Target Audience
- **Primary:** Trẻ em 6-12 tuổi
- **Secondary:** Phụ huynh, giáo viên

### Key Message
> "Khám phá cơ thể kỳ diệu của bạn!"

### Success Metrics
- [ ] Load time < 3 giây
- [ ] Tương tác 3D mượt mà (60fps)
- [ ] Responsive trên Desktop + Tablet
- [ ] Accessible cho trẻ em (large touch targets)

---

## 📐 INFORMATION ARCHITECTURE

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            COTHE.INFO SITEMAP                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  📍 / (Landing Page)                                                        │
│  │                                                                          │
│  ├── Hero Section                                                           │
│  │   • Headline: "Khám phá cơ thể kỳ diệu của bạn!"                        │
│  │   • Subheadline + Animated 3D preview                                   │
│  │   • CTA Button → /kham-pha                                              │
│  │                                                                          │
│  ├── Features Section (3 cards)                                            │
│  │   • 🦴 Khám phá 6 hệ cơ quan                                            │
│  │   • 🎮 Học qua trò chơi                                                 │
│  │   • 🌍 Song ngữ Việt-Anh                                                │
│  │                                                                          │
│  ├── How It Works (3 steps)                                                │
│  │   • Step 1: Chọn hệ cơ quan                                             │
│  │   • Step 2: Khám phá chi tiết                                           │
│  │   • Step 3: Chơi game kiểm tra                                          │
│  │                                                                          │
│  ├── Parent Info Section                                                    │
│  │   • Giới thiệu cho phụ huynh                                            │
│  │   • An toàn & Không quảng cáo                                           │
│  │   • Link → /phu-huynh                                                   │
│  │                                                                          │
│  └── Footer                                                                 │
│      • Logo + Copyright                                                     │
│      • Social links (optional)                                              │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  📍 /kham-pha (3D Body Explorer) ⭐ MAIN FEATURE                           │
│  │                                                                          │
│  ├── Layout Structure                                                       │
│  │   ┌─────────────────────────────────────────────────────────────┐       │
│  │   │  [←Back]              HEADER              [VI|EN] [?Help]   │       │
│  │   ├──────────┬──────────────────────────────────────────────────┤       │
│  │   │          │                                                  │       │
│  │   │  SYSTEM  │              3D CANVAS                           │       │
│  │   │ SELECTOR │         (Full Body Model)                        │       │
│  │   │          │                                                  │       │
│  │   │  🦴 Xương │         [Rotate] [Zoom]                         │       │
│  │   │  💪 Cơ   │                                                  │       │
│  │   │  ❤️ Tim  │                                                  │       │
│  │   │  🍎 Tiêu │                                                  │       │
│  │   │  🌬️ Hô hấp│                                                 │       │
│  │   │  🧠 Não  │                                                  │       │
│  │   │          │                                                  │       │
│  │   ├──────────┴──────────────────────────────────────────────────┤       │
│  │   │              X-RAY SLIDER  ◯━━━━━━━━━━━●                   │       │
│  │   └─────────────────────────────────────────────────────────────┘       │
│  │                                                                          │
│  ├── Interactions                                                           │
│  │   • Hover organ → Highlight (glow effect)                               │
│  │   • Click organ → Open InfoCard modal                                   │
│  │   • Drag → Rotate model                                                 │
│  │   • Scroll/Pinch → Zoom in/out                                          │
│  │   • Slider → Adjust layer opacity (X-Ray effect)                        │
│  │                                                                          │
│  └── InfoCard Modal                                                         │
│      ┌─────────────────────────────────────┐                               │
│      │  ═══════════════════════════ [X]   │                               │
│      │  🦴 HỘP SỌ                          │                               │
│      │  Skull                              │                               │
│      │  ─────────────────────────────────  │                               │
│      │  Cái mũ bảo hiểm tự nhiên bảo vệ   │                               │
│      │  não của bạn!                       │                               │
│      │                                     │                               │
│      │  💡 Bạn có biết?                    │                               │
│      │  ┌─────────────────────────────┐   │                               │
│      │  │ Hộp sọ có 22 mảnh xương    │   │                               │
│      │  │ ghép lại với nhau đấy!      │   │                               │
│      │  └─────────────────────────────┘   │                               │
│      └─────────────────────────────────────┘                               │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  📍 /tro-choi (Quiz Game)                                                  │
│  │                                                                          │
│  ├── Game Flow                                                              │
│  │   1. Hiện câu hỏi: "Tìm [bộ phận]!"                                    │
│  │   2. User click vào 3D body                                             │
│  │   3. Đúng → ✅ +10 điểm + Sound "Ding!"                                 │
│  │   4. Sai → ❌ Sound "Boing" + Gợi ý                                     │
│  │   5. Sau 5-10 câu → Result screen                                       │
│  │                                                                          │
│  └── UI Layout                                                              │
│      ┌─────────────────────────────────────────────────────────────┐       │
│      │  [←Back]         TRÒ CHƠI           ⭐ Điểm: 30            │       │
│      ├─────────────────────────────────────────────────────────────┤       │
│      │                                                             │       │
│      │   ┌─────────────────────────────────────────────────┐      │       │
│      │   │                                                 │      │       │
│      │   │     "Tìm bộ phận bơm máu đi khắp cơ thể!"      │      │       │
│      │   │                                                 │      │       │
│      │   └─────────────────────────────────────────────────┘      │       │
│      │                                                             │       │
│      │                   [3D BODY - Clickable]                    │       │
│      │                                                             │       │
│      │   Câu 3/10                              [💡 Gợi ý]         │       │
│      └─────────────────────────────────────────────────────────────┘       │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  📍 /phu-huynh (Parental Area)                                             │
│  │                                                                          │
│  ├── Parental Gate (Required)                                              │
│  │   ┌─────────────────────────────────────┐                               │
│  │   │   🔒 Khu vực Phụ huynh              │                               │
│  │   │                                     │                               │
│  │   │   Để tiếp tục, hãy giải:           │                               │
│  │   │                                     │                               │
│  │   │        15 + 8 = [___]              │                               │
│  │   │                                     │                               │
│  │   │            [Xác nhận]              │                               │
│  │   └─────────────────────────────────────┘                               │
│  │                                                                          │
│  └── Settings (After Gate)                                                  │
│      • Về dự án cothe.info                                                 │
│      • Chính sách bảo mật                                                  │
│      • Liên hệ                                                              │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🎨 DESIGN SYSTEM

### Color Palette

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  PRIMARY COLORS                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ██████  Primary       #FF6B6B   Soft Red (Tim, CTA)                       │
│  ██████  Secondary     #4ECDC4   Teal (Thần kinh, Accent)                  │
│  ██████  Accent        #FFE66D   Yellow (Năng lượng, Highlights)           │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│  ORGAN COLORS (Stylized - Kid-friendly)                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ██████  Bone          #F5E6D3   Cream                                     │
│  ██████  Muscle        #F093A0   Pink                                      │
│  ██████  Blood/Heart   #E74C3C   Red                                       │
│  ██████  Lung          #A8E6CF   Mint                                      │
│  ██████  Brain         #DDA0DD   Plum                                      │
│  ██████  Stomach       #FFEAA7   Soft Yellow                               │
│  ██████  Intestine     #FDCB6E   Orange                                    │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│  BACKGROUNDS                                                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ██████  BG Primary    #FFF9E6   Warm White                                │
│  ██████  BG Secondary  #F0F4F8   Cool Gray                                 │
│  ██████  BG Dark       #2D3436   Dark (for contrast)                       │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│  FEEDBACK COLORS                                                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ██████  Success       #00B894   Green                                     │
│  ██████  Error         #FF7675   Soft Red                                  │
│  ██████  Warning       #FDCB6E   Yellow                                    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Typography

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  FONT FAMILIES                                                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  DISPLAY FONT: Baloo 2                                                      │
│  ─────────────────────────────────────                                      │
│  Usage: Headings, Titles, CTAs                                              │
│  Weights: 400, 500, 600, 700, 800                                          │
│  Character: Vui nhộn, thân thiện, hỗ trợ tiếng Việt tốt                    │
│                                                                             │
│  Khám phá Cơ thể!                                                          │
│                                                                             │
│  BODY FONT: Nunito                                                          │
│  ─────────────────────────────────────                                      │
│  Usage: Body text, Descriptions, UI elements                                │
│  Weights: 400, 500, 600, 700                                               │
│  Character: Dễ đọc, hiện đại, rounded                                       │
│                                                                             │
│  Trái tim là một máy bơm bằng cơ bắp,                                      │
│  giúp đẩy máu đi khắp cơ thể em.                                           │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│  FONT SIZES (Large for kids)                                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  4xl   64px   Hero headline                                                │
│  3xl   48px   Page titles                                                  │
│  2xl   36px   Section headings                                             │
│  xl    28px   Card titles                                                  │
│  lg    22px   Subheadings                                                  │
│  base  18px   Body text (minimum)                                          │
│  sm    16px   Secondary text                                               │
│  xs    14px   Captions                                                     │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Spacing & Components

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  TOUCH TARGETS (Kid-friendly)                                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Minimum touch target: 48px × 48px                                         │
│  Comfortable:          56px × 56px                                         │
│  Large (recommended):  64px × 64px                                         │
│                                                                             │
│  ┌────────────────┐   ┌────────────────────┐   ┌────────────────────────┐  │
│  │                │   │                    │   │                        │  │
│  │     48px       │   │       56px         │   │         64px           │  │
│  │                │   │                    │   │                        │  │
│  └────────────────┘   └────────────────────┘   └────────────────────────┘  │
│      Minimum              Default                   Recommended             │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│  BORDER RADIUS (Rounded & Friendly)                                         │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ╭──────╮   sm    8px   Small elements                                     │
│  │      │                                                                   │
│  ╰──────╯                                                                   │
│                                                                             │
│  ╭────────────╮   md    12px   Buttons, inputs                             │
│  │            │                                                             │
│  ╰────────────╯                                                             │
│                                                                             │
│  ╭────────────────╮   lg    16px   Cards                                   │
│  │                │                                                         │
│  │                │                                                         │
│  ╰────────────────╯                                                         │
│                                                                             │
│  ╭────────────────────╮   xl    24px   Modals, large cards                 │
│  │                    │                                                     │
│  │                    │                                                     │
│  │                    │                                                     │
│  ╰────────────────────╯                                                     │
│                                                                             │
│  (●)   full   9999px   Pills, avatars                                      │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│  SHADOWS                                                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  sm    0 2px 8px rgba(0,0,0,0.08)     Subtle lift                         │
│  md    0 4px 16px rgba(0,0,0,0.12)    Cards, buttons                      │
│  lg    0 8px 32px rgba(0,0,0,0.16)    Modals, dropdowns                   │
│  glow  0 0 20px rgba(78,205,196,0.4)  Highlight effect                    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Animation Principles

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  MOTION DESIGN                                                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  EASING                                                                     │
│  ─────────────────────────────────────                                      │
│  • ease-bounce:  cubic-bezier(0.68, -0.55, 0.265, 1.55)                    │
│    → Buttons, success states, playful interactions                          │
│                                                                             │
│  • ease-smooth:  cubic-bezier(0.4, 0, 0.2, 1)                              │
│    → Page transitions, modals, sliders                                      │
│                                                                             │
│  DURATIONS                                                                  │
│  ─────────────────────────────────────                                      │
│  • fast:    150ms   Hover states, micro-interactions                       │
│  • normal:  300ms   Most transitions                                        │
│  • slow:    500ms   Page transitions, modals                               │
│                                                                             │
│  KEY ANIMATIONS                                                             │
│  ─────────────────────────────────────                                      │
│  • bounce-in:     Scale 0 → 1.1 → 1 (for InfoCard appear)                  │
│  • pulse-glow:    Box-shadow pulse (for organ highlight)                   │
│  • float:         Y translate up/down (for hero elements)                  │
│  • heartbeat:     Scale pulse (for heart organ)                            │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 💻 TECH STACK

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  TECHNOLOGY STACK                                                           │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  LAYER              TECHNOLOGY              VERSION                         │
│  ─────────────────────────────────────────────────────────────             │
│                                                                             │
│  Framework          Next.js (App Router)    14.2.x                         │
│  Language           TypeScript              5.3.x                          │
│  UI Library         React                   18.2.x                         │
│                                                                             │
│  3D Engine          React Three Fiber       8.15.x                         │
│                     @react-three/drei       9.92.x                         │
│                     Three.js                0.160.x                        │
│                                                                             │
│  Styling            Tailwind CSS            3.4.x                          │
│                     CSS Variables           -                              │
│                                                                             │
│  Animation          Framer Motion           10.18.x                        │
│                                                                             │
│  State              Zustand                 4.4.x                          │
│                     localStorage            -                              │
│                                                                             │
│  Icons              Lucide React            0.303.x                        │
│                                                                             │
│  Utilities          clsx                    2.1.x                          │
│                     tailwind-merge          2.2.x                          │
│                                                                             │
│  Deployment         Vercel                  -                              │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 📁 FILE STRUCTURE

```
cothe-info/
│
├── 📂 app/
│   ├── layout.tsx              # Root layout, fonts, metadata
│   ├── page.tsx                # Landing page (/)
│   ├── globals.css             # Global styles + CSS variables
│   ├── 📂 kham-pha/
│   │   └── page.tsx            # 3D Explorer
│   ├── 📂 tro-choi/
│   │   └── page.tsx            # Quiz game
│   └── 📂 phu-huynh/
│       └── page.tsx            # Parental area
│
├── 📂 components/
│   ├── 📂 landing/             # Landing page components
│   │   ├── Hero.tsx
│   │   ├── Features.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── ParentInfo.tsx
│   │   └── Footer.tsx
│   │
│   ├── 📂 explorer/            # 3D Explorer components
│   │   ├── ExplorerLayout.tsx
│   │   ├── BodyCanvas.tsx
│   │   ├── BodyModel.tsx
│   │   ├── SystemSelector.tsx
│   │   ├── XRaySlider.tsx
│   │   ├── InfoCard.tsx
│   │   ├── LanguageToggle.tsx
│   │   └── Controls.tsx
│   │
│   ├── 📂 game/                # Quiz game components
│   │   ├── GameLayout.tsx
│   │   ├── QuizGame.tsx
│   │   ├── QuestionCard.tsx
│   │   ├── ScoreDisplay.tsx
│   │   └── ResultScreen.tsx
│   │
│   ├── 📂 shared/              # Reusable components
│   │   ├── Button.tsx
│   │   ├── IconButton.tsx
│   │   ├── Card.tsx
│   │   ├── Modal.tsx
│   │   ├── ParentalGate.tsx
│   │   ├── LoadingSpinner.tsx
│   │   └── Logo.tsx
│   │
│   └── 📂 3d/                  # 3D-specific components
│       ├── Scene.tsx
│       ├── BaseBody.tsx
│       ├── SkeletalSystem.tsx
│       ├── MuscularSystem.tsx
│       ├── CirculatorySystem.tsx
│       ├── DigestiveSystem.tsx
│       ├── RespiratorySystem.tsx
│       ├── NervousSystem.tsx
│       └── OrganHighlight.tsx
│
├── 📂 data/
│   ├── systems.ts              # 6 body systems
│   ├── 📂 organs/
│   │   ├── skeletal.ts
│   │   ├── muscular.ts
│   │   ├── circulatory.ts
│   │   ├── digestive.ts
│   │   ├── respiratory.ts
│   │   └── nervous.ts
│   ├── quiz.ts                 # Quiz questions
│   └── translations.ts         # i18n strings
│
├── 📂 hooks/
│   ├── useLanguage.ts
│   ├── useProgress.ts
│   └── useOrganClick.ts
│
├── 📂 stores/
│   └── appStore.ts             # Zustand store
│
├── 📂 lib/
│   ├── constants.ts
│   ├── utils.ts
│   └── cn.ts
│
├── 📂 types/
│   ├── index.ts
│   ├── organ.ts
│   ├── system.ts
│   └── quiz.ts
│
├── 📂 public/
│   ├── 📂 models/              # 3D GLB files
│   │   ├── body-base.glb
│   │   ├── skeletal.glb
│   │   ├── muscular.glb
│   │   ├── circulatory.glb
│   │   ├── digestive.glb
│   │   ├── respiratory.glb
│   │   └── nervous.glb
│   │
│   ├── 📂 images/
│   │   ├── logo.svg
│   │   ├── og-image.png
│   │   └── 📂 icons/
│   │
│   └── favicon.ico
│
├── tailwind.config.ts
├── next.config.js
├── tsconfig.json
└── package.json
```

---

## 🔧 CORE FEATURES

### Feature 1: 3D Body Explorer

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  3D BODY EXPLORER                                                           │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  CONTROLS                                                                   │
│  ─────────────────────────────────────                                      │
│  • Mouse drag / Touch drag → Rotate model                                  │
│  • Scroll wheel / Pinch    → Zoom in/out                                   │
│  • OrbitControls limits    → Prevent flip, min/max zoom                    │
│                                                                             │
│  SYSTEM SELECTOR                                                            │
│  ─────────────────────────────────────                                      │
│  • 6 icon buttons (vertical stack)                                         │
│  • Click → Toggle system visibility                                        │
│  • Active state → Highlight color                                          │
│  • Only one system active at a time (or all)                               │
│                                                                             │
│  X-RAY SLIDER                                                               │
│  ─────────────────────────────────────                                      │
│  • Range: 0% (skin) → 100% (skeleton)                                      │
│  • Adjusts opacity of outer layers                                         │
│  • Smooth transition animation                                              │
│                                                                             │
│  ORGAN INTERACTION                                                          │
│  ─────────────────────────────────────                                      │
│  • Raycasting on mouse/touch                                               │
│  • Hover → Glow effect + cursor change                                     │
│  • Click → Open InfoCard modal                                             │
│  • Each mesh named for identification                                       │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Feature 2: Info Card System

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  INFO CARD MODAL                                                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  CONTENT                                                                    │
│  ─────────────────────────────────────                                      │
│  • Organ name (Vietnamese - large)                                         │
│  • Organ name (English - small)                                            │
│  • Description (kid-friendly language)                                      │
│  • Fun fact (highlight box)                                                 │
│  • Colored border matching organ                                           │
│                                                                             │
│  BEHAVIOR                                                                   │
│  ─────────────────────────────────────                                      │
│  • Animate in from bottom (bounce)                                         │
│  • Click outside or X → Close                                              │
│  • ESC key → Close                                                         │
│  • Positioned at bottom center of viewport                                 │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Feature 3: Quiz Game

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  QUIZ GAME                                                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  GAME FLOW                                                                  │
│  ─────────────────────────────────────                                      │
│  1. Show question: "Tìm [organ name]!"                                     │
│  2. User clicks on 3D body                                                 │
│  3. Check if correct organ clicked                                         │
│     • Correct → Score +10, success sound, next question                    │
│     • Wrong → Error sound, show hint, try again                            │
│  4. After all questions → Show results                                     │
│                                                                             │
│  SCORING                                                                    │
│  ─────────────────────────────────────                                      │
│  • Correct answer: +10 points                                              │
│  • With hint used: +5 points                                               │
│  • Total questions: 5-10                                                   │
│                                                                             │
│  RESULTS SCREEN                                                             │
│  ─────────────────────────────────────                                      │
│  • Total score                                                              │
│  • Star rating (1-3 stars)                                                 │
│  • "Chơi lại" button                                                       │
│  • "Về trang chủ" button                                                   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Feature 4: Language System

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  LANGUAGE TOGGLE (VI ↔ EN)                                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  TOGGLE UI                                                                  │
│  ─────────────────────────────────────                                      │
│  ┌─────────────┐                                                           │
│  │  VI  |  EN  │   ← Pill toggle, active highlighted                       │
│  └─────────────┘                                                           │
│                                                                             │
│  WHAT CHANGES                                                               │
│  ─────────────────────────────────────                                      │
│  • All UI text                                                              │
│  • Organ names                                                              │
│  • Descriptions                                                             │
│  • Quiz questions                                                           │
│  • Hints                                                                    │
│                                                                             │
│  PERSISTENCE                                                                │
│  ─────────────────────────────────────                                      │
│  • Save to localStorage                                                     │
│  • Default: Vietnamese                                                      │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🎮 6 HỆ CƠ QUAN (Body Systems)

| # | System | Vietnamese | Icon | Color | Key Organs |
|---|--------|------------|------|-------|------------|
| 1 | Skeletal | Hệ Xương | 🦴 | #F5E6D3 | Skull, Spine, Ribs, Femur |
| 2 | Muscular | Hệ Cơ | 💪 | #F093A0 | Biceps, Abs, Quadriceps |
| 3 | Circulatory | Hệ Tim Mạch | ❤️ | #E74C3C | Heart, Arteries, Veins |
| 4 | Digestive | Hệ Tiêu Hóa | 🍎 | #FFEAA7 | Stomach, Liver, Intestines |
| 5 | Respiratory | Hệ Hô Hấp | 🌬️ | #A8E6CF | Lungs, Trachea, Diaphragm |
| 6 | Nervous | Hệ Thần Kinh | 🧠 | #DDA0DD | Brain, Spinal Cord, Nerves |

---

## ✅ CHECKPOINT

### Chủ nhà xác nhận:

- [ ] **Structure** - 4 pages (Landing, Explorer, Game, Parent) đúng mong muốn
- [ ] **Design** - Pastel colors, kid-friendly phù hợp
- [ ] **Features** - 3D Explorer, Quiz game, Language toggle đủ cho MVP
- [ ] **Tech Stack** - Next.js + R3F + Tailwind OK
- [ ] **6 Systems** - Đủ cho trẻ em học cơ bản
- [ ] **No Audio** - Audio để Phase 2

### Không thiếu gì quan trọng?

---

**Reply "APPROVED" để tiếp tục sang CONTRACT.**
