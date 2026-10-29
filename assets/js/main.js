document.documentElement.classList.add("js-ready");

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".navigation");

function closeMenu() {
  if (!menuButton || !navigation) return;
  navigation.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Open navigation");
}

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute(
      "aria-label",
      isOpen ? "Close navigation" : "Open navigation"
    );
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  document.addEventListener("click", (event) => {
    if (
      navigation.classList.contains("open") &&
      !navigation.contains(event.target) &&
      !menuButton.contains(event.target)
    ) {
      closeMenu();
    }
  });
}

const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();

const revealTargets = document.querySelectorAll(
  ".section-heading, .about-grid, .principle, .skills-intro, .skill-panel, .project-card, .timeline-item, .service-card, .contact-inner"
);

revealTargets.forEach((element) => element.classList.add("reveal"));

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if ("IntersectionObserver" in window && !reducedMotion) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: "0px 0px -35px 0px"
  });

  revealTargets.forEach((element) => observer.observe(element));
} else {
  revealTargets.forEach((element) => element.classList.add("is-visible"));
}
