import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/website-projects")({
  head: () => ({
    meta: [
      { title: "Website Projects — NFS Tech" },
      { name: "description", content: "Explore NFS Tech's portfolio of business, eCommerce, dropshipping, gaming, booking, and creative websites." },
      { property: "og:title", content: "Website Projects — NFS Tech" },
      { property: "og:description", content: "Selected website work by NFS Tech." },
    ],
  }),
  component: WebsiteProjects,
});

const groups: { cat: string; title: string; desc: string; items: string[] }[] = [
  { cat: "Business & Corporate", title: "Business & Corporate Websites", desc: "Professional business websites designed to showcase company services, build strong brand credibility, and generate high-quality leads.", items: ["Y & Z Construction", "Ah Pro Cleaners", "Direct US Immigration", "Renov8 UAE", "Water Tank Riyadh", "By Volve"] },
  { cat: "eCommerce", title: "E-commerce Websites", desc: "Professional online stores with secure payments, easy product management and high-converting layouts.", items: ["SHB Shop", "Collection Prestige", "The Nutra Core"] },
  { cat: "Dropshipping", title: "Dropshipping Stores", desc: "Ready-to-scale dropshipping stores with winning products and conversion-focused funnels.", items: ["Store One", "Store Two", "Store Three"] },
  { cat: "Gaming & Tech", title: "Gaming & Tech Websites", desc: "Modern gaming and tech-focused websites with immersive UI and fast performance.", items: ["Nexus Gaming", "TechHub"] },
  { cat: "Booking & Transportation", title: "Booking & Transportation Websites", desc: "Booking and transport platforms with real-time availability and secure payments.", items: ["Say Cabs", "BookNow"] },
  { cat: "Creative & Portfolio", title: "Creative & Portfolio Websites", desc: "Creative portfolios that highlight work and personality with stunning visuals.", items: ["Studio One", "Portfolio Two"] },
  { cat: "SaaS", title: "SaaS / Web Development Platform", desc: "SaaS platforms and web-based products built for scale.", items: ["Platform X", "Platform Y"] },
];

function WebsiteProjects() {
  return (
    <div>
      <PageHero title="Website Projects" crumbs={[{ to: "/website-projects", label: "Portfolio" }, { label: "Website Projects" }]} />
      <div className="max-w-7xl mx-auto px-6 py-16 space-y-20">
        {groups.map(g => (
          <section key={g.cat}>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">{g.title}</h2>
            <p className="text-muted-foreground max-w-3xl mb-8">{g.desc}</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {g.items.map(name => (
                <article key={name} className="card-dark overflow-hidden group">
                  <div className="aspect-[4/3] bg-gradient-to-br from-muted to-card flex items-center justify-center text-primary/40 text-6xl font-display font-bold group-hover:from-primary/20 transition">{name.charAt(0)}</div>
                  <div className="p-5">
                    <p className="text-xs text-primary uppercase tracking-wider mb-1">{g.cat}</p>
                    <h3 className="font-semibold">{name}</h3>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
