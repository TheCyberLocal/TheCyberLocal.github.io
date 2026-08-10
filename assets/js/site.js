const menuButton = document.querySelector(".menu-button");
const primaryNavigation = document.querySelector(".primary-nav");

function closeMenu() {
  if (!menuButton || !primaryNavigation) return;
  menuButton.setAttribute("aria-expanded", "false");
  primaryNavigation.removeAttribute("data-open");
}

if (menuButton && primaryNavigation) {
  menuButton.addEventListener("click", () => {
    const open = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!open));
    if (open) primaryNavigation.removeAttribute("data-open");
    else primaryNavigation.setAttribute("data-open", "true");
  });

  primaryNavigation.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
      menuButton.focus();
    }
  });

  window.matchMedia("(min-width: 821px)").addEventListener("change", closeMenu);
}
