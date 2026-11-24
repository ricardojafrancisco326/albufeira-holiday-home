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
    default: "Albufeira Holiday Home | Vivenda T2 no Algarve",
    template: "%s | Albufeira Holiday Home",
  },
  description:
    "Vivenda T2 para férias em Albufeira, Algarve. Capacidade até 6 pessoas, cozinha equipada e localização a cerca de 5 minutos a pé do centro. Consulte informações e disponibilidade.",
  keywords: [
    "Albufeira Holiday Home",
    "vivenda férias Albufeira",
    "arrendamento férias Algarve",
    "vivenda T2 Albufeira",
    "casa de férias Albufeira",
    "alojamento Albufeira",
    "moradia de férias Algarve",
  ],
  openGraph: {
    title: "Albufeira Holiday Home | Vivenda de Férias",
    description:
      "Descubra o seu próximo destino de férias em Albufeira. Vivenda T2 para até 6 pessoas.",
    locale: "pt_PT",
    type: "website",
    siteName: "Albufeira Holiday Home",
    url: "https://albufeira-holiday-home.vercel.app",
  },
  alternates: {
    canonical: "https://albufeira-holiday-home.vercel.app",
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
