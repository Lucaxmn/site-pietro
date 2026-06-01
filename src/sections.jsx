import { useState, useEffect } from 'react';
import { S } from './data';
import { Reveal, Counter, IGIcon, TikTokIcon, GlowButton, SectionLabel, ImageSlot } from './ui';

// ── TOP LINKS BAR ────────────────────────────────────────────────────────────

function TopLinksBar() {
  const items = [
    "ATLETA EM FORMAÇÃO",
    `Parceria oficial · ${S.links.parceiroNome} · USE NAGEL`,
    "Muscle Contest 2027",
    "Treinos registrados no Hevy",
    "Siga @pietro.nagel1",
    "Rumo ao palco",
  ];
  return (
    <div className="w-full bg-blue text-white overflow-hidden whitespace-nowrap">
      <div className="marquee-track inline-flex items-center gap-0 py-1.5">
        {[0, 1].map(rep => (
          <span key={rep} className="inline-flex items-center">
            {items.map((item, i) => (
              <span key={i} className="inline-flex items-center">
                <span className="font-mono tracking-[0.18em] text-[11px] uppercase px-5">{item}</span>
                <span className="text-white/35 text-[10px]">—</span>
              </span>
            ))}
          </span>
        ))}
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

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

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
        ? "bg-ink/95 backdrop-blur-md border-b border-white/10 shadow-[0_2px_40px_rgba(0,0,0,0.6)]"
        : "bg-transparent"
      }`}>
        <div className={`max-w-7xl mx-auto px-5 md:px-8 flex items-center justify-between transition-all duration-300 ${scrolled ? "h-14" : "h-20"}`}>

          {/* Logo */}
          <a href="#top" className="group font-display tracking-wide leading-none">
            <span className={`text-white group-hover:text-blue-bright transition-colors duration-[250ms] ${scrolled ? "text-2xl md:text-3xl" : "text-3xl md:text-4xl"}`}>
              PIETRO NAGEL
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8 xl:gap-10">
            {items.map(([t, h]) => (
              <a key={h} href={h}
                 className="relative font-cond tracking-widest text-lg uppercase text-white/65 hover:text-white transition-colors duration-200 py-2 group">
                {t}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-blue-bright transition-all duration-[350ms] group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-2">
            <a href={S.links.parceiroLink} target="_blank" rel="noopener noreferrer"
               className="font-mono tracking-[0.2em] text-xs uppercase px-3.5 py-2 border border-white/[0.12] text-white/60 hover:border-blue/60 hover:text-blue-bright transition-all duration-200">
              {S.links.parceiroNome}
            </a>
            <a href={S.links.linktree} target="_blank" rel="noopener noreferrer"
               className="font-cond tracking-widest text-sm uppercase px-5 py-2.5 bg-blue text-white hover:bg-blue-bright transition-all duration-200 hover:shadow-[0_0_24px_rgba(58,120,255,0.55)]">
              Linktree
            </a>
            <a href={S.links.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"
               className="p-2.5 text-white/55 hover:text-blue-bright transition-colors">
              <IGIcon className="w-5 h-5" />
            </a>
            <a href={S.links.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok"
               className="p-2.5 text-white/55 hover:text-blue-bright transition-colors">
              <TikTokIcon className="w-5 h-5" />
            </a>
          </div>

          {/* Hamburger */}
          <button
            className="lg:hidden p-2 -mr-2"
            onClick={() => setOpen(o => !o)}
            aria-label="Menu"
            aria-controls="mobile-menu"
            aria-expanded={open}
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`block h-0.5 bg-white transition-all duration-300 origin-center ${open ? "rotate-45 translate-y-[9px]" : ""}`} />
              <span className={`block h-0.5 bg-white transition-all duration-300 ${open ? "opacity-0 scale-x-0" : ""}`} />
              <span className={`block h-0.5 bg-white transition-all duration-300 origin-center ${open ? "-rotate-45 -translate-y-[9px]" : ""}`} />
            </div>
          </button>
        </div>

        {/* Mobile menu — overlay fixed, não empurra conteúdo */}
        <div
          id="mobile-menu"
          aria-hidden={!open}
          className={`fixed inset-0 z-[200] lg:hidden transition-opacity duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        >
          <div className="absolute inset-0 bg-ink/70 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className={`absolute top-0 left-0 right-0 bg-ink border-b border-white/[0.08] px-5 pt-6 pb-8 transition-transform duration-300 ${open ? "translate-y-0" : "-translate-y-full"}`}>
            <div className="flex flex-col mb-6">
              {items.map(([t, h]) => (
                <a key={h} href={h} onClick={() => setOpen(false)}
                   className="font-display text-4xl uppercase py-4 text-white/80 hover:text-blue-bright border-b border-white/[0.06] transition-colors tracking-wide">
                  {t}
                </a>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-2">
              <GlowButton href={S.links.linktree} variant="solid" className="justify-center">Linktree</GlowButton>
              <GlowButton href={S.links.parceiroLink} variant="dark" className="justify-center">{S.links.parceiroNome}</GlowButton>
              <GlowButton href={S.links.instagram} variant="ghost" icon={<IGIcon />} className="justify-center">Instagram</GlowButton>
              <GlowButton href={S.links.tiktok} variant="ghost" icon={<TikTokIcon />} className="justify-center">TikTok</GlowButton>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

// ── HERO ─────────────────────────────────────────────────────────────────────

export function Hero() {

  const fraseLinhas = S.atleta.fraseHero.split("\n");

  const infoCards = [
    { num: "15",                            label: "ANOS DE IDADE",   hide: false },
    { num: String(S.atleta.inicioIdade),    label: "INÍCIO DO TREINO", hide: true  },
    { num: "2027",                          label: "MUSCLE CONTEST",  hide: false },
  ];

  return (
    <section id="top" className="relative flex flex-col justify-start overflow-hidden" style={{ minHeight: "calc(100svh - 6.75rem)" }}>
      {/* Background glows */}
      <div className="absolute top-1/3 right-[10%] w-[45vw] h-[45vw] max-w-[480px] max-h-[480px] rounded-full pointer-events-none"
           style={{ background: "radial-gradient(circle, rgba(30,80,255,0.18) 0%, rgba(30,80,255,0) 65%)" }} />
      <div className="absolute bottom-0 -left-24 w-[35vw] h-[35vw] max-w-[400px] max-h-[400px] rounded-full pointer-events-none"
           style={{ background: "radial-gradient(circle, rgba(10,43,204,0.14) 0%, rgba(10,43,204,0) 65%)" }} />
      <div className="absolute inset-0 grid-lines opacity-[0.18]" />

      {/* Hero photo — direita, desktop, corpo inteiro sem crop vertical */}
      <div className="absolute right-0 top-0 bottom-0 w-[52%] z-[1] pointer-events-none hidden lg:block overflow-hidden">
        <img
          src="/assets/fotohomepage.webp"
          alt="Pietro Nagel"
          loading="eager"
          decoding="async"
          className="w-full h-full object-cover"
          style={{
            objectPosition: "center 38%",
            filter: "brightness(1.12) contrast(1.04) saturate(0.9)",
          }}
        />
        {/* Blend lateral — fusão com o texto */}
        <div className="absolute inset-0" style={{
          background: "linear-gradient(to right, rgba(10,10,10,1) 0%, rgba(10,10,10,0.82) 20%, rgba(10,10,10,0.28) 44%, rgba(10,10,10,0) 64%)"
        }} />
        {/* Fade inferior */}
        <div className="absolute inset-0" style={{
          background: "linear-gradient(to top, rgba(10,10,10,0.65) 0%, rgba(10,10,10,0.08) 22%, rgba(10,10,10,0) 38%)"
        }} />
        {/* Fade superior */}
        <div className="absolute inset-0" style={{
          background: "linear-gradient(to bottom, rgba(10,10,10,0.18) 0%, rgba(10,10,10,0) 12%)"
        }} />
      </div>

      {/* Overlay horizontal — protege legibilidade do texto */}
      <div className="absolute inset-0 z-[2] pointer-events-none" style={{
        background: "linear-gradient(100deg, rgba(10,10,10,0.99) 0%, rgba(10,10,10,0.96) 30%, rgba(10,10,10,0.55) 50%, rgba(10,10,10,0) 64%)"
      }} />

      {/* Conteúdo */}
      <div className="relative z-[3] max-w-7xl mx-auto pl-4 pr-5 md:pl-6 md:pr-8 w-full pointer-events-none"
           style={{ paddingTop: "clamp(2rem, 4vh, 3.5rem)", paddingBottom: "clamp(1rem, 1.5vh, 1.5rem)" }}>
        <div className="max-w-[600px] lg:max-w-[55%]">

          {/* Selo + tagline */}
          <div className="flex flex-wrap items-center gap-3 mb-4 pointer-events-auto">
            <span className="font-mono text-[11px] tracking-widest text-blue-bright uppercase px-2 py-1 border border-blue/40 bg-blue/5">
              EST. 2023
            </span>
            <span className="hidden sm:inline font-mono tracking-[0.18em] text-white/40 text-xs uppercase">
              {S.atleta.tagline}
            </span>
          </div>

          {/* Título principal — linhas espaçadas, sem sobreposição */}
          <h1 className="font-display leading-none tracking-normal">
            {fraseLinhas.map((l, i) => {
              const last = i === fraseLinhas.length - 1;
              return (
                <span key={i} className={`block text-[10.5vw] sm:text-[10vw] md:text-[5.5rem] xl:text-[6.5rem] ${last ? "text-blue-bright text-glow" : "text-white"} ${i > 0 ? "mt-2 md:mt-3" : ""}`}>
                  {l}
                </span>
              );
            })}
          </h1>

          {/* Cards de stats — compactos, 3 colunas */}
          <div className="mt-4 md:mt-6 grid grid-cols-3 gap-2 max-w-[280px] sm:max-w-xs pointer-events-auto">
            {infoCards.map(c => (
              <div key={c.label}
                   className="relative overflow-hidden bg-ink/75 backdrop-blur border border-white/[0.09] hover:border-blue/40 px-2.5 py-2 transition-colors duration-300 group cursor-default"
                   onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 0 18px rgba(30,80,255,0.22)"; }}
                   onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; }}>
                <div className="absolute bottom-0 left-0 h-px w-0 bg-blue-bright group-hover:w-full transition-all duration-500" />
                <div className="font-display text-lg md:text-xl text-white leading-none group-hover:text-blue-bright transition-colors duration-300">{c.num}</div>
                <div className="font-mono text-[7.5px] tracking-widest text-blue-bright/50 mt-1 uppercase leading-tight">{c.label}</div>
              </div>
            ))}
          </div>

          {/* Frase de preparação — ponte visual entre stats e CTAs */}
          <div className="hidden md:inline-flex mt-5 items-center gap-3 pointer-events-auto border-l-[3px] border-blue pl-4">
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="absolute inline-flex h-full w-full rounded-full bg-blue-bright opacity-75" style={{ animation: "flicker 1.6s infinite" }} />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-bright" />
            </span>
            <p className="font-cond tracking-widest text-xl md:text-[1.35rem] uppercase text-white/95 leading-tight">
              Preparação para o <span className="text-blue-bright text-glow">Muscle Contest 2027</span>
            </p>
          </div>

          {/* CTA buttons — linha única no desktop, 2 linhas equilibradas no mobile */}
          <div className="mt-4 md:mt-5 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2 pointer-events-auto">
            <a href={S.links.linktree} target="_blank" rel="noopener noreferrer"
               className="group inline-flex items-center justify-center sm:justify-start gap-2.5 font-cond tracking-wider uppercase text-lg md:text-xl px-6 md:px-7 py-3 bg-blue text-white transition-all duration-300 hover:bg-blue-bright hover:shadow-[0_0_44px_rgba(58,120,255,0.75)] whitespace-nowrap"
               style={{ boxShadow: "0 0 24px rgba(30,80,255,0.45), inset 0 1px 0 rgba(255,255,255,0.1)" }}>
              Todos os links
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5">→</span>
            </a>
            <div className="flex gap-2">
              <GlowButton href={S.links.instagram} variant="ghost" icon={<IGIcon />} className="flex-1 sm:flex-none justify-center sm:justify-start">Instagram</GlowButton>
              <GlowButton href={S.links.tiktok} variant="ghost" icon={<TikTokIcon />} className="flex-1 sm:flex-none justify-center sm:justify-start">TikTok</GlowButton>
              <GlowButton href={S.links.hevy} variant="dark" className="hidden md:inline-flex">Treinos / Hevy</GlowButton>
            </div>
          </div>

          {/* Mobile: frase de preparação após botões */}
          <div className="md:hidden mt-4 inline-flex items-center gap-2.5 pointer-events-auto border-l-2 border-blue pl-3">
            <p className="font-cond tracking-wide text-sm uppercase text-white/75 leading-tight">
              Preparação para o <span className="text-blue-bright">Muscle Contest 2027</span>
            </p>
          </div>
        </div>
      </div>

      {/* Foto mobile — faixa abaixo do conteúdo, altura fixa */}
      <div className="relative z-[3] lg:hidden overflow-hidden" style={{ height: "230px" }}>
        <img
          src="/assets/fotohomepage.webp"
          alt="Pietro Nagel"
          loading="eager"
          decoding="async"
          className="w-full h-full object-cover"
          style={{ objectPosition: "center 36%", filter: "brightness(1.5) contrast(1.08) saturate(0.88)" }}
        />
        {/* Fade de cima — funde com conteúdo (borda fina) */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0) 14%)" }} />
        {/* Fade de baixo */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,10,10,0.65) 0%, rgba(10,10,10,0) 28%)" }} />
      </div>

    </section>
  );
}

