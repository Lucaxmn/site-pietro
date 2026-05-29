import { Nav, Hero, PartnerStrip, Jornada, Evolucao, Galeria, Contato, Footer } from './sections';

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <PartnerStrip />
        <Jornada />
        <Evolucao />
        <Galeria />
        <Contato />
      </main>
      <Footer />
    </>
  );
}
