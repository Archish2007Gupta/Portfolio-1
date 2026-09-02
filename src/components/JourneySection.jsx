/* ============================================================
   JourneySection.jsx — Nirmaan 2026 Interactive Schedule Board
   ============================================================ */

import React, { useState } from 'react';
import { scheduleTimeline } from '../data/portfolioData.js';

export default function JourneySection() {
  const [activeGroupIndex, setActiveGroupIndex] = useState(0);

  const activeGroup = scheduleTimeline[activeGroupIndex];

  return (
    <section className="nirmaan-section" id="schedule">
      
      {/* Section Header */}
      <div className="nirmaan-section-title">
        <span className="badge">04</span>
        <h2>TIMELINE & EXPERIENCE BOARD</h2>
      </div>

      <p className="schedule-intro">
        Key milestones across collegiate computer science education, club leadership appointments, and intense 24-hour hackathon sprints.
      </p>

      {/* Schedule Board Card */}
      <div className="brutal-card schedule-board-card">
        
        {/* Top Tab Bar Switcher */}
        <div className="schedule-tab-bar">
          {scheduleTimeline.map((group, idx) => {
            const isActive = activeGroupIndex === idx;
            return (
              <button
                key={group.period}
                onClick={() => setActiveGroupIndex(idx)}
                className={`schedule-tab-btn clay-card ${isActive ? 'schedule-tab-btn--active' : ''}`}
              >
                <span className="tab-period">{group.period}</span>
                <span className="tab-label">{group.label}</span>
              </button>
            );
          })}
        </div>

        {/* Schedule List Content */}
        <div className="schedule-rows-container">
          {activeGroup.items.map((item, i) => (
            <div key={i} className="schedule-row-item">
              
              {/* Time & Tag Col */}
              <div className="schedule-time-col">
                <span
                  className="schedule-time-badge"
                  style={{ background: item.color }}
                >
                  {item.time}
                </span>
                <span className="schedule-type-tag">{item.tag}</span>
              </div>

              {/* Detail Col */}
              <div className="schedule-detail-col">
                <div className="schedule-title-row">
                  <h3 className="schedule-title">{item.title}</h3>
                  <span className="schedule-org">{item.organization}</span>
                </div>
                <p className="schedule-desc">{item.detail}</p>
              </div>

            </div>
          ))}
        </div>

      </div>

      <style>{`
        .schedule-intro {
          font-size: 1.05rem;
          color: var(--text-gray);
          max-width: 680px;
          margin-bottom: 36px;
        }

        .schedule-board-card {
          overflow: hidden;
          background: #FFFFFF;
        }

        /* Tabs */
        .schedule-tab-bar {
          display: flex;
          background: rgba(244, 233, 225, 0.6);
          border-bottom: var(--border-medium);
          padding: 14px 20px;
          gap: 12px;
          flex-wrap: wrap;
        }

        .schedule-tab-btn {
          background: #FFFFFF;
          color: var(--text-ink);
          border-radius: var(--radius-pill);
          padding: 10px 20px;
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-display);
          transition: all 0.2s ease;
        }

        .schedule-tab-btn:hover {
          transform: translateY(-2px);
        }

        .schedule-tab-btn--active {
          background: var(--text-ink);
          color: var(--color-yellow);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        .tab-period {
          font-size: 0.85rem;
          font-weight: 900;
        }

        .tab-label {
          font-family: var(--font-mono);
          font-size: 0.68rem;
          font-weight: 700;
          opacity: 0.8;
        }

        /* Rows */
        .schedule-rows-container {
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .schedule-row-item {
          background: rgba(244, 233, 225, 0.5);
          border: 1px solid rgba(0, 0, 0, 0.1);
          border-radius: 16px;
          padding: 20px 24px;
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
          transition: all 0.24s ease;
        }

        @media (min-width: 768px) {
          .schedule-row-item {
            grid-template-columns: 220px 1fr;
            align-items: center;
          }
        }

        .schedule-row-item:hover {
          transform: translateX(8px);
          background-color: #FFFFFF;
          box-shadow: 0 10px 0 rgba(0, 0, 0, 0.12);
        }

        .schedule-time-col {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 6px;
        }

        .schedule-time-badge {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 800;
          color: #FFFFFF;
          padding: 4px 10px;
          border-radius: var(--radius-pill);
          letter-spacing: 0.05em;
        }

        .schedule-type-tag {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          font-weight: 800;
          color: var(--text-muted);
          letter-spacing: 0.08em;
        }

        .schedule-detail-col {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .schedule-title-row {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        @media (min-width: 768px) {
          .schedule-title-row {
            flex-direction: row;
            align-items: baseline;
            justify-content: space-between;
          }
        }

        .schedule-title {
          font-size: 1.18rem;
          color: var(--text-ink);
          letter-spacing: -0.02em;
        }

        .schedule-org {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          font-weight: 800;
          color: var(--color-blue);
        }

        .schedule-desc {
          font-size: 0.92rem;
          line-height: 1.5;
          color: var(--text-gray);
        }
      `}</style>
    </section>
  );
}
