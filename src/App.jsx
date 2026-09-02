/* ============================================================
   App.jsx — Archisha Gupta 2026 Digital Exhibition
   ============================================================
   Built faithfully following the Nirmaan 2026 (Kishan0703/Nirmaan_2026)
   design system, layout architecture, 3D artifacts, and mechanics.
   ============================================================ */

import React, { useState } from 'react';

// Section Components
import Preloader from './components/Preloader.jsx';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import MarqueeBanner from './components/MarqueeBanner.jsx';
import SectionTitle from './components/SectionTitle.jsx';
import AboutSection from './components/AboutSection.jsx';
import Disciplines from './components/Disciplines.jsx';
import ProjectsSection from './components/ProjectsSection.jsx';
import DesignArchive from './components/DesignArchive.jsx';
import CertificatesGallery from './components/CertificatesGallery.jsx';
import GithubSection from './components/GithubSection.jsx';
import ContactSection from './components/ContactSection.jsx';
import Footer from './components/Footer.jsx';

// Interactive Overlays & Real-Time Elements
import ContactModal from './components/ContactModal.jsx';
import LobbyNotificationListener from './components/LobbyNotificationListener.jsx';
import WhatsappFloatingButton from './components/WhatsappFloatingButton.jsx';

// Data
import { marqueeOneItems, marqueeTwoItems } from './data/portfolioData.js';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [contactModalOpen, setContactModalOpen] = useState(false);

  const openContactModal = () => {
    setContactModalOpen(true);
  };

  const closeContactModal = () => {
    setContactModalOpen(false);
  };

  return (
    <>
      {/* ── System Preloader ── */}
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      {/* ── Main Portfolio Experience ── */}
      {!loading && (
        <>
          {/* Left Vertical Rail Navigation */}
          <Navbar onOpenContact={openContactModal} />

          {/* Main Content (With left rail offset on desktop) */}
          <main className="main-content-rail">
            
            {/* 00. Signature Hero */}
            <Hero onOpenContact={openContactModal} />

            {/* Marquee Banner Ribbon One */}
            <MarqueeBanner
              bgColorHex="#EF333A"
              textColorHex="#FFB200"
              items={marqueeOneItems}
            />

            {/* Signature Nirmaan Section Divider 1 */}
            <SectionTitle bgColor="#0072E3" textColor="#FFB200">
              ENGINEERING CRAFT &amp; VALUES
            </SectionTitle>

            {/* 01. Overview & 4 Core Values + Builder Route Flow */}
            <AboutSection onOpenContact={openContactModal} />

            {/* Signature Nirmaan Section Divider 2 */}
            <SectionTitle bgColor="#FFB200" textColor="#11110F">
              CHALLENGE DOMAINS &amp; SYSTEMS
            </SectionTitle>

            {/* 02. Domain Tracks & Capabilities + Skewed Track Wall */}
            <Disciplines onOpenContact={openContactModal} />

            {/* Marquee Banner Ribbon Two */}
            <MarqueeBanner
              bgColorHex="#0072E3"
              textColorHex="#1BE349"
              items={marqueeTwoItems}
            />

            {/* Signature Nirmaan Section Divider 3 */}
            <SectionTitle bgColor="#EF333A" textColor="#FFFFFF">
              SELECTED WORK &amp; PROTOTYPES
            </SectionTitle>

            {/* 03. Asymmetric Selected Work */}
            <ProjectsSection />

            {/* Signature Nirmaan Section Divider: Certificates */}
            <SectionTitle bgColor="#0072E3" textColor="#FFB200">
              CREDENTIALS &amp; CERTIFICATES VAULT
            </SectionTitle>

            {/* 04. Certificates Vault Marquee */}
            <CertificatesGallery onOpenContact={openContactModal} />

            {/* Signature Nirmaan Section Divider 5 */}
            <SectionTitle bgColor="#AB54F7" textColor="#FFFFFF">
              CODE RADAR &amp; COMMITS
            </SectionTitle>

            {/* 05. GitHub Radar & Repositories */}
            <GithubSection />

            {/* Signature Nirmaan Section Divider 4 */}
            <SectionTitle bgColor="#00AA3C" textColor="#11110F">
              DESIGN ARCHIVE &amp; GALLERY
            </SectionTitle>

            {/* 06. Design Archive with Live Marquee */}
            <DesignArchive onOpenContact={openContactModal} />

            {/* Signature Nirmaan Section Divider 6 */}
            <SectionTitle bgColor="#FF6100" textColor="#FFFFFF">
              NETWORK &amp; INBOX
            </SectionTitle>

            {/* 06. FAQs & Direct Contact */}
            <ContactSection onOpenContact={openContactModal} />

            {/* Neo-Brutalist Grid Footer */}
            <Footer onOpenContact={openContactModal} />

          </main>

          {/* Interactive "Let's Talk" Drawer Modal */}
          <ContactModal
            open={contactModalOpen}
            onClose={closeContactModal}
          />

          {/* Real-time Activity Toast Notification Listener */}
          <LobbyNotificationListener />

          {/* Floating Quick Connect Button */}
          <WhatsappFloatingButton onOpenContact={openContactModal} />
        </>
      )}
    </>
  );
}
