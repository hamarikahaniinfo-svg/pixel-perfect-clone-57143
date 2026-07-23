import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { services } from "@/data/services";

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2">
      <svg width="34" height="34" viewBox="0 0 40 40" fill="none">
        <path d="M20 2 L23 17 L38 20 L23 23 L20 38 L17 23 L2 20 L17 17 Z" fill="var(--primary)" />
      </svg>
      <span className="font-display font-bold text-xl tracking-wide">NFS TECH</span>
    </Link>
  );
}

const portfolioLinks = [
  { to: "/website-projects", label: "Website Projects" },
  { to: "/graphics-design", label: "Graphics Design" },
  { to: "/seo-portfolio", label: "SEO Portfolio" },
  { to: "/meta-ads", label: "Meta Ads" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 backdrop-blur-lg bg-background/70 border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Logo />
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium">
          <Link to="/" activeOptions={{ exact: true }} activeProps={{ className: "text-primary" }} className="hover:text-primary transition">Home</Link>
          <Link to="/about" activeProps={{ className: "text-primary" }} className="hover:text-primary transition">About</Link>
          <div className="relative group">
            <button className="hover:text-primary transition inline-flex items-center gap-1">Services <span className="text-xs">▾</span></button>
            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition">
              <div className="card-dark p-2 min-w-56 grid gap-1">
                {services.map(s => (
                  <Link key={s.slug} to="/services/$slug" params={{ slug: s.slug }} className="px-3 py-2 rounded hover:bg-muted hover:text-primary text-sm">{s.title}</Link>
                ))}
              </div>
            </div>
          </div>
          <div className="relative group">
            <button className="hover:text-primary transition inline-flex items-center gap-1">Portfolio <span className="text-xs">▾</span></button>
            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition">
              <div className="card-dark p-2 min-w-52 grid gap-1">
                {portfolioLinks.map(l => (
                  <Link key={l.to} to={l.to} className="px-3 py-2 rounded hover:bg-muted hover:text-primary text-sm">{l.label}</Link>
                ))}
              </div>
            </div>
          </div>
          <Link to="/faqs" activeProps={{ className: "text-primary" }} className="hover:text-primary transition">FAQs</Link>
          <Link to="/contact" activeProps={{ className: "text-primary" }} className="hover:text-primary transition">Contact</Link>
        </nav>
        <div className="flex items-center gap-3">
          <a href="https://wa.me/923154928868" className="hidden sm:inline-flex text-sm font-semibold tracking-wider hover:text-primary transition">LET'S TALK</a>
          <button onClick={() => setOpen(!open)} className="lg:hidden w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center" aria-label="Menu">
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>
      {open && (
        <div className="lg:hidden border-t border-border bg-background/95 backdrop-blur">
          <nav className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-1 text-sm">
            <Link to="/" onClick={() => setOpen(false)} className="py-2 border-b border-border">Home</Link>
            <Link to="/about" onClick={() => setOpen(false)} className="py-2 border-b border-border">About</Link>
            <details><summary className="py-2 border-b border-border cursor-pointer">Services</summary>
              <div className="pl-4 grid">
                {services.map(s => <Link key={s.slug} to="/services/$slug" params={{ slug: s.slug }} onClick={() => setOpen(false)} className="py-2 text-muted-foreground hover:text-primary">{s.title}</Link>)}
              </div>
            </details>
            <details><summary className="py-2 border-b border-border cursor-pointer">Portfolio</summary>
              <div className="pl-4 grid">
                {portfolioLinks.map(l => <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="py-2 text-muted-foreground hover:text-primary">{l.label}</Link>)}
              </div>
            </details>
            <Link to="/faqs" onClick={() => setOpen(false)} className="py-2 border-b border-border">FAQs</Link>
            <Link to="/contact" onClick={() => setOpen(false)} className="py-2 border-b border-border">Contact</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
