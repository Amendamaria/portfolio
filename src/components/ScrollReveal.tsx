"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    // Slight delay to allow DOM nodes to settle after pathname transition
    const timeout = setTimeout(() => {
      const revealElements = document.querySelectorAll(".reveal");

      if (revealElements.length === 0) return;

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.05,
        rootMargin: "0px 0px -20px 0px"
      });

      revealElements.forEach(el => {
        // Clear active state to re-trigger transition on route navigation
        el.classList.remove("active");
        observer.observe(el);
      });

      return () => {
        observer.disconnect();
      };
    }, 200);

    return () => clearTimeout(timeout);
  }, [pathname]);

  return null;
}
