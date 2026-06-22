import BackgroundShader from '@/components/BackgroundShader';
import SmoothScroll from '@/components/SmoothScroll';
import LoadingProvider from '@/components/LoadingProvider';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import IntroVideo from '@/components/IntroVideo';
import Gallery from '@/components/Gallery';
import Studio from '@/components/Studio';
import Events from '@/components/Events';
import Contact from '@/components/Contact';
import HowToBook from '@/components/HowToBook';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <BackgroundShader />
      <SmoothScroll />
      <LoadingProvider>
        <Header />
        <main className="relative">
          <Hero />
          <About />
          <IntroVideo />
          <Gallery />
          <Studio />
          <Events />
          <Contact />
        </main>
        <Footer />
        <HowToBook />
      </LoadingProvider>
    </>
  );
}
