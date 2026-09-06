# CoThe.Info - Atlas Cơ Thể Số

Nền tảng giáo dục 3D về cơ thể người cho trẻ em Việt Nam (6-12 tuổi), kèm một
Atlas Giải Phẫu 3D đầy đủ cho học sinh lớn, giáo viên và phụ huynh.

## Tính năng

- **Mô hình 3D Tương tác**: Khám phá cơ thể người với mô hình 3D xoay 360 độ
- **Atlas Giải Phẫu 3D**: 2.234 mảnh giải phẫu riêng biệt, 15 hệ cơ quan bật tắt
  độc lập, tách rời toàn bộ cơ thể thành bảng kiểm kê, tra cứu 3.432 khái niệm
- **6 Hệ Cơ Quan**: Xương, cơ, tim mạch, tiêu hóa, hô hấp, thần kinh
- **Chế Độ X-Ray**: Điều chỉnh độ trong suốt để nhìn xuyên qua các lớp cơ thể
- **Trò Chơi Quiz**: Học mà chơi với các câu đố về cơ thể người
- **Song Ngữ**: Hỗ trợ Tiếng Việt và English
- **Parental Gate**: Xác thực phụ huynh bằng bài toán

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- React Three Fiber (3D ở trang Khám phá)
- three.js thuần (Atlas Giải Phẫu — gộp mesh + texture trạng thái trên GPU)
- Tailwind CSS
- Zustand (State Management)
- Framer Motion (Animations)

## Bắt đầu

```bash
npm install
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000) để xem kết quả.

Kiểm tra trước khi commit:

```bash
npx tsc --noEmit
npm run lint
npm run build
```

## Cấu trúc

- `/` - Trang chủ
- `/kham-pha` - Khám phá cơ thể 3D (dành cho trẻ em)
- `/atlas` - Atlas Giải Phẫu 3D đầy đủ
- `/tro-choi` - Trò chơi quiz

```
src/app/                 Route + layout + globals.css
src/components/atlas/    AtlasScene (three.js thuần) + AtlasExplorer (giao diện)
src/components/3d/       Mô hình 3D đơn giản cho /kham-pha (react-three-fiber)
src/lib/atlas/           Dữ liệu atlas, từ điển & tìm kiếm tiếng Việt, layout tách rời
src/data/                Nội dung song ngữ, hệ cơ quan, câu hỏi quiz
src/stores/              Zustand: ngôn ngữ, explorer, quiz
public/models/           atlas.json + 15 chunk hình học .bin.gz (~32 MB)
```

## Atlas Giải Phẫu 3D

Trang `/atlas` tải khoảng **32 MB** hình học nén ở lần truy cập đầu (15 chunk
`.bin.gz`, giải nén bằng `DecompressionStream` của trình duyệt). Toàn bộ 2.234
lưới được gộp thành vài mesh lớn theo hệ cơ quan; vị trí, ẩn/hiện và trạng thái
chọn của từng mảnh được điều khiển bằng texture trên GPU nên vẫn giữ được 60 FPS
mà không cần hàng nghìn draw call.

Tên cấu trúc trong dữ liệu gốc là tiếng Anh. `src/lib/atlas/vi-anatomy.ts` phủ
thêm một lớp tiếng Việt: tên Việt cho các cơ quan lớn và bộ từ khoá không dấu để
gõ "xương đùi", "phổi", "dạ dày"… vẫn ra đúng cấu trúc.

### Bản quyền dữ liệu

- Hình học: **BodyParts3D 4.0**, © The Database Center for Life Science, giấy phép
  **CC BY 4.0**. Ghi công đầy đủ ở [`public/models/ATTRIBUTION.md`](public/models/ATTRIBUTION.md)
  — phải giữ nguyên khi phân phối lại.
- Mã trình xem port từ [ashemag/human-atlas](https://github.com/ashemag/human-atlas)
  (giấy phép MIT), đổi giao diện sang tông tối và song ngữ của CoThe.Info.

Đây là tài liệu tham khảo giáo dục, **không** dùng cho chẩn đoán hay phẫu thuật.

## Skills cho Claude Code

Xem [`CLAUDE.md`](CLAUDE.md). Skills nằm ở kho
[mrhuychien/claude-skills](https://github.com/mrhuychien/claude-skills):

```
/plugin marketplace add mrhuychien/claude-skills
/plugin install huychien-skills
```

## Tác giả

**Nguyễn Huy Chiến**
- Facebook: [facebook.com/mrhuychien](https://facebook.com/mrhuychien)
- Phone: 0868285585
