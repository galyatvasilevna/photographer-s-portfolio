class ContactMessage {
  constructor(name, email, phone, message) {
    this.name = name.trim();
    this.email = email.trim();
    this.phone = phone.trim();
    this.message = message.trim();
  }

  // Проверяет все поля и возвращает список ошибок
  validate() {
    let errors = {};

    if (this.name.length < 2) {
      errors.name = "Имя должно быть не короче 2 символов";
    }

    if (this.email.includes("@") === false) {
      errors.email = "Неправильный email";
    }
    if (this.email.includes(".") === false) {
      errors.email = "Неправильный email";
    }
    if (this.email.length < 5) {
      errors.email = "Email слишком короткий";
    }

    if (this.phone.length > 0) {
      let onlyDigits = "";
      for (let i = 0; i < this.phone.length; i++) {
        let char = this.phone[i];
        if (char >= "0" && char <= "9") {
          onlyDigits = onlyDigits + char;
        }
      }

      if (onlyDigits.length < 10) {
        errors.phone = "В номере телефона должно быть минимум 10 цифр";
      }
      if (onlyDigits.length > 15) {
        errors.phone = "Слишком длинный номер телефона";
      }
    }

    if (this.message.length < 10) {
      errors.message = "Сообщение должно быть не короче 10 символов";
    }

    return errors;
  }

  // Превращает сообщение в простой объект для отправки
  toJSON() {
    let data = {
      name: this.name,
      email: this.email,
      phone: this.phone,
      message: this.message,
      time: new Date().toLocaleString(),
    };

    return data;
  }
}
