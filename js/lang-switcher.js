function setLanguage(lang) {
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    const translation = translations[lang][key];
    if (translation) {
      el.textContent = translation;
    }
  });

  document.documentElement.lang = lang;
}

document.addEventListener('DOMContentLoaded', () => {
  const select = document.getElementById('language-select');
  const storedLang = localStorage.getItem('language') || 'fr';
  select.value = storedLang;
  setLanguage(storedLang);

  select.addEventListener('change', () => {
    const selectedLang = select.value;
    setLanguage(selectedLang);
    localStorage.setItem('language', selectedLang);
  });
});
