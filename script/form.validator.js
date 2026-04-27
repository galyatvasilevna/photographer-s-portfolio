class FormValidator {
  constructor(formSelector, storage) {
    this.form = document.querySelector(formSelector);
    this.storage = storage;

    this.nameInput = this.form.querySelector('[name="name"]');
    this.emailInput = this.form.querySelector('[name="email"]');
    this.phoneInput = this.form.querySelector('[name="tel"]');
    this.messageInput = this.form.querySelector('[name="message"]');

    this.loadDraft();

    this.setupEvents();
  }

  setupEvents() {
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.handleSubmit();
    });

    // Сохраняем данные при вводе и убираем ошибки при фокусе
    let inputs = [
      this.nameInput,
      this.emailInput,
      this.phoneInput,
      this.messageInput,
    ];

    for (let i = 0; i < inputs.length; i++) {
      let input = inputs[i];

      input.addEventListener("input", () => {
        this.saveDraft();
      });

      input.addEventListener("focus", () => {
        this.hideError(input);
      });
    }
  }

  handleSubmit() {
    // Создаём сообщение и проверяем его
    let message = new ContactMessage(
      this.nameInput.value,
      this.emailInput.value,
      this.phoneInput.value,
      this.messageInput.value,
    );

    let errors = message.validate();
    this.hideAllErrors();

    if (Object.keys(errors).length > 0) {
      this.showErrors(errors);

      if (typeof Notification !== "undefined") {
        Notification.show("Исправьте ошибки в форме", true);
      }
      return;
    }

    console.log("Сообщение отправлено:", message.toJSON());
    this.form.reset();
    this.storage.remove("contactFormData");

    if (typeof Notification !== "undefined") {
      Notification.show("Сообщение отправлено!", false);
    }
  }

  showErrors(errors) {
    // Показываем ошибки для каждого поля
    if (errors.name) this.showFieldError(this.nameInput, errors.name);
    if (errors.email) this.showFieldError(this.emailInput, errors.email);
    if (errors.phone) this.showFieldError(this.phoneInput, errors.phone);
    if (errors.message) this.showFieldError(this.messageInput, errors.message);
  }

  showFieldError(input, message) {
    input.classList.add("error");

    let errorSpan = input.parentElement.querySelector(".error-message");
    if (!errorSpan) {
      errorSpan = document.createElement("span");
      errorSpan.className = "error-message";
      input.parentElement.appendChild(errorSpan);
    }

    errorSpan.textContent = message;
  }

  hideError(input) {
    input.classList.remove("error");

    let errorSpan = input.parentElement.querySelector(".error-message");
    if (errorSpan) errorSpan.remove();
  }

  hideAllErrors() {
    this.hideError(this.nameInput);
    this.hideError(this.emailInput);
    this.hideError(this.phoneInput);
    this.hideError(this.messageInput);
  }

  saveDraft() {
    let draft = {
      name: this.nameInput.value,
      email: this.emailInput.value,
      phone: this.phoneInput.value,
      message: this.messageInput.value,
    };

    this.storage.set("contactFormData", draft);
  }

  loadDraft() {
    let draft = this.storage.get("contactFormData");

    if (draft) {
      if (draft.name) this.nameInput.value = draft.name;
      if (draft.email) this.emailInput.value = draft.email;
      if (draft.phone) this.phoneInput.value = draft.phone;
      if (draft.message) this.messageInput.value = draft.message;
    }
  }
}
