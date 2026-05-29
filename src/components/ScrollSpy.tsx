"use client";

import { useEffect } from "react";

export default function ScrollSpy() {
  useEffect(() => {
    // Add small delay to let DOM nodes render fully
    const timeout = setTimeout(() => {
      const sections = document.querySelectorAll(".cs-content-section");
      const tocLinks = document.querySelectorAll(".cs-detail-toc a");

      if (sections.length === 0 || tocLinks.length === 0) return;

      const handleScrollSpy = () => {
        let currentId = "";
        const scrollPosition = window.scrollY + 150; // nav header offset

        sections.forEach(section => {
          const top = (section as HTMLElement).offsetTop;
          const height = (section as HTMLElement).offsetHeight;

          if (scrollPosition >= top && scrollPosition < top + height) {
            currentId = section.getAttribute("id") || "";
          }
        });

        tocLinks.forEach(link => {
          link.classList.remove("active");
          const href = link.getAttribute("href");
          if (href && href === `#${currentId}`) {
            link.classList.add("active");
          }
        });
      };

      window.addEventListener("scroll", handleScrollSpy);
      handleScrollSpy();

      return () => {
        window.removeEventListener("scroll", handleScrollSpy);
      };
    }, 300);

    return () => clearTimeout(timeout);
  }, []);

  return null;
}
