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