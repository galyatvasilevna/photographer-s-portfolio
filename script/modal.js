class Modal {
  constructor(modalId, gallery) {
    this.modal = document.querySelector(modalId);
    this.gallery = gallery;
    this.modalImage = this.modal.querySelector("#modalImage");
    this.currentIndex = 0;
    this.images = [];

    // Кнопка закрытия
    this.modal.querySelector(".modal-close").addEventListener("click", () => {
      this.close();
    });

    // Кнопки переключения
    this.modal.querySelector("#modalPrev").addEventListener("click", () => {
      this.prev();
    });

    this.modal.querySelector("#modalNext").addEventListener("click", () => {
      this.next();
    });

    // Клик по фону — закрываем
    this.modal.addEventListener("click", (e) => {
      if (e.target === this.modal) this.close();
    });

    // Клик по картинке в галерее
    this.gallery.container.addEventListener("click", (e) => {
      let img = e.target.closest(".gallery-image");
      if (!img) return;

      let visibleImages = this.gallery.getVisibleImages();
      for (let i = 0; i < visibleImages.length; i++) {
        if (visibleImages[i].src === img.src) {
          this.open(i);
          break;
        }
      }
    });

    // Клавиатура
    document.addEventListener("keydown", (e) => {
      if (!this.modal.classList.contains("show")) return;
      if (e.key === "Escape") this.close();
      if (e.key === "ArrowLeft") this.prev();
      if (e.key === "ArrowRight") this.next();
    });
  }

  open(index) {
    // Собираем ссылки на видимые картинки
    let visibleImages = this.gallery.getVisibleImages();
    this.images = [];
    for (let i = 0; i < visibleImages.length; i++) {
      this.images.push(visibleImages[i].src);
    }

    if (this.images.length === 0) return;

    // Проверяем индекс
    if (index < 0) index = 0;
    if (index >= this.images.length) index = this.images.length - 1;

    this.currentIndex = index;
    this.showImage();
    this.modal.classList.add("show");
    document.body.classList.add("modal-open");
  }

  close() {
    this.modal.classList.remove("show");
    document.body.classList.remove("modal-open");
  }

  prev() {
    if (this.images.length === 0) return;
    this.currentIndex--;
    if (this.currentIndex < 0) this.currentIndex = this.images.length - 1;
    this.showImage();
  }

  next() {
    if (this.images.length === 0) return;
    this.currentIndex++;
    if (this.currentIndex >= this.images.length) this.currentIndex = 0;
    this.showImage();
  }

  // Показываем картинку с плавным появлением и заглушкой при ошибке
  showImage() {
    if (!this.modalImage) return;

    // Прячем пока не загрузится
    this.modalImage.style.opacity = "0";
    this.modalImage.src = this.images[this.currentIndex];

    // Успешная загрузка
    this.modalImage.onload = () => {
      this.modalImage.style.opacity = "1";
    };

    // Ошибка загрузки
    this.modalImage.onerror = () => {
      this.modalImage.src =
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect fill='%23eee' width='200' height='200'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' fill='%23999' font-size='14'%3EОшибка%3C/text%3E%3C/svg%3E";
      this.modalImage.style.opacity = "1";
    };
  }
}
