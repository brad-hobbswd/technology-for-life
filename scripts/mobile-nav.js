/* Accessible, keyboard-friendly mobile navigation for Technology for Life */
(() => {
  const initNavigation = () => {
    const header = document.querySelector(".site-header");
    if (!header) return;

    const button = header.querySelector(".menu-toggle");
    const nav = header.querySelector(".site-nav");
    if (!button || !nav) return;

    const icon = button.querySelector(".menu-icon");
    const label = button.querySelector(".menu-label");

    const closeMenu = (returnFocus = false) => {
      nav.classList.remove("is-open");
      button.setAttribute("aria-expanded", "false");
      if (icon) icon.textContent = "☰";
      if (label) label.textContent = "Menu";
      if (returnFocus) button.focus();
    };

    const openMenu = () => {
      nav.classList.add("is-open");
      button.setAttribute("aria-expanded", "true");
      if (icon) icon.textContent = "×";
      if (label) label.textContent = "Close";
    };

    button.addEventListener("click", () => {
      if (button.getAttribute("aria-expanded") === "true") closeMenu();
      else openMenu();
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => closeMenu());
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && button.getAttribute("aria-expanded") === "true") {
        closeMenu(true);
      }
    });

    document.addEventListener("click", (event) => {
      if (button.getAttribute("aria-expanded") !== "true") return;
      if (!header.contains(event.target)) closeMenu();
    });

    window.addEventListener("resize", () => {
      if (window.matchMedia("(min-width: 1025px)").matches) closeMenu();
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initNavigation, { once: true });
  } else {
    initNavigation();
  }
})();
