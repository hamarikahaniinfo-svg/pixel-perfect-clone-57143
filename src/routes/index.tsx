import { createFileRoute } from "@tanstack/react-router";
import heroDevices from "@/assets/hero-devices.jpg";
import aboutWorkspace from "@/assets/about-workspace.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NFS Tech — We Build Your Online Business | Web, App & Marketing" },
      { name: "description", content: "NFS Tech builds custom websites, WordPress & Shopify stores, mobile apps, software and SEO / digital marketing solutions to grow your business online since 2020." },
      { name: "keywords", content: "web development, WordPress, Shopify, mobile apps, SEO, digital marketing, Pakistan, NFS Tech" },
      { property: "og:title", content: "NFS Tech — We Build Your Online Business" },
      { property: "og:description", content: "Custom websites, apps, eCommerce stores and digital marketing built to grow your business." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "NFS Tech",
        alternateName: "Next Feature Solution Technology",
        url: "https://nfstech.com.pk",
        description: "Digital solutions company delivering websites, apps, software and marketing since 2020.",
        telephone: "+92-315-4928868",
        email: "info@nfstech.com.pk",
        address: { "@type": "PostalAddress", addressLocality: "Islamabad", addressCountry: "PK" },
      }),
    }],
  }),
  component: Index,
});


const services = [
  ["01", "Website Development", "We provide custom website development based on your needs delivered by industry experts."],
  ["02", "WordPress Development", "Looking for a website you can easily manage and update yourself with simple drag and drop."],
  ["03", "Shopify Store", "Looking for a website you can easily manage and update yourself with simple drag and drop."],
  ["04", "App Development", "We build high-performance mobile apps designed to deliver seamless user experiences on Android and iOS."],
  ["05", "Software Development", "We are a custom software development agency delivering high-quality, scalable software solutions."],
  ["06", "SEO & Digital Marketing", "Grow your brand, reach the right audience, and increase sales with powerful digital marketing strategies."],
  ["07", "eCommerce Store", "Convert your offline store to an online e-commerce platform and grow your business globally."],
  ["08", "Graphic Design", "Creative graphic design solutions to make your brand stand out and leave a lasting impression."],
  ["09", "Logo Design & Branding", "Professional logo design and branding solutions that build trust and elevate your brand."],
  ["10", "Domain & Hosting", "We provide a variety of domains for your business & super fast hosting with reasonable pricing."],
];

const skills: [string, number][] = [
  ["WordPress", 95], ["Shopify", 99], ["Figma", 93], ["PhotoShop", 94],
  ["Angular", 85], ["Webflow", 86], ["Python", 99], ["Sketch", 94],
];

const projects = [
  { title: "Y & Z Construction", cat: "Business & Corporate", desc: "We successfully designed and developed a fully responsive and conversion-focused website for…" },
  { title: "Ah Pro Cleaners", cat: "Business & Corporate", desc: "We successfully designed and developed a fully responsive and conversion-focused website for…" },
  { title: "Direct US Immigration", cat: "Business & Corporate", desc: "A professional, conversion-focused website for Direct U.S. Immigration…" },
  { title: "Brand Identity & Motion Design", cat: "Design & Branding", desc: "Sed ut perspiciatis unde omnin natus totam rem aperiam eaque inventore veritatis…" },
];

const testimonials = [
  { name: "M. Atif Khan", role: "CEO, SHB Shop", text: "It was an amazing experience with Mr. Salman. He worked professionally and has excellent command on his skills." },
  { name: "Mr. Faizan", role: "CEO, Renov8 UAE", text: "Professional design that feels modern and refined. High-quality design that balances aesthetics with functionality." },
  { name: "Arsalan Khan", role: "CEO, KK Universal", text: "He was always ready and available regarding any change I asked for the development of my business website." },
];

