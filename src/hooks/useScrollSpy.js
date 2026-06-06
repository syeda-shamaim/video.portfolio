import { useState, useEffect } from 'react';

export function useScrollSpy(sectionIds, offset = 120) {
  const [active, setActive] = useState(sectionIds[0] ?? '');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + offset;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i].replace('#', '');
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollPos) {
          setActive(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds, offset]);

  return active;
}
