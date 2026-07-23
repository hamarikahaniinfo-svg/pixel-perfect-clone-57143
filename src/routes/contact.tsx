import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — NFS Tech" },
      { name: "description", content: "Let's talk about your projects. Contact NFS Tech via phone, email or WhatsApp." },
      { property: "og:title", content: "Contact NFS Tech" },
      { property: "og:description", content: "Reach us for websites, apps, software and digital marketing." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div>
      <PageHero title="Let's talk about your Projects." crumbs={[{ label: "Contact" }]} />
      <section className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold mb-2 text-lg">Main Office</h3>
            <p className="text-muted-foreground">Office #1, basement Bhatti Rajput Plaza, Service Road East, Phase 5 Ghouri Town, Islamabad</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2 text-lg">Email</h3>
            <a href="mailto:info@nfstech.com.pk" className="text-primary">info@nfstech.com.pk</a>
          </div>
          <div>
            <h3 className="font-semibold mb-2 text-lg">Phone / WhatsApp</h3>
            <a href="tel:+923154928868" className="text-primary">+92 315 4928868</a>
          </div>
          <div>
            <h3 className="font-semibold mb-2 text-lg">Follow</h3>
            <div className="flex gap-3">
              {["Facebook","Instagram","WhatsApp","LinkedIn"].map(s => (
                <a key={s} href="#" className="w-11 h-11 rounded-full border border-border hover:border-primary hover:text-primary flex items-center justify-center text-sm">{s[0]}</a>
              ))}
            </div>
          </div>
        </div>
        <form onSubmit={(e) => e.preventDefault()} className="card-dark p-8 space-y-4">
          <input required placeholder="Full Name *" className="w-full bg-muted border border-border rounded-lg px-4 py-3 focus:border-primary outline-none" />
          <input required type="email" placeholder="Email Address *" className="w-full bg-muted border border-border rounded-lg px-4 py-3 focus:border-primary outline-none" />
          <input required placeholder="Phone Number *" className="w-full bg-muted border border-border rounded-lg px-4 py-3 focus:border-primary outline-none" />
          <input required placeholder="Subject *" className="w-full bg-muted border border-border rounded-lg px-4 py-3 focus:border-primary outline-none" />
          <textarea required placeholder="Message *" rows={5} className="w-full bg-muted border border-border rounded-lg px-4 py-3 focus:border-primary outline-none" />
          <button className="btn-primary w-full justify-center">Send Us Message →</button>
        </form>
      </section>
    </div>
  );
}
