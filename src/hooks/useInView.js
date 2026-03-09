import { useState, useEffect, useRef } from "react";

/**
 * Returns a [ref, visible] tuple.
 * Once the element enters the viewport, visible flips to true and stays true.
 * @param {number} threshold - IntersectionObserver threshold (0–1).
 */
export default function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, visible];
}
