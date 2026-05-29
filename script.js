/**
 * portfolio core scripts
 * Amenda Maria Johnson - Product Designer Portfolio
 */

// Global active season resolved state ('winter', 'spring', 'summer', 'monsoon')
let activeSeasonEffect = "winter";

document.addEventListener("DOMContentLoaded", () => {
  initMobileMenu();
  initThemeToggle();
  initScrollReveal();
  initScrollSpy();
  initCustomCursor();
  initSeasonalSystem();
  initWeatherEffect();
  initHeaderScroll();
});

/**
 * Mobile Navigation Drawer Toggle
 */
function initMobileMenu() {
  const menuBtn = document.getElementById("menu-btn");
  const nav = document.getElementById("topbar-nav");

  if (!menuBtn || !nav) return;

  menuBtn.addEventListener("click", () => {
    menuBtn.classList.toggle("open");
    nav.classList.toggle("open");
  });

  // Close nav on clicking links
  const navLinks = nav.querySelectorAll("a");
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      menuBtn.classList.remove("open");
      nav.classList.remove("open");
    });
  });
}

/**
 * Premium Theme Toggle (System preference support + transition protection)
 */
function initThemeToggle() {
  const toggleBtn = document.getElementById("theme-toggle");
  const iconMoon = document.getElementById("icon-moon");
  const iconSun = document.getElementById("icon-sun");

  if (!toggleBtn) return;

  const getTheme = () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) return savedTheme;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  };

  const applyTheme = (theme) => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      document.body.classList.add("dark");
      if (iconMoon) iconMoon.style.display = "none";
      if (iconSun) iconSun.style.display = "block";
    } else {
      document.documentElement.classList.remove("dark");
      document.body.classList.remove("dark");
      if (iconMoon) iconMoon.style.display = "block";
      if (iconSun) iconSun.style.display = "none";
    }
  };

  // Initialize theme
  applyTheme(getTheme());

  // Handle click
  toggleBtn.addEventListener("click", () => {
    // Add temporary class to prevent flash or rough transition if needed
    const currentTheme = document.body.classList.contains("dark") ? "dark" : "light";
    const nextTheme = currentTheme === "dark" ? "light" : "dark";

    localStorage.setItem("theme", nextTheme);
    applyTheme(nextTheme);

    // Refresh weather particles to match the new theme colors immediately
    if (typeof window.triggerSeasonParticlesRebuild === "function") {
      window.triggerSeasonParticlesRebuild(activeSeasonEffect);
    }
  });
}

/**
 * Scroll Reveal Animation (Intersection Observer)
 */
function initScrollReveal() {
  const revealElements = document.querySelectorAll(".reveal");

  if (revealElements.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        // Once visible, stop observing to improve performance
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: "0px 0px -40px 0px"
  });

  revealElements.forEach(el => observer.observe(el));
}

/**
 * Scroll Spy for Detailed Case Study Table of Contents
 */
