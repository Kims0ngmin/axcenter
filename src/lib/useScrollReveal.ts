import { useEffect, RefObject } from 'react';

export function useScrollReveal(ref: RefObject<HTMLElement | null>, options?: IntersectionObserverInit) {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add('scroll-reveal-visible');
        } else {
          element.classList.remove('scroll-reveal-visible');
        }
      },
      { threshold: 0.2, ...options }
    );

    element.classList.add('scroll-reveal');
    observer.observe(element);

    return () => observer.disconnect();
  }, [ref, options]);
}
