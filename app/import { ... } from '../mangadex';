import {
  fetchPopularManga,
  fetchLatestChapters,
  getMangaTitle,
  getCoverUrl,
  formatTime,
  type Manga,
  type Chapter,
} from '../mangadex';
import Link from 'next/link';
import Image from 'next/image';

export const revalidate = 60;

export default async function Home() {
  let popular: Manga[] = [];
  let latest: Chapter[] = [];

  try {
    [popular, latest] = await Promise.all([
      fetchPopularManga(18),
      fetchLatestChapters(30),
    ]);
  } catch (e) {
    console.error(e);
  }

  return (
    <main style={{ minHeight: '100vh', background: '#0f0f13', color: '#e8e8f0', fontFamily: 'system-ui, sans-serif' }}>

      {/* Hero */}
      <section style={{ padding: '48px 20px 32px', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <h1 style={{ fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 800, margin: 0, lineHeight: 1.2 }}>
          <span style={{ color: '#ff6b35' }}>Manga</span>
          <span style={{ fontWeight: 300 }}>Flow</span>
        </h1>
        <p style={{ color: '#888899', marginTop: '8px', fontSize: '15px' }}>
          Đọc manga tiếng Việt miễn phí · Powered by MangaDex
        </p>
      </section>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 20px' }}>

        {/* Popular */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: '#ff6b35' }}>🔥</span> Phổ biến nhất
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
            gap: '16px',
          }}>
            {popular.map((manga) => (
              <Link key={manga.id} href={`/manga/${manga.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{
                  background: '#1a1a24',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  border: '1px solid rgba(255,255,255,0.06)',
                  transition: 'transform 0.15s, border-color 0.15s',
                }}
                  onMouseOver={e => {
                    (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)';
                    (e.currentTarget as HTMLDivElement).style.borderColor = '#ff6b35';
                  }}
                  onMouseOut={e => {
                    (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
                    (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.06)';
                  }}
                >
                  <div style={{ position: 'relative', paddingBottom: '140%', background: '#22222e' }}>
                    <Image
                      src={getCoverUrl(manga, 256)}
                      alt={getMangaTitle(manga)}
                      fill
                      sizes="160px"
                      style={{ objectFit: 'cover' }}
                      unoptimized
                    />
                  </div>
                  <div style={{ padding: '10px' }}>
                    <p style={{
                      margin: 0,
                      fontSize: '13px',
                      fontWeight: 600,
                      lineHeight: 1.4,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}>
                      {getMangaTitle(manga)}
                    </p>
                    <p style={{ margin: '4px 0 0', fontSize: '11px', color: '#ff6b35', textTransform: 'capitalize' }}>
                      {manga.attributes.status}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Latest Chapters */}
        <section>
          <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: '#ff6b35' }}>🕐</span> Chương mới nhất
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {latest.map((chapter) => {
              const mangaRel = chapter.relationships.find(r => r.type === 'manga');
              const mangaId = mangaRel?.id;
              const mangaTitle = (mangaRel as any)?.attributes?.title?.vi
                || (mangaRel as any)?.attributes?.title?.en
                || 'Unknown';
              const groupRel = chapter.relationships.find(r => r.type === 'scanlation_group');
              const groupName = (groupRel as any)?.attributes?.name || '';

              return (
                <Link
                  key={chapter.id}
                  href={`/chapter/${chapter.id}`}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <div style={{
                    background: '#1a1a24',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: '8px',
                    padding: '12px 16px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '12px',
                    transition: 'border-color 0.15s, background 0.15s',
                  }}
                    onMouseOver={e => {
                      (e.currentTarget as HTMLDivElement).style.borderColor = '#ff6b35';
                      (e.currentTarget as HTMLDivElement).style.background = '#22222e';
                    }}
                    onMouseOut={e => {
                      (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.06)';
                      (e.currentTarget as HTMLDivElement).style.background = '#1a1a24';
                    }}
                  >
                    <div style={{ minWidth: 0 }}>
                      <p style={{ margin: 0, fontSize: '14px', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {mangaTitle}
                      </p>
                      <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#888899' }}>
                        Chương {chapter.attributes.chapter || '?'}
                        {chapter.attributes.title ? ` · ${chapter.attributes.title}` : ''}
                        {groupName ? ` · ${groupName}` : ''}
                      </p>
                    </div>
                    <span style={{ fontSize: '12px', color: '#555566', whiteSpace: 'nowrap', flexShrink: 0 }}>
                      {formatTime(chapter.attributes.publishAt)}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
