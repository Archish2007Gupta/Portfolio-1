/**
 * Fetches certificates from the static public/certificates/certificates.json.
 * No backend required — this is a public asset served directly by Vite/CDN.
 * Returns data in the same shape as the old /api/certificates endpoint.
 * @returns {Promise<{ success: boolean, certificates: Array }>}
 */
export async function getCertificates() {
  try {
    const res = await fetch('/certificates/certificates.json');
    if (!res.ok) throw new Error(`Failed to fetch certificates.json: ${res.status}`);
    const raw = await res.json();

    if (!Array.isArray(raw)) return { success: true, certificates: [] };

    // Normalise each entry to match the shape CertificatesGallery expects
    const certificates = raw
      .sort((a, b) => (a.order ?? 9999) - (b.order ?? 9999))
      .map((item) => {
        const filename = item.filename || '';
        const ext = filename.split('.').pop()?.toLowerCase() || '';
        const fileUrl = `/certificates/${encodeURIComponent(filename)}`;
        const id = filename.replace(/\.[^/.]+$/, '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
        return {
          id,
          filename,
          title: item.title || filename,
          issuer: item.issuer || null,
          date: item.date || null,
          category: item.category || 'Verified Accreditation',
          credentialId: item.credentialId || null,
          tags: Array.isArray(item.tags) ? item.tags : [],
          description: item.description || `Official accreditation: ${item.title || filename}`,
          fileUrl,
          file: fileUrl,
          fileType: ext,
          order: item.order ?? 9999,
        };
      });

    return { success: true, certificates };
  } catch (err) {
    console.warn('[CERTIFICATES API] Falling back to empty list:', err.message);
    return { success: true, certificates: [] };
  }
}

export default { getCertificates };