const plans = [
  { name: "Basic Plan", note: "Try Out Basic Plan Save 10%", price: 90, features: ["Logo Design", "1 Page Website", "Responsive Design", "WordPress Setup", "Free SSL", "Free Hosting (1 Year / Without cPanel)", "Domain Registration (.com / .xyz / .pro)", "Free Business Email"] },
  { name: "Standard Plan", note: "Try Out Standard Plan Save 15%", price: 140, features: ["Logo Design", "5 Pages Website", "Responsive & UX Design", "WordPress Setup", "Free SSL", "Free Hosting (1 Year / Without cPanel)", "Domain Registration (.com / .pk)", "Free Business Email"], featured: true },
  { name: "Premium Plan", note: "Try Out Premium Plan Save 20%", price: 190, features: ["Logo Design", "15 Pages Website", "Premium UX/UI Design", "WordPress Setup", "Free SSL", "Free Hosting (1 Year / Without cPanel)", "Domain Registration (.com / .net / .org / .edu)", "Free Business Email"] },
];

const blogs = [
  "A Beginner's Guide to Running Adventures",
  "Mastering the Art of Sustainable Living",
  "Embracing Minimalism: A Lifestyle Revolution",
  "Savoring the Art of Homemade Sushi…",
];

const marquee = ["Website Design", "Wordpress & Shopify", "UI/UX Design", "Digital Marketing & SEO", "Product Design", "Mobile App Development", "Graphics Design"];

function Logo() {
  return (
    <div className="flex items-center gap-2">
      <svg width="34" height="34" viewBox="0 0 40 40" fill="none">
        <path d="M20 2 L23 17 L38 20 L23 23 L20 38 L17 23 L2 20 L17 17 Z" fill="var(--primary)" />
      </svg>
      <span className="font-display font-bold text-xl tracking-wide">NFS TECH</span>
    </div>
  );
}