// ── PARTNER STRIP ────────────────────────────────────────────────────────────

export function PartnerStrip() {
  return (
    <section className="relative overflow-hidden" style={{ background: "linear-gradient(140deg, #080808 0%, #0b1530 45%, #080808 100%)" }}>
      <div className="absolute top-0 left-0 right-0 h-px"
           style={{ background: "linear-gradient(to right, transparent, rgba(58,120,255,0.55), transparent)" }} />
      <div className="absolute bottom-0 left-0 right-0 h-px"
           style={{ background: "linear-gradient(to right, transparent, rgba(58,120,255,0.55), transparent)" }} />
      <div className="absolute inset-0 pointer-events-none"
           style={{ backgroundImage: "linear-gradient(to right, transparent 0%, rgba(30,80,255,0.05) 50%, transparent 100%)" }} />

      <div className="max-w-7xl mx-auto px-5 md:px-10 py-12 md:py-20 flex flex-col lg:flex-row items-center gap-10 md:gap-12">

        {/* Brand image */}
        <div className="w-full lg:w-[28%] shrink-0">
          <div className="relative">
            <div className="relative overflow-hidden aspect-[4/3]"
                 style={{
                   border: "1px solid rgba(58,120,255,0.2)",
                   boxShadow: "0 0 70px rgba(30,80,255,0.14), 0 30px 80px rgba(0,0,0,0.45)",
                 }}>
              <img src="/assets/montelest.webp" alt="Monte Leste" loading="lazy" decoding="async" className="w-full h-full object-cover" />
              <div className="absolute inset-0"
                   style={{ background: "linear-gradient(135deg, rgba(10,10,10,0) 50%, rgba(13,26,58,0.55) 100%)" }} />
              {/* Badge */}
              <div className="absolute top-4 left-4">
                <div className="bg-blue/85 backdrop-blur px-3 py-1.5 font-mono text-[10px] tracking-[0.3em] text-white uppercase">
                  Parceiro Oficial
                </div>
              </div>
              {/* Athlete × brand */}
              <div className="absolute bottom-0 left-0 right-0 px-4 py-3"
                   style={{ background: "linear-gradient(to top, rgba(8,8,8,0.85), transparent)" }}>
                <div className="flex items-center gap-2.5">
                  <span className="h-px flex-1 bg-blue/35" />
                  <span className="font-mono text-[9px] tracking-[0.25em] text-white/40 uppercase">Pietro Nagel × Monte Leste</span>
                  <span className="h-px flex-1 bg-blue/35" />
                </div>
              </div>
            </div>
            {/* Offset shadow frame */}
            <div className="absolute -bottom-3 -right-3 -left-0 top-3 border border-blue/8 -z-10" />
          </div>
        </div>

        {/* Info + CTA */}
        <div className="flex flex-col items-center lg:items-start gap-5 text-center lg:text-left flex-1">
          <div className="flex items-center gap-2.5">
            <span className="inline-block w-8 h-px bg-blue" />
            <span className="font-mono text-[11px] tracking-[0.28em] text-blue-bright uppercase">Parceria oficial</span>
          </div>

          <h2 className="font-display text-5xl md:text-6xl xl:text-7xl text-white tracking-tight leading-none"
              style={{ textShadow: "0 0 40px rgba(58,120,255,0.22)" }}>
            {S.links.parceiroNome}
          </h2>

          <p className="font-sans text-white/60 text-sm md:text-base max-w-md leading-relaxed">
            Estilo urbano, qualidade e personalidade para quem busca se destacar.
            Use o cupom <span className="text-blue-bright font-semibold">NAGEL</span> e garanta{" "}
            <span className="text-white font-medium">12% de desconto</span> — e me ajuda a continuar essa jornada.
          </p>

          {/* Cupom block */}
          <div className="relative w-full max-w-sm overflow-hidden"
               style={{
                 background: "linear-gradient(135deg, #100600 0%, #291000 50%, #100600 100%)",
                 border: "1px solid rgba(255,115,0,0.38)",
                 boxShadow: "0 0 40px rgba(255,90,0,0.18), inset 0 1px 0 rgba(255,140,0,0.07)",
               }}>
            <div className="h-px w-full"
                 style={{ background: "linear-gradient(to right, transparent, rgba(255,140,0,0.5), transparent)" }} />
            <div className="flex items-center gap-4 px-5 py-4">
              <div className="flex-1 min-w-0">
                <div className="font-mono text-[9px] tracking-[0.35em] uppercase mb-1.5" style={{ color: "rgba(255,140,60,0.5)" }}>
                  Cupom do atleta
                </div>
                <div className="flex items-center gap-2 font-display text-4xl md:text-5xl tracking-wider"
                     style={{ color: "#ff7000", textShadow: "0 0 28px rgba(255,90,0,0.85)" }}>
                  <span style={{ textShadow: "none", fontSize: "0.82em" }}>🎟️</span>
                  <span>NAGEL</span>
                </div>
              </div>
              <div className="w-px self-stretch" style={{ background: "rgba(255,110,0,0.18)" }} />
              <div className="text-center shrink-0">
                <div className="font-display text-4xl md:text-5xl text-white leading-none">12%</div>
                <div className="font-mono text-[10px] tracking-widest uppercase mt-1" style={{ color: "rgba(255,140,60,0.5)" }}>desconto</div>
              </div>
            </div>
            <div className="px-5 pb-3.5">
              <div className="h-px w-full mb-2.5" style={{ background: "rgba(255,110,0,0.1)" }} />
              <p className="font-mono text-[10px] tracking-[0.18em] text-center" style={{ color: "rgba(255,140,60,0.35)" }}>
                Use e fortaleça essa construção
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center lg:items-start gap-2">
            <a href={S.links.parceiroLink} target="_blank" rel="noopener noreferrer"
               className="group font-cond tracking-widest text-xl uppercase px-10 py-4 bg-blue text-white transition-all duration-300 hover:bg-blue-bright hover:shadow-[0_0_40px_rgba(30,80,255,0.5)]"
               style={{ boxShadow: "0 0 28px rgba(30,80,255,0.35), inset 0 1px 0 rgba(255,255,255,0.07)" }}>
              <span className="flex items-center gap-3">
                Conhecer a marca
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-2">→</span>
              </span>
            </a>
            <span className="font-mono text-[10px] tracking-widest text-white/20 uppercase">monteleste.com.br</span>
          </div>
        </div>

        {/* Right photo */}
        <div className="hidden lg:block w-[26%] shrink-0">
          <div className="relative overflow-hidden aspect-[3/4]"
               style={{
                 border: "1px solid rgba(58,120,255,0.15)",
                 boxShadow: "0 0 50px rgba(30,80,255,0.1), 0 20px 60px rgba(0,0,0,0.5)",
               }}>
            <img src="/assets/monteleste2.webp" alt="Pietro Nagel com Monte Leste" loading="lazy" decoding="async" className="w-full h-full object-cover object-top" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(8,8,8,0.45) 0%, transparent 50%)" }} />
            <div className="absolute bottom-3 left-3 right-3">
              <div className="flex items-center gap-2">
                <span className="h-px flex-1 bg-blue/20" />
                <span className="font-mono text-[8px] tracking-[0.22em] text-white/30 uppercase">parceria oficial</span>
                <span className="h-px flex-1 bg-blue/20" />
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

// ── JORNADA ──────────────────────────────────────────────────────────────────

export function Jornada() {
  return (
    <section id="jornada" className="relative py-16 md:py-32 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-5 md:px-8 grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">

        <div className="lg:col-span-7">
          <Reveal><SectionLabel num="01">Sobre / Minha jornada</SectionLabel></Reveal>
          <Reveal delay={80}>
            <h2 className="font-display text-4xl md:text-6xl leading-[0.9] tracking-tight mb-6">
              {S.jornada.titulo}<span className="text-blue-bright">.</span>
            </h2>
          </Reveal>
          <div className="space-y-5 max-w-xl">
            {S.jornada.paragrafos.map((p, i) => (
              <Reveal key={i} delay={120 + i * 90}>
                <p className="text-white/65 text-base md:text-lg leading-relaxed">{p}</p>
              </Reveal>
            ))}
          </div>

          {/* Stat cards — modern with left accent */}
          <Reveal delay={400}>
            <div className="mt-10 flex flex-wrap gap-3">
              {[["ALTURA", S.atleta.altura], ["PESO", S.atleta.peso], ["IDADE", S.atleta.idade + " anos"]].map(([k, v]) => (
                <div key={k}
                     className="relative group bg-panel border-l-2 border-blue/50 hover:border-blue border-r border-t border-b border-white/[0.08] hover:border-r-blue/25 hover:border-t-blue/25 hover:border-b-blue/25 px-5 py-3.5 transition-all duration-300 cursor-default overflow-hidden"
                     onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 0 22px rgba(30,80,255,0.2)"; }}
                     onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; }}>
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-blue/0 group-hover:bg-blue/30 transition-colors duration-[400ms]" />
                  <div className="font-mono text-[10px] tracking-widest text-white/35 uppercase">{k}</div>
                  <div className="font-display text-2xl md:text-3xl text-white mt-0.5 group-hover:text-blue-bright transition-colors duration-300">{v}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Photo with editorial treatment */}
        <div className="lg:col-span-5">
          <Reveal delay={150}>
            <div className="relative">
              <ImageSlot label="RETRATO" src={S.retrato} ratio="aspect-[4/5]" />
              {/* Athlete label */}
              <div className="absolute top-4 right-4">
                <span className="font-mono text-[9px] tracking-[0.3em] text-white/30 uppercase border border-white/10 px-2 py-1 bg-ink/55 backdrop-blur">
                  ATLETA
                </span>
              </div>
              {/* Offset frame accent */}
              <div className="absolute -bottom-3 -left-3 w-16 h-16 border-l-2 border-b-2 border-blue/25 pointer-events-none" />
              <div className="absolute -top-3 -right-3 w-10 h-10 border-r-2 border-t-2 border-blue/15 pointer-events-none" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ── EVOLUCAO ─────────────────────────────────────────────────────────────────

function TimelineCardDesktop({ t, index, total }) {
  const isPast    = index < total - 2;
  const isCurrent = index === total - 2;
  const isFuture  = index === total - 1;

  if (isFuture) {
    return (
      <div className="flex flex-col">
        <div className="relative overflow-hidden border aspect-[3/4] flex flex-col items-center justify-center gap-4"
             style={{
               background: "linear-gradient(145deg, #040c1f 0%, #06112a 50%, #040c1f 100%)",
               borderColor: "rgba(58,120,255,0.5)",
               boxShadow: "0 0 60px rgba(30,80,255,0.25), inset 0 0 80px rgba(30,80,255,0.06)",
             }}>
          <div className="absolute inset-0 grid-lines opacity-15" />
          {/* Corner accents */}
          <div className="absolute top-3 left-3 w-5 h-5 border-l-2 border-t-2 border-blue-bright/50" />
          <div className="absolute bottom-3 right-3 w-5 h-5 border-r-2 border-b-2 border-blue-bright/50" />
          {/* Bottom glow flood */}
          <div className="absolute bottom-0 left-0 right-0 h-2/5 pointer-events-none"
               style={{ background: "linear-gradient(to top, rgba(30,80,255,0.22), transparent)" }} />
          <div className="relative text-center px-4 z-10">
            <div className="font-mono text-[9px] tracking-[0.35em] text-blue-bright/45 uppercase mb-3">Destino final</div>
            <div className="relative inline-block">
              <div className="font-display text-6xl leading-none"
                   style={{ color: "#3a78ff", textShadow: "0 0 40px rgba(58,120,255,1), 0 0 80px rgba(58,120,255,0.4)" }}>
                2027
              </div>
            </div>
            <div className="font-cond text-2xl tracking-[0.25em] text-white mt-2">PALCO</div>
          </div>
          <div className="relative font-mono text-[9px] tracking-[0.4em] text-blue-bright/35 uppercase z-10">
            Muscle Contest
          </div>
        </div>
        <h3 className="font-display text-lg xl:text-xl mt-4 tracking-wide text-blue-bright">{t.titulo}</h3>
        <p className="text-white/45 mt-1 text-sm leading-relaxed">{t.texto}</p>
      </div>
    );
  }

  return (
    <div className="group flex flex-col">
      <div className="relative overflow-hidden border aspect-[3/4]"
           style={{
             borderColor: isCurrent ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.08)",
             transition: "border-color 0.4s, box-shadow 0.4s",
           }}
           onMouseEnter={e => {
             e.currentTarget.style.borderColor = "rgba(58,120,255,0.55)";
             e.currentTarget.style.boxShadow = "0 0 32px rgba(58,120,255,0.28)";
           }}
           onMouseLeave={e => {
             e.currentTarget.style.borderColor = isCurrent ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.08)";
             e.currentTarget.style.boxShadow = "none";
           }}>
        <img src={t.src} alt={t.titulo} loading="lazy" decoding="async"
             className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
             style={{ objectPosition: t.pos || "center" }} />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/15 to-transparent" />
        <div className="absolute inset-0 bg-blue/0 group-hover:bg-blue/8 transition-colors duration-500" />
        {isCurrent && (
          <div className="absolute top-3 right-3 font-mono text-[9px] tracking-[0.25em] text-white/50 uppercase border border-white/20 px-2 py-1 bg-ink/50 backdrop-blur">
            Agora
          </div>
        )}
      </div>
      <h3 className={`font-display text-lg xl:text-xl mt-4 tracking-wide ${isCurrent ? "text-white" : "text-white/80"}`}>{t.titulo}</h3>
      <p className="text-white/45 mt-1 text-sm leading-relaxed">{t.texto}</p>
    </div>
  );
}

export function Evolucao() {
  const n = S.timeline.length;

  const yearColor = (i) => {
    if (i === n - 1) return { color: "#3a78ff", textShadow: "0 0 24px rgba(58,120,255,0.8)" };
    if (i === n - 2) return { color: "rgba(255,255,255,0.95)" };
    const opacity = 0.35 + (i / (n - 2)) * 0.45;
    return { color: `rgba(58,120,255,${opacity})` };
  };

  return (
    <section id="evolucao" className="relative py-16 md:py-32 bg-panel2 border-y border-white/10 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <Reveal><SectionLabel num="02">Transformação</SectionLabel></Reveal>
        <Reveal delay={80}>
          <h2 className="font-display text-4xl md:text-6xl leading-[0.9] tracking-tight mb-10 md:mb-14">
            A <span className="stroke-text-blue">EVOLUÇÃO</span>
          </h2>
        </Reveal>

        {/* ── Desktop: horizontal timeline ─────────────── */}
        <div className="hidden lg:block">
          {/* Year + dot row */}
          <div className="relative mb-8">
            <div className="absolute h-px pointer-events-none"
                 style={{
                   top: "54px",
                   left: `${(100 / n) / 2}%`,
                   right: `${(100 / n) / 2}%`,
                   background: "linear-gradient(to right, rgba(58,120,255,0.15), rgba(58,120,255,0.6) 25%, rgba(58,120,255,0.6) 75%, rgba(58,120,255,0.15))",
                 }} />

            <div className="grid" style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}>
              {S.timeline.map((t, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="h-12 flex items-end pb-1">
                    <span className="font-display text-4xl leading-none" style={yearColor(i)}>
                      {t.ano}
                    </span>
                  </div>
                  <div className={`w-4 h-4 rounded-full relative z-10 border-2 ${t.src ? "bg-blue border-blue-bright" : "bg-blue-bright border-white"}`}
                       style={{
                         boxShadow: t.src
                           ? "0 0 14px rgba(58,120,255,0.65)"
                           : "0 0 22px rgba(58,120,255,1), 0 0 44px rgba(58,120,255,0.45)",
                       }} />
                </div>
              ))}
            </div>
          </div>

          {/* Cards */}
          <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}>
            {S.timeline.map((t, i) => (
              <Reveal key={i} delay={i * 90}>
                <TimelineCardDesktop t={t} index={i} total={n} />
              </Reveal>
            ))}
          </div>
        </div>

        {/* ── Mobile: vertical timeline ─────────────────── */}
        <div className="lg:hidden relative pl-8">
          <div className="absolute left-3 top-2 bottom-6 w-px"
               style={{ background: "linear-gradient(to bottom, rgba(58,120,255,0.7) 0%, rgba(58,120,255,0.25) 80%, transparent 100%)" }} />

          {S.timeline.map((t, i) => {
            const isFuture = i === n - 1;
            const isCurrent = i === n - 2;
            return (
              <Reveal key={i} delay={i * 80}>
                <div className="relative mb-10 last:mb-0">
                  <div className={`absolute w-4 h-4 rounded-full border-2 z-10 ${t.src ? "bg-blue border-blue-bright" : "bg-blue-bright border-white"}`}
                       style={{
                         left: "-1.4rem",
                         top: "0.25rem",
                         boxShadow: t.src ? "0 0 12px rgba(58,120,255,0.65)" : "0 0 20px rgba(58,120,255,0.95)",
                       }} />

                  <span className="font-display text-3xl block mb-3" style={yearColor(i)}>{t.ano}</span>

                  {t.src ? (
                    <div className="relative overflow-hidden aspect-[4/5] border"
                         style={{ borderColor: isCurrent ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.08)" }}>
                      <img src={t.src} alt={t.titulo} loading="lazy" decoding="async"
                           className="w-full h-full object-cover"
                           style={{ objectPosition: t.pos || "center top" }} />
                      <div className="absolute inset-0 bg-gradient-to-r from-ink/40 to-transparent" />
                      {isCurrent && (
                        <div className="absolute top-2 right-2 font-mono text-[9px] tracking-widest text-white/45 uppercase border border-white/15 px-2 py-0.5 bg-ink/50">
                          Agora
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="relative overflow-hidden aspect-[16/7] border flex items-center justify-center gap-5"
                         style={{
                           background: "linear-gradient(145deg, #040c1f 0%, #06112a 100%)",
                           borderColor: "rgba(58,120,255,0.45)",
                           boxShadow: "0 0 35px rgba(30,80,255,0.22)",
                         }}>
                      <div className="absolute inset-0 grid-lines opacity-15" />
                      <div className="relative text-center">
                        <div className="font-mono text-[9px] tracking-[0.35em] text-blue-bright/40 uppercase mb-2">Destino final</div>
                        <div className="font-display text-5xl"
                             style={{ color: "#3a78ff", textShadow: "0 0 30px rgba(58,120,255,0.9)" }}>
                          2027
                        </div>
                        <div className="font-cond text-xl tracking-widest text-white mt-1">PALCO</div>
                      </div>
                    </div>
                  )}

                  <h3 className={`font-display text-xl mt-3 tracking-wide ${isFuture ? "text-blue-bright" : "text-white"}`}>{t.titulo}</h3>
                  <p className="text-white/50 mt-1 text-sm leading-relaxed">{t.texto}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── GALERIA ───────────────────────────────────────────────────────────────────

const GALERIA_META = [
  { caption: "check-in atual",          tag: "● SHAPE ATUAL · 2026" },
  { caption: "shape em evolução",       tag: null                    },
  { caption: "costas em construção",    tag: null                    },
  { caption: "registro de treino",      tag: null                    },
  { caption: "bastidor da jornada",     tag: null                    },
  { caption: "sem filtro, só processo", tag: null                    },
];

function GaleriaCell({ g, onOpen, fill = false, idx = 0, featured = false }) {
  const meta = GALERIA_META[idx] || {};
  const className = `group relative block w-full overflow-hidden appearance-none p-0 text-left ${g.src ? "cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-bright focus-visible:ring-offset-2 focus-visible:ring-offset-ink" : "cursor-default"} ${fill ? "h-full" : ""}`;
  const style = {
    border: "1px solid rgba(255,255,255,0.06)",
    aspectRatio: fill ? undefined : "2/3",
    background: "#080808",
  };

  const content = g.src ? (
    <>
      {/* Blurred bg */}
      <img
        src={g.src} alt="" aria-hidden="true" loading="lazy" decoding="async"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
        style={{ filter: "blur(32px)", transform: "scale(1.25)", opacity: 0.2 }}
      />
      {/* Main image */}
      <img
        src={g.src} alt={g.label} loading="lazy" decoding="async"
        className="relative w-full h-full object-contain z-10 transition-transform duration-700 group-hover:scale-[1.015]"
      />
      {/* Bottom vignette */}
      <div className="absolute inset-0 z-20 bg-gradient-to-t from-ink/70 via-transparent to-transparent pointer-events-none" />
      {/* Hover darkening */}
      <div className="absolute inset-0 z-20 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 pointer-events-none" />
      {/* Index */}
      <div className="absolute top-3 left-3 z-30 font-mono text-[9px] tracking-[0.3em] text-white/20 uppercase select-none">
        {String(idx + 1).padStart(2, "0")}
      </div>
      {/* Featured tag */}
      {featured && meta.tag && (
        <div className="absolute top-3 right-3 z-30">
          <span className="font-mono text-[9px] tracking-[0.22em] text-white/45 uppercase px-2 py-1 border border-white/10 bg-ink/55 backdrop-blur">
            {meta.tag}
          </span>
        </div>
      )}
      {/* Caption on hover */}
      <div className="absolute bottom-0 left-0 right-0 z-30 px-4 py-4 translate-y-full group-hover:translate-y-0 transition-transform duration-[350ms]">
        <p className="font-mono text-xs text-white/75 lowercase tracking-wide">{meta.caption}</p>
      </div>
    </>
  ) : (
    <div className="w-full h-full min-h-[180px] flex flex-col items-center justify-center bg-panel gap-2 select-none">
      <div className="font-mono text-[10px] tracking-[0.3em] text-white/[0.12] uppercase">{meta.caption}</div>
      <div className="h-px w-12 bg-white/[0.06]" />
      <div className="font-mono text-[9px] tracking-[0.22em] text-white/[0.08] uppercase">em breve</div>
    </div>
  );

  if (!g.src) {
    return (
      <div className={className} style={style}>
        {content}
      </div>
    );
  }

  return (
    <button
      type="button"
      className={className}
      style={style}
      onClick={() => onOpen({ ...g, caption: meta.caption })}
      aria-label={`Abrir foto: ${g.label}`}
    >
      {content}
    </button>
  );
}

export function Galeria() {
  const [lightbox, setLightbox] = useState(null);
  const realCount = S.galeria.filter(g => g.src).length;

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
    <section id="galeria" className="relative py-16 md:py-32 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-5 md:px-8">

        {/* ── Header ── */}
        <div className="mb-10 md:mb-12">
          <Reveal>
            <div className="flex items-center justify-between gap-4 mb-5">
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-blue/50" />
                <span className="font-mono text-[10px] tracking-[0.32em] text-white/35 uppercase">Galeria · Bastidores</span>
              </div>
              <div className="hidden md:flex items-center gap-4 text-right">
                <span className="font-mono text-[10px] tracking-[0.25em] text-white/20 uppercase">
                  {String(realCount).padStart(2, "0")} registros
                </span>
                <span className="font-mono text-[10px] tracking-[0.25em] text-blue-bright/35 uppercase">2026</span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={70}>
            <h2 className="font-display text-4xl md:text-6xl leading-[0.9] tracking-tight">
              O <span className="text-blue-bright" style={{ textShadow: "0 0 14px rgba(30,80,255,0.38)" }}>TRABALHO</span>
            </h2>
          </Reveal>

        </div>

        {/* ── Grid 2×2 — desktop e mobile ── */}
        <Reveal>
          <div className="grid grid-cols-2 gap-2.5 max-w-4xl mx-auto">
            {S.galeria.filter(g => g.src).slice(0, 4).map((g, i) => (
              <GaleriaCell key={i} g={g} onOpen={setLightbox} idx={i} featured={i === 0} />
            ))}
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div className="flex items-center gap-4 mt-5">
            <div className="h-px flex-1 bg-white/[0.05]" />
            <span className="font-mono text-[9px] tracking-[0.35em] text-white/15 uppercase">
              Pietro Nagel · Mais registros em breve
            </span>
            <div className="h-px flex-1 bg-white/[0.05]" />
          </div>
        </Reveal>
      </div>

      {/* ── Lightbox ── */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10"
          style={{ background: "rgba(5,5,7,0.97)", backdropFilter: "blur(24px)" }}
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Foto ampliada"
        >
          <button
            className="absolute top-5 right-5 font-mono tracking-widest text-xs text-white/35 hover:text-white/80 transition-colors z-10 flex items-center gap-2 px-3 py-2 border border-white/10 hover:border-white/25 bg-ink/60 uppercase"
            aria-label="Fechar foto ampliada"
            onClick={() => setLightbox(null)}>
            ESC ✕
          </button>

          <div
            className="relative max-w-3xl w-full flex flex-col items-center gap-5"
            onClick={e => e.stopPropagation()}
          >
            <img
              src={lightbox.src} alt={lightbox.label} decoding="async"
              className="max-h-[80vh] max-w-full w-auto object-contain"
              style={{ border: "1px solid rgba(255,255,255,0.07)" }}
            />
            {/* Caption row */}
            <div className="flex items-center gap-4 w-full justify-center">
              <span className="h-px w-8 bg-white/10 shrink-0" />
              <div className="text-center">
                <p className="font-mono text-xs text-white/40 lowercase tracking-wide">{lightbox.caption}</p>
                <p className="font-mono text-[10px] tracking-[0.3em] text-white/[0.18] uppercase mt-1">Pietro Nagel · 2026</p>
              </div>
              <span className="h-px w-8 bg-white/10 shrink-0" />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

// ── CONTATO ───────────────────────────────────────────────────────────────────

export function Contato() {
  return (
    <section id="contato" className="relative py-20 md:py-36 bg-panel2 border-t border-white/10 overflow-hidden scroll-mt-24">
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[70vw] h-[70vw] max-w-[750px] max-h-[750px] rounded-full pointer-events-none"
           style={{ background: "radial-gradient(circle, rgba(30,80,255,0.2) 0%, rgba(30,80,255,0) 65%)" }} />
      <div className="absolute inset-0 grid-lines opacity-20" />
      <div className="relative max-w-5xl mx-auto px-5 md:px-8 text-center">
        <Reveal>
          <div className="flex justify-center">
            <SectionLabel num="06">Contato / Redes</SectionLabel>
          </div>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.85] tracking-tight">
            BORA <br /><span className="text-blue-bright text-glow">CONSTRUIR</span>
          </h2>
        </Reveal>
        <Reveal delay={150}>
          <p className="text-white/55 text-base md:text-lg max-w-md mx-auto mt-6 leading-relaxed">
            Acompanhe de perto a construção até o palco. Cada treino, cada evolução — registrada e ao vivo.
          </p>
        </Reveal>

        {/* Divider */}
        <Reveal delay={200}>
          <div className="flex items-center gap-4 max-w-xs mx-auto mt-10 mb-8">
            <span className="h-px flex-1 bg-white/[0.08]" />
            <span className="font-mono text-[9px] tracking-[0.35em] text-white/20 uppercase">Siga a jornada</span>
            <span className="h-px flex-1 bg-white/[0.08]" />
          </div>
        </Reveal>

        {/* Buttons — primary row + secondary row */}
        <Reveal delay={240}>
          <div className="flex flex-col items-center gap-3">
            {/* Primary */}
            <a href={S.links.linktree} target="_blank" rel="noopener noreferrer"
               className="group inline-flex items-center gap-3 font-cond tracking-wider uppercase text-xl md:text-2xl px-10 py-4 w-full sm:w-auto justify-center bg-blue text-white transition-all duration-300 hover:bg-blue-bright hover:shadow-[0_0_50px_rgba(58,120,255,0.65)]"
               style={{ boxShadow: "0 0 28px rgba(30,80,255,0.35), inset 0 1px 0 rgba(255,255,255,0.07)" }}>
              Todos os links
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-2">→</span>
            </a>
            {/* Secondary row */}
            <div className="flex flex-wrap justify-center gap-2">
              {/* Ícones compactos no mobile */}
              <a href={S.links.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                 className="inline-flex items-center gap-2 font-cond tracking-wider uppercase text-sm px-4 py-2.5 border border-white/15 text-white/60 hover:border-blue/50 hover:text-blue-bright transition-all duration-200">
                <IGIcon className="w-4 h-4" /><span className="hidden sm:inline">Instagram</span>
              </a>
              <a href={S.links.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok"
                 className="inline-flex items-center gap-2 font-cond tracking-wider uppercase text-sm px-4 py-2.5 border border-white/15 text-white/60 hover:border-blue/50 hover:text-blue-bright transition-all duration-200">
                <TikTokIcon className="w-4 h-4" /><span className="hidden sm:inline">TikTok</span>
              </a>
              <GlowButton href={S.links.hevy} variant="dark">Hevy →</GlowButton>
              <GlowButton href={S.links.parceiroLink} variant="dark" className="hidden sm:inline-flex">{S.links.parceiroNome}</GlowButton>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ── TREINOS NO HEVY ───────────────────────────────────────────────────────────

const HEVY_EXERCISES = [
  { num: "01", name: "Supino Reto",      sets: "4", reps: "8"  },
  { num: "02", name: "Supino Inclinado", sets: "3", reps: "10" },
  { num: "03", name: "Tríceps Corda",    sets: "4", reps: "12" },
];

export function TreinosHevy() {
  return (
    <section className="relative py-16 md:py-32 overflow-hidden border-y border-white/10">
      {/* Ambient glow — right side, behind the panel */}
      <div className="absolute inset-0 grid-lines opacity-25 pointer-events-none" />
      <div className="absolute -top-10 right-0 w-[60vw] h-[90%] max-w-[680px] rounded-full pointer-events-none"
           style={{ background: "radial-gradient(ellipse at top right, rgba(30,80,255,0.18) 0%, transparent 60%)" }} />
      <div className="absolute bottom-0 left-0 w-[40vw] h-[50%] max-w-[400px] rounded-full pointer-events-none"
           style={{ background: "radial-gradient(ellipse at bottom left, rgba(10,43,204,0.12) 0%, transparent 65%)" }} />

      <div className="relative max-w-7xl mx-auto px-5 md:px-8">
        <div className="grid lg:grid-cols-[1fr_1.05fr] gap-12 lg:gap-14 items-center">

          {/* ══ LEFT COL ══ */}
          <div className="flex flex-col">


            {/* Title block */}
            <Reveal delay={60}>
              <h2 className="font-display leading-none tracking-tight">
                <span className="block text-[9.5vw] sm:text-[7.5vw] lg:text-[4.8rem] text-white mb-1.5">TREINO</span>
                <span className="block text-[9.5vw] sm:text-[7.5vw] lg:text-[4.8rem] text-blue-bright text-glow mb-3">REGISTRADO.</span>
                <span className="block text-[9.5vw] sm:text-[7.5vw] lg:text-[4.8rem] text-white mb-4">EVOLUÇÃO</span>
                <span className="block text-[9.5vw] sm:text-[7.5vw] lg:text-[4.8rem] stroke-text-blue">COMPROVADA.</span>
              </h2>
            </Reveal>

            {/* Body text */}
            <Reveal delay={160}>
              <p className="text-white/55 text-base md:text-lg mt-8 max-w-[26rem] leading-relaxed">
                Não é só postar foto. É registrar o processo.{" "}
                Acompanhe meus treinos, cargas, séries e evolução diária pelo meu perfil público no Hevy.
              </p>
            </Reveal>

            {/* Primary CTA */}
            <Reveal delay={240}>
              <div className="mt-9 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <a href={S.links.hevy} target="_blank" rel="noopener noreferrer"
                   className="group inline-flex items-center gap-3.5 font-cond tracking-widest text-xl uppercase px-8 py-4 w-full sm:w-auto justify-center sm:justify-start text-white bg-blue transition-all duration-300 hover:bg-blue-bright hover:shadow-[0_0_50px_rgba(58,120,255,0.65)]"
                   style={{ boxShadow: "0 0 30px rgba(30,80,255,0.35), inset 0 1px 0 rgba(255,255,255,0.08)" }}>
                  Abrir perfil no Hevy
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-2">→</span>
                </a>
                <span className="font-mono text-[10px] tracking-widest text-white/25 uppercase hidden sm:block">
                  Perfil público
                </span>
              </div>
            </Reveal>

            {/* Sub-link */}
            <Reveal delay={300}>
              <p className="mt-4 font-mono text-[10px] tracking-widest text-white/20 uppercase">
                hevy.com/user/pietro_nagel
              </p>
            </Reveal>
          </div>

          {/* ══ RIGHT COL — logbook panel ══ */}
          <Reveal delay={120}>
            <div className="relative border border-blue/20 overflow-hidden"
                 style={{
                   background: "linear-gradient(165deg, #06091a 0%, #080d20 50%, #050810 100%)",
                   boxShadow: "0 0 0 1px rgba(58,120,255,0.06), 0 0 80px rgba(30,80,255,0.18), inset 0 0 60px rgba(30,80,255,0.04)",
                 }}>

              {/* ── Top accent line ── */}
              <div className="h-px w-full"
                   style={{ background: "linear-gradient(to right, transparent, rgba(58,120,255,0.7) 40%, rgba(58,120,255,0.7) 60%, transparent)" }} />

              {/* ── Header bar ── */}
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/[0.07]"
                   style={{ background: "rgba(30,80,255,0.06)" }}>
                <div className="flex items-center gap-3">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-blue-bright opacity-70"
                          style={{ animation: "flicker 2s infinite" }} />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-bright" />
                  </span>
                  <span className="font-mono text-[11px] tracking-[0.28em] text-white/80 uppercase">Hevy Logbook</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[9px] tracking-[0.25em] px-2 py-0.5 border border-blue/30 text-blue-bright uppercase"
                        style={{ background: "rgba(30,80,255,0.1)" }}>
                    Perfil público
                  </span>
                  <span className="font-mono text-[9px] tracking-widest text-white/20 uppercase hidden sm:block">ATIVO</span>
                </div>
              </div>

              {/* ── Session header ── */}
              <div className="px-5 pt-5 pb-4 border-b border-white/[0.07]">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-mono text-[10px] tracking-[0.3em] text-white/35 uppercase mb-1.5">Último treino</p>
                    <h3 className="font-display text-2xl md:text-3xl tracking-wide text-white leading-none">
                      PEITO + TRÍCEPS
                    </h3>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="font-mono text-[10px] tracking-widest text-blue-bright/60 uppercase">5 exerc.</p>
                    <p className="font-mono text-[10px] tracking-widest text-blue-bright/60 uppercase">18 séries</p>
                  </div>
                </div>
              </div>

              {/* ── Exercise rows ── */}
              <div className="px-5 py-1">
                {HEVY_EXERCISES.map((ex, i) => (
                  <div key={ex.num}
                       className={`flex items-center justify-between py-3 ${i < HEVY_EXERCISES.length - 1 ? "border-b border-white/[0.06]" : ""}`}>
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="font-mono text-[10px] text-blue-bright/50 shrink-0 w-6">{ex.num}</span>
                      <span className="font-mono text-xs md:text-sm text-white/65 uppercase tracking-wide truncate">{ex.name}</span>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0 ml-3">
                      <span className="font-display text-base text-white leading-none">{ex.sets}</span>
                      <span className="font-mono text-[10px] text-white/30">×</span>
                      <span className="font-display text-base text-white/70 leading-none">{ex.reps}</span>
                    </div>
                  </div>
                ))}

                {/* "more" row */}
                <a href={S.links.hevy} target="_blank" rel="noopener noreferrer"
                   className="group flex items-center justify-between py-3 border-t border-white/[0.06] transition-colors duration-200 hover:bg-blue/5 -mx-5 px-5">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[10px] text-white/20 w-6">···</span>
                    <span className="font-mono text-xs text-white/30 uppercase tracking-wide group-hover:text-blue-bright/70 transition-colors">ver treino completo</span>
                  </div>
                  <span className="font-mono text-[11px] text-white/20 group-hover:text-blue-bright transition-all duration-200 group-hover:translate-x-1 inline-block">→</span>
                </a>
              </div>

              {/* ── Metric strip ── */}
              <div className="grid grid-cols-3 border-t border-white/[0.07] mt-1">
                {[
                  { num: "365",  label: "DIAS / ANO",  blue: false },
                  { num: "5×",   label: "/ SEMANA",    blue: false },
                  { num: "2027", label: "PALCO",       blue: true  },
                ].map((m, i) => (
                  <div key={m.num}
                       className={`flex flex-col items-center justify-center py-5 gap-1.5 ${i < 2 ? "border-r border-white/[0.07]" : ""}`}>
                    <span className="font-display text-2xl md:text-3xl leading-none"
                          style={{ color: m.blue ? "#3a78ff" : "#fff",
                                   textShadow: m.blue ? "0 0 28px rgba(58,120,255,0.75)" : "none" }}>
                      {m.num}
                    </span>
                    <span className="font-mono text-[9px] tracking-[0.22em] text-white/25 uppercase">{m.label}</span>
                  </div>
                ))}
              </div>

              {/* ── Footer link ── */}
              <a href={S.links.hevy} target="_blank" rel="noopener noreferrer"
                 className="group flex items-center justify-between px-5 py-3.5 border-t border-white/[0.07] transition-all duration-[250ms] hover:bg-blue/[0.07]"
                 style={{ background: "rgba(30,80,255,0.03)" }}>
                <span className="font-mono text-[10px] tracking-[0.22em] text-white/30 uppercase">
                  hevy.com/user/pietro_nagel
                </span>
                <span className="font-mono text-[11px] text-blue-bright/50 group-hover:text-blue-bright transition-all duration-200 group-hover:translate-x-1 inline-block">→</span>
              </a>

              {/* ── Corner accents ── */}
              <div className="absolute top-0 right-0 w-7 h-7 border-r border-t border-blue/20 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-7 h-7 border-l border-b border-blue/20 pointer-events-none" />
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}

// ── FOOTER ────────────────────────────────────────────────────────────────────

export function Footer() {
  return (
    <footer className="bg-ink border-t border-white/10 overflow-hidden">
      {/* Top accent */}
      <div className="h-px w-full"
           style={{ background: "linear-gradient(to right, transparent, rgba(58,120,255,0.4) 40%, rgba(58,120,255,0.4) 60%, transparent)" }} />

      <div className="max-w-7xl mx-auto px-5 md:px-8 pt-14 pb-10">
        {/* Signature block */}
        <div className="flex flex-col lg:flex-row justify-between gap-10 lg:gap-16 items-start">

          <div className="flex-1 min-w-0">
            {/* Large athlete name */}
            <div className="leading-[0.88] tracking-tight mb-5">
              <div className="font-display text-5xl md:text-6xl text-white">PIETRO</div>
              <div className="font-display text-5xl md:text-6xl stroke-text-blue">NAGEL</div>
            </div>
            <p className="text-white/35 text-sm max-w-xs leading-relaxed">
              Atleta · Futuro fisiculturista.<br />Disciplina não tira folga.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col sm:flex-row gap-10 shrink-0">
            <div className="flex flex-col gap-4">
              <span className="font-mono text-[10px] tracking-[0.3em] text-white/25 uppercase">Redes sociais</span>
              <div className="flex flex-wrap gap-2">
                <a href={S.links.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                   className="p-2.5 border border-white/10 hover:border-blue/55 hover:text-blue-bright transition-all duration-200">
                  <IGIcon />
                </a>
                <a href={S.links.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok"
                   className="p-2.5 border border-white/10 hover:border-blue/55 hover:text-blue-bright transition-all duration-200">
                  <TikTokIcon />
                </a>
                <a href={S.links.linktree} target="_blank" rel="noopener noreferrer"
                   className="px-4 py-2.5 border border-white/10 font-mono tracking-widest text-xs uppercase text-white/60 hover:border-blue/55 hover:text-blue-bright transition-all duration-200">
                  Linktree
                </a>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <span className="font-mono text-[10px] tracking-[0.3em] text-white/25 uppercase">Parceria & treinos</span>
              <div className="flex flex-wrap gap-2">
                <a href={S.links.parceiroLink} target="_blank" rel="noopener noreferrer"
                   className="px-4 py-2.5 border border-white/10 font-mono tracking-widest text-xs uppercase text-white/60 hover:border-blue/55 hover:text-blue-bright transition-all duration-200">
                  {S.links.parceiroNome}
                </a>
                <a href={S.links.hevy} target="_blank" rel="noopener noreferrer"
                   className="px-4 py-2.5 border border-white/10 font-mono tracking-widest text-xs uppercase text-white/60 hover:border-blue/55 hover:text-blue-bright transition-all duration-200">
                  Hevy
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/[0.07] flex flex-col md:flex-row justify-between gap-2 font-mono text-[11px] text-white/20 uppercase tracking-[0.18em]">
          <span>© {new Date().getFullYear()} Pietro Nagel. Todos os direitos reservados.</span>
        </div>
      </div>
    </footer>
  );
}
