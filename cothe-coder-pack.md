# ═══════════════════════════════════════════════════════════════════════════════
#                            🔧 CODER PACK
#                     COTHE.INFO - Atlas Cơ Thể Số
#            Interactive 3D Anatomy Platform for Vietnamese Kids
# ═══════════════════════════════════════════════════════════════════════════════
#
#  📋 HƯỚNG DẪN:
#  1. Copy TOÀN BỘ file này → Paste vào Claude Code / Cursor
#  2. Trả lời nơi lưu project
#  3. Ngồi chờ code được tạo
#
#  ⏱️ TIMELINE: 3 ngày
#  🎯 APPROACH: Fork + Customize từ phdevApps/threejs-human-body-v1
#
# ═══════════════════════════════════════════════════════════════════════════════

---

## 🎭 VAI TRÒ

Bạn là **THỢ XÂY** trong hệ thống Vibecode Kit v5.0.

Kiến trúc sư và Chủ nhà đã **THỐNG NHẤT** bản vẽ dưới đây cho dự án **cothe.info** - một nền tảng giáo dục giải phẫu học tương tác 3D dành cho trẻ em Việt Nam.

### QUY TẮC TUYỆT ĐỐI:
1. ❌ KHÔNG thay đổi kiến trúc / layout đã định
2. ❌ KHÔNG thêm features không có trong Blueprint
3. ❌ KHÔNG đổi tech stack
4. ✅ Gặp conflict → BÁO CÁO, không tự quyết định
5. ✅ Ưu tiên code CHẠY ĐƯỢC trước, đẹp sau
6. ✅ Comment code bằng tiếng Việt khi cần thiết

---

## 🚀 BẮT ĐẦU

### Bước 1: Clone Base Project
```bash
git clone https://github.com/phdevApps/threejs-human-body-v1.git cothe-info
cd cothe-info
npm install --legacy-peer-deps
```

### Bước 2: Chuyển sang Next.js 14 (App Router)
Vì base project dùng Vite + React, cần migrate sang Next.js để có:
- Better SEO
- App Router
- Server Components
- Easy Vercel deploy

### Bước 3: Implement theo Blueprint bên dưới

---

## 📘 BLUEPRINT CHI TIẾT

### 1. PROJECT INFO

| Field | Value |
|-------|-------|
| Tên dự án | cothe.info - Atlas Cơ Thể Số |
| Loại | Interactive 3D Educational Platform |
| Target | Trẻ em Việt Nam 6-12 tuổi |
| Timeline | 3 ngày |
| Deploy | Vercel |

---

### 2. MỤC TIÊU

**Primary Goal:** Tạo website giáo dục giải phẫu học tương tác cho trẻ em Việt Nam
**Target Audience:** Trẻ em 6-12 tuổi + Phụ huynh
**Key Message:** "Khám phá cơ thể kỳ diệu của bạn!"

---

### 3. INFORMATION ARCHITECTURE

```
cothe.info/
│
├── / (Landing Page)
│   ├── Hero Section - "Khám phá cơ thể kỳ diệu!"
│   ├── Features Preview - 3 tính năng chính
│   ├── How It Works - 3 bước đơn giản
│   ├── Parent Info - Thông tin cho phụ huynh
│   └── CTA → /kham-pha
│
├── /kham-pha (3D Body Explorer) ⭐ MAIN FEATURE
│   ├── 3D Canvas (center) - Full body model
│   ├── System Selector (left) - 6 icons hệ cơ quan
│   ├── X-Ray Slider (bottom) - Thanh trượt layer
│   ├── Language Toggle (top-right) - Việt/Anh
│   ├── Info Card Modal (overlay) - Chi tiết bộ phận
│   └── Back to Home button
│
├── /tro-choi (Quiz Game)
│   ├── Question Display - "Tìm [bộ phận]!"
│   ├── 3D Body (clickable) - Click để trả lời
│   ├── Score Counter - Điểm số
│   ├── Timer (optional) - Đếm ngược
│   └── Result Screen - Kết quả + Chơi lại
│
└── /phu-huynh (Parental Gate → Settings)
    ├── Math Puzzle Gate - "15 + 8 = ?"
    ├── Content Settings - Bật/tắt nội dung
    └── About Section - Về dự án
```

---

### 4. DESIGN SYSTEM

#### 4.1 Colors (Pastel Cartoon - Kid-friendly)

