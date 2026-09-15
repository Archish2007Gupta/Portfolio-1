/**
 * Returns hardcoded resume metadata (previously fetched from /api/resume).
 * The file is known to exist at /resume/resume.pdf — no backend check needed.
 * @returns {Promise<{ success: boolean, available: boolean, url: string, downloadUrl: string, filename: string }>}
 */
export async function getResumeMetadata() {
  return {
    success: true,
    available: true,
    url: '/resume/resume.pdf',
    downloadUrl: '/resume/resume.pdf',
    filename: 'resume.pdf',
  };
}

export default { getResumeMetadata };
