import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'CoThe.Info - Atlas Cơ Thể Số cho trẻ em',
  description:
    'Khám phá cơ thể người qua trải nghiệm 3D tương tác. Học về hệ xương, cơ, tim mạch, tiêu hóa, hô hấp và thần kinh.',
  keywords: [
    'cơ thể người',
    'giáo dục trẻ em',
    'sinh học',
    '3D tương tác',
    'human body',
    'kids education',
  ],
  authors: [{ name: 'Nguyễn Huy Chiến' }],
  openGraph: {
    title: 'CoThe.Info - Atlas Cơ Thể Số',
    description: 'Khám phá cơ thể người qua trải nghiệm 3D tương tác',
    type: 'website',
    locale: 'vi_VN',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className="antialiased min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