```css
:root {
  /* === PRIMARY PALETTE === */
  --color-primary: #FF6B6B;        /* Soft Red - Tim */
  --color-primary-light: #FF8E8E;
  --color-primary-dark: #E85555;
  
  --color-secondary: #4ECDC4;      /* Teal - Thần kinh */
  --color-secondary-light: #7EDDD6;
  --color-secondary-dark: #3DBDB5;
  
  --color-accent: #FFE66D;         /* Yellow - Năng lượng */
  --color-accent-light: #FFED9E;
  --color-accent-dark: #F5D84D;
  
  /* === ORGAN COLORS (Stylized) === */
  --color-bone: #F5E6D3;           /* Cream - Xương */
  --color-bone-highlight: #FFF8F0;
  
  --color-muscle: #F093A0;         /* Pink - Cơ */
  --color-muscle-highlight: #FFB3BE;
  
  --color-blood: #E74C3C;          /* Red - Máu */
  --color-blood-light: #FF7675;
  
  --color-lung: #A8E6CF;           /* Mint - Phổi */
  --color-lung-light: #C8F7E4;
  
  --color-brain: #DDA0DD;          /* Plum - Não */
  --color-brain-light: #E8C1E8;
  
  --color-stomach: #FFEAA7;        /* Soft Yellow - Dạ dày */
  --color-stomach-light: #FFF4CC;
  
  --color-intestine: #FDCB6E;      /* Orange - Ruột */
  
  /* === BACKGROUNDS === */
  --color-bg-primary: #FFF9E6;     /* Warm White */
  --color-bg-secondary: #F0F4F8;   /* Cool Gray */
  --color-bg-dark: #2D3436;        /* Dark mode */
  --color-bg-gradient: linear-gradient(135deg, #FFF9E6 0%, #E8F4FD 100%);
  
  /* === TEXT === */
  --color-text-primary: #2D3436;
  --color-text-secondary: #636E72;
  --color-text-light: #B2BEC3;
  --color-text-inverse: #FFFFFF;
  
  /* === FEEDBACK === */
  --color-success: #00B894;
  --color-success-light: #55EFC4;
  --color-error: #FF7675;
  --color-error-light: #FFAB9F;
  --color-warning: #FDCB6E;
  
  /* === SHADOWS === */
  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.08);
  --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.12);
  --shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.16);
  --shadow-glow: 0 0 20px rgba(78, 205, 196, 0.4);
}
```

#### 4.2 Typography

```css
/* Google Fonts Import */
@import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;500;600;700;800&family=Nunito:wght@400;500;600;700&display=swap');

:root {
  /* === FONT FAMILIES === */
  --font-display: 'Baloo 2', cursive;   /* Headings - Vui nhộn */
  --font-body: 'Nunito', sans-serif;    /* Body - Dễ đọc */
  
  /* === FONT SIZES (Large for kids) === */
  --text-xs: 0.875rem;    /* 14px */
  --text-sm: 1rem;        /* 16px */
  --text-base: 1.125rem;  /* 18px - minimum for body */
  --text-lg: 1.375rem;    /* 22px */
  --text-xl: 1.75rem;     /* 28px */
  --text-2xl: 2.25rem;    /* 36px */
  --text-3xl: 3rem;       /* 48px */
  --text-4xl: 4rem;       /* 64px */
  
  /* === LINE HEIGHTS === */
  --leading-tight: 1.2;
  --leading-normal: 1.5;
  --leading-relaxed: 1.8;
  
  /* === FONT WEIGHTS === */
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
  --font-extrabold: 800;
}
```

#### 4.3 Spacing & Sizing

```css
:root {
  /* === SPACING === */
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-5: 1.5rem;    /* 24px */
  --space-6: 2rem;      /* 32px */
  --space-8: 3rem;      /* 48px */
  --space-10: 4rem;     /* 64px */
  --space-12: 6rem;     /* 96px */
  
  /* === TOUCH TARGETS (Kid-friendly - Large) === */
  --touch-min: 48px;
  --touch-comfortable: 56px;
  --touch-large: 64px;
  
  /* === ICON SIZES === */
  --icon-sm: 24px;
  --icon-md: 32px;
  --icon-lg: 40px;
  --icon-xl: 56px;
  
  /* === BORDER RADIUS (Rounded & Friendly) === */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --radius-2xl: 32px;
  --radius-full: 9999px;
  
  /* === Z-INDEX === */
  --z-base: 0;
  --z-dropdown: 100;
  --z-sticky: 200;
  --z-modal: 300;
  --z-tooltip: 400;
  --z-toast: 500;
}
```

