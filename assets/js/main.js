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

document.querySelectorAll(".mobile-link").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.style.maxHeight = "0px";
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("dotsCanvas");
  const section = document.getElementById("contact");

  if (!canvas) {
    console.error("Canvas element not found!");
    return;
  }

  try {
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
    });

    renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
    renderer.setSize(section.clientWidth, section.clientHeight);
    renderer.setClearColor(0x000000, 0);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      section.clientWidth / section.clientHeight,
      0.1,
      1000
    );

    camera.position.z = 15;

    const particlesCount = 1500;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);
    const sizes = new Float32Array(particlesCount);

    for (let i = 0; i < particlesCount * 3; i += 3) {
      const radius = 10 + Math.random() * 5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;

      positions[i] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i + 2] = radius * Math.cos(phi);

      const colorIntensity = 0.5 + Math.random() * 0.5;
      colors[i] = 0.1 + Math.random() * 0.1;
      colors[i + 1] = 0.5 + Math.random() * 0.3;
      colors[i + 2] = 0.9 + Math.random() * 0.1;

      sizes[i / 3] = Math.random() * 0.08 + 0.02;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    function createStarfield() {
      const starGeometry = new THREE.BufferGeometry();
      const starCount = 300;
      const starPositions = new Float32Array(starCount * 3);

      for (let i = 0; i < starCount * 3; i += 3) {
        const radius = 20 + Math.random() * 10;
        starPositions[i] = (Math.random() - 0.5) * radius * 2;
        starPositions[i + 1] = (Math.random() - 0.5) * radius * 2;
        starPositions[i + 2] = (Math.random() - 0.5) * radius * 2;
      }

      starGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(starPositions, 3)
      );

      const starMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.02,
        transparent: true,
        opacity: 0.3,
      });

      const stars = new THREE.Points(starGeometry, starMaterial);
      scene.add(stars);
      return stars;
    }

    const stars = createStarfield();

    let time = 0;
    const rotationSpeed = 0.0003;
    const waveAmplitude = 0.5;

    function animate() {
      requestAnimationFrame(animate);
      time += 0.01;

      const positions = points.geometry.attributes.position.array;
      const originalPositions = points.userData.originalPositions || [
        ...positions,
      ];

      if (!points.userData.originalPositions) {
        points.userData.originalPositions = [...positions];
      }

      for (let i = 0; i < positions.length; i += 3) {
        const originalX = points.userData.originalPositions[i];
        const originalY = points.userData.originalPositions[i + 1];
        const originalZ = points.userData.originalPositions[i + 2];

        positions[i] =
          originalX + Math.sin(time + originalY * 0.1) * waveAmplitude;
        positions[i + 1] =
          originalY + Math.cos(time + originalZ * 0.1) * waveAmplitude;
        positions[i + 2] =
          originalZ + Math.sin(time + originalX * 0.1) * waveAmplitude;
      }

      points.geometry.attributes.position.needsUpdate = true;

      points.rotation.x += rotationSpeed * 0.5;
      points.rotation.y += rotationSpeed;

      if (stars) {
        stars.rotation.y += rotationSpeed * 0.3;
      }

      if (renderer.getSize(new THREE.Vector2()).width !== section.clientWidth) {
        renderer.setSize(section.clientWidth, section.clientHeight);
        camera.aspect = section.clientWidth / section.clientHeight;
        camera.updateProjectionMatrix();
      }

      renderer.render(scene, camera);
    }

    animate();

    window.addEventListener("resize", () => {
      renderer.setSize(section.clientWidth, section.clientHeight);
      camera.aspect = section.clientWidth / section.clientHeight;
      camera.updateProjectionMatrix();
    });

    let isPageVisible = true;

    document.addEventListener("visibilitychange", () => {
      isPageVisible = !document.hidden;
    });

    const ambientLight = new THREE.AmbientLight(0x88ccff, 0.1);
    scene.add(ambientLight);
  } catch (error) {
    console.error("Error initializing Three.js:", error);
    const errorDiv = document.createElement("div");
    errorDiv.className = "bg-red-900/50 text-white p-4 rounded-lg text-center";
    errorDiv.textContent =
      "Unable to load interactive background. Please refresh the page.";
    canvas.parentElement.appendChild(errorDiv);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  addShakeAnimation();

  if (typeof emailjs === "undefined") {
    console.error("EmailJS is not loaded. Check the script tag.");
    return;
  }

  emailjs.init("EZSFdkFACMcOMRA9C");

  const form = document.getElementById("contactForm");
  const sendBtn = document.getElementById("sendBtn");

  if (!form || !sendBtn) {
    console.error("Required elements not found");
    return;
  }

  const emailField = document.getElementById("email");
  const nameField = document.getElementById("fullName");
  const messageField = document.getElementById("message");

  emailField.addEventListener("blur", validateEmailField);
  emailField.addEventListener("input", () => clearFieldError("email"));

  nameField.addEventListener("input", () => clearFieldError("fullName"));
  messageField.addEventListener("input", () => clearFieldError("message"));

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    let isValid = true;

    if (!name) {
      showFieldError("fullName", "Full name is required");
      isValid = false;
    } else if (name.length < 2) {
      showFieldError("fullName", "Name must be at least 2 characters");
      isValid = false;
    } else if (name.length > 50) {
      showFieldError("fullName", "Name cannot exceed 50 characters");
      isValid = false;
    }

    if (!email) {
      showFieldError("email", "Email is required");
      isValid = false;
    } else if (!validateEmail(email)) {
      showFieldError("email", "Please enter a valid email address");
      isValid = false;
    }

    if (!message) {
      showFieldError("message", "Message is required");
      isValid = false;
    } else if (message.length < 10) {
      showFieldError("message", "Message must be at least 10 characters");
      isValid = false;
    }

    if (!isValid) {
      showMessage("Please check the form errors above", "error");
      return;
    }

    sendBtn.innerText = "Sending...";
    sendBtn.disabled = true;
    sendBtn.classList.add("opacity-50", "cursor-not-allowed");

    const templateParams = {
      title: name || "New Message",
      name: name || "Anonymous",
      message: message,
      email: email,
    };

    try {
      const response = await emailjs.send(
        "service_74i3zo7",
        "template_mg3p05c",
        templateParams
      );

      console.log("Success! Response:", response);

      showMessage(
        "Message sent successfully! We'll contact you soon.",
        "success"
      );
      form.reset();

      clearFieldError("fullName");
      clearFieldError("email");
      clearFieldError("message");
    } catch (error) {
      console.error("EmailJS Error Details:", error);

      let errorMessage = "Failed to send message. Please try again.";

      if (error.status === 412) {
        errorMessage = "Email service configuration error.";
      } else if (error.text && error.text.includes("authentication")) {
        errorMessage = "Authentication error. Service needs reconfiguration.";
      } else if (error.text) {
        errorMessage = `Error: ${error.text}`;
      }

      showMessage(errorMessage, "error");
    }

    setTimeout(() => {
      sendBtn.innerText = "Send";
      sendBtn.disabled = false;
      sendBtn.classList.remove("opacity-50", "cursor-not-allowed");
    }, 1000);
  });

  function validateEmailField() {
    const email = emailField.value.trim();
    if (email && !validateEmail(email)) {
      showFieldError("email", "Please enter a valid email address");
      return false;
    }
    return true;
  }

  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function showMessage(text, type) {
    const msgBox = document.getElementById("formMsg");

    let icon = type === "success" ? "✓" : "✗";
    let bgColor = type === "success" ? "bg-green-500/10" : "bg-red-500/10";
    let borderColor =
      type === "success" ? "border-green-500/30" : "border-red-500/30";
    let textColor = type === "success" ? "text-green-400" : "text-red-400";
    let iconColor = type === "success" ? "text-green-500" : "text-red-500";

    msgBox.innerHTML = `
      <div class="flex items-center justify-center gap-3 p-4 rounded-xl ${bgColor} border ${borderColor} backdrop-blur-sm">
        <span class="text-xl ${iconColor} font-bold">${icon}</span>
        <span class="${textColor} font-medium text-sm">${text}</span>
      </div>
    `;

    msgBox.classList.remove("opacity-0", "translate-y-[-10px]", "scale-95");
    msgBox.classList.add("opacity-100", "translate-y-0", "scale-100");

    setTimeout(() => {
      msgBox.classList.remove("opacity-100", "translate-y-0", "scale-100");
      msgBox.classList.add("opacity-0", "translate-y-[-10px]", "scale-95");

      setTimeout(() => {
        msgBox.innerHTML = "";
      }, 500);
    }, 5000);
  }

  function showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorElementId = `${fieldId}Error`;
    let errorElement = document.getElementById(errorElementId);

    if (!errorElement) {
      errorElement = document.createElement("p");
      errorElement.id = errorElementId;
      errorElement.className =
        "text-red-400 text-xs mt-2 flex items-center gap-2 animate-pulse";
      field.parentNode.appendChild(errorElement);
    }

    errorElement.innerHTML = `
      <i class="fas fa-exclamation-circle text-xs"></i>
      <span>${message}</span>
    `;

    field.classList.add("border-red-400", "shake", "bg-red-500/5");
    field.classList.remove("border-white/20", "focus:border-sky-400");

    setTimeout(() => {
      field.classList.remove("shake");
    }, 500);
  }

  function clearFieldError(fieldId) {
    const field = document.getElementById(fieldId);
    const errorElementId = `${fieldId}Error`;
    const errorElement = document.getElementById(errorElementId);

    if (errorElement) {
      errorElement.remove();
    }

    field.classList.remove("border-red-400", "shake", "bg-red-500/5");
    field.classList.add("border-white/20", "focus:border-sky-400");
  }

  function addShakeAnimation() {
    if (document.getElementById("shake-style")) return;

    const style = document.createElement("style");
    style.id = "shake-style";
    style.textContent = `
      @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
      }
      .shake {
        animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
      }
      
      @keyframes slideIn {
        from {
          opacity: 0;
          transform: translateY(-10px) scale(0.95);
        }
        to {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }
      
      #formMsg > div {
        animation: slideIn 0.3s ease-out;
      }
    `;
    document.head.appendChild(style);
  }
});
