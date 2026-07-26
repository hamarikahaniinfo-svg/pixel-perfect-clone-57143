import { createFileRoute, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { PageHero } from "@/components/site/PageHero";
import { PricingSection, CTASection } from "@/components/site/PricingSection";
import { serviceBySlugQuery, servicesQuery } from "@/lib/api";

export const Route = createFileRoute("/services/$slug")({
  loader: async ({ params, context }) => {
    const data = await context.queryClient.ensureQueryData(serviceBySlugQuery(params.slug));
    if (!data.service) throw notFound();
    context.queryClient.ensureQueryData(servicesQuery());
    return data.service;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: loaderData.meta_title || `${loaderData.title} — NFS Tech` },
          { name: "description", content: loaderData.meta_desc },
          { property: "og:title", content: loaderData.meta_title || loaderData.title },
          { property: "og:description", content: loaderData.meta_desc },
        ]
      : [{ title: "Service — NFS Tech" }, { name: "robots", content: "noindex" }],
  }),
  component: ServicePage,
  notFoundComponent: () => (
    <div className="py-32 text-center">
      <h1 className="text-4xl font-bold mb-4">Service not found</h1>
      <a href="/services" className="text-primary">Back to services</a>
    </div>
  ),
  errorComponent: () => <div className="py-32 text-center">Something went wrong.</div>,
});

function ServicePage() {
  const { slug } = Route.useParams();
  const { data } = useQuery(serviceBySlugQuery(slug));
  const { data: allServices = [] } = useQuery(servicesQuery());
  const s = data?.service;
  const plans = (data?.plans ?? []).map(p => ({ name: p.name, note: p.note, price: p.price, features: p.features, featured: p.featured }));
  if (!s) return null;
  return (
    <div>
      <PageHero title={s.heading} crumbs={[{ to: "/services", label: "Services" }, { label: s.title }]} />
      <section className="max-w-4xl mx-auto px-6 py-20 text-center animate-fade-in">
        <p className="text-muted-foreground text-lg leading-relaxed">{s.intro}</p>
        <a href="https://wa.me/923154928868" className="btn-primary mt-8">Get A Free Quote →</a>
      </section>
      <PricingSection label={s.pricing_label ?? `${s.title} Packages`} plans={plans} priceSuffix={s.price_suffix ?? "/one time"} />
      <CTASection />
      <section className="max-w-7xl mx-auto px-6 py-16 border-t border-border">
        <h2 className="text-2xl font-bold mb-8 text-center">Explore Other Services</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          {allServices.filter(x => x.slug !== s.slug).slice(0, 8).map(x => (
            <a key={x.slug} href={`/services/${x.slug}`} className="card-dark p-5 text-sm hover:text-primary hover-lift">{x.title}</a>
          ))}
        </div>
      </section>
    </div>
  );
}