#### 4.4 Motion & Animation

```css
:root {
  /* === EASING === */
  --ease-linear: linear;
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
  --ease-elastic: cubic-bezier(0.68, -0.6, 0.32, 1.6);
  
  /* === DURATIONS === */
  --duration-fast: 150ms;
  --duration-normal: 300ms;
  --duration-slow: 500ms;
  --duration-slower: 700ms;
}

/* === KEYFRAMES === */
@keyframes bounce-in {
  0% { transform: scale(0); opacity: 0; }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); opacity: 1; }
}

@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 0 0 rgba(78, 205, 196, 0.4); }
  50% { box-shadow: 0 0 20px 10px rgba(78, 205, 196, 0.2); }
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

@keyframes heartbeat {
  0%, 100% { transform: scale(1); }
  25% { transform: scale(1.1); }
  50% { transform: scale(1); }
  75% { transform: scale(1.05); }
}
```

---

### 5. TECH STACK

```
┌─────────────────────────────────────────────────────────────────────┐
│  FRONTEND FRAMEWORK                                                 │
├─────────────────────────────────────────────────────────────────────┤
│  • Next.js 14 (App Router)                                         │
│  • TypeScript                                                       │
│  • React 18                                                         │
├─────────────────────────────────────────────────────────────────────┤
│  3D ENGINE                                                          │
├─────────────────────────────────────────────────────────────────────┤
│  • React Three Fiber (@react-three/fiber)                          │
│  • Drei (@react-three/drei) - Helpers                              │
│  • Three.js (underlying)                                            │
├─────────────────────────────────────────────────────────────────────┤
│  STYLING                                                            │
├─────────────────────────────────────────────────────────────────────┤
│  • Tailwind CSS 3.4                                                │
│  • CSS Variables (Design tokens)                                    │
│  • Framer Motion (Animations)                                       │
├─────────────────────────────────────────────────────────────────────┤
│  STATE MANAGEMENT                                                   │
├─────────────────────────────────────────────────────────────────────┤
│  • Zustand (Lightweight)                                            │
│  • localStorage (Progress persistence)                              │
├─────────────────────────────────────────────────────────────────────┤
│  UTILITIES                                                          │
├─────────────────────────────────────────────────────────────────────┤
│  • Lucide React (Icons)                                             │
│  • clsx + tailwind-merge (Class utilities)                         │
├─────────────────────────────────────────────────────────────────────┤
│  DEPLOYMENT                                                         │
├─────────────────────────────────────────────────────────────────────┤
│  • Vercel                                                           │
│  • Edge CDN                                                         │
└─────────────────────────────────────────────────────────────────────┘
```

**Package.json dependencies:**
```json
{
  "dependencies": {
    "next": "14.2.x",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "@react-three/fiber": "^8.15.0",
    "@react-three/drei": "^9.92.0",
    "three": "^0.160.0",
    "zustand": "^4.4.0",
    "framer-motion": "^10.18.0",
    "lucide-react": "^0.303.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.2.0"
  },
  "devDependencies": {
    "typescript": "^5.3.0",
    "@types/react": "^18.2.0",
    "@types/node": "^20.10.0",
    "@types/three": "^0.160.0",
    "tailwindcss": "^3.4.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0"
  }
}
```

---

### 6. FILE STRUCTURE

