# Portafolio Profesional - Juan Felipe Vargas Giraldo

Portafolio web moderno de alto rendimiento y arquitectura modular basada en características (*feature-based*), desarrollado con **Next.js 16 (App Router)**, **React 19**, **TypeScript** y **Tailwind CSS v4**.

---

## 🚀 Tecnologías Principales

- **Framework:** [Next.js 16](https://nextjs.org/) con App Router y Turbopack.
- **Librería UI:** [React 19](https://react.dev/).
- **Lenguaje:** [TypeScript](https://www.typescriptlang.org/) en modo estricto y alias de importación (`@/*`).
- **Estilos:** [Tailwind CSS v4](https://tailwindcss.com/) configurado mediante `@theme inline` y soporte de diseño oscuro (*Dark Mode*).
- **Linter:** [ESLint 9](https://eslint.org/) con reglas optimizadas para Next.js y TypeScript.
- **Iconografía:** SVGs optimizados inline sin dependencias pesadas de terceros.

---

## 📁 Arquitectura del Proyecto

El código fuente se organiza siguiendo el estándar de arquitectura modular (*Feature-Based Architecture*), separando la lógica de negocio de la presentación visual y facilitando su escalabilidad:

```text
Portafolio/
├── public/                       # Archivos estáticos públicos (favicons, imágenes, cv.pdf)
├── src/
│   ├── app/                      # Rutas principales, layout base y configuración global
│   │   ├── favicon.ico
│   │   ├── globals.css           # Tokens de diseño Tailwind v4 (@theme) y estilos base
│   │   ├── layout.tsx            # Root Layout con Navbar, Footer y scroll suave
│   │   └── page.tsx              # Página principal que orquesta las secciones
│   ├── components/               # Componentes UI globales y de presentación
│   │   ├── layout/               # Elementos estructurales compartidos
│   │   │   ├── Container.tsx     # Contenedor centralizado (max-w-5xl mx-auto px-4)
│   │   │   ├── CurrentYear.tsx   # Año dinámico aislado con directiva 'use cache' (Next 16)
│   │   │   ├── Footer.tsx        # Pie de página con copyright, ubicación y redes
│   │   │   ├── Navbar.tsx        # Barra de navegación fija con backdrop-blur y menú móvil
│   │   │   ├── nav-links.ts      # Configuración de rutas y anclas de navegación
│   │   │   └── index.ts          # Barrel export del layout
│   │   ├── ui/                   # Primitivos de diseño reutilizables
│   │   │   └── icons.tsx         # Iconos SVG puros y accesibles (GitHub, LinkedIn, Mail, etc.)
│   │   ├── Contact.tsx           # Sección interactiva de contacto y formulario
│   │   ├── Hero.tsx              # Sección principal con terminal interactiva y CTAs
│   │   └── Skills.tsx            # Sección de habilidades técnicas en cuadrícula
│   ├── data/
│   │   └── portafolio.ts         # Fuente única de datos (perfil, skills y proyectos)
│   ├── features/                 # Módulos organizados por dominio de negocio
│   │   ├── projects/             # Dominio de Proyectos
│   │   │   ├── components/
│   │   │   │   ├── ProjectCard.tsx     # Tarjeta individual con tags, repo y demo
│   │   │   │   └── ProjectsSection.tsx # Sección completa con llamada al servicio
│   │   │   ├── services/
│   │   │   │   └── projects.service.ts # Capa de consulta y filtrado de proyectos
│   │   │   ├── types.ts                # Interfaces TypeScript del modelo Project
│   │   │   └── index.ts                # API pública del feature projects
│   │   └── auth/                 # Dominio de Autenticación (preparado para escalar)
│   ├── lib/                      # Configuración de clientes externos (db, supabase, axios)
│   └── types/                    # Tipos globales del sistema (ApiResponse, PaginatedResult)
├── .gitignore
├── next.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🧩 Funcionamiento y Secciones

### 1. Barra de Navegación (`Navbar.tsx`)
- **Efecto dinámico:** Totalmente transparente en la parte superior y se transforma en una barra translúcida con desenfoque de fondo (*glassmorphism / backdrop-blur*) y borde sutil al hacer scroll.
- **Scroll suave:** Enlaces ancla directos a `#proyectos`, `#habilidades` y `#contacto` respetando el desplazamiento de la barra fija (`scroll-padding-top`).
- **Botón directo a GitHub:** Acceso rápido al perfil de código.
- **Menú Móvil:** Panel desplegable accesible que se cierra automáticamente al hacer clic en cualquier sección.

### 2. Sección Principal (`Hero.tsx`)
- **Badge de disponibilidad:** Indicador visual animado con punto verde pulsante (`🟢 Disponible para nuevos proyectos`).
- **Llamados a la acción (CTAs):** Botones con transiciones para explorar proyectos o contactar directamente.
- **Tarjeta Terminal (`developer.ts`):** Representación visual de un objeto tipado con tu información, ubicación (*Medellín, Colombia*), especialidades y llamada simulada a métodos.
- **Stack Destacado:** Etiquetas rápidas con las tecnologías principales.

### 3. Sección de Proyectos (`features/projects`)
- Desarrollada bajo el patrón **Feature-Based**.
- Los datos se consultan mediante `projects.service.ts`, lo que permite migrar de datos estáticos a una API externa (GitHub API, Supabase, etc.) sin alterar los componentes visuales.
- Cada tarjeta (`ProjectCard.tsx`) soporta:
  - Badge de proyecto **Destacado**.
  - Enlace al repositorio de **GitHub**.
  - Enlace a la **Demo en vivo** (si existe `demoUrl`).
  - Etiquetas con las tecnologías utilizadas.
  - Elevación suave (*hover lift*) al interactuar.

### 4. Sección de Habilidades (`Skills.tsx`)
- Cuadrícula responsiva (1 a 3 columnas) dividida en 6 categorías:
  - **Frontend:** TypeScript, React, HTML, CSS, JavaScript.
  - **Backend:** Node.js, Python, Java, Solidity, SQL.
  - **Bases de Datos:** MySQL, Oracle.
  - **Herramientas:** Git, GitHub.
  - **Metodologías:** Agile, Scrum.
  - **Idiomas:** Español, Inglés.
- Cada categoría incluye un icono distintivo, conteo de tecnologías y chips interactivos.

### 5. Sección de Contacto (`Contact.tsx`)
- **Copia con un clic:** Botón interactivo para copiar el correo (`pip3.solutions@gmail.com`) con retroalimentación animada (`✓ ¡Copiado al portapapeles!`).
- **Tarjeta de disponibilidad:** Ubicación y zona horaria (`GMT-5 Colombia`).
- **Formulario de Mensaje:** Campos para nombre, correo, asunto y mensaje. Al enviar, prepara automáticamente el correo pre-rellenado para el usuario y muestra confirmación en pantalla.

### 6. Pie de Página (`Footer.tsx`)
- Derechos de autor con año dinámico aislado con `'use cache'` (nueva convención de Next.js 16 para optimización de prerendering estático).
- Iconos de redes sociales con microanimación de elevación al hacer hover.

---

## 🛠️ Personalización de Datos

Todo el contenido del portafolio se encuentra centralizado en un único archivo:

👉 **[src/data/portafolio.ts](file:///c:/Users/PIPE/OneDrive/Documentos/DEV-PROJECTS/Portafolio/src/data/portafolio.ts)**

Para actualizar tu información:

1. **Perfil (`profile`):** Edita nombre, rol, biografía, correo, ubicación y enlaces a redes sociales.
2. **Habilidades (`skills`):** Agrega o modifica categorías y tecnologías.
3. **Proyectos (`projects`):** Añade nuevos proyectos con el siguiente formato:
   ```typescript
   {
     id: 'mi-nuevo-proyecto',
     title: 'Nombre del Proyecto',
     description: 'Descripción breve de la solución y valor aportado.',
     tags: ['React', 'Node.js', 'PostgreSQL'],
     repoUrl: 'https://github.com/IISpaRRowII/repo',
     demoUrl: 'https://demo-en-vivo.com', // Opcional
     featured: true, // true para mostrar badge destacado
     createdAt: '2026-10-23',
   }
   ```

---

## 💻 Guía de Instalación y Comandos

### Requisitos previos
- [Node.js](https://nodejs.org/) v20.x o superior.
- Gestor de paquetes `npm`.

### 1. Clonar el repositorio
```bash
git clone https://github.com/IISpaRRowII/My_Portafolio.git
cd My_Portafolio
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Ejecutar en modo desarrollo
```bash
npm run dev
```
Abre en tu navegador: [http://localhost:3000](http://localhost:3000)

### 4. Compilar para producción (Build)
```bash
npm run build
```
Genera la versión optimizada en la carpeta `.next/` con renderizado estático de alto rendimiento.

### 5. Ejecutar servidor de producción local
```bash
npm run start
```

### 6. Validar estilo y buenas prácticas (Lint)
```bash
npm run lint
```

---

## 🚢 Despliegue en Producción (Vercel)

El proyecto está 100% optimizado para desplegarse con un clic en **[Vercel](https://vercel.com/)**:

1. Sube tu código a tu repositorio de GitHub.
2. Inicia sesión en [Vercel](https://vercel.com/) y haz clic en **"Add New Project"**.
3. Selecciona tu repositorio `My_Portafolio`.
4. Vercel detectará automáticamente Next.js. Haz clic en **"Deploy"**.
5. Tu portafolio estará activo con dominio gratuito `.vercel.app`, certificado SSL automático y red global de distribución (CDN).

---

## 📄 Licencia

Este proyecto es de uso personal y código abierto bajo la licencia MIT. Puedes utilizarlo como base para tu propio portafolio personal dando el debido crédito.
