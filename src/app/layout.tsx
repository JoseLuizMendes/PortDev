import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfólio | Estudante de Ciência da Computação",
  description: "Portfólio de um estudante apaixonado por tecnologia, mostrando projetos e habilidades em desenvolvimento web e mobile.",
  keywords: ["portfólio", "desenvolvedor", "ciência da computação", "web development", "react", "next.js"],
  authors: [{ name: "Estudante de Ciência da Computação" }],
  creator: "Estudante de Ciência da Computação",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    title: "Portfólio | Estudante de Ciência da Computação",
    description: "Portfólio de um estudante apaixonado por tecnologia, mostrando projetos e habilidades em desenvolvimento web e mobile.",
    siteName: "Portfólio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfólio | Estudante de Ciência da Computação",
    description: "Portfólio de um estudante apaixonado por tecnologia, mostrando projetos e habilidades em desenvolvimento web e mobile.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