```
cothe-info/
├── app/
│   ├── layout.tsx                 # Root layout + fonts + metadata
│   ├── page.tsx                   # Landing page (/)
│   ├── globals.css                # Global styles + CSS variables
│   │
│   ├── kham-pha/
│   │   └── page.tsx               # 3D Explorer (/kham-pha)
│   │
│   ├── tro-choi/
│   │   └── page.tsx               # Quiz game (/tro-choi)
│   │
│   └── phu-huynh/
│       └── page.tsx               # Parental area (/phu-huynh)
│
├── components/
│   ├── landing/
│   │   ├── Hero.tsx               # Hero section với CTA
│   │   ├── Features.tsx           # 3 features cards
│   │   ├── HowItWorks.tsx         # 3 steps
│   │   ├── ParentInfo.tsx         # Info cho phụ huynh
│   │   └── Footer.tsx             # Footer đơn giản
│   │
│   ├── explorer/
│   │   ├── ExplorerLayout.tsx     # Layout wrapper
│   │   ├── BodyCanvas.tsx         # R3F Canvas + Scene setup
│   │   ├── BodyModel.tsx          # 3D body với tất cả systems
│   │   ├── SystemSelector.tsx     # Sidebar với 6 icons
│   │   ├── XRaySlider.tsx         # Opacity slider control
│   │   ├── InfoCard.tsx           # Modal hiện info organ
│   │   ├── LanguageToggle.tsx     # Việt/Anh switcher
│   │   └── Controls.tsx           # Zoom, rotate controls
│   │
│   ├── game/
│   │   ├── GameLayout.tsx         # Game wrapper
│   │   ├── QuizGame.tsx           # Main game logic
│   │   ├── QuestionCard.tsx       # Hiện câu hỏi
│   │   ├── ScoreDisplay.tsx       # Điểm số
│   │   └── ResultScreen.tsx       # Kết quả cuối
│   │
│   ├── shared/
│   │   ├── Button.tsx             # Button component
│   │   ├── IconButton.tsx         # Icon-only button
│   │   ├── Card.tsx               # Card wrapper
│   │   ├── Modal.tsx              # Modal component
│   │   ├── ParentalGate.tsx       # Math puzzle gate
│   │   ├── LoadingSpinner.tsx     # Loading state
│   │   └── Logo.tsx               # cothe.info logo
│   │
│   └── 3d/
│       ├── Scene.tsx              # Scene setup (lights, env)
│       ├── BaseBody.tsx           # Base body mesh
│       ├── SkeletalSystem.tsx     # Hệ xương
│       ├── MuscularSystem.tsx     # Hệ cơ
│       ├── CirculatorySystem.tsx  # Hệ tim mạch
│       ├── DigestiveSystem.tsx    # Hệ tiêu hóa
│       ├── RespiratorySystem.tsx  # Hệ hô hấp
│       ├── NervousSystem.tsx      # Hệ thần kinh
│       └── OrganHighlight.tsx     # Highlight effect khi hover
│
├── data/
│   ├── systems.ts                 # 6 hệ cơ quan metadata
│   ├── organs/
│   │   ├── skeletal.ts            # Dữ liệu xương
│   │   ├── muscular.ts            # Dữ liệu cơ
│   │   ├── circulatory.ts         # Dữ liệu tim mạch
│   │   ├── digestive.ts           # Dữ liệu tiêu hóa
│   │   ├── respiratory.ts         # Dữ liệu hô hấp
│   │   └── nervous.ts             # Dữ liệu thần kinh
│   ├── quiz.ts                    # Câu hỏi quiz
│   └── translations.ts            # i18n strings
│
├── hooks/
│   ├── useLanguage.ts             # Language hook
│   ├── useProgress.ts             # Progress localStorage
│   └── useOrganClick.ts           # Click handling 3D
│
├── stores/
│   └── appStore.ts                # Zustand store
│
├── lib/
│   ├── constants.ts               # App constants
│   ├── utils.ts                   # Utility functions
│   └── cn.ts                      # clsx + tailwind-merge
│
├── types/
│   ├── index.ts                   # Type exports
│   ├── organ.ts                   # Organ types
│   ├── system.ts                  # System types
│   └── quiz.ts                    # Quiz types
│
├── public/
│   ├── models/
│   │   ├── body-base.glb          # Base body mesh
│   │   ├── skeletal.glb           # Skeleton model
│   │   ├── muscular.glb           # Muscles model
│   │   ├── circulatory.glb        # Heart + vessels
│   │   ├── digestive.glb          # Digestive organs
│   │   ├── respiratory.glb        # Lungs model
│   │   └── nervous.glb            # Brain + nerves
│   │
│   ├── images/
│   │   ├── logo.svg               # cothe.info logo
│   │   ├── og-image.png           # Open Graph image
│   │   └── icons/                 # System icons
│   │       ├── bone.svg
│   │       ├── muscle.svg
│   │       ├── heart.svg
│   │       ├── stomach.svg
│   │       ├── lungs.svg
│   │       └── brain.svg
│   │
│   └── favicon.ico
│
├── tailwind.config.ts
├── next.config.js
├── tsconfig.json
└── package.json
```

---

### 7. DATA STRUCTURES

