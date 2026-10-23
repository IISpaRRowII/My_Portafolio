import type { ComponentType, SVGProps } from 'react';
import { DiscordIcon, GitHubIcon, InstagramIcon, LinkedInIcon, MailIcon } from '@/components/ui/icons';
import { profile } from '@/data/portafolio';
import { Container } from './Container';
import { CurrentYear } from './CurrentYear';

type Icon = ComponentType<SVGProps<SVGSVGElement>>;

const socialIcons: Record<string, Icon> = {
  GitHub: GitHubIcon,
  LinkedIn: LinkedInIcon,
  Instagram: InstagramIcon,
  Discord: DiscordIcon,
};

const contactLinks: { label: string; url: string; Icon?: Icon }[] = [
  ...(profile.email ? [{ label: 'Email', url: `mailto:${profile.email}`, Icon: MailIcon }] : []),
  ...profile.socials.map((s) => ({ ...s, Icon: socialIcons[s.label] })),
];

export function Footer() {
  return (
    <footer className="border-t border-border">
      <Container className="flex flex-col items-center gap-6 py-10 sm:flex-row sm:justify-between">
        <div className="text-center sm:text-left">
          <p className="text-sm text-muted">
            © <CurrentYear /> {profile.name}. Todos los derechos reservados.
          </p>
          {profile.location && (
            <p className="mt-1 font-mono text-xs tracking-wide text-muted/60">{profile.location}</p>
          )}
        </div>

        <ul className="flex items-center gap-2">
          {contactLinks.map(({ label, url, Icon }) => {
            const external = !url.startsWith('mailto:');
            return (
              <li key={label}>
                <a
                  id={`footer-${label.toLowerCase()}`}
                  href={url}
                  aria-label={label}
                  title={label}
                  {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
                  className="grid size-9 place-items-center rounded-full border border-border text-muted transition-all hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent"
                >
                  {Icon ? <Icon className="size-4" /> : <span className="text-xs">{label}</span>}
                </a>
              </li>
            );
          })}
        </ul>
      </Container>
    </footer>
  );
}
