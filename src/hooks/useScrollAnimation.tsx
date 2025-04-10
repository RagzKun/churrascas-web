import { useEffect, useRef, useState } from "react";

interface ScrollAnimationOptions {
  threshold?: number;
  root?: Element | null;
  rootMargin?: string;
}

export function useScrollAnimation<T extends HTMLElement>(
  options: ScrollAnimationOptions = {}
) {
  const { threshold = 0.2, root = null, rootMargin = "0px" } = options;
  const elementRef = useRef<T>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Verificar si es móvil al montar
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting || isMobile) {
            entry.target.classList.add("is-visible");

            // Solo dejar de observar en desktop
            if (!isMobile) {
              observer.unobserve(entry.target);
            }
          } else if (!isMobile) {
            entry.target.classList.remove("is-visible");
          }
        });
      },
      {
        threshold: isMobile ? 0 : threshold, // Umbral más bajo para móvil
        root,
        rootMargin,
      }
    );

    const currentElement = elementRef.current;

    if (currentElement) {
      observer.observe(currentElement);

      // Forzar visibilidad inmediata en móvil
      if (isMobile) {
        currentElement.classList.add("is-visible");
      }
    }

    return () => {
      window.removeEventListener("resize", checkMobile);
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [threshold, root, rootMargin, isMobile]);

  return elementRef;
}
