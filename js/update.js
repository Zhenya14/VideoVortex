
const APP_VERSION = "7.2.0";

function clearLocalStorageExceptAuth() {
    const keepPrefixes = [
        "firebase:authUser:",
        "firebase:authEvent:",
        "firebase:previous_websocket_failure",
        "firebase:heartbeat"
    ];

    Object.keys(localStorage).forEach(key => {
        const keep = keepPrefixes.some(prefix => key.startsWith(prefix));

        if (!keep) {
            localStorage.removeItem(key);
        }
    });
}
function isNewVersion(current, saved) {

    const currentParts =
        current.split(".").map(Number);

    const savedParts =
        saved.split(".").map(Number);

    for (
        let i = 0;
        i < Math.max(currentParts.length, savedParts.length);
        i++
    ) {

        const c = currentParts[i] || 0;
        const s = savedParts[i] || 0;

        if (c > s) return true;
        if (c < s) return false;
    }

    return false;
}

function checkUpdateButton() {

    const lastVersion =
        localStorage.getItem("lastUpdateVersion") || "0.0.0";

    const updateBtn =
        document.getElementById("update-app-btn");

    if (!updateBtn) return;

    if (isNewVersion(APP_VERSION, lastVersion)) {

        updateBtn.style.display = "block";

    } else {

        updateBtn.style.display = "none";
    }
}

function updateMenuPosition() {

    const updateBtn =
        document.getElementById("update-app-btn");

    const smartMenu =
        document.querySelector(".smart-menu");

    const btnGlass =
        document.getElementById("plus-button");

    if (
        !updateBtn ||
        !btnGlass ||
        !smartMenu
    ) return;

    if (updateBtn.style.display !== "none") {

        smartMenu.style.bottom = "30px";
        btnGlass.style.bottom = "60px";

    } else {

        smartMenu.style.bottom = "10px";
        btnGlass.style.bottom = "20px";
    }
}

window.addEventListener("DOMContentLoaded", () => {

    checkUpdateButton();

    updateMenuPosition();
});

function showUpdateButton() {

    const btn =
        document.getElementById("update-app-btn");

    if (!btn) return;

    btn.style.display = "block";

    updateMenuPosition();
}

function hideUpdateButton() {

    const btn =
        document.getElementById("update-app-btn");

    if (!btn) return;

    btn.style.display = "none";

    updateMenuPosition();
}

document
    .getElementById("update-app-btn")
    ?.addEventListener("click", () => {

        clearLocalStorageExceptAuth();

        localStorage.setItem(
            "lastUpdateAt",
            new Date().toISOString()
        );

        localStorage.setItem(
            "lastUpdateVersion",
            APP_VERSION
        );

        hideUpdateButton();

        location.reload();
    });