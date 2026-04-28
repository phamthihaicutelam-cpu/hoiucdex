import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'HoiUCDex',
  description: 'Nơi đọc truyện với giao diện đơn giản hơn.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
