// Layout racine pour toutes les routes
// Pour les routes [locale], le LocaleLayout gère la locale
import { Roboto } from "next/font/google";
import "./globals.css";
import { defaultLocale } from "../i18n";
import { getLocale } from "next-intl/server";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata = {
  title: "Beeheidi",
  description: "Beeheidi",
  robots: "noindex, nofollow",
};

export default async function RootLayout({ children }) {
  // Essayer d'obtenir la locale depuis next-intl (fonctionne pour les routes [locale])
  // Sinon, utiliser la locale par défaut
  let locale = defaultLocale;
  try {
    locale = await getLocale();
  } catch {
    // Si getLocale() échoue (route non-localisée), utiliser la locale par défaut
    locale = defaultLocale;
  }

  return (
    <html lang={locale}>
      <body className={`${roboto.className} antialiased`}>{children}</body>
    </html>
  );
}
