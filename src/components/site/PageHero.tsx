import { Link } from "@tanstack/react-router";

export function PageHero({ title, crumbs = [] }: { title: string; crumbs?: { to?: string; label: string }[] }) {
  return (
    <section className="relative border-b border-border overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,color-mix(in_oklab,var(--primary)_15%,transparent),transparent_60%)]" />
      <div className="max-w-7xl mx-auto px-6 py-20 md:py-28 text-center relative">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">{title}</h1>
        <nav className="text-sm text-muted-foreground flex justify-center gap-2 flex-wrap">
          <Link to="/" className="hover:text-primary">Home</Link>
          {crumbs.map((c, i) => (
            <span key={i} className="flex gap-2">
              <span>›</span>
              {c.to ? <a href={c.to} className="hover:text-primary">{c.label}</a> : <span className="text-primary">{c.label}</span>}
            </span>
          ))}
        </nav>
      </div>
    </section>
  );
}