function Index() {
  return (
    <div className="min-h-screen">
      {/* header/footer live in __root */}


      <section id="home" className="relative overflow-hidden bg-aurora">
        <div className="absolute -top-24 -right-24 w-[520px] h-[520px] rounded-full bg-primary/20 blur-[120px] animate-pulse-glow" />
        <div className="absolute -bottom-32 -left-24 w-[420px] h-[420px] rounded-full bg-accent/15 blur-[120px]" />
        <div className="max-w-7xl mx-auto px-6 py-20 md:py-28 grid md:grid-cols-2 gap-12 items-center relative">
          <div className="animate-blur-in">
            <p className="text-muted-foreground text-sm uppercase tracking-widest mb-4 animate-fade-in">Website Designing — Graphics Designing — Digital Marketing</p>
            <h1 className="text-5xl md:text-7xl font-bold leading-[1.05] mb-6">
              <span className="animate-reveal-mask inline-block">We Build Your</span> <span className="animate-text-shimmer animate-glow-pulse">Online Business.</span>
            </h1>
            <p className="text-muted-foreground text-lg mb-8 max-w-xl animate-fade-up delay-200">
              NFS TECH, Next Feature Solution Technology is a forward thinking digital solutions company committed to transforming ideas into powerful online experiences. We specialize in delivering high-quality web and mobile solutions designed to meet the unique needs of businesses across diverse industries, since 2020.
            </p>
            <a href="https://wa.me/923154928868" className="btn-primary animate-scale-in delay-300">Get A Free Quote →</a>
          </div>
          <div className="animate-float glass-strong p-4 animate-slide-in-right">
            <img src={heroDevices} alt="Device showcase" width={1400} height={1000} className="w-full rounded-2xl" />
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-card/40">
        <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-3 gap-6 text-center">
          {[["7+", "Years Of Experience"], ["1K+", "Projects Completed"], ["99%", "Client Satisfaction"]].map(([n, l]) => (
            <div key={l}>
              <div className="text-4xl md:text-6xl font-bold text-primary">{n}</div>
              <div className="text-muted-foreground text-sm mt-2 uppercase tracking-wider">{l}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="about" className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center">
        <img src={aboutWorkspace} alt="Our workspace" width={900} height={700} loading="lazy" className="rounded-2xl border border-border" />
        <div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Professional <span className="text-primary">Problem Solutions</span> For Digital Products</h2>
          <p className="text-muted-foreground mb-8">
            At <strong className="text-foreground">NFS Tech</strong>, we deliver professional, result-driven solutions for modern digital products. Our expert team analyzes real-world business challenges and transforms them into smart, scalable, and secure digital solutions. From website and app development to custom software and e-commerce platforms, we focus on performance, usability, and long-term growth.
          </p>
          <div className="grid grid-cols-2 gap-3 mb-8">
            {["Branding & Design", "Web Development", "Digital Marketing", "Product Design"].map(t => (
              <div key={t} className="flex items-center gap-2 text-sm"><span className="text-primary">✓</span>{t}</div>
            ))}
          </div>
          <div className="grid sm:grid-cols-2 gap-6 pt-6 border-t border-border">
            <div>
              <h4 className="text-sm text-muted-foreground uppercase tracking-wider mb-1">Email Us</h4>
              <a href="mailto:info@nfstech.com.pk" className="font-semibold hover:text-primary">info@nfstech.com.pk</a>
            </div>
            <div>
              <h4 className="text-sm text-muted-foreground uppercase tracking-wider mb-1">Make A Call</h4>
              <a href="tel:+923154928868" className="font-semibold hover:text-primary">+92 315 4928868</a>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <p className="text-primary uppercase tracking-widest text-sm mb-3">Our Popular Services</p>
          <h2 className="text-4xl md:text-5xl font-bold">Special Service <span className="text-primary">For your Business Development</span></h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map(([n, title, desc]) => (
            <div key={n} className="card-dark p-8">
              <div className="text-5xl font-bold text-primary/30 mb-3">{n}</div>
              <h3 className="text-xl font-semibold mb-3">{title}</h3>
              <p className="text-muted-foreground text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-card/30 border-y border-border">
        <div className="max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Let's Explore Popular <span className="text-primary">Skills & Experience</span></h2>
            <p className="text-muted-foreground mb-8">
              Discover the tools and technologies that power our expertise. From web and app development to design and programming, our skills showcase years of experience in delivering high-quality digital solutions tailored to your business needs.
            </p>
            <a href="#portfolio" className="btn-primary">Learn More →</a>
          </div>
          <div className="space-y-5">
            {skills.map(([name, pct]) => (
              <div key={name}>
                <div className="flex justify-between mb-2 text-sm">
                  <span className="font-medium">{name}</span>
                  <span className="text-primary font-semibold">{pct}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: `${pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="portfolio" className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <p className="text-primary uppercase tracking-widest text-sm mb-3">Latest Works</p>
          <h2 className="text-4xl md:text-5xl font-bold">Explore My Popular <span className="text-primary">Projects</span></h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map(p => (
            <article key={p.title} className="card-dark overflow-hidden group">
              <div className="aspect-[4/5] bg-gradient-to-br from-muted to-card flex items-center justify-center text-primary/40 text-6xl font-display font-bold group-hover:from-primary/20 transition">
                {p.title.charAt(0)}
              </div>
              <div className="p-6">
                <p className="text-xs text-primary uppercase tracking-wider mb-2">{p.cat}</p>
                <h3 className="font-semibold text-lg mb-2">{p.title}</h3>
                <p className="text-sm text-muted-foreground">{p.desc}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="text-center mt-12">
          <a href="#contact" className="btn-primary">View More Projects →</a>
        </div>
      </section>

      <section className="bg-card/30 border-y border-border">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Clients <span className="text-primary">Feedback</span></h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">We work with a diverse range of clients, from startups to established businesses, helping them grow online and achieve their digital goals.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map(t => (
              <div key={t.name} className="card-dark p-8">
                <div className="text-primary text-3xl mb-4">"</div>
                <p className="mb-6 text-muted-foreground">{t.text}</p>
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">{t.name.charAt(0)}</div>
                  <div>
                    <div className="font-semibold">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <p className="text-primary uppercase tracking-widest text-sm mb-3">Explore Pricing Plan</p>
          <h2 className="text-4xl md:text-5xl font-bold">Amazing <span className="text-primary">Pricing Plan</span></h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map(p => (
            <div key={p.name} className={`card-dark p-8 ${p.featured ? "border-primary bg-primary/5" : ""}`}>
              <h3 className="text-2xl font-bold mb-2">{p.name}</h3>
              <p className="text-sm text-muted-foreground mb-6">{p.note}</p>
              <div className="flex items-end gap-1 mb-8">
                <span className="text-2xl text-primary">$</span>
                <span className="text-6xl font-bold">{p.price}</span>
                <span className="text-muted-foreground mb-2">/one time</span>
              </div>
              <ul className="space-y-3 mb-8">
                {p.features.map(f => (
                  <li key={f} className="flex gap-2 text-sm"><span className="text-primary">✓</span>{f}</li>
                ))}
              </ul>
              <a href="https://wa.me/923154928868" className="btn-primary w-full justify-center">Choose Plan</a>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="card-dark p-10 md:p-16 text-center bg-gradient-to-br from-primary/10 to-transparent">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Confused! <span className="text-primary">No package fit for your needs?</span></h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            We are available 24/7 — call, SMS or WhatsApp us now to discuss your project. We'll help if you're confused or need a custom package with custom features.
          </p>
          <a href="https://wa.me/923154928868" className="btn-primary">WHATSAPP NOW! →</a>
        </div>
      </section>

      <section id="contact" className="max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-12">
        <div>
          <p className="text-primary uppercase tracking-widest text-sm mb-3">Get In Touch</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Let's talk about your <span className="text-primary">Projects.</span></h2>
          <p className="text-muted-foreground mb-8">Let's connect and explore how we can collaborate to build impactful and results-driven projects.</p>
          <ul className="space-y-3">
            {["7+ Years Of Experience", "Professional Web Designer", "Mobile Apps Design Solutions", "Custom Design Support for Your Vision"].map(t => (
              <li key={t} className="flex items-center gap-3"><span className="text-primary">✓</span>{t}</li>
            ))}
          </ul>
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

      <section className="bg-card/30 border-y border-border">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="text-center mb-16">
            <p className="text-primary uppercase tracking-widest text-sm mb-3">News & Blog</p>
            <h2 className="text-4xl md:text-5xl font-bold">Latest News & <span className="text-primary">Blog</span></h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {blogs.map(title => (
              <article key={title} className="card-dark overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-muted" />
                <div className="p-6">
                  <p className="text-xs text-muted-foreground mb-2">November 13, 2023</p>
                  <h3 className="font-semibold mb-4 leading-snug">{title}</h3>
                  <a href="#" className="text-primary text-sm font-semibold hover:underline">Read More →</a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 overflow-hidden border-b border-border">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...marquee, ...marquee, ...marquee].map((t, i) => (
            <span key={i} className="text-4xl md:text-6xl font-display font-bold mx-8 text-muted-foreground/40 hover:text-primary transition">
              {t} <span className="text-primary">✦</span>
            </span>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-20">
        <h3 className="text-2xl md:text-3xl font-semibold text-center mb-12 max-w-3xl mx-auto">Trusted by multiple clients for high quality <span className="text-primary">project delivery.</span></h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {["Say Cabs", "YZ Construction", "By Volve", "The Nutra Core", "Renov8 UAE", "Ah Pro Cleaner", "Collection Prestige", "Direct US Immigration", "SHB Shop", "Brand Five"].map(c => (
            <div key={c} className="card-dark p-6 text-center text-sm text-muted-foreground hover:text-primary flex items-center justify-center min-h-24">
              {c}
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
