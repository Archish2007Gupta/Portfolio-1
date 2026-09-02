/* ============================================================
   App.jsx — Main Application Component
   ============================================================
   Assembles the entire personal digital exhibition for Archisha Gupta:
   HERO → ABOUT → SKILLS → ONE FLOW / WORK → EXPERIENCE & JOURNEY →
   DESIGN ARCHIVE → GITHUB → EXPERIMENTS → CONTACT → FOOTER
   ============================================================ */

import React, { useState } from 'react';

// Import all section components
import Preloader from './components/Preloader.jsx';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import MarqueeBanner from './components/MarqueeBanner.jsx';
import AboutSection from './components/AboutSection.jsx';
import Disciplines from './components/Disciplines.jsx';
import ProjectsSection from './components/ProjectsSection.jsx';
import JourneySection from './components/JourneySection.jsx';
import DesignArchive from './components/DesignArchive.jsx';
import GithubSection from './components/GithubSection.jsx';
import BugHuntGame from './components/BugHuntGame.jsx';
import ContactSection from './components/ContactSection.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {/* ── Preloader ── */}
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      {/* ── Main Site ── */}
      {!loading && (
        <>
          {/* Left-Side Fixed Navigation Sidebar */}
          <Navbar />

          <main>
            {/* HERO Banner with Creative Compass & Headline */}
            <Hero />

            {/* Marquee Banner */}
            <MarqueeBanner />

            {/* ABOUT — Profile & Statement */}
            <AboutSection />

            {/* SKILLS & WHAT I BUILD */}
            <Disciplines />

            {/* Divider Banner */}
            <MarqueeBanner />

            {/* ONE FLOW / SELECTED WORK (Scroll-Driven Flow) */}
            <ProjectsSection />

            {/* EXPERIENCE, EDUCATION & HACKATHONS */}
            <JourneySection />

            {/* DESIGN ARCHIVE */}
            <DesignArchive />

            {/* GITHUB & CODE REPOSITORIES */}
            <GithubSection />

            {/* EXPERIMENTS — Bug Hunt Game */}
            <BugHuntGame />

            {/* CONTACT & RESUME CTA */}
            <ContactSection />
          </main>

          {/* Footer */}
          <Footer />
        </>
      )}
    </>
  );
}
