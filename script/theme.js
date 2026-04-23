(function () {
  function setTheme(theme) {
    document.documentElement.classList.remove("theme-light", "theme-dark");

    if (theme === "auto") {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      document.documentElement.classList.add(
        prefersDark ? "theme-dark" : "theme-light",
      );
    } else {
      document.documentElement.classList.add(`theme-${theme}`);
    }

    localStorage.setItem("theme", theme);
    updateActiveButton(theme);
  }

  function updateActiveButton(activeTheme) {
    const buttons = document.querySelectorAll(".theme-btn");
    buttons.forEach((btn) => {
      const theme = btn.getAttribute("data-theme");
      if (theme === activeTheme) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });
  }

  function getCurrentTheme() {
    if (document.documentElement.classList.contains("theme-light"))
      return "light";
    if (document.documentElement.classList.contains("theme-dark"))
      return "dark";
    return "auto";
  }

  document.addEventListener("DOMContentLoaded", function () {
    const savedTheme = localStorage.getItem("theme");
    const themeButtons = document.querySelectorAll(".theme-btn");

    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      setTheme("auto");
    }

    themeButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const theme = this.getAttribute("data-theme");
        setTheme(theme);
      });
    });

    const prefersDarkMedia = window.matchMedia("(prefers-color-scheme: dark)");
    prefersDarkMedia.addEventListener("change", function () {
      const currentTheme = localStorage.getItem("theme");
      if (currentTheme === "auto") {
        setTheme("auto");
      }
    });
  });
})();
