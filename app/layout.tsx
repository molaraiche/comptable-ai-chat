import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Comptable AI - Assistant Comptable Marocain",
  description: "Assistant comptable intelligent basé sur le Plan Comptable Marocain et la Loi de Finances. Posez vos questions en français ou en arabe.",
  keywords: ["comptabilité", "Maroc", "AI", "assistant", "fiscalité", "Plan Comptable Marocain"],
  authors: [{ name: "Comptable AI" }],
  openGraph: {
    title: "Comptable AI - Assistant Comptable Marocain",
    description: "Assistant comptable intelligent basé sur le Plan Comptable Marocain",
    type: "website",
    locale: "fr_MA",
  },
  twitter: {
    card: "summary_large_image",
    title: "Comptable AI - Assistant Comptable Marocain",
    description: "Assistant comptable intelligent basé sur le Plan Comptable Marocain",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#047857",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
