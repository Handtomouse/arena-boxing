/**
 * POST /api/contact — accept contact-form submissions from /location and
 * relay them as email via Resend.
 *
 * Required env vars:
 *   RESEND_API_KEY    — secret from https://resend.com/api-keys
 *   CONTACT_TO_EMAIL  — recipient (defaults to info@arenaboxing.com.au)
 *   CONTACT_FROM_EMAIL — sender shown in From: header (must be on a
 *                       Resend-verified domain; defaults to onboarding
 *                       sandbox for first-run testing)
 */

import { Resend } from 'resend';
import { NextResponse } from 'next/server';

type ContactPayload = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
};

const EMAIL_RX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const escapeHtml = (s: string): string =>
  s.replace(/[&<>"']/g, (c) => {
    const map: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    };
    return map[c] ?? c;
  });

export async function POST(request: Request) {
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      { error: 'Email transport not configured' },
      { status: 503 }
    );
  }

  let body: ContactPayload;
  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const name = body.name?.trim() ?? '';
  const email = body.email?.trim() ?? '';
  const subject = body.subject?.trim() ?? '';
  const message = body.message?.trim() ?? '';

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }
  if (!EMAIL_RX.test(email)) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
  }
  if (message.length < 10) {
    return NextResponse.json({ error: 'Message too short' }, { status: 400 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const toAddress = process.env.CONTACT_TO_EMAIL || 'info@arenaboxing.com.au';
  const fromAddress =
    process.env.CONTACT_FROM_EMAIL || 'Arena Boxing Bondi <onboarding@resend.dev>';

  try {
    const result = await resend.emails.send({
      from: fromAddress,
      to: [toAddress],
      replyTo: email,
      subject: `[Arena · ${subject}] ${name}`,
      html: `
        <div style="font-family:system-ui,sans-serif;line-height:1.5;color:#1a1a1a">
          <p><strong>From:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p>
          <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
          <hr style="border:none;border-top:1px solid #ccc;margin:16px 0" />
          <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
        </div>
      `,
      text: `From: ${name} <${email}>\nSubject: ${subject}\n\n${message}`,
    });

    if (result.error) {
      console.error('[contact] Resend error:', result.error);
      return NextResponse.json({ error: 'Send failed' }, { status: 502 });
    }
    return NextResponse.json({ ok: true, id: result.data?.id });
  } catch (err) {
    console.error('[contact] Unexpected error:', err);
    return NextResponse.json({ error: 'Send failed' }, { status: 500 });
  }
}
