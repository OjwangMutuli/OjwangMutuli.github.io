/* =========================================
   PAGE LOADER
========================================= */

window.addEventListener("load", function () {

    const loader = document.getElementById("loader");

    setTimeout(function () {
        loader.classList.add("hide");
    }, 500);

});


/* =========================================
   MOBILE NAVIGATION
========================================= */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", function () {

    navLinks.classList.toggle("show");

    const icon = menuToggle.querySelector("i");

    if (navLinks.classList.contains("show")) {
        icon.classList.replace("bi-list", "bi-x-lg");
    } else {
        icon.classList.replace("bi-x-lg", "bi-list");
    }

});


document.querySelectorAll(".nav-link").forEach(function (link) {

    link.addEventListener("click", function () {

        navLinks.classList.remove("show");

        const icon = menuToggle.querySelector("i");

        icon.classList.replace("bi-x-lg", "bi-list");

    });

});


/* =========================================
   NAVIGATION SCROLL EFFECT
========================================= */

const header = document.getElementById("header");

window.addEventListener("scroll", function () {

    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

});


/* =========================================
   ACTIVE NAVIGATION LINK
========================================= */

const sections = document.querySelectorAll("section[id]");
const navItems = document.querySelectorAll(".nav-link");

function updateActiveNavigation() {

    let currentSection = "home";

    sections.forEach(function (section) {

        const sectionTop = section.offsetTop - 150;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionBottom
        ) {
            currentSection = section.id;
        }

    });

    navItems.forEach(function (link) {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + currentSection) {
            link.classList.add("active");
        }

    });

}

window.addEventListener("scroll", updateActiveNavigation);


/* =========================================
   TYPING ANIMATION
========================================= */

const typingText = document.getElementById("typingText");

const words = [
    "Mathematics and IT Graduate.",
    "Data Analyst.",
    "IT Professional.",
    "Website and Software Developer.",
    "Research Assistant.",
    "Technology Enthusiast.",
    "Computer Tutor.",
    "Computer Software Troubleshooter."


];

let wordIndex = 0;
let characterIndex = 0;
let deleting = false;

function typeAnimation() {

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        typingText.textContent = words[0];
        return;
    }

    const currentWord = words[wordIndex];

    if (deleting) {

        characterIndex--;

    } else {

        characterIndex++;

    }

    typingText.textContent = currentWord.substring(0, characterIndex);

    let delay = deleting ? 45 : 85;

    if (!deleting && characterIndex === currentWord.length) {

        deleting = true;
        delay = 1600;

    } else if (deleting && characterIndex === 0) {

        deleting = false;

        wordIndex = (wordIndex + 1) % words.length;

        delay = 400;

    }

    setTimeout(typeAnimation, delay);

}

typeAnimation();


/* =========================================
   SCROLL REVEAL
========================================= */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(function (entries) {

    entries.forEach(function (entry) {

        if (entry.isIntersecting) {

            entry.target.classList.add("visible");

            revealObserver.unobserve(entry.target);

        }

    });

}, {
    threshold: 0.12
});


revealElements.forEach(function (element) {
    revealObserver.observe(element);
});


/* =========================================
   PROJECT FILTERS
========================================= */

const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        filterButtons.forEach(function (btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const selectedFilter = button.dataset.filter;

        projectCards.forEach(function (card) {

            const category = card.dataset.category;

            if (
                selectedFilter === "all" ||
                category === selectedFilter
            ) {

                card.classList.remove("hidden");

            } else {

                card.classList.add("hidden");

            }

        });

    });

});


/* =========================================
   PROJECT DETAILS MODAL
========================================= */

const projectModal = document.getElementById("projectModal");
const modalClose = document.getElementById("modalClose");

const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalTools = document.getElementById("modalTools");
const modalRole = document.getElementById("modalRole");

const projectDetailButtons = document.querySelectorAll(".project-details");


projectDetailButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        modalTitle.textContent = button.dataset.title;
        modalDescription.textContent = button.dataset.description;
        modalTools.textContent = button.dataset.tools;
        modalRole.textContent = button.dataset.role;

        projectModal.classList.add("show");

        document.body.style.overflow = "hidden";

    });

});


function closeProjectModal() {

    projectModal.classList.remove("show");

    document.body.style.overflow = "";

}


modalClose.addEventListener("click", closeProjectModal);


projectModal.addEventListener("click", function (event) {

    if (event.target === projectModal) {
        closeProjectModal();
    }

});


document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {
        closeProjectModal();
    }

});


/* =========================================
   BACK TO TOP
========================================= */

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", function () {

    if (window.scrollY > 400) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

});


