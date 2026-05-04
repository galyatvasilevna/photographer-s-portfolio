class MobileMenu {
  constructor(burgerSelector, menuSelector) {
    this.burgerBtn = document.querySelector(burgerSelector);
    this.menu = document.querySelector(menuSelector);

    // Создаём оверлей и вставляем перед меню
    this.overlay = document.createElement("div");
    this.overlay.className = "menu-overlay";
    this.menu.parentNode.insertBefore(this.overlay, this.menu);

    // Кнопка бургера
    this.burgerBtn.addEventListener("click", () => this.toggle());

    // Клик по оверлею — закрываем
    this.overlay.addEventListener("click", () => this.close());

    // Клик по ссылке — закрываем и прокручиваем
    this.menu.addEventListener("click", (e) => {
      let link = e.target.closest(".menu-list_link");
      if (!link) return;

      e.preventDefault();
      let target = document.querySelector(link.getAttribute("href"));
      this.close();

      if (target) {
        setTimeout(() => {
          target.scrollIntoView({ behavior: "smooth" });
        }, 300);
      }
    });

    // Закрываем на больших экранах
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
    document.body.style.overflow = isOpen ? "hidden" : "";
  }

  close() {
    this.menu.classList.remove("active");
    this.burgerBtn.classList.remove("active");
    this.overlay.classList.remove("active");
    document.body.style.overflow = "";
  }
}