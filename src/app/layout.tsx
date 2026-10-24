import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Footer, Navbar } from "@/components/layout";
import { NeuralNetwork } from "@/components/ui/NeuralNetwork";
import { profile } from "@/data/portafolio";
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
  title: `${profile.name} · Portafolio`,
  description: profile.bio,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="relative flex min-h-full flex-col font-sans overflow-x-hidden selection:bg-accent selection:text-background">
        {/* Capa de fondo espacial con textura, esferas de luz y red neuronal global */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
        >
          {/* Malla de profundidad sutil */}
          <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:36px_36px] opacity-60" />

          {/* Red neuronal ambiental suave en toda la página */}
          <NeuralNetwork variant="global" />

          {/* Orbe flotante 1 (Superior izquierdo, color acento turquesa) */}
          <div className="absolute -left-32 -top-20 h-[500px] w-[500px] rounded-full bg-accent/15 blur-[130px] animate-float-slow" />

          {/* Orbe flotante 2 (Centro derecho, color esmeralda) */}
          <div className="absolute -right-32 top-1/3 h-[550px] w-[550px] rounded-full bg-emerald-500/10 blur-[140px] animate-float-delayed" />

          {/* Orbe flotante 3 (Inferior izquierdo, pulsación suave) */}
          <div className="absolute left-1/4 bottom-10 h-[480px] w-[480px] rounded-full bg-cyan-500/10 blur-[130px] animate-pulse-glow" />
        </div>

        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-accent focus:px-3 focus:py-2 focus:text-sm focus:text-background"
        >
          Saltar al contenido
        </a>

        <Navbar />

        <main id="contenido" className="flex-1 pt-16">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
