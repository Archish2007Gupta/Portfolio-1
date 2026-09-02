/* ============================================================
   BugHuntGame.jsx — "08 — EXPERIMENTS"
   ============================================================
   A playful mini-game: "CAN YOU BREAK THE INTERFACE?"
   Visitors have 25 seconds to click hidden "bug" pins
   scattered across a circuit-board-styled area.
   
   BEGINNER TIP:
   - useRef stores the timer interval so we can clear it
   - Math.random() places bugs at random positions
   - State management tracks score, time, and game status
   ============================================================ */

import React, { useState, useRef, useEffect, useCallback } from 'react';

// Define bug positions (random-feeling but consistent layout)
const BUG_POSITIONS = [
  { top: '15%', left: '20%' },
  { top: '35%', left: '70%' },
  { top: '55%', left: '35%' },
  { top: '25%', left: '85%' },
  { top: '70%', left: '55%' },
  { top: '80%', left: '15%' },
  { top: '45%', left: '50%' },
  { top: '65%', left: '80%' },
];

export default function BugHuntGame() {
  // Game state
  const [gameState, setGameState] = useState('idle'); // idle | playing | done
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(25);
  const [found, setFound] = useState([]); // indices of found bugs
  const timerRef = useRef(null);

  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Start the game
  const startGame = useCallback(() => {
    setGameState('playing');
    setScore(0);
    setFound([]);
    setTimeLeft(25);

    // Start countdown timer
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setGameState('done');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  // Click a bug
  const catchBug = (index) => {
    if (gameState !== 'playing' || found.includes(index)) return;
    setFound((prev) => [...prev, index]);
    setScore((prev) => prev + 1);

    // If all bugs found, end game early
    if (found.length + 1 >= BUG_POSITIONS.length) {
      clearInterval(timerRef.current);
      setGameState('done');
    }
  };

  // Reset game
  const resetGame = () => {
    clearInterval(timerRef.current);
    setGameState('idle');
    setScore(0);
    setFound([]);
    setTimeLeft(25);
  };

  // Cleanup timer on unmount
  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <section className="bughunt section" ref={sectionRef}>
      <div className={`section-header ${visible ? 'bh--visible' : ''}`}>
        <span className="section-number">08</span>
        <h2>EXPERIMENTS</h2>
      </div>

      <div className={`bh__container ${visible ? 'bh--visible' : ''}`}>
        {/* Header */}
        <div className="bh__header">
          <h3 className="bh__title">CAN YOU BREAK THE INTERFACE?</h3>
          <p className="bh__subtitle">
            Find the hidden bugs on the board. You have 25 seconds.
          </p>
        </div>

        {/* Stats Bar */}
        <div className="bh__stats">
          <div className="bh__stat">
            <span className="meta-label">TIME</span>
            <span className="bh__stat-value">{String(timeLeft).padStart(2, '0')}s</span>
          </div>
          <div className="bh__stat">
            <span className="meta-label">SCORE</span>
            <span className="bh__stat-value">{score}</span>
          </div>
          <div className="bh__stat">
            <span className="meta-label">FOUND</span>
            <span className="bh__stat-value">{found.length}/{BUG_POSITIONS.length}</span>
          </div>
        </div>

        {/* Game Board */}
        <div className="bh__board card">
          {/* Grid lines (decorative) */}
          <div className="bh__grid-lines" />

          {/* Bug pins */}
          {BUG_POSITIONS.map((pos, i) => (
            <button
              key={i}
              className={`bh__bug ${found.includes(i) ? 'bh__bug--found' : ''} ${gameState === 'playing' ? 'bh__bug--active' : ''}`}
              style={{ top: pos.top, left: pos.left }}
              onClick={() => catchBug(i)}
              aria-label={`Bug ${i + 1}`}
            >
              {found.includes(i) ? '✓' : '🐛'}
            </button>
          ))}

          {/* Idle overlay */}
          {gameState === 'idle' && (
            <div className="bh__overlay">
              <button className="bh__start-btn" onClick={startGame}>
                START HUNT ↗
              </button>
            </div>
          )}

          {/* Done overlay */}
          {gameState === 'done' && (
            <div className="bh__overlay">
              <p className="bh__done-text">
                {score >= BUG_POSITIONS.length
                  ? 'NICE. YOU FOUND ALL THE BUGS. 🎉'
                  : `YOU FOUND ${score} OUT OF ${BUG_POSITIONS.length} BUGS.`}
              </p>
              <p className="bh__done-sub">YOU JUST EXPLORED THE INTERFACE.</p>
              <div className="bh__done-actions">
                <button className="bh__reset-btn" onClick={resetGame}>
                  TRY AGAIN
                </button>
                <a href="#projects" className="bh__explore-btn">
                  EXPLORE MY WORK ↗
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .bh__container {
          opacity: 0;
          transform: translateY(25px);
          transition: all 0.6s ease 0.1s;
        }

        .bh__header {
          margin-bottom: var(--space-lg);
        }

        .bh__title {
          font-family: var(--font-display);
          font-size: clamp(1.2rem, 3vw, 2rem);
          font-weight: 800;
          color: var(--accent-red);
          margin-bottom: var(--space-sm);
        }

        .bh__subtitle {
          font-size: 0.85rem;
          color: var(--text-gray);
        }

        .bh__stats {
          display: flex;
          gap: var(--space-xl);
          margin-bottom: var(--space-lg);
        }

        .bh__stat {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .bh__stat-value {
          font-family: var(--font-mono);
          font-size: 1.5rem;
          font-weight: 700;
        }

        .bh__board {
          position: relative;
          height: 350px;
          overflow: hidden;
          background:
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 40px,
              rgba(17, 17, 15, 0.04) 40px,
              rgba(17, 17, 15, 0.04) 41px
            ),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 40px,
              rgba(17, 17, 15, 0.04) 40px,
              rgba(17, 17, 15, 0.04) 41px
            );
        }

        .bh__bug {
          position: absolute;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: none;
          background: transparent;
          font-size: 1.1rem;
          cursor: default;
          transition: all 0.3s ease;
          opacity: 0.15;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .bh__bug--active {
          cursor: pointer;
          opacity: 0.3;
        }

        .bh__bug--active:hover {
          opacity: 1;
          transform: scale(1.3);
          background: rgba(255, 85, 61, 0.15);
        }

        .bh__bug--found {
          opacity: 1 !important;
          background: var(--accent-green) !important;
          color: white;
          font-size: 0.8rem;
          font-weight: 700;
          pointer-events: none;
        }

        .bh__overlay {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: var(--space-md);
          background: rgba(245, 238, 228, 0.85);
          backdrop-filter: blur(4px);
        }

        .bh__start-btn {
          font-family: var(--font-mono);
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          padding: 14px 32px;
          background: var(--text-black);
          color: var(--bg-cream);
          border: var(--border);
          border-radius: var(--radius-full);
          box-shadow: var(--shadow-tactile-sm);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .bh__start-btn:hover {
          background: var(--accent-red);
          transform: translate(-2px, -2px);
          box-shadow: var(--shadow-hover);
        }

        .bh__done-text {
          font-family: var(--font-display);
          font-size: 1.2rem;
          font-weight: 800;
          text-align: center;
        }

        .bh__done-sub {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          letter-spacing: 0.15em;
          color: var(--text-gray);
        }

        .bh__done-actions {
          display: flex;
          gap: var(--space-md);
          margin-top: var(--space-sm);
        }

        .bh__reset-btn,
        .bh__explore-btn {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          padding: 10px 20px;
          border-radius: var(--radius-full);
          cursor: pointer;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .bh__reset-btn {
          border: var(--border);
          background: transparent;
          color: var(--text-black);
        }

        .bh__explore-btn {
          background: var(--text-black);
          color: var(--bg-cream);
          border: var(--border);
        }

        .bh__reset-btn:hover {
          background: var(--text-black);
          color: var(--bg-cream);
        }

        .bh__explore-btn:hover {
          background: var(--accent-blue);
        }

        .bh--visible {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }

        @media (max-width: 480px) {
          .bh__board {
            height: 280px;
          }
          .bh__stats {
            gap: var(--space-lg);
          }
        }
      `}</style>
    </section>
  );
}
