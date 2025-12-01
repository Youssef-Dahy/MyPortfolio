// ------------------------------
// Splash Screen Fade-out
// ------------------------------
window.addEventListener("load", () => {
  const splash = document.getElementById("splash");
  setTimeout(() => {
    splash.classList.add("fade-away");
    setTimeout(() => splash.remove(), 900);
  }, 1200);
});

// ------------------------------
// VANTA.NET Background
// ------------------------------
VANTA.NET({
  el: "#home-bg",
  mouseControls: true,
  touchControls: true,
  gyroControls: false,
  minHeight: 200,
  minWidth: 200,
  scale: 1.0,
  scaleMobile: 1.0,
  color: 0x38bdf8,
  backgroundColor: 0x0f172a,
  points: 12.0,
  maxDistance: 20.0,
  spacing: 16.0,
});

// ------------------------------
// GSAP + SplitType Name Animation
// ------------------------------
document.addEventListener("DOMContentLoaded", () => {
  try {
    const split = new SplitType("#myName", { types: "chars", tagName: "span" });
    gsap.from(split.chars, {
      opacity: 0,
      y: 20,
      stagger: 0.05,
      duration: 0.6,
      ease: "power3.out",
    });
  } catch (err) {
    console.warn("Name animation failed:", err);
  }
});

// ------------------------------
// AOS Animation Init
// ------------------------------
document.addEventListener("DOMContentLoaded", function () {
  AOS.init({ duration: 800, once: true, easing: "ease-out-cubic" });
});

// ------------------------------
// Owl Carousel Loader
// ------------------------------
jQuery(function ($) {
  $(".owl-carousel").css("visibility", "visible");
  $(".owl-carousel").owlCarousel({
    loop: true,
    margin: 20,
    autoplay: true,
    autoplayTimeout: 3000,
    nav: false,
    dots: false,
    responsive: {
      0: { items: 1 },
      640: { items: 1 },
      768: { items: 2 },
      1024: { items: 3 },
    },
  });
});

// ------------------------------
// NAV + Mobile Menu + Up Button + Smooth Scroll
// ------------------------------
document.addEventListener("DOMContentLoaded", () => {
  // Show/hide up button
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      upBtn.classList.remove("hidden");
      upBtn.classList.add("flex");
    } else {
      upBtn.classList.add("hidden");
    }
  });

  // Scroll to top
  upBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (!href || href === "#" || !document.querySelector(href)) return;

      e.preventDefault();
      const target = document.querySelector(href);
      window.scrollTo({ top: target.offsetTop - 80, behavior: "smooth" });

      // Close mobile menu
      mobileMenu.style.maxHeight = "0px";
    });
  });
});

const navbar = document.querySelector("nav");
const homeSection = document.getElementById("home");

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  const homeHeight = homeSection.offsetHeight;

  if (scrollY > homeHeight) {
    // Scroll below home -> bigger padding
    navbar.classList.add("md:px-12");
    navbar.classList.remove("md:px-6");
  } else {
    // Top -> default padding
    navbar.classList.add("md:px-6");
    navbar.classList.remove("md:px-12");
  }
});

// Responsive AOS for Experience section
(function () {
  const BREAKPOINT = 768; // tailwind md breakpoint
  const items = Array.from(document.querySelectorAll(".experience-item"));

  // store original AOS value to restore on large screens
  const originals = items.map((el) => el.getAttribute("data-aos") || "");

  function applyMobileAOS() {
    items.forEach((el) => el.setAttribute("data-aos", "fade-right"));
    if (window.AOS && typeof AOS.refresh === "function") AOS.refresh();
  }

  function restoreDesktopAOS() {
    items.forEach((el, i) => {
      const val = originals[i];
      if (val) el.setAttribute("data-aos", val);
      else el.removeAttribute("data-aos");
    });
    if (window.AOS && typeof AOS.refresh === "function") AOS.refresh();
  }

  function checkAndApply() {
    if (window.innerWidth < BREAKPOINT) applyMobileAOS();
    else restoreDesktopAOS();
  }

  // run on load and on resize (debounced)
  window.addEventListener("load", checkAndApply);
  let rezTimer = null;
  window.addEventListener("resize", () => {
    clearTimeout(rezTimer);
    rezTimer = setTimeout(checkAndApply, 120);
  });
})();

// ScrollSpy Active Link
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

function updateActiveLink() {
  let scrollPos = window.scrollY + window.innerHeight / 3;

  sections.forEach((sec) => {
    const top = sec.offsetTop;
    const height = sec.offsetHeight;
    const id = sec.getAttribute("id");

    if (scrollPos >= top && scrollPos < top + height) {
      navLinks.forEach((link) => {
        link.classList.remove("nav-active");
        if (link.getAttribute("href") === `#${id}`) {
          link.classList.add("nav-active");
        }
      });
    }
  });
}

window.addEventListener("scroll", updateActiveLink);
window.addEventListener("load", updateActiveLink);

const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

menuBtn.addEventListener("click", () => {
  if (mobileMenu.style.maxHeight && mobileMenu.style.maxHeight !== "0px") {
    mobileMenu.style.maxHeight = "0px";
  } else {
    mobileMenu.style.maxHeight = mobileMenu.scrollHeight + "px";
  }
});

// Close menu when clicking a mobile link
document.querySelectorAll(".mobile-link").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.style.maxHeight = "0px";
  });
});
