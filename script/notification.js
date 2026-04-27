class Notification {
  static show(message, isError = false) {
    let el = document.querySelector(".global-notification");
    if (el) el.remove();
    el = document.createElement("div");
    el.className = "global-notification";
    el.textContent = message;
    el.style.cssText = `
      position: fixed; 
      bottom: 20px; 
      right: 20px; 
      max-width: 350px;
      padding: 15px 20px; 
      border-radius: 10px; 
      z-index: 9999;
      background: ${isError ? "#f8d7da" : "#d4edda"};
      color: ${isError ? "#721c24" : "#155724"};
      border-left: 4px solid ${isError ? "#dc3545" : "#28a745"};
      font-family: 'Montserrat', sans-serif; 
      font-size: 14px;
      animation: slideInRight 0.3s ease;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    document.body.appendChild(el);
    setTimeout(() => {
      el.style.animation = "slideOutRight 0.3s ease";
      setTimeout(() => {
        if (el.parentNode) el.remove();
      }, 300);
    }, 4000);
  }
}
