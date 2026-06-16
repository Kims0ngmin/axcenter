import { useEffect, useRef } from 'react';
import { ExternalLink, BookOpen } from 'lucide-react';
import { useScrollReveal } from '@/lib/useScrollReveal';

export default function UsageGuide() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useScrollReveal(sectionRef);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const children = content.querySelectorAll('.animate-item');
            children.forEach((child, index) => {
              const el = child as HTMLElement;
              setTimeout(() => {
                el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
              }, index * 200);
            });
            observer.unobserve(content);
          }
        });
      },
      { threshold: 0.3 }
    );

    const children = content.querySelectorAll('.animate-item');
    children.forEach((child) => {
      const el = child as HTMLElement;
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
    });

    observer.observe(content);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative z-10 border-b border-slate-300 scroll-reveal">
      <div className="mx-auto max-w-7xl px-[5%] py-32">
        <div ref={contentRef} className="text-center">
          <span className="animate-item mb-4 inline-block rounded-full border border-slate-300 bg-slate-100 px-4 py-1.5 text-sm font-medium tracking-wide text-slate-600">
            사용 안내
          </span>

          <h2
            className="animate-item font-display mt-6 mb-6 text-slate-950"
            style={{ fontSize: 'clamp(32px, 4vw, 48px)' }}
          >
            GPU 사용을 위한 안내
          </h2>
          <img
            src="/images/pipeline.png"
            alt="신청 안내"
            className="mx-auto w-[680px] h-auto rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/40"
          />
          <p className="animate-item mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-slate-700">
            <br />
            GPU 클러스터 사용을 위해서는 사전 신청이 필요합니다.
            <br />
            아래 버튼을 통해 신청하거나 매뉴얼을 확인하세요.
          </p>


          <div className="animate-item flex flex-wrap justify-center gap-6">
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSd4ZC7ZoVUtMf0POaA1EQFocA3tN7k-IA84JTcl7ii2wg8X_A/viewform?usp=dialog"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 rounded-md bg-white px-8 py-4 text-base font-semibold text-slate-950 transition-all duration-300 hover:bg-slate-100 hover:shadow-lg hover:shadow-slate-200"
            >
              <ExternalLink className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
              사용 신청하기
            </a>
            <a
              href="https://drive.google.com/file/d/1wKHqq-gAP2Egn9Pc6ibqugcGVS8B67yU/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 rounded-md border border-slate-300 bg-transparent px-8 py-4 text-base font-semibold text-slate-950 transition-all duration-300 hover:bg-slate-100"
            >
              <BookOpen className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
              사용 매뉴얼
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
