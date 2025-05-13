// Initialize Typed.js
document.addEventListener("DOMContentLoaded", function () {
  new Typed("#typed-text", {
    strings: [
      "Senior High School Student",
      "Web Developer",
      "Design Enthusiast",
      "Innovation Driven",
    ],
    typeSpeed: 50,
    backSpeed: 30,
    backDelay: 1500,
    loop: true,
  });
});

// Cursor elements
const cursor = document.createElement("div");
cursor.classList.add("custom-cursor");
document.body.appendChild(cursor);

const cursorRing = document.createElement("div");
cursorRing.classList.add("cursor-ring");
document.body.appendChild(cursorRing);

const cursorDot = document.createElement("div");
cursorDot.classList.add("cursor-dot");
document.body.appendChild(cursorDot);

// Cursor movement variables
let mouseX = -100;
let mouseY = -100;
let ringX = -100;
let ringY = -100;
let rafId = null;

// Update cursor position
document.addEventListener("mousemove", (e) => {
  // Move main cursor immediately for responsiveness
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;

  // Move ring with smooth follow
  cursorRing.style.left = `${e.clientX}px`;
  cursorRing.style.top = `${e.clientY}px`;
});

// Smooth cursor ring movement
function updateCursorRing() {
  // Smooth ring movement with easing
  ringX += (mouseX - ringX) * 0.15;
  ringY += (mouseY - ringY) * 0.15;

  // Use transform for better performance
  cursorRing.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;

  // Stop animation if cursor hasn't moved
  const distanceFromTarget = Math.hypot(mouseX - ringX, mouseY - ringY);
  if (distanceFromTarget < 0.1) {
    rafId = null;
    return;
  }

  rafId = requestAnimationFrame(updateCursorRing);
}

// Interactive elements hover effect
const interactiveElements = document.querySelectorAll(
  "a, button, .magnetic-button, .project-card, .fact-card"
);
interactiveElements.forEach((element) => {
  element.addEventListener("mouseenter", () => {
    cursor.classList.add("hover");
    cursorRing.style.width = "48px";
    cursorRing.style.height = "48px";
    cursorDot.style.opacity = "0";
  });

  element.addEventListener("mouseleave", () => {
    cursor.classList.remove("hover");
    cursorRing.style.width = "32px";
    cursorRing.style.height = "32px";
    cursorDot.style.opacity = "1";
  });
});

// Hide default cursor
document.body.style.cursor = "none";

// Hide cursor elements when mouse leaves window
document.addEventListener("mouseleave", () => {
  cursor.style.opacity = "0";
  cursorRing.style.opacity = "0";
  cursorDot.style.opacity = "0";
  mouseX = -100;
  mouseY = -100;
});

document.addEventListener("mouseenter", () => {
  cursor.style.opacity = "1";
  cursorRing.style.opacity = "1";
  cursorDot.style.opacity = "1";
});

// Reveal on scroll
function reveal() {
  const reveals = document.querySelectorAll(".reveal");
  reveals.forEach((element) => {
    const windowHeight = window.innerHeight;
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;

    if (elementTop < windowHeight - elementVisible) {
      element.classList.add("active");

      // Animate skill progress bars if they exist
      const progressBars = element.querySelectorAll(".skill-progress");
      progressBars.forEach((bar) => {
        const width = bar.style.width;
        bar.style.width = "0";
        setTimeout(() => {
          bar.style.width = width;
        }, 100);
      });
    }
  });
}

// Parallax effect
function parallax() {
  const elements = document.querySelectorAll(".parallax");
  elements.forEach((element) => {
    const speed = element.dataset.speed || 0.5;
    const offset = window.pageYOffset * speed;
    element.style.setProperty("--parallax-offset", `${offset}px`);
  });
}

window.addEventListener("scroll", reveal);
window.addEventListener("scroll", parallax);
reveal(); // Initial check for elements in view

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    const offset = 100; // Adjust offset as needed
    const targetPosition =
      target.getBoundingClientRect().top + window.pageYOffset - offset;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });
  });
});

// 3D Tilt Effect
document.addEventListener("DOMContentLoaded", function () {
  const tiltCard = document.querySelector(".tilt-card");
  const tiltContent = tiltCard.querySelector(".tilt-content");

  tiltCard.addEventListener("mousemove", (e) => {
    const rect = tiltCard.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    tiltCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  tiltCard.addEventListener("mouseleave", () => {
    tiltCard.style.transform = "perspective(1000px) rotateX(0) rotateY(0)";
  });
});

// Create scroll progress indicator
const scrollProgress = document.createElement("div");
scrollProgress.classList.add("scroll-progress");
document.body.appendChild(scrollProgress);

// Update scroll progress
window.addEventListener("scroll", () => {
  const windowHeight =
    document.documentElement.scrollHeight - window.innerHeight;
  const progress = window.scrollY / windowHeight;
  scrollProgress.style.transform = `scaleX(${progress})`;
});

// Magnetic button effect
document.querySelectorAll(".magnetic-button").forEach((button) => {
  button.addEventListener("mousemove", (e) => {
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const moveX = (x - centerX) / 10;
    const moveY = (y - centerY) / 10;

    button.style.transform = `translate(${moveX}px, ${moveY}px)`;
  });

  button.addEventListener("mouseleave", () => {
    button.style.transform = "";
  });
});

// Create floating dots
function createGlowingDots() {
  const sections = document.querySelectorAll("section");
  sections.forEach((section) => {
    for (let i = 0; i < 5; i++) {
      const dot = document.createElement("div");
      dot.classList.add("glow-dot");
      dot.style.left = Math.random() * 100 + "%";
      dot.style.top = Math.random() * 100 + "%";
      dot.style.animationDelay = Math.random() * 2 + "s";
      section.appendChild(dot);
    }
  });
}

// Initialize enhanced features
document.addEventListener("DOMContentLoaded", function () {
  createGlowingDots();

  // Add classes to elements
  document.querySelectorAll("section").forEach((section) => {
    section.classList.add("scroll-animate");
  });

  // Add white color to specific headings
  const whiteHeadings = ["Hi, I'm", "My Skills", "Get in Touch"];

  document.querySelectorAll("h1, h2").forEach((heading) => {
    if (whiteHeadings.some((text) => heading.textContent.includes(text))) {
      heading.classList.add("white-heading");
    }
  });

  document.querySelectorAll("h1, h2, h3").forEach((heading) => {
    heading.classList.add("text-reveal");
  });

  document.querySelectorAll(".project-card, .fact-card").forEach((card) => {
    card.classList.add("hover-lift", "card-3d");
    card.querySelector("div").classList.add("card-3d-content");
  });

  document
    .querySelectorAll("button, .button, a.magnetic-button")
    .forEach((button) => {
      button.classList.add("magnetic-pull", "glow-border");
    });

  // Add gradient background to hero section
  document.querySelector("#home").classList.add("bg-gradient-animate");
});
