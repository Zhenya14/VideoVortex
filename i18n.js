let translations = {};

async function loadLanguage(lang) {
    translations = await fetch(`${lang}.json`).then(r => r.json());
    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (translations[key]) el.innerText = translations[key];
    });
    localStorage.setItem("language", lang); // зберігаємо вибір
}

function initLanguageSwitcher(selectId) {
    const select = document.getElementById(selectId);
    if (!select) return;

    // Завантажуємо останню обрану мову або дефолт
    const savedLang = localStorage.getItem("language") || select.value;
    select.value = savedLang;
    loadLanguage(savedLang);

    select.addEventListener("change", e => loadLanguage(e.target.value));
}