#### 7.1 System Type (types/system.ts)
```typescript
export interface BodySystem {
  id: string;
  name: {
    vi: string;
    en: string;
  };
  description: {
    vi: string;
    en: string;
  };
  icon: string;           // Icon name from lucide-react or custom
  color: string;          // CSS variable name
  modelPath: string;      // Path to GLB file
  organs: string[];       // Array of organ IDs
}
```

#### 7.2 Organ Type (types/organ.ts)
```typescript
export interface Organ {
  id: string;
  meshName: string;       // Name in 3D model for raycasting
  systemId: string;       // Parent system
  name: {
    vi: string;
    en: string;
  };
  description: {
    vi: string;
    en: string;
  };
  funFact: {
    vi: string;
    en: string;
  };
  position?: [number, number, number];  // 3D position override
  color: string;
}
```

#### 7.3 Quiz Type (types/quiz.ts)
```typescript
export interface QuizQuestion {
  id: string;
  organId: string;        // Target organ to find
  question: {
    vi: string;
    en: string;
  };
  hint?: {
    vi: string;
    en: string;
  };
  difficulty: 'easy' | 'medium' | 'hard';
  systemId: string;       // Which system this belongs to
}
```

#### 7.4 Zustand Store (stores/appStore.ts)
```typescript
interface AppState {
  // Language
  language: 'vi' | 'en';
  setLanguage: (lang: 'vi' | 'en') => void;
  
  // Current view state
  activeSystem: string | null;
  setActiveSystem: (systemId: string | null) => void;
  
  // Layer opacity (0-1)
  layerOpacity: number;
  setLayerOpacity: (opacity: number) => void;
  
  // Selected organ
  selectedOrgan: string | null;
  setSelectedOrgan: (organId: string | null) => void;
  
  // Info card visibility
  isInfoCardOpen: boolean;
  openInfoCard: () => void;
  closeInfoCard: () => void;
  
  // Quiz state
  quizScore: number;
  quizCurrentQuestion: number;
  incrementScore: () => void;
  nextQuestion: () => void;
  resetQuiz: () => void;
  
  // Parental gate
  isParentVerified: boolean;
  verifyParent: () => void;
}
```

---

### 8. SAMPLE DATA

#### 8.1 Systems Data (data/systems.ts)
```typescript
import { BodySystem } from '@/types/system';

export const bodySystems: BodySystem[] = [
  {
    id: 'skeletal',
    name: { vi: 'Hệ Xương', en: 'Skeletal System' },
    description: {
      vi: 'Bộ khung giúp cơ thể đứng vững và bảo vệ các cơ quan bên trong',
      en: 'The framework that supports your body and protects internal organs'
    },
    icon: 'Bone',
    color: 'var(--color-bone)',
    modelPath: '/models/skeletal.glb',
    organs: ['skull', 'spine', 'ribcage', 'pelvis', 'femur', 'tibia', 'humerus', 'radius']
  },
  {
    id: 'muscular',
    name: { vi: 'Hệ Cơ', en: 'Muscular System' },
    description: {
      vi: 'Hơn 600 cơ giúp bạn cử động, chạy nhảy và cười',
      en: 'Over 600 muscles help you move, run, jump and smile'
    },
    icon: 'Dumbbell',
    color: 'var(--color-muscle)',
    modelPath: '/models/muscular.glb',
    organs: ['biceps', 'triceps', 'quadriceps', 'hamstrings', 'abs', 'pectorals']
  },
  {
    id: 'circulatory',
    name: { vi: 'Hệ Tim Mạch', en: 'Circulatory System' },
    description: {
      vi: 'Tim bơm máu đi khắp cơ thể qua các mạch máu',
      en: 'The heart pumps blood throughout your body via blood vessels'
    },
    icon: 'Heart',
    color: 'var(--color-blood)',
    modelPath: '/models/circulatory.glb',
    organs: ['heart', 'aorta', 'veins', 'arteries']
  },
  {
    id: 'digestive',
    name: { vi: 'Hệ Tiêu Hóa', en: 'Digestive System' },
    description: {
      vi: 'Biến thức ăn thành năng lượng cho cơ thể hoạt động',
      en: 'Turns food into energy for your body to function'
    },
    icon: 'Cookie',
    color: 'var(--color-stomach)',
    modelPath: '/models/digestive.glb',
    organs: ['mouth', 'esophagus', 'stomach', 'liver', 'small-intestine', 'large-intestine']
  },
  {
    id: 'respiratory',
    name: { vi: 'Hệ Hô Hấp', en: 'Respiratory System' },
    description: {
      vi: 'Giúp bạn hít thở không khí và cung cấp oxy cho cơ thể',
      en: 'Helps you breathe air and provides oxygen to your body'
    },
    icon: 'Wind',
    color: 'var(--color-lung)',
    modelPath: '/models/respiratory.glb',
    organs: ['nose', 'trachea', 'lungs', 'diaphragm']
  },
  {
    id: 'nervous',
    name: { vi: 'Hệ Thần Kinh', en: 'Nervous System' },
    description: {
      vi: 'Não và dây thần kinh điều khiển mọi hoạt động của cơ thể',
      en: 'The brain and nerves control all activities of your body'
    },
    icon: 'Brain',
    color: 'var(--color-brain)',
    modelPath: '/models/nervous.glb',
    organs: ['brain', 'spinal-cord', 'nerves']
  }
];
```

