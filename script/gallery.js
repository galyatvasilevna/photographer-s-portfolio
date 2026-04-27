class Gallery {
  constructor(containerSelector, filterButtonsSelector, filterSettings) {
    this.container = document.querySelector(containerSelector);
    this.items = Array.from(this.container.querySelectorAll(".gallery-list"));
    this.images = Array.from(this.container.querySelectorAll(".gallery-image"));
    this.filterButtons = document.querySelectorAll(filterButtonsSelector);
    this.filterSettings = filterSettings;

    this.setupImages();

    this.filter(this.filterSettings.getCategory());
    this.setupEvents();
  }

  setupImages() {
    for (let i = 0; i < this.images.length; i++) {
      let img = this.images[i];

      img.style.opacity = "0";
      img.style.transition = "opacity 0.4s ease";

      img.addEventListener("load", () => {
        img.style.opacity = "1";
      });

      img.addEventListener("error", () => {
        img.src =
          "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Crect fill='%23eee' width='300' height='300'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' fill='%23999' font-size='16'%3EОшибка%3C/text%3E%3C/svg%3E";
        img.classList.add("gallery-image-error");
        img.style.opacity = "1";
      });

      if (img.complete) {
        img.style.opacity = "1";
      }
    }
  }

  getVisibleImages() {
    let visible = [];
    for (let i = 0; i < this.images.length; i++) {
      if (this.images[i].closest(".gallery-list").classList.contains("show")) {
        visible.push(this.images[i]);
      }
    }
    return visible;
  }

  filter(category) {
    this.filterSettings.setCategory(category);
    let active = this.filterSettings.getCategory();
    let visibleCount = 0;

    for (let i = 0; i < this.items.length; i++) {
      let item = this.items[i];
      let cat = item.dataset.category;
      let visible = active === "all" || cat === active;

      if (visible) {
        item.classList.add("show");
        item.classList.remove("hide");
        visibleCount++;
      } else {
        item.classList.remove("show");
        item.classList.add("hide");
      }
    }

    for (let i = 0; i < this.filterButtons.length; i++) {
      let btn = this.filterButtons[i];
      if (btn.getAttribute("data-filter") === active) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    }

    this.toggleNoResults(visibleCount === 0);
  }

  toggleNoResults(show) {
    let msg = this.container.querySelector(".no-results-message");

    if (show && !msg) {
      msg = document.createElement("li");
      msg.className = "no-results-message";
      msg.textContent = "Нет работ в этой категории";
      msg.style.textAlign = "center";
      msg.style.gridColumn = "1 / -1";
      msg.style.padding = "60px 20px";
      msg.style.fontSize = "18px";
      msg.style.color = "gray";
      this.container.appendChild(msg);
    }

    if (!show && msg) {
      msg.remove();
    }
  }

  setupEvents() {
    for (let i = 0; i < this.filterButtons.length; i++) {
      let btn = this.filterButtons[i];
      btn.addEventListener("click", () => {
        let category = btn.getAttribute("data-filter");
        this.filter(category);
      });
    }
  }
}