function initScrollSpy() {
  const sections = document.querySelectorAll(".cs-content-section");
  const tocLinks = document.querySelectorAll(".cs-detail-toc a");

  if (sections.length === 0 || tocLinks.length === 0) return;

  const handleScrollSpy = () => {
    let currentId = "";
    const scrollPosition = window.scrollY + 150; // offset for nav header

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;

      if (scrollPosition >= top && scrollPosition < top + height) {
        currentId = section.getAttribute("id");
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
  // Trigger once on load
  handleScrollSpy();
}

/**
 * Handle navigation header transparency on scroll
 */
function initHeaderScroll() {
  const header = document.querySelector("header");
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", handleScroll);
  // Trigger once on load
  handleScroll();
}

/**
 * Custom Animated Cursor (Dot + Lagging Ring)
 */
function initCustomCursor() {
  // Disable custom cursor on mobile touch devices
  if (window.matchMedia("(max-width: 768px)").matches) return;

  const dot = document.createElement("div");
  const outline = document.createElement("div");
  dot.className = "custom-cursor-dot";
  outline.className = "custom-cursor-outline";
  document.body.appendChild(dot);
  document.body.appendChild(outline);

  let mouseX = 0;
  let mouseY = 0;
  let outlineX = 0;
  let outlineY = 0;

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Position the inner dot immediately
    dot.style.left = `${mouseX}px`;
    dot.style.top = `${mouseY}px`;

    // Smooth floating background flare parallax
    const normX = (e.clientX / window.innerWidth) - 0.5;
    const normY = (e.clientY / window.innerHeight) - 0.5;
    document.body.style.setProperty("--flare-x", `${normX * 45}px`);
    document.body.style.setProperty("--flare-y", `${normY * 45}px`);
  });

  // Position outer ring with lag (requestAnimationFrame)
  const animateOutline = () => {
    const ease = 0.12;
    outlineX += (mouseX - outlineX) * ease;
    outlineY += (mouseY - outlineY) * ease;

    outline.style.left = `${outlineX}px`;
    outline.style.top = `${outlineY}px`;

    requestAnimationFrame(animateOutline);
  };
  animateOutline();

  // Attach hover events to clickable/interactive items
  const updateCursorHover = () => {
    const interactives = document.querySelectorAll("a, button, .work-item, .cs-card, .theme-toggle");

    interactives.forEach(el => {
      if (el.dataset.cursorBound) return;
      el.dataset.cursorBound = "true";

      el.addEventListener("mouseenter", () => {
        dot.classList.add("cursor-hover");
        outline.classList.add("cursor-hover");
      });

      el.addEventListener("mouseleave", () => {
        dot.classList.remove("cursor-hover");
        outline.classList.remove("cursor-hover");
      });
    });
  };

  updateCursorHover();

  // Set up mutation observer to bind new dynamic elements
  const observer = new MutationObserver(updateCursorHover);
  observer.observe(document.body, { childList: true, subtree: true });
}

/**
 * Automatically detects and applies the seasonal theme based on month
 */
function initSeasonalSystem() {
  const getSystemSeason = () => {
    const month = new Date().getMonth(); // 0-11
    if (month === 10 || month === 11 || month === 0 || month === 1) {
      return "winter";
    } else if (month === 2 || month === 3) {
      return "spring";
    } else if (month === 4 || month === 5) {
      return "summer";
    } else {
      return "monsoon";
    }
  };

  const season = getSystemSeason();
  activeSeasonEffect = season;

  // Apply the seasonal class to both root and body
  document.documentElement.classList.remove("season-winter", "season-spring", "season-summer", "season-monsoon");
  document.documentElement.classList.add(`season-${season}`);
  document.body.classList.remove("season-winter", "season-spring", "season-summer", "season-monsoon");
  document.body.classList.add(`season-${season}`);
}


/**
 * Responsive Canvas Weather Animation System
 */
