import Link from "next/link";
import { DATA } from "@/app/data/resume";

const generalLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/projects", label: "Projects" },
];

export default function Footer() {
  const resources = Object.entries(DATA.contact.social);
  return (
    <footer className="mt-24 sm:mt-32 border-t border-border pt-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <div className="flex flex-col gap-1">
          <p className="font-semibold">{DATA.name}</p>
          <p className="text-sm text-muted-foreground">Software Engineer</p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">General</p>
          {generalLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="w-fit text-sm text-muted-foreground transition-colors hover:text-foreground active:scale-[0.97] motion-reduce:transition-none motion-reduce:active:scale-100"
            >
              {l.label}
            </Link>
          ))}
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Resources</p>
          {resources.map(([name, s]) => (
            <a
              key={name}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-fit text-sm text-muted-foreground transition-colors hover:text-foreground active:scale-[0.97] motion-reduce:transition-none motion-reduce:active:scale-100"
            >
              {name}
            </a>
          ))}
        </div>
      </div>
      <p className="mt-6 text-xs text-muted-foreground">
        © {new Date().getFullYear()} {DATA.name}
      </p>
    </footer>
  );
}
