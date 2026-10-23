import { Contact } from "@/components/Contact";
import { Hero } from "@/components/Hero";
import { Skills } from "@/components/Skills";
import { ProjectsSection } from "@/features/projects";

export default function Home() {
  return (
    <>
      {/* Sección Hero */}
      <Hero />

      {/* Sección Proyectos (Paso 5) */}
      <ProjectsSection />

      {/* Sección Habilidades (Paso 4) */}
      <Skills />

      {/* Sección Contacto (Paso 6) */}
      <Contact />
    </>
  );
}