#### 8.2 Sample Organ Data (data/organs/skeletal.ts)
```typescript
import { Organ } from '@/types/organ';

export const skeletalOrgans: Organ[] = [
  {
    id: 'skull',
    meshName: 'Skull_mesh',
    systemId: 'skeletal',
    name: { vi: 'Hộp Sọ', en: 'Skull' },
    description: {
      vi: 'Cái mũ bảo hiểm tự nhiên bảo vệ não của bạn!',
      en: 'A natural helmet that protects your brain!'
    },
    funFact: {
      vi: 'Hộp sọ được tạo thành từ 22 mảnh xương ghép lại với nhau đấy!',
      en: 'The skull is made of 22 bones joined together!'
    },
    color: 'var(--color-bone)'
  },
  {
    id: 'spine',
    meshName: 'Spine_mesh',
    systemId: 'skeletal',
    name: { vi: 'Cột Sống', en: 'Spine' },
    description: {
      vi: 'Chuỗi xương giúp bạn đứng thẳng và cúi người',
      en: 'A chain of bones that helps you stand tall and bend'
    },
    funFact: {
      vi: 'Cột sống có 33 đốt xương xếp chồng lên nhau như chồng gạch LEGO!',
      en: 'The spine has 33 bones stacked like LEGO bricks!'
    },
    color: 'var(--color-bone)'
  },
  {
    id: 'ribcage',
    meshName: 'Ribs_mesh',
    systemId: 'skeletal',
    name: { vi: 'Lồng Ngực', en: 'Rib Cage' },
    description: {
      vi: 'Chiếc lồng xương bảo vệ tim và phổi của bạn',
      en: 'A bone cage that protects your heart and lungs'
    },
    funFact: {
      vi: 'Bạn có 12 cặp xương sườn - tổng cộng là 24 chiếc!',
      en: 'You have 12 pairs of ribs - that\'s 24 bones!'
    },
    color: 'var(--color-bone)'
  },
  {
    id: 'femur',
    meshName: 'Femur_mesh',
    systemId: 'skeletal',
    name: { vi: 'Xương Đùi', en: 'Femur' },
    description: {
      vi: 'Xương dài nhất và khỏe nhất trong cơ thể bạn',
      en: 'The longest and strongest bone in your body'
    },
    funFact: {
      vi: 'Xương đùi cứng hơn cả bê tông đấy!',
      en: 'The femur is stronger than concrete!'
    },
    color: 'var(--color-bone)'
  }
];
```

#### 8.3 Quiz Data (data/quiz.ts)
```typescript
import { QuizQuestion } from '@/types/quiz';

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    organId: 'heart',
    question: {
      vi: 'Tìm bộ phận bơm máu đi khắp cơ thể!',
      en: 'Find the organ that pumps blood throughout your body!'
    },
    hint: {
      vi: 'Nó nằm ở giữa ngực và đập thình thịch',
      en: 'It\'s in the middle of your chest and goes thump-thump'
    },
    difficulty: 'easy',
    systemId: 'circulatory'
  },
  {
    id: 'q2',
    organId: 'skull',
    question: {
      vi: 'Đâu là chiếc mũ bảo hiểm bảo vệ não?',
      en: 'Which is the helmet that protects the brain?'
    },
    difficulty: 'easy',
    systemId: 'skeletal'
  },
  {
    id: 'q3',
    organId: 'lungs',
    question: {
      vi: 'Tìm bộ phận giúp bạn hít thở!',
      en: 'Find the organs that help you breathe!'
    },
    hint: {
      vi: 'Có 2 cái, nằm trong lồng ngực',
      en: 'There are 2 of them, inside your chest'
    },
    difficulty: 'easy',
    systemId: 'respiratory'
  },
  {
    id: 'q4',
    organId: 'stomach',
    question: {
      vi: 'Đâu là túi nhào trộn thức ăn?',
      en: 'Which is the bag that mixes food?'
    },
    difficulty: 'medium',
    systemId: 'digestive'
  },
  {
    id: 'q5',
    organId: 'brain',
    question: {
      vi: 'Tìm "siêu máy tính" điều khiển cơ thể!',
      en: 'Find the "supercomputer" that controls your body!'
    },
    difficulty: 'easy',
    systemId: 'nervous'
  }
];
```

