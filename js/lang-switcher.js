function getLangFromStorageOrDefault() {
  return localStorage.getItem('language') || 'fr';
}

function setLanguage(lang) {
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    const translation = translations[lang][key];
    if (translation) {
        el.innerHTML = translation;
    }
  });
  document.documentElement.lang = lang;
}

document.addEventListener('DOMContentLoaded', () => {
  const lang = getLangFromStorageOrDefault();
  setLanguage(lang);

  const select = document.getElementById('language-select');
  if (select) {
    select.value = lang;
    select.addEventListener('change', () => {
      const selectedLang = select.value;
      localStorage.setItem('language', selectedLang);
      setLanguage(selectedLang);
    });
  }

});
