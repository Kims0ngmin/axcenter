import { useEffect, useRef } from 'react';
import { useScrollReveal } from '@/lib/useScrollReveal';

export default function Cluster() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  useScrollReveal(sectionRef);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    // Header animation
    if (headerRef.current) {
      const header = headerRef.current;
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
      observers.push(observer);
    }

    // Image animation
    if (imageRef.current) {
      const image = imageRef.current;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              image.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
              image.style.opacity = '1';
              image.style.transform = 'scale(1)';
              observer.unobserve(image);
            }
          });
        },
        { threshold: 0.2 }
      );
      image.style.opacity = '0';
      image.style.transform = 'scale(0.9)';
      observer.observe(image);
      observers.push(observer);
    }

    // Features animation
    if (featuresRef.current) {
      const features = featuresRef.current;
      const items = features.querySelectorAll('.feature-item');
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              items.forEach((item, index) => {
                const el = item as HTMLElement;
                setTimeout(() => {
                  el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
                  el.style.opacity = '1';
                  el.style.transform = 'translateX(0)';
                }, index * 150);
              });
              observer.unobserve(features);
            }
          });
        },
        { threshold: 0.2 }
      );
      items.forEach((item, index) => {
        const el = item as HTMLElement;
        const initialDirection = index % 2 === 0 ? -50 : 50;
        el.style.opacity = '0';
        el.style.transform = `translateX(${initialDirection}px)`;
      });
      observer.observe(features);
      observers.push(observer);
    }

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const features = [
    '각 GPU가 서로 연결',
    'NVLink를 통한 고속 통신',
    '상용 GPU 클라우드 서비스 대비 60% 가격',
    '신청 절차 간소화',
  ];

  return (
    <section ref={sectionRef} className="relative z-10 border-b border-slate-300 scroll-reveal">
      <div className="mx-auto max-w-7xl px-[5%] py-32">
        <div ref={headerRef} className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full border border-slate-300 bg-slate-100 px-4 py-1.5 text-sm font-medium tracking-wide text-slate-600">
            대학 내 유일한 GPU 클러스터
          </span>
          <h2
            className="font-display mt-6 mb-6 text-slate-950"
            style={{ fontSize: 'clamp(32px, 4vw, 48px)' }}
          >
            한동대학교
            <br />
            GPU Cluster
          </h2>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-700">
            8대의 GPU가 NVLink로 연결되어 대규모 병렬 연산이 가능합니다.
          </p>
        </div>

        <div
          ref={imageRef}
          className="mx-auto mb-16 overflow-hidden rounded-lg"
          style={{ maxWidth: '900px' }}
        >
          <img
            src="/images/cluster.png"
            alt="GPU 클러스터 서버 랙"
            className="h-auto w-full object-cover"
          />
        </div>

        <div ref={featuresRef} className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-item flex items-center justify-center rounded-lg border border-slate-200 bg-slate-100 p-6 text-center"
            >
              <span className="text-base font-medium leading-relaxed text-slate-800">
                {feature}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