function initWeatherEffect() {
  const canvas = document.createElement("canvas");
  canvas.id = "weather-canvas";
  document.body.appendChild(canvas);

  // Apply base styling
  canvas.style.position = "fixed";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  canvas.style.pointerEvents = "none";
  canvas.style.zIndex = "-1";

  const ctx = canvas.getContext("2d");
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  // Scale canvas on window resize
  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    rebuildParticles(activeSeasonEffect);
  });

  let particles = [];
  let angle = 0;

  // Track mouse coordinates in document space for petal displacement
  let mouseX = -1000;
  let mouseY = -1000;
  let mouseDocX = -1000;
  let mouseDocY = -1000;

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    mouseDocX = mouseX + window.scrollX;
    mouseDocY = mouseY + window.scrollY;
  });

  window.addEventListener("scroll", () => {
    mouseDocX = mouseX + window.scrollX;
    mouseDocY = mouseY + window.scrollY;
  });

  const rebuildParticles = (season) => {
    particles = [];
    if (season === "winter") {
      const maxFlakes = 65;
      const snowflakeSymbols = ["❄", "❅", "❆"];
      for (let i = 0; i < maxFlakes; i++) {
        particles.push({
          type: "winter",
          x: Math.random() * width,
          y: Math.random() * height,
          r: Math.random() * 2.2 + 1.2, // slightly larger radius for readable symbols
          d: Math.random() * maxFlakes,
          speed: Math.random() * 0.6 + 0.3,
          opacity: Math.random() * 0.5 + 0.3, // slightly higher opacity for clarity
          angle: Math.random() * Math.PI * 2,
          angleSpeed: (Math.random() - 0.5) * 0.015, // gentle spinning
          symbol: snowflakeSymbols[Math.floor(Math.random() * snowflakeSymbols.length)]
        });
      }
    } else if (season === "spring") {
      const maxParticles = 50;
      const pinks = [
        "rgba(244, 114, 182, ",
        "rgba(251, 113, 133, ",
        "rgba(253, 164, 175, "
      ];
      const greens = [
        "rgba(110, 231, 183, ",
        "rgba(134, 239, 172, ",
        "rgba(167, 243, 208, "
      ];
      const docWidth = document.documentElement.scrollWidth || window.innerWidth;
      const docHeight = document.documentElement.scrollHeight || window.innerHeight;
      
      for (let i = 0; i < maxParticles; i++) {
        const isLeaf = Math.random() > 0.5;
        const colorList = isLeaf ? greens : pinks;
        const baseColor = colorList[Math.floor(Math.random() * colorList.length)];
        const baseOpacity = Math.random() * 0.45 + 0.35;

        particles.push({
          type: "spring",
          subtype: isLeaf ? "leaf" : "petal",
          docX: Math.random() * docWidth,
          docY: Math.random() * docHeight,
          w: isLeaf ? Math.random() * 5 + 4 : Math.random() * 4 + 3,
          h: isLeaf ? Math.random() * 8 + 7 : Math.random() * 6 + 5,
          angle: Math.random() * Math.PI * 2,
          angleSpeed: (Math.random() - 0.5) * 0.025,
          normalSpeedY: Math.random() * 0.65 + 0.35,
          swayWeight: Math.random() * 0.8 + 0.4,
          vx: 0,
          vy: 0,
          d: Math.random() * 100,
          opacity: baseOpacity,
          baseOpacity: baseOpacity,
          colorTemplate: baseColor,
          veinColorTemplate: isLeaf ? "rgba(16, 185, 129, " : "rgba(219, 39, 119, ",
          settled: false,
          settleOffset: Math.random() * 35 - 10,
          settleDuration: 0
        });
      }
    } else if (season === "summer") {
      const maxParticles = 40; // 40 falling petals look clean and premium
      const gulmoharColors = [
        "rgba(239, 68, 68, ",
        "rgba(220, 38, 38, ",
        "rgba(249, 115, 22, ",
        "rgba(185, 28, 28, "
      ];
      const docWidth = document.documentElement.scrollWidth || window.innerWidth;
      const docHeight = document.documentElement.scrollHeight || window.innerHeight;
      
      for (let i = 0; i < maxParticles; i++) {
        const baseColor = gulmoharColors[Math.floor(Math.random() * gulmoharColors.length)];
        const baseOpacity = Math.random() * 0.4 + 0.55;
        
        particles.push({
          type: "summer",
          docX: Math.random() * docWidth,
          docY: Math.random() * docHeight, // distribute across entire page initially
          w: Math.random() * 5 + 4,
          h: Math.random() * 8 + 6,
          angle: Math.random() * Math.PI * 2,
          angleSpeed: (Math.random() - 0.5) * 0.035,
          normalSpeedX: (Math.random() * 0.3 + 0.1), // gentle drift base
          normalSpeedY: (Math.random() * 0.8 + 1.2), // falls base
          vx: (Math.random() * 0.3 + 0.1),
          vy: (Math.random() * 0.8 + 1.2),
          d: Math.random() * 100,
          opacity: baseOpacity,
          baseOpacity: baseOpacity,
          colorTemplate: baseColor,
          settled: false,
          settleOffset: Math.random() * 30 - 10, // scattered settling vertically
          settleDuration: 0
        });
      }
    } else if (season === "monsoon") {
      const maxRain = 35; // decreased density to 35 (few rain drops)
      for (let i = 0; i < maxRain; i++) {
        particles.push({
          type: "monsoon",
          x: Math.random() * width,
          y: Math.random() * height,
          l: Math.random() * 30 + 35, // adjusted length (35px to 65px)
          speed: Math.random() * 3 + 5, // adjusted falling speed (5px to 8px per frame)
          dx: -0.6 - Math.random() * 0.4, // adjusted diagonal wind drift
          opacity: Math.random() * 0.35 + 0.5 // base opacity 0.5 to 0.85
        });
      }
    }
  };

  // Expose rebuild trigger globally
  window.triggerSeasonParticlesRebuild = (season) => {
    rebuildParticles(season);
  };

  // Run initial particle setup
  rebuildParticles(activeSeasonEffect);

  const draw = () => {
    ctx.clearRect(0, 0, width, height);
    const isDark = document.body.classList.contains("dark");

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      if (p.type === "winter") {
        ctx.shadowBlur = isDark ? 3 : 1;
        ctx.shadowColor = isDark ? "rgba(255, 255, 255, 0.2)" : "rgba(100, 116, 139, 0.1)";
        const alpha = isDark ? p.opacity * 0.85 : p.opacity * 0.95;
        
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        
        const fontSize = Math.round(p.r * 5.0); // Font size scales with particle radius (r)
        ctx.font = `${fontSize}px Arial, sans-serif`;
        ctx.fillStyle = isDark ? `rgba(255, 255, 255, ${alpha})` : `rgba(130, 165, 200, ${alpha})`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(p.symbol, 0, 0);
        
        ctx.restore();
        ctx.shadowBlur = 0;
      } else if (p.type === "spring") {
        const screenX = p.docX - window.scrollX;
        const screenY = p.docY - window.scrollY;

        if (screenX >= -20 && screenX <= width + 20 && screenY >= -20 && screenY <= height + 20) {
          const alpha = isDark ? p.opacity * 0.85 : p.opacity * 0.95;

          ctx.save();
          ctx.translate(screenX, screenY);
          ctx.rotate(p.angle);
          ctx.beginPath();

          if (p.subtype === "leaf") {
            // Organic leaf shape
            ctx.moveTo(0, -p.h);
            ctx.quadraticCurveTo(p.w * 1.4, -p.h / 2, 0, p.h);
            ctx.quadraticCurveTo(-p.w * 1.4, -p.h / 2, 0, -p.h);
            ctx.fillStyle = `${p.colorTemplate}${alpha})`;
            ctx.fill();

            // Central leaf vein
            ctx.strokeStyle = `${p.veinColorTemplate}${alpha * 0.6})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(0, -p.h);
            ctx.lineTo(0, p.h);
            ctx.stroke();
          } else {
            // Petal shape
            ctx.moveTo(0, -p.h);
            ctx.quadraticCurveTo(p.w, -p.h / 2, 0, p.h);
            ctx.quadraticCurveTo(-p.w, -p.h / 2, 0, -p.h);
            ctx.fillStyle = `${p.colorTemplate}${alpha})`;
            ctx.fill();
          }

          ctx.restore();
        }
      } else if (p.type === "summer") {
        const screenX = p.docX - window.scrollX;
        const screenY = p.docY - window.scrollY;

        // Render only if visible in the viewport to save cycles
        if (screenX >= -20 && screenX <= width + 20 && screenY >= -20 && screenY <= height + 20) {
          const alpha = isDark ? p.opacity * 0.85 : p.opacity * 0.95;
          ctx.fillStyle = `${p.colorTemplate}${alpha})`;
          
          ctx.save();
          ctx.translate(screenX, screenY);
          ctx.rotate(p.angle);
          ctx.beginPath();
          // Tear-shaped Poinciana (Gulmohar) petal
          ctx.moveTo(0, -p.h);
          ctx.quadraticCurveTo(p.w * 1.3, -p.h / 3, 0, p.h);
          ctx.quadraticCurveTo(-p.w * 1.3, -p.h / 3, 0, -p.h);
          ctx.fill();
          ctx.restore();
        }
      } else if (p.type === "monsoon") {
        const alpha = isDark ? p.opacity * 0.85 : Math.min(1.0, p.opacity * 1.5);
        ctx.strokeStyle = isDark ? `rgba(186, 230, 253, ${alpha})` : `rgba(130, 165, 200, ${alpha})`;
        ctx.lineWidth = isDark ? 1.25 : 2.0; // thicker stroke (2px in light mode, 1.25px in dark mode)
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x + p.dx, p.y + p.l);
        ctx.stroke();
      }
    }

    update();
    requestAnimationFrame(draw);
  };

  const update = () => {
    angle += 0.005;

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      if (p.type === "winter") {
        p.y += p.speed;
        p.x += Math.sin(angle + p.d) * 0.25;
        p.angle += p.angleSpeed;

        if (p.y > height || p.x > width + 5 || p.x < -5) {
          const snowflakeSymbols = ["❄", "❅", "❆"];
          particles[i] = {
            type: "winter",
            x: Math.random() * width,
            y: -15,
            r: p.r,
            d: p.d,
            speed: p.speed,
            opacity: p.opacity,
            angle: Math.random() * Math.PI * 2,
            angleSpeed: p.angleSpeed,
            symbol: snowflakeSymbols[Math.floor(Math.random() * snowflakeSymbols.length)]
          };
        }
      } else if (p.type === "spring") {
        const footer = document.querySelector("footer");
        const docHeight = document.documentElement.scrollHeight || height;
        const docWidth = document.documentElement.scrollWidth || width;
        const groundY = (footer ? footer.offsetTop : docHeight) - 5 + p.settleOffset;

        if (p.settled) {
          p.settleDuration++;

          // Check proximity to cursor
          const dx = p.docX - mouseDocX;
          const dy = p.docY - mouseDocY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const pushRadius = 75;

          if (dist < pushRadius) {
            p.settled = false;
            p.settleDuration = 0;
            p.opacity = p.baseOpacity; // restore opacity

            // Blow away!
            const pushAngle = Math.atan2(dy, dx) + (Math.random() - 0.5) * 0.4;
            const force = (pushRadius - dist) / pushRadius;
            const speed = force * 4.0 + 1.5;

            p.vx = Math.cos(pushAngle) * speed;
            p.vy = Math.sin(pushAngle) * speed - 2.0; // push sideways and lift
            p.angleSpeed = (Math.random() - 0.5) * 0.12;
          } else if (p.settleDuration > 450) { // Settle duration threshold (~7.5s)
            p.opacity -= 0.003;
            if (p.opacity <= 0) {
              // Reset to top to maintain continuous falling rain of leaves/petals
              p.docY = -20 - Math.random() * 50 + window.scrollY;
              p.docX = Math.random() * docWidth;
              p.settled = false;
              p.settleDuration = 0;
              p.opacity = p.baseOpacity;
              p.vx = 0;
              p.vy = 0;
              p.angleSpeed = (Math.random() - 0.5) * 0.025;
            }
          }
        } else {
          // Falling / active state
          p.docY += p.vy + p.normalSpeedY;
          
          const targetSway = Math.sin(angle + p.d) * p.swayWeight;
          p.docX += p.vx + targetSway;
          p.angle += p.angleSpeed;

          // Drag / deceleration toward normal drift speeds
          p.vx *= 0.95;
          p.vy *= 0.95;

          // Settle condition when hitting footer ground
          if (p.docY >= groundY) {
            p.docY = groundY;
            p.settled = true;
            p.vx = 0;
            p.vy = 0;
            p.angleSpeed = 0;
          }

          // Horizontal bounds wrap
          if (p.docX < -20) {
            p.docX = docWidth + 10;
          } else if (p.docX > docWidth + 20) {
            p.docX = -10;
          }

          // Off-screen recovery vertical wrap
          if (p.docY > docHeight + 30) {
            p.docY = -20;
            p.docX = Math.random() * docWidth;
            p.settled = false;
            p.vx = 0;
            p.vy = 0;
          }
        }
      } else if (p.type === "summer") {
        const footer = document.querySelector("footer");
        const docHeight = document.documentElement.scrollHeight || height;
        const docWidth = document.documentElement.scrollWidth || width;
        const groundY = (footer ? footer.offsetTop : docHeight) - 5 + p.settleOffset;

        if (p.settled) {
          p.settleDuration++;
          
          // Check proximity to cursor
          const dx = p.docX - mouseDocX;
          const dy = p.docY - mouseDocY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const pushRadius = 75;

          if (dist < pushRadius) {
            p.settled = false;
            p.settleDuration = 0;
            p.opacity = p.baseOpacity; // restore opacity on touch
            
            // Blow away relative to cursor position
            const pushAngle = Math.atan2(dy, dx) + (Math.random() - 0.5) * 0.4;
            const force = (pushRadius - dist) / pushRadius;
            const speed = force * 5.0 + 1.8;
            
            p.vx = Math.cos(pushAngle) * speed;
            p.vy = Math.sin(pushAngle) * speed - 2.5; // push horizontally & lift vertically
            p.angleSpeed = (Math.random() - 0.5) * 0.15;
          } else if (p.settleDuration > 450) { // Settle duration threshold (~7.5s at 60fps)
            // Slowly decay / fade out settled petals to recycle them
            p.opacity -= 0.003;
            if (p.opacity <= 0) {
              // Reset to top to maintain continuous falling rain of flowers
              p.docY = -20 - Math.random() * 50 + window.scrollY;
              p.docX = Math.random() * docWidth;
              p.settled = false;
              p.settleDuration = 0;
              p.opacity = p.baseOpacity;
              p.vx = p.normalSpeedX;
              p.vy = p.normalSpeedY;
              p.angleSpeed = (Math.random() - 0.5) * 0.035;
            }
          }
        } else {
          // Falling / active state
          p.docY += p.vy;
          p.docX += p.vx;
          p.angle += p.angleSpeed;

          // Drag / deceleration toward normal drift speeds
          p.vx *= 0.96;
          p.vy *= 0.96;

          const targetSpeedX = p.normalSpeedX + Math.sin(angle + p.d) * 0.25;
          const targetSpeedY = p.normalSpeedY;

          p.vx += (targetSpeedX - p.vx) * 0.04;
          p.vy += (targetSpeedY - p.vy) * 0.04;

          // Settle condition when hitting footer ground
          if (p.docY >= groundY) {
            p.docY = groundY;
            p.settled = true;
            p.vx = 0;
            p.vy = 0;
            p.angleSpeed = 0;
          }

          // Horizontal bounds wrap
          if (p.docX < -20) {
            p.docX = docWidth + 10;
          } else if (p.docX > docWidth + 20) {
            p.docX = -10;
          }

          // Off-screen recovery vertical wrap
          if (p.docY > docHeight + 30) {
            p.docY = -20;
            p.docX = Math.random() * docWidth;
            p.settled = false;
            p.vx = p.normalSpeedX;
            p.vy = p.normalSpeedY;
          }
        }
      } else if (p.type === "monsoon") {
        p.y += p.speed;
        p.x += p.dx;

        if (p.y > height || p.x < -20) {
          particles[i] = {
            type: "monsoon",
            x: Math.random() * (width + 50),
            y: -p.l - 5,
            l: p.l,
            speed: p.speed,
            dx: p.dx,
            opacity: p.opacity
          };
        }
      }
    }
  };

  draw();
}