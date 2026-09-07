import { useState, useEffect } from 'react';
import { getResumeMetadata } from '../services/resumeApi.js';

/**
 * Custom hook to retrieve current resume state and metadata.
 * Centralizes resume API consumption to avoid duplicate logic across components.
 * @returns {{ available: boolean, url: string|null, downloadUrl: string|null, filename: string|null, size: number|null, updatedAt: string|null, loading: boolean, error: string|null }}
 */
export function useResume() {
  const [resume, setResume] = useState({
    available: false,
    url: null,
    downloadUrl: null,
    filename: null,
    size: null,
    updatedAt: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    let mounted = true;

    getResumeMetadata()
      .then((data) => {
        if (!mounted) return;
        if (data && data.available) {
          setResume({
            available: true,
            url: data.url || '/resume/resume.pdf',
            downloadUrl: data.downloadUrl || '/api/resume/download',
            filename: data.filename || 'resume.pdf',
            size: data.size || null,
            updatedAt: data.updatedAt || null,
            loading: false,
            error: null
          });
        } else {
          setResume({
            available: false,
            url: null,
            downloadUrl: null,
            filename: null,
            size: null,
            updatedAt: null,
            loading: false,
            error: null
          });
        }
      })
      .catch((err) => {
        if (!mounted) return;
        setResume({
          available: false,
          url: null,
          downloadUrl: null,
          filename: null,
          size: null,
          updatedAt: null,
          loading: false,
          error: err.message || 'Failed to load resume'
        });
      });

    return () => {
      mounted = false;
    };
  }, []);

  return resume;
}

export default useResume;
