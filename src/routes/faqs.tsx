import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { PageHero } from "@/components/site/PageHero";
import { faqsQuery } from "@/lib/api";

export const Route = createFileRoute("/faqs")({
  head: () => ({
    meta: [
      { title: "FAQs — NFS Tech" },
      { name: "description", content: "Frequently asked questions about NFS Tech services, timelines, support and locations." },
      { property: "og:title", content: "NFS Tech FAQs" },
      { property: "og:description", content: "Answers to common questions about our digital services." },
    ],
  }),
  loader: ({ context }) => { context.queryClient.ensureQueryData(faqsQuery()); },
  component: FaqsPage,
});

function FaqsPage() {
  const { data: faqs = [] } = useQuery(faqsQuery());
  return (
    <div>
      <PageHero title="FAQs" crumbs={[{ label: "FAQs" }]} />
      <section className="max-w-4xl mx-auto px-6 py-20">
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <details key={f.id} className="card-dark p-6 group animate-fade-in" style={{ animationDelay: `${i * 60}ms` }}>
              <summary className="font-semibold cursor-pointer list-none flex justify-between items-center">{f.question}<span className="text-primary group-open:rotate-45 transition text-xl">+</span></summary>
              <p className="mt-3 text-muted-foreground">{f.answer}</p>
            </details>
          ))}
          {faqs.length === 0 && <p className="text-center text-muted-foreground py-12">No FAQs yet.</p>}
        </div>
      </section>
    </div>
  );
}