---

### 9. KEY COMPONENTS CODE

#### 9.1 BodyCanvas.tsx
```tsx
'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import { Suspense } from 'react';
import Scene from '@/components/3d/Scene';
import BodyModel from './BodyModel';
import LoadingSpinner from '@/components/shared/LoadingSpinner';

export default function BodyCanvas() {
  return (
    <div className="w-full h-full min-h-[500px] bg-gradient-to-b from-sky-100 to-white rounded-2xl overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        shadows
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <Scene />
          <BodyModel />
          <ContactShadows
            position={[0, -1.5, 0]}
            opacity={0.4}
            scale={10}
            blur={2}
          />
          <Environment preset="city" />
        </Suspense>
        <OrbitControls
          enablePan={false}
          minDistance={2}
          maxDistance={8}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
    </div>
  );
}
```

#### 9.2 SystemSelector.tsx
```tsx
'use client';

import { motion } from 'framer-motion';
import { useAppStore } from '@/stores/appStore';
import { bodySystems } from '@/data/systems';
import { cn } from '@/lib/cn';
import * as Icons from 'lucide-react';

export default function SystemSelector() {
  const { language, activeSystem, setActiveSystem } = useAppStore();

  return (
    <div className="flex flex-col gap-3 p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg">
      <h3 className="text-lg font-bold text-gray-800 font-display">
        {language === 'vi' ? 'Hệ Cơ Quan' : 'Body Systems'}
      </h3>
      
      <div className="flex flex-col gap-2">
        {bodySystems.map((system, index) => {
          const IconComponent = Icons[system.icon as keyof typeof Icons] as React.FC<{ className?: string }>;
          const isActive = activeSystem === system.id;
          
          return (
            <motion.button
              key={system.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setActiveSystem(isActive ? null : system.id)}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-xl transition-all',
                'hover:scale-105 active:scale-95',
                isActive
                  ? 'bg-primary text-white shadow-lg'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              )}
              style={{
                backgroundColor: isActive ? system.color : undefined
              }}
            >
              {IconComponent && <IconComponent className="w-6 h-6" />}
              <span className="font-medium">
                {system.name[language]}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
```

#### 9.3 InfoCard.tsx
```tsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useAppStore } from '@/stores/appStore';
import { getOrganById } from '@/data/organs';

export default function InfoCard() {
  const { 
    language, 
    selectedOrgan, 
    isInfoCardOpen, 
    closeInfoCard 
  } = useAppStore();

  const organ = selectedOrgan ? getOrganById(selectedOrgan) : null;

  if (!organ) return null;

  return (
    <AnimatePresence>
      {isInfoCardOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-md"
        >
          <div 
            className="bg-white rounded-3xl shadow-2xl overflow-hidden"
            style={{ borderTop: `4px solid ${organ.color}` }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-gray-50">
              <div>
                <h2 className="text-2xl font-bold font-display text-gray-800">
                  {organ.name[language]}
                </h2>
                <p className="text-sm text-gray-500">
                  {organ.name[language === 'vi' ? 'en' : 'vi']}
                </p>
              </div>
              <button
                onClick={closeInfoCard}
                className="p-2 hover:bg-gray-200 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            {/* Content */}
            <div className="p-4 space-y-4">
              <p className="text-lg text-gray-700">
                {organ.description[language]}
              </p>
              
              {/* Fun Fact */}
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-xl">
                <p className="text-sm font-semibold text-yellow-800 mb-1">
                  {language === 'vi' ? '💡 Bạn có biết?' : '💡 Did you know?'}
                </p>
                <p className="text-yellow-900">
                  {organ.funFact[language]}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

#### 9.4 XRaySlider.tsx
```tsx
'use client';

