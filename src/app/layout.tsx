import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { SchemaMarkup } from "@/components/ui/schema-markup";
import { SpeedInsights } from '@vercel/speed-insights/next';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://portdev-bice.vercel.app"),
  title: {
    default: "Portifólio José Luiz Mendes | Desenvolvedor Full Stack",
    template: "%s | Desenvolvedor Full Stack",
  },
  description:
    "Desenvolvedor Full Stack especializado em Java, Spring, React, Next.js e TypeScript. 2 anos de experiência criando soluções web modernas. Disponível para contratação e projetos freelance.",
  keywords: [
    // Palavras-chave para contratação
    "desenvolvedor full stack",
    "programador java",
    "desenvolvedor react",
    "desenvolvedor next.js",
    "desenvolvedor typescript",
    "desenvolvedor front-end",
    "desenvolvedor back-end",
    "engenheiro de software",

    // Tecnologias específicas
    "java",
    "C#",
    ".net",
    "asp.net",
    "spring boot",
    "react.js",
    "next.js",
    "node.js",
    "typescript",
    "javascript",
    "tailwind css",
    "sql developer",
    "postgresql",
    "mongodb",
    "oracle database",

    // Serviços
    "desenvolvedor freelance",
    "desenvolvedor remoto",
    "desenvolvedor junior",
    "desenvolvedor web",
    "desenvolvedor full stack",

    // Localização e contexto
    "desenvolvedor brasil",
    "portfólio desenvolvedor",
    "ciência da computação",
    "estudante tecnologia",
  ],
  authors: [{ name: "José Luiz Mendes" }],
  creator: "José Luiz Mendes",
  publisher: "José Luiz Mendes",

  // Open Graph para redes sociais
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://portdev-bice.vercel.app", // Mantenha o seu domínio Vercel
    siteName: "Portfólio Profissional - Desenvolvedor Full Stack",
    title: "Portifólio José Luiz Mendes | Desenvolvedor Full Stack",
    description:
      "Desenvolvedor Full Stack com expertise em Java, Spring, React e Next.js. Transformo ideias em soluções digitais de alta qualidade. Veja meus projetos e entre em contato!",
    images: [
      {
        // ✅ CORREÇÃO: Caminho público correto e Cache Busting
        url: "/port-hero.png?v=6",
        width: 1200,
        height: 630,
        alt: "Portfólio Desenvolvedor Full Stack",
        // ✅ CORREÇÃO: Tipo MIME
        type: "image/png", 
      },
    ],
  },

  // Twitter Card (NECESSÁRIO, pois o LinkedIn o usa!)
  twitter: {
    card: "summary_large_image",
    title: "Desenvolvedor Full Stack | Java, React, Next.js",
    description:
      "Desenvolvedor Full Stack especializado em criar aplicações web modernas e escaláveis. Disponível para projetos.",
    creator: "@seutwitter", // Troque isso, se tiver Twitter.
    // ✅ CORREÇÃO: Imagem correta e Cache Busting
    images: ["/port-hero.png?v=6"], 
  },

  // Robots e indexação
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Informações adicionais para SEO
  category: "Technology",
  classification: "Portfolio",

  // Verificação de propriedade (adicione quando tiver)
  // verification: {
  //   google: "seu-codigo-google-search-console",
  //   yandex: "seu-codigo-yandex",
  //   bing: "seu-codigo-bing",
  // },

  // Outros metadados importantes
  alternates: {
    canonical: "https://seudominio.com.br", // ALTERE PARA SEU DOMÍNIO
  },

  // Informações para aplicativos
  applicationName: "Portfólio Profissional",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <SchemaMarkup />
      </head>
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
        <SpeedInsights />
      </body>
    </html>
  );
}
