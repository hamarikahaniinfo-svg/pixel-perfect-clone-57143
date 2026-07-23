import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/graphics-design")({
  head: () => ({
    meta: [
      { title: "Graphics Design Portfolio — NFS Tech" },
      { name: "description", content: "Selected logo and graphic design work by NFS Tech." },
      { property: "og:title", content: "Graphics Design Portfolio — NFS Tech" },
      { property: "og:description", content: "Logos, branding and creative design work." },
    ],
  }),
  component: GraphicsPortfolio,
});

const designs = ["Logo Mark A", "Logo Mark B", "Brand Identity", "Business Card", "Social Kit", "Packaging", "Poster", "Menu Design", "Brochure"];

function GraphicsPortfolio() {
  return (
    <div>
      <PageHero title="Logo Design & Graphics Portfolio" crumbs={[{ label: "Graphics Design" }]} />
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {designs.map((d, i) => (
            <div key={d} className="card-dark p-10 aspect-square flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl font-display font-bold text-primary mb-2">{String.fromCharCode(65 + i)}</div>
                <div className="text-sm text-muted-foreground">{d}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
