# CoThe.Info — hướng dẫn cho Claude Code

Nền tảng giáo dục 3D về cơ thể người cho trẻ em Việt Nam. Next.js 14 (App
Router) + TypeScript + Tailwind + Zustand + Framer Motion + three.js.

## Skills dùng cho dự án này

Skills nằm ở kho riêng **[mrhuychien/claude-skills](https://github.com/mrhuychien/claude-skills)**
(53 skill, có cả bộ web/3D/animation dùng trực tiếp cho repo này). Kho đó vừa là
plugin marketplace vừa được đồng bộ tự động:

```
/plugin marketplace add mrhuychien/claude-skills
/plugin install huychien-skills          # toàn bộ 53 skill
```

- `.claude/settings.json` của repo đã bật sẵn `huychien-skills@claude-skills`;
  chỉ cần chạy lệnh `marketplace add` ở trên **một lần** trên mỗi máy (khai báo
  marketplace từ mạng phải nằm ở user settings, project settings không tự vouch
  được).
- Trên Claude Code on the web, environment đã cài SessionStart hook tự `git clone`
  kho skills vào `~/.claude/skills` mỗi session — không cần làm gì thêm.
- Skill hay dùng khi sửa repo này: `threejs-webgl`, `react-three-fiber`,
  `web3d-integration-patterns`, `modern-web-design`, `ux-ui-design`, `web-perf`,
  `motion-framer`.

## Bố cục mã nguồn

```
src/app/                 Route: / (landing), /kham-pha, /atlas, /tro-choi
src/components/atlas/    Atlas Giải Phẫu 3D — AtlasScene (three.js thuần) + AtlasExplorer (UI)
src/components/3d/       Mô hình 3D đơn giản cho trang /kham-pha (react-three-fiber)
src/lib/atlas/           Dữ liệu & tiện ích cho atlas (anatomy, tìm kiếm tiếng Việt, layout)
src/data/translations.ts Chuỗi song ngữ dùng chung toàn site
src/stores/              Zustand: ngôn ngữ, explorer, quiz
public/models/           atlas.json + 15 chunk hình học .bin.gz (~32 MB, BodyParts3D)
```

## Quy ước

- **Song ngữ VI/EN**: mọi chuỗi hiển thị đi qua `useLanguageStore().t()` hoặc
  `atlasText(language)`. Tiếng Việt là mặc định.
- **Giao diện tối**: nền `slate-950`, nhấn bằng gradient `blue-500 → purple-600`,
  bo góc `rounded-xl/2xl`, kính mờ `backdrop-blur-xl` trên nền `slate-900/80`.
- **3D**: trang `/atlas` dùng three.js THUẦN (gộp mesh + texture trạng thái trên
  GPU) và tách hẳn khỏi lớp React; trang `/kham-pha` dùng react-three-fiber.
  Đừng trộn hai cách trong cùng một cảnh.
- **Không thêm dependency** nếu Tailwind + Framer Motion + lucide-react đã làm được.
- Trước khi commit: `npx tsc --noEmit`, `npm run lint`, `npm run build`.

## Bản quyền dữ liệu

Hình học giải phẫu là **BodyParts3D 4.0 © The Database Center for Life Science,
CC BY 4.0** — phải giữ nguyên phần ghi công trong `public/models/ATTRIBUTION.md`
và trong bảng "Nguồn & phạm vi" của trang `/atlas` khi phân phối lại.
Trình xem gốc: [ashemag/human-atlas](https://github.com/ashemag/human-atlas) (MIT).
