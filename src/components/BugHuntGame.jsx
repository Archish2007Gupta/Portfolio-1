/* ============================================================
   BugHuntGame.jsx — Nirmaan 2026 Bug Squasher Arcade Mini-Game
   ============================================================ */

import React, { useState, useEffect, useRef, useCallback } from 'react';

// Web Audio API Retro Sound Effects Synthesizer
class SoundFx {
  constructor() {
    this.ctx = null;
    this.muted = false;
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
  }

  playSquash() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, this.ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.12);
    } catch {
      // Audio context policy
    }
  }

  playGameOver() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(220, this.ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(110, this.ctx.currentTime + 0.4);
      gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.4);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.4);
    } catch {
      // Audio context policy
    }
  }
}

const sfx = new SoundFx();

export default function BugHuntGame() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [combo, setCombo] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [showNameModal, setShowNameModal] = useState(false);
  const [tempNameInput, setTempNameInput] = useState('');
  const [bugs, setBugs] = useState([]);
  const [splatters, setSplatters] = useState([]);
  
  const [leaderboard, setLeaderboard] = useState([
    { name: 'Archisha', score: 28 },
    { name: 'ByteMaster', score: 24 },
    { name: 'BMSIT_Coder', score: 20 },
    { name: 'BugHunter99', score: 16 },
  ]);

  const arenaRef = useRef(null);

  // Load highscore from localStorage
  useEffect(() => {
    try {
      const savedHigh = localStorage.getItem('archisha_bug_highscore');
      if (savedHigh) setHighScore(parseInt(savedHigh, 10));
      const savedName = localStorage.getItem('archisha_player_name');
      if (savedName) setPlayerName(savedName);
    } catch {
      // Ignore
    }
  }, []);

  // Spawn bug
  const spawnBug = useCallback(() => {
    if (!arenaRef.current) return;
    const rect = arenaRef.current.getBoundingClientRect();
    const maxX = Math.max(20, rect.width - 60);
    const maxY = Math.max(20, rect.height - 60);

    const newBug = {
      id: Math.random().toString(36).substring(2, 9),
      x: Math.floor(Math.random() * maxX),
      y: Math.floor(Math.random() * maxY),
      speed: Math.random() > 0.5 ? 'fast' : 'normal',
    };

    setBugs((prev) => [...prev.slice(-6), newBug]);
  }, []);

  // Game timer loop
  useEffect(() => {
    if (!isPlaying) return;

    const gameInterval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(gameInterval);
          endGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    const spawnInterval = setInterval(() => {
      spawnBug();
    }, 850);

    return () => {
      clearInterval(gameInterval);
      clearInterval(spawnInterval);
    };
  }, [isPlaying, spawnBug]);

  const startGame = () => {
    if (!playerName) {
      setShowNameModal(true);
      return;
    }
    sfx.init();
    setIsPlaying(true);
    setTimeLeft(30);
    setScore(0);
    setCombo(1);
    setBugs([]);
    setSplatters([]);
    setTimeout(() => spawnBug(), 200);
  };

  const endGame = () => {
    setIsPlaying(false);
    sfx.playGameOver();

    setHighScore((prevHigh) => {
      const newHigh = Math.max(prevHigh, score);
      try {
        localStorage.setItem('archisha_bug_highscore', String(newHigh));
      } catch {
        // Ignore
      }
      return newHigh;
    });

    if (playerName && score > 0) {
      setLeaderboard((prev) => {
        const updated = [...prev, { name: playerName, score }].sort(
          (a, b) => b.score - a.score
        );
        return updated.slice(0, 5);
      });
    }
  };

  const squashBug = (bugId, e) => {
    e.stopPropagation();
    sfx.playSquash();

    const clickedBug = bugs.find((b) => b.id === bugId);
    if (clickedBug) {
      setSplatters((prev) => [
        ...prev.slice(-4),
        { id: Math.random(), x: clickedBug.x, y: clickedBug.y },
      ]);
    }

    setScore((s) => s + combo);
    setCombo((c) => Math.min(c + 1, 5));
    setBugs((prev) => prev.filter((b) => b.id !== bugId));
  };

  const toggleMute = () => {
    sfx.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleSaveName = () => {
    const finalName = tempNameInput.trim() || 'GuestBuilder';
    setPlayerName(finalName);
    try {
      localStorage.setItem('archisha_player_name', finalName);
    } catch {
      // Ignore
    }
    setShowNameModal(false);
    startGame();
  };

  return (
    <section className="nirmaan-section" id="game">
      
      {/* Section Header */}
      <div className="nirmaan-section-title">
        <span className="badge">06</span>
        <h2>BUG SQUASHER ARCADE</h2>
      </div>

      {/* Main Arcade Frame (Matching Nirmaan game.tsx) */}
      <div className="arcade-cabinet-frame brutal-card">
        
        {/* Top Arcade Header Bar */}
        <div className="arcade-header-bar">
          <div className="arcade-header-left">
            <span className="arcade-tag">RETRO EXPERIMENT 06</span>
            <span className="arcade-badge">30-SEC DEBUG QUEST</span>
          </div>

          <div className="arcade-stats-pills">
            <div className="stat-pill">
              <span className="stat-pill-label">TIME</span>
              <span className="stat-pill-val" style={{ color: timeLeft <= 5 ? '#EF333A' : '#000000' }}>
                {timeLeft}s
              </span>
            </div>
            <div className="stat-pill">
              <span className="stat-pill-label">SCORE</span>
              <span className="stat-pill-val">{score}</span>
            </div>
            <div className="stat-pill">
              <span className="stat-pill-label">HIGH</span>
              <span className="stat-pill-val">{highScore}</span>
            </div>
            <button onClick={toggleMute} className="stat-pill stat-pill--btn">
              {isMuted ? '🔇 MUTED' : '🔊 SOUND'}
            </button>
          </div>
        </div>

        <div className="arcade-content-grid">
          
          {/* Game Arena Board */}
          <div className="arcade-board-wrap">
            <div
              ref={arenaRef}
              className="arcade-arena-canvas"
              onClick={() => isPlaying && setCombo(1)}
            >
              {!isPlaying && (
                <div className="arena-welcome-overlay">
                  <span className="arena-trophy-icon">👾</span>
                  <h3 className="arena-title">READY TO DEBUG?</h3>
                  <p className="arena-subtitle">
                    Tap the moving red bugs before the 30s timer runs out to climb the scoreboard.
                  </p>
                  <button onClick={startGame} className="arena-start-btn clay-card">
                    {playerName ? 'START QUEST' : 'SET NAME & PLAY'}
                  </button>
                </div>
              )}

              {/* Splatter marks */}
              {splatters.map((sp) => (
                <div
                  key={sp.id}
                  className="splatter-mark"
                  style={{ left: sp.x, top: sp.y }}
                >
                  💥
                </div>
              ))}

              {/* Live Bug Sprites */}
              {isPlaying &&
                bugs.map((bug) => (
                  <button
                    key={bug.id}
                    onClick={(e) => squashBug(bug.id, e)}
                    className="bug-sprite"
                    style={{ left: bug.x, top: bug.y }}
                    aria-label="Squash Bug"
                  >
                    🐞
                  </button>
                ))}
            </div>
          </div>

          {/* Leaderboard Panel */}
          <div className="arcade-leaderboard-panel">
            <div className="leaderboard-header">
              <span className="leaderboard-title">🏆 LOCAL LEADERBOARD</span>
            </div>

            <div className="leaderboard-list">
              {leaderboard.map((entry, idx) => (
                <div key={idx} className="leaderboard-item">
                  <div className="leaderboard-item-rank">
                    <span className="rank-num">#{idx + 1}</span>
                    <span className="player-name">{entry.name}</span>
                  </div>
                  <span className="player-score">{entry.score} PTS</span>
                </div>
              ))}
            </div>

            <div className="leaderboard-footer">
              <span className="leaderboard-note">
                PLAYER: <strong>{playerName || 'ANONYMOUS'}</strong>
              </span>
            </div>
          </div>

        </div>

      </div>

      {/* Name Input Modal */}
      {showNameModal && (
        <div className="dialog-backdrop">
          <div className="dialog-content text-ink">
            <h3 style={{ fontSize: '1.6rem', marginBottom: '8px' }}>
              ENTER PLAYER NAME
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-gray)', marginBottom: '20px' }}>
              Set your handle to record your debug score on the scoreboard.
            </p>

            <div className="field" style={{ marginBottom: '24px' }}>
              <span>Player Handle</span>
              <input
                type="text"
                placeholder="e.g. CodeNinja"
                value={tempNameInput}
                onChange={(e) => setTempNameInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSaveName()}
                autoFocus
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button
                onClick={() => setShowNameModal(false)}
                className="sticker-tag"
              >
                CANCEL
              </button>
              <button
                onClick={handleSaveName}
                className="arena-start-btn clay-card"
                style={{ padding: '10px 20px', fontSize: '0.8rem' }}
              >
                SAVE & START
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .arcade-cabinet-frame {
          background: #11110F;
          border-radius: var(--radius-card);
          overflow: hidden;
          color: #FFFFFF;
        }

        .arcade-header-bar {
          background: #222220;
          padding: 16px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
          border-bottom: 2px solid rgba(255, 255, 255, 0.1);
        }

        .arcade-header-left {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .arcade-tag {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 800;
          color: var(--color-yellow);
        }

        .arcade-badge {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          background: rgba(255, 255, 255, 0.15);
          padding: 2px 8px;
          border-radius: var(--radius-pill);
        }

        .arcade-stats-pills {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .stat-pill {
          background: #FFFFFF;
          color: var(--text-ink);
          border-radius: var(--radius-pill);
          padding: 4px 12px;
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 800;
        }

        .stat-pill-label {
          color: var(--text-muted);
          font-size: 0.65rem;
        }

        .stat-pill--btn {
          cursor: pointer;
          background: var(--color-yellow);
        }

        .arcade-content-grid {
          display: grid;
          grid-template-columns: 1fr;
          padding: 20px;
          gap: 20px;
        }

        @media (min-width: 900px) {
          .arcade-content-grid {
            grid-template-columns: 2fr 1fr;
            padding: 24px;
          }
        }

        /* Arena Canvas */
        .arcade-arena-canvas {
          background: #000000;
          border: 2px solid rgba(255, 255, 255, 0.15);
          border-radius: 18px;
          height: 320px;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: crosshair;
        }

        .arena-welcome-overlay {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 12px;
          padding: 24px;
          z-index: 10;
        }

        .arena-trophy-icon {
          font-size: 3rem;
          animation: driftUp 3s ease-in-out infinite;
        }

        .arena-title {
          font-family: var(--font-display);
          font-size: 1.6rem;
          color: var(--color-yellow);
        }

        .arena-subtitle {
          font-size: 0.88rem;
          color: rgba(255, 255, 255, 0.7);
          max-width: 380px;
        }

        .arena-start-btn {
          background: var(--color-yellow);
          color: var(--text-ink);
          padding: 12px 28px;
          border-radius: var(--radius-pill);
          font-family: var(--font-display);
          font-size: 0.85rem;
          font-weight: 900;
          letter-spacing: 0.06em;
          margin-top: 6px;
          transition: transform 0.2s ease;
        }

        .arena-start-btn:hover {
          transform: scale(1.05);
        }

        .bug-sprite {
          position: absolute;
          width: 44px;
          height: 44px;
          font-size: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--color-red);
          border: 2px solid #FFFFFF;
          border-radius: 50%;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
          cursor: pointer;
          animation: nodePulse 1.2s ease-in-out infinite;
          transform-origin: center;
        }

        .bug-sprite:hover {
          transform: scale(1.15);
        }

        .splatter-mark {
          position: absolute;
          font-size: 24px;
          pointer-events: none;
          animation: fadeOut 0.8s forwards;
        }

        @keyframes fadeOut {
          0% { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(1.5); }
        }

        /* Leaderboard Panel */
        .arcade-leaderboard-panel {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 18px;
          padding: 18px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .leaderboard-title {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          font-weight: 800;
          color: var(--color-yellow);
          letter-spacing: 0.06em;
        }

        .leaderboard-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
          flex: 1;
        }

        .leaderboard-item {
          background: rgba(255, 255, 255, 0.06);
          border-radius: 10px;
          padding: 8px 12px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-family: var(--font-mono);
          font-size: 0.75rem;
        }

        .leaderboard-item-rank {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .rank-num {
          color: rgba(255, 255, 255, 0.5);
        }

        .player-name {
          font-weight: 700;
          color: #FFFFFF;
        }

        .player-score {
          font-weight: 800;
          color: var(--color-yellow);
        }

        .leaderboard-footer {
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding-top: 10px;
          font-family: var(--font-mono);
          font-size: 0.7rem;
          color: rgba(255, 255, 255, 0.6);
        }
      `}</style>
    </section>
  );
}
