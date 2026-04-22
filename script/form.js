(function () {
  document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".form");

    if (!form) return;

    // Получаем элементы формы
    const nameInput = form.querySelector("input[name='name']");
    const emailInput = form.querySelector("input[name='email']");
    const phoneInput = form.querySelector("input[name='tel']");
    const messageInput = form.querySelector("textarea[name='message']");

    // Добавляем атрибуты валидации, если их нет
    if (nameInput && !nameInput.hasAttribute("minlength")) {
      nameInput.setAttribute("minlength", "2");
      nameInput.setAttribute("required", "");
    }

    if (emailInput && !emailInput.hasAttribute("required")) {
      emailInput.setAttribute("required", "");
    }

    if (messageInput && !messageInput.hasAttribute("minlength")) {
      messageInput.setAttribute("minlength", "10");
      messageInput.setAttribute("required", "");
    }

    // Функция сохранения данных в localStorage
    function saveFormData() {
      const formData = {
        name: nameInput ? nameInput.value : "",
        email: emailInput ? emailInput.value : "",
        phone: phoneInput ? phoneInput.value : "",
        message: messageInput ? messageInput.value : "",
        savedAt: new Date().toISOString(),
      };
      localStorage.setItem("contactFormData", JSON.stringify(formData));
    }

    // Функция загрузки данных из localStorage
    function loadFormData() {
      const savedData = localStorage.getItem("contactFormData");
      if (savedData) {
        try {
          const formData = JSON.parse(savedData);
          if (nameInput) nameInput.value = formData.name || "";
          if (emailInput) emailInput.value = formData.email || "";
          if (phoneInput) phoneInput.value = formData.phone || "";
          if (messageInput) messageInput.value = formData.message || "";
        } catch (e) {
          console.error("Ошибка загрузки данных:", e);
        }
      }
    }

    // Функция получения сообщения об ошибке через ValidityState
    function getErrorMessage(input) {
      const validity = input.validity;

      if (validity.valueMissing) {
        return "Пожалуйста, заполните это поле";
      }
      if (validity.typeMismatch) {
        if (input.type === "email") {
          return "Введите корректный email (например: name@domain.ru)";
        }
        return "Пожалуйста, введите корректное значение";
      }
      if (validity.tooShort) {
        const minLength = input.minLength;
        const currentLength = input.value.length;
        return `Минимальная длина: ${minLength} символов (сейчас ${currentLength})`;
      }
      if (validity.tooLong) {
        const maxLength = input.maxLength;
        return `Максимальная длина: ${maxLength} символов`;
      }
      if (validity.patternMismatch) {
        return "Пожалуйста, используйте правильный формат";
      }
      if (validity.rangeUnderflow) {
        return `Значение должно быть не меньше ${input.min}`;
      }
      if (validity.rangeOverflow) {
        return `Значение должно быть не больше ${input.max}`;
      }
      if (validity.stepMismatch) {
        return "Пожалуйста, введите корректное значение";
      }
      if (validity.badInput) {
        return "Пожалуйста, введите корректное значение";
      }

      return "Некорректное значение";
    }

    // Функция проверки валидности поля
    function isValid(input) {
      if (!input) return true;
      return input.validity.valid;
    }

    // Функция отображения ошибки
    function showError(input) {
      if (!input) return;

      const formLabel = input.closest(".form-label");
      let errorSpan = formLabel.querySelector(".error-message");

      if (!errorSpan) {
        errorSpan = document.createElement("span");
        errorSpan.className = "error-message";
        formLabel.appendChild(errorSpan);
      }

      const errorMessage = getErrorMessage(input);
      errorSpan.textContent = errorMessage;
      input.classList.add("invalid");
      input.classList.remove("valid");
    }

    // Функция удаления ошибки
    function clearError(input) {
      if (!input) return;

      const formLabel = input.closest(".form-label");
      const errorSpan = formLabel?.querySelector(".error-message");
      if (errorSpan) {
        errorSpan.remove();
      }
      input.classList.remove("invalid");
      if (input.value.trim() !== "") {
        input.classList.add("valid");
      } else {
        input.classList.remove("valid");
      }
    }

    // Функция проверки и отображения ошибки для конкретного поля
    function validateField(input) {
      if (!input) return true;

      if (!isValid(input)) {
        showError(input);
        return false;
      } else {
        clearError(input);
        return true;
      }
    }

    // Функция валидации всей формы
    function validateForm() {
      let isValid = true;

      // Валидация всех полей
      const fields = [nameInput, emailInput, phoneInput, messageInput];
      fields.forEach((field) => {
        if (field && field.hasAttribute("required") && !validateField(field)) {
          isValid = false;
        } else if (
          field &&
          !field.hasAttribute("required") &&
          field.value.trim() !== ""
        ) {
          if (!validateField(field)) {
            isValid = false;
          }
        } else if (field && !field.hasAttribute("required")) {
          clearError(field);
        }
      });

      return isValid;
    }

    // Функция очистки формы
    function resetForm() {
      if (nameInput) nameInput.value = "";
      if (emailInput) emailInput.value = "";
      if (phoneInput) phoneInput.value = "";
      if (messageInput) messageInput.value = "";

      // Очищаем ошибки
      const allErrors = document.querySelectorAll(".error-message");
      allErrors.forEach((error) => error.remove());

      const allInputs = form.querySelectorAll("input, textarea");
      allInputs.forEach((input) => {
        input.classList.remove("valid", "invalid");
      });

      // Удаляем данные из localStorage
      localStorage.removeItem("contactFormData");

      // Показываем сообщение об успехе
      showNotification("Сообщение успешно отправлено!", "success");
    }

    // Функция показа уведомления
    function showNotification(message, type = "success") {
      let notification = document.querySelector(".form-notification");

      if (!notification) {
        notification = document.createElement("div");
        notification.className = "form-notification";
        form.insertAdjacentElement("afterend", notification);
      }

      notification.textContent = message;
      notification.style.padding = "15px 20px";
      notification.style.borderRadius = "10px";
      notification.style.marginTop = "20px";
      notification.style.textAlign = "center";
      notification.style.fontFamily = "'Montserrat', sans-serif";

      if (type === "success") {
        notification.style.backgroundColor = "#d4edda";
        notification.style.color = "#155724";
        notification.style.border = "1px solid #c3e6cb";
      } else {
        notification.style.backgroundColor = "#f8d7da";
        notification.style.color = "#721c24";
        notification.style.border = "1px solid #f5c6cb";
      }

      // Автоматически скрываем через 5 секунд
      setTimeout(() => {
        notification.style.opacity = "0";
        setTimeout(() => {
          if (notification.parentNode) {
            notification.remove();
          }
        }, 300);
      }, 5000);
    }

    // Обработчик отправки формы
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      if (validateForm()) {
        // Здесь можно отправить данные на сервер через fetch
        console.log("Форма валидна, данные:", {
          name: nameInput?.value,
          email: emailInput?.value,
          phone: phoneInput?.value,
          message: messageInput?.value,
        });

        resetForm();
      } else {
        showNotification("Пожалуйста, исправьте ошибки в форме", "error");

        // Прокручиваем к первому полю с ошибкой
        const firstInvalid = form.querySelector(".invalid");
        if (firstInvalid) {
          firstInvalid.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }
    });

    // Сохранение данных при вводе (автосохранение)
    const saveInputs = [nameInput, emailInput, phoneInput, messageInput];
    saveInputs.forEach((input) => {
      if (input) {
        input.addEventListener("input", function () {
          saveFormData();

          // Валидация в реальном времени
          if (input.hasAttribute("required") || input.value.trim() !== "") {
            validateField(input);
          } else {
            clearError(input);
          }
        });
      }
    });

    // Валидация при потере фокуса
    const blurInputs = [nameInput, emailInput, messageInput];
    blurInputs.forEach((input) => {
      if (input) {
        input.addEventListener("blur", function () {
          if (input.hasAttribute("required") || input.value.trim() !== "") {
            validateField(input);
          } else {
            clearError(input);
          }
        });
      }
    });

    // Загружаем сохранённые данные при загрузке страницы
    loadFormData();
  });
})();
