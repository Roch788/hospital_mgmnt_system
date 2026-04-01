import { useEffect, useRef, useState } from 'react';

export function useInView(ref, { once = false, margin = '0px' } = {}) {
  const [inView, setInView] = useState(false);
  const triggered = useRef(false);

  useEffect(() => {
    const el = ref?.current;
    if (!el) return;
    if (once && triggered.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) {
            triggered.current = true;
            observer.disconnect();
          }
        } else if (!once) {
          setInView(false);
        }
      },
      { rootMargin: margin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, once, margin]);

  return inView;
}
