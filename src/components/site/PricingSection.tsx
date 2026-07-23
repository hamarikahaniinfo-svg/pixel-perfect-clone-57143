import type { Plan } from "@/data/services";

export function PricingSection({ label, plans, priceSuffix = "/one time" }: { label: string; plans: Plan[]; priceSuffix?: string }) {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24">
      <div className="text-center mb-16">
        <p className="text-primary uppercase tracking-widest text-sm mb-3">Explore Pricing Plan</p>
        <h2 className="text-4xl md:text-5xl font-bold">{label}</h2>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {plans.map(p => (
          <div key={p.name} className={`card-dark p-8 ${p.featured ? "border-primary bg-primary/5" : ""}`}>
            <h3 className="text-2xl font-bold mb-2">{p.name}</h3>
            <p className="text-sm text-muted-foreground mb-6">Try Out {p.name} — {p.note}</p>
            <div className="flex items-end gap-1 mb-8">
              <span className="text-2xl text-primary">$</span>
              <span className="text-6xl font-bold">{p.price}</span>
              <span className="text-muted-foreground mb-2">{priceSuffix}</span>
            </div>
            <ul className="space-y-3 mb-8">
              {p.features.map(f => <li key={f} className="flex gap-2 text-sm"><span className="text-primary">✓</span>{f}</li>)}
            </ul>
            <a href="https://wa.me/923154928868" className="btn-primary w-full justify-center">Order Now</a>
          </div>
        ))}
      </div>
    </section>
  );
}

export function CTASection() {
  return (
    <section className="max-w-6xl mx-auto px-6 pb-24">
      <div className="card-dark p-10 md:p-16 text-center bg-gradient-to-br from-primary/10 to-transparent">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">Confused! <span className="text-primary">No package fit for your needs?</span></h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
          We are available 24/7 — call, SMS or WhatsApp us now to discuss your project. We'll help if you're confused or need a custom package with custom features.
        </p>
        <a href="https://wa.me/923154928868" className="btn-primary">WHATSAPP NOW! →</a>
      </div>
    </section>
  );
}
