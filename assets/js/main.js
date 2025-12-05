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

document.addEventListener("DOMContentLoaded", () => {
  function whenReady(callback) {
    const interval = setInterval(() => {
      if (
        window.gsap &&
        window.SplitType &&
        document.getElementById("dynamicText")
      ) {
        clearInterval(interval);
        callback();
      }
    }, 50);
  }

  whenReady(() => {
    const dynamicText = document.getElementById("dynamicText");

    const words = [
      "Responsive",
      "Animated",
      "Scalable",
      "Secure",
      "Modern",
      "Professional",
    ];

    let index = 0;
    let split = null;

    function runAnimation() {
      if (split) split.revert();

      dynamicText.textContent = words[index];

      split = new SplitType(dynamicText, { types: "chars" });

      gsap.fromTo(
        split.chars,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.05,
          ease: "power2.out",
        }
      );

      index = (index + 1) % words.length;

      setTimeout(runAnimation, 2000);
    }

    runAnimation();
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Chatbot elements
  const chatbotToggle = document.getElementById("chatbotToggle");
  const chatbotContainer = document.getElementById("chatbotContainer");
  const closeChatbot = document.getElementById("closeChatbot");
  const chatbotInput = document.getElementById("chatbotInput");
  const chatbotSend = document.getElementById("chatbotSend");
  const chatbotMessages = document.getElementById("chatbotMessages");

  // Bot responses based on keywords
  // Bot responses based on keywords
  const botResponses = {
    greeting: [
      "Hello there! 👋 How can I assist you today?",
      "Hi! I'm your friendly AI assistant here to help you explore Youssef's portfolio!",
      "Hey! 😊 What would you like to know about Youssef?",
    ],

    about: [
      "Youssef Dahy is a passionate front-end developer who loves building smooth, interactive, and visually powerful web experiences using Angular, Tailwind, GSAP, and more.",
      "Youssef is a detail-oriented front-end developer currently working at Code Zone, with strong experience in responsive UI and modern web technologies.",
      "He's a creative developer who enjoys turning ideas into functional, beautiful interfaces. You can learn more about him in the About section!",
    ],

    skills: [
      "Youssef is skilled in HTML, CSS, JavaScript, TypeScript, Angular, Tailwind, Bootstrap, jQuery, C#, and Blazor.",
      "His skillset includes modern front-end frameworks, UI animation tools, and clean, optimized component architecture.",
      "He also has experience integrating front-end with back-end APIs using C#. Check the Skills section for more!",
    ],

    experience: [
      "Youssef works as a Front-End Developer at Code Zone (since Jun 2024). He also completed a productive Front-End traineeship at Wego Solution.",
      "His experience includes building production-ready SPAs like Medical Insurance systems, Recruitment Platforms, and B2B portals.",
      "You can dive deeper into his experience in the Experience section!",
    ],

    projects: [
      "Youssef has worked on several projects including Fresh Cart, Alex Med Guide, Devfolio, and more — all available in the Projects section!",
      "His work includes e-commerce apps, medical guide platforms, and modern responsive sites.",
      "You can view all his live projects by scrolling to the Projects section!",
    ],

    contact: [
      "You can contact Youssef through the contact form or via his social links in the footer!",
      "He’s available for collaboration — reach him through the Contact section or connect with him on LinkedIn!",
      "Want to reach out? You can message him directly via the Contact section or check the social links!",
    ],

    whatsapp: [
      "Sure! 😊 You can reach Youssef directly on WhatsApp here:\n👉 https://wa.me/201003657582",
      "Here you go! 📱\nYoussef’s WhatsApp:\n→ https://wa.me/201003657582",
      "Absolutely! You can contact Youssef on WhatsApp using this link:\n🔗 https://wa.me/201003657582",
    ],

    linkedin: [
      "Of course! 🤝 Here is Youssef’s LinkedIn profile:\n👉 https://linkedin.com/in/youssef-dahy-a67387299",
      "Here's his LinkedIn! 🔗\nhttps://linkedin.com/in/youssef-dahy-a67387299",
      "You can connect with Youssef on LinkedIn here:\n→ https://linkedin.com/in/youssef-dahy-a67387299",
    ],

    default: [
      "Hmm, I'm not sure I got that 😅 — but you can ask me about Youssef's skills, experience, projects, or how to contact him!",
      "You can ask me things like: his skills, experience, projects, or even his WhatsApp!",
      "I'm here to help you explore Youssef’s portfolio — try asking something more specific! 😊",
    ],
  };

  // Quick replies for easy interaction
  const quickReplies = [
    "Tell me about Youssef",
    "What skills does he have?",
    "Show me his projects",
    "How to contact him?",
    "What's his experience?",
  ];

  // Open/close chatbot
  chatbotToggle.addEventListener("click", () => {
    chatbotContainer.classList.add("open");
    chatbotToggle.classList.remove("pulse");
  });

  closeChatbot.addEventListener("click", () => {
    chatbotContainer.classList.remove("open");
  });

  // Send message function
  function sendMessage() {
    const message = chatbotInput.value.trim();
    if (!message) return;

    // Add user message
    addMessage(message, "user");
    chatbotInput.value = "";

    // Show typing indicator
    showTypingIndicator();

    // Get bot response after delay
    setTimeout(() => {
      removeTypingIndicator();
      const response = getBotResponse(message);
      addMessage(response, "bot");

      // Add quick replies for follow-up questions
      if (Math.random() > 0.5) {
        setTimeout(() => addQuickReplies(), 300);
      }

      // Auto-scroll to bottom
      scrollToBottom();
    }, 1000 + Math.random() * 1000);
  }

  // Send message on button click
  chatbotSend.addEventListener("click", sendMessage);

  // Send message on Enter key
  chatbotInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  });

  // Add message to chat
  function addMessage(text, sender) {
    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${sender}-message`;
    messageDiv.textContent = text;
    chatbotMessages.appendChild(messageDiv);
    scrollToBottom();
  }

  // Show typing indicator
  function showTypingIndicator() {
    const typingDiv = document.createElement("div");
    typingDiv.className = "typing-indicator";
    typingDiv.id = "typingIndicator";
    typingDiv.innerHTML = "<span></span><span></span><span></span>";
    chatbotMessages.appendChild(typingDiv);
    scrollToBottom();
  }

  // Remove typing indicator
  function removeTypingIndicator() {
    const typingIndicator = document.getElementById("typingIndicator");
    if (typingIndicator) {
      typingIndicator.remove();
    }
  }

  // Get bot response based on user input
  // INTENTS MEMORY
  let lastIntent = "";

  // NLP keyword groups (expanded for intelligent detection)
  const NLP = {
    projects: [
      "project",
      "projects",
      "show me",
      "portfolio",
      "work samples",
      "samples",
      "case studies",
      "اعمال",
      "مشاريع",
      "اعماله",
      "وريني المشاريع",
    ],

    experience: [
      "experience",
      "experince",
      "work history",
      "career",
      "background",
      "خبرة",
      "خبراته",
      "مسيرته",
      "اشتغل ايه",
    ],

    contact: [
      "contact",
      "reach",
      "email",
      "phone",
      "call",
      "whatsapp",
      "linkedin",
      "اتواصل",
      "التواصل",
      "رقم",
      "اميل",
    ],

    skills: [
      "skills",
      "skill",
      "tech",
      "technologies",
      "abilities",
      "مهارات",
      "بيعرف ايه",
      "تقنيات",
    ],

    about: [
      "about",
      "who is",
      "who's",
      "tell me",
      "youssef",
      "من هو",
      "عن يوسف",
      "عن يوسُف",
    ],

    greeting: ["hello", "hi", "hey", "good", "اهلا", "مرحبا", "سلام", "هاي"],
  };

  // Helper: word/phrase matching using regex
  function matchesIntent(input, terms) {
    const text = input.toLowerCase();
    return terms.some((t) => {
      const escaped = t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      return new RegExp("\\b" + escaped + "\\b", "i").test(text);
    });
  }

  // AI PROFESSIONAL & FRIENDLY PERSONALITY in responses
  function AI_respond(intent, message) {
    lastIntent = intent;

    const personalityPrefix = [
      "Certainly! 😊",
      "Absolutely — here you go! 🤖✨",
      "Sure thing! Happy to help 😄",
      "Of course! Here’s what you need 👇",
      "I can help with that! 🚀",
    ];

    const intro =
      personalityPrefix[Math.floor(Math.random() * personalityPrefix.length)];

    return `${intro}\n${message}`;
  }

  // MAIN ADVANCED ENGINE with PERSONALITY
  function getBotResponse(input) {
    const lower = input.toLowerCase().trim();

    // Follow-up detection
    if (
      lower.includes("more") ||
      lower.includes("more please") ||
      lower.includes("كمان")
    ) {
      if (lastIntent === "projects") {
        return AI_respond(
          "projects",
          "Here’s another project Youssef worked on — he also built several responsive interfaces and dashboards using Angular and Tailwind. Would you like a link?"
        );
      }
      if (lastIntent === "experience") {
        return AI_respond(
          "experience",
          "In addition to his main role, Youssef contributed to optimizing UI performance and improving user flows in multiple real-world apps."
        );
      }
      if (lastIntent === "skills") {
        return AI_respond(
          "skills",
          "He’s also familiar with GSAP, Vanta.js, API integration, and UI animation techniques."
        );
      }
      if (lastIntent === "contact") {
        return AI_respond(
          "contact",
          "You can also reach him via LinkedIn or WhatsApp — both available in the footer."
        );
      }
    }

    // INTENT MATCHING
    if (matchesIntent(lower, NLP.projects)) {
      return AI_respond(
        "projects",
        "Here are some of Youssef’s highlighted projects:\n\n" +
          "🛒 **FreshCart** – E-commerce platform built with Angular.\n" +
          "🏥 **Alex Med Guide** – Medical directory with search and filtering.\n" +
          "💼 **Devfolio** – Interactive personal portfolio.\n\n" +
          "Would you like to see more?"
      );
    }

    if (matchesIntent(lower, NLP.experience)) {
      return AI_respond(
        "experience",
        "Youssef works as a Front-End Developer at Code Zone and has delivered real production projects such as Medical Insurance SPA and B2B platforms. He also trained at Wego Solution.\n" +
          "Would you like more details?"
      );
    }

    if (matchesIntent(lower, NLP.contact)) {
      return AI_respond(
        "contact",
        "You can contact Youssef easily:\n\n" +
          "📧 Through the contact form\n" +
          "💬 WhatsApp (footer)\n" +
          "🔗 LinkedIn & GitHub links available as well\n\n" +
          "How would you prefer to reach him?"
      );
    }

    if (matchesIntent(lower, NLP.skills)) {
      return AI_respond(
        "skills",
        "Youssef is skilled in:\n\n" +
          "💻 HTML, CSS, JavaScript, TypeScript\n" +
          "⚡ Angular, jQuery, Blazor, C#\n" +
          "🎨 Tailwind, Bootstrap, GSAP, Vanta.js\n\n" +
          "Need examples of where he used these?"
      );
    }

    if (matchesIntent(lower, NLP.about)) {
      return AI_respond(
        "about",
        "Youssef is a passionate Front-End Developer who focuses on interactive UI, clean code, and smooth animations. He loves Angular, performance optimization, and creating engaging web experiences."
      );
    }

    if (matchesIntent(lower, NLP.greeting)) {
      return AI_respond(
        "greeting",
        "Hi! I'm your AI assistant — professional, friendly, and ready to help 😄\n\nAsk me about projects, experience, skills, or how to contact Youssef."
      );
    }

    // DEFAULT
    return AI_respond(
      "default",
      "I didn’t fully catch that 🤔\nYou can ask me about:\n• his projects\n• experience\n• skills\n• contact info\n\nWhat would you like to know?"
    );
  }

  // Get random response from category
  function getRandomResponse(category) {
    const responses = botResponses[category];
    return responses[Math.floor(Math.random() * responses.length)];
  }

  // Add quick reply buttons
  function addQuickReplies() {
    const quickRepliesDiv = document.createElement("div");
    quickRepliesDiv.className = "quick-replies";

    // Shuffle and take 3 random quick replies
    const shuffled = [...quickReplies].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3);

    selected.forEach((reply) => {
      const button = document.createElement("div");
      button.className = "quick-reply";
      button.textContent = reply;
      button.addEventListener("click", () => {
        chatbotInput.value = reply;
        sendMessage();
      });
      quickRepliesDiv.appendChild(button);
    });

    const lastMessage = chatbotMessages.lastChild;
    lastMessage.appendChild(quickRepliesDiv);
    scrollToBottom();
  }

  // Scroll to bottom of chat
  function scrollToBottom() {
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }

  // Quick reply click handlers
  document.querySelectorAll(".quick-reply").forEach((button) => {
    button.addEventListener("click", function () {
      const reply = this.getAttribute("data-reply");
      chatbotInput.value = reply;
      sendMessage();
    });
  });

  // Initialize chatbot with welcome message if first time
  if (!localStorage.getItem("chatbotVisited")) {
    setTimeout(() => {
      chatbotToggle.classList.add("pulse");
      localStorage.setItem("chatbotVisited", "true");
    }, 5000);
  }
});
