"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Handle header glassmorphic background transition on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Theme and Season management (matches original script.js logic)
  useEffect(() => {
    // 1. Theme setup
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    const initialTheme = savedTheme || systemTheme;
    
    setTheme(initialTheme);
    applyTheme(initialTheme);

    // 2. Season setup
    const getSystemSeason = () => {
      const month = new Date().getMonth();
      if (month === 10 || month === 11 || month === 0 || month === 1) return "winter";
      if (month === 2 || month === 3) return "spring";
      if (month === 4 || month === 5) return "summer";
      return "monsoon";
    };
    const season = getSystemSeason();
    document.documentElement.classList.remove("season-winter", "season-spring", "season-summer", "season-monsoon");
    document.body.classList.remove("season-winter", "season-spring", "season-summer", "season-monsoon");
    document.documentElement.classList.add(`season-${season}`);
    document.body.classList.add(`season-${season}`);
  }, []);

  const applyTheme = (newTheme: "light" | "dark") => {
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
      document.body.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.body.classList.remove("dark");
    }
    
    // Rebuild particles to match the new theme if weather canvas is active
    if (typeof (window as any).triggerSeasonParticlesRebuild === "function") {
      const getSystemSeason = () => {
        const month = new Date().getMonth();
        if (month === 10 || month === 11 || month === 0 || month === 1) return "winter";
        if (month === 2 || month === 3) return "spring";
        if (month === 4 || month === 5) return "summer";
        return "monsoon";
      };
      (window as any).triggerSeasonParticlesRebuild(getSystemSeason());
    }
  };

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    applyTheme(nextTheme);
  };

  // Close mobile drawer when route changes or a link is clicked
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  const isHome = pathname === "/";

  // Helper to get correct href for homepage sections
  const getSectionHref = (sectionId: string) => {
    return isHome ? `#${sectionId}` : `/#${sectionId}`;
  };

  return (
    <header className={`${isScrolled ? "scrolled" : ""} ${isMenuOpen ? "menu-open" : ""}`}>
      <div className="container">
        <div className="topbar">
          <div className="topbar-inner">
            <Link href={isHome ? "#hero" : "/#hero"} className="topbar-name" onClick={handleLinkClick}>
              AMJ
            </Link>

            <nav>
              <ul className={`topbar-nav ${isMenuOpen ? "open" : ""}`} id="topbar-nav">
                <li>
                  <Link 
                    href={getSectionHref("about")} 
                    onClick={handleLinkClick}
                    className={pathname === "/" ? "" : ""}
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link 
                    href={getSectionHref("work")} 
                    onClick={handleLinkClick}
                  >
                    Work
                  </Link>
                </li>
                <li>
                  <Link 
                    href={getSectionHref("skills")} 
                    onClick={handleLinkClick}
                  >
                    Skills
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/case-studies" 
                    onClick={handleLinkClick}
                    className={pathname.startsWith("/case-studies") ? "nav-active" : ""}
                  >
                    Case Studies
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/contact" 
                    onClick={handleLinkClick}
                    className={pathname === "/contact" ? "nav-active" : ""}
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>

            <div className="topbar-controls">
              <button 
                id="theme-toggle" 
                className="theme-toggle" 
                aria-label="Toggle theme"
                onClick={toggleTheme}
              >
                {theme === "light" ? (
                  /* Moon Icon */
                  <svg id="icon-moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
                    <path fill="currentColor" d="M21 12.8A9 9 0 1111.2 3 7 7 0 0021 12.8z" />
                  </svg>
                ) : (
                  /* Sun Icon */
                  <svg id="icon-sun" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
                    <circle cx="12" cy="12" r="5" fill="currentColor" />
                    <g stroke="currentColor" strokeWidth="2">
                      <line x1="12" y1="1" x2="12" y2="4" />
                      <line x1="12" y1="20" x2="12" y2="23" />
                      <line x1="4.2" y1="4.2" x2="6.3" y2="6.3" />
                      <line x1="17.7" y1="17.7" x2="19.8" y2="19.8" />
                      <line x1="1" y1="12" x2="4" y2="12" />
                      <line x1="20" y1="12" x2="23" y2="12" />
                      <line x1="4.2" y1="19.8" x2="6.3" y2="17.7" />
                      <line x1="17.7" y1="6.3" x2="19.8" y2="4.2" />
                    </g>
                  </svg>
                )}
              </button>

              <button 
                className={`topbar-menu-btn ${isMenuOpen ? "open" : ""}`} 
                id="menu-btn" 
                aria-label="Toggle navigation menu"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <span></span><span></span><span></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
