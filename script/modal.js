(function () {
  document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("imageModal");
    const modalImage = document.getElementById("modalImage");
    const closeBtn = document.querySelector(".modal-close");
    const prevBtn = document.getElementById("modalPrev");
    const nextBtn = document.getElementById("modalNext");

    let currentImages = [];
    let currentIndex = 0;

    const galleryImages = document.querySelectorAll(".gallery-image");

    if (galleryImages.length === 0) return;

    galleryImages.forEach((img) => {
      currentImages.push(img.src);
    });

    function openModal(index) {
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

    galleryImages.forEach((img, index) => {
      img.addEventListener("click", (e) => {
        e.stopPropagation();
        openModal(index);
      });
    });

    if (closeBtn) closeBtn.addEventListener("click", closeModal);
    if (prevBtn) prevBtn.addEventListener("click", prevImage);
    if (nextBtn) nextBtn.addEventListener("click", nextImage);

    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("show")) {
        closeModal();
      }
      if (modal.classList.contains("show")) {
        if (e.key === "ArrowLeft") prevImage();
        if (e.key === "ArrowRight") nextImage();
      }
    });
  });
})();