import { useAppStore } from '@/stores/appStore';
import { Eye, EyeOff } from 'lucide-react';

export default function XRaySlider() {
  const { language, layerOpacity, setLayerOpacity } = useAppStore();

  return (
    <div className="flex items-center gap-4 px-6 py-4 bg-white/80 backdrop-blur-sm rounded-full shadow-lg">
      <EyeOff className="w-5 h-5 text-gray-400" />
      
      <div className="flex-1">
        <input
          type="range"
          min="0"
          max="100"
          value={layerOpacity * 100}
          onChange={(e) => setLayerOpacity(Number(e.target.value) / 100)}
          className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-6
            [&::-webkit-slider-thumb]:h-6
            [&::-webkit-slider-thumb]:bg-primary
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:shadow-lg
            [&::-webkit-slider-thumb]:cursor-pointer
            [&::-webkit-slider-thumb]:transition-transform
            [&::-webkit-slider-thumb]:hover:scale-110"
        />
      </div>
      
      <Eye className="w-5 h-5 text-primary" />
      
      <span className="text-sm font-medium text-gray-600 min-w-[60px]">
        {language === 'vi' ? 'Tia X' : 'X-Ray'}
      </span>
    </div>
  );
}
```

---

### 10. 3D MODEL REQUIREMENTS

#### Cần tìm và download từ Sketchfab/CGTrader:

| Model | Yêu cầu | Gợi ý search |
|-------|---------|--------------|
| **body-base.glb** | Low-poly body, stylized | "low poly human body cartoon" |
| **skeletal.glb** | Skeleton với separate meshes | "human skeleton anatomy" |
| **muscular.glb** | Muscles overlay | "human muscles 3d" |
| **circulatory.glb** | Heart + blood vessels | "heart circulatory system" |
| **digestive.glb** | Stomach, intestines, liver | "digestive system 3d" |
| **respiratory.glb** | Lungs + trachea | "lungs respiratory" |
| **nervous.glb** | Brain + spinal cord | "brain nervous system" |

**Quan trọng:**
- Format: GLB (binary GLTF)
- Size: < 5MB mỗi file
- Style: Cartoon/Stylized hoặc Semi-realistic
- License: CC-BY hoặc Free download
- Meshes phải được đặt tên rõ ràng (để raycasting)

---

### 11. DEPLOYMENT CHECKLIST

```bash
# 1. Build production
npm run build

# 2. Test locally
npm run start

# 3. Deploy to Vercel
vercel --prod

# Hoặc connect GitHub repo và auto-deploy
```

**Vercel Settings:**
- Framework Preset: Next.js
- Build Command: `npm run build`
- Output Directory: `.next`
- Node.js Version: 18.x

---

### 12. IMPLEMENTATION ORDER

```
DAY 1 (Foundation)
├── [ ] Setup Next.js 14 project
├── [ ] Install dependencies
├── [ ] Setup Tailwind + CSS variables
├── [ ] Create file structure
├── [ ] Landing page (Hero, Features, Footer)
├── [ ] Setup R3F Canvas
├── [ ] Load placeholder 3D model
└── [ ] Basic camera controls

DAY 2 (Core Features)
├── [ ] Download 3D models từ Sketchfab
├── [ ] Implement SystemSelector
├── [ ] Implement XRaySlider
├── [ ] Raycasting click detection
├── [ ] InfoCard modal
├── [ ] Language toggle
├── [ ] Zustand store
└── [ ] Connect all components

DAY 3 (Polish & Deploy)
├── [ ] Quiz game implementation
├── [ ] Parental gate
├── [ ] Animations & transitions
├── [ ] Responsive design
├── [ ] Loading states
├── [ ] Error handling
├── [ ] Vercel deployment
└── [ ] Testing & bug fixes
```

---

## ✅ SAU KHI HOÀN THÀNH

```
✅ Đã tạo xong [số] files
📁 Location: [path]

Để chạy:
1. cd [path]
2. npm install
3. npm run dev
4. Mở http://localhost:3000

Để deploy:
1. vercel login
2. vercel --prod
```

---

# ═══════════════════════════════════════════════════════════════════════════════
#                           END OF CODER PACK
#                        COTHE.INFO - Atlas Cơ Thể Số
#                           Vibecode Kit v5.0
# ═══════════════════════════════════════════════════════════════════════════════
