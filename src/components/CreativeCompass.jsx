/* ============================================================
   CreativeCompass.jsx — Realistic Vintage Analog Clock / Compass
   ============================================================
   Inspired directly by the signature NIRMAAN analog clock dial.
   Features:
   - Live real-time clock ticking (Hour, Minute, Second hands)
   - Roman / Arabic numeral markings
   - Micro tick rings and tactile border shadow
   - Interactive hover parallax & live time display
   ============================================================ */

import React, { useState, useEffect, useRef } from 'react';

export default function CreativeCompass() {
  const [time, setTime] = useState(new Date());
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const dialRef = useRef(null);

  // Update clock time every second
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Parallax tilt on mouse move
  const handleMouseMove = (e) => {
    if (!dialRef.current) return;
    const rect = dialRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setMousePos({ x: dx * 8, y: dy * 8 });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  // Calculate hand angles based on current time
  const seconds = time.getSeconds();
  const minutes = time.getMinutes() + seconds / 60;
  const hours = (time.getHours() % 12) + minutes / 60;

  const secondDeg = seconds * 6;      // 360 / 60
  const minuteDeg = minutes * 6;      // 360 / 60
  const hourDeg = hours * 30;          // 360 / 12

  // Numerals positions
  const numerals = ['XII', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI'];

  return (
    <div
      className="vintage-clock-container"
      ref={dialRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateY(${mousePos.x}deg) rotateX(${-mousePos.y}deg)`,
      }}
    >
      {/* Outer Rim */}
      <div className="clock-rim">
        {/* Face */}
        <div className="clock-face">
          {/* Ticks ring */}
          {Array.from({ length: 60 }).map((_, i) => (
            <div
              key={i}
              className={`clock-tick ${i % 5 === 0 ? 'clock-tick--major' : ''}`}
              style={{ transform: `rotate(${i * 6}deg)` }}
            />
          ))}

          {/* Roman Numerals */}
          {numerals.map((num, i) => {
            const angle = (i * 30 - 90) * (Math.PI / 180);
            const radius = 95; // radius in px
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            return (
              <span
                key={num}
                className="clock-numeral"
                style={{
                  transform: `translate(${x}px, ${y}px)`,
                }}
              >
                {num}
              </span>
            );
          })}

          {/* Hour Hand */}
          <div
            className="clock-hand clock-hand--hour"
            style={{ transform: `rotate(${hourDeg}deg)` }}
          />

          {/* Minute Hand */}
          <div
            className="clock-hand clock-hand--minute"
            style={{ transform: `rotate(${minuteDeg}deg)` }}
          />

          {/* Second Hand */}
          <div
            className="clock-hand clock-hand--second"
            style={{ transform: `rotate(${secondDeg}deg)` }}
          />

          {/* Center Cap */}
          <div className="clock-center-cap" />
        </div>
      </div>

      {/* Digital Time Readout Badge below clock */}
      <div className="clock-badge">
        <span className="clock-badge__dot">●</span>
        <span>{time.toLocaleTimeString()}</span>
        <span className="clock-badge__sub">BENGALURU, IN</span>
      </div>

      <style>{`
        .vintage-clock-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          transition: transform 0.15s ease-out;
        }

        .clock-rim {
          width: 270px;
          height: 270px;
          border-radius: 50%;
          background: #EDE2D3;
          border: 4px solid #11110F;
          box-shadow: 6px 6px 0px #11110F, inset 0 0 15px rgba(0,0,0,0.08);
          padding: 8px;
          position: relative;
        }

        .clock-face {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: #FDFBF7;
          border: 2px solid #11110F;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Tick marks */
        .clock-tick {
          position: absolute;
          top: 4px;
          left: calc(50% - 1px);
          width: 1px;
          height: 6px;
          background: rgba(17, 17, 15, 0.3);
          transform-origin: 1px 121px;
        }

        .clock-tick--major {
          width: 2px;
          height: 10px;
          background: #11110F;
          transform-origin: 1px 121px;
        }

        /* Numerals */
        .clock-numeral {
          position: absolute;
          font-family: 'Syne', serif;
          font-weight: 700;
          font-size: 0.85rem;
          color: #11110F;
          user-select: none;
        }

        /* Clock Hands */
        .clock-hand {
          position: absolute;
          bottom: 50%;
          left: calc(50% - 2px);
          transform-origin: 50% 100%;
          border-radius: 4px;
          transition: transform 0.2s cubic-bezier(0.4, 2.08, 0.55, 0.44);
        }

        .clock-hand--hour {
          width: 5px;
          height: 65px;
          background: #11110F;
          z-index: 2;
        }

        .clock-hand--minute {
          width: 4px;
          height: 90px;
          background: #11110F;
          z-index: 3;
        }

        .clock-hand--second {
          width: 2px;
          height: 100px;
          background: var(--nirmaan-red, #EF4444);
          left: calc(50% - 1px);
          z-index: 4;
        }

        .clock-center-cap {
          position: absolute;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: var(--nirmaan-yellow, #FFC900);
          border: 2px solid #11110F;
          z-index: 5;
        }

        /* Digital badge */
        .clock-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 6px 14px;
          background: #11110F;
          color: #F5EEE4;
          border-radius: 999px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          box-shadow: 3px 3px 0px var(--nirmaan-yellow);
        }

        .clock-badge__dot {
          color: #10B981;
          font-size: 0.6rem;
          animation: pulse 1.5s infinite;
        }

        .clock-badge__sub {
          color: #888;
          font-size: 0.6rem;
          border-left: 1px solid #444;
          padding-left: 8px;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        @media (max-width: 768px) {
          .clock-rim {
            width: 210px;
            height: 210px;
          }
          .clock-tick, .clock-tick--major {
            transform-origin: 1px 91px;
          }
        }
      `}</style>
    </div>
  );
}
