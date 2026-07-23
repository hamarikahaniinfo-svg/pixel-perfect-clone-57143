import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/seo-portfolio")({
  head: () => ({
    meta: [
      { title: "SEO Portfolio — NFS Tech" },
      { name: "description", content: "SEO case studies and ranking results delivered by NFS Tech." },
      { property: "og:title", content: "SEO Portfolio — NFS Tech" },
      { property: "og:description", content: "Selected SEO growth results." },
    ],
  }),
  component: SeoPortfolio,
});

const cases = [
  { name: "Renov8 UAE", growth: "+320%", metric: "Organic Traffic", period: "6 months" },
  { name: "SHB Shop", growth: "+220%", metric: "Keyword Rankings", period: "4 months" },
  { name: "Say Cabs", growth: "+410%", metric: "Local Visibility", period: "8 months" },
  { name: "The Nutra Core", growth: "+180%", metric: "Organic Sales", period: "5 months" },
];

function SeoPortfolio() {
  return (
    <div>
      <PageHero title="SEO Portfolio" crumbs={[{ label: "SEO Portfolio" }]} />
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cases.map(c => (
            <div key={c.name} className="card-dark p-8 text-center">
              <div className="text-5xl font-bold text-primary mb-2">{c.growth}</div>
              <div className="text-sm text-muted-foreground mb-4">{c.metric} in {c.period}</div>
              <div className="pt-4 border-t border-border font-semibold">{c.name}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
