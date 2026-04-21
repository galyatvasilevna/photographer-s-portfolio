(function () {
  const aside = document.querySelector(".aside"); // исправлено
  const bodyEl = document.body;

  if (!aside) return; // защита от отсутствия элемента

  function updateAsideOnScroll() {
    const scrollY = window.scrollY;
    const threshold = 45;

    if (scrollY > threshold) {
      if (!aside.classList.contains("scrolled")) {
        aside.classList.add("scrolled");
        bodyEl.classList.add("aside-fixed");
      }
    } else {
      if (aside.classList.contains("scrolled")) {
        aside.classList.remove("scrolled");
        bodyEl.classList.remove("aside-fixed");
      }
    }

    // Корректировка scroll-padding-top для фиксированной шапки
    if (bodyEl.classList.contains("aside-fixed")) {
      const headerFixedHeight = aside.offsetHeight;
      document.documentElement.style.scrollPaddingTop =
        headerFixedHeight + 20 + "px";
    } else {
      document.documentElement.style.scrollPaddingTop = "";
    }
  }

  // Функция плавной прокрутки к элементу
  function smoothScrollToElement(element, offset = 10) {
    if (!element) return;
    const asideHeight = aside.classList.contains("scrolled")
      ? aside.offsetHeight
      : 0;
    const targetPosition =
      element.getBoundingClientRect().top +
      window.pageYOffset -
      asideHeight -
      offset;
    window.scrollTo({ top: targetPosition, behavior: "smooth" });
  }

  // Обработчик скролла с оптимизацией
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

  window.addEventListener("resize", () => updateAsideOnScroll());
  updateAsideOnScroll();

  // Плавная прокрутка для якорных ссылок
  const allAnchorLinks = document.querySelectorAll(
    'a[href^="#"]:not([href="#"])',
  );
  allAnchorLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId && targetId !== "#") {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          smoothScrollToElement(targetElement, 15);
        }
      }
    });
  });

  // Кнопка "Заказать съемку" в header
  const orderHeaderBtn = document.getElementById("orderBtnHeader");
  if (orderHeaderBtn) {
    orderHeaderBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const contactsSection = document.getElementById("contacts");
      smoothScrollToElement(contactsSection, 10);
    });
  }

  // Кнопки "Заказать" в карточках
  const cardBtns = document.querySelectorAll(".card-button");
  cardBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const contactsSec = document.getElementById("contacts");
      smoothScrollToElement(contactsSec, 10);
    });
  });
})();
