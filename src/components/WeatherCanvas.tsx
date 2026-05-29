"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

interface Particle {
  type: "winter" | "spring" | "summer" | "monsoon";
  subtype?: "leaf" | "petal";
  x?: number;
  y?: number;
  docX?: number;
  docY?: number;
  r?: number;
  d?: number;
  speed?: number;
  opacity: number;
  baseOpacity?: number;
  angle?: number;
  angleSpeed?: number;
  symbol?: string;
  w?: number;
  h?: number;
  normalSpeedX?: number;
  normalSpeedY?: number;
  vx?: number;
  vy?: number;
  colorTemplate?: string;
  veinColorTemplate?: string;
  settled?: boolean;
  settleOffset?: number;
  settleDuration?: number;
  l?: number;
  dx?: number;
  swayWeight?: number;
}

export default function WeatherCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Detect active season based on month
    const getSystemSeason = (): "winter" | "spring" | "summer" | "monsoon" => {
      const month = new Date().getMonth();
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

    const activeSeason = getSystemSeason();

    // Resize handlers
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let particles: Particle[] = [];
    let angle = 0;

    let mouseX = -1000;
    let mouseY = -1000;
    let mouseDocX = -1000;
    let mouseDocY = -1000;

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      rebuildParticles(activeSeason);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      mouseDocX = mouseX + window.scrollX;
      mouseDocY = mouseY + window.scrollY;
    };

    const handleScroll = () => {
      mouseDocX = mouseX + window.scrollX;
      mouseDocY = mouseY + window.scrollY;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    const rebuildParticles = (season: "winter" | "spring" | "summer" | "monsoon") => {
      particles = [];
      const docWidth = document.documentElement.scrollWidth || window.innerWidth;
      const docHeight = document.documentElement.scrollHeight || window.innerHeight;

      if (season === "winter") {
        const maxFlakes = 65;
        const snowflakeSymbols = ["❄", "❅", "❆"];
        for (let i = 0; i < maxFlakes; i++) {
          particles.push({
            type: "winter",
            x: Math.random() * width,
            y: Math.random() * height,
            r: Math.random() * 2.2 + 1.2,
            d: Math.random() * maxFlakes,
            speed: Math.random() * 0.6 + 0.3,
            opacity: Math.random() * 0.5 + 0.3,
            angle: Math.random() * Math.PI * 2,
            angleSpeed: (Math.random() - 0.5) * 0.015,
            symbol: snowflakeSymbols[Math.floor(Math.random() * snowflakeSymbols.length)],
          });
        }
      } else if (season === "spring") {
        const maxParticles = 50;
        const pinks = ["rgba(244, 114, 182, ", "rgba(251, 113, 133, ", "rgba(253, 164, 175, "];
        const greens = ["rgba(110, 231, 183, ", "rgba(134, 239, 172, ", "rgba(167, 243, 208, "];

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
            settleDuration: 0,
          });
        }
      } else if (season === "summer") {
        const maxParticles = 40;
        const gulmoharColors = [
          "rgba(239, 68, 68, ",
          "rgba(220, 38, 38, ",
          "rgba(249, 115, 22, ",
          "rgba(185, 28, 28, ",
        ];

        for (let i = 0; i < maxParticles; i++) {
          const baseColor = gulmoharColors[Math.floor(Math.random() * gulmoharColors.length)];
          const baseOpacity = Math.random() * 0.4 + 0.55;

          particles.push({
            type: "summer",
            docX: Math.random() * docWidth,
            docY: Math.random() * docHeight,
            w: Math.random() * 5 + 4,
            h: Math.random() * 8 + 6,
            angle: Math.random() * Math.PI * 2,
            angleSpeed: (Math.random() - 0.5) * 0.035,
            normalSpeedX: Math.random() * 0.3 + 0.1,
            normalSpeedY: Math.random() * 0.8 + 1.2,
            vx: Math.random() * 0.3 + 0.1,
            vy: Math.random() * 0.8 + 1.2,
            d: Math.random() * 100,
            opacity: baseOpacity,
            baseOpacity: baseOpacity,
            colorTemplate: baseColor,
            settled: false,
            settleOffset: Math.random() * 30 - 10,
            settleDuration: 0,
          });
        }
      } else if (season === "monsoon") {
        const maxRain = 35;
        for (let i = 0; i < maxRain; i++) {
          particles.push({
            type: "monsoon",
            x: Math.random() * width,
            y: Math.random() * height,
            l: Math.random() * 30 + 35,
            speed: Math.random() * 3 + 5,
            dx: -0.6 - Math.random() * 0.4,
            opacity: Math.random() * 0.35 + 0.5,
          });
        }
      }
    };

    // Expose rebuild trigger globally (so Header.tsx can call it on theme/season toggle)
    (window as any).triggerSeasonParticlesRebuild = (season: "winter" | "spring" | "summer" | "monsoon") => {
      rebuildParticles(season);
    };

    rebuildParticles(activeSeason);

    let animationFrameId: number;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const isDark = document.documentElement.classList.contains("dark") || document.body.classList.contains("dark");

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (p.type === "winter") {
          ctx.shadowBlur = isDark ? 3 : 1;
          ctx.shadowColor = isDark ? "rgba(255, 255, 255, 0.2)" : "rgba(100, 116, 139, 0.1)";
          const alpha = isDark ? p.opacity * 0.85 : p.opacity * 0.95;

          ctx.save();
          if (p.x !== undefined && p.y !== undefined && p.angle !== undefined && p.r !== undefined && p.symbol !== undefined) {
            ctx.translate(p.x, p.y);
            ctx.rotate(p.angle);
            const fontSize = Math.round(p.r * 5.0);
            ctx.font = `${fontSize}px Arial, sans-serif`;
            ctx.fillStyle = isDark ? `rgba(255, 255, 255, ${alpha})` : `rgba(130, 165, 200, ${alpha})`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(p.symbol, 0, 0);
          }
          ctx.restore();
          ctx.shadowBlur = 0;
        } else if (p.type === "spring") {
          if (p.docX === undefined || p.docY === undefined || p.angle === undefined || p.w === undefined || p.h === undefined) continue;
          
          const screenX = p.docX - window.scrollX;
          const screenY = p.docY - window.scrollY;

          if (screenX >= -20 && screenX <= width + 20 && screenY >= -20 && screenY <= height + 20) {
            const alpha = isDark ? p.opacity * 0.85 : p.opacity * 0.95;

            ctx.save();
            ctx.translate(screenX, screenY);
            ctx.rotate(p.angle);
            ctx.beginPath();

            if (p.subtype === "leaf") {
              ctx.moveTo(0, -p.h);
              ctx.quadraticCurveTo(p.w * 1.4, -p.h / 2, 0, p.h);
              ctx.quadraticCurveTo(-p.w * 1.4, -p.h / 2, 0, -p.h);
              ctx.fillStyle = `${p.colorTemplate}${alpha})`;
              ctx.fill();

              ctx.strokeStyle = `${p.veinColorTemplate}${alpha * 0.6})`;
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(0, -p.h);
              ctx.lineTo(0, p.h);
              ctx.stroke();
            } else {
              ctx.moveTo(0, -p.h);
              ctx.quadraticCurveTo(p.w, -p.h / 2, 0, p.h);
              ctx.quadraticCurveTo(-p.w, -p.h / 2, 0, -p.h);
              ctx.fillStyle = `${p.colorTemplate}${alpha})`;
              ctx.fill();
            }

            ctx.restore();
          }
        } else if (p.type === "summer") {
          if (p.docX === undefined || p.docY === undefined || p.angle === undefined || p.w === undefined || p.h === undefined) continue;

          const screenX = p.docX - window.scrollX;
          const screenY = p.docY - window.scrollY;

          if (screenX >= -20 && screenX <= width + 20 && screenY >= -20 && screenY <= height + 20) {
            const alpha = isDark ? p.opacity * 0.85 : p.opacity * 0.95;
            ctx.fillStyle = `${p.colorTemplate}${alpha})`;

            ctx.save();
            ctx.translate(screenX, screenY);
            ctx.rotate(p.angle);
            ctx.beginPath();
            ctx.moveTo(0, -p.h);
            ctx.quadraticCurveTo(p.w * 1.3, -p.h / 3, 0, p.h);
            ctx.quadraticCurveTo(-p.w * 1.3, -p.h / 3, 0, -p.h);
            ctx.fill();
            ctx.restore();
          }
        } else if (p.type === "monsoon") {
          if (p.x === undefined || p.y === undefined || p.dx === undefined || p.l === undefined) continue;

          const alpha = isDark ? p.opacity * 0.85 : Math.min(1.0, p.opacity * 1.5);
          ctx.strokeStyle = isDark ? `rgba(186, 230, 253, ${alpha})` : `rgba(130, 165, 200, ${alpha})`;
          ctx.lineWidth = isDark ? 1.25 : 2.0;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x + p.dx, p.y + p.l);
          ctx.stroke();
        }
      }

      update();
      animationFrameId = requestAnimationFrame(draw);
    };

    const update = () => {
      angle += 0.005;
      const footer = document.querySelector("footer");
      const docHeight = document.documentElement.scrollHeight || height;
      const docWidth = document.documentElement.scrollWidth || width;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (p.type === "winter") {
          if (p.y === undefined || p.x === undefined || p.speed === undefined || p.angle === undefined || p.angleSpeed === undefined) continue;

          p.y += p.speed;
          p.x += Math.sin(angle + (p.d || 0)) * 0.25;
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
              symbol: snowflakeSymbols[Math.floor(Math.random() * snowflakeSymbols.length)],
            };
          }
        } else if (p.type === "spring") {
          if (p.docY === undefined || p.docX === undefined || p.vy === undefined || p.vx === undefined || p.normalSpeedY === undefined || p.angle === undefined || p.angleSpeed === undefined || p.settleOffset === undefined || p.settleDuration === undefined || p.baseOpacity === undefined || p.swayWeight === undefined) continue;

          const groundY = (footer ? (footer as HTMLElement).offsetTop : docHeight) - 5 + p.settleOffset;

          if (p.settled) {
            p.settleDuration++;

            const dx = p.docX - mouseDocX;
            const dy = p.docY - mouseDocY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const pushRadius = 75;

            if (dist < pushRadius) {
              p.settled = false;
              p.settleDuration = 0;
              p.opacity = p.baseOpacity;

              const pushAngle = Math.atan2(dy, dx) + (Math.random() - 0.5) * 0.4;
              const force = (pushRadius - dist) / pushRadius;
              const speed = force * 4.0 + 1.5;

              p.vx = Math.cos(pushAngle) * speed;
              p.vy = Math.sin(pushAngle) * speed - 2.0;
              p.angleSpeed = (Math.random() - 0.5) * 0.12;
            } else if (p.settleDuration > 450) {
              p.opacity -= 0.003;
              if (p.opacity <= 0) {
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
            p.docY += p.vy + p.normalSpeedY;
            const targetSway = Math.sin(angle + (p.d || 0)) * p.swayWeight;
            p.docX += p.vx + targetSway;
            p.angle += p.angleSpeed;

            p.vx *= 0.95;
            p.vy *= 0.95;

            if (p.docY >= groundY) {
              p.docY = groundY;
              p.settled = true;
              p.vx = 0;
              p.vy = 0;
              p.angleSpeed = 0;
            }

            if (p.docX < -20) {
              p.docX = docWidth + 10;
            } else if (p.docX > docWidth + 20) {
              p.docX = -10;
            }

            if (p.docY > docHeight + 30) {
              p.docY = -20;
              p.docX = Math.random() * docWidth;
              p.settled = false;
              p.vx = 0;
              p.vy = 0;
            }
          }
        } else if (p.type === "summer") {
          if (p.docY === undefined || p.docX === undefined || p.vy === undefined || p.vx === undefined || p.normalSpeedX === undefined || p.normalSpeedY === undefined || p.angle === undefined || p.angleSpeed === undefined || p.settleOffset === undefined || p.settleDuration === undefined || p.baseOpacity === undefined) continue;

          const groundY = (footer ? (footer as HTMLElement).offsetTop : docHeight) - 5 + p.settleOffset;

          if (p.settled) {
            p.settleDuration++;

            const dx = p.docX - mouseDocX;
            const dy = p.docY - mouseDocY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const pushRadius = 75;

            if (dist < pushRadius) {
              p.settled = false;
              p.settleDuration = 0;
              p.opacity = p.baseOpacity;

              const pushAngle = Math.atan2(dy, dx) + (Math.random() - 0.5) * 0.4;
              const force = (pushRadius - dist) / pushRadius;
              const speed = force * 5.0 + 1.8;

              p.vx = Math.cos(pushAngle) * speed;
              p.vy = Math.sin(pushAngle) * speed - 2.5;
              p.angleSpeed = (Math.random() - 0.5) * 0.15;
            } else if (p.settleDuration > 450) {
              p.opacity -= 0.003;
              if (p.opacity <= 0) {
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
            p.docY += p.vy;
            p.docX += p.vx;
            p.angle += p.angleSpeed;

            p.vx *= 0.96;
            p.vy *= 0.96;

            const targetSpeedX = p.normalSpeedX + Math.sin(angle + (p.d || 0)) * 0.25;
            const targetSpeedY = p.normalSpeedY;

            p.vx += (targetSpeedX - p.vx) * 0.04;
            p.vy += (targetSpeedY - p.vy) * 0.04;

            if (p.docY >= groundY) {
              p.docY = groundY;
              p.settled = true;
              p.vx = 0;
              p.vy = 0;
              p.angleSpeed = 0;
            }

            if (p.docX < -20) {
              p.docX = docWidth + 10;
            } else if (p.docX > docWidth + 20) {
              p.docX = -10;
            }

            if (p.docY > docHeight + 30) {
              p.docY = -20;
              p.docX = Math.random() * docWidth;
              p.settled = false;
              p.vx = p.normalSpeedX;
              p.vy = p.normalSpeedY;
            }
          }
        } else if (p.type === "monsoon") {
          if (p.y === undefined || p.x === undefined || p.speed === undefined || p.dx === undefined || p.l === undefined) continue;

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
              opacity: p.opacity,
            };
          }
        }
      }
    };

    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, [pathname]);

  return (
    <canvas
      ref={canvasRef}
      id="weather-canvas"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: -1,
      }}
    />
  );
}
