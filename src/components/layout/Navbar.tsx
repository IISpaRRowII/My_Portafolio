'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { CloseIcon, GitHubIcon, MenuIcon } from '@/components/ui/icons';
import { profile } from '@/data/portafolio';
import { Container } from './Container';
import { navLinks } from './nav-links';

const githubUrl = profile.socials.find((s) => s.label === 'GitHub')?.url;
const nameWords = profile.name.split(' ');
const initials = nameWords.slice(0, 2).map((w) => w[0]).join('');
const shortName = nameWords.slice(0, 2).join(' ');

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        solid ? 'border-border bg-background/75 backdrop-blur-xl' : 'border-transparent'
      }`}
    >
      <Container className="flex h-16 items-center justify-between">
        <Link
          id="nav-logo"
          href="/"
          aria-label="Ir al inicio"
          className="group flex items-center gap-2.5 font-mono text-sm font-semibold tracking-tight"
        >
          <span className="grid size-8 place-items-center rounded-md border border-border bg-white/[0.03] transition-colors group-hover:border-accent/60 group-hover:text-accent">
            {initials}
          </span>
          <span className="hidden text-muted transition-colors group-hover:text-foreground sm:inline">
            {shortName}
            <span className="text-accent">.</span>
          </span>
        </Link>

        <nav aria-label="Principal" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.id}>
                <Link
                  id={`nav-${link.id}`}
                  href={link.href}
                  className="rounded-md px-3 py-2 text-sm text-muted transition-colors hover:bg-white/[0.04] hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          {githubUrl && (
            <a
              id="nav-github"
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-white/[0.03] px-3 py-1.5 text-sm font-medium transition-all hover:border-accent/50 hover:text-accent hover:shadow-[0_0_24px_-8px_var(--accent)] sm:px-4"
            >
              <GitHubIcon className="size-4" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
          )}

          <button
            id="nav-menu-toggle"
            type="button"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
            aria-controls="nav-mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="grid size-9 place-items-center rounded-md text-muted transition-colors hover:bg-white/[0.04] hover:text-foreground md:hidden"
          >
            {open ? <CloseIcon className="size-5" /> : <MenuIcon className="size-5" />}
          </button>
        </div>
      </Container>

      {open && (
        <nav id="nav-mobile-menu" aria-label="Móvil" className="border-t border-border md:hidden">
          <Container>
            <ul className="flex flex-col py-2">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-md px-2 py-3 text-sm text-muted transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </nav>
      )}
    </header>
  );
}
