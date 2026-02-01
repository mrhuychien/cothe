# 📜 CONTRACT: COTHE.INFO
## Atlas Cơ Thể Số - Interactive 3D Anatomy Platform
### Vibecode Kit v5.0 | Ngày ký: 01/02/2026

---

## 📋 THÔNG TIN DỰ ÁN

| Field | Value |
|-------|-------|
| **Tên dự án** | cothe.info - Atlas Cơ Thể Số |
| **Chủ nhà** | Nguyen Huy Chien (1nguoi.com) |
| **Kiến trúc sư** | Claude (Anthropic) |
| **Ngày bắt đầu** | 01/02/2026 |
| **Deadline** | 03/02/2026 (3 ngày) |
| **Approach** | Fork + Customize |

---

## ✅ DELIVERABLES (Sản phẩm bàn giao)

### 📦 PHASE 1: Core Platform (3 ngày)

| # | Deliverable | Mô tả | Priority |
|---|-------------|-------|----------|
| **1** | **Landing Page** | Hero, Features, How It Works, Parent Info, Footer | 🔴 High |
| **2** | **3D Body Explorer** | Full body 3D model, xoay 360°, zoom, pan | 🔴 High |
| **3** | **6 Body Systems** | Skeletal, Muscular, Circulatory, Digestive, Respiratory, Nervous | 🔴 High |
| **4** | **System Selector** | 6 icon buttons để chọn hệ cơ quan | 🔴 High |
| **5** | **X-Ray Slider** | Thanh trượt điều chỉnh opacity layers | 🔴 High |
| **6** | **Organ Click → Info** | Click bộ phận → Hiện InfoCard với tên + mô tả | 🔴 High |
| **7** | **Info Card Modal** | Tên Việt/Anh, mô tả, fun fact, animated | 🔴 High |
| **8** | **Language Toggle** | Chuyển đổi Việt ↔ Anh, lưu localStorage | 🟡 Medium |
| **9** | **Quiz Game** | "Tìm bộ phận" game với scoring | 🟡 Medium |
| **10** | **Parental Gate** | Math puzzle để vào khu vực phụ huynh | 🟡 Medium |
| **11** | **Responsive Design** | Desktop + Tablet support | 🟡 Medium |
| **12** | **Vercel Deployment** | Production-ready deployment | 🔴 High |

### 📊 DELIVERABLES BREAKDOWN

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  PAGES (4)                                                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│  ✅ / (Landing Page)                                                        │
│  ✅ /kham-pha (3D Explorer)                                                 │
│  ✅ /tro-choi (Quiz Game)                                                   │
│  ✅ /phu-huynh (Parental Area)                                              │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│  COMPONENTS (~35)                                                           │
├─────────────────────────────────────────────────────────────────────────────┤
│  Landing:    Hero, Features, HowItWorks, ParentInfo, Footer (5)            │
│  Explorer:   Layout, Canvas, Model, Selector, Slider, InfoCard... (8)      │
│  Game:       Layout, Quiz, Question, Score, Result (5)                     │
│  Shared:     Button, IconButton, Card, Modal, Gate, Loading, Logo (7)      │
│  3D:         Scene, BaseBody, 6 Systems, Highlight (9)                     │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│  DATA FILES (10)                                                            │
├─────────────────────────────────────────────────────────────────────────────┤
│  ✅ systems.ts (6 systems metadata)                                         │
│  ✅ organs/skeletal.ts                                                      │
│  ✅ organs/muscular.ts                                                      │
│  ✅ organs/circulatory.ts                                                   │
│  ✅ organs/digestive.ts                                                     │
│  ✅ organs/respiratory.ts                                                   │
│  ✅ organs/nervous.ts                                                       │
│  ✅ quiz.ts (quiz questions)                                                │
│  ✅ translations.ts (i18n)                                                  │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│  3D MODELS (7 GLB files)                                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│  ✅ body-base.glb        (Base body mesh)                                   │
│  ✅ skeletal.glb         (Skeleton)                                         │
│  ✅ muscular.glb         (Muscles)                                          │
│  ✅ circulatory.glb      (Heart + vessels)                                  │
│  ✅ digestive.glb        (Stomach, liver, intestines)                       │
│  ✅ respiratory.glb      (Lungs)                                            │
│  ✅ nervous.glb          (Brain + nerves)                                   │
│                                                                             │
│  Source: Sketchfab (free download, CC license)                             │
│  Format: GLB (compressed GLTF)                                              │
│  Max size: 5MB per file                                                     │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🛠️ TECH STACK (Đã thống nhất)

| Layer | Technology | Version |
|-------|------------|---------|
| Framework | Next.js (App Router) | 14.2.x |
| Language | TypeScript | 5.3.x |
| 3D Engine | React Three Fiber + Drei | 8.x / 9.x |
| Styling | Tailwind CSS | 3.4.x |
| Animation | Framer Motion | 10.x |
| State | Zustand | 4.x |
| Icons | Lucide React | 0.303.x |
| Deploy | Vercel | - |

---

## ⚠️ KHÔNG BAO GỒM (Out of Scope - Phase 2)

| # | Item | Lý do | Phase |
|---|------|-------|-------|
| 1 | **Audio/TTS** | Cần thời gian tích hợp FPT.AI | V2 |
| 2 | **Sound Effects** | Cần source audio files | V2 |
| 3 | **Backend/CMS** | Dùng static JSON cho MVP | V2 |
| 4 | **User Authentication** | Không cần cho trẻ em | V2 |
| 5 | **Progress Sync** | Chỉ localStorage | V2 |
| 6 | **6 Hệ còn lại** | Sinh dục, Bạch huyết, Nội tiết... | V2 |
| 7 | **Complex Mini-games** | Kéo thả ghép xương, coloring | V2 |
| 8 | **Mobile App** | Web-first approach | V3 |
| 9 | **Offline Mode** | Service worker | V3 |
| 10 | **Analytics** | Google Analytics, tracking | V2 |

