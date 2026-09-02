/* ============================================================
   BuilderRouteFlow.jsx — Nirmaan 2026 Interactive Craft Route Board
   ============================================================ */

import React, { useState } from 'react';

const CRAFT_NODES = [
  {
    id: 'plan',
    label: '01 Plan',
    desc: 'Research requirements, shape challenge briefs, and define architecture.',
    x: '14%',
    y: '40%',
    bg: '#FFB200',
    color: '#000000',
  },
  {
    id: 'design',
    label: '02 Design',
    desc: 'Figma UI/UX systems, typography hierarchy, and tactile clay cards.',
    x: '34%',
    y: '22%',
    bg: '#0072E3',
    color: '#FFFFFF',
  },
  {
    id: 'prototype',
    label: '03 Prototype',
    desc: 'ESP32 sensor circuits, breadboard telemetry, and AI voice agents.',
    x: '52%',
    y: '65%',
    bg: '#EF333A',
    color: '#FFFFFF',
  },
  {
    id: 'build',
    label: '04 Build',
    desc: 'React, TypeScript, Vite, Supabase cloud sync, and component architecture.',
    x: '72%',
    y: '32%',
    bg: '#FF6100',
    color: '#FFFFFF',
  },
  {
    id: 'deploy',
    label: '05 Deploy',
    desc: 'Production deployment, interactive testing, and live digital exhibition.',
    x: '88%',
    y: '70%',
    bg: '#1BE349',
    color: '#000000',
  },
];

export default function BuilderRouteFlow() {
  const [activeNode, setActiveNode] = useState(CRAFT_NODES[0]);

  return (
    <div className="brutal-card route-board-card">
      <div className="card-header-banner" style={{ background: '#11110F' }}>
        <span>END-TO-END CRAFT ROUTE // 01 TO 05</span>
        <span className="pulse-dot" />
      </div>

      <div className="route-board-body">
        
        {/* Background Grid */}
        <div className="route-grid-bg clay-grid" />

        {/* SVG Connecting Bezier Curve */}
        <svg
          className="route-curve-svg"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path
            d="M 14 40 Q 24 16 34 22 T 52 65 T 72 32 T 88 70"
            fill="none"
            stroke="#EF333A"
            strokeWidth="2.2"
            strokeDasharray="4 3"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {/* Floating Pulsing Nodes */}
        {CRAFT_NODES.map((node) => {
          const isActive = activeNode.id === node.id;

          return (
            <div
              key={node.id}
              className="route-node-anchor"
              style={{ left: node.x, top: node.y }}
            >
              <button
                onClick={() => setActiveNode(node)}
                className={`route-node-btn clay-card ${isActive ? 'route-node-btn--active' : ''}`}
                style={{
                  backgroundColor: node.bg,
                  color: node.color,
                }}
              >
                <span>{node.label}</span>
              </button>
            </div>
          );
        })}

        {/* Active Stage Detail Box */}
        <div className="route-active-detail clay-card">
          <div className="detail-header">
            <span className="detail-tag">STAGE INSPECTOR</span>
            <span className="detail-title">{activeNode.label}</span>
          </div>
          <p className="detail-desc">{activeNode.desc}</p>
        </div>

      </div>

      <style>{`
        .route-board-card {
          overflow: hidden;
          background: #E8E0D8;
          margin: 32px 0;
        }

        .route-board-body {
          position: relative;
          min-height: 380px;
          height: 400px;
          overflow: hidden;
          display: flex;
          align-items: flex-end;
          padding: 24px;
        }

        .route-grid-bg {
          position: absolute;
          inset: 0;
          opacity: 0.5;
        }

        .route-curve-svg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        .route-node-anchor {
          position: absolute;
          transform: translate(-50%, -50%);
          z-index: 10;
        }

        .route-node-btn {
          border-radius: var(--radius-pill);
          padding: 10px 18px;
          font-family: var(--font-display);
          font-size: 0.85rem;
          font-weight: 900;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          cursor: pointer;
          transition: transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.2s ease;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
          animation: nodePulse 3.5s ease-in-out infinite;
        }

        .route-node-btn:hover {
          transform: scale(1.15) translateY(-3px);
        }

        .route-node-btn--active {
          box-shadow: 0 0 0 3px #000000, 0 10px 20px rgba(0, 0, 0, 0.3);
          transform: scale(1.1);
        }

        .route-active-detail {
          position: relative;
          z-index: 20;
          background: #FFFFFF;
          border-radius: 16px;
          padding: 16px 20px;
          max-width: 360px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          box-shadow: 0 10px 24px rgba(0, 0, 0, 0.15);
        }

        .detail-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
        }

        .detail-tag {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          font-weight: 800;
          color: var(--text-muted);
          letter-spacing: 0.08em;
        }

        .detail-title {
          font-family: var(--font-display);
          font-size: 1rem;
          font-weight: 900;
          color: var(--text-ink);
        }

        .detail-desc {
          font-size: 0.84rem;
          line-height: 1.45;
          color: var(--text-gray);
        }
      `}</style>
    </div>
  );
}
