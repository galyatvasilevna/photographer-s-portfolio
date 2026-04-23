// script/filter.js
(function () {
  document.addEventListener("DOMContentLoaded", function () {
    const galleryItems = AppUtils.getGalleryItems();
    const filterButtons = document.querySelectorAll(".portfolio-list-button");

    function filterGallery(category) {
      let visibleCount = 0;

      galleryItems.forEach((item) => {
        const itemCategory = item.getAttribute("data-category");

        if (category === "all" || itemCategory === category) {
          item.classList.remove("hide");
          item.classList.add("show");
          visibleCount++;
        } else {
          item.classList.remove("show");
          item.classList.add("hide");
        }
      });

      // Обновляем активную кнопку
      filterButtons.forEach((btn) => {
        const btnCategory = btn.getAttribute("data-filter");
        if (btnCategory === category) {
          btn.classList.add("active");
        } else {
          btn.classList.remove("active");
        }
      });

      localStorage.setItem("selectedFilter", category);

      // Cообщение, если нет результатов
      const gallery = document.querySelector(".gallery");
      let noResultsMsg = document.querySelector(".no-results-message");

      if (visibleCount === 0) {
        if (!noResultsMsg) {
          noResultsMsg = document.createElement("li");
          noResultsMsg.className = "no-results-message";
          noResultsMsg.textContent = "😔 Нет работ в этой категории";
          noResultsMsg.style.cssText = `
                        text-align: center;
                        grid-column: 1 / -1;
                        padding: 60px 20px;
                        font-size: 18px;
                        color: var(--color-text);
                    `;
          gallery.appendChild(noResultsMsg);
        }
      } else if (noResultsMsg) {
        noResultsMsg.remove();
      }
    }

    filterButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const category = this.getAttribute("data-filter");
        filterGallery(category);
      });
    });

    const savedCategory = localStorage.getItem("selectedFilter");
    const validCategories = [
      "all",
      "wedding",
      "portrait",
      "fashion",
      "events",
      "commercial",
      "landscape",
      "street",
    ];
    if (savedCategory && validCategories.includes(savedCategory)) {
      filterGallery(savedCategory);
    } else {
      filterGallery("all");
    }
  });
})();
