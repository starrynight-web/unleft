// DOM elements
const loadingScreen = document.getElementById("loading-screen");
const heroVideo = document.getElementById("hero-video");
const mobileMenuButton = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");
const spaceCanvas = document.getElementById("space-background-canvas");

// Initialize constellation background from unleft.space (TSX -> vanilla JS)
function initConstellationBackground() {
  if (!spaceCanvas || !(spaceCanvas instanceof HTMLCanvasElement)) return;

  const canvas = spaceCanvas;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  let particles = [];
  let animationFrameId;

  // Mouse repulsion state (mirroring previous DOM star-field behavior, in % space)
  let mouseX = 0; // 0-100 (% of width)
  let mouseY = 0; // 0-100 (% of height)
  let hasMousePosition = false;
  const repulsionRadius = 20; // same "distance < 20" threshold as before (in %)
  const repulsionStrength = 0.05;
  const returnStrength = 0.02;

  // Constellation definitions (normalized 0-1 coordinates)
  const constellations = [
    {
      name: "Orion",
      color: "rgba(186, 230, 253, 0.2)",
      stars: [
        { x: 0.15, y: 0.25 },
        { x: 0.25, y: 0.28 },
        { x: 0.18, y: 0.45 },
        { x: 0.2, y: 0.46 },
        { x: 0.22, y: 0.47 },
        { x: 0.17, y: 0.65 },
        { x: 0.26, y: 0.62 },
      ],
      connections: [
        [0, 2],
        [1, 4],
        [2, 3],
        [3, 4],
        [2, 5],
        [4, 6],
        [5, 6],
        [0, 1],
      ],
    },
    {
      name: "Gemini",
      color: "rgba(233, 213, 255, 0.18)",
      stars: [
        { x: 0.75, y: 0.15 },
        { x: 0.82, y: 0.18 },
        { x: 0.72, y: 0.35 },
        { x: 0.78, y: 0.4 },
        { x: 0.68, y: 0.55 },
        { x: 0.74, y: 0.6 },
      ],
      connections: [
        [0, 1],
        [0, 2],
        [1, 3],
        [2, 4],
        [3, 5],
      ],
    },
    {
      name: "Taurus",
      color: "rgba(255, 237, 213, 0.18)",
      stars: [
        { x: 0.45, y: 0.75 },
        { x: 0.48, y: 0.78 },
        { x: 0.51, y: 0.74 },
        { x: 0.53, y: 0.82 },
        { x: 0.56, y: 0.77 },
        { x: 0.4, y: 0.6 },
        { x: 0.6, y: 0.65 },
      ],
      connections: [
        [0, 1],
        [1, 3],
        [3, 4],
        [4, 2],
        [0, 5],
        [2, 6],
      ],
    },
    {
      name: "Ursa Major",
      color: "rgba(219, 234, 254, 0.15)",
      stars: [
        { x: 0.35, y: 0.15 },
        { x: 0.42, y: 0.18 },
        { x: 0.46, y: 0.22 },
        { x: 0.5, y: 0.28 },
        { x: 0.48, y: 0.35 },
        { x: 0.56, y: 0.38 },
        { x: 0.58, y: 0.3 },
      ],
      connections: [
        [0, 1],
        [1, 2],
        [2, 3],
        [3, 4],
        [4, 5],
        [5, 6],
        [6, 3],
      ],
    },
    {
      name: "Cassiopeia",
      color: "rgba(255, 255, 255, 0.15)",
      stars: [
        { x: 0.82, y: 0.75 },
        { x: 0.85, y: 0.82 },
        { x: 0.88, y: 0.78 },
        { x: 0.91, y: 0.85 },
        { x: 0.94, y: 0.8 },
      ],
      connections: [
        [0, 1],
        [1, 2],
        [2, 3],
        [3, 4],
      ],
    },
  ];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
  }

  function initParticles() {
    particles = [];
    const count = Math.floor((window.innerWidth * window.innerHeight) / 6000);
    for (let i = 0; i < count; i++) {
      const isColorful = Math.random() > 0.8;
      const x = Math.random() * 100; // store in percentage space to match old behavior
      const y = Math.random() * 100;

      particles.push({
        x,
        y,
        originalX: x,
        originalY: y,
        size: Math.random() * 1.5 + 0.1,
        speedX: (Math.random() - 0.5) * 0.08,
        speedY: (Math.random() - 0.5) * 0.08,
        color: isColorful
          ? `rgba(${210 + Math.random() * 45}, ${
              210 + Math.random() * 45
            }, 255, ${Math.random() * 0.6 + 0.2})`
          : `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.1})`,
      });
    }
  }

  function drawConstellations() {
    const time = Date.now() * 0.0002;

    constellations.forEach((constellation) => {
      const points = constellation.stars.map((s) => ({
        x: s.x * canvas.width + Math.sin(time + s.x * 12) * 5,
        y: s.y * canvas.height + Math.cos(time + s.y * 12) * 5,
      }));

      // Faint lines
      ctx.beginPath();
      ctx.strokeStyle = constellation.color;
      ctx.lineWidth = 0.6;
      constellation.connections.forEach(([startIdx, endIdx]) => {
        ctx.moveTo(points[startIdx].x, points[startIdx].y);
        ctx.lineTo(points[endIdx].x, points[endIdx].y);
      });
      ctx.stroke();

      // Stars
      points.forEach((p, idx) => {
        const starAlpha = 0.4 + Math.sin(time * 3 + idx) * 0.2;

        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${starAlpha})`;

        ctx.shadowBlur = 12;
        ctx.shadowColor = "white";
        ctx.fill();
        ctx.shadowBlur = 0;
      });
    });
  }

  function drawDeepSpace() {
    const gradient = ctx.createRadialGradient(
      canvas.width / 2,
      canvas.height / 2,
      0,
      canvas.width / 2,
      canvas.height / 2,
      canvas.width
    );
    // Flattened to full black per requirement
    gradient.addColorStop(0, "#000000");
    gradient.addColorStop(0.8, "#000000");
    gradient.addColorStop(1, "#000000");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Faint nebulae
    const cloud1 = ctx.createRadialGradient(
      canvas.width * 0.3,
      canvas.height * 0.4,
      0,
      canvas.width * 0.3,
      canvas.height * 0.4,
      canvas.width * 0.7
    );
    cloud1.addColorStop(0, "rgba(14, 165, 233, 0.04)");
    cloud1.addColorStop(1, "rgba(14, 165, 233, 0)");
    ctx.fillStyle = cloud1;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const cloud2 = ctx.createRadialGradient(
      canvas.width * 0.7,
      canvas.height * 0.6,
      0,
      canvas.width * 0.7,
      canvas.height * 0.6,
      canvas.width * 0.6
    );
    cloud2.addColorStop(0, "rgba(168, 85, 247, 0.04)");
    cloud2.addColorStop(1, "rgba(168, 85, 247, 0)");
    ctx.fillStyle = cloud2;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawDeepSpace();

    // Background particles (positions & velocities in % like original DOM stars)
    particles.forEach((p) => {
      // Mouse repulsion (push particles away from cursor)
      if (hasMousePosition) {
        const dx = p.x - mouseX;
        const dy = p.y - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy) || 1;

        if (distance < repulsionRadius) {
          const force = (repulsionRadius - distance) / repulsionRadius;
          const nx = dx / distance;
          const ny = dy / distance;
          p.speedX += nx * force * repulsionStrength;
          p.speedY += ny * force * repulsionStrength;
        }
      }

      // Return to original position
      p.speedX += (p.originalX - p.x) * returnStrength;
      p.speedY += (p.originalY - p.y) * returnStrength;

      // Apply velocity with damping
      p.speedX *= 0.95;
      p.speedY *= 0.95;

      // Update position in % space
      p.x += p.speedX;
      p.y += p.speedY;

      // Clamp to 0-100 range
      p.x = Math.max(0, Math.min(100, p.x));
      p.y = Math.max(0, Math.min(100, p.y));

      // Convert to canvas pixels for drawing
      const px = (p.x / 100) * canvas.width;
      const py = (p.y / 100) * canvas.height;

      ctx.beginPath();
      ctx.arc(px, py, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();

      // Occasional twinkle glow
      if (p.size > 1.0 && Math.random() > 0.992) {
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
      } else {
        ctx.shadowBlur = 0;
      }
    });

    drawConstellations();
    animationFrameId = requestAnimationFrame(animate);
  }

  // Track mouse position for repulsion
  document.addEventListener("mousemove", function (e) {
    const rect = canvas.getBoundingClientRect();
    mouseX = ((e.clientX - rect.left) / rect.width) * 100;
    mouseY = ((e.clientY - rect.top) / rect.height) * 100;
    hasMousePosition = true;
  });

  window.addEventListener("resize", resize);
  resize();
  animate();

  // Clean up if needed (not used now, but kept for parity)
  window.addEventListener("beforeunload", function () {
    window.removeEventListener("resize", resize);
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }
  });
}

// Hide loading screen when video is loaded and trigger animations/background
window.addEventListener("load", function () {
  // Kick off loading screen animations
  const logoWrapper = document.getElementById("loading-logo-wrapper");
  const progressFill = document.getElementById("loading-progress-fill");

  setTimeout(function () {
    if (logoWrapper) {
      logoWrapper.classList.add("visible");
    }
    if (progressFill) {
      progressFill.classList.add("full");
    }
  }, 1200);

  // Initialize constellation background
  initConstellationBackground();

  // Simulate loading time for demonstration, then fade out
  setTimeout(function () {
    if (loadingScreen) {
      loadingScreen.style.opacity = "0";
      setTimeout(function () {
        loadingScreen.style.display = "none";
      }, 500);
    }
  }, 2500);
});

// Video loaded event
heroVideo.addEventListener("loadeddata", function () {});

// Video error handling
heroVideo.addEventListener("error", function () {
  // Fallback background if video fails to load
  document.querySelector(".hero-video").style.display = "none";
  document.querySelector(".hero-overlay").style.background =
    "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)";
});

// Mobile menu toggle
mobileMenuButton.addEventListener("click", function () {
  mobileMenu.classList.toggle("hidden");
});

// Close mobile menu when clicking a link
document.querySelectorAll("#mobile-menu a").forEach((link) => {
  link.addEventListener("click", function () {
    mobileMenu.classList.add("hidden");
  });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth",
      });
    }
  });
});

// Team member card expansion (Refined for smooth opacity/height transitions)
window.toggleMemberCard = function (card) {
  // Close other cards
  document.querySelectorAll(".team-member-card").forEach((c) => {
    if (c !== card) {
      c.classList.remove("expanded");
    }
  });

  // Toggle clicked card
  card.classList.toggle("expanded");

  // Toggle hint visibility based on expanded state
  const hint = card.querySelector(".member-hint");
  if (hint) {
    if (card.classList.contains("expanded")) {
      hint.textContent = "Click to collapse";
    } else {
      hint.textContent = "Click to expand";
    }
  }
};
