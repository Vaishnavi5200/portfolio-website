// Theme toggle
const themeBtn = document.getElementById("themeBtn");
const themeIcon = document.getElementById("themeIcon");

if (themeBtn && themeIcon) {
  themeBtn.addEventListener("click", () => {
    const html = document.documentElement;
    const isDark = html.getAttribute("data-theme") === "dark";

    html.setAttribute("data-theme", isDark ? "light" : "dark");
    themeIcon.textContent = isDark ? "🌙" : "☀️";
  });
}

// Mobile menu
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

if (hamburger && navLinks) {
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    hamburger.classList.toggle("open");
  });
}

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));

    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });

      if (navLinks) navLinks.classList.remove("open");
      if (hamburger) hamburger.classList.remove("open");
    }
  });
});

// Typewriter text
const typewriter = document.getElementById("typewriter");
const text = "Frontend Developer | B.Tech CSE Student | Learning React.js";
let index = 0;

function typeText() {
  if (typewriter && index < text.length) {
    typewriter.textContent += text.charAt(index);
    index++;
    setTimeout(typeText, 55);
  }
}

typeText();

// Reveal animation
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.15 }
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});

// Skill bar animation
const skillFills = document.querySelectorAll(".sk-fill");

const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animated");
      }
    });
  },
  { threshold: 0.4 }
);

skillFills.forEach((fill) => {
  skillObserver.observe(fill);
});

// Navbar scroll effect
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  if (navbar) {
    navbar.classList.toggle("scrolled", window.scrollY > 40);
  }
});

// Cursor dot
const cursor = document.getElementById("cursor");

if (cursor) {
  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
  });
}

// Contact form message
const contactForm = document.getElementById("contactForm");
const formSuccess = document.getElementById("formSuccess");

if (contactForm && formSuccess) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    formSuccess.style.display = "block";
    contactForm.reset();

    setTimeout(() => {
      formSuccess.style.display = "none";
    }, 4000);
  });
}