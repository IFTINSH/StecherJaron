import BackgroundShader from '@/components/BackgroundShader';
import SmoothScroll from '@/components/SmoothScroll';
import LoadingProvider from '@/components/LoadingProvider';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import IntroVideo from '@/components/IntroVideo';
import Gallery from '@/components/Gallery';
import Studio from '@/components/Studio';
import Wannados from '@/components/Wannados';
import Events from '@/components/Events';
import Contact from '@/components/Contact';
import HowToBook from '@/components/HowToBook';
import Footer from '@/components/Footer';
import { getAbout, getTattoos, getEvents, getHowToBook, getStudioImages, getWannados } from '@/lib/data';

export const revalidate = 60;

export default async function Home() {
  const [about, tattoos, events, howToBook, studioImages, wannados] = await Promise.all([
    getAbout(),
    getTattoos(),
    getEvents(),
    getHowToBook(),
    getStudioImages(),
    getWannados(),
  ]);

  return (
    <>
      <BackgroundShader />
      <SmoothScroll />
      <LoadingProvider>
        <Header />
        <main className="relative">
          <Hero />
          <About title={about.title} body={about.body} />
          <IntroVideo />
          <Gallery tattoos={tattoos} />
          <Wannados items={wannados} />
          <Studio images={studioImages} />
          <Events events={events} />
          <Contact howToBook={howToBook} />
        </main>
        <Footer />
        <HowToBook data={howToBook} />
      </LoadingProvider>
    </>
  );
}
