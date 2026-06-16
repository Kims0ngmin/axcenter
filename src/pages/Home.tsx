import ParallaxBackground from '../sections/ParallaxBackground';
import Hero from '../sections/Hero';
import GPUSpecs from '../sections/GPUSpecs';
import Cluster from '../sections/Cluster';
import UsageGuide from '../sections/UsageGuide';
import Footer from '../sections/Footer';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background text-slate-950">
      <ParallaxBackground />
      <Hero />
      <GPUSpecs />
      <Cluster />
      <UsageGuide />
      <Footer />
    </main>
  );
}
