class ScrollManager {
  constructor(asideSelector) {
    this.aside = document.querySelector(asideSelector);
    this.threshold = 45;

    // Проверяем прокрутку при загрузке
    this.handleScroll();

    // Следим за прокруткой
    window.addEventListener("scroll", () => this.handleScroll());

    // Обновляем отступ при изменении размера окна
    window.addEventListener("resize", () => this.updatePadding());
  }

  getHeight() {
    return this.aside.offsetHeight;
  }

  // Плавная прокрутка к элементу
  scrollToElement(element, offset) {
    if (!element) return;
    if (!offset) offset = 10;

    let top =
      element.getBoundingClientRect().top +
      window.pageYOffset -
      this.getHeight() -
      offset;
    window.scrollTo({ top: top, behavior: "smooth" });
  }

  enableSmoothScroll() {
    let links = document.querySelectorAll('a[href^="#"]:not([href="#"])');

    for (let i = 0; i < links.length; i++) {
      links[i].addEventListener("click", (e) => {
        let id = links[i].getAttribute("href");
        let target = document.querySelector(id);

        if (target) {
          e.preventDefault();
          this.scrollToElement(target, 15);
        }
      });
    }
  }

  // Обработчик прокрутки
  handleScroll() {
    if (window.scrollY > this.threshold) {
      this.aside.classList.add("scrolled");
    } else {
      this.aside.classList.remove("scrolled");
    }

    this.updatePadding();
  }

  updatePadding() {
    if (this.aside.classList.contains("scrolled")) {
      document.documentElement.style.scrollPaddingTop =
        this.getHeight() + 20 + "px";
    } else {
      document.documentElement.style.scrollPaddingTop = "";
    }
  }
}