---

## 📅 TIMELINE (3 ngày)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  DAY 1: FOUNDATION (01/02/2026)                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Morning (4h)                                                               │
│  ├── [ ] Project setup (Next.js 14 + TypeScript)                           │
│  ├── [ ] Install dependencies (R3F, Tailwind, Framer, Zustand)            │
│  ├── [ ] Setup Tailwind + CSS variables (design tokens)                    │
│  ├── [ ] Create file structure                                              │
│  └── [ ] Landing page (Hero, Features, Footer)                             │
│                                                                             │
│  Afternoon (4h)                                                             │
│  ├── [ ] R3F Canvas setup với OrbitControls                                │
│  ├── [ ] Download 3D models từ Sketchfab                                   │
│  ├── [ ] Load base body model                                               │
│  ├── [ ] Basic camera controls (rotate, zoom limits)                       │
│  └── [ ] Zustand store setup                                                │
│                                                                             │
│  ✅ DAY 1 CHECKPOINT: Landing page + Basic 3D viewer working              │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│  DAY 2: CORE FEATURES (02/02/2026)                                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Morning (4h)                                                               │
│  ├── [ ] SystemSelector component (6 icons)                                │
│  ├── [ ] Load all 6 system models                                          │
│  ├── [ ] System switching logic (show/hide)                                │
│  ├── [ ] XRaySlider component                                              │
│  └── [ ] Layer opacity transitions                                          │
│                                                                             │
│  Afternoon (4h)                                                             │
│  ├── [ ] Raycasting setup (click detection)                                │
│  ├── [ ] Hover effect (glow/highlight)                                     │
│  ├── [ ] InfoCard modal component                                          │
│  ├── [ ] Click organ → Show info                                           │
│  ├── [ ] Language toggle (VI/EN)                                           │
│  └── [ ] Data files (organs, translations)                                 │
│                                                                             │
│  ✅ DAY 2 CHECKPOINT: Full 3D Explorer working với 6 systems              │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│  DAY 3: POLISH & DEPLOY (03/02/2026)                                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Morning (4h)                                                               │
│  ├── [ ] Quiz game page                                                     │
│  ├── [ ] QuizGame logic (questions, scoring)                               │
│  ├── [ ] Result screen                                                      │
│  ├── [ ] Parental Gate (math puzzle)                                       │
│  └── [ ] Parent settings page                                               │
│                                                                             │
│  Afternoon (4h)                                                             │
│  ├── [ ] Animations & transitions polish                                   │
│  ├── [ ] Responsive design (tablet)                                        │
│  ├── [ ] Loading states & error handling                                   │
│  ├── [ ] Vercel deployment                                                  │
│  ├── [ ] Testing & bug fixes                                                │
│  └── [ ] Final review                                                       │
│                                                                             │
│  ✅ DAY 3 CHECKPOINT: Production deployed on Vercel                        │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🎯 ACCEPTANCE CRITERIA (Tiêu chí nghiệm thu)

### Functional Requirements

| # | Criteria | Test |
|---|----------|------|
| 1 | Landing page hiển thị đúng | Visual check |
| 2 | 3D body load và xoay được | Mouse drag |
| 3 | 6 systems chuyển đổi đúng | Click each icon |
| 4 | X-Ray slider thay đổi opacity | Drag slider |
| 5 | Click organ hiện InfoCard | Click 5 organs |
| 6 | InfoCard hiện đúng tên VI/EN | Check content |
| 7 | Language toggle hoạt động | Switch VI↔EN |
| 8 | Quiz game chạy đúng flow | Play full game |
| 9 | Parental gate chặn đúng | Enter wrong answer |
| 10 | Vercel deploy thành công | Access URL |

### Non-Functional Requirements

| # | Criteria | Target |
|---|----------|--------|
| 1 | Initial load time | < 5 seconds |
| 2 | 3D interaction FPS | > 30fps |
| 3 | Lighthouse Performance | > 70 |
| 4 | Mobile responsive | Tablet OK |
| 5 | No console errors | 0 errors |

---

## 🤝 THỎA THUẬN

### Kiến trúc sư (Claude) cam kết:
- ✅ Deliver đúng timeline 3 ngày
- ✅ Code production-ready, có thể deploy
- ✅ Follow Blueprint và Design System
- ✅ Báo cáo nếu gặp blockers

### Chủ nhà (Chien) cam kết:
- ✅ Review và feedback kịp thời
- ✅ Cung cấp content/assets nếu cần
- ✅ Chấp nhận scope đã thống nhất
- ✅ Phase 2 features sẽ làm sau

### Điều khoản thay đổi:
- Thay đổi nhỏ (text, color): OK trong quá trình build
- Thay đổi lớn (feature, structure): Cần quay lại BLUEPRINT

---

## ✅ XÁC NHẬN

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│   Bằng việc reply "CONFIRM", Chủ nhà xác nhận:                             │
│                                                                             │
│   ☑️  Đã đọc và đồng ý với BLUEPRINT                                        │
│   ☑️  Đã đọc và đồng ý với CONTRACT này                                     │
│   ☑️  Hiểu rõ scope IN và OUT                                               │
│   ☑️  Chấp nhận timeline 3 ngày                                             │
│   ☑️  Sẵn sàng để bắt đầu BUILD                                             │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

**Reply "CONFIRM" để nhận CODER PACK và bắt đầu BUILD!**

---

*Contract được tạo bởi Vibecode Kit v5.0*
*Ngày: 01/02/2026*
