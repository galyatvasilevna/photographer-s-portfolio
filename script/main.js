(function () {
  document.addEventListener("DOMContentLoaded", function () {
    try {
      const storage = new StorageService("photostudio_");
      const themeSettings = new ThemeSettings(storage, ".theme-btn");
      const filterSettings = new FilterSettings(storage);

      const gallery = new Gallery(
        ".gallery",
        ".portfolio-list-button",
        filterSettings,
      );
      const modal = new Modal("#imageModal", gallery);
      const formValidator = new FormValidator(".form", storage); // убрали ContactMessage
      const scrollManager = new ScrollManager(".aside");
      const mobileMenu = new MobileMenu(".burger-button", ".aside .menu");

      scrollManager.enableSmoothScroll();

      const contactsSection = document.getElementById("contacts");
      if (contactsSection) {
        const scrollToContacts = (e) => {
          e.preventDefault();
          scrollManager.scrollToElement(contactsSection);
        };

        const orderHeaderBtn = document.getElementById("orderBtnHeader");
        if (orderHeaderBtn) {
          orderHeaderBtn.addEventListener("click", scrollToContacts);
        }

        document.querySelectorAll(".card-button").forEach((btn) => {
          btn.addEventListener("click", scrollToContacts);
        });
      } else {
        console.warn("Секция #contacts не найдена");
      }

      console.log("Приложение успешно инициализировано");
    } catch (error) {
      console.error("Ошибка инициализации:", error);
    }
  });
})();
