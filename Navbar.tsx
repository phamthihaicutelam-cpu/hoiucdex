'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// FIX: file này phải đặt ở src/components/Navbar.tsx (không phải src/Navbar.tsx)
// để layout.tsx import @/components/Navbar hoạt động đúng

export default function Navbar() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  }, [query, router]);

  return (
    <nav style={{
      background: 'rgba(15,15,19,0.95)',
      borderBottom: '1px solid rgba(255,255,255,0.08)',
      padding: '0 20px',
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      height: '56px',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backdropFilter: 'blur(12px)',
    }}>
      <Link href="/" style={{ textDecoration: 'none' }}>
        <span style={{ fontSize: '22px', fontWeight: 800, color: '#ff6b35', letterSpacing: '-0.5px' }}>
          HoiUC<span style={{ color: '#e8e8f0', fontWeight: 300 }}>Dex</span>
        </span>
      </Link>

      <form onSubmit={handleSearch} style={{ flex: 1, maxWidth: '480px', position: 'relative' }}>
        <svg style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', opacity: 0.4, width: 16, height: 16 }}
          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Tìm kiếm manga..."
          style={{
            width: '100%',
            background: '#22222e',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '8px',
            padding: '8px 16px 8px 40px',
            color: '#e8e8f0',
            fontSize: '14px',
            outline: 'none',
          }}
          onFocus={e => (e.target.style.borderColor = '#ff6b35')}
          onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.08)')}
        />
      </form>

      <div style={{ display: 'flex', gap: '4px', marginLeft: 'auto' }}>
        {[
          { href: '/', label: 'Trang chủ' },
          { href: '/genre', label: 'Thể loại' },
          { href: '/ranking', label: 'Xếp hạng' },
          { href: '/latest', label: 'Mới nhất' },
        ].map(({ href, label }) => (
          <Link key={href} href={href} style={{
            padding: '6px 12px',
            borderRadius: '6px',
            fontSize: '13px',
            color: '#888899',
            textDecoration: 'none',
            transition: 'all 0.15s',
          }}
            onMouseOver={e => {
              (e.currentTarget as HTMLAnchorElement).style.background = '#22222e';
              (e.currentTarget as HTMLAnchorElement).style.color = '#e8e8f0';
            }}
            onMouseOut={e => {
              (e.currentTarget as HTMLAnchorElement).style.background = 'transparent';
              (e.currentTarget as HTMLAnchorElement).style.color = '#888899';
            }}>
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
