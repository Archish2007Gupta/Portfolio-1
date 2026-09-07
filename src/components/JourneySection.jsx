/* ============================================================
   JourneySection.jsx — Nirmaan 2026 Interactive Schedule Board
   Backend-Driven Experience System (Single Source of Truth: experience.json)
   ============================================================ */

import React, { useState, useEffect, useMemo } from 'react';
import { getExperience } from '../services/experienceApi.js';

export default function JourneySection() {
  const [experienceList, setExperienceList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeGroupIndex, setActiveGroupIndex] = useState(0);

  // Fetch experience data dynamically from backend API
  useEffect(() => {
    let isMounted = true;

    async function loadExperience() {
      try {
        setLoading(true);
        setError(null);
        const data = await getExperience();
        if (isMounted) {
          if (data && Array.isArray(data.experience)) {
            setExperienceList(data.experience);
          } else {
            setExperienceList([]);
          }
        }
      } catch (err) {
        if (isMounted) {
          console.warn('[EXPERIENCE] Failed to load experience:', err);
          setError('Timeline entries temporarily unavailable.');
          setExperienceList([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadExperience();
    return () => {
      isMounted = false;
    };
  }, []);

  // Build tabs / groups dynamically from backend experience items
  const groups = useMemo(() => {
    if (!experienceList || experienceList.length === 0) return [];

    const map = new Map();
    experienceList.forEach((item) => {
      const period = item.period || (item.current ? '2025 – Present' : 'Milestones');
      const label = item.periodLabel || item.type || 'Experience';
      const key = `${period}___${label}`;

      if (!map.has(key)) {
        map.set(key, {
          period,
          label,
          items: []
        });
      }
      map.get(key).items.push(item);
    });

    return Array.from(map.values());
  }, [experienceList]);

  // Keep active index safely bounded
  const safeIndex = Math.min(activeGroupIndex, Math.max(0, groups.length - 1));
  const activeGroup = groups[safeIndex] || { period: '', label: '', items: [] };

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
        {groups.length > 0 && (
          <div className="schedule-tab-bar">
            {groups.map((group, idx) => {
              const isActive = safeIndex === idx;
              return (
                <button
                  key={`${group.period}-${idx}`}
                  onClick={() => setActiveGroupIndex(idx)}
                  className={`schedule-tab-btn clay-card ${isActive ? 'schedule-tab-btn--active' : ''}`}
                >
                  <span className="tab-period">{group.period}</span>
                  <span className="tab-label">{group.label}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Schedule List Content */}
        <div className="schedule-rows-container">
          {loading && (
            <div className="schedule-row-item schedule-loading-row">
              <div className="schedule-time-col">
                <span className="schedule-time-badge" style={{ background: '#0072E3' }}>
                  FETCHING...
                </span>
                <span className="schedule-type-tag">LIVE_STREAM</span>
              </div>
              <div className="schedule-detail-col">
                <div className="schedule-title-row">
                  <h3 className="schedule-title">Loading Timeline Records</h3>
                  <span className="schedule-org">SYNCING API</span>
                </div>
                <p className="schedule-desc">Querying single source of truth timeline entries from backend repository...</p>
              </div>
            </div>
          )}

          {!loading && error && (
            <div className="schedule-empty-state">
              <p>{error}</p>
            </div>
          )}

          {!loading && !error && groups.length === 0 && (
            <div className="schedule-empty-state">
              <p>No timeline entries currently listed in records.</p>
            </div>
          )}

          {!loading && !error && activeGroup.items.map((item, i) => (
            <div key={item.id || i} className="schedule-row-item">
              
              {/* Time & Tag Col */}
              <div className="schedule-time-col">
                <span
                  className="schedule-time-badge"
                  style={{ background: item.color || '#0072E3' }}
                >
                  {item.time}
                </span>
                <span className="schedule-type-tag">{item.tag || item.type}</span>
              </div>

              {/* Detail Col */}
              <div className="schedule-detail-col">
                <div className="schedule-title-row">
                  <h3 className="schedule-title">{item.title}</h3>
                  <span className="schedule-org">{item.organization}</span>
                </div>
                <p className="schedule-desc">{item.detail || item.description}</p>
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

        .schedule-loading-row {
          opacity: 0.75;
          animation: pulseFade 1.6s ease-in-out infinite;
        }

        @keyframes pulseFade {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 0.95; }
        }

        .schedule-empty-state {
          padding: 32px 20px;
          text-align: center;
          font-family: var(--font-mono);
          font-size: 0.85rem;
          color: var(--text-muted);
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
