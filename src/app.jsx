import { Nav, Hero, PartnerStrip, Jornada, Evolucao, TreinosHevy, Galeria, Contato, Footer } from './sections';

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <PartnerStrip />
        <Jornada />
        <Evolucao />
        <TreinosHevy />
        <Galeria />
        <Contato />
      </main>
      <Footer />
    </>
  );
}
