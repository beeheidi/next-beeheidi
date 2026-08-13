// Layout racine pour toutes les routes
// Pour les routes [locale], le LocaleLayout gère la locale
import { Roboto, Poppins } from "next/font/google";
import "./globals.css";
import { defaultLocale } from "../i18n";
import { getLocale } from "next-intl/server";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "Beeheidi",
  description: "Beeheidi",
  icons: {
    icon: [{ url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" }],
    shortcut: "/favicon-32x32.png",
    apple: "/favicon-32x32.png",
  },
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
      <body className={`${roboto.variable} ${poppins.variable} antialiased`}>{children}</body>
    </html>
  );
}
