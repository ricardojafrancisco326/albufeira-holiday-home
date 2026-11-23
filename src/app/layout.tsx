import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Albufeira Holiday Home | Apartamento T2 no Algarve",
    template: "%s | Albufeira Holiday Home",
  },
  description:
    "Apartamento T2 para férias em Albufeira, Algarve. Capacidade até 6 pessoas, cozinha equipada e localização a cerca de 5 minutos a pé do centro. Consulte informações e disponibilidade.",
  keywords: [
    "Albufeira Holiday Home",
    "apartamento férias Albufeira",
    "arrendamento férias Algarve",
    "apartamento T2 Albufeira",
    "alojamento Albufeira",
  ],
  openGraph: {
    title: "Albufeira Holiday Home",
    description:
      "Descubra o seu próximo destino de férias em Albufeira. Apartamento T2 para até 6 pessoas.",
    locale: "pt_PT",
    type: "website",
    siteName: "Albufeira Holiday Home",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
