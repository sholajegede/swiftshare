import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import ConvexKindeProvider from "@/providers/ConvexKindeProvider";
import { TooltipProvider } from "@/components/ui/tooltip";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const defaultUrl =
  process.env.NODE_ENV === "production"
    ? `https://${process.env.VERCEL_URL || "tryswiftshare.vercel.app"}`
    : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "SwiftShare | Effortlessly store, share, and access your files anywhere with our secure, lightning-fast cloud solution.",
  description: "The fastest and most secure way to share your files. No signup required for basic sharing. Enterprise-grade encryption for all your files.",
  openGraph: {
    title: "SwiftShare | Effortlessly store, share, and access your files anywhere with our secure, lightning-fast cloud solution.",
    description: "The fastest and most secure way to share your files. No signup required for basic sharing. Enterprise-grade encryption for all your files.",
    images: [
      {
        url: `${defaultUrl}/home.png`,
        alt: "SwiftShare | Effortlessly store, share, and access your files anywhere with our secure, lightning-fast cloud solution.",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConvexKindeProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <TooltipProvider>
              {children}
            </TooltipProvider>
          </ThemeProvider>
        </body>
      </html>
    </ConvexKindeProvider>
  );
};