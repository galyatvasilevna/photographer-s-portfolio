// script/scroll.js
(function () {
  document.addEventListener("DOMContentLoaded", function () {
    const aside = AppUtils.getAside();
    if (!aside) return;

    function updateScrollPadding() {
      if (aside.classList.contains("scrolled")) {
        document.documentElement.style.scrollPaddingTop = `${aside.offsetHeight + 20}px`;
      } else {
        document.documentElement.style.scrollPaddingTop = "";
      }
    }

    function updateAsideOnScroll() {
      const scrollY = window.scrollY;
      const threshold = 45;

      if (scrollY > threshold) {
        if (!aside.classList.contains("scrolled")) {
          aside.classList.add("scrolled");
          updateScrollPadding();
        }
      } else {
        if (aside.classList.contains("scrolled")) {
          aside.classList.remove("scrolled");
          updateScrollPadding();
        }
      }
    }

    const orderHeaderBtn = document.getElementById("orderBtnHeader");
    if (orderHeaderBtn) {
      orderHeaderBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const contactsSection = document.getElementById("contacts");
        AppUtils.smoothScrollTo(contactsSection);
      });
    }

    document.querySelectorAll(".card-button").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const contactsSec = document.getElementById("contacts");
        AppUtils.smoothScrollTo(contactsSec);
      });
    });

    document
      .querySelectorAll('a[href^="#"]:not([href="#"])')
      .forEach((link) => {
        link.addEventListener("click", function (e) {
          const targetId = this.getAttribute("href");
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            e.preventDefault();
            AppUtils.smoothScrollTo(targetElement, 15);
          }
        });
      });

    let ticking = false;
    window.addEventListener("scroll", () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateAsideOnScroll();
          ticking = false;
        });
        ticking = true;
      }
    });

    window.addEventListener("resize", updateScrollPadding);
    updateAsideOnScroll();
  });
})();
