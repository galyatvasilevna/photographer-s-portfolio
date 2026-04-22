(function () {
  document.addEventListener("DOMContentLoaded", function () {
    const burgerBtn = document.querySelector(".burger-button");
    const menu = document.querySelector(".aside .menu");
    const aside = document.querySelector(".aside");

    if (!burgerBtn || !menu) return;

    const overlay = document.createElement("div");
    overlay.className = "menu-overlay";
    document.body.appendChild(overlay);

    function toggleMenu() {
      burgerBtn.classList.toggle("active");
      menu.classList.toggle("active");
      overlay.classList.toggle("active");

      if (menu.classList.contains("active")) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    }

    function closeMenu() {
      burgerBtn.classList.remove("active");
      menu.classList.remove("active");
      overlay.classList.remove("active");
      document.body.style.overflow = "";
    }

    burgerBtn.addEventListener("click", toggleMenu);

    overlay.addEventListener("click", closeMenu);

    const menuLinks = document.querySelectorAll(".aside .menu-list_link");
    menuLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        if (menu.classList.contains("active")) {
          closeMenu();
        }
      });
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 768 && menu.classList.contains("active")) {
        closeMenu();
      }
    });
  });
})();
