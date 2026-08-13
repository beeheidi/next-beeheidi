import { NextIntlClientProvider } from "next-intl";
import { getMessages, getLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Roboto } from "next/font/google";
import "../globals.css";
import ConditionalHeader from "@/components/Header/ConditionalHeader";
import Footer from "@/components/Footer/Footer";
import CookieConsent from "@/components/CookieConsent/CookieConsent";
import { locales } from "../../i18n";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }) {
  // Dans Next.js 16, params est une Promise
  const { locale: paramLocale } = await params;

  // Utiliser la locale depuis les params (qui vient de l'URL) plutôt que getLocale()
  // car getLocale() peut retourner la locale par défaut au lieu de celle de l'URL
  const locale = paramLocale;

  // Valider que la locale est supportée
  if (!locales.includes(locale)) {
    notFound();
  }

  // Charger les messages pour la locale depuis les params
  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <ConditionalHeader />
      {children}
      <Footer />
      <CookieConsent />
    </NextIntlClientProvider>
  );
}

export const metadata = {
  title: "Beeheidi",
  description: "Beeheidi",
};
