import { useState, useEffect, useRef } from 'react';

export function registerReveal(el, fn, ratio) {
  if (!el) return () => {};
  if (!("IntersectionObserver" in window)) {
    fn();
    return () => {};
  }

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) return;
      fn();
      observer.disconnect();
    },
    { rootMargin: `0px 0px -${Math.round((1 - ratio) * 100)}% 0px` }
  );

  observer.observe(el);
  return () => observer.disconnect();
}

export function Reveal({ children, delay = 0, as = "div", className = "" }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let timeoutId;
    const unregister = registerReveal(el, () => {
      timeoutId = window.setTimeout(() => el.classList.add("in"), delay);
    }, 0.9);
    return () => {
      unregister();
      window.clearTimeout(timeoutId);
    };
  }, [delay]);
  const Tag = as;
  return (
    <Tag ref={ref} className={"reveal " + className}>
      {children}
    </Tag>
  );
}

export function Counter({ value, suffix = "", duration = 1600, className = "" }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let intervalId;
    const unregister = registerReveal(el, () => {
      const start = performance.now();
      intervalId = window.setInterval(() => {
        const t = Math.min((performance.now() - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        setDisplay(Math.round(eased * value));
        if (t >= 1) window.clearInterval(intervalId);
      }, 1000 / 60);
    }, 0.92);
    return () => {
      unregister();
      window.clearInterval(intervalId);
    };
  }, [value, duration]);
  return (
    <span ref={ref} className={className}>
      {display}
      <span className="text-blue-bright">{suffix}</span>
    </span>
  );
}

export function IGIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function TikTokIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M16.5 3c.3 2 1.5 3.7 3.5 4.2v3c-1.3 0-2.6-.4-3.7-1.1v6.1c0 3.2-2.6 5.8-5.8 5.8S4.7 18.4 4.7 15.2s2.6-5.8 5.8-5.8c.3 0 .6 0 .9.1v3.1c-.3-.1-.6-.2-.9-.2-1.5 0-2.7 1.2-2.7 2.8s1.2 2.8 2.7 2.8 2.8-1.2 2.8-2.8V3h3.2z" />
    </svg>
  );
}

export function GlowButton({ href, children, icon, variant = "solid", className = "" }) {
  const base = "group relative inline-flex items-center gap-2.5 font-cond tracking-wider uppercase text-base md:text-lg px-6 py-3 transition-all duration-300";
  const styles = {
    solid: "bg-blue text-white hover:bg-blue-bright hover:shadow-[0_0_35px_rgba(58,120,255,0.7)]",
    ghost: "border border-white/20 text-white hover:border-blue hover:text-blue-bright hover:shadow-[0_0_30px_rgba(30,80,255,0.5)] bg-white/[0.02]",
    dark: "bg-panel border border-white/10 text-white hover:border-blue hover:shadow-[0_0_30px_rgba(30,80,255,0.45)]",
  };
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`${base} ${styles[variant]} ${className}`}>
      {icon}
      <span>{children}</span>
    </a>
  );
}

export function SectionLabel({ num, children }) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <span className="h-px w-10 bg-blue/60"></span>
      <span className="font-cond tracking-[0.25em] text-white/60 text-sm uppercase">{children}</span>
    </div>
  );
}

export function ImageSlot({ label = "FOTO", src = null, className = "", ratio = "aspect-[3/4]", position = "center" }) {
  if (src) {
    return (
      <div className={`relative overflow-hidden ${ratio} ${className}`}>
        <img src={src} alt={label} loading="lazy" decoding="async" className="w-full h-full object-cover" style={{ objectPosition: position }} />
      </div>
    );
  }
  return (
    <div
      className={`relative overflow-hidden ${ratio} ${className} border border-white/10`}
      style={{
        backgroundImage: "repeating-linear-gradient(135deg, rgba(255,255,255,0.03) 0 10px, transparent 10px 20px)",
        backgroundColor: "#0d0d0f",
      }}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
        <span className="font-mono text-[10px] tracking-widest text-white/30 uppercase">drop_image</span>
        <span className="font-mono text-[10px] tracking-widest text-blue-bright/70 uppercase">{label}</span>
      </div>
      <div className="absolute top-2 left-2 w-3 h-3 border-l border-t border-blue/40"></div>
      <div className="absolute bottom-2 right-2 w-3 h-3 border-r border-b border-blue/40"></div>
    </div>
  );
}
