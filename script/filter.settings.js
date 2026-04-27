class FilterSettings {
  constructor(storage) {
    this.storage = storage;

    this.categories = [
      "all",
      "wedding",
      "portrait",
      "fashion",
      "events",
      "commercial",
      "landscape",
      "street",
    ];

    let saved = this.storage.get("filter");
    if (saved && this.categories.includes(saved)) {
      this.currentCategory = saved;
    } else {
      this.currentCategory = "all";
    }
  }

  // Установить новую категорию
  setCategory(category) {
    // Проверяем, есть ли такая категория в списке
    let isValid = false;
    for (let i = 0; i < this.categories.length; i++) {
      if (this.categories[i] === category) {
        isValid = true;
        break;
      }
    }

    if (isValid) {
      this.currentCategory = category;
      this.storage.set("filter", category);
    }
  }

  // Получить текущую категорию
  getCategory() {
    return this.currentCategory;
  }
}