backToTop.addEventListener("click", function () {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* =========================================
   AUTOMATIC FOOTER YEAR
========================================= */

document.getElementById("year").textContent =
    new Date().getFullYear();


/* =========================================
   ANIMATED NETWORK PARTICLES
========================================= */

const canvas = document.getElementById("networkCanvas");
const ctx = canvas.getContext("2d");

let particles = [];
let animationFrame;

let canvasWidth = 0;
let canvasHeight = 0;

const isMobile = window.innerWidth < 600;

const particleCount = isMobile ? 12 : 36;
const connectionDistance = isMobile ? 105 : 145;


function resizeCanvas() {

    const rect = canvas.getBoundingClientRect();

    const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.25);

    canvasWidth = rect.width;
    canvasHeight = rect.height;

    canvas.width = canvasWidth * pixelRatio;
    canvas.height = canvasHeight * pixelRatio;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

}


class Particle {

    constructor() {

        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;

        this.vx = (Math.random() - 0.5) * 0.45;
        this.vy = (Math.random() - 0.5) * 0.45;

        this.radius = Math.random() * 2.2 + 1.2;

        this.alpha = Math.random() * 0.5 + 0.35;

    }


    move() {

        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvasWidth) {
            this.vx *= -1;
        }

        if (this.y < 0 || this.y > canvasHeight) {
            this.vy *= -1;
        }

    }


    draw() {

        ctx.beginPath();

        ctx.arc(
            this.x,
            this.y,
            this.radius,
            0,
            Math.PI * 2
        );

        ctx.fillStyle = `rgba(255, 125, 30, ${this.alpha})`;

        ctx.shadowBlur = 12;
        ctx.shadowColor = "rgba(255, 110, 20, 0.8)";

        ctx.fill();

        ctx.shadowBlur = 0;

    }

}


function createParticles() {

    particles = [];

    for (let i = 0; i < particleCount; i++) {

        particles.push(new Particle());

    }

}


function drawConnections() {

    for (let i = 0; i < particles.length; i++) {

        for (let j = i + 1; j < particles.length; j++) {

            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;

            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < connectionDistance) {

                const opacity = 1 - distance / connectionDistance;

                ctx.beginPath();

                ctx.moveTo(particles[i].x, particles[i].y);

                ctx.lineTo(particles[j].x, particles[j].y);

                ctx.strokeStyle =
                    `rgba(255, 125, 40, ${opacity * 0.3})`;

                ctx.lineWidth = 0.8;

                ctx.stroke();

            }

        }

    }

}


function animateNetwork() {

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    particles.forEach(function (particle) {

        particle.move();
        particle.draw();

    });

    drawConnections();

    animationFrame = requestAnimationFrame(animateNetwork);

}


function startNetworkAnimation() {

    resizeCanvas();

    createParticles();

    cancelAnimationFrame(animationFrame);

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        animateNetwork();
    }

}


window.addEventListener("resize", startNetworkAnimation);

startNetworkAnimation();


/* Pause animation when the page is hidden to save resources */

document.addEventListener("visibilitychange", function () {

    if (document.hidden) {

        cancelAnimationFrame(animationFrame);

    } else {

        animateNetwork();

    }

});

/* =========================================
   LIGHT / DARK MODE
========================================= */

const themeToggle = document.getElementById("themeToggle");
const themeIcon = themeToggle.querySelector("i");

// Restore previously selected theme
const savedTheme = localStorage.getItem("ojwang-theme") || "light";

document.documentElement.dataset.theme = savedTheme;


// Update button icon
function updateThemeIcon(theme) {

    if (theme === "dark") {

        themeIcon.className = "bi bi-sun-fill";
        themeToggle.title = "Switch to light mode";
        themeToggle.setAttribute("aria-label", "Switch to light mode");

    } else {

        themeIcon.className = "bi bi-moon-stars-fill";
        themeToggle.title = "Switch to dark mode";
        themeToggle.setAttribute("aria-label", "Switch to dark mode");

    }

}


// Set initial icon
updateThemeIcon(savedTheme);


// Switch theme when clicked
themeToggle.addEventListener("click", function () {

    const currentTheme = document.documentElement.dataset.theme;

    const newTheme = currentTheme === "dark" ? "light" : "dark";

    document.documentElement.dataset.theme = newTheme;

    localStorage.setItem("ojwang-theme", newTheme);

    updateThemeIcon(newTheme);

});




/* Fail-safe page loader: reveal the page even on slow mobile connections. */
window.setTimeout(function () {
    const pageLoader = document.getElementById("loader");
    if (pageLoader) pageLoader.classList.add("hide");
}, 3500);
