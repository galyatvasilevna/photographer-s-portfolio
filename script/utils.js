const AppUtils = {
  getGalleryItems() {
    return document.querySelectorAll(".gallery-list");
  },

  // Получение всех изображений галереи
  getGalleryImages() {
    return document.querySelectorAll(".gallery-image");
  },

  // Получение активных (видимых) изображений
  getVisibleImages() {
    return document.querySelectorAll(
      ".gallery-image.show, .gallery-image:not(.hide)",
    );
  },

  // Получение высоты фиксированного меню
  getAsideHeight() {
    const aside = document.querySelector(".aside");
    return aside?.offsetHeight || 0;
  },

  // Получение элемента меню
  getAside() {
    return document.querySelector(".aside");
  },

  // Плавная прокрутка к элементу
  smoothScrollTo(element, offset = 10) {
    if (!element) return;
    const asideHeight = this.getAsideHeight();
    const targetPosition =
      element.getBoundingClientRect().top +
      window.pageYOffset -
      asideHeight -
      offset;
    window.scrollTo({ top: targetPosition, behavior: "smooth" });
  },

  // Показ уведомления
  showNotification(message, isError = false) {
    let notification = document.querySelector(".global-notification");
    if (notification) notification.remove();

    notification = document.createElement("div");
    notification.className = "global-notification";
    notification.textContent = message;
    notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            padding: 12px 20px;
            border-radius: 8px;
            z-index: 9999;
            background: ${isError ? "#f8d7da" : "#d4edda"};
            color: ${isError ? "#721c24" : "#155724"};
            border-left: 4px solid ${isError ? "#dc3545" : "#28a745"};
            font-family: 'Montserrat', sans-serif;
            font-size: 14px;
            animation: slideInRight 0.3s ease;
        `;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 4000);
  },
};
