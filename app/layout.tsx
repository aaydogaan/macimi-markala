import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Mac'imi Markala — MacBook'umu Markaların Reklamlarıyla Alıyorum",
  description:
    "MacBook kapağındaki reklam alanlarından birini markanız için seçin. MacBook'umu markaların reklam bütçesiyle alıyor, markanızı gittiğim her yerde taşıyorum.",
  keywords: [
    "MacBook",
    "reklam",
    "marka",
    "sticker",
    "reklam alanı",
    "MacBook reklam",
  ],
  openGraph: {
    title: "Mac'imi Markala — MacBook'umu Markaların Reklamlarıyla Alıyorum",
    description:
      "MacBook kapağındaki reklam alanlarından birini markanız için seçin.",
    type: "website",
    locale: "tr_TR",
    siteName: "Mac'imi Markala",
  },
  icons: {
    icon: "/images/logo-small.webp",
    shortcut: "/images/logo-small.webp",
    apple: "/images/logo-small.webp",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mac'imi Markala",
    description:
      "MacBook kapağındaki reklam alanlarından birini markanız için seçin.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="tr" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
