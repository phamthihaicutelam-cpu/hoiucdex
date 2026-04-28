// src/app/api/mangadex/route.ts
// Proxy all MangaDex requests server-side to avoid CORS issues

import { NextRequest, NextResponse } from 'next/server';

const BASE = 'https://api.mangadex.org';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const endpoint = searchParams.get('endpoint') || 'manga';
  
  // Remove our internal 'endpoint' param before forwarding
  searchParams.delete('endpoint');

  const upstreamUrl = `${BASE}/${endpoint}?${searchParams.toString()}`;

  try {
    const res = await fetch(upstreamUrl, {
      headers: {
        'User-Agent': 'MangaFlow/1.0 (https://github.com/user/mangaflow)',
        'Content-Type': 'application/json',
      },
      next: { revalidate: 60 }, // Cache 60 seconds
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `MangaDex API error: ${res.status}` },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
      },
    });
  } catch (err) {
    console.error('[MangaDex Proxy Error]', err);
    return NextResponse.json({ error: 'Proxy error' }, { status: 500 });
  }
}
