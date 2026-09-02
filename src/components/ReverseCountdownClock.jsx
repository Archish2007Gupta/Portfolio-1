/* ============================================================
   ReverseCountdownClock.jsx — Nirmaan 2026 Interactive Vintage Clock
   ============================================================ */

import React, { useState, useEffect, useRef, useCallback } from 'react';

const TYPED_LINES_LEFT = [
  'ARCHISHA GUPTA // DIGITAL EXHIBITION',
  'CREATIVE DEVELOPER & UI/UX DESIGNER',
  'CSE STUDENT @ BMSIT BANGALORE',
  'BUILDING AT CODE & DESIGN INTERSECTION',
];

const TYPED_LINES_RIGHT = [
  'ECHONEX IOT ASSISTANT PROTOTYPE',
  'CLEANZY SMART WASTE DISPATCH',
  'WAY2UNI CAMPUS NAVIGATION UI',
  'SPARKHABIT CREATIVE LAB 2026',
];

// Target countdown milestone
const TARGET_DATE = new Date('2026-12-31T23:59:59').getTime();

export default function ReverseCountdownClock() {
  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    mins: '00',
    secs: '00',
  });

  const [secondAngle, setSecondAngle] = useState(0);
  const [minuteAngle, setMinuteAngle] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const [leftLineIndex, setLeftLineIndex] = useState(0);
  const [rightLineIndex, setRightLineIndex] = useState(0);
  const [leftCharIndex, setLeftCharIndex] = useState(0);
  const [rightCharIndex, setRightCharIndex] = useState(0);

  const clockRef = useRef(null);

  // Live countdown calculation
  useEffect(() => {
    const updateCountdown = () => {
      const now = Date.now();
      const diff = Math.max(0, TARGET_DATE - now);

      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({
        days: String(d).padStart(2, '0'),
        hours: String(h).padStart(2, '0'),
        mins: String(m).padStart(2, '0'),
        secs: String(s).padStart(2, '0'),
      });

      if (!isDragging) {
        setSecondAngle((s / 60) * 360);
        setMinuteAngle((m / 60) * 360 + (s / 60) * 6);
      }
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, [isDragging]);

  // Typing effect for side banners
  useEffect(() => {
    const leftText = TYPED_LINES_LEFT[leftLineIndex];
    if (leftCharIndex < leftText.length) {
      const t = setTimeout(() => setLeftCharIndex((c) => c + 1), 60);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setLeftCharIndex(0);
        setLeftLineIndex((l) => (l + 1) % TYPED_LINES_LEFT.length);
      }, 3000);
      return () => clearTimeout(t);
    }
  }, [leftCharIndex, leftLineIndex]);

  useEffect(() => {
    const rightText = TYPED_LINES_RIGHT[rightLineIndex];
    if (rightCharIndex < rightText.length) {
      const t = setTimeout(() => setRightCharIndex((c) => c + 1), 70);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setRightCharIndex(0);
        setRightLineIndex((l) => (l + 1) % TYPED_LINES_RIGHT.length);
      }, 3200);
      return () => clearTimeout(t);
    }
  }, [rightCharIndex, rightLineIndex]);

  // Pointer drag to interact with stopwatch dial
  const handlePointerDown = (e) => {
    setIsDragging(true);
    updateAngleFromEvent(e);
  };

  const handlePointerMove = (e) => {
    if (isDragging) {
      updateAngleFromEvent(e);
    }
    // 3D parallax tilt
    if (clockRef.current) {
      const rect = clockRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setTilt({ x: y * -18, y: x * 18 });
    }
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    setTilt({ x: 0, y: 0 });
  };

  const updateAngleFromEvent = useCallback((e) => {
    if (!clockRef.current) return;
    const rect = clockRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const rad = Math.atan2(e.clientY - centerY, e.clientX - centerX);
    let deg = rad * (180 / Math.PI) + 90;
    if (deg < 0) deg += 360;
    setSecondAngle(deg);
  }, []);

  return (
    <section className="countdown-clock-section">
      <div className="countdown-clock-inner">
        
        {/* Left Typing Banner (Desktop) */}
        <div className="clock-banner-col clock-banner-col--left">
          <span className="banner-tag">FOCUS SPRINT</span>
          <p className="banner-typed-text">
            {TYPED_LINES_LEFT[leftLineIndex].slice(0, leftCharIndex)}
            <span className="typing-caret">|</span>
          </p>
        </div>

        {/* Center Vintage Stopwatch Assembly */}
        <div className="clock-center-col">
          
          <div
            ref={clockRef}
            className="real-clock clock-dial-container"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onMouseLeave={handleMouseLeave}
            style={{
              transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            }}
          >
            {/* Top Crown & Ring Assembly (12 o'clock) */}
            <div className="clock-crown-assembly">
              <div className="clock-metallic-ring" />
              <div className="clock-crown-knob" />
              <div className="clock-crown-stem" />
            </div>

            {/* Left Pusher (10 o'clock) */}
            <div className="clock-pusher clock-pusher--left">
              <div className="pusher-cap" />
              <div className="pusher-stem" />
            </div>

            {/* Right Pusher (2 o'clock) */}
            <div className="clock-pusher clock-pusher--right">
              <div className="pusher-cap" />
              <div className="pusher-stem" />
            </div>

            {/* 12 Hour Radial Ticks */}
            {Array.from({ length: 12 }).map((_, i) => (
              <span
                key={i}
                className="clock-dial-tick"
                style={{
                  transform: `translate(-50%, -50%) rotate(${i * 30}deg) translateY(-145px)`,
                }}
              />
            ))}

            {/* Hour Numbers */}
            <span className="clock-num clock-num--12">12</span>
            <span className="clock-num clock-num--3">3</span>
            <span className="clock-num clock-num--6">6</span>
            <span className="clock-num clock-num--9">9</span>

            {/* Brand in Clock */}
            <div className="clock-inner-brand">
              <span className="clock-brand-title">ARCHISHA</span>
              <span className="clock-brand-sub">2026 EDITION</span>
            </div>

            {/* Rotating Minute Hand */}
            <div
              className="clock-hand-wrap"
              style={{ transform: `rotate(${minuteAngle}deg)` }}
            >
              <div className="clock-hand clock-hand--minute" />
            </div>

            {/* Rotating Second Hand */}
            <div
              className="clock-hand-wrap"
              style={{ transform: `rotate(${secondAngle}deg)` }}
            >
              <div className="clock-hand clock-hand--second" />
            </div>

            {/* Center Yellow Pivot Knob */}
            <div className="clock-pivot-knob" />
          </div>

          {/* 4 Inset Countdown Cards */}
          <div className="countdown-cards-row">
            <div className="countdown-unit-card">
              <p className="unit-value">{timeLeft.days}</p>
              <p className="unit-label">DAYS</p>
            </div>
            <div className="countdown-unit-card">
              <p className="unit-value">{timeLeft.hours}</p>
              <p className="unit-label">HOURS</p>
            </div>
            <div className="countdown-unit-card">
              <p className="unit-value">{timeLeft.mins}</p>
              <p className="unit-label">MINUTES</p>
            </div>
            <div className="countdown-unit-card">
              <p className="unit-value" style={{ color: 'var(--color-red)' }}>
                {timeLeft.secs}
              </p>
              <p className="unit-label">SECONDS</p>
            </div>
          </div>

        </div>

        {/* Right Typing Banner (Desktop) */}
        <div className="clock-banner-col clock-banner-col--right">
          <span className="banner-tag">ACTIVE BUILDS</span>
          <p className="banner-typed-text">
            {TYPED_LINES_RIGHT[rightLineIndex].slice(0, rightCharIndex)}
            <span className="typing-caret">|</span>
          </p>
        </div>

      </div>

      <style>{`
        .countdown-clock-section {
          background-color: var(--bg-paper);
          padding: 60px 20px;
          border-bottom: var(--border-thick);
          overflow: hidden;
        }

        .countdown-clock-inner {
          max-width: 1320px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr;
          gap: 36px;
          align-items: center;
        }

        @media (min-width: 1025px) {
          .countdown-clock-inner {
            grid-template-columns: 1fr 1.3fr 1fr;
            gap: 24px;
          }
        }

        /* Banner Columns */
        .clock-banner-col {
          display: none;
          flex-direction: column;
          gap: 8px;
        }

        @media (min-width: 1025px) {
          .clock-banner-col {
            display: flex;
          }
        }

        .clock-banner-col--left {
          text-align: left;
          align-items: flex-start;
        }

        .clock-banner-col--right {
          text-align: right;
          align-items: flex-end;
        }

        .banner-tag {
          font-family: var(--font-mono);
          font-size: 0.68rem;
          font-weight: 800;
          color: var(--text-muted);
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .banner-typed-text {
          font-family: var(--font-display);
          font-size: clamp(1.1rem, 1.6vw, 1.4rem);
          font-weight: 800;
          line-height: 1.3;
          color: var(--text-ink);
        }

        /* Center Clock Col */
        .clock-center-col {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 28px;
        }

        /* Dial Container */
        .clock-dial-container {
          position: relative;
          width: min(80vw, 360px);
          aspect-ratio: 1;
          border-radius: 50%;
          border: 12px solid #FFFFFF;
          box-shadow:
            0 22px 54px rgba(0, 0, 0, 0.16),
            0 7px 0 rgba(255, 255, 255, 0.92),
            inset 0 0 0 3px rgba(0, 0, 0, 0.08);
          cursor: grab;
          touch-action: none;
          user-select: none;
          transition: transform 0.1s ease-out;
        }

        .clock-dial-container:active {
          cursor: grabbing;
        }

        /* Crown & Ring Assembly */
        .clock-crown-assembly {
          position: absolute;
          left: 50%;
          top: 0;
          transform: translate(-50%, -85%);
          z-index: 20;
          display: flex;
          flex-direction: column;
          align-items: center;
          pointer-events: none;
        }

        .clock-metallic-ring {
          width: 58px;
          height: 48px;
          border-radius: 50%;
          border: 6px solid #B8B4AE;
          background: linear-gradient(180deg, #DCD8D2 0%, #9E9A94 50%, #C4C0BA 100%);
          box-shadow: inset 0 2px 3px rgba(255, 255, 255, 0.7), 0 4px 10px rgba(0, 0, 0, 0.25);
        }

        .clock-crown-knob {
          width: 24px;
          height: 20px;
          border-radius: 4px 4px 0 0;
          border: 1px solid #8A867F;
          background: repeating-linear-gradient(90deg, #7A7670 0px, #7A7670 2px, #E8E4DE 2px, #E8E4DE 4px);
          margin-top: -30px;
          z-index: 2;
        }

        .clock-crown-stem {
          width: 14px;
          height: 14px;
          background: linear-gradient(90deg, #8A867F 0%, #D4D0CA 45%, #FFFFFF 60%, #9E9A94 100%);
        }

        /* Pushers */
        .clock-pusher {
          position: absolute;
          z-index: 20;
          pointer-events: none;
        }

        .clock-pusher--left {
          left: 20%;
          top: 8%;
          transform: translate(-50%, -50%) rotate(-30deg);
        }

        .clock-pusher--right {
          left: 80%;
          top: 8%;
          transform: translate(-50%, -50%) rotate(30deg);
        }

        .pusher-cap {
          width: 18px;
          height: 12px;
          border-radius: 3px 3px 0 0;
          border: 1px solid #8A867F;
          background: linear-gradient(90deg, #94908A 0%, #DEDA D4 30%, #FFFFFF 55%, #A8A49E 100%);
        }

        .pusher-stem {
          width: 10px;
          height: 12px;
          background: #8A867F;
          margin: 0 auto;
        }

        /* Ticks */
        .clock-dial-tick {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 4px;
          height: 14px;
          background: #000000;
          border-radius: var(--radius-pill);
          transform-origin: center;
        }

        /* Numbers */
        .clock-num {
          position: absolute;
          font-family: var(--font-display);
          font-size: 24px;
          font-weight: 900;
          color: rgba(0, 0, 0, 0.85);
          line-height: 1;
        }

        .clock-num--12 { left: 50%; top: 12%; transform: translateX(-50%); }
        .clock-num--3 { right: 12%; top: 50%; transform: translateY(-50%); }
        .clock-num--6 { left: 50%; bottom: 12%; transform: translateX(-50%); }
        .clock-num--9 { left: 12%; top: 50%; transform: translateY(-50%); }

        /* Inner Brand */
        .clock-inner-brand {
          position: absolute;
          left: 50%;
          top: 30%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          pointer-events: none;
        }

        .clock-brand-title {
          font-family: var(--font-display);
          font-size: 13px;
          font-weight: 900;
          letter-spacing: 0.1em;
          color: rgba(0, 0, 0, 0.7);
        }

        .clock-brand-sub {
          font-family: var(--font-mono);
          font-size: 8px;
          font-weight: 800;
          letter-spacing: 0.12em;
          color: rgba(0, 0, 0, 0.45);
        }

        /* Hands */
        .clock-hand-wrap {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 0;
          height: 0;
          transform-origin: center;
          pointer-events: none;
        }

        .clock-hand {
          position: absolute;
          left: 0;
          bottom: 0;
          transform: translateX(-50%);
          transform-origin: bottom center;
          border-radius: var(--radius-pill);
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        }

        .clock-hand--minute {
          width: 8px;
          height: 110px;
          background: #000000;
        }

        .clock-hand--second {
          width: 4px;
          height: 130px;
          background: var(--color-red);
        }

        .clock-pivot-knob {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 32px;
          height: 32px;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          background: var(--color-yellow);
          border: 3px solid #000000;
          box-shadow: 0 0 0 8px rgba(255, 255, 255, 0.8), 0 6px 14px rgba(0, 0, 0, 0.18);
          pointer-events: none;
        }

        /* Countdown Cards Row */
        .countdown-cards-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
          width: 100%;
          max-width: 520px;
        }

        .countdown-unit-card {
          background: rgba(255, 255, 255, 0.85);
          border: 1px solid rgba(0, 0, 0, 0.08);
          border-radius: 18px;
          padding: 14px 8px;
          text-align: center;
          box-shadow:
            inset 4px 4px 8px rgba(0, 0, 0, 0.06),
            inset -4px -4px 8px rgba(255, 255, 255, 0.9),
            0 8px 18px rgba(0, 0, 0, 0.1);
        }

        .unit-value {
          font-family: var(--font-display);
          font-size: clamp(1.8rem, 3.5vw, 2.6rem);
          font-weight: 900;
          line-height: 1;
          color: var(--text-ink);
        }

        .unit-label {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          color: var(--text-muted);
          margin-top: 4px;
        }
      `}</style>
    </section>
  );
}
