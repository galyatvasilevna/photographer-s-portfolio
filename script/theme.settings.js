class ThemeSettings {
  constructor(storage, buttonsSelector) {
    this.storage = storage;
    this.buttons = document.querySelectorAll(buttonsSelector);
    this.theme = this.loadTheme();
    this.applyTheme(this.theme);
    this.setupButtons();
    this.listenSystem();
  }

  // Установить тему
  setTheme(theme) {
    // Проверяем, что тема правильная
    if (theme !== "light" && theme !== "dark" && theme !== "auto") {
      return;
    }

    this.theme = theme;
    this.storage.set("theme", theme);
    this.applyTheme(theme);
  }

  // Применить тему к странице
  applyTheme(theme) {
    let html = document.documentElement;
    html.classList.remove("theme-light", "theme-dark");

    let effective = theme;
    if (theme === "auto") {
      // Определяем системную тему
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        effective = "dark";
      } else {
        effective = "light";
      }
    }

    html.classList.add("theme-" + effective);
    this.updateButtons(theme);
  }

  // Подсветить активную кнопку
  updateButtons(activeTheme) {
    for (let i = 0; i < this.buttons.length; i++) {
      let btn = this.buttons[i];
      let btnTheme = btn.getAttribute("data-theme");

      if (btnTheme === activeTheme) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    }
  }

  // Загрузить сохранённую тему
  loadTheme() {
    let saved = this.storage.get("theme", "auto");
    return saved;
  }

  // Настроить кнопки переключения
  setupButtons() {
    for (let i = 0; i < this.buttons.length; i++) {
      let btn = this.buttons[i];

      btn.addEventListener("click", () => {
        let theme = btn.getAttribute("data-theme");
        this.setTheme(theme);
      });
    }
  }

  // Слушать изменения системной темы
  listenSystem() {
    let mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    mediaQuery.addEventListener("change", () => {
      if (this.theme === "auto") {
        this.applyTheme("auto");
      }
    });
  }
}
