let translations = {};
let currentLang = "ua";

async function loadLanguage(lang) {
    currentLang = lang;

    try {
        const res = await fetch(`${lang}.json`);
        if (!res.ok) throw new Error("Language file not found");

        translations = await res.json();

        localStorage.setItem("language", lang);
        applyTranslations();
    } catch (e) {
        console.error("Failed to load language:", e);

        // fallback (щоб нічого не зламалось)
        translations = {};
    }
}

function applyTranslations(root = document) {
    if (!translations) return;

    const textNodes = root.querySelectorAll("[data-i18n]");
    for (const el of textNodes) {
        const key = el.dataset.i18n;
        const value = translations[key];

        if (value != null) {
            el.textContent = value;
        }
    }

    const placeholders = root.querySelectorAll("[data-i18n-placeholder]");
    for (const el of placeholders) {
        const key = el.dataset.i18nPlaceholder;
        const value = translations[key];

        if (value != null) {
            el.placeholder = value;
        }
    }
}

function initLanguageSwitcher(selectId) {
    const select = document.getElementById(selectId);
    if (!select) return;

    const savedLang = localStorage.getItem("language") || select.value || "ua";

    select.value = savedLang;
    loadLanguage(savedLang);

    select.addEventListener("change", (e) => {
        loadLanguage(e.target.value);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const savedLang = localStorage.getItem("language") || "ua";
    loadLanguage(savedLang);
});