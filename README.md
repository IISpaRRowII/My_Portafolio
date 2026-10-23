# Portafolio - Arquitectura del Proyecto

Estructura modular y escalable organizada por funcionalidades (*feature-based*), componentes de diseño reutilizables y separación clara de responsabilidades.

## Estructura de Directorios

```text
src/
├── app/                  # Rutas principales, layout base y providers globales
├── components/           # Componentes UI reutilizables y primitivos (botones, modales)
│   └── ui/               # Componentes de diseño base (estilo shadcn)
├── features/             # Agrupación por dominio/funcionalidad
│   ├── projects/
│   │   ├── components/   # Componentes exclusivos de la entidad proyectos
│   │   ├── services/     # Llamadas a API / controladores de proyectos
│   │   ├── types.ts      # Interfaces / tipos de datos de proyectos
│   │   ├── hooks/        # Lógica de estado / custom hooks de proyectos
│   │   └── index.ts      # Punto de entrada / API pública del módulo projects
│   └── auth/
│       ├── components/   # Componentes exclusivos de autenticación (formularios, login)
│       ├── services/     # Servicios y autenticación (OAuth, tokens, API)
│       ├── types.ts      # Interfaces y tipos de usuario y sesión
│       ├── hooks/        # Hooks de sesión, permisos y estado de auth
│       └── index.ts      # Punto de entrada / API pública del módulo auth
├── lib/                  # Clientes externos configurados (db, supabase, axios, utils)
└── types/                # Tipos e interfaces globales del sistema
```

## Reglas de Organización

1. **Features**:
   - Cada feature encapsula su lógica, tipos, servicios y componentes.
   - Si un componente es usado únicamente dentro de `projects`, debe vivir en `features/projects/components`.
   - Si un componente o utilidad es genérica y compartida globalmente, debe residir en `components/` o `lib/`.
   - Cada feature expone sus módulos públicos a través de su `index.ts`.

2. **Components**:
   - `components/ui/`: Primitivos visuales (Button, Input, Dialog, etc.).
   - `components/`: Componentes compartidos de alto nivel (Navbar, Footer, Layouts comunes).

3. **Lib**:
   - Configuración de clientes (Supabase, Firebase, Axios, Prisma, helpers como `cn()`).

4. **App**:
   - Providers globales (Theme, QueryClient, AuthProvider) y definición de rutas.
