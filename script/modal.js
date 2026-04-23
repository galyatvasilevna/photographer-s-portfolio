(function () {
  document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("imageModal");
    const modalImage = document.getElementById("modalImage");
    const closeBtn = document.querySelector(".modal-close");
    const prevBtn = document.getElementById("modalPrev");
    const nextBtn = document.getElementById("modalNext");

    let currentImages = [];
    let currentIndex = 0;

    function updateImageList() {
      const visibleImages = AppUtils.getVisibleImages();
      currentImages = Array.from(visibleImages).map((img) => img.src);
    }

    function openModal(index) {
      updateImageList();
      if (currentImages.length === 0) return;

      if (index < 0) index = 0;
      if (index >= currentImages.length) index = currentImages.length - 1;

      currentIndex = index;
      modalImage.src = currentImages[currentIndex];
      modal.classList.add("show");
      document.body.classList.add("modal-open");
    }

    function closeModal() {
      modal.classList.remove("show");
      document.body.classList.remove("modal-open");
    }

    function prevImage() {
      if (currentImages.length === 0) return;
      currentIndex--;
      if (currentIndex < 0) currentIndex = currentImages.length - 1;
      modalImage.src = currentImages[currentIndex];
    }

    function nextImage() {
      if (currentImages.length === 0) return;
      currentIndex++;
      if (currentIndex >= currentImages.length) currentIndex = 0;
      modalImage.src = currentImages[currentIndex];
    }

    document.querySelector(".gallery")?.addEventListener("click", (e) => {
      const img = e.target.closest(".gallery-image");
      if (img) {
        const allImages = AppUtils.getVisibleImages();
        const index = Array.from(allImages).findIndex((i) => i.src === img.src);
        openModal(index);
      }
    });

    if (closeBtn) closeBtn.addEventListener("click", closeModal);
    if (prevBtn) prevBtn.addEventListener("click", prevImage);
    if (nextBtn) nextBtn.addEventListener("click", nextImage);

    modal?.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });

    document.addEventListener("keydown", (e) => {
      if (!modal?.classList.contains("show")) return;
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
    });
  });
})();
