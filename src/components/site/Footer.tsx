import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/40 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <svg width="30" height="30" viewBox="0 0 40 40"><path d="M20 2 L23 17 L38 20 L23 23 L20 38 L17 23 L2 20 L17 17 Z" fill="var(--primary)" /></svg>
            <span className="font-display font-bold text-lg">NFS TECH</span>
          </div>
          <p className="text-muted-foreground text-sm">NFS Tech is a forward-thinking digital solutions company dedicated to turning innovative ideas into high-performing online platforms.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Quick Link</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/services" className="hover:text-primary">Services</Link></li>
            <li><Link to="/website-projects" className="hover:text-primary">Projects</Link></li>
            <li><Link to="/faqs" className="hover:text-primary">FAQs</Link></li>
            <li><Link to="/about" className="hover:text-primary">About</Link></li>
            <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Address</h4>
          <p className="text-sm text-muted-foreground mb-3">Office #1, basement Bhatti Rajput Plaza, Service Road East, Phase 5 Ghouri Town, Islamabad</p>
          <a href="mailto:info@nfstech.com.pk" className="block text-sm hover:text-primary">info@nfstech.com.pk</a>
          <a href="tel:+923154928868" className="block text-sm hover:text-primary">+92 315 4928868</a>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Follow</h4>
          <div className="flex gap-3 text-sm">
            {["Facebook","LinkedIn","Instagram","TikTok"].map(s => (
              <a key={s} href="#" className="w-10 h-10 rounded-full border border-border hover:border-primary hover:text-primary flex items-center justify-center">{s[0]}</a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-border py-6 text-center text-sm text-muted-foreground">
        Copyright © {new Date().getFullYear()}, NFS Tech. All Rights Reserved.
      </div>
    </footer>
  );
}
