const CONTACT_EMAIL = 'archishagupta4907@gmail.com';

/**
 * Submits a contact message by opening the user's default email client.
 * No backend required — uses a mailto: link to compose a pre-filled email.
 * Returns success shape immediately so ContactModal can show its success state.
 * @param {{ name: string, email: string, role?: string, message: string }} payload
 * @returns {Promise<{ success: boolean, message: string }>}
 */
export async function submitContact({ name, email, role, message }) {
  const subject = encodeURIComponent(`Portfolio Contact — ${role || 'General'} — ${name}`);
  const body = encodeURIComponent(
    `Hi Archisha,\n\nName: ${name}\nEmail: ${email}\nRole: ${role || 'Not specified'}\n\nMessage:\n${message}\n\n---\nSent via portfolio contact form.`
  );

  const mailtoUrl = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;

  // Open email client in a new tab/window
  if (typeof window !== 'undefined') {
    window.open(mailtoUrl, '_blank');
  }

  return {
    success: true,
    message: 'Your email client has been opened with a pre-filled message. Please send it to complete your contact request.'
  };
}

export default { submitContact };
