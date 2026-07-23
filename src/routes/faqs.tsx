import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/faqs")({
  head: () => ({
    meta: [
      { title: "FAQs — NFS Tech" },
      { name: "description", content: "Frequently asked questions about NFS Tech services, timelines, support and locations." },
      { property: "og:title", content: "NFS Tech FAQs" },
      { property: "og:description", content: "Answers to common questions about our digital services." },
    ],
  }),
  component: FaqsPage,
});

const faqs = [
  ["What services NFS Tech provide?", "We provide complete digital solutions including website development, mobile app development, e-commerce solutions, custom software development, UI/UX design, SEO, and digital marketing services."],
  ["When was NFS Tech established?", "NFS Tech has been delivering professional digital solutions since 2019, helping businesses across multiple industries grow online."],
  ["How long does it take to complete a website project?", "Project timelines depend on complexity and features. A standard business website typically takes 1–3 weeks, while larger or custom projects may take longer."],
  ["Do you provide ongoing support and maintenance?", "Absolutely. We offer website maintenance, updates, security monitoring, and technical support to ensure long-term performance."],
  ["Where is NFS Tech located?", "Our head office is in Islamabad, with remote offices in Lahore, Bagh (AJK), Multan, and Faisalabad."],
  ["How can I start a project with NFS Tech?", "Getting started is simple. Reach out via our website, Facebook, Instagram, LinkedIn, email, phone or WhatsApp. Share your project details, and our team will analyze your requirements and provide a proposal."],
];

function FaqsPage() {
  return (
    <div>
      <PageHero title="FAQs" crumbs={[{ label: "FAQs" }]} />
      <section className="max-w-4xl mx-auto px-6 py-20">
        <div className="space-y-3">
          {faqs.map(([q, a]) => (
            <details key={q} className="card-dark p-6 group">
              <summary className="font-semibold cursor-pointer list-none flex justify-between items-center">{q}<span className="text-primary group-open:rotate-45 transition text-xl">+</span></summary>
              <p className="mt-3 text-muted-foreground">{a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
