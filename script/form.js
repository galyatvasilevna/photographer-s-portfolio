(function () {
  document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".form");
    if (!form) return;

    const fields = {
      name: form.querySelector("input[name='name']"),
      email: form.querySelector("input[name='email']"),
      phone: form.querySelector("input[name='tel']"),
      message: form.querySelector("textarea[name='message']"),
    };

    const errors = {
      name: {
        valueMissing: "Введите ваше имя",
        tooShort: "Имя: минимум 2 символа",
      },
      email: {
        valueMissing: "Введите email",
        typeMismatch: "Некорректный email",
      },
      phone: { patternMismatch: "Некорректный номер телефона" },
      message: {
        valueMissing: "Введите сообщение",
        tooShort: "Сообщение: минимум 10 символов",
      },
    };

    function showError(input, message) {
      const wrapper = input.closest(".form-label");
      let error = wrapper.querySelector(".error-message");
      if (!error) {
        error = document.createElement("span");
        error.className = "error-message";
        wrapper.appendChild(error);
      }
      error.textContent = message;
      input.classList.add("invalid");
      input.classList.remove("valid");
    }

    function clearError(input) {
      const wrapper = input.closest(".form-label");
      const error = wrapper.querySelector(".error-message");
      if (error) error.remove();
      input.classList.remove("invalid");
      input.classList.add("valid");
    }

    function validateField(input) {
      const name = input.getAttribute("name");
      const validity = input.validity;

      if (name === "tel" && !input.value.trim()) {
        clearError(input);
        return true;
      }

      if (validity.valid) {
        clearError(input);
        return true;
      }

      let message = "";
      if (validity.valueMissing)
        message = errors[name]?.valueMissing || "Заполните поле";
      else if (validity.typeMismatch)
        message = errors[name]?.typeMismatch || "Неверный формат";
      else if (validity.patternMismatch)
        message = errors[name]?.patternMismatch || "Неверный формат";
      else if (validity.tooShort)
        message = errors[name]?.tooShort || "Слишком короткое значение";

      showError(input, message);
      return false;
    }

    function validateForm() {
      let isValid = true;
      for (const input of Object.values(fields)) {
        if (input && !validateField(input)) isValid = false;
      }
      return isValid;
    }

    function saveToStorage() {
      const data = {};
      for (const [key, input] of Object.entries(fields)) {
        if (input) data[key] = input.value;
      }
      localStorage.setItem("contactFormData", JSON.stringify(data));
    }

    function loadFromStorage() {
      const saved = localStorage.getItem("contactFormData");
      if (saved) {
        try {
          const data = JSON.parse(saved);
          for (const [key, input] of Object.entries(fields)) {
            if (input && data[key]) input.value = data[key];
          }
        } catch (e) {}
      }
    }

    function resetForm() {
      form.reset();
      for (const input of Object.values(fields)) {
        if (input) clearError(input);
      }
      localStorage.removeItem("contactFormData");
    }

    let notificationTimeout = null;

    function showNotification(message, isError = false) {
      const oldNotification = document.querySelector(".form-notification");
      if (oldNotification) oldNotification.remove();
      if (notificationTimeout) clearTimeout(notificationTimeout);

      const notification = document.createElement("div");
      notification.className = "form-notification";
      notification.textContent = message;
      notification.style.cssText = `
                position: fixed;
                bottom: 20px;
                right: 20px;
                max-width: 350px;
                padding: 15px 20px;
                border-radius: 10px;
                font-family: 'Montserrat', sans-serif;
                font-size: 14px;
                z-index: 9999;
                animation: slideInRight 0.3s ease;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            `;

      if (isError) {
        notification.style.backgroundColor = "#f8d7da";
        notification.style.color = "#721c24";
        notification.style.borderLeft = "4px solid #dc3545";
      } else {
        notification.style.backgroundColor = "#d4edda";
        notification.style.color = "#155724";
        notification.style.borderLeft = "4px solid #28a745";
      }

      document.body.appendChild(notification);

      notificationTimeout = setTimeout(() => {
        notification.style.animation = "slideOutRight 0.3s ease";
        setTimeout(() => notification.remove(), 300);
      }, 4000);
    }

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      if (validateForm()) {
        console.log("Отправка данных:", {
          name: fields.name?.value,
          email: fields.email?.value,
          phone: fields.phone?.value,
          message: fields.message?.value,
        });
        resetForm();
        showNotification("Сообщение успешно отправлено!");
      } else {
        const firstInvalid = Object.values(fields).find(
          (input) => input && input.classList.contains("invalid"),
        );
        if (firstInvalid) {
          firstInvalid.scrollIntoView({ behavior: "smooth", block: "center" });
          firstInvalid.focus();
        }
        showNotification("Пожалуйста, исправьте ошибки в форме", true);
      }
    });

    for (const input of Object.values(fields)) {
      if (!input) continue;
      input.addEventListener("input", () => {
        validateField(input);
        saveToStorage();
      });
      input.addEventListener("blur", () => validateField(input));
      input.addEventListener("focus", () => clearError(input));
    }

    loadFromStorage();
  });
})();
