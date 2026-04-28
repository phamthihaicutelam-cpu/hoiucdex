import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: { default: 'MangaFlow', template: '%s | MangaFlow' },
  description: 'Đọc manga tiếng Việt miễn phí - Powered by MangaDex',
  keywords: ['manga', 'đọc manga', 'truyện tranh', 'mangadex', 'tiếng việt'],
  openGraph: {
    title: 'MangaFlow',
    description: 'Đọc manga tiếng Việt miễn phí',
    type: 'website',
  },
  themeColor: '#ff6b35',
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
