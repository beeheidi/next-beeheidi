import { Resend } from "resend";
import { NextResponse } from "next/server";

const escapeHtml = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const verifyRecaptcha = async (token) => {
  if (!token) return false;

  const response = await fetch(
    "https://www.google.com/recaptcha/api/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: process.env.RECAPTCHA_SECRET_KEY,
        response: token,
      }),
    }
  );

  const data = await response.json();
  return data.success === true;
};

export async function POST(request) {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY manquante");
      return NextResponse.json(
        { error: "Configuration email manquante" },
        { status: 500 }
      );
    }

    if (!process.env.RECAPTCHA_SECRET_KEY) {
      console.error("RECAPTCHA_SECRET_KEY manquante");
      return NextResponse.json(
        { error: "Configuration reCAPTCHA manquante" },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { firstName, name, email, phone, subject, message, prestation, recaptchaToken } =
      body ?? {};

    if (!firstName?.trim() || !name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "Champs obligatoires manquants" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Adresse email invalide" },
        { status: 400 }
      );
    }

    const isHuman = await verifyRecaptcha(recaptchaToken);
    if (!isHuman) {
      return NextResponse.json(
        { error: "Vérification reCAPTCHA échouée" },
        { status: 400 }
      );
    }

    const to = process.env.CONTACT_TO_EMAIL;
    if (!to) {
      console.error("CONTACT_TO_EMAIL manquante");
      return NextResponse.json(
        { error: "Configuration email manquante" },
        { status: 500 }
      );
    }

    const from =
      process.env.CONTACT_FROM_EMAIL || "Beeheidi <onboarding@resend.dev>";
    const safeSubject =
      subject?.trim() ||
      (prestation
        ? `Demande – ${prestation}`
        : "Nouveau message depuis le site");

    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: email,
      subject: `[Beeheidi] ${safeSubject}`,
      html: `
        <h2>Nouveau message de contact</h2>
        <p><strong>Prénom :</strong> ${escapeHtml(firstName)}</p>
        <p><strong>Nom :</strong> ${escapeHtml(name)}</p>
        <p><strong>Email :</strong> ${escapeHtml(email)}</p>
        <p><strong>Téléphone :</strong> ${escapeHtml(phone || "—")}</p>
        <p><strong>Sujet :</strong> ${escapeHtml(subject || "—")}</p>
        ${
          prestation
            ? `<p><strong>Prestation :</strong> ${escapeHtml(prestation)}</p>`
            : ""
        }
        <p><strong>Message :</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Échec de l'envoi du message" },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
