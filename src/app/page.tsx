import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Hero } from "@/components/Hero";
import { Skills } from "@/components/Skills";
import { VisitorRadar } from "@/components/VisitorRadar";
import { ProjectsSection } from "@/features/projects";

export default function Home() {
  return (
    <>
      {/* Sección Hero con Red Neuronal 3D / Cerebro Digital */}
      <Hero />

      {/* Sección Sobre mí con el Inspector developer.ts */}
      <About />

      {/* Sección Proyectos (Paso 5) */}
      <ProjectsSection />

      {/* Sección Habilidades (Paso 4) */}
      <Skills />

      {/* Sección Contacto (Paso 6) */}
      <Contact />

      {/* Radar de Visitantes & Muro de Pings en Vivo */}
      <VisitorRadar />
    </>
  );
}
