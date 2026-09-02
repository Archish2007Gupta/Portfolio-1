/* ============================================================
   GithubSection.jsx — "07 — THE CODE BEHIND IT"
   ============================================================
   Displays actual repositories: SparkHabit, Cleanzy, Netflix-Clone, KOTLC, Amazon-Clone
   Direct link button: EXPLORE GITHUB →
   ============================================================ */

import React from 'react';
import { githubProfile } from '../data/portfolioData.js';

export default function GithubSection() {
  return (
    <section className="section" id="github">
      <div className="nirmaan-section-title">
        <span className="badge">07</span>
        <h2>THE CODE BEHIND IT</h2>
      </div>

      <div className="nirmaan-card gh-container">
        <div className="card-header-banner" style={{ background: '#6366F1' }}>
          <span>GITHUB // @{githubProfile.username}</span>
          <span>OPEN SOURCE REPOSITORIES</span>
        </div>

        <div className="gh-body">
          <div className="gh-header-row">
            <div>
              <h3 className="gh-title">EXPLORE MY REPOSITORIES</h3>
              <p className="gh-sub">Public repositories and web development projects on GitHub.</p>
            </div>

            <a
              href={githubProfile.url}
              target="_blank"
              rel="noopener noreferrer"
              className="gh-cta-btn"
            >
              EXPLORE GITHUB ↗
            </a>
          </div>

          {/* Repositories Cards Grid */}
          <div className="gh-repos-grid">
            {githubProfile.repos.map((repo) => (
              <a
                key={repo.name}
                href={`${githubProfile.url}/${repo.name}`}
                target="_blank"
                rel="noopener noreferrer"
                className="repo-card"
              >
                <div className="repo-top">
                  <span className="repo-icon">📦</span>
                  <span className="repo-name">{repo.name}</span>
                  <span className="repo-arrow">↗</span>
                </div>
                <p className="repo-desc">{repo.desc}</p>
                <div className="repo-bottom">
                  <span className="sticker-tag" style={{ fontSize: '0.55rem' }}>
                    {repo.lang}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .gh-container {
          overflow: hidden;
        }

        .gh-body {
          padding: 28px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .gh-header-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          flex-wrap: wrap;
        }

        .gh-title {
          font-family: var(--font-hero);
          font-size: 1.6rem;
          line-height: 1.1;
        }

        .gh-sub {
          font-size: 0.9rem;
          color: var(--text-gray);
          margin-top: 4px;
        }

        .gh-cta-btn {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          font-weight: 800;
          letter-spacing: 0.1em;
          padding: 12px 24px;
          background: var(--text-black);
          color: var(--nirmaan-yellow);
          border: var(--border-medium);
          border-radius: var(--radius-pill);
          box-shadow: var(--shadow-tactile-sm);
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .gh-cta-btn:hover {
          background: #6366F1;
          color: #FFFFFF;
          transform: translate(-2px, -2px);
          box-shadow: var(--shadow-hover);
        }

        .gh-repos-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        .repo-card {
          background: var(--bg-white);
          border: var(--border-thin);
          border-radius: 12px;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          text-decoration: none;
          color: inherit;
          box-shadow: 2px 2px 0px #11110F;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }

        .repo-card:hover {
          transform: translate(-2px, -2px);
          box-shadow: 4px 4px 0px #11110F;
        }

        .repo-top {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .repo-name {
          font-family: var(--font-hero);
          font-size: 1.05rem;
          font-weight: 800;
        }

        .repo-arrow {
          margin-left: auto;
          font-size: 0.8rem;
          font-weight: 800;
        }

        .repo-desc {
          font-size: 0.8rem;
          color: var(--text-gray);
          line-height: 1.4;
        }

        .repo-bottom {
          margin-top: auto;
        }

        @media (max-width: 900px) {
          .gh-repos-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 600px) {
          .gh-repos-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
