// MOBILE MENU TOGGLE
const menuBtn = document.getElementById("menu-btn");
const nav = document.getElementById("topbar-nav");

menuBtn.addEventListener("click", () => {
  menuBtn.classList.toggle("open");
  nav.classList.toggle("open");
});

// OPTIONAL: ACTIVE NAV LINK ON SCROLL
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".topbar-nav a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("nav-active");
    if (link.getAttribute("href").includes(current)) {
      link.classList.add("nav-active");
    }
  });
});

  const skillCards = document.querySelectorAll('.skill-card');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, {
    threshold: 0.2
  });

  skillCards.forEach(card => {
    card.style.opacity = 0;
    card.style.transform = "translateY(40px)";
    card.style.transition = "all 0.6s ease";
    observer.observe(card);
  });

const toggleBtn = document.getElementById("theme-toggle");
const iconMoon = document.getElementById("icon-moon");
const iconSun = document.getElementById("icon-sun");

// Load saved theme
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  iconMoon.style.display = "none";
  iconSun.style.display = "block";
}

// Toggle
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
    iconMoon.style.display = "none";
    iconSun.style.display = "block";
  } else {
    localStorage.setItem("theme", "light");
    iconMoon.style.display = "block";
    iconSun.style.display = "none";
  }
});