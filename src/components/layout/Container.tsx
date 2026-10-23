import type { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

/** Limita el ancho del contenido para una lectura cómoda en cualquier pantalla. */
export function Container({ children, className = '' }: ContainerProps) {
  return <div className={`mx-auto w-full max-w-5xl px-4 sm:px-6 ${className}`}>{children}</div>;
}
