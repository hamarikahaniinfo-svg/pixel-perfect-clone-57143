import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — NFS Tech" },
      { name: "description", content: "NFS Tech (Next Feature Solution Technology) — transforming ideas into powerful digital experiences since 2019." },
      { property: "og:title", content: "About NFS Tech" },
      { property: "og:description", content: "Forward-thinking digital solutions company helping businesses grow, scale and succeed online since 2019." },
    ],
  }),
  component: AboutPage,
});

const stats = [["7+", "Years Of Experience"], ["1K+", "Projects Completed"], ["150+", "Happy Clients"], ["99%", "Client Satisfaction"]];
const presence = ["Islamabad (Head Office)", "Lahore", "Bagh (AJK)", "Multan", "Faisalabad"];
const faqs = [
  ["What services NFS Tech provide?", "We provide complete digital solutions including website development, mobile app development, e-commerce solutions, custom software development, UI/UX design, SEO, and digital marketing services."],
  ["When was NFS Tech established?", "NFS Tech has been delivering professional digital solutions since 2019, helping businesses across multiple industries grow online."],
  ["Where is NFS Tech located?", "Our head office is in Islamabad, with remote offices in Lahore, Bagh (AJK), Multan, and Faisalabad."],
];

function AboutPage() {
  return (
    <div>
      <PageHero title="About Us" crumbs={[{ label: "About" }]} />
      <section className="max-w-5xl mx-auto px-6 py-20 text-center">
        <p className="text-primary uppercase tracking-widest text-sm mb-3">NFS Tech — Next Feature Solution Technology</p>
        <h2 className="text-3xl md:text-5xl font-bold mb-6">Transforming Ideas Into Powerful Digital Experiences Since 2019</h2>
        <p className="text-muted-foreground text-lg leading-relaxed mb-6">
          NFS Tech is a forward-thinking digital solutions company dedicated to turning innovative ideas into high performing online platforms. Since 2019, we have been helping businesses across diverse industries grow, scale, and succeed in the digital world.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          We specialize in delivering professional, result-driven solutions tailored to modern business needs. Our expert team carefully analyzes real-world challenges and transforms them into smart, scalable, and secure digital products that drive measurable growth.
        </p>
      </section>

      <section className="border-y border-border bg-card/40">
        <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map(([n, l]) => (
            <div key={l}>
              <div className="text-4xl md:text-6xl font-bold text-primary">{n}</div>
              <div className="text-muted-foreground text-sm mt-2 uppercase tracking-wider">{l}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our <span className="text-primary">Presence</span></h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {presence.map(p => (
            <div key={p} className="card-dark p-6 text-center text-sm">{p}</div>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 pb-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">FAQs</h2>
        <div className="space-y-3">
          {faqs.map(([q, a]) => (
            <details key={q} className="card-dark p-6 group">
              <summary className="font-semibold cursor-pointer list-none flex justify-between items-center">{q}<span className="text-primary group-open:rotate-45 transition">+</span></summary>
              <p className="mt-3 text-muted-foreground text-sm">{a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
