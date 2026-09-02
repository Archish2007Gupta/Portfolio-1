/* ============================================================
   Preloader.jsx — Editorial Loading Screen
   ============================================================
   Shows a short "system boot" animation when the site loads:
   archisha. → 01 DESIGN → 02 CODE → 03 CREATE → LOADING 0–100
   
   BEGINNER TIP:
   - useState: stores values that change over time (like progress)
   - useEffect: runs code when the component first appears
   - setTimeout: delays code execution by N milliseconds
   ============================================================ */

import React, { useState, useEffect } from 'react';

export default function Preloader({ onComplete }) {
  // `progress` goes from 0 to 100 to animate the counter
  const [progress, setProgress] = useState(0);
  // `phase` controls which text block is visible
  const [phase, setPhase] = useState(0);
  // `exiting` triggers the slide-up exit animation
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    // Phase 1: Show brand name (already visible at phase 0)
    // Phase 2: Show the three words at 400ms
    const t1 = setTimeout(() => setPhase(1), 400);
    // Phase 3: Start the counter at 900ms
    const t2 = setTimeout(() => setPhase(2), 900);

    // Animate the counter from 0 → 100
    const t3 = setTimeout(() => {
      let count = 0;
      const interval = setInterval(() => {
        count += 2; // increment by 2 each tick
        setProgress(count);
        if (count >= 100) {
          clearInterval(interval);
          // Start exit animation after counter finishes
          setTimeout(() => setExiting(true), 300);
          // Tell parent component we're done after exit animation
          setTimeout(() => onComplete(), 900);
        }
      }, 20); // 20ms per tick = ~1 second total
    }, 1000);

    // Cleanup: clear all timeouts if component unmounts early
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  return (
    <div style={{
      ...styles.overlay,
      transform: exiting ? 'translateY(-100%)' : 'translateY(0)',
    }}>
      <div style={styles.content}>
        {/* Brand Name */}
        <h1 style={{
          ...styles.brand,
          opacity: phase >= 0 ? 1 : 0,
          transform: phase >= 0 ? 'translateY(0)' : 'translateY(20px)',
        }}>
          archisha.
        </h1>

        {/* Three Words with colored blocks */}
        <div style={{
          ...styles.words,
          opacity: phase >= 1 ? 1 : 0,
          transform: phase >= 1 ? 'translateY(0)' : 'translateY(15px)',
        }}>
          {['DESIGN', 'CODE', 'CREATE'].map((word, i) => (
            <div key={word} style={styles.wordRow}>
              <span style={{
                ...styles.wordBlock,
                backgroundColor: [
                  'var(--accent-blue)',
                  'var(--accent-yellow)',
                  'var(--accent-red)',
                ][i],
                transitionDelay: `${i * 100}ms`,
              }} />
              <span style={styles.wordText}>0{i + 1} {word}</span>
            </div>
          ))}
        </div>

        {/* Loading Counter */}
        <div style={{
          ...styles.counter,
          opacity: phase >= 2 ? 1 : 0,
        }}>
          <span style={styles.loadingLabel}>LOADING</span>
          <span style={styles.counterNumber}>
            {String(progress).padStart(3, '0')}
          </span>
        </div>

        {/* Progress Bar */}
        <div style={styles.progressTrack}>
          <div style={{
            ...styles.progressFill,
            width: `${progress}%`,
          }} />
        </div>
      </div>
    </div>
  );
}

/* --- Inline Styles --- */
/* Using inline styles here keeps the preloader self-contained */
const styles = {
  overlay: {
    position: 'fixed',
    inset: 0,
    zIndex: 9999,
    backgroundColor: '#11110F',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'transform 0.6s cubic-bezier(0.76, 0, 0.24, 1)',
  },
  content: {
    textAlign: 'center',
    color: '#F5EEE4',
  },
  brand: {
    fontFamily: "'Syne', sans-serif",
    fontSize: 'clamp(2rem, 6vw, 3.5rem)',
    fontWeight: 800,
    letterSpacing: '-0.03em',
    marginBottom: '32px',
    transition: 'all 0.5s ease',
  },
  words: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginBottom: '40px',
    transition: 'all 0.5s ease',
  },
  wordRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
  },
  wordBlock: {
    width: '28px',
    height: '8px',
    borderRadius: '4px',
    transition: 'all 0.4s ease',
  },
  wordText: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '0.75rem',
    letterSpacing: '0.15em',
    fontWeight: 500,
  },
  counter: {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'center',
    gap: '12px',
    marginBottom: '16px',
    transition: 'opacity 0.4s ease',
  },
  loadingLabel: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '0.65rem',
    letterSpacing: '0.2em',
    opacity: 0.5,
  },
  counterNumber: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '1.5rem',
    fontWeight: 700,
  },
  progressTrack: {
    width: '200px',
    height: '3px',
    backgroundColor: 'rgba(245, 238, 228, 0.15)',
    borderRadius: '2px',
    margin: '0 auto',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#F5EEE4',
    borderRadius: '2px',
    transition: 'width 0.05s linear',
  },
};
