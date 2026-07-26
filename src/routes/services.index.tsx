import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { PageHero } from "@/components/site/PageHero";
import { servicesQuery } from "@/lib/api";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Our Services — NFS Tech" },
      { name: "description", content: "Explore NFS Tech services — website, WordPress, Shopify, apps, software, SEO, marketing, graphics, hosting." },
      { property: "og:title", content: "Our Services — NFS Tech" },
      { property: "og:description", content: "Website, app, software, marketing and design services." },
    ],
  }),
  loader: ({ context }) => { context.queryClient.ensureQueryData(servicesQuery()); },
  component: ServicesIndex,
});

function ServicesIndex() {
  const { data: services = [] } = useQuery(servicesQuery());
  return (
    <div>
      <PageHero title="Special Service For your Business Development" crumbs={[{ label: "Services" }]} />
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <Link key={s.id} to="/services/$slug" params={{ slug: s.slug }} className="card-dark p-8 block hover-lift animate-fade-in" style={{ animationDelay: `${i * 50}ms` }}>
              <div className="text-5xl font-bold text-primary/30 mb-3">{String(i + 1).padStart(2, "0")}</div>
              <h3 className="text-xl font-semibold mb-3">{s.title}</h3>
              <p className="text-muted-foreground text-sm line-clamp-3">{s.intro}</p>
              <span className="text-primary text-sm font-semibold mt-4 inline-block">Read More →</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
