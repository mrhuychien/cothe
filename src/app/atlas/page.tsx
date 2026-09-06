import type { Metadata } from 'next';
import AtlasExplorer from '@/components/atlas/AtlasExplorer';

export const metadata: Metadata = {
  title: 'Atlas Giải Phẫu 3D | CoThe.Info',
  description:
    'Khám phá 2.234 cấu trúc giải phẫu người trong không gian 3D: bật tắt từng hệ cơ quan, tách rời toàn bộ cơ thể và tra cứu 3.432 khái niệm giải phẫu. Dữ liệu BodyParts3D (CC BY 4.0).',
  keywords: [
    'atlas giải phẫu',
    'giải phẫu 3D',
    'BodyParts3D',
    'human anatomy atlas',
    'cơ thể người 3D',
  ],
  openGraph: {
    title: 'Atlas Giải Phẫu 3D | CoThe.Info',
    description: 'Tách rời cơ thể người thành 2.234 mảnh và khám phá từng cấu trúc trong 3D.',
    type: 'website',
    locale: 'vi_VN',
  },
};

export default function AtlasPage() {
  return <AtlasExplorer />;
}
