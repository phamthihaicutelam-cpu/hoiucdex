import type { Metadata } from 'next';
import './globals.css';
import Navbar from '../Navbar';

export const metadata: Metadata = {
  title: { default: 'MangaFlow', template: '%s | MangaFlow' },
  description: 'Đọc manga tiếng Việt miễn phí - Powered by MangaDex',
  keywords: ['manga', 'đọc manga', 'truyện tranh', 'mangadex', 'tiếng việt'],
  openGraph: {
    title: 'MangaFlow',
    description: 'Đọc manga tiếng Việt miễn phí',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
