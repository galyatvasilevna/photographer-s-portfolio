class StorageService {
  constructor(prefix) {
    if (!prefix) prefix = "photostudio_";
    this.prefix = prefix;
  }

  set(key, value) {
    try {
      let json = JSON.stringify(value);
      localStorage.setItem(this.prefix + key, json);
      return true;
    } catch (e) {
      console.warn("Ошибка сохранения:", e);
      return false;
    }
  }

  get(key, defaultValue) {
    try {
      let json = localStorage.getItem(this.prefix + key);
      if (json === null) return defaultValue;
      return JSON.parse(json);
    } catch (e) {
      console.warn("Ошибка загрузки:", e);
      return defaultValue;
    }
  }

  remove(key) {
    localStorage.removeItem(this.prefix + key);
  }

  clear() {
    for (let i = localStorage.length - 1; i >= 0; i--) {
      let key = localStorage.key(i);
      if (key.startsWith(this.prefix)) {
        localStorage.removeItem(key);
      }
    }
  }
}
