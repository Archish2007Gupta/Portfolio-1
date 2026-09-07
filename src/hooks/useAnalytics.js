import { useCallback, useRef } from 'react';
import { sendAnalyticsEvent } from '../services/analyticsApi.js';

// Module-level guards to strictly prevent double-firing across React 18 StrictMode mounts
let globalPageViewSent = false;
const viewedSections = new Set();
const viewedProjects = new Set();

/**
 * Custom React hook for privacy-conscious portfolio analytics.
 * Non-blocking, failure-tolerant, deduplicated.
 */
export function useAnalytics() {
  /**
   * Track portfolio visit once per session/initial page load.
   * Strictly prevents duplicate page_view events from component re-renders.
   */
  const trackPageView = useCallback(() => {
    if (globalPageViewSent) return;

    try {
      if (typeof window !== 'undefined' && window.sessionStorage) {
        if (window.sessionStorage.getItem('portfolio_pv_sent')) {
          globalPageViewSent = true;
          return;
        }
        window.sessionStorage.setItem('portfolio_pv_sent', 'true');
      }
    } catch {
      // Storage unavailable
    }

    globalPageViewSent = true;
    sendAnalyticsEvent({
      event: 'page_view',
      section: 'portfolio',
      target: 'home'
    });
  }, []);

  /**
   * Track meaningful section views using IntersectionObserver.
   * Deduplicates each section within the browser session so scrolling
   * back and forth never creates spam events.
   * @param {string} section Name of section (e.g. 'hero', 'projects', 'github')
   */
  const trackSectionView = useCallback((section) => {
    if (!section || typeof section !== 'string') return;
    const cleanSection = section.toLowerCase().trim();

    if (viewedSections.has(cleanSection)) return;
    viewedSections.add(cleanSection);

    sendAnalyticsEvent({
      event: 'section_view',
      section: cleanSection,
      target: cleanSection
    });
  }, []);

  /**
   * Track project card views once per project per session.
   * @param {string} projectName
   */
  const trackProjectView = useCallback((projectName) => {
    if (!projectName || typeof projectName !== 'string') return;
    const key = projectName.toLowerCase().trim();

    if (viewedProjects.has(key)) return;
    viewedProjects.add(key);

    sendAnalyticsEvent({
      event: 'project_view',
      section: 'projects',
      target: projectName
    });
  }, []);

  /**
   * Track project demo / details clicks.
   * @param {string} projectName
   * @param {string} [actionType='demo']
   */
  const trackProjectClick = useCallback((projectName, actionType = 'demo') => {
    sendAnalyticsEvent({
      event: 'project_click',
      section: 'projects',
      target: projectName || actionType
    });
  }, []);

  /**
   * Track clicks on GitHub repository or profile links.
   * @param {string} target Repo name or link target
   */
  const trackGithubClick = useCallback((target) => {
    sendAnalyticsEvent({
      event: 'github_click',
      section: 'github',
      target: target || 'github_link'
    });
  }, []);

  /**
   * Track resume / CV views.
   */
  const trackResumeView = useCallback(() => {
    sendAnalyticsEvent({
      event: 'resume_view',
      section: 'resume',
      target: 'resume.pdf'
    });
  }, []);

  /**
   * Track resume / CV downloads.
   */
  const trackResumeDownload = useCallback(() => {
    sendAnalyticsEvent({
      event: 'resume_download',
      section: 'resume',
      target: 'resume.pdf'
    });
  }, []);

  /**
   * Track successful contact submissions.
   * ONLY called after backend HTTP 200 confirmation!
   */
  const trackContactSuccess = useCallback(() => {
    sendAnalyticsEvent({
      event: 'contact_success',
      section: 'contact',
      target: 'contact_form'
    });
  }, []);

  return {
    trackPageView,
    trackSectionView,
    trackProjectView,
    trackProjectClick,
    trackGithubClick,
    trackResumeView,
    trackResumeDownload,
    trackContactSuccess
  };
}

export default useAnalytics;
