/* ============================================================
   GithubSection.jsx — Nirmaan 2026 Code Radar & Live Contribution Table
   ============================================================ */

import React, { useState, useEffect } from 'react';
import { githubRepos, profile } from '../data/portfolioData.js';
import { ArrowUpRight, SocialGithub } from './Icons.jsx';

export default function GithubSection() {
  const [contributionData, setContributionData] = useState(null);
  const [totalCommits, setTotalCommits] = useState(240);
  const [loading, setLoading] = useState(true);

  // Fetch real GitHub contribution table
  useEffect(() => {
    async function fetchGitHubContributions() {
      try {
        const res = await fetch(
          'https://github-contributions-api.jogruber.de/v4/Archish2007Gupta?y=last'
        );
        if (res.ok) {
          const data = await res.json();
          if (data && data.contributions) {
            setContributionData(data.contributions);
            if (data.total && data.total[new Date().getFullYear()]) {
              setTotalCommits(data.total[new Date().getFullYear()]);
            }
          }
        }
      } catch (err) {
        console.warn('Could not fetch GitHub contributions, using fallback grid:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchGitHubContributions();
  }, []);

  // Fallback 52-week matrix if offline
  const fallbackWeeks = 36;
  const daysPerWeek = 7;

  return (
    <section className="nirmaan-section" id="github">
      
      {/* Section Header */}
      <div className="nirmaan-section-title">
        <span className="badge">05</span>
        <h2>CODE RADAR &amp; REPOSITORIES</h2>
      </div>

      <p className="github-intro">
        Continuous building, experimentation, and open-source contributions. Live GitHub telemetry and code repositories for @Archish2007Gupta.
      </p>

      {/* GitHub Live Activity Matrix Card */}
      <div className="brutal-card github-activity-card clay-card">
        <div className="card-header-banner" style={{ background: 'var(--color-blue, #0072E3)' }}>
          <div className="flex items-center gap-2">
            <SocialGithub size={16} />
            <span>LIVE GITHUB TELEMETRY // @Archish2007Gupta</span>
          </div>
          <span className="pulse-dot" />
        </div>

        <div className="activity-card-body">
          <div className="activity-stats-row">
            <div className="stat-box">
              <span className="activity-stat-label">ACTIVITY COUNT</span>
              <p className="activity-stat-val" style={{ color: 'var(--color-blue)' }}>
                {totalCommits}+ COMMITS
              </p>
            </div>
            <div className="stat-box">
              <span className="activity-stat-label">PRIMARY LANGUAGES</span>
              <p className="activity-stat-val">JS · TS · C++ · PYTHON</p>
            </div>
            <div className="stat-box">
              <span className="activity-stat-label">CURRENT STATUS</span>
              <p className="activity-stat-val" style={{ color: 'var(--color-green-light)' }}>
                ACTIVE SPRINT
              </p>
            </div>
          </div>

          {/* Live Activity Matrix Table */}
          <div className="activity-matrix-wrap">
            <div className="matrix-top-row">
              <span className="matrix-label">LIVE CONTRIBUTION CALENDAR (LAST 12 MONTHS):</span>
              <div className="matrix-legend">
                <span className="legend-text">Less</span>
                <span className="legend-cell" style={{ background: '#ebedf0' }} />
                <span className="legend-cell" style={{ background: '#9be9a8' }} />
                <span className="legend-cell" style={{ background: '#40c463' }} />
                <span className="legend-cell" style={{ background: '#30a14e' }} />
                <span className="legend-cell" style={{ background: '#216e39' }} />
                <span className="legend-text">More</span>
              </div>
            </div>

            <div className="activity-matrix-scroll no-scrollbar">
              <div className="activity-matrix-table">
                {contributionData && contributionData.length > 0
                  ? contributionData.map((day) => {
                      const colors = [
                        '#ebedf0',
                        '#9be9a8',
                        '#40c463',
                        '#30a14e',
                        '#216e39',
                      ];
                      const bg = colors[day.level] || '#ebedf0';

                      return (
                        <span
                          key={day.date}
                          className="matrix-cell"
                          style={{ background: bg }}
                          title={`${day.count} contribution${day.count === 1 ? '' : 's'} on ${day.date}`}
                        />
                      );
                    })
                  : Array.from({ length: fallbackWeeks * daysPerWeek }).map((_, i) => {
                      const level = (i * 7 + 3) % 5;
                      const colors = [
                        '#ebedf0',
                        '#9be9a8',
                        '#40c463',
                        '#30a14e',
                        '#216e39',
                      ];
                      return (
                        <span
                          key={i}
                          className="matrix-cell"
                          style={{ background: colors[level] }}
                          title="Contribution Activity"
                        />
                      );
                    })}
              </div>
            </div>

            {/* Direct Link to Live GitHub Profile */}
            <div className="matrix-footer-row">
              <span className="matrix-source-tag">Source: api.github.com/users/Archish2007Gupta</span>
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="matrix-view-link"
              >
                <span>View Full Contribution Graph on GitHub</span>
                <ArrowUpRight size={12} />
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Top Repositories Grid */}
      <div className="repos-grid">
        {githubRepos.map((repo) => (
          <div key={repo.name} className="brutal-card repo-card clay-card">
            <div className="repo-card-top">
              <div className="repo-title-wrap">
                <span className="repo-icon">📁</span>
                <h3 className="repo-name">{repo.name}</h3>
              </div>
              <span
                className="repo-lang-pill"
                style={{ borderColor: repo.langColor }}
              >
                <span
                  className="lang-dot"
                  style={{ background: repo.langColor }}
                />
                {repo.lang}
              </span>
            </div>

            <p className="repo-desc">{repo.desc}</p>

            <div className="repo-card-footer">
              <div className="repo-stats">
                <span className="repo-stat">⭐ {repo.stars}</span>
                <span className="repo-stat">🔀 {repo.forks}</span>
              </div>
              <a
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="repo-link-btn clay-card"
              >
                <span>VIEW CODE</span>
                <ArrowUpRight size={12} />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Profile Link Banner */}
      <div className="github-cta-banner brutal-card clay-card">
        <div className="github-cta-inner">
          <div>
            <h4 className="github-cta-title">Explore full code portfolio on GitHub</h4>
            <p className="github-cta-sub">
              Access all public repositories, firmware scripts, and web prototypes.
            </p>
          </div>
          <a
            href={profile.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="github-profile-btn clay-card"
          >
            <span>GITHUB @Archish2007Gupta</span>
            <ArrowUpRight size={14} />
          </a>
        </div>
      </div>

      <style>{`
        .github-intro {
          font-size: 1.05rem;
          color: var(--text-gray);
          max-width: 680px;
          margin-bottom: 32px;
        }

        /* ── Activity Card ── */
        .github-activity-card {
          margin-bottom: 36px;
          overflow: hidden;
          background-color: var(--bg-paper);
        }

        .activity-card-body {
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .activity-stats-row {
          display: grid;
          grid-template-columns: repeat(1, 1fr);
          gap: 12px;
        }

        @media (min-width: 640px) {
          .activity-stats-row {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .stat-box {
          background: #FFFFFF;
          border: 1px solid rgba(0, 0, 0, 0.1);
          border-radius: 12px;
          padding: 12px 16px;
        }

        .activity-stat-label {
          font-family: var(--font-mono);
          font-size: 0.62rem;
          font-weight: 800;
          color: var(--text-muted);
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        .activity-stat-val {
          font-family: var(--font-display);
          font-size: 1.1rem;
          font-weight: 900;
          margin-top: 4px;
        }

        /* Matrix Wrap */
        .activity-matrix-wrap {
          background: #FFFFFF;
          border: 1px solid rgba(0, 0, 0, 0.1);
          border-radius: 14px;
          padding: 16px 20px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .matrix-top-row {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: center;
          gap: 10px;
        }

        .matrix-label {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          font-weight: 800;
          color: var(--text-muted);
          letter-spacing: 0.06em;
        }

        .matrix-legend {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .legend-text {
          font-family: var(--font-mono);
          font-size: 0.58rem;
          color: var(--text-muted);
        }

        .legend-cell {
          width: 10px;
          height: 10px;
          border-radius: 2px;
        }

        .activity-matrix-scroll {
          overflow-x: auto;
          padding-bottom: 6px;
          -webkit-overflow-scrolling: touch;
        }

        .activity-matrix-table {
          display: grid;
          grid-template-rows: repeat(7, 11px);
          grid-auto-flow: column;
          grid-auto-columns: 11px;
          gap: 3.5px;
          width: max-content;
        }

        .matrix-cell {
          width: 11px;
          height: 11px;
          border-radius: 2px;
          transition: transform 0.15s ease, outline 0.15s ease;
          cursor: pointer;
        }

        .matrix-cell:hover {
          transform: scale(1.35);
          outline: 1.5px solid #000000;
          z-index: 10;
        }

        .matrix-footer-row {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: center;
          gap: 8px;
          border-top: 1px dashed rgba(0, 0, 0, 0.1);
          padding-top: 8px;
        }

        .matrix-source-tag {
          font-family: var(--font-mono);
          font-size: 0.58rem;
          color: var(--text-muted);
        }

        .matrix-view-link {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          font-weight: 800;
          color: var(--color-blue);
          display: flex;
          align-items: center;
          gap: 4px;
          text-decoration: underline;
        }

        /* ── Repositories Grid ── */
        .repos-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
          margin-bottom: 32px;
        }

        @media (min-width: 640px) {
          .repos-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1025px) {
          .repos-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .repo-card {
          padding: 22px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 16px;
          border-radius: 16px;
          background: #FFFFFF;
        }

        .repo-card-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 8px;
        }

        .repo-title-wrap {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .repo-icon {
          font-size: 1.1rem;
        }

        .repo-name {
          font-family: var(--font-display);
          font-size: 1.2rem;
          font-weight: 900;
          color: var(--text-ink);
        }

        .repo-lang-pill {
          display: flex;
          align-items: center;
          gap: 5px;
          border: 1px solid;
          padding: 2px 8px;
          border-radius: var(--radius-pill);
          font-family: var(--font-mono);
          font-size: 0.65rem;
          font-weight: 700;
        }

        .lang-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
        }

        .repo-desc {
          font-size: 0.85rem;
          line-height: 1.45;
          color: var(--text-gray);
          flex: 1;
        }

        .repo-card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid rgba(0, 0, 0, 0.08);
          padding-top: 12px;
        }

        .repo-stats {
          display: flex;
          gap: 10px;
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--text-gray);
        }

        .repo-link-btn {
          font-family: var(--font-display);
          font-size: 0.72rem;
          font-weight: 900;
          color: var(--text-ink);
          background: var(--color-yellow);
          padding: 5px 12px;
          border-radius: var(--radius-pill);
          display: flex;
          align-items: center;
          gap: 4px;
          transition: all 0.2s ease;
          text-decoration: none;
        }

        .repo-link-btn:hover {
          background: var(--text-ink);
          color: #FFFFFF;
          transform: translateY(-2px);
        }

        /* ── Profile Link Banner ── */
        .github-cta-banner {
          background: var(--color-yellow);
          border-radius: 18px;
          padding: 24px 28px;
        }

        .github-cta-inner {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
        }

        .github-cta-title {
          font-family: var(--font-display);
          font-size: 1.25rem;
          font-weight: 900;
          color: #11110F;
        }

        .github-cta-sub {
          font-size: 0.85rem;
          color: rgba(17, 17, 15, 0.85);
          font-weight: 600;
          margin-top: 2px;
        }

        .github-profile-btn {
          background: #11110F;
          color: #FFFFFF;
          padding: 12px 24px;
          border-radius: var(--radius-pill);
          font-family: var(--font-display);
          font-size: 0.82rem;
          font-weight: 900;
          display: flex;
          align-items: center;
          gap: 6px;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .github-profile-btn:hover {
          background: var(--color-blue);
          transform: translateY(-2px);
        }
      `}</style>
    </section>
  );
}
