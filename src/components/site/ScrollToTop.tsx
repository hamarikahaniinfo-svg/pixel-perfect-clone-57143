import { useEffect, useState } from "react";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? Math.min(100, (scrolled / max) * 100) : 0);
      setVisible(scrolled > 400);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const circ = 2 * Math.PI * 22;
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll to top"
      className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full glass-strong flex items-center justify-center transition-all duration-500 hover:scale-110 group ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6 pointer-events-none"
      }`}
    >
      <svg className="absolute inset-0 -rotate-90" viewBox="0 0 50 50">
        <circle cx="25" cy="25" r="22" fill="none" stroke="color-mix(in oklab, var(--foreground) 10%, transparent)" strokeWidth="2" />
        <circle
          cx="25" cy="25" r="22" fill="none"
          stroke="var(--primary)" strokeWidth="2" strokeLinecap="round"
          strokeDasharray={circ} strokeDashoffset={circ - (circ * progress) / 100}
          style={{ transition: "stroke-dashoffset 0.15s linear" }}
        />
      </svg>
      <span className="text-primary text-lg leading-none group-hover:-translate-y-0.5 transition">↑</span>
    </button>
  );
}
