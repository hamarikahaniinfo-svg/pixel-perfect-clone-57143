import { createFileRoute, notFound } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { PricingSection, CTASection } from "@/components/site/PricingSection";
import { getService, services } from "@/data/services";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const s = getService(params.slug);
    if (!s) throw notFound();
    return s;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: loaderData.metaTitle },
          { name: "description", content: loaderData.metaDesc },
          { property: "og:title", content: loaderData.metaTitle },
          { property: "og:description", content: loaderData.metaDesc },
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
  const s = Route.useLoaderData();
  return (
    <div>
      <PageHero title={s.heading} crumbs={[{ to: "/services", label: "Services" }, { label: s.title }]} />
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <p className="text-muted-foreground text-lg leading-relaxed">{s.intro}</p>
        <a href="https://wa.me/923154928868" className="btn-primary mt-8">Get A Free Quote →</a>
      </section>
      <PricingSection label={s.pricingLabel ?? `${s.title} Packages`} plans={s.plans} priceSuffix={s.priceSuffix ?? "/one time"} />
      <CTASection />
      <section className="max-w-7xl mx-auto px-6 py-16 border-t border-border">
        <h2 className="text-2xl font-bold mb-8 text-center">Explore Other Services</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          {services.filter(x => x.slug !== s.slug).slice(0, 8).map(x => (
            <a key={x.slug} href={`/services/${x.slug}`} className="card-dark p-5 text-sm hover:text-primary">{x.title}</a>
          ))}
        </div>
      </section>
    </div>
  );
}
