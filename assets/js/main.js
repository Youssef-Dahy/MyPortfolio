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
(function () {
  const aosScript = document.createElement("script");
  aosScript.src = "https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.js";
  aosScript.onload = function () {
    AOS.init({ duration: 800, once: true, easing: "ease-out-cubic" });
  };
  document.body.appendChild(aosScript);
})();

// ------------------------------
// Owl Carousel Loader
// ------------------------------
(function loadIfNeeded(src, testFn, onload) {
  if (testFn()) {
    onload();
    return;
  }
  const s = document.createElement("script");
  s.src = src;
  s.onload = onload;
  document.head.appendChild(s);
})(
  "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js",
  function () {
    return typeof jQuery !== "undefined";
  },
  function initOwl() {
    (function ensureOwl() {
      if (typeof jQuery === "undefined") {
        setTimeout(ensureOwl, 50);
        return;
      }
      if (typeof jQuery.fn.owlCarousel === "undefined") {
        const s = document.createElement("script");
        s.src =
          "https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js";
        s.onload = setupCarousel;
        document.head.appendChild(s);
      } else setupCarousel();
    })();
  }
);

function setupCarousel() {
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
}

// ------------------------------
// NAV + Mobile Menu + Up Button + Smooth Scroll
// ------------------------------
document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menuBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  const upBtn = document.getElementById("upBtn");

  // Mobile menu toggle (animated)
  menuBtn.addEventListener("click", () => {
    if (mobileMenu.style.maxHeight && mobileMenu.style.maxHeight !== "0px") {
      mobileMenu.style.maxHeight = "0px";
    } else {
      mobileMenu.style.maxHeight = mobileMenu.scrollHeight + "px";
    }
  });

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
