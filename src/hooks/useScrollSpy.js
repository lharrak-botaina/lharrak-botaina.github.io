import { useState, useEffect } from "react";

/**
 * Tracks which section id is currently in view based on scroll position.
 * @param {string[]} ids - Ordered list of section element ids to watch.
 * @returns {string} The currently active section id.
 */
export default function useScrollSpy(ids) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const handler = () => {
      const scrollY = window.scrollY + 120;
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el && el.offsetTop <= scrollY) {
          setActive(ids[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [ids]);

  return active;
}
