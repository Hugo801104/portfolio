function getLangFromURLorStorage() {
  const params = new URLSearchParams(window.location.search);
  const urlLang = params.get('lang');
  if (urlLang) {
    localStorage.setItem('language', urlLang);
    return urlLang;
  }
  return localStorage.getItem('language') || 'fr';
}

function setLanguage(lang) {
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    const translation = translations[lang][key];
    if (translation) {
      if (el.tagName === "P" || el.tagName === "DIV" || el.tagName === "H3" || el.tagName === "H4") {
        el.innerHTML = translation;
      } else {
        el.textContent = translation;
      }
    }
  });
  document.documentElement.lang = lang;
}

document.addEventListener('DOMContentLoaded', () => {
  const lang = getLangFromURLorStorage();
  setLanguage(lang);

  const select = document.getElementById('language-select');
  if (select) {
    select.value = lang;
    select.addEventListener('change', () => {
      const selectedLang = select.value;
      localStorage.setItem('language', selectedLang);
      const url = new URL(window.location.href);
      url.searchParams.set('lang', selectedLang);
      window.location.href = url.pathname + url.search;
    });
  }

  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (
      href &&
      !href.startsWith('http') &&
      !href.startsWith('#') &&
      !href.includes('lang=')
    ) {
      const url = new URL(href, window.location.origin);
      url.searchParams.set('lang', lang);
      link.setAttribute('href', url.pathname + url.search);
    }
  });
});
