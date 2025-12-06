import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import ConditionalHeader from "@/components/ConditionalHeader";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata = {
  title: "Beeheidi",
  description: "Beeheidi",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${roboto.className} antialiased`}>
        <ConditionalHeader />
        {children}
      </body>
    </html>
  );
}
