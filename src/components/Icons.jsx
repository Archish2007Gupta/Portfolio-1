/* ============================================================
   Icons.jsx — Nirmaan 2026 Exact Vector Icons Suite
   ============================================================ */

import React from 'react';

export function ArrowUpRight({ className = '', size = 18 }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M11.25 4.5H4.5V2.8h9.65v9.65h-1.7V5.7L4.95 13.2l-1.2-1.2 7.5-7.5Z" fill="currentColor" />
    </svg>
  );
}

export function GlobeIcon({ className = '', size = 24 }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="2" />
      <path d="M3 12h18M12 2.5c2.7 2.6 4 5.8 4 9.5s-1.3 6.9-4 9.5c-2.7-2.6-4-5.8-4-9.5s1.3-6.9 4-9.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function CloseIcon({ size = 32, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 46 46" fill="none" className={className} aria-hidden="true">
      <path d="M1 1l44 44M45 1 1 45" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

export function DownArrows({ className = '' }) {
  return (
    <svg className={className} width="58" height="42" viewBox="0 0 58 42" fill="none" aria-hidden="true">
      <path className="animate-nudge-right" d="M13.8 1.9v37" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" />
      <path className="animate-nudge-right" d="m25.7 25.1-12 14.8-12-14.8" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
      <path className="animate-nudge-left" d="M47 6.5v28" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" />
      <path className="animate-nudge-left" d="m56 24.1-9 11.2-9-11.2" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function SocialInstagram({ className = '', size = 16 }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export function SocialTwitter({ className = '', size = 16 }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function SocialLinkedin({ className = '', size = 16 }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.6a1.49 1.49 0 1 0 0 2.98 1.49 1.49 0 0 0 0-2.98z" />
    </svg>
  );
}

export function SocialGithub({ className = '', size = 16 }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

export function StarburstIcon({ size = 24, className = '', color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} className={className} aria-hidden="true">
      <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
    </svg>
  );
}
