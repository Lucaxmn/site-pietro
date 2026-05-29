import { useState, useEffect, useRef } from 'react';
import { S } from './data';
import { Reveal, Counter, IGIcon, TikTokIcon, GlowButton, SectionLabel, ImageSlot } from './ui';
import { initDumbbell } from './dumbbell3d';

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
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

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

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onS = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onS, { passive: true });
    return () => window.removeEventListener("scroll", onS);
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
      <div className={`transition-all duration-300 ${scrolled ? "bg-ink/85 backdrop-blur-md border-b border-white/10" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-5 md:px-8 h-20 flex items-center justify-between">
          <a href="#top" className="group flex items-center font-display text-3xl md:text-4xl tracking-wide leading-none">
            <span className="text-white group-hover:text-blue-bright transition-colors">PIETRO NAGEL</span>
          </a>
          <nav className="hidden lg:flex items-center gap-10">
            {items.map(([t, h]) => (
              <a key={h} href={h} className="font-cond tracking-widest text-lg uppercase text-white/75 hover:text-blue-bright transition-colors py-2">{t}</a>
            ))}
          </nav>
          <div className="hidden md:flex items-center gap-2.5">
            <a href={S.links.parceiroLink} target="_blank" rel="noopener noreferrer"
               className="font-cond tracking-widest text-sm uppercase px-4 py-2.5 border border-white/15 hover:border-blue hover:text-blue-bright transition-colors">
              {S.links.parceiroNome}
            </a>
            <a href={S.links.linktree} target="_blank" rel="noopener noreferrer"
               className="font-cond tracking-widest text-sm uppercase px-4 py-2.5 bg-blue hover:bg-blue-bright transition-colors hover:shadow-[0_0_25px_rgba(58,120,255,0.6)]">
              Linktree
            </a>
            <a href={S.links.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"
               className="p-2.5 text-white/75 hover:text-blue-bright transition-colors"><IGIcon className="w-6 h-6" /></a>
            <a href={S.links.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok"
               className="p-2.5 text-white/75 hover:text-blue-bright transition-colors"><TikTokIcon className="w-6 h-6" /></a>
          </div>
          <button className="lg:hidden p-2 -mr-2" onClick={() => setOpen(!open)} aria-label="Menu">
            <div className="space-y-1.5">
              <span className={`block h-0.5 w-6 bg-white transition-transform ${open ? "translate-y-2 rotate-45" : ""}`}></span>
              <span className={`block h-0.5 w-6 bg-white transition-opacity ${open ? "opacity-0" : ""}`}></span>
              <span className={`block h-0.5 w-6 bg-white transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`}></span>
            </div>
          </button>
        </div>
        {open && (
          <div className="lg:hidden bg-ink border-t border-white/10 px-5 py-6">
            <div className="flex flex-col">
              {items.map(([t, h]) => (
                <a key={h} href={h} onClick={() => setOpen(false)}
                   className="font-cond tracking-widest text-2xl uppercase py-3.5 text-white/85 hover:text-blue-bright border-b border-white/5">{t}</a>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              <GlowButton href={S.links.linktree} variant="solid" className="justify-center">Linktree</GlowButton>
              <GlowButton href={S.links.parceiroLink} variant="dark" className="justify-center">{S.links.parceiroNome}</GlowButton>
              <GlowButton href={S.links.instagram} variant="ghost" icon={<IGIcon />} className="justify-center">Instagram</GlowButton>
              <GlowButton href={S.links.tiktok} variant="ghost" icon={<TikTokIcon />} className="justify-center">TikTok</GlowButton>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export function Hero() {
  const canvasRef = useRef(null);
  useEffect(() => {
    if (!canvasRef.current) return;
    const inst = initDumbbell(canvasRef.current);
    return () => inst && inst.destroy && inst.destroy();
  }, []);
  const fraseLinhas = S.atleta.fraseHero.split("\n");
  return (
    <section id="top" className="relative min-h-[100svh] flex items-center overflow-hidden">
      <div className="absolute top-1/3 -right-20 w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] rounded-full pointer-events-none"
           style={{ background: "radial-gradient(circle, rgba(30,80,255,0.35) 0%, rgba(30,80,255,0) 65%)" }}></div>
      <div className="absolute -bottom-32 -left-32 w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full pointer-events-none"
           style={{ background: "radial-gradient(circle, rgba(10,43,204,0.25) 0%, rgba(10,43,204,0) 65%)" }}></div>
      <div className="absolute inset-0 grid-lines opacity-60"></div>
      <div className="absolute inset-0 z-0">
        <canvas ref={canvasRef} className="w-full h-full"></canvas>
      </div>
      <div className="absolute inset-0 z-[1] pointer-events-none"
           style={{ background: "linear-gradient(100deg, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.72) 38%, rgba(10,10,10,0.15) 62%, rgba(10,10,10,0) 80%)" }}></div>
      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 w-full pointer-events-none">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-5 pointer-events-auto">
            <span className="font-mono text-[11px] tracking-widest text-blue-bright uppercase px-2 py-1 border border-blue/40">EST. 2023</span>
            <span className="font-cond tracking-[0.2em] text-white/60 text-sm uppercase">{S.atleta.tagline}</span>
          </div>
          <h1 className="font-display leading-[0.92] tracking-tight">
            {fraseLinhas.map((l, i) => {
              const last = i === fraseLinhas.length - 1;
              const mt = i === 1 ? "mt-6 md:mt-8" : last ? "mt-3 md:mt-4" : "";
              return (
                <span key={i} className={`block text-[14vw] md:text-[7.5rem] xl:text-[9rem] ${last ? "text-blue-bright text-glow" : "text-white"} ${mt}`}>
                  {l}
                </span>
              );
            })}
          </h1>
          <p className="mt-6 text-white/65 max-w-md text-base md:text-lg leading-relaxed">
            PIETRO NAGEL — 15 anos. Treinando desde os 11. Construindo físico, mentalidade e futuro, um treino por vez.
          </p>
          <div className="mt-7 inline-flex items-center gap-3 pointer-events-auto border-l-2 border-blue pl-4">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-blue-bright opacity-75" style={{ animation: "flicker 1.6s infinite" }}></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-bright"></span>
            </span>
            <p className="font-cond tracking-wide text-xl md:text-2xl uppercase text-white leading-tight">
              Acompanhe a preparação para o <span className="text-blue-bright text-glow">Muscle Contest 2027</span>
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3 pointer-events-auto">
            <GlowButton href={S.links.linktree} variant="solid">Todos os links</GlowButton>
            <GlowButton href={S.links.instagram} variant="ghost" icon={<IGIcon />}>Instagram</GlowButton>
            <GlowButton href={S.links.tiktok} variant="ghost" icon={<TikTokIcon />}>TikTok</GlowButton>
          </div>
        </div>
      </div>
    </section>
  );
}

export function PartnerStrip() {
  return (
    <section className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0A0A0A 0%, #0d1a3a 50%, #0A0A0A 100%)" }}>
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "linear-gradient(to right, transparent 0%, rgba(30,80,255,0.07) 50%, transparent 100%)",
      }} />
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(58,120,255,0.6), transparent)" }} />
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(58,120,255,0.6), transparent)" }} />

      <div className="max-w-7xl mx-auto px-5 md:px-10 py-14 md:py-20 flex flex-col lg:flex-row items-center justify-between gap-12">

        {/* imagem da marca */}
        <div className="w-full lg:w-[38%] shrink-0">
          <div className="relative overflow-hidden aspect-[4/3]" style={{ boxShadow: "0 0 50px rgba(30,80,255,0.25)" }}>
            <img
              src="/assets/montelest.jpeg"
              alt="Monte Leste"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(10,10,10,0) 60%, rgba(13,26,58,0.4) 100%)" }} />
          </div>
        </div>

        {/* info + CTA */}
        <div className="flex flex-col items-center lg:items-start gap-5 text-center lg:text-left flex-1">
          <div className="flex items-center gap-2">
            <span className="inline-block w-6 h-px bg-blue" />
            <span className="font-mono text-[11px] tracking-[0.25em] text-blue-bright uppercase">Parceria oficial</span>
          </div>

          <h2 className="font-display text-6xl md:text-8xl text-white tracking-tight" style={{ textShadow: "0 0 40px rgba(58,120,255,0.35)" }}>
            {S.links.parceiroNome}
          </h2>

          <p className="font-sans text-white/60 text-sm md:text-base max-w-md leading-relaxed">
            A Monte Leste oferece roupas com estilo urbano, qualidade e personalidade para quem busca se destacar. E o melhor: usando o cupom <span className="text-white font-semibold">"NAGEL"</span> você garante 12% de desconto em sua compra e ainda me ajuda demais a continuar esse trabalho. 🔥👊
          </p>

          {/* cupom destaque */}
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
              <div className="font-mono text-[10px] tracking-widest uppercase mb-1" style={{ color: "rgba(255,150,80,0.7)" }}>Cupom exclusivo</div>
              <div className="font-display text-3xl tracking-wider" style={{ color: "#ff7a00", textShadow: "0 0 20px rgba(255,100,0,0.7)" }}>NAGEL</div>
            </div>
            <div className="w-px self-stretch" style={{ background: "rgba(255,120,0,0.25)" }} />
            <div>
              <div className="font-display text-4xl text-white">12%</div>
              <div className="font-mono text-[10px] tracking-widest uppercase" style={{ color: "rgba(255,150,80,0.7)" }}>de desconto</div>
            </div>
          </div>

          <div className="flex flex-col items-center lg:items-start gap-2">
            <a
              href={S.links.parceiroLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative font-cond tracking-widest text-xl uppercase px-12 py-5 bg-blue text-white transition-all duration-300 hover:bg-blue-bright"
              style={{ boxShadow: "0 0 40px rgba(30,80,255,0.45), inset 0 1px 0 rgba(255,255,255,0.1)" }}
            >
              <span className="relative z-10 flex items-center gap-3">
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

export function Jornada() {
  return (
    <section id="jornada" className="relative py-24 md:py-36">
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
                <p className="text-white/70 text-lg leading-relaxed">{p}</p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={400}>
            <div className="mt-10 flex flex-wrap gap-3">
              {[["ALTURA", S.atleta.altura], ["PESO", S.atleta.peso], ["IDADE", S.atleta.idade + " anos"]].map(([k, v]) => (
                <div key={k} className="clip-tag bg-panel border border-white/10 px-5 py-3">
                  <div className="font-mono text-[10px] tracking-widest text-white/40">{k}</div>
                  <div className="font-display text-2xl text-white">{v}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
        <div className="lg:col-span-5 relative">
          <Reveal delay={150} className="relative">
            <ImageSlot label="RETRATO" src={S.retrato} ratio="aspect-[4/5]" className="box-glow" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function Evolucao() {
  return (
    <section id="evolucao" className="relative py-24 md:py-36 bg-panel2 border-y border-white/10">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <Reveal><SectionLabel num="02">Transformação</SectionLabel></Reveal>
        <Reveal delay={80}>
          <h2 className="font-display text-5xl md:text-7xl leading-[0.9] tracking-tight mb-14">
            A <span className="stroke-text-blue">EVOLUÇÃO</span>
          </h2>
        </Reveal>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {S.timeline.map((t, i) => (
            <Reveal key={i} delay={i * 120}>
              <div className="group">
                <div className="relative">
                  <ImageSlot label={t.titulo} src={t.src} ratio="aspect-[3/4]" position={t.pos || "center"}
                             className="transition-transform duration-500 group-hover:scale-[1.02] group-hover:box-glow" />
                  <span className="absolute top-3 left-3 font-display text-3xl text-blue-bright text-glow">{t.ano}</span>
                </div>
                <h3 className="font-display text-2xl mt-4 tracking-wide">{t.titulo}</h3>
                <p className="text-white/55 mt-1">{t.texto}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

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
            <p className="text-white/50 max-w-sm md:text-right">Divisão de 5 dias. Volume alto, foco em construção. Toque num dia pra ver os exercícios.</p>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div className="flex flex-wrap gap-2 mb-8">
            {S.split.map((d, i) => (
              <button key={i} onClick={() => setActive(i)}
                className={`font-display text-2xl md:text-3xl w-14 h-14 md:w-16 md:h-16 flex items-center justify-center border transition-all duration-300
                  ${active === i ? "bg-blue border-blue text-white shadow-[0_0_30px_rgba(58,120,255,0.6)]" : "border-white/15 text-white/50 hover:border-blue hover:text-white"}`}>
                {d.dia}
              </button>
            ))}
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

export function Numeros() {
  return (
    <section id="numeros" className="relative py-24 md:py-36 bg-panel2 border-y border-white/10 overflow-hidden">
      <div className="absolute inset-0 grid-lines opacity-50"></div>
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

export function Galeria() {
  return (
    <section id="galeria" className="relative py-24 md:py-36">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <Reveal><SectionLabel num="05">Galeria</SectionLabel></Reveal>
        <Reveal delay={80}>
          <h2 className="font-display text-5xl md:text-7xl leading-[0.9] tracking-tight mb-12">
            O <span className="text-blue-bright text-glow">TRABALHO</span>
          </h2>
        </Reveal>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
          {S.galeria.map((g, i) => (
            <Reveal key={i} delay={(i % 3) * 100}>
              <div className="group">
                <ImageSlot label={g.label} src={g.src}
                           ratio="aspect-[3/4]"
                           className="transition-all duration-500 group-hover:box-glow" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Contato() {
  return (
    <section id="contato" className="relative py-24 md:py-36 bg-panel2 border-t border-white/10 overflow-hidden">
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] rounded-full pointer-events-none"
           style={{ background: "radial-gradient(circle, rgba(30,80,255,0.22) 0%, rgba(30,80,255,0) 65%)" }}></div>
      <div className="relative max-w-5xl mx-auto px-5 md:px-8 text-center">
        <Reveal><div className="flex justify-center"><SectionLabel num="06">Contato / Redes</SectionLabel></div></Reveal>
        <Reveal delay={80}>
          <h2 className="font-display text-6xl md:text-8xl lg:text-9xl leading-[0.85] tracking-tight">
            BORA <br /><span className="text-blue-bright text-glow">CONSTRUIR</span>
          </h2>
        </Reveal>
        <Reveal delay={160}>
          <p className="text-white/60 text-lg max-w-xl mx-auto mt-6">
            Acompanhe a jornada de perto, mande sua mensagem e veja o conteúdo diário. Tudo num lugar só.
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
              <a href={S.links.instagram} target="_blank" rel="noopener noreferrer" className="p-2.5 border border-white/15 hover:border-blue hover:text-blue-bright transition-colors" aria-label="Instagram"><IGIcon /></a>
              <a href={S.links.tiktok} target="_blank" rel="noopener noreferrer" className="p-2.5 border border-white/15 hover:border-blue hover:text-blue-bright transition-colors" aria-label="TikTok"><TikTokIcon /></a>
              <a href={S.links.linktree} target="_blank" rel="noopener noreferrer" className="px-4 py-2.5 border border-white/15 font-cond tracking-widest text-sm uppercase hover:border-blue hover:text-blue-bright transition-colors">Linktree</a>
              <a href={S.links.parceiroLink} target="_blank" rel="noopener noreferrer" className="px-4 py-2.5 border border-white/15 font-cond tracking-widest text-sm uppercase hover:border-blue hover:text-blue-bright transition-colors">{S.links.parceiroNome}</a>
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
