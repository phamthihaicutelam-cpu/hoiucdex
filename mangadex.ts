// lib/mangadex.ts
// All API calls go through our /api/mangadex proxy to avoid CORS

export const MANGADEX_BASE = 'https://api.mangadex.org';
export const COVER_BASE = 'https://uploads.mangadex.org/covers';
export const LOCAL_PROXY = '/api/mangadex';

export interface MangaTitle {
  en?: string;
  ja?: string;
  'ja-ro'?: string;
  vi?: string;
  [key: string]: string | undefined;
}

export interface CoverArt {
  id: string;
  type: 'cover_art';
  attributes: { fileName: string; volume?: string };
}

export interface AuthorRel {
  id: string;
  type: 'author' | 'artist';
  attributes?: { name: string };
}

export interface MangaAttributes {
  title: MangaTitle;
  altTitles: MangaTitle[];
  description: { en?: string; vi?: string; [key: string]: string | undefined };
  status: 'ongoing' | 'completed' | 'hiatus' | 'cancelled';
  year?: number;
  contentRating: string;
  tags: Array<{ id: string; attributes: { name: { en: string } } }>;
  lastChapter?: string;
  lastVolume?: string;
  updatedAt: string;
}

export interface Manga {
  id: string;
  type: 'manga';
  attributes: MangaAttributes;
  relationships: Array<CoverArt | AuthorRel | { id: string; type: string }>;
}

export interface ChapterAttributes {
  title?: string;
  volume?: string;
  chapter?: string;
  translatedLanguage: string;
  pages: number;
  publishAt: string;
  updatedAt: string;
  externalUrl?: string;
}

export interface Chapter {
  id: string;
  type: 'chapter';
  attributes: ChapterAttributes;
  relationships: Array<{ id: string; type: string; attributes?: { name: string; website?: string } }>;
}

// ─── helpers ────────────────────────────────────────────────────────────────

export function getMangaTitle(manga: Manga): string {
  const t = manga.attributes.title;
  return t.vi || t.en || t['ja-ro'] || t.ja || Object.values(t).find(Boolean) || 'Unknown';
}

export function getMangaDescription(manga: Manga): string {
  const d = manga.attributes.description;
  return d.vi || d.en || Object.values(d).find(Boolean) || '';
}

export function getCoverUrl(manga: Manga, size: 256 | 512 = 256): string {
  const cover = manga.relationships.find((r): r is CoverArt => r.type === 'cover_art');
  if (!cover || !('attributes' in cover) || !cover.attributes?.fileName) return '/placeholder.jpg';
  return `${COVER_BASE}/${manga.id}/${cover.attributes.fileName}.${size}.jpg`;
}

export function getAuthor(manga: Manga): string {
  const author = manga.relationships.find(
    (r): r is AuthorRel => r.type === 'author' && 'attributes' in r && !!r.attributes
  ) as AuthorRel | undefined;
  return author?.attributes?.name || '';
}

export function getGenres(manga: Manga): string[] {
  return manga.attributes.tags
    .filter(t => t.attributes?.name?.en)
    .map(t => t.attributes.name.en)
    .slice(0, 5);
}

export function formatTime(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins} phút trước`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} giờ trước`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days} ngày trước`;
  return new Date(dateStr).toLocaleDateString('vi-VN');
}

// ─── API fetchers ────────────────────────────────────────────────────────────

export async function fetchPopularManga(limit = 18): Promise<Manga[]> {
  const params = new URLSearchParams({
    limit: String(limit),
    'contentRating[]': 'safe',
    'order[followedCount]': 'desc',
    'includes[]': 'cover_art',
    'includes[1]': 'author',
  });
  const res = await fetch(`${LOCAL_PROXY}?${params}`);
  if (!res.ok) throw new Error('Failed to fetch popular manga');
  const data = await res.json();
  return data.data ?? [];
}

export async function fetchLatestChapters(limit = 30): Promise<Chapter[]> {
  const params = new URLSearchParams({
    limit: String(limit),
    'translatedLanguage[]': 'vi',
    'contentRating[]': 'safe',
    'order[publishAt]': 'desc',
    'includes[]': 'manga',
    'includes[1]': 'scanlation_group',
  });
  const res = await fetch(`${LOCAL_PROXY}?endpoint=chapter&${params}`);
  if (!res.ok) throw new Error('Failed to fetch latest chapters');
  const data = await res.json();
  return data.data ?? [];
}

export async function fetchMangaDetail(id: string): Promise<Manga> {
  const params = new URLSearchParams({
    'includes[]': 'cover_art',
    'includes[1]': 'author',
    'includes[2]': 'artist',
  });
  const res = await fetch(`${LOCAL_PROXY}?endpoint=manga/${id}&${params}`);
  if (!res.ok) throw new Error('Failed to fetch manga detail');
  const data = await res.json();
  return data.data;
}

export async function fetchMangaChapters(mangaId: string, offset = 0): Promise<{ chapters: Chapter[]; total: number }> {
  const params = new URLSearchParams({
    'translatedLanguage[]': 'vi',
    limit: '100',
    offset: String(offset),
    'order[chapter]': 'desc',
    'includes[]': 'scanlation_group',
  });
  const res = await fetch(`${LOCAL_PROXY}?endpoint=manga/${mangaId}/feed&${params}`);
  if (!res.ok) throw new Error('Failed to fetch chapters');
  const data = await res.json();
  return { chapters: data.data ?? [], total: data.total ?? 0 };
}

export async function fetchChapterPages(chapterId: string): Promise<{ baseUrl: string; chapter: { hash: string; data: string[]; dataSaver: string[] } }> {
  const res = await fetch(`${LOCAL_PROXY}?endpoint=at-home/server/${chapterId}`);
  if (!res.ok) throw new Error('Failed to fetch chapter pages');
  return res.json();
}

export async function searchManga(query: string, limit = 20): Promise<Manga[]> {
  const params = new URLSearchParams({
    title: query,
    limit: String(limit),
    'contentRating[]': 'safe',
    'includes[]': 'cover_art',
  });
  const res = await fetch(`${LOCAL_PROXY}?${params}`);
  if (!res.ok) throw new Error('Search failed');
  const data = await res.json();
  return data.data ?? [];
}
