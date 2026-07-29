import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { services } from "@/data/services";

function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link to="/" onClick={onClick} className="flex items-center gap-2">
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
  const [servicesOpen, setServicesOpen] = useState(false);
  const [portfolioOpen, setPortfolioOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => { setMounted(true); }, []);

  // Close drawer on route change
  useEffect(() => { setOpen(false); }, [pathname]);

  // Lock body scroll when drawer open
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = prev; };
    }
  }, [open]);

  return (
    <>
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-white/5 shadow-[0_4px_30px_-10px_color-mix(in_oklab,var(--primary)_20%,transparent)]">
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
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden relative w-11 h-11 rounded-full bg-primary text-primary-foreground flex items-center justify-center overflow-hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <span className="relative w-5 h-5 block">
              <span className={`absolute left-0 top-1 w-5 h-0.5 bg-current rounded transition-transform duration-300 ${open ? "translate-y-1.5 rotate-45" : ""}`} />
              <span className={`absolute left-0 top-2.5 w-5 h-0.5 bg-current rounded transition-opacity duration-200 ${open ? "opacity-0" : "opacity-100"}`} />
              <span className={`absolute left-0 top-4 w-5 h-0.5 bg-current rounded transition-transform duration-300 ${open ? "-translate-y-1.5 -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </div>
    </header>

    {/* Mobile drawer — portalled to body so the header's backdrop-filter
        doesn't become the containing block for position: fixed */}
    {mounted && createPortal(
      <div
        className={`lg:hidden fixed inset-0 z-[100] transition-opacity duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        aria-hidden={!open}
      >
        <div
          className="absolute inset-0 bg-background/70 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
        <aside
          className={`absolute top-0 right-0 h-full w-[86%] max-w-sm bg-card/95 border-l border-white/10 shadow-[-10px_0_40px_-10px_color-mix(in_oklab,var(--primary)_35%,transparent)] flex flex-col transition-transform duration-300 ease-out ${open ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
            <Logo onClick={() => setOpen(false)} />
            <button
              onClick={() => setOpen(false)}
              className="w-10 h-10 rounded-full border border-white/10 hover:border-primary hover:text-primary transition flex items-center justify-center"
              aria-label="Close menu"
            >✕</button>
          </div>

          <nav className="flex-1 overflow-y-auto overscroll-contain px-5 py-6 flex flex-col gap-1 text-base">
            {[
              { to: "/", label: "Home", exact: true },
              { to: "/about", label: "About" },
            ].map((l, i) => (
              <Link
                key={l.to}
                to={l.to}
                activeOptions={l.exact ? { exact: true } : undefined}
                activeProps={{ className: "text-primary bg-primary/10" }}
                className="px-4 py-3 rounded-xl hover:bg-muted hover:text-primary transition animate-fade-up"
                style={{ animationDelay: `${i * 40}ms` }}
              >{l.label}</Link>
            ))}

            <MobileGroup
              label="Services"
              open={servicesOpen}
              onToggle={() => setServicesOpen(v => !v)}
              delay={80}
            >
              {services.map(s => (
                <Link key={s.slug} to="/services/$slug" params={{ slug: s.slug }} className="px-4 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-primary hover:bg-muted transition">
                  {s.title}
                </Link>
              ))}
            </MobileGroup>

            <MobileGroup
              label="Portfolio"
              open={portfolioOpen}
              onToggle={() => setPortfolioOpen(v => !v)}
              delay={120}
            >
              {portfolioLinks.map(l => (
                <Link key={l.to} to={l.to} className="px-4 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-primary hover:bg-muted transition">
                  {l.label}
                </Link>
              ))}
            </MobileGroup>

            {[
              { to: "/faqs", label: "FAQs" },
              { to: "/contact", label: "Contact" },
            ].map((l, i) => (
              <Link
                key={l.to}
                to={l.to}
                activeProps={{ className: "text-primary bg-primary/10" }}
                className="px-4 py-3 rounded-xl hover:bg-muted hover:text-primary transition animate-fade-up"
                style={{ animationDelay: `${(i + 4) * 40}ms` }}
              >{l.label}</Link>
            ))}
          </nav>

          <div className="border-t border-white/10 p-5 space-y-3">
            <a href="https://wa.me/923154928868" className="btn-primary w-full justify-center">Let's Talk →</a>
            <div className="flex flex-col gap-1 text-sm text-muted-foreground">
              <a href="mailto:info@nfstech.com.pk" className="hover:text-primary">info@nfstech.com.pk</a>
              <a href="tel:+923154928868" className="hover:text-primary">+92 315 4928868</a>
            </div>
          </div>
        </aside>
      </div>,
      document.body,
    )}
    </>
  );
}

function MobileGroup({
  label, open, onToggle, delay, children,
}: { label: string; open: boolean; onToggle: () => void; delay: number; children: React.ReactNode }) {
  return (
    <div className="animate-fade-up" style={{ animationDelay: `${delay}ms` }}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-muted transition"
        aria-expanded={open}
      >
        <span>{label}</span>
        <span className={`text-primary transition-transform duration-300 ${open ? "rotate-180" : ""}`}>▾</span>
      </button>
      <div
        className="grid transition-all duration-300 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div className="pl-2 pt-1 pb-2 flex flex-col gap-0.5">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
