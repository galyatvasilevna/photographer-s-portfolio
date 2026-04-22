(function () {
  document.addEventListener("DOMContentLoaded", function () {
    const filterButtons = document.querySelectorAll(".portfolio-list-button");
    const galleryItems = document.querySelectorAll(".gallery-list");

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

      localStorage.setItem("selectedFilter", category);

      filterButtons.forEach((btn) => {
        const btnCategory = btn.getAttribute("data-filter");
        if (btnCategory === category) {
          btn.classList.add("active");
        } else {
          btn.classList.remove("active");
        }
      });

      const gallery = document.querySelector(".gallery");
      let noResultsMsg = document.querySelector(".no-results-message");

      if (visibleCount === 0) {
        if (!noResultsMsg) {
          noResultsMsg = document.createElement("li");
          noResultsMsg.className = "no-results-message";
          noResultsMsg.textContent = "Нет работ в этой категории";
          noResultsMsg.style.textAlign = "center";
          noResultsMsg.style.gridColumn = "1 / -1";
          noResultsMsg.style.padding = "60px 20px";
          noResultsMsg.style.fontSize = "18px";
          noResultsMsg.style.color = "var(--color-text)";
          noResultsMsg.style.fontFamily = "'Montserrat', sans-serif";
          gallery.appendChild(noResultsMsg);
        }
      } else {
        if (noResultsMsg) {
          noResultsMsg.remove();
        }
      }
    }

    filterButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const category = this.getAttribute("data-filter");
        filterGallery(category);
      });
    });

    const savedCategory = localStorage.getItem("selectedFilter");
    if (savedCategory && savedCategory !== "all") {
      const categoryExists = Array.from(filterButtons).some(
        (btn) => btn.getAttribute("data-filter") === savedCategory,
      );
      if (categoryExists) {
        filterGallery(savedCategory);
      } else {
        filterGallery("all");
      }
    } else {
      filterGallery("all");
    }
  });
})();
