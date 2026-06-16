import { useEffect, useRef } from 'react';
import { useScrollReveal } from '@/lib/useScrollReveal';

interface SpecCardProps {
  title: string;
  specs: string;
  delay: number;
}

function SpecCard({ title, specs, delay }: SpecCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              card.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, delay);
            observer.unobserve(card);
          }
        });
      },
      { threshold: 0.2 }
    );

    card.style.opacity = '0';
    card.style.transform = 'translateY(40px)';
    observer.observe(card);

    return () => observer.disconnect();
  }, [delay]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const rotateX = ((e.clientY - centerY) / (rect.height / 2)) * -10;
    const rotateY = ((e.clientX - centerX) / (rect.width / 2)) * 10;

    card.style.transition = 'transform 0.1s ease-out';
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transition = 'transform 0.3s ease-out';
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex flex-col justify-between overflow-hidden rounded-lg p-10"
      style={{
        backgroundColor: '#eef7ff',
        minHeight: '260px',
        boxShadow: '0 20px 40px rgba(15, 23, 42, 0.08)',
      }}
    >
      <h3 className="font-display mb-6 text-3xl tracking-tight text-slate-950">{title}</h3>
      <p className="text-base leading-relaxed text-slate-700">{specs}</p>
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24"
        style={{
          background: 'linear-gradient(to top, rgba(14, 90, 184, 0.08), transparent)',
        }}
      />
    </div>
  );
}

export default function GPUSpecs() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useScrollReveal(sectionRef);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            header.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
            header.style.opacity = '1';
            header.style.transform = 'translateY(0)';
            observer.unobserve(header);
          }
        });
      },
      { threshold: 0.3 }
    );

    header.style.opacity = '0';
    header.style.transform = 'translateY(40px)';
    observer.observe(header);

    return () => observer.disconnect();
  }, []);

  const gpuData = [
    {
      title: 'NVIDIA DGX B200 × 8',
      specs: 'GPU 메모리 180GB HBM3e / 대역폭 8 TB/s',
    },
    {
      title: 'NVIDIA RTX Pro 6000 × 8',
      specs: 'GPU 메모리 96GB GDDR 7 / 대역폭 1.6 TB/s',
    },
    {
      title: 'NVIDIA RTX Pro 6000 × 8',
      specs: 'GPU 메모리 96GB G 7 / 대역폭 1.6 TB/s',
    },
  ];

  return (
    <section ref={sectionRef} className="relative z-10 border-b border-slate-300 scroll-reveal">
      <div className="mx-auto max-w-7xl px-[5%] py-32">
        <div ref={headerRef} className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full border border-slate-300 bg-slate-100 px-4 py-1.5 text-sm font-medium tracking-wide text-slate-600">
            GPU 사양
          </span>
          <h2
            className="font-display mt-6 mb-6 text-slate-950"
            style={{ fontSize: 'clamp(32px, 4vw, 48px)' }}
          >
            NVIDIA 초고성능 GPU 8대와 고성능 GPU 16대
          </h2>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-700">
            AI 연구와 딥러닝 학습에 최적화된 고성능 NVIDIA GPU 클러스터를 운영합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {gpuData.map((gpu, index) => (
            <SpecCard key={gpu.title} title={gpu.title} specs={gpu.specs} delay={index * 200} />
          ))}
        </div>
      </div>
    </section>
  );
}
