# Pietro Nagel — Site Pessoal

Site de marca pessoal do atleta Pietro Nagel, futuro fisiculturista com foco no **Muscle Contest 2027**.

## Stack

- **React 18** + **Vite**
- **Tailwind CSS 3** com tema customizado
- **Fontes:** Anton (display), Bebas Neue (condensed), Archivo (corpo)
- Deploy estático — qualquer host que sirva HTML funciona (Vercel, Netlify, GitHub Pages)

## Rodar localmente

```bash
npm install
npm run dev
```

Acesse `http://localhost:5173`.

## Build para produção

```bash
npm run build
```

Os arquivos ficam em `dist/`. Para visualizar o build localmente:

```bash
npm run preview
```

## Antes de publicar

1. **Domínio** — em [index.html](index.html), substituir `pietronagel.com` pelo domínio real (4 ocorrências: `og:url`, `og:image`, `twitter:image`, `canonical`).
2. **Sitemap** — atualizar a URL em [public/sitemap.xml](public/sitemap.xml).
3. **og:image** — o arquivo `public/assets/og-image.jpg` já existe (1200×630). Substituir pela imagem definitiva se quiser.

## Estrutura

```
src/
  app.jsx        — raiz da aplicação
  sections.jsx   — todas as seções (Nav, Hero, Jornada, Evolução, Galeria, Contato, Footer)
  data.js        — textos, links, stats e lista de fotos
  ui.jsx         — componentes reutilizáveis (Reveal, Counter, GlowButton…)
  index.css      — estilos globais, animações, prefers-reduced-motion

public/
  assets/        — imagens (WebP, ~1 MB total)
  favicon.svg
  robots.txt
  sitemap.xml
```

## Parceiro

[Monte Leste](https://www.monteleste.com.br) — cupom **NAGEL**.
