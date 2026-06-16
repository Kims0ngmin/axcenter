import { useEffect, useRef } from 'react';
import { useScrollReveal } from '@/lib/useScrollReveal';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useScrollReveal(sectionRef);

  useEffect(() => {
    const left = leftRef.current;
    const right = rightRef.current;
    if (!left || !right) return;

    // Initial animation on load
    left.style.opacity = '0';
    left.style.transform = 'translateX(-50px)';
    right.style.opacity = '0';
    right.style.transform = 'translateX(50px)';

    requestAnimationFrame(() => {
      left.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
      right.style.transition = 'opacity 1s ease-out, transform 1s ease-out';

      left.style.opacity = '1';
      left.style.transform = 'translateX(0)';
      right.style.opacity = '1';
      right.style.transform = 'translateX(0)';
    });
  }, []);

  return (
    <section ref={sectionRef} className="relative z-10 border-b border-slate-300 scroll-reveal">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col items-center px-[5%] py-40 lg:flex-row">
        {/* Left: Text Content */}
        <div ref={leftRef} className="flex w-full flex-col justify-center lg:w-[60%]">
          <p className="mb-4 text-lg tracking-wide text-slate-700">
            Handong Global University AI Accelerator Center
          </p>
          <h1
            className="font-display mb-8 leading-[1.15] tracking-tight text-slate-950"
            style={{
              fontSize: 'clamp(36px, 5vw, 70px)',
              letterSpacing: '-1.4px',
              lineHeight: '1.15',
            }}
          >
            한동대학교
            <br />
            AI 혁신 센터
          </h1>
          <p className="mb-10 text-lg leading-relaxed text-slate-700">
            차세대 AI 연구와 고성능 컴퓨팅을 위한 최첨단 GPU 클러스터를 소개합니다.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSd4ZC7ZoVUtMf0POaA1EQFocA3tN7k-IA84JTcl7ii2wg8X_A/viewform?usp=dialog"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md bg-white px-8 py-4 text-base font-semibold text-slate-950 transition-all duration-300 hover:bg-slate-100 hover:shadow-lg hover:shadow-slate-200"
            >
              사용 신청하기
            </a>
            <a
              href="https://drive.google.com/file/d/1wKHqq-gAP2Egn9Pc6ibqugcGVS8B67yU/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md border border-slate-300 bg-transparent px-8 py-4 text-base font-semibold text-slate-950 transition-all duration-300 hover:bg-slate-100"
            >
              사용 매뉴얼
            </a>
          </div>
        </div>

        {/* Right: Image */}
        <div ref={rightRef} className="mt-16 flex w-full items-center justify-center lg:mt-0 lg:w-[40%] lg:justify-end lg:pr-16">
          <div className="relative w-full max-w-xl overflow-visible" style={{ borderRadius: '0 0 0 9999px' }}>
            <img
              src="/axcenter/public/images/axc_logo.png"
              alt="AI 혁신 센터 로고"
              className="h-auto w-full object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
