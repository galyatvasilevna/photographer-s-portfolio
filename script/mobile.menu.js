class MobileMenu {
  constructor(burgerSelector, menuSelector) {
    this.burgerBtn = document.querySelector(burgerSelector);
    this.menu = document.querySelector(menuSelector);

    this.overlay = document.createElement("div");
    this.overlay.className = "menu-overlay";
    document.body.appendChild(this.overlay);

    this.burgerBtn.addEventListener("click", () => this.toggle());
    this.overlay.addEventListener("click", () => this.close());

    let links = this.menu.querySelectorAll(".menu-list_link");
    for (let i = 0; i < links.length; i++) {
      links[i].addEventListener("click", () => {
        if (this.menu.classList.contains("active")) {
          this.close();
        }
      });
    }

    window.addEventListener("resize", () => {
      if (window.innerWidth > 768 && this.menu.classList.contains("active")) {
        this.close();
      }
    });
  }

  toggle() {
    let isOpen = this.menu.classList.toggle("active");
    this.burgerBtn.classList.toggle("active", isOpen);
    this.overlay.classList.toggle("active", isOpen);

    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }

  close() {
    this.menu.classList.remove("active");
    this.burgerBtn.classList.remove("active");
    this.overlay.classList.remove("active");
    document.body.style.overflow = "";
  }
}
