"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const outlineRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Disable standard cursor on desktop, check mobile status
    if (window.matchMedia("(max-width: 768px)").matches) {
      setIsVisible(false);
      return;
    }
    
    setIsVisible(true);

    let mouseX = 0;
    let mouseY = 0;
    let outlineX = 0;
    let outlineY = 0;
    let reqId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (dotRef.current) {
        dotRef.current.style.left = `${mouseX}px`;
        dotRef.current.style.top = `${mouseY}px`;
      }

      // Smooth floating background flare parallax
      const normX = (e.clientX / window.innerWidth) - 0.5;
      const normY = (e.clientY / window.innerHeight) - 0.5;
      document.body.style.setProperty("--flare-x", `${normX * 45}px`);
      document.body.style.setProperty("--flare-y", `${normY * 45}px`);
    };

    const animateOutline = () => {
      const ease = 0.12;
      outlineX += (mouseX - outlineX) * ease;
      outlineY += (mouseY - outlineY) * ease;

      if (outlineRef.current) {
        outlineRef.current.style.left = `${outlineX}px`;
        outlineRef.current.style.top = `${outlineY}px`;
      }

      reqId = requestAnimationFrame(animateOutline);
    };

    window.addEventListener("mousemove", onMouseMove);
    reqId = requestAnimationFrame(animateOutline);

    // Dynamic hover bindings using MutationObserver
    const updateCursorHover = () => {
      const interactives = document.querySelectorAll("a, button, .work-item, .cs-card, .theme-toggle");

      interactives.forEach(el => {
        const htmlEl = el as HTMLElement;
        if (htmlEl.dataset.cursorBound) return;
        htmlEl.dataset.cursorBound = "true";

        htmlEl.addEventListener("mouseenter", () => {
          dotRef.current?.classList.add("cursor-hover");
          outlineRef.current?.classList.add("cursor-hover");
        });

        htmlEl.addEventListener("mouseleave", () => {
          dotRef.current?.classList.remove("cursor-hover");
          outlineRef.current?.classList.remove("cursor-hover");
        });
      });
    };

    // Run once initially
    updateCursorHover();

    const observer = new MutationObserver(updateCursorHover);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(reqId);
      observer.disconnect();
    };
  }, [pathname]);

  if (!isVisible) return null;

  return (
    <>
      <div ref={dotRef} className="custom-cursor-dot" />
      <div ref={outlineRef} className="custom-cursor-outline" />
    </>
  );
}
