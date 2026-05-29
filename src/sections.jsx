import { useState, useEffect, useRef } from 'react';
import { S } from './data';
import { Reveal, Counter, IGIcon, TikTokIcon, GlowButton, SectionLabel, ImageSlot } from './ui';
import { initDumbbell } from './dumbbell3d';

// ── LOADER ───────────────────────────────────────────────────────────────────

export function Loader({ progress }) {
  return (
    <div className="fixed inset-0 z-[100] bg-ink flex flex-col items-center justify-center grid-lines">
      <div className="relative text-center px-6">
        <div className="font-cond tracking-[0.4em] text-blue-bright text-xs md:text-sm mb-5 animate-pulse">
          CARREGANDO
        </div>
        <h1 className="font-display text-6xl md:text-8xl leading-[0.85] tracking-tight">
          <span className="block text-white text-glow" style={{ animation: "flicker 2s infinite" }}>PIETRO</span>
          <span className="block stroke-text-blue">NAGEL</span>
        </h1>
        <div className="mt-10 w-64 md:w-80 mx-auto">
          <div className="flex justify-between font-mono text-[10px] text-white/40 mb-2">
            <span>EST. 2023</span>
            <span className="text-blue-bright">{Math.round(progress)}%</span>
          </div>
          <div className="h-[3px] w-full bg-white/10 overflow-hidden">
            <div
              className="h-full bg-blue shadow-[0_0_14px_rgba(58,120,255,0.9)] transition-[width] duration-150 ease-out"
              style={{ width: progress + "%" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// ── TOP LINKS BAR ────────────────────────────────────────────────────────────

function TopLinksBar() {
  return (
    <div className="w-full bg-blue text-white">
      <div className="overflow-hidden whitespace-nowrap">
        <div className="marquee-track inline-flex items-center gap-8 py-1.5 font-cond tracking-[0.2em] text-xs md:text-sm uppercase">
          {Array.from({ length: 2 }).map((_, i) => (
            <span key={i} className="inline-flex items-center gap-8">
              <span>★ Parceria oficial · {S.links.parceiroNome}</span>
              <span>★ Todos os links no Linktree</span>
              <span>★ Rumo ao Muscle Contest 2027</span>
              <span>★ Siga @pietro.nagel1</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── NAV ──────────────────────────────────────────────────────────────────────

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const items = [
    ["Jornada", "#jornada"],
    ["Evolução", "#evolucao"],
    ["Galeria", "#galeria"],
    ["Contato", "#contato"],
  ];

  return (
    <header className="sticky top-0 z-50">
      <TopLinksBar />
      <div className={`transition-all duration-300 ${scrolled
        ? "bg-ink/90 backdrop-blur-md border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
        : "bg-transparent"
      }`}>
        <div className={`max-w-7xl mx-auto px-5 md:px-8 flex items-center justify-between transition-all duration-300 ${scrolled ? "h-14" : "h-20"}`}>

          {/* Logo */}
          <a href="#top" className="group font-display tracking-wide leading-none">
            <span className={`text-white group-hover:text-blue-bright transition-all duration-300 ${scrolled ? "text-2xl md:text-3xl" : "text-3xl md:text-4xl"}`}>
              PIETRO NAGEL
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8 xl:gap-10">
            {items.map(([t, h]) => (
              <a key={h} href={h}
                 className="relative font-cond tracking-widest text-lg uppercase text-white/75 hover:text-blue-bright transition-colors py-2 group">
                {t}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-bright transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-2.5">
            <a href={S.links.parceiroLink} target="_blank" rel="noopener noreferrer"
               className="font-cond tracking-widest text-sm uppercase px-4 py-2.5 border border-white/15 hover:border-blue hover:text-blue-bright transition-all duration-200">
              {S.links.parceiroNome}
            </a>
            <a href={S.links.linktree} target="_blank" rel="noopener noreferrer"
               className="font-cond tracking-widest text-sm uppercase px-4 py-2.5 bg-blue hover:bg-blue-bright transition-all duration-200 hover:shadow-[0_0_25px_rgba(58,120,255,0.6)]">
              Linktree
            </a>
            <a href={S.links.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"
               className="p-2.5 text-white/75 hover:text-blue-bright transition-colors">
              <IGIcon className="w-5 h-5" />
            </a>
            <a href={S.links.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok"
               className="p-2.5 text-white/75 hover:text-blue-bright transition-colors">
              <TikTokIcon className="w-5 h-5" />
            </a>
          </div>

          {/* Hamburger */}
          <button className="lg:hidden p-2 -mr-2" onClick={() => setOpen(o => !o)} aria-label="Menu">
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`block h-0.5 bg-white transition-all duration-300 origin-center ${open ? "rotate-45 translate-y-[9px]" : ""}`} />
              <span className={`block h-0.5 bg-white transition-all duration-300 ${open ? "opacity-0 scale-x-0" : ""}`} />
              <span className={`block h-0.5 bg-white transition-all duration-300 origin-center ${open ? "-rotate-45 -translate-y-[9px]" : ""}`} />
            </div>
          </button>
        </div>

        {/* Mobile menu — CSS-animated, no flash */}
        <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${open ? "max-h-[520px] opacity-100" : "max-h-0 opacity-0"}`}>
          <div className="bg-ink/95 backdrop-blur-md border-t border-white/10 px-5 py-6">
            <div className="flex flex-col mb-5">
              {items.map(([t, h]) => (
                <a key={h} href={h} onClick={() => setOpen(false)}
                   className="font-cond tracking-widest text-2xl uppercase py-3.5 text-white/85 hover:text-blue-bright border-b border-white/5 transition-colors">
                  {t}
                </a>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-2">
              <GlowButton href={S.links.linktree} variant="solid" className="justify-center text-base">Linktree</GlowButton>
              <GlowButton href={S.links.parceiroLink} variant="dark" className="justify-center text-base">{S.links.parceiroNome}</GlowButton>
              <GlowButton href={S.links.instagram} variant="ghost" icon={<IGIcon />} className="justify-center text-base">Instagram</GlowButton>
              <GlowButton href={S.links.tiktok} variant="ghost" icon={<TikTokIcon />} className="justify-center text-base">TikTok</GlowButton>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

// ── HERO ─────────────────────────────────────────────────────────────────────

export function Hero() {
  const canvasRef = useRef(null);
  useEffect(() => {
    if (!canvasRef.current) return;
    const inst = initDumbbell(canvasRef.current);
    return () => inst && inst.destroy && inst.destroy();
  }, []);

  const fraseLinhas = S.atleta.fraseHero.split("\n");

  const infoCards = [
    { num: "15",   label: "ANOS DE IDADE" },
    { num: "11",   label: "INÍCIO DO TREINO" },
    { num: "2027", label: "MUSCLE CONTEST" },
    { num: "365",  label: "DIAS DE FOCO" },
  ];

  return (
    <section id="top" className="relative min-h-[100svh] flex items-center overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-1/3 -right-20 w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] rounded-full pointer-events-none"
           style={{ background: "radial-gradient(circle, rgba(30,80,255,0.35) 0%, rgba(30,80,255,0) 65%)" }} />
      <div className="absolute -bottom-32 -left-32 w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full pointer-events-none"
           style={{ background: "radial-gradient(circle, rgba(10,43,204,0.25) 0%, rgba(10,43,204,0) 65%)" }} />
      <div className="absolute inset-0 grid-lines opacity-60" />

      {/* 3D canvas */}
      <div className="absolute inset-0 z-0">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>

      {/* Gradient overlay — fades left side over canvas */}
      <div className="absolute inset-0 z-[1] pointer-events-none"
           style={{ background: "linear-gradient(100deg, rgba(10,10,10,0.94) 0%, rgba(10,10,10,0.75) 40%, rgba(10,10,10,0.15) 65%, rgba(10,10,10,0) 82%)" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 w-full py-16 pointer-events-none">
        <div className="max-w-3xl">

          {/* Badge + tagline */}
          <div className="flex flex-wrap items-center gap-3 mb-5 pointer-events-auto">
            <span className="font-mono text-[11px] tracking-widest text-blue-bright uppercase px-2 py-1 border border-blue/40">EST. 2023</span>
            <span className="font-cond tracking-[0.2em] text-white/55 text-sm uppercase">{S.atleta.tagline}</span>
          </div>

          {/* Main title */}
          <h1 className="font-display leading-[0.92] tracking-tight">
            {fraseLinhas.map((l, i) => {
              const last = i === fraseLinhas.length - 1;
              const mt = i === 1 ? "mt-5 md:mt-8" : last ? "mt-3 md:mt-4" : "";
              return (
                <span key={i} className={`block text-[13vw] sm:text-[10.5vw] md:text-[7.5rem] xl:text-[9rem] ${last ? "text-blue-bright text-glow" : "text-white"} ${mt}`}>
                  {l}
                </span>
              );
            })}
          </h1>

          {/* Info cards */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-2 max-w-lg pointer-events-auto">
            {infoCards.map(c => (
              <div key={c.label}
                   className="bg-ink/70 backdrop-blur border border-white/10 hover:border-blue/50 px-3 py-3 transition-all duration-300 group cursor-default">
                <div className="font-display text-2xl text-white leading-none group-hover:text-blue-bright transition-colors duration-300">{c.num}</div>
                <div className="font-mono text-[9px] tracking-widest text-blue-bright/70 mt-1.5 uppercase leading-tight">{c.label}</div>
              </div>
            ))}
          </div>

          {/* Live badge */}
          <div className="mt-7 inline-flex items-center gap-3 pointer-events-auto border-l-2 border-blue pl-4">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-blue-bright opacity-75" style={{ animation: "flicker 1.6s infinite" }} />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-bright" />
            </span>
            <p className="font-cond tracking-wide text-xl md:text-2xl uppercase text-white leading-tight">
              Preparação para o <span className="text-blue-bright text-glow">Muscle Contest 2027</span>
            </p>
          </div>

          {/* CTA buttons */}
          <div className="mt-7 flex flex-wrap gap-3 pointer-events-auto">
            <GlowButton href={S.links.linktree} variant="solid">Todos os links</GlowButton>
            <GlowButton href={S.links.instagram} variant="ghost" icon={<IGIcon />}>Instagram</GlowButton>
            <GlowButton href={S.links.tiktok} variant="ghost" icon={<TikTokIcon />}>TikTok</GlowButton>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── PARTNER STRIP ────────────────────────────────────────────────────────────

export function PartnerStrip() {
  return (
    <section className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0A0A0A 0%, #0d1a3a 50%, #0A0A0A 100%)" }}>
      <div className="absolute inset-0 pointer-events-none"
           style={{ backgroundImage: "linear-gradient(to right, transparent 0%, rgba(30,80,255,0.07) 50%, transparent 100%)" }} />
      <div className="absolute top-0 left-0 right-0 h-px"
           style={{ background: "linear-gradient(to right, transparent, rgba(58,120,255,0.6), transparent)" }} />
      <div className="absolute bottom-0 left-0 right-0 h-px"
           style={{ background: "linear-gradient(to right, transparent, rgba(58,120,255,0.6), transparent)" }} />

      <div className="max-w-7xl mx-auto px-5 md:px-10 py-14 md:py-20 flex flex-col lg:flex-row items-center justify-between gap-12">

        {/* Brand image */}
        <div className="w-full lg:w-[38%] shrink-0">
          <div className="relative overflow-hidden aspect-[4/3]"
               style={{
                 border: "1px solid rgba(58,120,255,0.25)",
                 boxShadow: "0 0 60px rgba(30,80,255,0.18), 0 0 120px rgba(30,80,255,0.08)",
               }}>
            <img src="/assets/montelest.jpeg" alt="Monte Leste" className="w-full h-full object-cover" />
            <div className="absolute inset-0"
                 style={{ background: "linear-gradient(to right, rgba(10,10,10,0) 55%, rgba(13,26,58,0.5) 100%)" }} />
            {/* Badge sobre a imagem */}
            <div className="absolute top-4 left-4">
              <div className="bg-blue/90 backdrop-blur px-3 py-1.5 font-mono text-[10px] tracking-[0.3em] text-white uppercase">
                Parceiro Oficial
              </div>
            </div>
            {/* Corner accent */}
            <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-blue-bright/60" />
          </div>
        </div>

        {/* Info + CTA */}
        <div className="flex flex-col items-center lg:items-start gap-5 text-center lg:text-left flex-1">
          <div className="flex items-center gap-2">
            <span className="inline-block w-6 h-px bg-blue" />
            <span className="font-mono text-[11px] tracking-[0.25em] text-blue-bright uppercase">Parceria oficial</span>
          </div>

          <h2 className="font-display text-6xl md:text-7xl xl:text-8xl text-white tracking-tight leading-none"
              style={{ textShadow: "0 0 40px rgba(58,120,255,0.35)" }}>
            {S.links.parceiroNome}
          </h2>

          <p className="font-sans text-white/65 text-sm md:text-base max-w-md leading-relaxed">
            A Monte Leste oferece roupas com estilo urbano, qualidade e personalidade para quem busca se destacar.
            Use o cupom <span className="text-blue-bright font-semibold">NAGEL</span> e ganhe 12% de desconto.
            Além de economizar, você também me ajuda demais a continuar essa jornada. 🔥👊
          </p>

          {/* Cupom block */}
          <div className="relative flex items-center gap-4 w-full max-w-sm px-5 py-4 overflow-hidden"
               style={{
                 background: "linear-gradient(135deg, #1a0a00 0%, #3d1500 50%, #1a0a00 100%)",
                 border: "1px solid rgba(255,120,0,0.5)",
                 boxShadow: "0 0 30px rgba(255,100,0,0.25), inset 0 1px 0 rgba(255,150,0,0.1)",
               }}>
            <div className="absolute inset-0 pointer-events-none"
                 style={{ backgroundImage: "linear-gradient(to right, transparent, rgba(255,100,0,0.05), transparent)" }} />
            <div className="text-3xl">🎟️</div>
            <div>
              <div className="font-mono text-[10px] tracking-widest uppercase mb-1" style={{ color: "rgba(255,150,80,0.7)" }}>
                Cupom exclusivo
              </div>
              <div className="font-display text-3xl tracking-wider"
                   style={{ color: "#ff7a00", textShadow: "0 0 20px rgba(255,100,0,0.7)" }}>
                NAGEL
              </div>
            </div>
            <div className="w-px self-stretch" style={{ background: "rgba(255,120,0,0.25)" }} />
            <div>
              <div className="font-display text-4xl text-white">12%</div>
              <div className="font-mono text-[10px] tracking-widest uppercase" style={{ color: "rgba(255,150,80,0.7)" }}>
                de desconto
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center lg:items-start gap-2">
            <a href={S.links.parceiroLink} target="_blank" rel="noopener noreferrer"
               className="group font-cond tracking-widest text-xl uppercase px-10 py-4 bg-blue text-white transition-all duration-300 hover:bg-blue-bright"
               style={{ boxShadow: "0 0 40px rgba(30,80,255,0.45), inset 0 1px 0 rgba(255,255,255,0.1)" }}>
              <span className="flex items-center gap-3">
                Conhecer a marca
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5">→</span>
              </span>
            </a>
            <span className="font-mono text-[10px] tracking-widest text-white/25 uppercase">monteleste.com.br</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── JORNADA ──────────────────────────────────────────────────────────────────

export function Jornada() {
  return (
    <section id="jornada" className="relative py-24 md:py-36 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-5 md:px-8 grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">

        <div className="lg:col-span-7">
          <Reveal><SectionLabel num="01">Sobre / Minha jornada</SectionLabel></Reveal>
          <Reveal delay={80}>
            <h2 className="font-display text-5xl md:text-7xl leading-[0.9] tracking-tight mb-8">
              {S.jornada.titulo}<span className="text-blue-bright">.</span>
            </h2>
          </Reveal>
          <div className="space-y-5 max-w-xl">
            {S.jornada.paragrafos.map((p, i) => (
              <Reveal key={i} delay={120 + i * 90}>
                <p className="text-white/70 text-base md:text-lg leading-relaxed">{p}</p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={400}>
            <div className="mt-10 flex flex-wrap gap-3">
              {[["ALTURA", S.atleta.altura], ["PESO", S.atleta.peso], ["IDADE", S.atleta.idade + " anos"]].map(([k, v]) => (
                <div key={k} className="clip-tag bg-panel border border-white/10 hover:border-blue/40 px-5 py-3 transition-colors duration-300">
                  <div className="font-mono text-[10px] tracking-widest text-white/40">{k}</div>
                  <div className="font-display text-2xl text-white">{v}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-5">
          <Reveal delay={150}>
            <ImageSlot label="RETRATO" src={S.retrato} ratio="aspect-[4/5]" className="box-glow" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ── EVOLUCAO ─────────────────────────────────────────────────────────────────

function TimelineCardDesktop({ t }) {
  if (!t.src) {
    return (
      <div className="flex flex-col">
        {/* Special 2027 card */}
        <div className="relative overflow-hidden border flex flex-col items-center justify-center gap-3 aspect-[3/4]"
             style={{
               background: "linear-gradient(135deg, #050e24 0%, #091830 60%, #050e24 100%)",
               borderColor: "rgba(58,120,255,0.45)",
               boxShadow: "0 0 50px rgba(30,80,255,0.2), inset 0 0 60px rgba(30,80,255,0.05)",
             }}>
          <div className="absolute inset-0 grid-lines opacity-20" />
          <div className="absolute bottom-0 left-0 right-0 h-2/5 pointer-events-none"
               style={{ background: "linear-gradient(to top, rgba(30,80,255,0.18), transparent)" }} />
          <div className="relative text-4xl" style={{ filter: "drop-shadow(0 0 14px rgba(58,120,255,0.9))" }}>🎯</div>
          <div className="relative text-center px-3">
            <div className="font-mono text-[9px] tracking-[0.3em] text-blue-bright/50 uppercase mb-2">Próximo capítulo</div>
            <div className="font-display text-5xl text-blue-bright" style={{ textShadow: "0 0 30px rgba(58,120,255,0.9)" }}>2027</div>
            <div className="font-cond text-xl tracking-[0.2em] text-white mt-1">PALCO</div>
          </div>
          <div className="relative font-mono text-[9px] tracking-[0.35em] text-blue-bright/40 uppercase">Muscle Contest</div>
        </div>
        <h3 className="font-display text-lg xl:text-xl mt-4 tracking-wide">{t.titulo}</h3>
        <p className="text-white/50 mt-1 text-sm leading-relaxed">{t.texto}</p>
      </div>
    );
  }
  return (
    <div className="group flex flex-col">
      <div className="relative overflow-hidden border border-white/10 aspect-[3/4]"
           style={{ transition: "border-color 0.4s, box-shadow 0.4s" }}
           onMouseEnter={e => {
             e.currentTarget.style.borderColor = "rgba(58,120,255,0.5)";
             e.currentTarget.style.boxShadow = "0 0 30px rgba(58,120,255,0.25)";
           }}
           onMouseLeave={e => {
             e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
             e.currentTarget.style.boxShadow = "none";
           }}>
        <img src={t.src} alt={t.titulo}
             className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
             style={{ objectPosition: t.pos || "center" }} />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
      </div>
      <h3 className="font-display text-lg xl:text-xl mt-4 tracking-wide">{t.titulo}</h3>
      <p className="text-white/50 mt-1 text-sm leading-relaxed">{t.texto}</p>
    </div>
  );
}

export function Evolucao() {
  const n = S.timeline.length;

  return (
    <section id="evolucao" className="relative py-24 md:py-36 bg-panel2 border-y border-white/10 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <Reveal><SectionLabel num="02">Transformação</SectionLabel></Reveal>
        <Reveal delay={80}>
          <h2 className="font-display text-5xl md:text-7xl leading-[0.9] tracking-tight mb-14">
            A <span className="stroke-text-blue">EVOLUÇÃO</span>
          </h2>
        </Reveal>

        {/* ── Desktop: horizontal timeline ─────────────── */}
        <div className="hidden lg:block">

          {/* Year + dot row */}
          <div className="relative mb-8">
            {/* Connecting line aligned to dot centers */}
            <div className="absolute h-px pointer-events-none"
                 style={{
                   top: "54px",
                   left: `${(100 / n) / 2}%`,
                   right: `${(100 / n) / 2}%`,
                   background: "linear-gradient(to right, rgba(58,120,255,0.2), rgba(58,120,255,0.55) 20%, rgba(58,120,255,0.55) 80%, rgba(58,120,255,0.2))",
                 }} />

            <div className="grid" style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}>
              {S.timeline.map((t, i) => (
                <div key={i} className="flex flex-col items-center">
                  {/* Year label */}
                  <div className="h-12 flex items-end pb-1">
                    <span className="font-display text-4xl leading-none"
                          style={{ color: t.src ? "rgba(58,120,255,0.9)" : "#3a78ff", textShadow: t.src ? "none" : "0 0 20px rgba(58,120,255,0.6)" }}>
                      {t.ano}
                    </span>
                  </div>
                  {/* Dot */}
                  <div className={`w-4 h-4 rounded-full relative z-10 border-2 ${t.src ? "bg-blue border-blue-bright" : "bg-blue-bright border-white"}`}
                       style={{ boxShadow: t.src ? "0 0 14px rgba(58,120,255,0.7)" : "0 0 20px rgba(58,120,255,1), 0 0 40px rgba(58,120,255,0.4)" }} />
                </div>
              ))}
            </div>
          </div>

          {/* Cards */}
          <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}>
            {S.timeline.map((t, i) => (
              <Reveal key={i} delay={i * 90}>
                <TimelineCardDesktop t={t} />
              </Reveal>
            ))}
          </div>
        </div>

        {/* ── Mobile: vertical timeline ─────────────────── */}
        <div className="lg:hidden relative pl-8">
          {/* Vertical line */}
          <div className="absolute left-3 top-2 bottom-6 w-px"
               style={{ background: "linear-gradient(to bottom, rgba(58,120,255,0.7) 0%, rgba(58,120,255,0.2) 80%, transparent 100%)" }} />

          {S.timeline.map((t, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className="relative mb-10 last:mb-0">
                {/* Dot */}
                <div className={`absolute w-4 h-4 rounded-full border-2 z-10 ${t.src ? "bg-blue border-blue-bright" : "bg-blue-bright border-white"}`}
                     style={{
                       left: "-1.4rem",
                       top: "0.2rem",
                       boxShadow: t.src ? "0 0 12px rgba(58,120,255,0.7)" : "0 0 18px rgba(58,120,255,0.9)",
                     }} />

                <span className="font-display text-3xl text-blue-bright block mb-3">{t.ano}</span>

                {t.src ? (
                  <div className="relative overflow-hidden aspect-[16/9] border border-white/10">
                    <img src={t.src} alt={t.titulo}
                         className="w-full h-full object-cover"
                         style={{ objectPosition: t.pos || "center" }} />
                    <div className="absolute inset-0 bg-gradient-to-r from-ink/50 to-transparent" />
                  </div>
                ) : (
                  <div className="relative overflow-hidden aspect-[16/7] border flex items-center justify-center gap-4"
                       style={{
                         background: "linear-gradient(135deg, #050e24 0%, #091830 100%)",
                         borderColor: "rgba(58,120,255,0.4)",
                         boxShadow: "0 0 30px rgba(30,80,255,0.2)",
                       }}>
                    <div className="absolute inset-0 grid-lines opacity-20" />
                    <div className="relative flex items-center gap-4">
                      <div className="text-3xl">🎯</div>
                      <div>
                        <div className="font-display text-4xl text-blue-bright" style={{ textShadow: "0 0 20px rgba(58,120,255,0.8)" }}>2027</div>
                        <div className="font-cond text-xl tracking-widest text-white">PALCO</div>
                      </div>
                    </div>
                  </div>
                )}

                <h3 className="font-display text-xl mt-3 tracking-wide">{t.titulo}</h3>
                <p className="text-white/55 mt-1 text-sm leading-relaxed">{t.texto}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── TREINO (not rendered, kept for reference) ─────────────────────────────────

export function Treino() {
  const [active, setActive] = useState(0);
  return (
    <section id="treino" className="relative py-24 md:py-36">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <Reveal><SectionLabel num="03">Rotina de treino</SectionLabel></Reveal>
        <Reveal delay={80}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <h2 className="font-display text-5xl md:text-7xl leading-[0.9] tracking-tight">
              O <span className="text-blue-bright text-glow">SPLIT</span>
            </h2>
            <p className="text-white/50 max-w-sm md:text-right">Divisão de 5 dias. Volume alto, foco em construção.</p>
          </div>
        </Reveal>
        <Reveal delay={160}>
          <div className="bg-panel border border-white/10 box-glow p-7 md:p-10">
            <div className="flex items-center gap-4 mb-6">
              <span className="font-display text-6xl md:text-8xl text-blue-bright text-glow leading-none">{S.split[active].dia}</span>
              <div>
                <div className="font-mono text-[10px] tracking-widest text-white/40 uppercase">Foco do dia</div>
                <h3 className="font-display text-3xl md:text-4xl tracking-wide">{S.split[active].foco}</h3>
              </div>
            </div>
            <ul className="grid sm:grid-cols-2 gap-x-10 gap-y-1">
              {S.split[active].exercicios.map((e, i) => (
                <li key={i} className="flex items-center gap-4 py-3 border-b border-white/[0.08]">
                  <span className="font-mono text-blue-bright text-sm w-6">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-white/85 text-lg">{e}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ── NUMEROS (not rendered, kept for reference) ────────────────────────────────

export function Numeros() {
  return (
    <section id="numeros" className="relative py-24 md:py-36 bg-panel2 border-y border-white/10 overflow-hidden">
      <div className="absolute inset-0 grid-lines opacity-50" />
      <div className="relative max-w-7xl mx-auto px-5 md:px-8">
        <Reveal><SectionLabel num="04">Os números</SectionLabel></Reveal>
        <Reveal delay={80}>
          <h2 className="font-display text-5xl md:text-7xl leading-[0.9] tracking-tight mb-14">
            PROVA <span className="stroke-text">VIVA</span>
          </h2>
        </Reveal>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10">
          {S.stats.map((s, i) => (
            <Reveal key={i} delay={i * 90}>
              <div className="bg-ink p-7 md:p-9 h-full hover:bg-panel transition-colors group">
                <div className="font-display text-5xl md:text-7xl text-white group-hover:text-blue-bright transition-colors leading-none">
                  <Counter value={s.valor} suffix={s.suffix} />
                </div>
                <div className="font-cond tracking-[0.2em] text-blue-bright text-sm uppercase mt-4">{s.label}</div>
                {s.nota && <div className="text-white/40 text-sm mt-1">{s.nota}</div>}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── GALERIA ───────────────────────────────────────────────────────────────────

export function Galeria() {
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e) => { if (e.key === "Escape") setLightbox(null); };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightbox]);

  return (
    <section id="galeria" className="relative py-24 md:py-36 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <Reveal><SectionLabel num="05">Galeria</SectionLabel></Reveal>
        <Reveal delay={80}>
          <h2 className="font-display text-5xl md:text-7xl leading-[0.9] tracking-tight mb-12">
            O <span className="text-blue-bright text-glow">TRABALHO</span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {S.galeria.map((g, i) => (
            <Reveal key={i} delay={(i % 3) * 80}>
              <div
                className={`group relative overflow-hidden border transition-all duration-400 ${
                  g.src
                    ? "border-white/10 cursor-pointer hover:border-blue/50"
                    : "border-white/5"
                }`}
                style={{ aspectRatio: "3/4" }}
                onClick={() => g.src && setLightbox(g)}
                onMouseEnter={e => g.src && (e.currentTarget.style.boxShadow = "0 0 30px rgba(58,120,255,0.25)")}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = "none")}
              >
                {g.src ? (
                  <>
                    <img
                      src={g.src} alt={g.label}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
                    {/* Blue tint on hover */}
                    <div className="absolute inset-0 bg-blue/0 group-hover:bg-blue/8 transition-all duration-500" />
                    {/* Label slides up */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <span className="font-cond tracking-widest text-sm text-white uppercase">{g.label}</span>
                    </div>
                    {/* Zoom icon */}
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-8 h-8 bg-blue/80 backdrop-blur flex items-center justify-center text-white text-lg leading-none">
                        +
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-panel gap-3">
                    <div className="text-white/15 text-5xl font-display leading-none">+</div>
                    <span className="font-cond tracking-widest text-xs text-white/20 uppercase">{g.label}</span>
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10"
          style={{ background: "rgba(8,8,8,0.96)", backdropFilter: "blur(16px)" }}
          onClick={() => setLightbox(null)}
        >
          {/* Close button */}
          <button
            className="absolute top-5 right-5 font-cond tracking-widest text-sm text-white/50 hover:text-white transition-colors z-10 flex items-center gap-2 px-3 py-2 border border-white/15 hover:border-white/40 bg-ink/60"
            onClick={() => setLightbox(null)}
          >
            ESC ✕
          </button>

          <div
            className="relative max-w-3xl w-full flex flex-col items-center gap-4"
            onClick={e => e.stopPropagation()}
          >
            <img
              src={lightbox.src} alt={lightbox.label}
              className="max-h-[82vh] max-w-full w-auto object-contain"
              style={{ boxShadow: "0 0 80px rgba(58,120,255,0.15), 0 0 0 1px rgba(58,120,255,0.2)" }}
            />
            <div className="font-cond tracking-[0.35em] text-sm text-white/40 uppercase">{lightbox.label}</div>
          </div>
        </div>
      )}
    </section>
  );
}

// ── CONTATO ───────────────────────────────────────────────────────────────────

export function Contato() {
  return (
    <section id="contato" className="relative py-28 md:py-40 bg-panel2 border-t border-white/10 overflow-hidden scroll-mt-24">
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] rounded-full pointer-events-none"
           style={{ background: "radial-gradient(circle, rgba(30,80,255,0.22) 0%, rgba(30,80,255,0) 65%)" }} />
      <div className="relative max-w-5xl mx-auto px-5 md:px-8 text-center">
        <Reveal>
          <div className="flex justify-center">
            <SectionLabel num="06">Contato / Redes</SectionLabel>
          </div>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.85] tracking-tight">
            BORA <br /><span className="text-blue-bright text-glow">CONSTRUIR</span>
          </h2>
        </Reveal>
        <Reveal delay={160}>
          <p className="text-white/60 text-base md:text-lg max-w-lg mx-auto mt-6 leading-relaxed">
            Acompanhe a jornada de perto, veja a evolução diária e faça parte dessa construção.
          </p>
        </Reveal>
        <Reveal delay={220}>
          <div className="flex flex-wrap justify-center gap-3 mt-10">
            <GlowButton href={S.links.linktree} variant="solid">Todos os links</GlowButton>
            <GlowButton href={S.links.instagram} variant="ghost" icon={<IGIcon />}>Instagram</GlowButton>
            <GlowButton href={S.links.tiktok} variant="ghost" icon={<TikTokIcon />}>TikTok</GlowButton>
            <GlowButton href={S.links.parceiroLink} variant="dark">{S.links.parceiroNome}</GlowButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ── FOOTER ────────────────────────────────────────────────────────────────────

export function Footer() {
  return (
    <footer className="bg-ink border-t border-white/10">
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div>
            <div className="font-display text-3xl tracking-wide">PIETRO NAGEL</div>
            <p className="text-white/40 mt-2 max-w-xs">Atleta · Futuro fisiculturista. Disciplina não tira folga.</p>
          </div>
          <div className="flex flex-col gap-3">
            <span className="font-mono text-[10px] tracking-widest text-white/30 uppercase">Redes & links</span>
            <div className="flex flex-wrap gap-2">
              <a href={S.links.instagram} target="_blank" rel="noopener noreferrer"
                 className="p-2.5 border border-white/15 hover:border-blue hover:text-blue-bright transition-colors" aria-label="Instagram">
                <IGIcon />
              </a>
              <a href={S.links.tiktok} target="_blank" rel="noopener noreferrer"
                 className="p-2.5 border border-white/15 hover:border-blue hover:text-blue-bright transition-colors" aria-label="TikTok">
                <TikTokIcon />
              </a>
              <a href={S.links.linktree} target="_blank" rel="noopener noreferrer"
                 className="px-4 py-2.5 border border-white/15 font-cond tracking-widest text-sm uppercase hover:border-blue hover:text-blue-bright transition-colors">
                Linktree
              </a>
              <a href={S.links.parceiroLink} target="_blank" rel="noopener noreferrer"
                 className="px-4 py-2.5 border border-white/15 font-cond tracking-widest text-sm uppercase hover:border-blue hover:text-blue-bright transition-colors">
                {S.links.parceiroNome}
              </a>
            </div>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between gap-2 font-mono text-[11px] text-white/30">
          <span>© {new Date().getFullYear()} Pietro Nagel. Todos os direitos reservados.</span>
          <span>Muscle Contest 2027 — loading...</span>
        </div>
      </div>
    </footer>
  );
}
