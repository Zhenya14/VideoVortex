  const messageNotification = document.getElementById("message-ai");
  const notificationAI = document.getElementById("notification-ai-modal");
let currentEditKey = null;
let maxTimeInMinutes = null;
let timeLeftInSeconds = null;
let sleepStart = null;
let sleepEnd = null;
let userAge = null;

 // Конвертуємо час в секунди
    let currentUser = null;
let currentUserEmail = null;
let currentUserRole = "user";
let currentUserStatus = "active";
    let showNSFW = false; // Track whether the user wants to view NSFW content

firebase.initializeApp({
  apiKey: "AIzaSyBkPYP3bnDy61NFjRSboRZrfTVNTdIMWbY",
  authDomain: "videovortex-235cd.firebaseapp.com",
  databaseURL: "https://videovortex-235cd-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "videovortex-235cd",
  storageBucket: "videovortex-235cd.appspot.com",
  messagingSenderId: "681594250269",
  appId: "1:681594250269:web:1176b21fcc8fe2a7d052f4"
});
const auth = firebase.auth();
const database = firebase.database();
const storage = firebase.storage();
const messaging = firebase.messaging();

function showNotificationAIModal() {
  notificationAI.style.display = "flex";
}
function closeNotificationAIModal() {
  notificationAI.style.display = "none";
}
async function generateDescription() {
  const textTitle = document.getElementById("video-title");
  const description = document.getElementById("video-description");
  const language =
        document.getElementById("language-select").value;
  const text = textTitle.value?.trim();

  if (!text) {
      showNotificationAIModal();
    messageNotification.innerHTML = "Введи назву.";
    return;
  }

 description.value = "⏳ Генерується...";

  let response;

  try {
    response = await fetch(
      "https://us-central1-videovortex-235cd.cloudfunctions.net/generateDescription",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          text,
          language
          
        }),
      }
    );
  } catch (networkError) {
    console.error("NETWORK ERROR:", networkError);
    description.value = "❌ Network error (CORS / function down)";
    return;
  }

  // 🔴 якщо HTTP помилка (400/500)
  const raw = await response.text();

  let data;
  try {
    data = JSON.parse(raw);
  } catch (e) {
    console.error("NON-JSON RESPONSE:", raw);
    description.value = "❌ Invalid server response";
    return;
  }

  if (!response.ok) {
    console.error("SERVER ERROR:", data);
    description.value = "❌ Server error: " + (data.error || raw);
    return;
  }

  if (!data?.result) {
    console.error("BAD RESPONSE:", data);
    description.value = "❌ Empty AI response";
    return;
  }

  description.value = data.result;
}

function randomGradient() {

const gradients = [

/* Сині — темні, контрастні */
"linear-gradient(135deg,#0f2027,#2c5364,#00c9ff)",
"linear-gradient(135deg,#141e30,#243b55)",
"linear-gradient(135deg,#1e3c72,#2a5298)",

/* Червоні — глибокі (краще читається білий текст) */
"linear-gradient(135deg,#200122,#6f0000)",
"linear-gradient(135deg,#8e0e00,#1f1c18)",
"linear-gradient(135deg,#cb2d3e,#0f0f0f)",

/* Помаранчеві — затемнені */
"linear-gradient(135deg,#e65c00,#1a1a1a)",
"linear-gradient(135deg,#ff512f,#dd2476,#1a1a1a)",
"linear-gradient(135deg,#2c3e50,#fd746c)",

/* Жовто-золоті — з темною базою */
"linear-gradient(135deg,#1a1a1a,#f7971e,#ffd200)",
"linear-gradient(135deg,#2b2b2b,#f9d423)",
"linear-gradient(135deg,#000000,#b79891,#94716b)",

/* Зелені — темні tech-style */
"linear-gradient(135deg,#0f9b0f,#000000)",
"linear-gradient(135deg,#134e5e,#71b280)",
"linear-gradient(135deg,#1c1c1c,#00c853)",

/* Фіолетові — premium/dark */
"linear-gradient(135deg,#0f0c29,#302b63,#24243e)",
"linear-gradient(135deg,#1b1b2f,#53354a,#903749)",
"linear-gradient(135deg,#4a00e0,#8e2de2,#0f0f0f)",

/* Рожеві — але затемнені (не “цукеркові”) */
"linear-gradient(135deg,#20002c,#cbb4d4)",
"linear-gradient(135deg,#0f0f0f,#ff0844,#ffb199)",
"linear-gradient(135deg,#4b134f,#c94b4b)",

/* Бірюзові / tech */
"linear-gradient(135deg,#000000,#0f9b0f,#00c9ff)",
"linear-gradient(135deg,#1d4350,#243b55,#a43931)",
"linear-gradient(135deg,#0f2027,#203a43,#2c5364)",

/* Темні (найкраща читабельність білого тексту) */
"linear-gradient(135deg,#000000,#434343)",
"linear-gradient(135deg,#141414,#1f1f1f,#3a3a3a)",
"linear-gradient(135deg,#0a0a0a,#2c2c2c)",

];

return gradients[Math.floor(Math.random()*gradients.length)];

}
function march8Banner() {
    const d = new Date();

    if (!(d.getDate() === 8 && d.getMonth() === 2)) return;
    if (localStorage.getItem("march8banner")) return;

    const banner = document.getElementById("march8-banner");

    if (!banner) return;

    setTimeout(() => {
        banner.classList.add("show");
    }, 1500);

    localStorage.setItem("march8banner", "shown");

    const closeBtn = document.getElementById("march8-close");

    if (closeBtn) {
        closeBtn.onclick = () => {
            banner.classList.remove("show");
        };
    }

    const uploadBtn = document.getElementById("march8-upload");

    if (uploadBtn) {
        uploadBtn.onclick = () => {
            const modal = document.getElementById("upload-modal");

            if (modal) modal.style.display = "flex";
        };
    }
}

march8Banner();

function flowersEffect() {
    const d = new Date();

    if (!(d.getDate() === 8 && d.getMonth() === 2)) return;

    const container = document.getElementById("flowers-container");

    if (!container) return;

    const interval = setInterval(() => {

        const flower = document.createElement("div");

        flower.className = "flower";
        flower.textContent = "🌸";

        flower.style.left = Math.random() * 100 + "vw";
        flower.style.animationDuration =
            (3 + Math.random() * 4) + "s";

        container.appendChild(flower);

        setTimeout(() => {
            flower.remove();
        }, 8000);

    }, 300);

    setTimeout(() => {
        clearInterval(interval);
    }, 20000);
}

flowersEffect();

function easterBanner() {
    const d = new Date();

    if (!(d.getDate() === 8 && d.getMonth() === 2)) return;
    if (localStorage.getItem("easterBanner")) return;

    const banner = document.getElementById("easter-banner");

    if (!banner) return;

    setTimeout(() => {
        banner.classList.add("show");
    }, 1500);

    localStorage.setItem("easterBanner", "shown");

    const closeBtn = document.getElementById("easter-close");

    if (closeBtn) {
        closeBtn.onclick = () => {
            banner.classList.remove("show");
        };
    }

    const uploadBtn = document.getElementById("easter-upload");

    if (uploadBtn) {
        uploadBtn.onclick = () => {
            const modal = document.getElementById("upload-modal");

            if (modal) modal.style.display = "flex";
        };
    }
}

easterBanner();

function sEffect() {
    const d = new Date();

    if (!(d.getDate() === 12 && d.getMonth() === 3)) return;

    const container = document.getElementById("easter-container");

    if (!container) return;

    const interval = setInterval(() => {

        const effect = document.createElement("div");

        effect.className = "effect";
        effect.textContent = "🌸🐣";

        effect.style.left = Math.random() * 100 + "vw";
        effect.style.animationDuration =
            (3 + Math.random() * 4) + "s";

        container.appendChild(effect);

        setTimeout(() => {
            effect.remove();
        }, 8000);

    }, 300);

    setTimeout(() => {
        clearInterval(interval);
    }, 20000);
}

flowersEffect();

let storyBlob = null;
let stream = null;
let cameraActive = false;
let selectedStoryFile = null;

async function openCamera() {
  if (cameraActive) return;
  const bgGlassClose = document.getElementById("smart-menu");
  const btnGlassClose = document.querySelector(".btn-liquid-glass");
  const camera = document.getElementById("story-camera");
  const video = document.getElementById("cameraPreview");

  camera.style.display = "block";
  bgGlassClose.style.display = "none";
  btnGlassClose.style.display = "none";

  stream = await navigator.mediaDevices.getUserMedia({
    video: { facingMode: "environment" },
    audio: false
  });

  video.srcObject = stream;
  await video.play();
  cameraActive = true;
}
function captureStop() {
  document.getElementById("story-camera").style.display = "none";
  document.getElementById("smart-menu").style.display = "flex";
  document.getElementById("plus-button").style.display = "flex";
}


document.getElementById("galleryInput").addEventListener("change", (e) => {

    const file = e.target.files[0];
    if (!file) return;

    selectedStoryFile = file;
    previewStory(file);

});

let currentStoryFile = null;
let storyPreviewURL = null;
function openGallery() {
    document.getElementById("galleryInput").click();
}

function previewStory(file) {

    const container = document.getElementById("story-camera");
    const preview = document.getElementById("storyPreview");
    const camera = document.getElementById("cameraPreview");

    const bgGlassClose = document.getElementById("smart-menu");
    const btnGlassClose = document.getElementById("plus-button");

    // Зберігаємо поточний файл
    currentStoryFile = file;

    // Показуємо вікно Story
    container.style.display = "block";

    if (bgGlassClose) {
        bgGlassClose.style.display = "none";
    }

    if (btnGlassClose) {
        btnGlassClose.style.display = "none";
    }

    // Зупиняємо камеру, якщо вона працювала
    if (camera.srcObject) {
        camera.srcObject.getTracks().forEach(track => track.stop());
        camera.srcObject = null;
    }

    camera.style.display = "none";

    // Очищаємо тільки область прев'ю
    preview.innerHTML = "";

    // Видаляємо старий ObjectURL
    if (storyPreviewURL) {
        URL.revokeObjectURL(storyPreviewURL);
    }

    storyPreviewURL = URL.createObjectURL(file);

    // =========================
    // ФОТО
    // =========================

    if (file.type.startsWith("image/")) {

        const img = document.createElement("img");

        img.src = storyPreviewURL;

        img.style.width = "100%";
        img.style.height = "100%";
        img.style.objectFit = "cover";

        preview.appendChild(img);
    }

    // =========================
    // ВІДЕО
    // =========================

    else if (file.type.startsWith("video/")) {

        const video = document.createElement("video");

        video.src = storyPreviewURL;
        video.autoplay = true;
        video.loop = true;
        video.muted = true;
        video.playsInline = true;
        video.controls = false;

        video.style.width = "100%";
        video.style.height = "100%";
        video.style.objectFit = "cover";

        preview.appendChild(video);

        video.play().catch(error => {
            console.error("Не вдалося відтворити відео:", error);
        });
    }

    else {
        console.error("Непідтримуваний тип файлу:", file.type);
        return;
    }

    console.log("Preview ready:", file.name);
}
async function publishStory() {
  const user = firebase.auth().currentUser;
  if (!user || !selectedStoryFile) return;
const uid = user.uid;
  const storyId = Date.now().toString();
  try {
    
    const snapshot = await database.ref("users/" + uid).once("value");
    const userData = snapshot.val() || {};

    let authorName;
    let authorAvatarUrl = null;

      authorName =
        `${userData.name || ""} ${userData.supername || ""}`.trim();

      const mainAvatar = userData.avatarId;

      if (mainAvatar) {
        try {
          authorAvatarUrl =
            await storage.ref(`avatars/${mainAvatar}.webp`).getDownloadURL();
        } catch {}
      }
  // STORAGE
  const ref = firebase.storage()
    .ref(`stories/${storyId}`);

  await ref.put(selectedStoryFile);

  const url = await ref.getDownloadURL();

  // DATABASE
  await firebase.database().ref(`stories/${storyId}`).set({
    uid: uid,
    url: url,
    name: authorName,
    authorColor: userData.color,
    avatar: authorAvatarUrl,
    type: selectedStoryFile.type.startsWith("video") ? "video" : "image",
    createdAt: Date.now(),
    expiresAt: Date.now() + 24 * 60 * 60 * 1000
  });

  selectedStoryFile = null;

  alert("Story опубліковано ✅");
  captureStop();
} catch (err) {
    console.error("Помилка при отриманні даних користувача:", err);
    showNotificationModal();
    message.innerHTML = "Не вдалося отримати дані профілю." + err.message;
  }
}

// Рендер прев’ю фото
function renderPhotoPreviews() {
  const grid = document.getElementById("photoPreviewGrid");
  grid.innerHTML = "";

  selectedPhotos.forEach((file, index) => {
    const url = URL.createObjectURL(file);

    const div = document.createElement("div");
    div.className = "media-item";

    div.innerHTML = `
      <img src="${url}">
      <button class="remove-btn" onclick="removePhoto(${index})">✕</button>
    `;

    grid.appendChild(div);
  });
}

function removePhoto(i) {
  selectedPhotos.splice(i, 1);
  renderPhotoPreviews();
}

// Рендер прев’ю відео
function renderVideoPreviews() {
  const grid = document.getElementById("videoPreviewGrid");
  grid.innerHTML = "";

  selectedVideos.forEach((file, index) => {
    const url = URL.createObjectURL(file);

    const div = document.createElement("div");
    div.className = "media-item";

    div.innerHTML = `
      <video src="${url}" muted></video>
      <button class="remove-btn" onclick="removeVideo(${index})">✕</button>
    `;

    grid.appendChild(div);
  });
}

function removeVideo(i) {
  selectedVideos.splice(i, 1);
  renderVideoPreviews();
}
          const searchBox = document.getElementById("search-box");
const closeSearch = document.getElementById("close-search");
const searchInput = document.getElementById("search-input");

function openSearch() {
    searchBox.classList.add("open");
document.querySelector("nav").style.display = "none";
document.querySelector(".tab").style.display = "none";
document.querySelector(".stories-bar").style.display = "none";
    setTimeout(() => searchInput.focus(), 150);
}

closeSearch.addEventListener("click", () => {
    searchBox.classList.remove("open");
    document.querySelector("nav").style.display = "flex";
    document.querySelector(".tab").style.display = "flex";
document.querySelector(".stories-bar").style.display = "flex";
    searchInput.value = "";
    searchAll();
});
async function searchAll() {
    const input = document.getElementById("search-input");
    if (!input) return;

    const query = input.value.toLowerCase().trim();

    // =========================
    // 🔎 ПОШУК ВІДЕО
    // =========================

    const videos = document.querySelectorAll(".video-item");

    videos.forEach(video => {
        const title = (video.dataset.title || "").toLowerCase();
        const description = (video.dataset.description || "").toLowerCase();
        const author = (video.dataset.author || "").toLowerCase();

        const matches =
            !query ||
            title.includes(query) ||
            description.includes(query) ||
            author.includes(query);

        const container = video.closest(".video-container");

        if (container) {
            container.style.display = matches ? "flex" : "none";
        }
    });

    // =========================
    // 👤 ПОШУК КОРИСТУВАЧІВ
    // =========================

    const usersContainer = document.getElementById("search-users");
    if (!usersContainer) return;

    usersContainer.innerHTML = "";

    if (!query) return;

    try {
        const snapshot = await database.ref("publicUsers").once("value");
        const users = snapshot.val() || {};

        Object.entries(users).forEach(([uid, user]) => {

            const name = (user.name || "").toLowerCase();
            const supername = (user.supername || "").toLowerCase();
            const username = (user.username || "").toLowerCase();

            const matches =
                name.includes(query) ||
                supername.includes(query) ||
                username.includes(query);

            if (!matches) return;

            const userElement = document.createElement("div");
            userElement.className = "search-user";

            userElement.innerHTML = `
                <div class="search-user-name">
                    ${sanitizeHTML(user.name || "")}
                    ${sanitizeHTML(user.supername || "")}
                </div>

                ${
                    user.username
                        ? `<div class="search-user-username">
                            @${sanitizeHTML(user.username)}
                           </div>`
                        : ""
                }

                ${
                    user.privateProfile
                        ? `<span>🔒 Приватний профіль</span>`
                        : ""
                }
            `;

            userElement.onclick = () => {
                window.location.href =
                    `profile.html?uid=${encodeURIComponent(uid)}`;
            };

            usersContainer.appendChild(userElement);
        });

    } catch (error) {
        console.error("Помилка пошуку користувачів:", error);
    }
}

     const prewiewInput = document.getElementById("action-btn");     
     const imgPrewiew = document.querySelector(".image-container img");
     prewiewInput.addEventListener('change', () => {
    // Перевіряємо через тернарний оператор, чи файл обрано
    const file = prewiewInput.files.length ? prewiewInput.files[0] : null;
    
    if (file) {
        // Створюємо тимчасовий URL для локального файлу
        const objectURL = URL.createObjectURL(file);
        
        // Замінюємо старе фото на нове у вікні редагування
        imgPrewiew.src = objectURL;
    }
});
        

document.addEventListener("DOMContentLoaded", () => {
    const previewWallpapersProfileInput = document.getElementById("set-wallpaper-profile");
    const imgPreview = document.querySelector(".profile-header");

    if (!previewWallpapersProfileInput || !imgPreview) {
        console.log("Елемент не знайдено");
        return;
    }

    previewWallpapersProfileInput.addEventListener("change", () => {
        const file = previewWallpapersProfileInput.files[0];

        if (file) {
            const objectURL = URL.createObjectURL(file);
            imgPreview.style.backgroundImage = `url("${objectURL}")`;
            imgPreview.style.backgroundSize = "cover";
            imgPreview.style.backgroundPosition = "center";
        }
    });
});

        
const fileInput = document.getElementById("photo-file");
const fileName = document.getElementById("file-name");

fileInput.addEventListener("change", () => {
  const name = fileInput.files.length ? fileInput.files[0].name : "Файл не вибрано";
  fileName.textContent = "📸 " + name;
});

        
const videoInput = document.getElementById("video-file");
const videofileName = document.getElementById("video-file-name");

videoInput.addEventListener("change", () => {
  const name = videoInput.files.length ? videoInput.files[0].name : "Файл не вибрано";
  videofileName.textContent = "📽 " + name;
});



function isMobile() {
  return window.innerWidth <= 968;
}

function showTgPopup() {
  if (!localStorage.getItem("tg_popup_seen") && isMobile()) {
    document.getElementById("tg-popup").classList.remove("hidden");
  }
}

function closeTgPopup() {
  document.getElementById("tg-popup").classList.add("hidden");
  localStorage.setItem("tg_popup_seen", "1");
}

window.addEventListener("load", () => {
  setTimeout(showTgPopup, 1500);
});


let logoClickCount = 0;
let logoClickTimer = null;
let EggTimeout = null;
let snowInterval = null;

document.addEventListener("DOMContentLoaded", () => {
  const today = new Date();
  const month = today.getMonth() + 1;
  const day = today.getDate();

  const logo = document.getElementById("logo");

  /* ================= HALLOWEEN ================= */
  if (month === 10 && (day === 30 || day === 31)) {
    activateHalloweenMode();
    applyIcons(halloweenIcons);
  }

  if (month === 11 && day === 1) {
    deactivateHalloweenMode();
    restoreIcons();
  }

  /* ================= NEW YEAR ================= */
  const isNewYear =
    (month === 12 && day >= 15) ||
    (month === 1 && day <= 25);

  if (isNewYear) {
    activateGirland();
    activateNewYearMode();
    applyIcons(newyearIcons);

    if (logo && !logo.dataset.Bound) {
      logo.dataset.Bound = "true";

      let logoClickCount = 0;
      let logoClickTimer = null;

      logo.addEventListener("click", () => {
        logoClickCount++;

        clearTimeout(logoClickTimer);

        logoClickTimer = setTimeout(() => {
          logoClickCount = 0;
        }, 1200);

        if (logoClickCount === 3) {
          logoClickCount = 0;
          launchNewYearEgg();
        }
      });
    }

  } else {
    deactivateGirland();
    deactivateNewYearMode();
    restoreIcons();
  }

  /* ================= VALENTINE (OVERRIDE LAYER) ================= */
  const isValentine = month === 2 && (day === 13 || day === 14);
  const isIndependenceUkraine = month === 8 && (day === 23 || day === 24);
const isVyshyvanka = month === 5 && (day === 20 || day === 21);
  if (isValentine) {
    applyIcons(valentineIcons);
  }
  if (isVyshyvanka) {
    activateVyshyvankaMode();
    applyIcons(vyshyvankaIcons);
  } else {
    deactivateVyshyvankaMode();
    restoreIcons();
  }
  if (isIndependenceUkraine) {
    activateIndepedenceMode();
    applyIcons(independenceIcons);
  } else {
    deactivateIndepedenceMode();
    restoreIcons();
  }
  const is = (month === 4 && day >= 10  && day <= 25);
  // 🔔  egg по потрійному кліку на логотип
  if (is) {
    applyIcons(Icons);
  }
});


/* ================================
   🎃 HALLOWEEN
   ================================ */
function activateHalloweenMode() {
  document.body.classList.add("halloween");
  console.log("🎃 Halloween увімкнено!");
  styleButtons("#ff7518", "black");

  for (let i = 0; i < 5; i++) {
    const bat = document.createElement("div");
    bat.className = "bat";
    bat.textContent = "🦇";
    bat.style.position = "fixed";
    bat.style.top = Math.random() * 80 + "%";
    bat.style.left = Math.random() * 100 + "%";
    bat.style.fontSize = Math.random() * 30 + 20 + "px";
    bat.style.opacity = 0.8;
    bat.style.zIndex = 9999;
    document.body.appendChild(bat);
  }

  const fog = document.createElement("div");
  fog.className = "fog";
  fog.style.position = "fixed";
  fog.style.top = "0";
  fog.style.left = "0";
  fog.style.width = "100%";
  fog.style.height = "100%";
  fog.style.background =
    "radial-gradient(circle, rgba(255,165,0,0.1), rgba(0,0,0,0.8))";
  fog.style.pointerEvents = "none";
  fog.style.zIndex = 999;
  document.body.appendChild(fog);
}

function deactivateHalloweenMode() {
  document.body.classList.remove("halloween");
  document.querySelectorAll(".bat, .fog").forEach(el => el.remove());
  resetButtonColors();
}

/* ================================
   🎄 NEW YEAR
   ================================ */
function activateGirland() {
  const girland = document.getElementById("girland");
  if (girland) {
    girland.style.display = "block";
    girland.classList.add("lightrope");
  }
}

function deactivateGirland() {
  const girland = document.getElementById("girland");
  if (girland) {
    girland.classList.remove("lightrope");
    girland.style.display = "none";
  }
}

function activateNewYearMode() {
  document.body.classList.add("newyear");
  console.log("🎄 Новий Рік увімкнено!");
  startSnow();

  const logo = document.getElementById("logo");
  if (logo && !logo.dataset.originalSrc) logo.dataset.originalSrc = logo.src;
  if (logo) logo.src = "VideoVortex_new_year's_logo.jpg";

  styleButtons("#b0e6ff", "#00344f");
}

function deactivateNewYearMode() {
  document.body.classList.remove("newyear");
  stopSnow();
closeNewYearPopup();
  const logo = document.getElementById("logo");
  if (logo && logo.dataset.originalSrc) logo.src = logo.dataset.originalSrc;

  resetButtonColors();
}
function activateVyshyvankaMode() {

  const logo = document.getElementById("logo");
  if (logo && !logo.dataset.originalSrc) logo.dataset.originalSrc = logo.src;
  if (logo) logo.src = "VideoVortex_logo_embriodery.jpg";

  styleButtons("#8B0000", "#1C1C1C");
}
function deactivateVyshyvankaMode() {
  
  const logo = document.getElementById("logo");
  if (logo && logo.dataset.originalSrc) logo.src = logo.dataset.originalSrc;

  resetButtonColors();
}
  function activateIndepedenceMode() {

  const logo = document.getElementById("logo");
  if (logo && !logo.dataset.originalSrc) logo.dataset.originalSrc = logo.src;
  if (logo) logo.src = "VideoVortex_logo_indepedence.jpg";

  styleButtons("#0057B7", "#FFDD00");
}

function deactivateIndepedenceMode() {
  
  const logo = document.getElementById("logo");
  if (logo && logo.dataset.originalSrc) logo.src = logo.dataset.originalSrc;

  resetButtonColors();
}
/* ================================
   ❄️ SNOWFALL &  Egg
   ================================ */
function startSnow() {
  if (snowInterval) return;

  snowInterval = setInterval(() => {
    const flake = document.createElement("div");
    flake.className = "snowflake";
    flake.textContent = ["❄️", "❅", "❆"][Math.floor(Math.random() * 3)];
    flake.style.position = "fixed";
    flake.style.left = Math.random() * 100 + "vw";
    flake.style.top = "-10px";
    flake.style.fontSize = Math.random() * 25 + 10 + "px";
    flake.style.opacity = Math.random() * 0.8 + 0.2;
    flake.style.animation = "fall 4s linear forwards";
    flake.style.pointerEvents = "none";
    flake.style.zIndex = 9999;
    document.body.appendChild(flake);
    setTimeout(() => flake.remove(), 5000);
  }, 150);
}

function stopSnow() {
  clearInterval(snowInterval);
  snowInterval = null;
  document.querySelectorAll(".snowflake").forEach(f => f.remove());
}

function launchNewYearEgg() {
  startSnow();

  const popup = document.getElementById("newyear--egg");
  if (!popup) return;

  popup.style.display = "flex";

  if (EggTimeout) {
    clearTimeout(EggTimeout);
  }

  EggTimeout = setTimeout(() => {
    popup.style.display = "none";
  }, 120000);
}
function closeNewYearPopup() {
const popupClose = document.getElementById("newyear--egg");
popupClose.style.display = "none";
}
/* ================================
   🔳 ICON SYSTEM
   ================================ */
const halloweenIcons = {
  "account-desktop-link": (user) => `🕸<span class="icon-text">${user.name} ${user.supername}</span>`,
  "register-link": "🕸",
  "logout-link": "🚪",
  "auth-link": `🚪<span data-i18n="signIn">Увійти</span>`,
  "smart-post": `👻<span data-i18n="post">Дописи</span>`,
  "smart-video": `🦇<span data-i18n="video">Відео</span>`,
  "smart-settings": `🧪<span data-i18n="settings">Налаштування</span>`,
  "settings": `🧪<span data-i18n="settings">Налаштування</span>`,
  "post": `👻<span data-i18n="post">Дописи</span>`,
  "video": `🦇<span data-i18n="video">Відео</span>`,
  "plus-button": `<i class="icon">🎃</i>`,
  "plus-desktop-button": "🎃"
};

const newyearIcons = {
  "account-desktop-link": (user) => `⛄<span class="icon-text">${user.name} ${user.supername}</span>`,
  "register-link": "⛄",
  "logout-link": "🚪",
  "auth-link": `🚪<span data-i18n="signIn">Увійти</span>`,
  "smart-post": `❄️<span data-i18n="post">Дописи</span>`,
  "smart-video": `🎬<span data-i18n="video">Відео</span>`,
  "smart-settings": `🎁<span data-i18n="settings">Налаштування</span>`,
    "settings": `🎁<span data-i18n="settings">Налаштування</span>`,
  "post": `❄️<span data-i18n="post">Дописи</span>`,
  "video": `🎬<span data-i18n="video">Відео</span>`,
  "plus-button": `<i class="icon">🎄</i>`,
  "plus-desktop-button": "🎄"
};
const valentineIcons = {
  "account-desktop-link": (user) =>
    `❤️<span class="icon-text">${user.name} ${user.supername}</span>`,
  "register-link": "💖",
  "logout-link": "🚪",
  "auth-link": `💘<span data-i18n="signIn">Увійти</span>`,
  "smart-post": `💌<span data-i18n="post">Дописи</span>`,
  "smart-video": `💞<span data-i18n="video">Відео</span>`,
  "smart-settings": `💌<span data-i18n="settings">Налаштування</span>`,
  "settings": `💌<span data-i18n="settings">Налаштування</span>`,
  "post": `💌<span data-i18n="post">Дописи</span>`,
  "video": `💞<span data-i18n="video">Відео</span>`,
  "plus-button": `<i class="icon">💝</i>`,
  "plus-desktop-button": "💝"
};
const Icons = {
  "account-desktop-link": (user) =>
    `🐣<span class="icon-text">${user.name} ${user.supername}</span>`,
  "register-link": "🥚",
  "logout-link": "🚪",
  "auth-link": `🐰<span data-i18n="signIn">Увійти</span>`,
  "smart-post": `🌸<span data-i18n="post">Дописи</span>`,
  "smart-video": `🐥<span data-i18n="video">Відео</span>`,
  "smart-settings": `🐣<span data-i18n="settings">Налаштування</span>`,
  "settings": `🐣<span data-i18n="settings">Налаштування</span>`,
  "post": `🌸<span data-i18n="post">Дописи</span>`,
  "video": `🐥<span data-i18n="video">Відео</span>`,
  "plus-button": `<i class="icon">🧺</i>`,
  "plus-desktop-button": "🧺"
};
const vyshyvankaIcons = {
  "account-desktop-link": (user) =>
    `🧵<span class="icon-text">${user.name} ${user.supername}</span>`,
  "register-link": "🪡",
  "logout-link": "🚪",
  "auth-link": `🧶<span data-i18n="signIn">Увійти</span>`,
  "smart-post": `🪢<span data-i18n="post">Дописи</span>`,
  "smart-video": `📽️<span data-i18n="video">Відео</span>`,
  "smart-settings": `🧵🪡<span data-i18n="settings">Налаштування</span>`,
    "settings": `🧵🪡<span data-i18n="settings">Налаштування</span>`,
  "post": `🪢<span data-i18n="post">Дописи</span>`,
  "video": `📽️<span data-i18n="video">Відео</span>`,
  "plus-button": `<i class="icon">🧿</i>`,
  "plus-desktop-button": "🧿"
};
const independenceIcons = {
  "account-desktop-link": (user) =>
    `🇺🇦<span class="icon-text">${user.name} ${user.supername}</span>`,
  "register-link": "💙💛",
  "logout-link": "🚪",
  "auth-link": `🕊️<span data-i18n="signIn">Увійти</span>`,
  "smart-post": `📝<span data-i18n="post">Дописи</span>`,
  "smart-video": `📹<span data-i18n="video">Відео</span>`,
  "smart-settings": `💙💛🕊️<span data-i18n="settings">Налаштування</span>`,
  "settings": `💙💛🕊️<span data-i18n="settings">Налаштування</span>`,
  "post": `📝<span data-i18n="post">Дописи</span>`,
  "video": `📹<span data-i18n="video">Відео</span>`,
  "plus-button": `<i class="icon">🌾</i>`,
  "plus-desktop-button": "🌾",
  "logo-text": "VideoVortex 💙💛"
};
function applyIcons(set, user = null) {
  for (const [id, icon] of Object.entries(set)) {
    const el = document.getElementById(id);
    if (!el) continue;

    if (!el.dataset.originalHtml) {
      el.dataset.originalHtml = el.innerHTML;
    }

    el.querySelectorAll("i.material-symbols, .material-symbols").forEach(i => i.remove());

    if (typeof icon === "function") {
      if (!user) continue;
      el.innerHTML = icon(user);
      continue;
    }

    el.innerHTML = icon;
  }
}

function restoreIcons() {
  document.querySelectorAll("[data-original-html]").forEach(el => {
    el.innerHTML = el.dataset.originalHtml;
  });
}

/* ================================
   🎨 BUTTON COLORS
   ================================ */
function styleButtons(bg, color) {
  document.querySelectorAll("button, .btn").forEach(btn => {
    btn.dataset.originalBg = btn.style.backgroundColor;
    btn.dataset.originalColor = btn.style.color;
    btn.style.backgroundColor = bg;
    btn.style.color = color;
  });
}

function resetButtonColors() {
  document.querySelectorAll("button, .btn").forEach(btn => {
    if (btn.dataset.originalBg) btn.style.backgroundColor = btn.dataset.originalBg;
    if (btn.dataset.originalColor) btn.style.color = btn.dataset.originalColor;
  });
}

  
          let deferredPrompt;
const installBtn = document.getElementById('installBtn');

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();  // Забираємо стандартний банер
  deferredPrompt = e;   // Зберігаємо подію для виклику пізніше
  installBtn.style.display = 'flex'; // Показуємо кнопку
});

installBtn.addEventListener('click', async () => {
  installBtn.style.display = 'none'; // Ховаємо кнопку після кліку
  if (deferredPrompt) {
    deferredPrompt.prompt();          // Показуємо системний діалог встановлення
    const choiceResult = await deferredPrompt.userChoice;
    deferredPrompt = null;
    console.log('Встановлення: ', choiceResult.outcome);
  }
});
function showRulesModal() {
  const modal = document.getElementById("rules-update-modal");
  const lastAccepted = localStorage.getItem("rules_version");
  const currentVersion = "2025-10";

  if (lastAccepted !== currentVersion) {
    modal.style.display = "flex";
  }
}

function acceptRulesUpdate() {
  localStorage.setItem("rules_version", "2025-10");
  document.getElementById("rules-update-modal").style.display = "none";
}

window.addEventListener("load", showRulesModal);

const modal = document.getElementById("upload-modal");
const accountModal = document.getElementById("account-modal");
const editModal = document.getElementById("edit-modal");
const editWallpaperProfileModal = document.getElementById("edit-wallpaper-profile-modal");
const closeEditWallpaperProfileModal = document.querySelector(".close-edit-wallpaper-profile-modal");
const archiveModal = document.getElementById("archive-modal");
const closeArchiveModal = document.querySelector(".close-archive-modal");
const message = document.getElementById("message");
const notification = document.getElementById("notification-modal");
const closeAccountModal = document.querySelector(".close-account-modal");
const closeEditModal = document.querySelector(".close-edit-modal");
const plus = document.getElementById("plus-button");
const plusDesktop = document.getElementById("plus-desktop-button");
const deleteModal = document.getElementById("delete-account-modal");
const closeBtn = document.querySelector(".close-modal");
const tabButtons = document.querySelectorAll(".tab-button");
const tabContents = document.querySelectorAll(".tab-content");
const editAccount = document.getElementById("edit-profile");
function showNotificationModal() {
  notification.style.display = "flex";
  document.body.style.overflow = "hidden";
}
function closeNotificationModal() {
  notification.style.display = "none";
}
function requireAuth(action) {
    if (!auth.currentUser) {
      showNotificationModal();
        message.innerHTML = "Щоб виконати цю дію, увійдіть у акаунт.";
        window.location.href = "auth.html";
        return false;
    }
    return true;
}

// Відкриття модалок
plus?.addEventListener("click", () => {
    if (!requireAuth()) return;
    modal.style.display = "flex";
});
plusDesktop?.addEventListener("click", () => {
    if (!requireAuth()) return;
    modal.style.display = "flex";
});

// Закриття модалок
closeAccountModal?.addEventListener("click", () => accountModal.style.display = "none");
closeEditWallpaperProfileModal?.addEventListener("click", () => editWallpaperProfileModal.style.display = "none");
closeBtn?.addEventListener("click", () => modal.style.display = "none");
closeArchiveModal?.addEventListener("click", () => archiveModal.style.display = "none");
closeEditModal?.addEventListener("click", () => editModal.style.display = "none");
closeBtn?.addEventListener("click", () => modal.style.display = "none");
// Закриття при кліку поза модалкою
[modal, accountModal, archiveModal, editModal, editWallpaperProfileModal, deleteModal].forEach(m => {
    m?.addEventListener("click", e => {
        if (e.target === m) m.style.display = "none";
    });
});

// Перемикання вкладок
tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        tabButtons.forEach(b => b.classList.remove("active"));
        tabContents.forEach(c => c.classList.remove("active"));

        btn.classList.add("active");
        const tabId = btn.dataset.tab;
        document.getElementById(tabId)?.classList.add("active");
    });
});
function toggleSidebar() {
    var sidebar = document.querySelector('.menu');
    var content = document.querySelector('.content');

    if (sidebar.style.width === "240px") {
        sidebar.style.width = "0";
        content.style.marginLeft = "0";
    } else {
        sidebar.style.width = "240px";
        content.style.marginLeft = "240px";
    }
}

// Закриття меню
function closeSidebar() {
    var sidebar = document.querySelector('.menu');
    var content = document.querySelector('.content');

    sidebar.style.width = "0";
    content.style.marginLeft = "0";
}

// ==========================
// Реєстрація Service Worker
// ==========================


// ==========================
// Запит дозволу на пуші
// ==========================
async function enablePushNotifications(userId) {
  try {
    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      console.log("❌ Користувач не дозволив сповіщення");
      return;
    }

    const token = await messaging.getToken({
      vapidKey: "BFkinse0q7x94PIX608Y9QsATJ0Ht2S-k6TeOpSFdB0sXIRLyxf1wKHTboOUHJY5tQB8wGMyMcoEQEV5fDu4sS4"
    });

    console.log("✅ Push токен:", token);

    // Збереження токена у Firebase
    database.ref("users/" + userId + "/pushToken").set(token);

  } catch (err) {
    console.error("❌ Помилка отримання токена:", err);
  }
}

// ==========================
// Отримання повідомлень коли сайт відкритий
// ==========================
messaging.onMessage((payload) => {
  console.log("📬 Нове повідомлення:", payload);
  const { title, body,  } = payload.notification;
  new Notification(title, { body,  });
});

 const addButton = document.getElementById("add");
const addIcon = addButton.querySelector("i");
const uploadDiv = document.getElementById("upload");

let isOpen = false;

// Задаємо transition один раз
uploadDiv.style.transition = "opacity 0.3s ease";
uploadDiv.style.opacity = 0;
uploadDiv.style.display = "none";

addIcon.style.transition = "transform 0.3s ease";

addButton.onclick = function() {
    if (!isOpen) {
        // Показати блок
        uploadDiv.style.display = "block";
        // Плавне з'явлення
        setTimeout(() => {
            uploadDiv.style.opacity = 1;
        }, 10);

        // Повернути іконку +
        addIcon.style.transform = "rotate(45deg)";

        isOpen = true;
    } else {
        // Плавне зникнення блоку
        uploadDiv.style.opacity = 0;
        addIcon.style.transform = "rotate(0deg)";

        // Сховати блок після завершення анімації
        setTimeout(() => {
            uploadDiv.style.display = "none";
        }, 300);

        isOpen = false;
    }
};
        document.getElementById("post").onclick = function() {
                     document.querySelector(".tab").style.display = 'none';
                     document.querySelector(".stories-bar").style.display = 'none';
           document.getElementById("video-container").style.display = 'none';
        document.getElementById("photo-container").style.display = 'flex';
        document.getElementById("author-info").style.display = 'none';
        }
            document.getElementById("video").onclick = function() {
                         document.querySelector(".tab").style.display = 'flex';
                         document.querySelector(".stories-bar").style.display = 'flex';
           document.getElementById("video-container").style.display = 'flex';
        document.getElementById("photo-container").style.display = 'none';
        document.getElementById("author-info").style.display = 'none';
        }
        document.getElementById("smart-post").onclick = function() {
                     document.querySelector(".tab").style.display = 'none';
                     document.querySelector(".stories-bar").style.display = 'none';
           document.getElementById("video-container").style.display = 'none';
           document.getElementById("author-info").style.display = 'none';
           document.getElementById("smart-video").classList.remove("button-liquid-glass");
           document.getElementById("account-link").classList.remove("button-liquid-glass");
          document.getElementById("smart-post").classList.add("button-liquid-glass");
        document.getElementById("photo-container").style.display = 'block';
                  document.getElementById("smart-settings").classList.remove("button-liquid-glass");
        document.querySelector(".settings-page").style.display = 'none';
        }
document.getElementById("smart-settings").onclick = function() {
           document.getElementById("video-container").style.display = 'none';
           document.querySelector(".tab").style.display = 'none';
           document.querySelector(".stories-bar").style.display = 'none';
           document.getElementById("author-info").style.display = 'none';
           document.getElementById("photo-container").style.display = 'none';
           document.getElementById("smart-video").classList.remove("button-liquid-glass");
           document.getElementById("account-link").classList.remove("button-liquid-glass");
          document.getElementById("smart-post").classList.remove("button-liquid-glass");
          document.getElementById("smart-settings").classList.add("button-liquid-glass");
        document.querySelector(".settings-page").style.display = 'block';
        }
        document.getElementById("settings").onclick = function() {
           document.getElementById("video-container").style.display = 'none';
           document.querySelector(".stories-bar").style.display = 'none';
           document.querySelector(".tab").style.display = 'none';
           document.getElementById("author-info").style.display = 'none';
           document.getElementById("photo-container").style.display = 'none';
        document.querySelector(".settings-page").style.display = 'block';
        }
        document.getElementById("popular").addEventListener("click", function() {
  document.getElementById("video-container").style.display = 'flex';
  document.getElementById("photo-container").style.display = 'none';
  document.querySelector(".settings-page").style.display = 'none';
  document.getElementById("popular").classList.add("tab-button-liquid-glass");
  document.getElementById("all").classList.remove("tab-button-liquid-glass");
});
document.getElementById("popular").addEventListener("click", loadPopularVideos);
document.getElementById("all").addEventListener("click", function() {
  document.getElementById("video-container").style.display = 'flex';
  document.getElementById("photo-container").style.display = 'none';
  document.querySelector(".settings-page").style.display = 'none';
  document.getElementById("popular").classList.remove("tab-button-liquid-glass");
  document.getElementById("all").classList.add("tab-button-liquid-glass");
});
document.getElementById("all").addEventListener("click", loadVideos);
        document.getElementById("account-desktop-link").onclick = function() {
                     document.querySelector(".tab").style.display = 'none';
                     document.querySelector(".stories-bar").style.display = 'none';
          document.getElementById("video-container").style.display = 'none';
           document.getElementById("photo-container").style.display = 'none';
           document.querySelector(".settings-page").style.display = 'none';
           document.getElementById("author-info").style.display = 'block';
        }
        document.getElementById("account-link").onclick = function() {
                     document.querySelector(".tab").style.display = 'none';
                     document.querySelector(".stories-bar").style.display = 'none';
           document.getElementById("video-container").style.display = 'none';
           document.getElementById("photo-container").style.display = 'none';
           document.getElementById("smart-settings").classList.remove("button-liquid-glass");
        document.querySelector(".settings-page").style.display = 'none';
           document.getElementById("smart-video").classList.remove("button-liquid-glass");
          document.getElementById("smart-post").classList.remove("button-liquid-glass");
          document.getElementById("account-link").classList.add("button-liquid-glass");
        document.getElementById("author-info").style.display = 'block';
        }
            document.getElementById("smart-video").onclick = function() {
                         document.querySelector(".tab").style.display = 'flex';
                         document.querySelector(".stories-bar").style.display = 'flex';
              document.getElementById("smart-video").classList.add("button-liquid-glass");
              document.getElementById("smart-post").classList.remove("button-liquid-glass");
              document.getElementById("account-link").classList.remove("button-liquid-glass");
           document.getElementById("video-container").style.display = 'flex';
           document.getElementById("smart-settings").classList.remove("button-liquid-glass");
        document.querySelector(".settings-page").style.display = 'none';
        document.getElementById("photo-container").style.display = 'none';
        document.getElementById("author-info").style.display = 'none';
        }

            function blockScreenForVerification() {
    const wrapper = document.createElement("div");
    wrapper.classList.add("wrapper");

    wrapper.innerHTML = `
        <style>
            .wrapper {
color: #e9ecf1;
  font-family: Inter, Segoe UI, Roboto, Arial;
  margin: 0;
  background: radial-gradient(ellipse at top, #0b0f17, #05060a);
    line-height: 1.6;
text-align: center;
    padding: 0 20px;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
            }

            .wrapper button {
                all: unset;
                display: inline-flex;
                align-items: center;
                justify-content: center;

                padding: 12px 28px;
                border-radius: 999px;

                background: #0b0b0b;
                color: white;
                border: 2px solid #2a2a2a;

                cursor: pointer;

                transition: 0.25s ease;
            }

            .wrapper button:hover {
                border-color: #f472b6;
                box-shadow: 0 0 18px rgba(244, 114, 182, .65);
                transform: translateY(-2px);
            }
m
            .wrapper button:active {
                border-color: #06b6d4;
                transform: scale(0.96);
            }

            #delete-account {
                color: #ff4d4d;
                border-color: #3a1a1a;
            }

            #logout-link-verification {
                color: #aaa;
                text-decoration: none;
                display: inline-flex;
                gap: 6px;
            }

            #logout-link-verification:hover {
                color: white;
            }
        </style>

        <h1>Підтвердьте вашу електронну пошту</h1>

        <p>
            Ми надіслали вам лист на пошту.
            Перевірте також "Спам".
        </p>

        <button onclick="resendVerification()">
            Надіслати лист ще раз
        </button>

        <button id="delete-account" onclick="deleteAccount()">
            <i class="material-symbols">person_remove</i>
            <span style="margin-left: 5px;">Видалити акаунт</span>
        </button>

        <a href="#" id="logout-link-verification" onclick="logout()">
            <i class="material-symbols">logout</i>
            <span class="icon-text">Вийти</span>
        </a>

        <p style="margin-top: 20px;">
            Після підтвердження просто зачекайте або перезавантажте сторінку.
        </p>
    `;

    document.body.replaceChildren(wrapper);
}

// Надіслати лист повторно
function resendVerification() {
    const user = auth.currentUser;
    if (user) {
        user.sendEmailVerification()
            .then(() => {
                alert("Лист підтвердження надіслано повторно!");
            })
            .catch((error) => {
              alert("Помилка надсилання листа:" + error.message);
            });
    }
}
function deleteAccountModal() {
  const deleteAccountModal = document.getElementById("delete-account-modal");
  deleteAccountModal.style.display = "flex";
  document.body.style.overflow = "hidden";
}
function closeDeleteAccountModal() {
  const deleteAccountModal = document.getElementById("delete-account-modal");
  deleteAccountModal.style.display = "none";
}
async function saveWallpaperChanges() {
  const wallpaperInput = document.getElementById("set-wallpaper-profile").files[0];
  const user = firebase.auth().currentUser;
          

    try {
      const wallpaperId = `${user.uid}_${Date.now()}`;
        const storageRef = storage.ref(`wallpapers/${wallpaperId}.webp`);
        await storageRef.put(wallpaperInput);
        
        await database.ref("users/" + user.uid).update({ wallpaperId});
                const url = await storageRef.getDownloadURL();
          message.innerHTML = `
          <p data-i18n="wallpapers-save-successfully">Шпалери застосовано!
          </p>`;
          applyTranslations();
          showNotificationModal();
    } catch (error) {
        console.error(error);
        message.innerHTML = `
        <p data-i18n="wallpapers-save-error">Помилка при завантаженні шпалер.
        </p>`;
        applyTranslations();
        showNotificationModal();
    }
}
function deleteAccount() {
    const user = firebase.auth().currentUser;

    if (!user) {
      showNotificationModal();
        message.innerHTML = "Спочатку увійдіть у свій акаунт.";
        return;
    }

    if (!confirm("Ви впевнені, що хочете видалити акаунт? Усі ваші публікації будуть видалені назавжди. Цю дію неможливо скасувати.")) {
        return;
    }

    const uid = user.uid;
    const videosRef = firebase.database().ref("videos");
    const commentsRef = firebase.database().ref("comments");
    const usersRef = firebase.database().ref("users/" + uid);

    // ?? 1. Видаляємо всі відео користувача
    videosRef.once("value")
        .then(snapshot => {
            const deleteVideoPromises = [];

            snapshot.forEach(childSnapshot => {
                const videoData = childSnapshot.val();
                const videoKey = childSnapshot.key;

                if (videoData.email === user.email) {
                    const dbDelete = firebase.database().ref(`videos/${videoKey}`).remove();
                    const storageDelete = firebase.storage().ref(`videos/${videoKey}`).delete()
                        .catch(error => console.warn(`?? Не вдалося видалити файл з Storage (${videoKey}):`, error));

                    deleteVideoPromises.push(dbDelete, storageDelete);
                }
            });

            return Promise.all(deleteVideoPromises);
        })
        // ?? 2. Оновлюємо всі коментарі користувача
        .then(() => commentsRef.once("value"))
        .then(snapshot => {
            const updatePromises = [];

            snapshot.forEach(childSnapshot => {
                const commentData = childSnapshot.val();
                const commentKey = childSnapshot.key;

                // Якщо коментар належить поточному користувачу
                if (commentData.email === user.email) {
                    const update = commentsRef.child(commentKey).update({
                        email: "Видалений акаунт",
                        commentAuthor: "Видалений акаунт"
                    });
                    updatePromises.push(update);
                }
            });

            return Promise.all(updatePromises);
        })
        // ?? 3. Видаляємо користувача з бази даних
        .then(() => usersRef.remove())
        // ?? 4. Видаляємо сам акаунт
        .then(() => user.delete())
        // ?? 5. Повідомлення користувачу
        .then(() => {
          showNotificationModal();
            message.innerHTML = "? Акаунт і всі пов’язані дані успішно видалено.";
            location.reload();
        })
        .catch(error => {
            if (error.code === 'auth/requires-recent-login') {
                message.innerHTML = "Будь ласка, увійдіть знову перед видаленням акаунту.";
                showNotificationModal();
                firebase.auth().signOut();
            } else {
                console.error("? Помилка при видаленні акаунту:", error);
                showNotificationModal();
                message.innerHTML = "Сталася помилка при видаленні акаунту: " + error.message;
            }
        });
}




    document.getElementById("show-nsfw-videos").addEventListener("change", function() {
if (auth.currentUser) {
        showNSFW = this.checked;  // Update the variable based on the checkbox state
        loadVideos();
} else {
  showNotificationModal();
message.innerHTML = "Сталася помилка при увімкненні функції показувати відео позначення як NSFW.";
}
    });
async function isUserBlockedByMe(targetUid) {

  const me = firebase.auth().currentUser;

  if (!me) return false;
  if (!targetUid) return false;

  try {

    const snap = await database
      .ref(`users/${me.uid}/blockedUsers/${targetUid}`)
      .once("value");

    return snap.exists();

  } catch {

    return false;

  }

}



async function didUserBlockMe(targetUid) {

  const me = firebase.auth().currentUser;

  if (!me) return false;
  if (!targetUid) return false;

  try {

    const snap = await database
      .ref(`users/${targetUid}/blockedUsers/${me.uid}`)
      .once("value");

    return snap.exists();

  } catch {

    return false;

  }

}
    function enableBanduraUI(role) {
    const banduraBlock = document.getElementById("bandura-options");
    if (!banduraBlock) return;

    if (role === "bandura" || role === "moderator") {
        banduraBlock.style.display = "block";
    } else {
        banduraBlock.style.display = "none";
    }
}
async function generateThumbnailFirstFrame(videoUrl) {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video");
    video.crossOrigin = "anonymous"; // тільки для CORS
    video.muted = true;
    video.playsInline = true;
    video.preload = "auto";
    video.src = videoUrl;

    // додаємо приховано в DOM
    video.style.position = "absolute";
    video.style.left = "-9999px";
    video.style.width = "1px";
    video.style.height = "1px";
    document.body.appendChild(video);

    const timeout = setTimeout(() => {
      document.body.removeChild(video);
      reject(new Error("Timeout: frame not decoded"));
    }, 10000);

    video.addEventListener("loadeddata", () => {
      video.currentTime = 0;
    }, { once: true });

    video.addEventListener("seeked", () => {
      if (video.videoWidth === 0 || video.videoHeight === 0) {
        clearTimeout(timeout);
        document.body.removeChild(video);
        reject(new Error("No decoded frame"));
        return;
      }

      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext("2d").drawImage(video, 0, 0);

      canvas.toBlob(blob => {
        clearTimeout(timeout);
        document.body.removeChild(video);
        if (!blob) {
          reject(new Error("Canvas tainted"));
        } else {
          resolve(blob);
        }
      }, "image/jpeg", 0.7);
    }, { once: true });

    video.addEventListener("error", () => {
      clearTimeout(timeout);
      document.body.removeChild(video);
      reject(new Error("Video load error"));
    }, { once: true });
  });
}

document.getElementById("domain-restrict-checkbox").onclick = function(event) {
    if (!currentUserEmail || !currentUserEmail.endsWith("@kfccte-nau.ukr.education")) {
        message.innerHTML = "Сталася помилка. ACCOUNT_IS_NOT_DOMAIN_KFCCTE-NAU.UKR.EDUCATION";
        event.preventDefault(); // Prevents checkbox from being checked
    }
}
function sanitizeHTML(str) {
    const div = document.createElement("div");
    div.innerText = str;
    return div.innerHTML;
}
const loadedStoryUsers = new Set();

async function loadStories() {

    const storiesGallery =
        document.getElementById("stories-bar");

    if (!storiesGallery) return;

    const user =
        firebase.auth().currentUser;

    database.ref("stories").on("child_added", async snapshot => {

    const storyId = snapshot.key;
    const storiesData = snapshot.val();

    if (!storiesData) return;

    // storyId — це ID конкретної Story
    console.log("Story ID:", storyId);

    const isExpired =
        storiesData.expiresAt &&
        Date.now() > storiesData.expiresAt;

    if (isExpired) return;

    if (!storiesData.uid) return;

    const blockedYou =
        await isUserBlockedByMe(storiesData.uid);

    const blockedMe =
        await didUserBlockMe(storiesData.uid);

    if (blockedMe || blockedYou) return;

    if (storiesData.uid === currentUserUid) return;

    // Не дублювати автора
    if (loadedStoryUsers.has(storiesData.uid)) return;

    loadedStoryUsers.add(storiesData.uid);
const storyAvatarRing = document.createElement("div");
storyAvatarRing.classList.add("avatar-ring");
    // Створюємо аватар
    const storyItem = document.createElement("div");
    storyItem.classList.add("story-item");

    const storiesAvatar =
        document.createElement("img");

    storiesAvatar.classList.add("avatar-stories");

    if (storiesData.avatar) {
        storiesAvatar.style.backgroundImage =
            `url(${storiesData.avatar})`;

        storiesAvatar.style.backgroundSize = "cover";
        storiesAvatar.style.backgroundPosition = "center";
        storiesAvatar.style.backgroundRepeat = "no-repeat";
    }

    // Передаємо UID автора
    // і Story ID
    storiesAvatar.onclick = () => {
        openStories(
            storiesData.uid,
            storyId
        );
    };
   storyAvatarRing.appendChild(storiesAvatar);
    storyItem.appendChild(storyAvatarRing);

    const storiesAuthorName =
        document.createElement("div");

    storiesAuthorName.classList.add("name");

    storiesAuthorName.innerText =
        sanitizeHTML(storiesData.name);

    storyItem.appendChild(
        storiesAuthorName
    );

    storiesGallery.appendChild(
        storyItem
    );
});
}
function openYourStories(currentUserUid) {

const storiesView =
    document.getElementById("storyView");

if (!storiesView) return;

storiesView.innerHTML = "";
storiesView.style.display = "block";
document.getElementById("smart-menu").style.display = "none";
  document.getElementById("plus-button").style.display = "none";
database.ref("stories")
    .once("value")
    .then(snapshot => {

        const stories = [];

        // =========================
        // ЗБИРАЄМО ВЛАСНІ STORIES
        // =========================

        snapshot.forEach(storySnapshot => {

            // ID конкретної Story
            const storyId =
                storySnapshot.key;

            // Дані конкретної Story
            const storyData =
                storySnapshot.val();

            if (!storyData) return;

            // Тільки Stories поточного користувача
            if (
                storyData.uid !==
                currentUserUid
            ) {
                return;
            }

            // Перевіряємо термін дії
            if (
                storyData.expiresAt &&
                Date.now() >
                storyData.expiresAt
            ) {
                return;
            }

            stories.push({

                storyId:
                    storyId,

                ...storyData

            });

        });

        // =========================
        // ЯКЩО STORIES НЕМАЄ
        // =========================

        if (
            stories.length === 0
        ) {

            console.log(
                "Власні Stories не знайдені"
            );

            storiesView.style.display =
                "none";

            return;

        }

        // =========================
        // СОРТУВАННЯ
        // =========================

        stories.sort(
            (a, b) =>
                (a.createdAt || 0) -
                (b.createdAt || 0)
        );

        console.log(
            "Власні Stories:",
            stories
        );

        // =========================
        // ПОКАЗ STORY
        // =========================

        function showStory(index) {

            // Stories закінчилися
            if (
                index >=
                stories.length
            ) {

                storiesView.innerHTML =
                    "";

                storiesView.style.display =
                    "none";

                return;

            }

            const storyData =
                stories[index];

            // Очищаємо попередню Story
            storiesView.innerHTML =
                "";

            // =========================
            // АВАТАР
            // =========================

            const storiesAvatar =
                document.createElement(
                    "div"
                );

            storiesAvatar.classList.add(
                "stories-avatar"
            );

            storiesAvatar.style.borderRadius =
                "64px";

            if (
                storyData.avatar
            ) {

                const avatarImg =
                    document.createElement(
                        "img"
                    );

                avatarImg.src =
                    storyData.avatar;

                avatarImg.classList.add(
                    "avatar-stories-view"
                );

                storiesAvatar.appendChild(
                    avatarImg
                );

            } else {

                // Якщо аватара немає
                storiesAvatar.innerText =
                    getInitials(
                        storyData.name || ""
                    );

                storiesAvatar.style.background =
                    storyData.authorColor ||
                    "#007aff";

            }

            // =========================
            // ІМ'Я АВТОРА
            // =========================

            const storiesAuthor =
                document.createElement(
                    "span"
                );

            storiesAuthor.classList.add(
                "stories-author"
            );
            storiesAuthor.innerHTML = `
            <p data-i18n='my-story'>
            Моя історія
            </p>`;

            storiesView.appendChild(
                storiesAuthor
            );

            storiesView.appendChild(
                storiesAvatar
            );

            // =========================
            // ФОТО
            // =========================

            if (
                storyData.type ===
                "image"
            ) {

                const img =
                    document.createElement(
                        "img"
                    );

                img.classList.add(
                    "story-img"
                );

                img.src =
                    storyData.url;

                img.style.width =
                    "100%";

                img.style.height =
                    "100%";

                img.style.objectFit =
                    "cover";

                storiesView.appendChild(
                    img
                );

                // Через 5 секунд
                // наступна Story
                setTimeout(
                    () => {

                        showStory(
                            index + 1
                        );

                    },
                    5000
                );

            }

            // =========================
            // ВІДЕО
            // =========================

            else if (
                storyData.type ===
                "video"
            ) {

                const video =
                    document.createElement(
                        "video"
                    );

                video.classList.add(
                    "story-video"
                );

                video.src =
                    storyData.url;

                video.autoplay =
                    true;

                video.loop =
                    false;

                video.muted =
                    true;

                video.playsInline =
                    true;

                video.controls =
                    false;

                video.style.width =
                    "100%";

                video.style.height =
                    "100%";

                video.style.objectFit =
                    "cover";

                storiesView.appendChild(
                    video
                );

                video.play()
                    .catch(
                        error => {

                            console.error(
                                "Не вдалося відтворити відео:",
                                error
                            );

                        }
                    );

                // Після завершення відео
                // показуємо наступну Story
                video.onended =
                    () => {

                        showStory(
                            index + 1
                        );

                    };

            }

        }

        // =========================
        // ПОЧИНАЄМО З ПЕРШОЇ STORY
        // =========================

        showStory(0);
applyTranslations();
    })
    .catch(
        error => {

            console.error(
                "Помилка завантаження власних Stories:",
                error
            );

            storiesView.style.display =
                "none";

        }
    );

}
function openStories(uid, startStoryId) {

const storiesView =
    document.getElementById("storyView");

if (!storiesView) return;

storiesView.innerHTML = "";
storiesView.style.display = "block";
document.getElementById("smart-menu").style.display = "none";
  document.getElementById("plus-button").style.display = "none";
database.ref("stories")
    .once("value")
    .then(snapshot => {

        const stories = [];

        // =========================
        // ЗБИРАЄМО STORIES КОРИСТУВАЧА
        // =========================

        snapshot.forEach(storySnapshot => {

            // ID конкретної Story
            const storyId =
                storySnapshot.key;

            // Дані конкретної Story
            const storyData =
                storySnapshot.val();

            if (!storyData) return;

            // Перевіряємо термін дії
            if (
                storyData.expiresAt &&
                Date.now() >
                storyData.expiresAt
            ) {
                return;
            }

            // Додаємо Story
            stories.push({

                storyId:
                    storyId,

                ...storyData

            });

        });

        // =========================
        // ЯКЩО STORIES НЕМАЄ
        // =========================

        if (
            stories.length === 0
        ) {

            console.log(
                "Stories користувача не знайдені"
            );

            storiesView.style.display =
                "none";

            return;
        }

        // =========================
        // СОРТУВАННЯ
        // =========================

        stories.sort(
            (a, b) =>
                (a.createdAt || 0) -
                (b.createdAt || 0)
        );

        // =========================
        // ЗНАХОДИМО ПОЧАТКОВУ STORY
        // =========================

        let startIndex =
            stories.findIndex(
                story =>
                    story.storyId ===
                    startStoryId
            );

        if (
            startIndex === -1
        ) {
            startIndex = 0;
        }

        console.log(
            "Stories користувача:",
            stories
        );

        console.log(
            "Початкова Story:",
            stories[startIndex]
        );

        // =========================
        // ПОКАЗ STORY
        // =========================

        function showStory(index) {

            // Якщо Stories закінчилися
            if (
                index >=
                stories.length
            ) {

                storiesView.innerHTML =
                    "";

                storiesView.style.display =
                    "none";

                return;
            }

            const storyData =
                stories[index];

            storiesView.innerHTML =
                "";

            // =========================
            // АВАТАР КОРИСТУВАЧА
            // =========================

            const storiesAvatar =
                document.createElement(
                    "div"
                );

            storiesAvatar.classList.add(
                "stories-avatar"
            );
           storiesAvatar.style.borderRadius = "64px";
            if (
                storyData.avatar
            ) {

                const avatarImg =
                    document.createElement(
                        "img"
                    );

                avatarImg.src =
                    storyData.avatar;

                avatarImg.classList.add(
                    "avatar-stories-view"
                );

                storiesAvatar.appendChild(
                    avatarImg
                );

            }
            const storiesAuthor = document.createElement("span");
             storiesAuthor.classList.add("stories-author");
            
              storiesAuthor.innerHTML = sanitizeHTML(storyData.name);
            storiesView.appendChild(
                storiesAuthor
            );
            storiesView.appendChild(
                storiesAvatar
            );
           
            // =========================
            // ФОТО
            // =========================

            if (
                storyData.type ===
                "image"
            ) {

                const img =
                    document.createElement(
                        "img"
                    );
                img.classList.add("story-img");
                img.src =
                    storyData.url;

                img.style.width =
                    "100%";

                img.style.height =
                    "100%";

                img.style.objectFit =
                    "cover";

                storiesView.appendChild(
                    img
                );

                // Через 5 секунд
                // наступна Story
                setTimeout(
                    () => {

                        showStory(
                            index + 1
                        );

                    },
                    5000
                );

            }

            // =========================
            // ВІДЕО
            // =========================

            else if (
                storyData.type ===
                "video"
            ) {

                const video =
                    document.createElement(
                        "video"
                    );
                video.classList.add("story-video");
                video.src =
                    storyData.url;

                video.autoplay =
                    true;

                video.loop =
                    false;

                video.muted =
                    false;

                video.playsInline =
                    true;

                video.controls =
                    false;

                video.style.width =
                    "100%";

                video.style.height =
                    "100%";

                video.style.objectFit =
                    "cover";

                storiesView.appendChild(
                    video
                );

                video.play()
                    .catch(
                        error => {

                            console.error(
                                "Не вдалося відтворити відео:",
                                error
                            );

                        }
                    );

                // Після завершення
                // наступна Story
                video.onended =
                    () => {

                        showStory(
                            index + 1
                        );

                    };

            }

        }

        // =========================
        // ПОКАЗУЄМО ПОЧАТКОВУ STORY
        // =========================

        showStory(
            startIndex
        );

    })
    .catch(
        error => {

            console.error(
                "Помилка завантаження Stories:",
                error
            );

            storiesView.style.display =
                "none";

        }
    );

}
function getSafeBanduraHTML(banduraExtra) {
    if (!banduraExtra) return "";
    const s = str => str ? sanitizeHTML(str) : "";

    let html = `<span style="color:#ffd700;">🎵 Бандура</span>`;
    html += `<span style="opacity:0.7;"> (${s(banduraExtra.style)}, ${s(banduraExtra.difficulty)})</span>`;

    if (banduraExtra.tempo) html += `<br>Темп: ${s(banduraExtra.tempo.toString())} BPM`;
    if (banduraExtra.event) html += `<br>Подія: ${s(banduraExtra.event)}`;
    if (banduraExtra.year) html += `<br>Рік: ${s(banduraExtra.year.toString())}`;
    if (banduraExtra.performer) html += `<br>Виконавець: ${s(banduraExtra.performer)}`;
    if (banduraExtra.tags) html += `<br>Теги: ${s(banduraExtra.tags)}`;
    if (banduraExtra.markers) html += `<br>Маркери: ${s(banduraExtra.markers)}`;

    return html;
}
function getInitials(name) {
  if (!name) return "?";
  const parts = name.trim().split(" ");
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}
function stringToColor(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return `hsl(${hash % 360}, 65%, 55%)`;
}

function createThumbnail(file) {

 return new Promise(resolve => {

  const video = document.createElement("video");
  video.src = URL.createObjectURL(file);
  video.currentTime = 1;

  video.addEventListener("loadeddata", () => {

    const canvas = document.createElement("canvas");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");

    ctx.drawImage(video, 0, 0);

    canvas.toBlob(blob => {
        resolve(blob);
    }, "image/jpeg", 0.7);

  });

 });
}
const migrateUsersToPublicUsers =
    firebase.functions().httpsCallable(
        "migrateUsersToPublicUsers"
    );

migrateUsersToPublicUsers()
    .then(result => {
        console.log("✅ Міграція:", result.data);
    })
    .catch(error => {
        console.error("❌ Міграція:", error);
    });
const avatarLibrary = document.getElementById("avatar-library");
async function deleteAllViewsHistory() {
  if (!confirm("Ви впевнені, що хочете видалити історію переглядів?")) return;

  const uid = auth.currentUser.uid;
  const deleteHistoryRef = database.ref("users/" + uid + "/history");

  try {
    await deleteHistoryRef.remove();

    showNotificationModal();
    message.innerHTML = "Історію переглядів успішно видалено.";
  } catch (error) {
    console.error("Помилка при видаленні історії:", error);

    showNotificationModal();
    message.innerHTML = "Помилка: " + error.message;
  }
}
async function loadYouStories(user) {
  const avatarStoriesYou = document.getElementById("avatar-stories-you");
  const uid = user.uid;

  try {
    const snapshot = await database.ref("users/" + uid).once("value");
    const userData = snapshot.val() || {};

    if (userData.avatarId) {
      try {
        const url = await firebase
          .storage()
          .ref(`avatars/${userData.avatarId}.webp`)
          .getDownloadURL();

        avatarStoriesYou.innerHTML = "";

        const img = document.createElement("img");
        img.src = url;
        img.alt = "Аватар користувача";

        avatarStoriesYou.appendChild(img);
      } catch (err) {
        console.error("Помилка завантаження аватара:", err);

        avatarStoriesYou.style.background = userData.color;
        avatarStoriesYou.innerText =
          userData?.name ? userData.name.charAt(0).toUpperCase() : "?";
      }
    } else {
      avatarStoriesYou.style.background = userData.color;
      avatarStoriesYou.innerText =
        userData?.name ? userData.name.charAt(0).toUpperCase() : "?";
    }
  } catch (err) {
    console.error("Помилка завантаження користувача:", err);
  }
}
const avatarLibraryEl = document.createElement("div");
function loadLibrary(user) {
    const authorInfo = document.getElementById("author-info");
    authorInfo.innerHTML = "";

    const uid = firebase.auth().currentUser.uid;
    const userRef = database.ref("users/" + uid);
    const historyRef = database.ref("users/" + uid + "/history");
const saveVideosRef = database.ref("saveVideos/" + uid);
    userRef.once("value")
        .then(snapshot => {
            const userData = snapshot.val() || {};

            // ▸ Основна панель автора


avatarLibraryEl.id = "avatar-library";
avatarLibraryEl.classList.add("avatar");
authorInfo.appendChild(avatarLibraryEl);

const fullNameLibrary = document.createElement("p");
fullNameLibrary.textContent = `${userData.name || ""} ${userData.supername || ""}`;
authorInfo.appendChild(fullNameLibrary);
const more = document.createElement("button");
more.classList.add("more-profile");
more.innerHTML = `<i class="material-symbols">more_vert</i>`;
authorInfo.appendChild(more);
const moreMenu = document.createElement("div");
        moreMenu.classList.add("more-menu");
        moreMenu.style.display = "none";
more.onclick = e => {
    e.stopPropagation();

    document.querySelectorAll(".more-menu").forEach(m => {
        if (m !== moreMenu) m.style.display = "none";
    });

    moreMenu.style.display =
        moreMenu.style.display === "block" ? "none" : "block";
};

authorInfo.addEventListener("click", e => {
    if (!e.target.closest(".more-menu") && !e.target.closest(".more-profile")) {
        document.querySelectorAll(".more-menu").forEach(m => {
            m.style.display = "none";
        });
    }
});
const editWallpaperProfile = document.createElement("button");
editWallpaperProfile.classList.add("edit-wallpaper-profile");
editWallpaperProfile.innerHTML = `<a style="padding:3px 0px; display:flex; border-radius: 50%; align-items:center; justify-content:center;"><i class="material-symbols">palette</i><span data-i18n="edit-wallpaper-profile">Редагувати шпалери профілю</span><sup class="badge-new-edit-wallpaper-profile" data-i18n="new">NEW</sup></a>`;
editWallpaperProfile.onclick = () => {
        showEditWallpaperProfileModal();
          
        }
moreMenu.appendChild(editWallpaperProfile);
        const copyLinkProfile = document.createElement("button");
        copyLinkProfile.classList.add("copy-link-profile");
        copyLinkProfile.innerHTML = `<a style="padding:3px 8px; display:flex; border-radius: 50%; align-items:center; justify-content:center;"><i class="material-symbols">link_2</i><span data-i18n="copy-link-profile">Копіювати посилання</span><sup class="badge-new-copy-link-profile" data-i18n="new">NEW</sup></a>`;
        copyLinkProfile.onclick = async () => {
        const profileUrl = `https://zhenya14.github.io/VideoVortex/profile.html?uid=${uid}`;

    try {
        // Копіюємо посилання у буфер обміну
        await navigator.clipboard.writeText(profileUrl);

        // Візуальний відгук на кнопці (збереження старої іконки та зміна тексту)
        const originalContent = copyLinkProfile.innerHTML;
        copyLinkProfile.innerHTML = `<a style="padding:3px 8px; display:flex; border-radius: 50%; align-items:center; justify-content:center;"><i class="material-symbols">check</i><p data-i18n="copied">Скопійовано</p></a>`; // якщо використовуєте material-icons, замініть на <i class="material-icons">check</i>
        copyLinkProfile.classList.add('copied-success'); // додаємо клас для зміни стилю (наприклад, зелений фон)

        // Повертаємо кнопку до початкового стану через 2 секунди
        setTimeout(() => {
            copyLinkProfile.innerHTML = originalContent;
            copyLinkProfile.classList.remove('copied-success');
        }, 2000);

    } catch (err) {
        console.error('Помилка копіювання посилання:', err);
        alert('Не вдалося скопіювати посилання автоматично.');
    }
          
        };
        moreMenu.appendChild(copyLinkProfile);
// Контейнер для кнопок управления профилем
const buttons = document.createElement("div");
buttons.classList.add("buttons-library");

// Кнопка "Изменить"
const editProfile = document.createElement("button");
editProfile.classList.add("edit");
// Заменили <p> на <span>, чтобы убрать дефолтные отступы абзаца
editProfile.innerHTML = `<i class="material-symbols">edit</i><span data-i18n="edit-profile">Змінити</span>`;
editProfile.onclick = showAccountModal;
buttons.appendChild(editProfile);

// Кнопка "Архив" (стиль Telegram)
const archive = document.createElement("button");
archive.classList.add("archive");
// Заменили <p> на <span> для идеального центрирования
archive.innerHTML = `
  <i class="material-symbols">archive</i>
  <span data-i18n="archive">Архів</span>
  <sup class="badge-new" data-i18n="new">NEW</sup>
`;
archive.onclick = () => {
  showArchiveModal();
};
buttons.appendChild(archive);
const yourProfile = document.createElement("button");
yourProfile.classList.add("your-profile");
// Заменили <p> на <span> для идеального центрирования
yourProfile.innerHTML = `
  <i class="material-symbols">account_circle</i>
  <span data-i18n="my-profile">Мій профіль</span>
  <sup class="badge-new" data-i18n="new">NEW</sup>
`;
yourProfile.onclick = () => {
  window.location.href = `profile.html?uid=${uid}`
}
buttons.appendChild(yourProfile);
authorInfo.appendChild(buttons);
          const saveVideoInfo = document.createElement("div");
saveVideoInfo.classList.add("save-video-info");

const saveVideoTitle = document.createElement("p");
saveVideoTitle.innerHTML = `<span data-i18n="save-video">Збереженні відео</span><sup class="badge-new" data-i18n="new">NEW</sup>:`;

saveVideoInfo.appendChild(saveVideoTitle);
        
// Добавляем все в главный контейнер библиотеки

            // ▸ Завантаження історії
            saveVideosRef.once("value")
          .then(snapshot => {
    const saveVideoData = snapshot.val() || {};

    if (Object.keys(saveVideoData).length === 0) {
        const emptyMsg = document.createElement("p");
        emptyMsg.textContent = "Немає збережених відео";
        saveVideoInfo.appendChild(emptyMsg);
        return;
    }

    Object.keys(saveVideoData).forEach(videoKey => {

        const video = saveVideoData[videoKey];

        // Контейнер одного збереженого відео
        const saveVideoContainer = document.createElement("div");

        saveVideoContainer.classList.add("save-video-item");

        saveVideoContainer.style.display = "flex";
        saveVideoContainer.style.alignItems = "center";
        saveVideoContainer.style.marginBottom = "8px";
        saveVideoContainer.style.cursor = "pointer";

        // Прев'ю
        const thumbnail = document.createElement("img");

        thumbnail.src = video.thumbnail || "default.jpg";
        thumbnail.alt = video.title || "Відео";

        thumbnail.style.width = "80px";
        thumbnail.style.height = "45px";
        thumbnail.style.objectFit = "cover";
        thumbnail.style.borderRadius = "6px";
        thumbnail.style.marginRight = "10px";

        saveVideoContainer.appendChild(thumbnail);

        // Текстова інформація
        const info = document.createElement("div");

        info.innerHTML = `
            <p style="margin:0;font-weight:bold;">
                ${video.title || "Без назви"}
            </p>

            <p style="margin:0;font-size:0.9em;color:#ccc;">
                Автор: ${video.author || "Невідомий"}
            </p>

            <p style="margin:0;font-size:0.8em;color:#999;">
                Останній перегляд:
                ${video.lastPlayed
                    ? new Date(video.lastPlayed).toLocaleString()
                    : "Невідомо"
                }
            </p>
        `;

        saveVideoContainer.appendChild(info);

        // Клік на відео
        saveVideoContainer.onclick = () => {
            window.location.href = `video.html?key=${videoKey}`;
        };

        // Додаємо в список
        saveVideoInfo.appendChild(saveVideoContainer);
    });
})
            applyTranslations();
// Контейнер для истории
const historyInfo = document.createElement("div");
historyInfo.classList.add("history-info");

const historyTitle = document.createElement("p");
historyTitle.innerHTML = `<span data-i18n="history">Історія переглядів</span><sup class="badge-new" data-i18n="new">NEW</sup>:`;

const deleteHistoryViews = document.createElement("button");
deleteHistoryViews.classList.add("delete-history-views");
deleteHistoryViews.innerHTML = `<i class="material-symbols">delete</i><span data-i18n="delete-history-views">Очистити історію переглядів</span>`;
deleteHistoryViews.onclick = () => {
  deleteAllViewsHistory();
};

historyInfo.appendChild(historyTitle);
historyInfo.appendChild(deleteHistoryViews);
authorInfo.appendChild(saveVideoInfo);
authorInfo.appendChild(historyInfo);
authorInfo.appendChild(moreMenu);

// Добавляем все в главный контейнер библиотеки

            // ▸ Завантаження історії
            historyRef.once("value")
                .then(snapshot => {
                    const historyData = snapshot.val() || {};
                    if (Object.keys(historyData).length === 0) {
                        const emptyMsg = document.createElement("p");
                        emptyMsg.textContent = "Історія переглядів порожня";
                        historyInfo.appendChild(emptyMsg);
                        return;
                    }

                    Object.keys(historyData).forEach(videoKey => {
                        const video = historyData[videoKey];

                        // ▸ Контейнер одного відео в історії
                        const videoContainer = document.createElement("div");
                        videoContainer.classList.add("history-item");
                        videoContainer.style.display = "flex";
                        videoContainer.style.alignItems = "center";
                        videoContainer.style.marginBottom = "8px";
                        videoContainer.style.cursor = "pointer";

                        // ▸ Прев’ю
                        const thumbnail = document.createElement("img");
                        thumbnail.src = video.thumbnail || "default.jpg";
                        thumbnail.alt = video.title;
                        thumbnail.style.width = "80px";
                        thumbnail.style.height = "45px";
                        thumbnail.style.objectFit = "cover";
                        thumbnail.style.borderRadius = "6px";
                        thumbnail.style.marginRight = "10px";
                        videoContainer.appendChild(thumbnail);

                        // ▸ Текстова інформація
                        const info = document.createElement("div");
                        info.innerHTML = `
                            <p style="margin:0;font-weight:bold;">${video.title}</p>
                            <p style="margin:0;font-size:0.9em;color:#ccc;">Автор: ${video.author}</p>
                            <p style="margin:0;font-size:0.8em;color:#999;">Останній перегляд: ${new Date(video.lastPlayed).toLocaleString()}</p>
                        `;
                        videoContainer.appendChild(info);

                        // ▸ Клік на відео
                        videoContainer.onclick = () => {
                            window.location.href = `video.html?key=${videoKey}`;
                        };

                        historyInfo.appendChild(videoContainer);
                    });
                })
                .catch(err => console.error("Помилка завантаження історії:", err));

            applyTranslations();
        })
        .catch(err => console.error("Помилка завантаження даних користувача:", err));
}
const edit = document.getElementById("edit-profile");
edit.onclick = showAccountModal;
const blockedUsersBtn = document.getElementById("blocked-button");
blockedUsersBtn.onclick = () => {
                const user = firebase.auth().currentUser;
                if (!user) return alert("Спочатку увійдіть у акаунт");
                showBlockedUsersModal();
            };
function showBlockedUsersModal() {
  const modal = document.getElementById("blocked-users-modal");
  const list = document.getElementById("blockedUsersList");
  const user = firebase.auth().currentUser;

  if (!modal || !list) return console.error("Модальне вікно не знайдено");
  if (!user) return alert("Спочатку увійдіть у акаунт");

  const uid = user.uid;
  list.innerHTML = "";

  database.ref(`users/${uid}/blockedUsers`).once("value")
    .then(snapshot => {
      const blockedData = snapshot.val() || {};
      if (!Object.keys(blockedData).length) {
        const p = document.createElement("p");
        p.classList.add("modal-blocked");
        p.textContent = "Список порожній";
        list.appendChild(p);
      } else {
        Object.keys(blockedData).forEach(blockedUid => {
          const p = document.createElement("p");
          p.classList.add("modal-blocked");
          p.textContent = blockedData[blockedUid].userName || "Анонім";

          const unblockBtn = document.createElement("button");
          unblockBtn.textContent = "Розблокувати";
          unblockBtn.onclick = () => {
            database.ref(`users/${uid}/blockedUsers/${blockedUid}`).remove()
              .then(() => p.remove())
              .catch(console.error);
          };

          p.appendChild(unblockBtn);
          list.appendChild(p);
        });
      }
      modal.style.display = "flex";
      document.body.style.overflow = "hidden";
    })
    .catch(console.error);

  // Закриття модалки по X
  document.querySelector(".close-blocked-modal")?.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Закриття по кліку поза модаллю
  window.addEventListener("click", (event) => {
    if (event.target === modal) modal.style.display = "none";
  });
}
 function showAccountNotificationsModal() {
   const modal = document.getElementById("account-notifications-modal");

   const user = firebase.auth().currentUser;

   if (!modal) return console.error("Модальне вікно не знайдено");
   if (!user) return alert("Спочатку увійдіть у акаунт");
modal.style.display = "flex";

   // Закриття модалки по X
   document.querySelector(".close-account-notifications-modal")?.addEventListener("click", () => {
     modal.style.display = "none";
   });

   // Закриття по кліку поза модаллю
   window.addEventListener("click", (event) => {
     if (event.target === modal) modal.style.display = "none";
   });
 }
async function updateYearStat(stat, amount = 1) {
    const user = firebase.auth().currentUser;
    if (!user) return;

    const year = new Date().getFullYear();

    const ref = firebase.database().ref(
        `yearStats/${user.uid}/${year}/${stat}`
    );

    await ref.transaction(current => {
        return (current || 0) + amount;
    });
}
function showEditWallpaperProfileModal() {
  document.getElementById("edit-wallpaper-profile-modal").style.display = "flex";
  document.body.style.overflow = "hidden";
}
function showAccountModal() {
  document.getElementById("account-modal").style.display = "flex";
  document.body.style.overflow = "hidden";
}
function showArchiveModal() {
  document.getElementById("archive-modal").style.display = "flex";
  document.body.style.overflow = "hidden";
}

const videosLoaded = new Set(); // зверху скрипта

const videoMemoryCache = {};
const CACHE_TTL = 15 * 60 * 1000; // 15 хв

function setVideoCache(key, data) {
  localStorage.setItem("video_cache_" + key, JSON.stringify({
    data,
    time: Date.now()
  }));
}

function getVideoCache(key) {
  const raw = localStorage.getItem("video_cache_" + key);
  if (!raw) return null;

  const parsed = JSON.parse(raw);

  if (Date.now() - parsed.time > CACHE_TTL) {
    localStorage.removeItem("video_cache_" + key);
    return null;
  }

  return parsed.data;
}

function cacheImage(url) {
  if (!url) return;
  const img = new Image();
  img.src = url;
}function showBlockedScreen(text) {
    document.body.innerHTML = `
        <div style="
            display:flex;
            flex-direction:column;
            align-items:center;
            justify-content:center;
            height:100vh;
            font-size:20px;
            text-align:center;
            gap:12px;
        ">
            <div>${text}</div>
            <button onclick="openAppeal?.()">Подати апеляцію</button>
        </div>
    `;
}
async function forceLogout() {
    try {
        await auth.signOut();
    } catch (e) {
        console.error(e);
    }

    currentUser = null;
    currentUserEmail = null;
    let currentUserUid = null;
    currentUserRole = "user";
    currentUserStatus = "active";

    localStorage.clear();
}
async function checkUserStatus(user) {
    if (!user) return false;

    const snap = await database.ref(`moderation/users/${user.uid}`).once("value");
    const data = snap.val();

    if (!data) return false;

    const status = data.status || "active";

    currentUserStatus = status;

    // 🔴 BAN / HARD BLOCK
    if (status === "banned" || status === "frozen_hard" || status === "disabled") {
        await forceLogout();
        showBlockedScreen("⛔ Акаунт заблоковано");
        return false;
    }

    // ❄️ SOFT FREEZE
    if (status === "frozen" || status === "frozen_soft") {
        await forceLogout();
        showBlockedScreen("❄️ Акаунт заморожено");
        return false;
    }

    return true;
}
async function loadPopularVideos() {
    const videoGallery = document.getElementById("video-gallery");
    if (!videoGallery) return;

    videoGallery.innerHTML = "";

    const showNSFWGlobal = typeof showNSFW !== "undefined" ? showNSFW : false;

    database.ref("videos").on("child_added", async snapshot => {
        const videoData = snapshot.val();
        const videoKey = snapshot.key;

        if (!videoData) return;

        // =====================
        // EXPIRE
        // =====================
        if (
            videoData.autoDelete24h &&
            videoData.expiresAt &&
            Date.now() > videoData.expiresAt
        ) return;

        // =====================
        // CACHE
        // =====================
        let videoDataRaw = videoMemoryCache[videoKey];

        if (!videoDataRaw) {
            const local = getVideoCache(videoKey);

            videoDataRaw = local || videoData;
            videoMemoryCache[videoKey] = videoDataRaw;
            setVideoCache(videoKey, videoDataRaw);
        } else {
            videoDataRaw = videoData;
            videoMemoryCache[videoKey] = videoData;
            setVideoCache(videoKey, videoData);
        }

        // =====================
        // FILTERS (до UI)
        // =====================

        // NSFW
        if (videoDataRaw.nsfw && !showNSFWGlobal) return;

        // SCORE
        if (!videoDataRaw.score || videoDataRaw.score < 15) return;

        // BLOCK (ОДИН РАЗ)
        if (videoDataRaw.authorUid) {
            try {
                const blockedYou = await isUserBlockedByMe(videoDataRaw.authorUid);
                const blockedMe = await didUserBlockMe(videoDataRaw.authorUid);

                if (blockedMe || blockedYou) return;
            } catch (e) {
                console.warn("Block error", e);
                return;
            }
        }

        // PRIVATE
        if (videoDataRaw.private && videoDataRaw.email !== currentUserEmail) return;

        // DOMAIN
        if (
            videoDataRaw.domainRestrict &&
            (!currentUserEmail ||
                !currentUserEmail.endsWith("@kfccte-nau.ukr.education"))
        ) return;

        // DUPLICATE
        if (document.querySelector(`[data-id="${videoKey}"]`)) return;

        // =====================
        // UI
        // =====================

        const videoWrapper = document.createElement("div");
        videoWrapper.className = "video-thumb-wrapper";

        const videoElement = document.createElement("img");
        videoElement.classList.add("video-item");
        videoElement.src = videoData.thumbnail || "default.jpg";
        videoElement.style.filter = videoData.nsfw ? "blur(20px)" : "none";

        cacheImage(videoElement.src);

        // 🔥 POPULAR (ТЕПЕР ПРАВИЛЬНО)
        if (videoDataRaw.score > 15) {
            const popular = document.createElement("div");
            popular.className = "stories-timer";

            const span = document.createElement("span");
            span.textContent = "🔥 Popular";

            popular.appendChild(span);
            videoWrapper.appendChild(popular);
        }

        // TIMER
        if (videoDataRaw.autoDelete24h && videoDataRaw.expiresAt) {
            const timer = document.createElement("div");
            timer.className = "stories-timer";

            const span = document.createElement("span");
            timer.appendChild(span);

            const interval = setInterval(() => {
                const diff = videoDataRaw.expiresAt - Date.now();

                if (diff <= 0) {
                    clearInterval(interval);
                    videoWrapper.remove();
                    return;
                }

                const h = Math.floor(diff / 3600000);
                const m = Math.floor((diff % 3600000) / 60000);
                const s = Math.floor((diff % 60000) / 1000);

                span.textContent =
                    `${String(h).padStart(2, "0")}:` +
                    `${String(m).padStart(2, "0")}:` +
                    `${String(s).padStart(2, "0")}`;
            }, 1000);

            videoWrapper.appendChild(timer);
        }

        // CLICK
        videoElement.onclick = () => {
            const viewedKey = `viewed_${videoKey}`;

            if (!localStorage.getItem(viewedKey)) {
                database.ref("videos/" + videoKey).update({
                    views: (videoDataRaw.views || 0) + 1
                });
                localStorage.setItem(viewedKey, true);
            }

            window.location.href = `video.html?key=${videoKey}`;
        };

        // INFO
        const infoElement = document.createElement("div");
        infoElement.className = "video-info";

        const avatar = document.createElement("div");
        avatar.className = "avatar";

        if (videoDataRaw.authorAvatar) {
            avatar.style.backgroundImage = `url(${videoDataRaw.authorAvatar})`;
            avatar.style.backgroundSize = "cover";
avatar.style.backgroundPosition = "center";
avatar.style.backgroundRepeat = "no-repeat";
        } else {
            avatar.textContent = getInitials(videoDataRaw.author);
        }

        avatar.onclick = () => {
            window.location.href = `profile.html?uid=${videoDataRaw.authorUid}`;
        };

        const details = document.createElement("div");
        details.className = "video-details";

        details.innerHTML = `
            ${sanitizeHTML(videoDataRaw.title || "Без назви")}
            ${videoDataRaw.private ? "🔒" : ""}
            ${videoDataRaw.nsfw ? "NSFW" : ""}
        `;

        infoElement.appendChild(avatar);
        infoElement.appendChild(details);

        const container = document.createElement("div");
        container.className = "video-container";
        container.dataset.id = videoKey;

        videoWrapper.appendChild(videoElement);
        container.appendChild(infoElement);
        container.appendChild(videoWrapper);

        videoGallery.appendChild(container);
    });
}
async function unFreezeUser(uid) {

    try {

        const me = auth.currentUser;
        if (!me) return false;

        const meSnap = await database.ref(`users/${me.uid}`).once("value");
        if (meSnap.val()?.role !== "moderator") return false;

        const userSnap = await database.ref(`users/${uid}`).once("value");
        if (!userSnap.exists() || userSnap.val()?.role === "moderator") return false;

        // moderation state
        await database.ref(`moderation/users/${uid}`).set({
            status: null,
            frozenAt: firebase.database.ServerValue.TIMESTAMP
        });

        // videos safe update (NO root update)
        const snap = await database
            .ref("videos")
            .orderByChild("authorUid")
            .equalTo(uid)
            .once("value");

        const promises = [];

        snap.forEach(child => {
            promises.push(
                database.ref(`videos/${child.key}/authorStatus`).set(status)
            );
        });

        await Promise.all(promises);

        return true;

    } catch (e) {
        console.error(e);
        return false;
    }
}
async function freezeUser(uid, status = "frozen_soft") {

    const allowed = ["frozen_soft", "frozen_hard", "disabled"];
    if (!uid || !allowed.includes(status)) return false;

    try {

        const me = auth.currentUser;
        if (!me) return false;

        const meSnap = await database.ref(`users/${me.uid}`).once("value");
        if (meSnap.val()?.role !== "moderator") return false;

        const userSnap = await database.ref(`users/${uid}`).once("value");
        if (!userSnap.exists() || userSnap.val()?.role === "moderator") return false;

        // moderation state
        await database.ref(`moderation/users/${uid}`).set({
            status,
            frozenAt: firebase.database.ServerValue.TIMESTAMP
        });

        // videos safe update (NO root update)
        const snap = await database
            .ref("videos")
            .orderByChild("authorUid")
            .equalTo(uid)
            .once("value");

        const promises = [];

        snap.forEach(child => {
            promises.push(
                database.ref(`videos/${child.key}/authorStatus`).set(status)
            );
        });

        await Promise.all(promises);

        return true;

    } catch (e) {
        console.error(e);
        return false;
    }
}
      function needSupport() {
    const modal = document.getElementById("support-author-modal");
    const content = document.getElementById("support-information");

    if (!modal || !content) return;

    content.innerHTML = `
        <button style="display: none;"
            class="support-modal-close"
            onclick="closeSupportModal()"
            aria-label="Закрити"
        >
            ×
        </button>

        <div class="support-icon">💙</div>

        <h2>Ви не самі</h2>

        <p>
            Добре, що ви сказали про це.
            Спробуйте зараз звернутися до людини,
            якій довіряєте.
        </p>

        <p>
            Якщо вам безпосередньо загрожує небезпека,
            зверніться до місцевих екстрених служб
            або попросіть дорослого, якому довіряєте,
            залишитися поруч.
        </p>

        <div class="support-actions" style="display: none;">

            <button
                class="support-help"
                onclick="openSupportResources()"
            >
                Ресурси підтримки
            </button>

            <button
                class="support-ok"
                onclick="closeSupportModal()"
            >
                Закрити
            </button>

        </div>
    `;

    modal.classList.add("active");
}


function openSupportResources() {
    // Тут можна відкрити окрему сторінку VideoVortex
    window.location.href = "support.html";
}
async function closeSupportModal() {
    const modal = document.getElementById("support-author-modal");
    const user = firebase.auth().currentUser;

    if (!user) return;

    try {
        const ref = database.ref(`supportRequests/${user.uid}`);
        const snapshot = await ref.once("value");

        const requests = snapshot.val();

        if (requests) {
            const updates = {};

            Object.entries(requests).forEach(([key, request]) => {
                if (request?.status === "pending") {
                    updates[`${key}/status`] = "read";
                    updates[`${key}/timestamp`] =
                        firebase.database.ServerValue.TIMESTAMP;
                }
            });

            if (Object.keys(updates).length > 0) {
                await ref.update(updates);
            }
        }

        if (modal) {
            modal.style.display = "none";
        }

    } catch (error) {
        console.error("❌ Помилка закриття support:", error);
    }
                                   }
function clearFeedCache() {
  Object.keys(localStorage)
    .filter(k => k.startsWith("video_cache_"))
    .forEach(k => localStorage.removeItem(k));
}
function cleanupExpiredStories() {
    database.ref("stories").once("value", snap => {
        snap.forEach(child => {
            const s = child.val();

            if (s.expiresAt && Date.now() > s.expiresAt) {
                child.ref.remove();
            }
        });
    });
}
async function loadVideos() {
    const videoGallery = document.getElementById("video-gallery");
    if (!videoGallery) return;

    videoGallery.innerHTML = "";
    const showNSFWGlobal = showNSFW;

    database.ref("videos").on("child_added", async snapshot => {
        const videoData = snapshot.val();
        const videoKey = snapshot.key;

        const isExpired =
            videoData.autoDelete24h &&
            videoData.expiresAt &&
            Date.now() > videoData.expiresAt;

        if (isExpired) return;

        // =====================
        // FIXED CACHE LOGIC
        // =====================

        let videoDataRaw = videoMemoryCache[videoKey];

        if (!videoDataRaw) {
            const local = getVideoCache(videoKey);

            if (local) {
                videoDataRaw = local;
            } else {
                videoDataRaw = videoData;
                setVideoCache(videoKey, videoData);
            }

            videoMemoryCache[videoKey] = videoDataRaw;
        } else {
            // sync update fix
            videoDataRaw = videoData;
            videoMemoryCache[videoKey] = videoData;
            setVideoCache(videoKey, videoData);
        }

        // 🔹 1. Фільтри
        if (videoDataRaw.nsfw && !showNSFWGlobal) {
          clearFeedCache();
          return;
}
        if (videoDataRaw.authorUid) {
          const blockedYou = await isUserBlockedByMe(videoDataRaw.authorUid);
            const blockedMe = await didUserBlockMe(videoDataRaw.authorUid);
            if (blockedMe || blockedYou) {
              clearFeedCache();
              return;
            }
        }

        if (videoDataRaw.private && videoDataRaw.email !== currentUserEmail) {
           clearFeedCache();
          return;
        }

        if (
            videoDataRaw.domainRestrict &&
            (!currentUserEmail ||
                !currentUserEmail.endsWith("@kfccte-nau.ukr.education"))
        ) return;
        // 🔹 2. Запобігання дублюванню
        if (document.querySelector(`[data-id="${videoKey}"]`)) return;

        const videoWrapper = document.createElement("div");
        videoWrapper.className = "video-thumb-wrapper";

        const videoElement = document.createElement("img");
        videoElement.classList.add("video-item");
        videoElement.src = videoData.thumbnail || "default.jpg";
        videoElement.dataset.title = videoData.title || "";
        videoElement.dataset.description = videoData.description || "";
        videoElement.dataset.author = videoData.author || "";
        videoElement.style.filter = videoData.nsfw ? "blur(20px)" : "none";

        cacheImage(videoElement.src);

        // =====================
        // FIXED TIMER (NO LEAK)
        // =====================
if (videoDataRaw.score > 15) {
            const popular = document.createElement("div");
            popular.className = "stories-timer";

            const popularSpan = document.createElement("span");
            popularSpan.textContent = "🔥 Popular";
            popular.appendChild(popularSpan);
            videoWrapper.appendChild(popular);
}
        if (videoDataRaw.autoDelete24h && videoDataRaw.expiresAt) {
            const timer = document.createElement("div");
            timer.className = "stories-timer";

            const timeSpan = document.createElement("span");
            timer.appendChild(timeSpan);

            let interval;

            const update = () => {
                const diff = videoDataRaw.expiresAt - Date.now();

                if (diff <= 0) {
                    clearInterval(interval);
                    videoWrapper.remove();
                    return;
                }

                const h = Math.floor(diff / 3600000);
                const m = Math.floor((diff % 3600000) / 60000);
                const s = Math.floor((diff % 60000) / 1000);

                timeSpan.textContent =
                    `${String(h).padStart(2, "0")}:` +
                    `${String(m).padStart(2, "0")}:` +
                    `${String(s).padStart(2, "0")}`;
            };

            update();
            interval = setInterval(update, 1000);

            videoWrapper.appendChild(timer);
        }

        // 🔹 4. Клік по відео
        videoElement.onclick = () => {
            const viewedKey = `viewed_${videoKey}`;

            if (!localStorage.getItem(viewedKey)) {
                const newViewCount = (videoDataRaw.views || 0) + 1;

                database.ref("videos/" + videoKey).update({ views: newViewCount })
                    .then(() => localStorage.setItem(viewedKey, true))
                    .catch(console.error);
            }

            const videoParams = new URLSearchParams({
                key: videoKey
            });

            window.location.href = `video.html?${videoParams.toString()}`;
        };

        // 🔹 6. Інформація
        const infoElement = document.createElement("div");
        infoElement.classList.add("video-info");



  const avatar = document.createElement("div");
avatar.className = "avatar";

const authorEl = document.createElement("span");
authorEl.textContent = videoDataRaw?.author || "Анонім";

        if (videoDataRaw.authorStatus == "frozen_soft") {
          avatar.innerText = "👻";
          avatar.style.background = `${videoDataRaw.authorColor}`;
          } else if (videoDataRaw.authorAvatar) {
            avatar.style.backgroundImage = `url(${videoDataRaw.authorAvatar})`;
            avatar.style.backgroundSize = "cover";
avatar.style.backgroundPosition = "center";
avatar.style.backgroundRepeat = "no-repeat";
          }  else {
            avatar.innerText = getInitials(videoDataRaw.author);
            avatar.style.background = `${videoDataRaw.authorColor}`;
        }

        avatar.onclick = () => {
            const infoParams = new URLSearchParams({
                uid: videoDataRaw.authorUid || "",
            });
            window.location.href = `profile.html?${infoParams.toString()}`;
        };

        const detailsElement = document.createElement("div");
        detailsElement.classList.add("video-details");

        const isFrozen = videoDataRaw.authorStatus === "frozen_soft";

detailsElement.innerHTML = `
    ${sanitizeHTML(videoDataRaw.title || "Без назви")}
    ${videoDataRaw.private ? "<span style='color: orange;'>🔒 <span data-i18n='private'></span></span>" : ""}
    ${videoDataRaw.nsfw ? "<span style='color: red;'>NSFW</span>" : ""}

    <br>

    Автор: ${
        isFrozen
            ? "❄️ <span data-i18n='account-deleted'>Видалений акаунт</span>"
            : sanitizeHTML(videoDataRaw.author || "Анонім")
    }

    ${videoDataRaw.owner === true && videoDataRaw.verifiedBadge
        ? `<img class='adaptive-stroke' src='${videoDataRaw.verifiedBadge}'>`
        : ""
    }

    <br>

    ${getSafeBanduraHTML(videoDataRaw.banduraExtra)}
    <div class='info-element'>
<p style='display: flex; justify-content: center; align-items: center;'><i class='material-symbols'>play_arrow</i>${videoDataRaw.views || 0}</p><span class='info-divider'>•</span>
 <p style='display: flex; justify-content: center; align-items: center;'><i class='material-symbols'>event</i>${videoDataRaw.publishDate || "—"}
</p></div>`;
    

        // 🔹 MENU
        const moreBtn = document.createElement("a");
        moreBtn.classList.add("more-btn");
        moreBtn.innerHTML = `<i class="material-symbols">more_vert</i>`;

        const actionMenu = document.createElement("div");
        actionMenu.classList.add("action-menu");
        actionMenu.style.display = "none";
if (currentUserRole === "moderator") {

            const freezeBtn = document.createElement("button");
            freezeBtn.textContent = "❄ Заморозити";

            freezeBtn.onclick = async () => {
                await freezeUser(videoDataRaw.authorUid, "frozen_soft");
            };
           const unFreezeBtn = document.createElement("button");
           
            unFreezeBtn.textContent = "Розморозити";
            unFreezeBtn.onclick = async () => {
                await unFreezeUser(videoDataRaw.authorUid);
            };
            const banBtn = document.createElement("button");
            banBtn.textContent = "⛔ Бан";

            banBtn.onclick = async () => {
                await freezeUser(videoDataRaw.authorUid, "frozen_hard");
            };

            actionMenu.appendChild(freezeBtn);
            actionMenu.appendChild(unFreezeBtn);
            actionMenu.appendChild(banBtn);
        }

        if (currentUserEmail === videoDataRaw.email || currentUserEmail === "zhuzhun2008@gmail.com") {
            const deleteButton = document.createElement("button");
            deleteButton.innerHTML = `<a style="padding:3px 8px; display:flex; border-radius: 50%; align-items:center; justify-content:center;">
                <i class="material-symbols">delete</i>Видалити</a>`;

            deleteButton.onclick = () => {
                deleteVideo(videoKey, videoDataRaw.url);
                actionMenu.style.display = "none";
            };

            actionMenu.appendChild(deleteButton);
        }

        if (currentUserEmail === videoDataRaw.email) {
            const editButton = document.createElement("button");
            editButton.innerHTML = `<a style="padding:3px 8px; display:flex; align-items:center; justify-content:center;">
                <i class="material-symbols">edit</i>Редагувати</a>`;

            editButton.onclick = () => {
                editVideo(videoKey, videoDataRaw);
                actionMenu.style.display = "none";
            };

            actionMenu.appendChild(editButton);
        }

        moreBtn.onclick = e => {
            e.stopPropagation();

            document.querySelectorAll(".action-menu").forEach(m => {
                if (m !== actionMenu) m.style.display = "none";
            });

            actionMenu.style.display =
                actionMenu.style.display === "block" ? "none" : "block";
        };

        // FIX: listener only once
        if (!videoGallery.dataset.listener) {
            videoGallery.addEventListener("click", e => {
                if (!e.target.closest(".action-menu") && !e.target.closest(".more-btn")) {
                    document.querySelectorAll(".action-menu").forEach(m => m.style.display = "none");
                }
            });

            videoGallery.dataset.listener = "true";
        }

        infoElement.appendChild(avatar);
        infoElement.appendChild(detailsElement);
        infoElement.appendChild(moreBtn);
        infoElement.appendChild(actionMenu);

        const container = document.createElement("div");
        container.classList.add("video-container");
        container.dataset.id = videoKey;

        container.appendChild(infoElement);
        videoWrapper.appendChild(videoElement);
        container.appendChild(videoWrapper);

        videoGallery.appendChild(container);
      applyTranslations();
    });
}
function cleanupExpiredVideos() {
    database.ref("videos").once("value", snap => {
        snap.forEach(child => {
            const v = child.val();

            if (v.autoDelete24h && v.expiresAt && Date.now() > v.expiresAt) {
                child.ref.remove();
            }
        });
    });
}


const randomComments = [
  "Класне відео! 🎬👍",
  "Дуже цікаво 🤓✨",
  "Дякую за контент 🙏💖",
  "Супер пояснення!👌📚",
  "Підтримую 💪🔥",
  "Топчик!⭐😎"
];
function formatTime(seconds) {
    seconds = Math.floor(seconds); // округлюємо до цілого числа
    const h = Math.floor(seconds / 3600); // години
    const m = Math.floor((seconds % 3600) / 60); // хвилини
    const s = seconds % 60; // секунди

    const mm = m.toString().padStart(2, "0");
    const ss = s.toString().padStart(2, "0");

    if (h > 0) {
        const hh = h.toString().padStart(2, "0");
        return `${hh}:${mm}:${ss}`;
    } else {
        return `${mm}:${ss}`;
    }
}
function insertRandomComment(videoKey) {
  const inputId = `comment-input-${videoKey}`;
  const input = document.getElementById(inputId);

  if (input) {
    const randomIndex = Math.floor(Math.random() * randomComments.length);
    input.value = randomComments[randomIndex];
  }
}
async function deleteArchive(url, archiveId) {
  if (!confirm("Ви впевнені, що хочете видалити цей архів?")) return;

  const uid = auth.currentUser.uid;

  try {
    // 1. Delete from Storage (ВАЖЛИВО: через реальний path)
    const storageRef = firebase.storage().refFromURL(url);
    await storageRef.delete();

    // 2. Delete only specific DB record
    await firebase.database()
      .ref(`users/${uid}/archive/${archiveId}`)
      .remove();

    // 3. UI update
    showNotificationModal();
    message.innerHTML = "Відео успішно видалено.";
    loadSecureFiles();

  } catch (error) {
    console.error("Помилка при видаленні відео:", error);
    showNotificationModal();
    message.innerHTML = "Помилка: " + error.message;
  }
}
async function deleteVideo(videoKey, videoURL) {
    if (!videoURL || !videoKey) {
        showNotificationModal();
        message.innerHTML = "Немає даних для видалення відео";
        return;
    }

    if (!confirm("Ви впевнені, що хочете видалити це відео?")) return;

    try {
        // 🔹 1. Storage delete
        const storageRef = storage.refFromURL(videoURL);
        await storageRef.delete();

        // 🔹 2. Delete video document
        await database.ref(`videos/${videoKey}`).remove();

        // 🔹 3. Delete all comments for this video
        const snapshot = await database.ref("comments")
            .orderByChild("videoKey")
            .equalTo(videoKey)
            .once("value");

        const updates = {};

        snapshot.forEach(child => {
            updates[`comments/${child.key}`] = null;
        });

        if (Object.keys(updates).length > 0) {
            await database.ref().update(updates);
        }

        // 🔹 4. UI update
        showNotificationModal();
        message.innerHTML = "Відео успішно видалено.";
        loadVideos();

    } catch (error) {
        console.error("Помилка при видаленні відео:", error);
        showNotificationModal();
        message.innerHTML = "Помилка: " + error.message;
    }
}
async function migrateUsersToSearch() {
    try {
        console.log("🔄 Починаємо міграцію...");

        const snapshot = await database
            .ref("users")
            .once("value");

        const users = snapshot.val() || {};
        const updates = {};

        let count = 0;

        Object.entries(users).forEach(([uid, user]) => {

            if (!user) return;

            updates[`userSearch/${uid}`] = {
                name: user.name || "",
                supername: user.supername || "",
                username: user.username || "",
                privateProfile: user.privateProfile === true
            };

            count++;
        });

        if (count === 0) {
            console.log("ℹ️ Користувачів для міграції немає.");
            return;
        }

        await database.ref().update(updates);

        console.log(
            `✅ Міграція завершена. Перенесено: ${count} користувачів.`
        );

    } catch (error) {
        console.error("❌ Помилка міграції:", error);
    }
}
migrateUsersToSearch();
function createSecondChannel() {
  const name = document.getElementById("second-channel-name").value.trim();
  if (!name) return showNotificationModal();
  message.innerHTML = "Введи назву";

  const uid = auth.currentUser.uid;

  database.ref(`users/${uid}/channels/second`).set({
    name,
    avatar: name.charAt(0).toUpperCase()
  });
showNotificationModal();
  message.innerHTML = "Другий канал створено ✅";
}
function editVideo(videoKey, videoDataRaw) {
  currentEditKey = videoKey;
  document.getElementById("edit-modal").style.display = 'flex';
const editPrewiew = document.querySelector(".image-container img");
editPrewiew.src = videoDataRaw.thumbnail;
  // Заповнюємо поля редагування
  document.getElementById("edit-video-title").value = videoDataRaw.title || '';
  document.getElementById("edit-video-description").value = videoDataRaw.description || '';
document.getElementById("edit-private-checkbox").checked = videoDataRaw.private || false;
}

function saveVideoChanges() {

  if (!currentEditKey) {
    showNotificationModal();
    message.innerHTML = "Відео не вибрано.";
    return;
  }

  const newTitle = document.getElementById("edit-video-title").value.trim();
  const newPrivate = document.getElementById("edit-private-checkbox").checked;
  const newDescription = document.getElementById("edit-video-description").value.trim();
  const newPreview = document.getElementById("action-btn").files[0];

  if (!newTitle) {
    showNotificationModal();
    message.innerHTML = "Назва не може бути порожньою!";
    return;
  }

  function updateVideo(thumbnailURL = null) {

    const updateData = {
      title: newTitle,
      description: newDescription,
      private: newPrivate
    };

    if (thumbnailURL) {
      updateData.thumbnail = thumbnailURL;
    }

    database.ref("videos/" + currentEditKey).update(updateData)
      .then(() => {

        showNotificationModal();
        message.innerHTML = "✅ Відео оновлено!";

        document.getElementById("edit-modal").style.display = "none";

        currentEditKey = null;

        loadVideos();

      })
      .catch(error => {

        showNotificationModal();
        message.innerHTML =
          "❌ Помилка при оновленні відео: " + error.message;

      });
  }

  // Якщо вибрана нова превʼюшка
  if (newPreview) {

    const thumbRef = storage.ref(
      `thumbnails/${Date.now()}_${newPreview.name}`
    );

    thumbRef.put(newPreview)
      .then(() => {
        return thumbRef.getDownloadURL();
      })
      .then(url => {
        updateVideo(url);
      })
      .catch(error => {

        showNotificationModal();
        message.innerHTML =
          "❌ Помилка завантаження превʼюшки: " + error.message;

      });

  } else {

    updateVideo();

  }
}
function loadChannelSelect() {
    const select = document.getElementById("video-channel-select");
    if (!select) return;

    const user = firebase.auth().currentUser;
    if (!user) return;

    const uid = user.uid;
    select.innerHTML = "";

    database.ref(`users/${uid}`).once("value").then(snapshot => {
        const userData = snapshot.val();
        if (!userData) return;

        // 🔹 Основний канал
        const mainName = `${userData.name || ""} ${userData.supername || ""}`.trim();

        const mainOption = document.createElement("option");
        mainOption.value = "main";
        mainOption.textContent = mainName || "Основний канал";
        mainOption.dataset.name = mainName;
        mainOption.dataset.avatar = userData.avatar || "";
        select.appendChild(mainOption);

        // 🔹 Другий канал
        if (userData.channels && userData.channels.second) {
            const second = userData.channels.second;

            const secondOption = document.createElement("option");
            secondOption.value = "second";
            secondOption.textContent = second.name || "Другий канал";
            secondOption.dataset.name = second.name || "Другий канал";
            secondOption.dataset.avatar = second.avatar || "";
            select.appendChild(secondOption);
        }
    });
}
function getActiveChannelData() {
    const select = document.getElementById("video-channel-select");
    if (!select) return null;

    const option = select.options[select.selectedIndex];
    if (!option) return null;

    return {
        key: option.value,       // main | second
        name: option.dataset.name,
        avatar: option.dataset.avatar || ""
    };
}
async function convertToMp4(file, onStatus) {
  if (!window.ffmpeg.loaded) {
    onStatus?.("Завантаження відео-движка…");
    await window.ffmpeg.load(); // БЕЗ coreURL тут
  }

  onStatus?.("Підготовка файлу…");
  const data = await window.fetchFile(file);
  window.ffmpeg.FS("writeFile", "input.mp4", data);

  onStatus?.("Конвертація у MP4 (H.264)…");
  await window.ffmpeg.run(
    "-i", "input.mp4",
    "-c:v", "libx264",
    "-preset", "veryfast",
    "-pix_fmt", "yuv420p",
    "-movflags", "faststart",
    "-c:a", "aac",
    "-b:a", "128k",
    "output.mp4"
  );

  const out = window.ffmpeg.FS("readFile", "output.mp4");
  return new File([out.buffer], "converted.mp4", { type: "video/mp4" });
}
document.getElementById("video-file").addEventListener("change", async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  // якщо вже mp4 — нічого не робимо
  if (file.type === "video/mp4") return;

  const statusEl = document.getElementById("progress-text");
  document.getElementById("progress-container").style.display = "block";

  try {
    const converted = await convertToMp4(file, (status) => {
      statusEl.innerText = status;
    });

    // 🔁 ПІДМІНА ФАЙЛУ В INPUT
    const dt = new DataTransfer();
    dt.items.add(converted);
    e.target.files = dt.files;

    statusEl.innerText = "Готово до  ✔";
  } catch (err) {
    console.error("❌ Конвертація не вдалася:", err);
   showNotificationModal();
    message.innerHTML = "Помилка конвертації відео";
  }
});
function updateUploadUI(id, progress, timeLeftSec) {
  const el = document.getElementById(id);
  if (!el) return;

  const percent = el.querySelector(".upload-progress-text");
  const time = el.querySelector(".upload-time-left");

  if (percent) percent.innerText = `${Math.round(progress)}%`;
  if (time) time.innerText = `~${Math.round(timeLeftSec)}s left`;
}
function addVideoToFeed(video) {
  const container = document.getElementById("video-gallery");

  if (!container) {
    console.warn("videos-feed container not found");
    return;
  }

  const card = document.createElement("div");
  card.className = "video-card";
  card.id = video.id;

  card.innerHTML = `
    <img src="${video.thumbnail}" class="video-thumb"/>

    <div class="video-meta">
      <div class="video-title">${video.title}</div>
      <div class="video-author">${video.author}</div>

      ${
        video.uploading
          ? `
        <div class="upload-status">
          <div class="upload-progress-text">0%</div>
          <div class="upload-time-left">calculating...</div>
        </div>
      `
          : ""
      }
    </div>
  `;

  container.prepend(card);
}
function loadNotifications() {
    const user = firebase.auth().currentUser;

    if (!user) return;

    const notificationsRef = firebase.database()
        .ref("notifications/" + user.uid)
        .orderByChild("createdAt");

    notificationsRef.once("value")
        .then(snapshot => {
            const list = document.getElementById("accountNotificationsList");

            if (!list) return;

            list.innerHTML = "";

            if (!snapshot.exists()) {
                list.innerHTML = "<p>Немає сповіщень</p>";
                return;
            }

            const notifications = [];

            snapshot.forEach(child => {
                notifications.push({
                    key: child.key,
                    ...child.val()
                });
            });

            // Нові спочатку
            notifications.reverse();

            notifications.forEach(notification => {
                const item = document.createElement("div");

                item.className = "notification-item";

                item.innerHTML = `
                    <div>
                        <strong>${notification.message || "Нове сповіщення"}</strong>
                        <small>
                            ${notification.createdAt
                                ? new Date(notification.createdAt).toLocaleString()
                                : ""}
                        </small>
                    </div>
                `;

                item.onclick = () => {
                    if (notification.videoKey) {
                        window.location.href =
                            `video.html?key=${notification.videoKey}`;
                    }
                };

                list.appendChild(item);
            });
        })
        .catch(error => {
            console.error("NOTIFICATIONS_LOAD_ERROR:", error);
        });
}
function finalizeUpload(tempId, data) {
  const el = document.getElementById(tempId);
  if (!el) return;

  el.querySelector(".upload-box")?.remove();

  el.querySelector("h3").innerText = data.title;
  el.querySelector("p").innerText = data.author;

  el.id = data.realId;
}
function createPublishVideo({ id, title, author, thumbnail }) {
  const videoGallery = document.getElementById("video-gallery");
  if (!videoGallery) return;

  const el = document.createElement("div");
  el.className = "video-details";
  el.id = id;

  el.innerHTML = `
    <img src="${thumbnail}" style="width:120px;" />

    <div>${title}</div>
    <div>${author}</div>

    <div id="${id}-status">Очікування...</div>

    <progress id="${id}-progress" value="0" max="100"></progress>
  `;

  videoGallery.prepend(el);
  return el;
}
async function uploadVideo() {
  const startTime = Date.now();

  const isBandura =
    document.getElementById("bandura-video")?.checked || false;

  const autoDelete24h =
    document.getElementById("auto-delete-24h")?.checked || false;

  const banduraExtra = isBandura ? {
    style: document.getElementById("bandura-style").value || "Соло",
    key: document.getElementById("bandura-key").value || "",
    difficulty: document.getElementById("bandura-difficulty").value || "Початковий",
    tempo: document.getElementById("bandura-tempo").value || "",
    slowMode: document.getElementById("bandura-slow").checked,
    event: document.getElementById("bandura-event").value || "",
    year: document.getElementById("bandura-year").value || "",
    performer: document.getElementById("bandura-performer").value || "",
    tags: document.getElementById("bandura-tags").value || "",
    markers: document.getElementById("bandura-markers").value || ""
  } : null;

  const videoTitle = document.getElementById("video-title").value;
  const videoDescription = document.getElementById("video-description").value;
  const videoFile = document.getElementById("video-file").files[0];

  const isNSFW = document.getElementById("nsfw").checked;
  const safeVideo = document.getElementById("save-video-checkbox").checked;
  const disabledComments = document.getElementById("disabled-comments-checkbox").checked;
  const privateVideo = document.getElementById("private-video-checkbox").checked;
  const domainRestrict = document.getElementById("domain-restrict-checkbox")?.checked || false;

  if (!videoTitle || !videoFile) {
    showNotificationModal();
    message.innerHTML = "Будь ласка, заповніть всі поля!";
    return;
  }

  const user = firebase.auth().currentUser;

  if (!user) {
    showNotificationModal();
    message.innerHTML = "Потрібно увійти в акаунт";
    return;
  }

  const uid = user.uid;

  try {
    const snapshot = await database.ref("users/" + uid).once("value");
    const userData = snapshot.val() || {};

    const selectedChannel =
      document.getElementById("video-channel-select").value || "main";

    let authorName;
    let authorAvatarUrl = null;

    if (selectedChannel === "second" && userData.channels?.second) {
      authorName = userData.channels.second.name || "Другий канал";

      const secondAvatar = userData.channels.second.avatarId;

      if (secondAvatar) {
        try {
          authorAvatarUrl =
            await storage.ref(`avatars/${secondAvatar}.webp`).getDownloadURL();
        } catch {}
      }

    } else {
      authorName =
        `${userData.name || ""} ${userData.supername || ""}`.trim() ||
        "Основний канал";

      const mainAvatar = userData.avatarId;

      if (mainAvatar) {
        try {
          authorAvatarUrl =
            await storage.ref(`avatars/${mainAvatar}.webp`).getDownloadURL();
        } catch {}
      }
    }

    const storageRef =
      storage.ref(`videos/${Date.now()}_${videoFile.name}`);

    const uploadTask = storageRef.put(videoFile);

    const tempId = "temp_" + Date.now();
    const tempThumbnailUrl = URL.createObjectURL(videoFile);

    createPublishVideo({
      id: tempId,
      title: videoTitle,
      author: "Uploading...",
      thumbnail: tempThumbnailUrl,
      uploading: true
    });
    const progressContainer =
      document.getElementById("progress-container");

    progressContainer.style.display = "block";

    localStorage.setItem("activeUpload", JSON.stringify({
      fileName: videoFile.name,
      fileSize: videoFile.size,
      bytesTransferred: 0,
      startedAt: Date.now(),
      status: "uploading"
    }));

    uploadTask.on(
      "state_changed",

      snapshot => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        const timeElapsed =
          (Date.now() - startTime) / 1000;

        const speed =
          snapshot.bytesTransferred / (timeElapsed || 0.001);

        const remainingBytes =
          snapshot.totalBytes - snapshot.bytesTransferred;

        const timeLeftSec =
          remainingBytes / Math.max(speed, 1);

        updateUploadUI(tempId, progress, timeLeftSec);

        const uploadData =
          JSON.parse(localStorage.getItem("activeUpload"));

        if (uploadData) {
          uploadData.bytesTransferred =
            snapshot.bytesTransferred;

          localStorage.setItem(
            "activeUpload",
            JSON.stringify(uploadData)
          );
        }

        document.getElementById("time-left").innerText =
          `${Math.round(timeLeftSec)}s`;

        document.getElementById("upload-progress").value =
          progress;

        document.getElementById("progress-text").innerText =
          `Завантаження: ${Math.round(progress)}%`;
      },

      error => {
        console.error(error);
        showNotificationModal();
        message.innerHTML = "Помилка завантаження відео.";
      },

      async () => {
        const uploadData =
          JSON.parse(localStorage.getItem("activeUpload"));

        if (uploadData) {
          uploadData.status = "processing";

          localStorage.setItem(
            "activeUpload",
            JSON.stringify(uploadData)
          );
        }

        try {
          const downloadURL =
            await uploadTask.snapshot.ref.getDownloadURL();

          const thumbnailBlob =
            await createThumbnail(videoFile);

          const thumbRef =
            storage.ref(`thumbnails/${Date.now()}_${videoFile.name}.jpg`);

          await thumbRef.put(thumbnailBlob);

          const thumbnailURL =
            await thumbRef.getDownloadURL();

          const now = new Date();

          const currentDate =
            `${now.getDate().toString().padStart(2,'0')}.` +
            `${(now.getMonth()+1).toString().padStart(2,'0')}.` +
            `${now.getFullYear()}`;

          const ref = await database.ref("videos").push({
            title: videoTitle,
            author: authorName,
            authorAvatar: authorAvatarUrl,
            authorUid: uid,
            authorColor: userData.color,
            videoColor: randomGradient(),
            email: user.email,

            disabledComments,
            url: downloadURL,
            thumbnail: thumbnailURL,
            description: videoDescription,
            saveVideo: safeVideo,

            views: 0,
            private: privateVideo,
            domainRestrict,
            nsfw: isNSFW,

            createdAt: Date.now(),
            autoDelete24h,
            publishDate: currentDate,

            banduraExtra,
            expiresAt: autoDelete24h
              ? Date.now() + 86400000
              : null
          });

          finalizeUpload(tempId, {
            realId: ref.key,
            title: videoTitle,
            author: authorName
          });

          URL.revokeObjectURL(tempThumbnailUrl);

          localStorage.removeItem("activeUpload");
document.getElementById("upload-modal").style.display = "none";
          showPopup();

          document.getElementById("message-notification").innerHTML =
            "Відео завантажено!";

          progressContainer.style.display = "none";

          

        } catch (err) {
          console.error(err);
          showNotificationModal();
          message.innerHTML =
            "Помилка при завантаженні відео або мініатюри. " +
            err.message;
        }
      }
    );

  } catch (err) {
    console.error("Помилка при отриманні даних користувача:", err);
    showNotificationModal();
    message.innerHTML = "Не вдалося отримати дані профілю." + err.message;
  }
}



// Просте шифрування/дешифрування (можна замінити на AES)


// Відкрити форму редагування імені
function editName() {
  document.getElementById("form-edit-name").style.display = "block";
  document.getElementById("name").style.display = "none";
  document.getElementById("button-name").style.display = "none";

  const currentName = document.getElementById("name").textContent.replace("Ім'я: ", "");
  document.getElementById("edit-name").value = currentName;
}

// Відкрити форму редагування прізвища
function editSuperName() {
  document.getElementById("form-edit-supername").style.display = "block";
  document.getElementById("supername").style.display = "none";
  document.getElementById("button-supername").style.display = "none";

  const currentSuperName = document.getElementById("supername").textContent.replace("Прізвище: ", "");
  document.getElementById("edit-supername").value = currentSuperName;
}

// Зберегти зміну імені
function saveEditName() {
  const newName = document.getElementById("edit-name").value.trim();
  const user = firebase.auth().currentUser;

  if (!user) {
    showNotificationModal();
    message.innerHTML = "Будь ласка, увійдіть.";
    return;
  }

  const uid = user.uid;

  const updates = {};
  updates[`users/${uid}/name`] = newName;
  updates[`publicUsers/${uid}/name`] = newName;

  database.ref().update(updates)
    .then(() => {
      showNotificationModal();
      message.innerHTML = "Ім’я змінено!";

      document.getElementById("form-edit-name").style.display = "none";
      document.getElementById("name").style.display = "block";
      document.getElementById("button-name").style.display = "block";
      document.getElementById("name").textContent = "Ім'я: " + newName;

      updateVideosAuthor();
      updatePhotosAuthor();
      updateCommentsAuthor();
      updateNameBlockedUsers();
    })
    .catch(err => {
      showNotificationModal();
      message.innerHTML = "Помилка: " + err.message;
    });
}


// Зберегти зміну прізвища
function saveEditSuperName() {
  const newSuperName = document.getElementById("edit-supername").value.trim();
  const user = firebase.auth().currentUser;

  if (!user) {
    showNotificationModal();
    message.innerHTML = "Будь ласка, увійдіть.";
    return;
  }

  const uid = user.uid;

  const updates = {};
  updates[`users/${uid}/supername`] = newSuperName;
  updates[`publicUsers/${uid}/supername`] = newSuperName;

  database.ref().update(updates)
    .then(() => {
      showNotificationModal();
      message.innerHTML = "Прізвище змінено!";

      document.getElementById("form-edit-supername").style.display = "none";
      document.getElementById("supername").style.display = "block";
      document.getElementById("button-supername").style.display = "block";
      document.getElementById("supername").textContent = "Прізвище: " + newSuperName;

      updateVideosAuthor();
      updatePhotosAuthor();
      updateCommentsAuthor();
      updateNameBlockedUsers();
    })
    .catch(err => {
      showNotificationModal();
      message.innerHTML = "Помилка: " + err.message;
    });
}
function loadPhotoChannelSelect() {
    const select = document.getElementById("photo-channel-select");
    if (!select) return;

    const user = firebase.auth().currentUser;
    if (!user) return;

    const uid = user.uid;
    select.innerHTML = "";

    database.ref(`users/${uid}`).once("value").then(snapshot => {
        const userData = snapshot.val();
        if (!userData) return;

        // 🔹 Основний канал
        const mainName = `${userData.name || ""} ${userData.supername || ""}`.trim();

        const mainOption = document.createElement("option");
        mainOption.value = "main";
        mainOption.textContent = mainName || "Основний канал";
        mainOption.dataset.name = mainName;
        mainOption.dataset.avatar = userData.avatar || "";
        select.appendChild(mainOption);

        // 🔹 Другий канал
        if (userData.channels && userData.channels.second) {
            const second = userData.channels.second;

            const secondOption = document.createElement("option");
            secondOption.value = "second";
            secondOption.textContent = second.name || "Другий канал";
            secondOption.dataset.name = second.name || "Другий канал";
            secondOption.dataset.avatar = second.avatar || "";
            select.appendChild(secondOption);
        }
    });
}
function getActivePhotoChannelData() {
    const select = document.getElementById("photo-channel-select");
    if (!select) return null;

    const option = select.options[select.selectedIndex];
    if (!option) return null;

    return {
        key: option.value,       // main | second
        name: option.dataset.name,
        avatar: option.dataset.avatar || ""
    };
}
// Оновлення авторів у відео та коментарях

// Відправка коментаря



function toggleUploadVisibility() {
    const isMobile = window.innerWidth <= 1024;
    const addStory = document.getElementById("add-story");
    const plusPost = document.getElementById("plus-button");
    const plusDesktopPost = document.getElementById("plus-desktop-button");
    const logoutLink = document.getElementById("logout-link");
    const openMenu = document.getElementById("open-menu");
    const accountDesktopLink = document.getElementById("account-desktop-link");

    if (!plusPost || !plusDesktopPost || !openMenu || !accountDesktopLink) {
        return;
    }

    const user = firebase.auth().currentUser;

    // Користувач не авторизований
    if (!user) {
        plusPost.style.display = "none";
        plusDesktopPost.style.display = "none";

        if (logoutLink) {
            logoutLink.style.display = "none";
        }
        openMenu.style.display = isMobile ? "none" : "flex";
        accountDesktopLink.style.display = "none";

        return;
    }

    // Користувач авторизований
    if (isMobile) {
        openMenu.style.display = "none";
        addStory.style.display = "flex";
        plusPost.style.display = "grid";
        plusDesktopPost.style.display = "none";

        if (logoutLink) {
            logoutLink.style.display = "none";
        }

        accountDesktopLink.style.display = "none";

    } else {
        openMenu.style.display = "flex";
        addStory.style.display = "none";
        plusPost.style.display = "none";
        plusDesktopPost.style.display = "flex";

        if (logoutLink) {
            logoutLink.style.display = "flex";
        }

        accountDesktopLink.style.display = "flex";
    }
}

window.addEventListener("load", () => {
    toggleUploadVisibility();
});

window.addEventListener("resize", () => {
    toggleUploadVisibility();
});


function updateUI(user) {
    const userInfoEl = document.getElementById("user-info");
    const logoutLink = document.getElementById("logout-link");

    if (user) {
        currentUserEmail = user.email;

        if (userInfoEl) {
            userInfoEl.textContent = `Ви увійшли як: ${user.email}`;
        }
        
        document.querySelector(".stories-bar")
            ?.style.setProperty("display", "flex");
        
        document.getElementById("auth-link")
            ?.style.setProperty("display", "none");

        document.getElementById("register-link")
            ?.style.setProperty("display", "none");

        if (logoutLink) {
            logoutLink.style.display = "flex";
        }

        document.getElementById("smart-settings")
            ?.style.setProperty("display", "grid");

        document.getElementById("account-link")
            ?.style.setProperty("display", "block");

        document.getElementById("smart-menu")
            ?.style.setProperty("left", "44%");

        // Коментарі
        document.querySelectorAll('[id^="comment-input-"]').forEach(el => {
            el.style.display = "flex";
        });

        // Обмеження домену
        const domainRestrictContainer =
            document.getElementById("domain-restrict-container");

        if (domainRestrictContainer) {
            domainRestrictContainer.style.display =
                currentUserEmail.endsWith("@kfccte-nau.ukr.education")
                    ? "block"
                    : "none";
        }

    } else {
        currentUserEmail = null;

        if (userInfoEl) {
            userInfoEl.textContent = "";
        }

       document.querySelector(".stories-bar")
            ?.style.setProperty("display", "none");

        document.getElementById("auth-link")
            ?.style.setProperty("display", "none");

        document.getElementById("register-link")
            ?.style.setProperty("display", "none");

        if (logoutLink) {
            logoutLink.style.display = "none";
        }

        document.getElementById("smart-settings")
            ?.style.setProperty("display", "none");

        document.getElementById("account-link")
            ?.style.setProperty("display", "none");

        document.getElementById("smart-menu")
            ?.style.setProperty("left", "49%");

        document.getElementById("account-desktop-link")
            ?.style.setProperty("display", "none");

        // Коментарі
        document.querySelectorAll('[id^="comment-input-"]').forEach(el => {
            el.style.display = "none";
        });
    }

    // Оновлюємо адаптивний UI
    toggleUploadVisibility();
}
async function backfillAuthorUidForUser() {
  const user = firebase.auth().currentUser;
  if (!user) return;

  const uid = user.uid;
  const email = user.email;

  const paths = ["videos", "photos", "comments"];

  for (const path of paths) {
    const snap = await database.ref(path).once("value");

    const updates = [];

    snap.forEach(child => {
      const data = child.val();

      // Знаходимо ТІЛЬКИ контент цього користувача
      if (data.email === email) {
        // Якщо ще нема authorUid — додаємо
        if (!data.authorUid) {
          updates.push(
            database.ref(`${path}/${child.key}`).update({
              authorUid: uid
            })
          );
        }
      }
    });

    if (updates.length > 0) {
      await Promise.all(updates);
      console.log(`Оновлено ${updates.length} записів у ${path}`);
    }
  }
}
// Слухач стану автентифікації

const avatarEl = document.querySelector(".avatar");
const editWallpaperProfileAvatarEl = document.getElementById("avatar");
const navAvatar = document.getElementById("nav-avatar");
const settingsAvatar = document.getElementById("settingsAvatar");
const settingsName = document.getElementById("settingsName");
const settingsEmail = document.getElementById("settingsEmail");
const input = document.getElementById("avatar-input");
const btnAvatar = document.getElementById("change-avatar");

btnAvatar.onclick = () => input.click();
document.getElementById("nsfw").onclick = function(event) {
  if (userAge < 18) {
    showNotificationModal();
    message.innerHTML = "Cталася помилка.";
  document.getElementById("nsfw").checked = false;
    
  }
  }
  
  function configureAgeUI(age) {

    const nsfwCheckbox = document.getElementById('show-nsfw-videos');
    const nsfwSlider = document.getElementById("slidernsfw");
    const nsfwInfo = document.getElementById("information-nsfw");
    const NSFW = document.getElementById("nsfw");
    const nsfwContainer = document.getElementById("nsfw-container");
    const privateVideo = document.getElementById("private-checkbox");

    if (!nsfwCheckbox) return;

    // < 13
    if (age < 13) {

        if (privateVideo) privateVideo.checked = true;

        nsfwCheckbox.checked = false;
        nsfwCheckbox.disabled = true;

        if (nsfwSlider) nsfwSlider.style.backgroundColor = "gray";
        if (NSFW) NSFW.style.display = "none";
        if (nsfwContainer) nsfwContainer.style.display = "none";
        if (nsfwInfo) nsfwInfo.style.display = "block";

        return;
    }

    // 13–17
    if (age < 18) {

        nsfwCheckbox.checked = false;
        nsfwCheckbox.disabled = true;

        if (nsfwSlider) nsfwSlider.style.backgroundColor = "gray";
        if (NSFW) NSFW.style.display = "none";
        if (nsfwContainer) nsfwContainer.style.display = "none";
        if (nsfwInfo) nsfwInfo.style.display = "block";

        return;
    }

    // 18+
    nsfwCheckbox.disabled = false;

    if (NSFW) NSFW.style.display = "block";
    if (nsfwContainer) nsfwContainer.style.display = "block";
    if (nsfwInfo) nsfwInfo.style.display = "none";

    if (!nsfwCheckbox.dataset.listenerAdded) {
        nsfwCheckbox.addEventListener("change", function () {
            showNSFW = this.checked;
        });
        nsfwCheckbox.dataset.listenerAdded = "true";
    }
}
async function uploadArchive() {
  const file = document.getElementById("zip-file").files[0];

  if (!file) {
    showNotificationModal();
    message.innerHTML = "Вибери файл.";
    return;
  }

  const user = firebase.auth().currentUser;
  if (!user) {
    alert("Користувач не авторизований");
    return;
  }

  const uid = user.uid;

  // 🔥 Upload у Firebase Storage
  const storageRef = firebase.storage().ref(
    `archives/${Date.now()}_${file.name}`
  );

  try {
    await storageRef.put(file);
    const url = await storageRef.getDownloadURL();

    // 🔥 Запис у Realtime Database
    await firebase.database().ref("users/" + uid + "/archive").push({
      url,
      name: file.name,
      createdAt: Date.now(),
      uid
    });

    alert("Зашифровано і завантажено!");
  } catch (e) {
    console.error(e);
    alert("Помилка завантаження" + e.message);
  }
}

async function loadSecureFiles() {
  const container = document.getElementById("secure-files");
  container.innerHTML = "";

  const user = firebase.auth().currentUser;
  if (!user) return;

  const uid = user.uid;


const snapshot = await firebase
    .database()
    .ref("users/" + uid + "/archive")
    .limitToLast(50)
    .once("value");

  if (!snapshot.exists()) {
  container.textContent = "Немає опублікованих архівів";
  return;
}
  snapshot.forEach(child => {
    const data = child.val();
    const key = child.key;
    
    const item = document.createElement("div");
    item.classList.add("secure-item");

    item.innerHTML = `
      <b>${data.name || "Без назви"}</b><br>
      <button class="open-btn"><i class="material-symbols">lock_open</i>Відкрити</button>
      <button class="delete-btn"><i class="material-symbols">delete</i>Видалити</button>
    `;
    const button = item.querySelector(".open-btn");
const deleteButton = item.querySelector(".delete-btn");
    button.onclick = async () => {
      // 🔒 базова перевірка доступу
      if (data.uid !== uid) {
        alert("Нема доступу");
        return;
      }
      window.location.href = data.url;
    };
  deleteButton.onclick = async () => {
  deleteArchive(data.url, key);
}
    container.appendChild(item);
  });
}
function calculateAge(birthdate) {
            if (!birthdate) return null;
            const [day, month, year] = birthdate.split(".").map(Number);
            const today = new Date();
            let age = today.getFullYear() - year;
            if (today.getMonth() + 1 < month || 
               (today.getMonth() + 1 === month && today.getDate() < day)) {
                age--;
            }
            return age;
        }
async function checkSupportRequests(user) {
    if (!user || !user.uid) {
        console.log("❌ Немає авторизованого користувача");
        return;
    }

    console.log("👤 Поточний UID:", user.uid);

    try {
        const ref = database.ref(`supportRequests/${user.uid}`);

        const snapshot = await ref.once("value");

        console.log("📦 Support snapshot exists:", snapshot.exists());
        console.log("📦 Support data:", snapshot.val());

        if (!snapshot.exists()) {
            console.log("ℹ️ Запитів підтримки немає");
            return;
        }

        const requests = snapshot.val();

        const hasPendingSupport = Object.values(requests).some(
            request =>
                request &&
                request.status === "pending"
        );

        console.log("💙 Є pending:", hasPendingSupport);

        if (!hasPendingSupport) return;

        const modal = document.getElementById("support-author-modal");

        if (!modal) {
            console.error("❌ Не знайдено #support-author-modal");
            return;
        }

        modal.style.display = "flex";

        console.log("✅ Модальне вікно показано");

    } catch (error) {
        console.error("❌ Support error:", error);
    }
          }
auth.onAuthStateChanged(async (user) => {
    if (!user) return;

    currentUser = user;
    currentUserEmail = user.email;
    currentUserUid = user.uid;
  await checkSupportRequests(user);
    try {

        // 👤 USER PROFILE (role тут)
        const userSnap = await database
            .ref(`users/${user.uid}`)
            .once("value");

        const userProfile = userSnap.val();

        if (!userProfile) {
            await auth.signOut();
            return;
        }

        // 🛡 MODERATION STATUS
        const modSnap = await database
            .ref(`moderation/users/${user.uid}`)
            .once("value");

        const modData = modSnap.val() || {};

        const role = userProfile.role || "user";
        currentUserRole = role;

        const status = modData.status || "active";
        currentUserStatus = status;

        // 🚫 BLOCK SYSTEM
        if (status === "disabled") {
            await auth.signOut();
            showBlockedScreen("⛔ Акаунт заблоковано");
            return;
        }

        if (status === "frozen_soft" || status === "frozen_hard") {
            await auth.signOut();
            showBlockedScreen("❄️ Акаунт заморожено");
            return;
        }
// =========================
// 💙 SUPPORT REQUESTS
// =========================


        // ✔️ EMAIL VERIFY GATE
        if (!user.emailVerified) {
            blockScreenForVerification();

            const verificationInterval = setInterval(async () => {
                await user.reload();

                if (user.emailVerified) {
                    clearInterval(verificationInterval);
                    unblockScreenForVerification();
                    updateUI(user);
                }
            }, 5000);
        }

        // =========================
        // 🔹 INITIAL LOAD
        // =========================

        loadPhotoChannelSelect();
        loadChannelSelect();
        loadSecureFiles();
        loadLibrary(user);
       loadYouStories(user);
        updateColorsAuthor(user);
        updateColorsCommentsAuthor(user);
        updateColorsPhotosAuthor(user);
        updateColorsVideosAuthor(user);
        cleanupExpiredVideos();
        cleanupExpiredStories();
        updateVideosAuthor();
        updatePhotosAuthor();
      loadNotifications();
        await updateNameBlockedUsers();
        updateCommentsAuthor();
        backfillAuthorUidForUser();

        enablePushNotifications(user.uid);

        // =========================
        // 🔹 AGE LOGIC
        // =========================

        const birthdateStr = userProfile.birthdate;
        let birthYear = userProfile.birthYear;

        let age = null;

        if (birthdateStr) {
            age = calculateAge(birthdateStr);

            if (!birthYear) {
                const [d, m, y] = birthdateStr.split(".").map(Number);
                await database.ref(`users/${user.uid}`).update({ birthYear: y });
            }
        }

        if (age !== null) {
            configureAgeUI(age);
        } else {
            document.getElementById("birthdate-modal")
                ?.style.setProperty("display", "flex");
        }


        // =========================
        // 🔹 UI
        // =========================

        const viewBirthdate = document.getElementById("view");
        if (viewBirthdate) {
            viewBirthdate.textContent =
                `Дата народження: ${birthdateStr || "не вказано"}`;
        }

        const emailEl = document.getElementById("email");
        if (emailEl) {
            emailEl.textContent =
                `${userProfile.name || ""} ${userProfile.supername || ""}`;
        }

        const settingsNameEl = document.getElementById("settingsName");
        if (settingsNameEl) {
            settingsNameEl.textContent =
                `${userProfile.name || ""} ${userProfile.supername || ""}`;
        }

        const settingsEmailEl = document.getElementById("settingsEmail");
        if (settingsEmailEl) {
            settingsEmailEl.textContent =
                `${userProfile.email || ""}`;
        }

        const nameEl = document.getElementById("name");
        if (nameEl) {
            nameEl.textContent =
                `Ім'я: ${userProfile.name || ""}`;
        }

        const supernameEl = document.getElementById("supername");
        if (supernameEl) {
            supernameEl.textContent =
                `Прізвище: ${userProfile.supername || ""}`;
        }
       const editWallpaperProfileNameEl = document.getElementById("userName");
       if (editWallpaperProfileNameEl) {
       editWallpaperProfileNameEl.textContent =                 `${userProfile.name || ""} ${userProfile.supername || ""}`;
       }
       const wallpaperEl = document.querySelector(".profile-header");
              if (!userProfile.wallpaperId) {
      wallpaperEl.style.backgroundImage = "";
    } else {
      try {
        const urlWallpaper = await firebase
          .storage()
          .ref(`wallpapers/${userProfile.wallpaperId}.webp`)
          .getDownloadURL();

        wallpaperEl.style.backgroundImage = `url(${urlWallpaper})`;
        wallpaperEl.style.backgroundSize = "cover";
        wallpaperEl.style.backgroundPosition = "center";
      } catch (e) {
        wallpaperEl.style.backgroundImage = "";
      }
    }
        // =========================
        // 🔹 AVATAR
        // =========================

        if (userProfile.avatarId) {
    try {
        // Отримуємо URL аватара з Firebase Storage
        const url = await firebase.storage().ref(`avatars/${userProfile.avatarId}.webp`).getDownloadURL();

        // 🔹 avatarEl
        avatarEl.innerHTML = "";
        const img = document.createElement("img");
        img.src = url;
        img.alt = "Аватар користувача";
        avatarEl.appendChild(img);

        editWallpaperProfileAvatarEl.innerHTML = "";
        const imgEditWallpaperProfileAvatar = document.createElement("img");
        imgEditWallpaperProfileAvatar.src = url;
        imgEditWallpaperProfileAvatar.alt = "Аватар користувача";
        editWallpaperProfileAvatarEl.appendChild(imgEditWallpaperProfileAvatar);
        // 🔹 navAvatar
        navAvatar.innerHTML = "";
        const imgNav = document.createElement("img");
        imgNav.src = url;
        imgNav.alt = "Аватар користувача";
        navAvatar.prepend(imgNav);

        // 🔹 settingsAvatar
        settingsAvatar.innerHTML = "";
        const imgSettings = document.createElement("img");
        imgSettings.src = url;
        imgSettings.alt = "Аватар користувача";
        settingsAvatar.appendChild(imgSettings);

        // 🔹 avatarLibrary

        avatarLibraryEl.innerHTML = "";
        const imgLibrary = document.createElement("img");
        imgLibrary.src = url;
        imgLibrary.alt = "Аватар користувача";
        avatarLibraryEl.appendChild(imgLibrary);

    } catch (err) {
        console.error("Помилка завантаження аватара:", err);
        settingsAvatar.style.background = userProfile.color;
        settingsAvatar.innerText = userProfile?.name ? userProfile.name.charAt(0).toUpperCase() : "?";
        avatarLibraryEl.style.background = userProfile.color;
        avatarLibraryEl.innerText = userProfile?.name ? userProfile.name.charAt(0).toUpperCase() : "?";
        editWallpaperProfileAvatarEl.style.background = userProfile.color;
        editWallpaperProfileAvatarEl.innerText = userProfile?.name ? userProfile.name.charAt(0).toUpperCase() : "?";
        avatarEl.style.background = userProfile.color;
        avatarEl.innerText = userProfile.name ? userProfile.name.charAt(0).toUpperCase() : "?";
        

        const el = document.getElementById("avatar-library");
        if (el) el.innerText = userProfile.name ? userProfile.name.charAt(0).toUpperCase() : "?";
            if (el) el.style.background = userProfile.color;
       navAvatar.style.background = userProfile.color;
        navAvatar.innerText = userProfile.name ? userProfile.name.charAt(0).toUpperCase() : "?";
    }

} else {
  settingsAvatar.style.background = userProfile.color;
  settingsAvatar.innerText = userProfile.name ? userProfile.name.charAt(0).toUpperCase() : "?";
  avatarLibraryEl.style.background = userProfile.color;
        avatarLibraryEl.innerText = userProfile?.name ? userProfile.name.charAt(0).toUpperCase() : "?";
        editWallpaperProfileAvatarEl.style.background = userProfile.color;
        editWallpaperProfileAvatarEl.innerText = userProfile?.name ? userProfile.name.charAt(0).toUpperCase() : "?";
    avatarEl.style.background = userProfile.color;
    avatarEl.innerText = userProfile.name ? userProfile.name.charAt(0).toUpperCase() : "?";

    const el = document.getElementById("avatar-library");
    if (el) el.innerText = userProfile.name ? userProfile.name.charAt(0).toUpperCase() : "?";
    if (el) el.style.background = userProfile.color;
   navAvatar.style.background = userProfile.color;
    navAvatar.innerText = userProfile.name ? userProfile.name.charAt(0).toUpperCase() : "?";
}


        // =========================
        // 🔹 FINAL LOADS
        // =========================

        updateVideosAuthor();
        updatePhotosAuthor();
        enableBanduraUI(role);

        updateUI(user);
        toggleUploadVisibility();

    } catch (err) {
        console.error("Auth init error:", err);
    }
});

// 🔹 Завантаження нового аватара
input.onchange = async () => {
    const file = input.files[0];
    if (!file) return;

    let uploadFile = file;

    // Перевірка HEIC
    if (file.type === "image/heic" || file.name.endsWith(".heic")) {
        try {
            const blob = await heic2any({ blob: file, toType: "image/webp" });
            uploadFile = new File([blob], file.name.replace(/\.heic$/i, ".webp"), { type: "image/webp" });
        } catch (err) {
            console.error("Помилка конвертації HEIC:", err);
            showNotificationModal();
            message.innerHTML = "Не вдалося конвертувати HEIC";
            return;
        }
    }

    const user = firebase.auth().currentUser;
    if (!user) {
        showNotificationModal();
        message.innerHTML = "Не авторизований";
        return;
    }

    try {
        const avatarId = `${user.uid}_${Date.now()}`;
        const ref = firebase.storage().ref(`avatars/${avatarId}.webp`);
        await ref.put(uploadFile);
        await database.ref("users/" + user.uid).update({ avatarId });

        const url = await ref.getDownloadURL();

        // 🔹 avatarEl
        avatarEl.innerHTML = "";
        const img = document.createElement("img");
        img.src = url;
        img.alt = "Аватар користувача";
        avatarEl.appendChild(img);

        // 🔹 navAvatar
        navAvatar.innerHTML = "";
        const imgNav = document.createElement("img");
        imgNav.src = url;
        imgNav.alt = "Аватар користувача";
        navAvatar.prepend(imgNav);

        // 🔹 avatarLibrary
        let avatarLibraryEl = document.getElementById("avatar-library");
        if (!avatarLibraryEl) {
            avatarLibraryEl = document.createElement("div");
            avatarLibraryEl.classList.add("avatar");
            avatarLibraryEl.id = "avatar-library";
            const library = document.getElementById("library");
            library.appendChild(avatarLibraryEl);
        }
        avatarLibraryEl.innerHTML = "";
        const imgLibrary = document.createElement("img");
        imgLibrary.src = url;
        imgLibrary.alt = "Аватар користувача";
        avatarLibraryEl.appendChild(imgLibrary);

    } catch (err) {
        console.error(err);
        showNotificationModal();
        message.innerHTML = "Не вдалося завантажити аватар";
    }
};
updateVideosAuthor();
updatePhotosAuthor();
updateNameBlockedUsers();
function submitBirthdate() {
    const user = firebase.auth().currentUser;
    const input = document.getElementById("birthdate-input").value; // "YYYY-MM-DD"
    const nameInput = document.getElementById("name-input").value;
    const supernameInput = document.getElementById("supername-input").value;

    if (!input || !nameInput || !supernameInput) {
        showNotificationModal();
        message.innerHTML = "Будь ласка, заповніть всі поля.";
        return;
    }

    const [year, month, day] = input.split("-");
    const formattedDate = `${day}.${month}.${year}`; // "DD.MM.YYYY"
    const age = calculateAge(formattedDate);

    firebase.database().ref("users/" + user.uid).update({
        birthdate: formattedDate,
        email: user.email,
        name: nameInput,
        supername: supernameInput
    }).then(() => {
        showNotificationModal();
        message.innerHTML = "Дата збережена.";
        if (age !== null) configureAgeUI(age);
        updateVideosAuthor();
        updatePhotosAuthor();
        updateNameBlockedUsers();
    }).catch(err => console.error("Помилка збереження даних:", err));
}

// 🔹 Використовуємо calculateAge і в onAuthStateChanged
function calculateAge(birthdate) {
    if (!birthdate) return null;
    const [day, month, year] = birthdate.split(".").map(Number);
    const today = new Date();
    let age = today.getFullYear() - year;
    if (today.getMonth() + 1 < month || 
       (today.getMonth() + 1 === month && today.getDate() < day)) {
        age--;
    }
    return age;
}
async function updateNameBlockedUsers() {
    const user = firebase.auth().currentUser;
    if (!user) return;

    const uid = user.uid;

    try {
        // Отримуємо список користувачів, яких заблокував поточний користувач
        const blockedSnapshot = await database
            .ref(`users/${uid}/blockedUsers`)
            .once("value");

        if (!blockedSnapshot.exists()) {
            console.log("Список заблокованих порожній");
            return;
        }

        const updates = {};

        blockedSnapshot.forEach((childSnapshot) => {
            const blockedUid = childSnapshot.key;

            // Отримуємо актуальне ім'я з users/{blockedUid}
            const userData = childSnapshot.val() || {};

            // Тут тільки створюємо список UID
            updates[blockedUid] = userData;
        });

        // Для кожного заблокованого отримуємо актуальні дані
        for (const blockedUid of Object.keys(updates)) {

            const userSnapshot = await database
                .ref(`users/${blockedUid}`)
                .once("value");

            if (!userSnapshot.exists()) continue;

            const userData = userSnapshot.val() || {};

            const fullName =
                `${userData.name || ""} ${userData.supername || ""}`.trim() ||
                "Анонім";

            // Оновлюємо userName у твоєму blockedUsers
            await database
                .ref(`users/${uid}/blockedUsers/${blockedUid}`)
                .update({
                    userName: fullName
                });

            console.log(
                `Ім'я ${blockedUid} оновлено:`,
                fullName
            );
        }

    } catch (error) {
        console.error(
            "Помилка оновлення імен заблокованих:",
            error
        );
    }
}
async function updateVideosAuthor() {
  const user = firebase.auth().currentUser;
  if (!user) return;

  const uid = user.uid;

  try {
    const snapshot = await database.ref("users/" + uid).once("value");
    const userData = snapshot.val() || {};

    const fullName = `${userData.name || ""} ${userData.supername || ""}`.trim();

    let authorAvatarUrl = null;

    if (userData.avatarId) {
      try {
        authorAvatarUrl = await storage
          .ref(`avatars/${userData.avatarId}.webp`)
          .getDownloadURL();
      } catch (e) {
        console.warn("Аватар не знайдено");
      }
    }

    const videoSnap = await database.ref("videos").once("value");

    const updates = [];

    videoSnap.forEach(child => {
      const video = child.val();

      if (video.authorUid === user.uid) {
        updates.push(
          database.ref("videos/" + child.key).update({
            author: fullName || "Анонім",
            authorAvatar: authorAvatarUrl,
            owner: userData.owner === true,
          verifiedBadge: userData.verifiedBadge || null
          })
        );
      }
    });

    await Promise.all(updates);

    console.log("Відео оновлено");

  } catch (err) {
    console.error("Помилка оновлення:", err);
  }
}
async function updatePhotosAuthor() {
  const user = firebase.auth().currentUser;
  if (!user) return;

  const uid = user.uid;

  try {
    const snapshot = await database.ref("users/" + uid).once("value");
    const userData = snapshot.val() || {};

    const fullName = `${userData.name || ""} ${userData.supername || ""}`.trim();

    let authorAvatarUrl = null;

    if (userData.avatarId) {
      try {
        authorAvatarUrl = await storage
          .ref(`avatars/${userData.avatarId}.webp`)
          .getDownloadURL();
      } catch (e) {
        console.warn("Аватар не знайдено");
      }
    }

    const photoSnap = await database.ref("photos").once("value");

    const updates = [];

    photoSnap.forEach(child => {
      const photo = child.val();

      if (photo.authorUid === user.uid) {
        updates.push(
          database.ref("photos/" + child.key).update({
            author: fullName || "Анонім",
            authorAvatar: authorAvatarUrl
          })
        );
      }
    });

    await Promise.all(updates);

    console.log("Відео оновлено");

  } catch (err) {
    console.error("Помилка оновлення:", err);
  }
}
async function updateColorsAuthor(user) {
  if (!user) return;

  const uid = user.uid;

  try {
    const snapshot = await database.ref("users/" + uid).once("value");
    const userData = snapshot.val() || {};

    if (userData.color) return;

    await database.ref("users/" + uid).update({
      color: randomGradient()
    });

  } catch (error) {
    console.error("Failed to update user color:", error);
  }
}
async function updateColorsVideosAuthor(user) {
  if (!user) return;

  const uid = user.uid;

  try {
    const snapshot = await database.ref("users/" + uid).once("value");
    const userData = snapshot.val() || {};

    const fullName = `${userData.name || ""} ${userData.supername || ""}`.trim();

    let authorAvatarUrl = null;

    if (userData.avatarId) {
      try {
        authorAvatarUrl = await storage
          .ref(`avatars/${userData.avatarId}.webp`)
          .getDownloadURL();
      } catch (e) {}
    }

    const videoSnap = await database
      .ref("videos")
      .orderByChild("authorUid")
      .equalTo(uid)
      .once("value");

    const updates = [];

    videoSnap.forEach(child => {
      updates.push(
        database.ref("videos/" + child.key).update({
          author: fullName || "Анонім",
          authorAvatar: authorAvatarUrl,
          authorColor: userData.color || null,
          videoColor: randomGradient(),
        })
      );
    });

    await Promise.all(updates);

    console.log("Videos updated");

  } catch (err) {
    console.error("Помилка оновлення:", err);
  }
}
async function updateColorsCommentsAuthor(user) {
  if (!user) return;

  const uid = user.uid;

  try {
    const snapshot = await database.ref("users/" + uid).once("value");
    const userData = snapshot.val() || {};

    const fullName = `${userData.name || ""} ${userData.supername || ""}`.trim();

    let authorAvatarUrl = null;

    if (userData.avatarId) {
      try {
        authorAvatarUrl = await storage
          .ref(`avatars/${userData.avatarId}.webp`)
          .getDownloadURL();
      } catch (e) {}
    }

    const commentSnap = await database
      .ref("comments")
      .orderByChild("authorUid")
      .equalTo(uid)
      .once("value");

    const updates = [];

    commentSnap.forEach(child => {
      updates.push(
        database.ref("comments/" + child.key).update({
          author: fullName || "Анонім",
          authorAvatar: authorAvatarUrl,
          authorColor: userData.color || null
        })
      );
    });

    await Promise.all(updates);

    console.log("Videos updated");

  } catch (err) {
    console.error("Помилка оновлення:", err);
  }
}
async function updateColorsPhotosAuthor(user) {
  if (!user) return;

  const uid = user.uid;

  try {
    const snapshot = await database.ref("users/" + uid).once("value");
    const userData = snapshot.val() || {};

    const fullName = `${userData.name || ""} ${userData.supername || ""}`.trim();

    let authorAvatarUrl = null;

    if (userData.avatarId) {
      try {
        authorAvatarUrl = await storage
          .ref(`avatars/${userData.avatarId}.webp`)
          .getDownloadURL();
      } catch (e) {}
    }

    const photoSnap = await database
      .ref("photos")
      .orderByChild("authorUid")
      .equalTo(uid)
      .once("value");

    const updates = [];

    photoSnap.forEach(child => {
      updates.push(
        database.ref("photos/" + child.key).update({
          author: fullName || "Анонім",
          authorAvatar: authorAvatarUrl,
          authorColor: userData.color || null,
          owner: userData.owner === true,
          verifiedBadge: userData.verifiedBadge || null
        })
      );
    });

    await Promise.all(updates);

    console.log("Photos updated");

  } catch (err) {
    console.error("Помилка оновлення:", err);
  }
}
async function updateColorsVideosAuthor(user) {
  if (!user) return;

  const uid = user.uid;

  try {
    const snapshot = await database.ref("users/" + uid).once("value");
    const userData = snapshot.val() || {};

    const fullName = `${userData.name || ""} ${userData.supername || ""}`.trim();

    let authorAvatarUrl = null;

    if (userData.avatarId) {
      try {
        authorAvatarUrl = await storage
          .ref(`avatars/${userData.avatarId}.webp`)
          .getDownloadURL();
      } catch (e) {}
    }

    const videoSnap = await database
      .ref("videos")
      .orderByChild("authorUid")
      .equalTo(uid)
      .once("value");

    const updates = [];

    videoSnap.forEach(child => {
      updates.push(
        database.ref("videos/" + child.key).update({
          author: fullName || "Анонім",
          authorAvatar: authorAvatarUrl,
          authorColor: userData.color || null,
          owner: userData.owner === true,
          verifiedBadge: userData.verifiedBadge || null
        })
      );
    });

    await Promise.all(updates);

    console.log("Photos updated");

  } catch (err) {
    console.error("Помилка оновлення:", err);
  }
}
async function updateCommentsAuthor() {
  const user = firebase.auth().currentUser;
  if (!user) return;

  const uid = user.uid;

  try {
    const snapshot = await database.ref("users/" + uid).once("value");
    const userData = snapshot.val() || {};

    const fullName = `${userData.name || ""} ${userData.supername || ""}`.trim();

    let authorAvatarUrl = null;

    if (userData.avatarId) {
      try {
        authorAvatarUrl = await firebase
          .storage()
          .ref(`avatars/${userData.avatarId}.webp`)
          .getDownloadURL();
      } catch (e) {
        console.warn("Аватар не знайдено");
      }
    }

    const commentSnap = await database.ref("comments").once("value");

    const updates = [];

    commentSnap.forEach(child => {
      const comment = child.val();

      if (comment.authorUid === uid) {
        updates.push(
          database.ref("comments/" + child.key).update({
            commentAuthor: fullName || "Анонім",
            authorAvatar: authorAvatarUrl
          })
        );
      }
    });

    await Promise.all(updates);

    console.log("Відео оновлено");

  } catch (err) {
    console.error("Помилка оновлення:", err);
  }
}
document.getElementById("logout-danger-link").onclick = function() {
            auth.signOut().then(() => {
              showNotificationModal();
                message.innerHTML = "Ви вийшли з акаунту.";
                location.reload();
            });
        };
document.getElementById("logout-link").onclick = function() {
            auth.signOut().then(() => {
              showNotificationModal();
                message.innerHTML = "Ви вийшли з акаунту.";
                location.reload();
            });
        };
async function loadPhotos() {
    const photoGallery = document.getElementById("photo-gallery");
    if (!photoGallery) return;
    photoGallery.innerHTML = "";

    // 🔹 Слухаємо нові фото у реальному часі
    database.ref("photos").on("child_added", async snapshot => {
        const photoData = snapshot.val();
        const photoKey = snapshot.key;
if (photoData.authorUid) {
            const blockedYou = await isUserBlockedByMe(photoData.authorUid);
            const blockedMe = await didUserBlockMe(photoData.authorUid);
            if (blockedMe || blockedYou) return;
        }
        // 🔹 Фото елемент
        const photoElement = document.createElement("img");
        if(!photoData.images) {
      photoElement.src = photoData.url;
        photoElement.alt = photoData.title || "Фото";
        photoElement.classList.add("photo-item");
        } else {
          photoElement.src = photoData.images;
        photoElement.alt = photoData.title || "Фото";
        photoElement.classList.add("photo-item");
        }
        // 🔹 Збільшення переглядів при кліку
        photoElement.addEventListener("click", () => {
            const newViewCount = (photoData.views || 0) + 1;
            database.ref("photos/" + photoKey).update({ views: newViewCount })
                .catch(error => console.error("Помилка оновлення переглядів:", error));
        });

        // 🔹 Інформація про фото
        const infophotoElement = document.createElement("div");
        infophotoElement.classList.add("photo-info");
const authorEl = document.createElement("span");
authorEl.textContent = photoData?.author || "Анонім";
        // Аватар автора
        const avatar = document.createElement("div");
        avatar.classList.add("avatar");
        avatar.title = photoData.author || "Анонім";

        
        if (photoData.authorStatus == "frozen_soft") {
          avatar.innerText = "👻";
          avatar.style.background = `${photoData.authorColor}`;
          } else if (photoData.authorAvatar) {
                   avatar.style.backgroundImage = `url(${photoData.authorAvatar})`;
                    avatar.style.backgroundSize = "cover";
avatar.style.backgroundPosition = "center";
avatar.style.backgroundRepeat = "no-repeat";
        } else {
            avatar.innerText = getInitials(photoData.author);
    avatar.style.backgroundColor = stringToColor(photoData.authorColor || "?");
        }
avatar.onclick = () => {
            const infoParams = new URLSearchParams({
                uid: photoData.authorUid || "",
            });
            window.location.href = `profile.html?${infoParams.toString()}`;
        };
        const isFrozen = photoData.authorStatus === "frozen_soft";
        const detailsphotoElement = document.createElement("div");
        detailsphotoElement.classList.add("photo-details");
        const safephotoTitle = sanitizeHTML(photoData.title || "Без назви");
        const safephotoAuthor = sanitizeHTML(photoData.author || "Анонім");
        const safephotoDescription = sanitizeHTML(photoData.description || "Без опису");
        detailsphotoElement.innerHTML = `
            <strong>${safephotoTitle}</strong><br>
            Автор: ${
        isFrozen
            ? "❄️ <span data-i18n='account-deleted'>Видалений акаунт</span>"
            : sanitizeHTML(photoData.author || "Анонім")
    }

    ${
        isFrozen
            ? " <span style='color:#4aa3ff;' data-i18n='account-deleted'></span>"
            : ""
    }

    ${photoData.owner === true && photoData.verifiedBadge
        ? `<img class='adaptive-stroke' src='${photoData.verifiedBadge}'>`
        : ""
    }

    <br>

            Дата публікації: ${photoData.publishDate || "Не вказана"}<br>
            Опис: ${safephotoDescription}
        `;

        // 🔹 Кнопка видалення для власника
        if (currentUserEmail === photoData.email || currentUserEmail === "zhuzhun2008@gmail.com") {
            const deletePhotoButton = document.createElement("button");
            deletePhotoButton.innerText = "Видалити";
            deletePhotoButton.style.backgroundColor = "red";
            deletePhotoButton.style.color = "white";
            deletePhotoButton.style.marginTop = "10px";
            deletePhotoButton.onclick = () => deletePhoto(photoKey, photoData.url, photoData.images);
            infophotoElement.appendChild(deletePhotoButton);
        }

        infophotoElement.appendChild(avatar);
        infophotoElement.appendChild(detailsphotoElement);

        // 🔹 Контейнер фото
        const Photocontainer = document.createElement("div");
        Photocontainer.classList.add("photo-container");
        Photocontainer.appendChild(infophotoElement);
        Photocontainer.appendChild(photoElement);
        
        photoGallery.appendChild(Photocontainer);
      applyTranslations();
    });
}

async function deletePhoto(photoKey, photoURL, photoImages) {
    if (!confirm("Ви впевнені, що хочете видалити це фото?")) {
        return;
    }

    try {
        // 1. Видаляємо основне фото зі Storage
        if (photoURL) {
            const storageRef = storage.refFromURL(photoURL);
            await storageRef.delete();
        }

        // 2. Якщо є додаткові фото — видаляємо їх
        if (Array.isArray(photoImages)) {
            for (const imageURL of photoImages) {
                if (!imageURL) continue;

                try {
                    const imageRef = storage.refFromURL(imageURL);
                    await imageRef.delete();
                } catch (error) {
                    console.warn(
                        "Не вдалося видалити додаткове фото:",
                        imageURL,
                        error
                    );
                }
            }
        }

        // 3. Видаляємо запис із Realtime Database
        await database.ref(`photos/${photoKey}`).remove();

        // 4. Повідомлення
        showNotificationModal();
        message.innerHTML = "Фото успішно видалено.";

        // 5. Оновлюємо галерею
        loadPhotos();

    } catch (error) {
        console.error("Помилка видалення фото:", error);

        showNotificationModal();
        message.innerHTML =
            "Помилка при видаленні фото: " + error.message;
    }
              }
function loadPhotoChannelSelect() {
    const select = document.getElementById("photo-channel-select");
    if (!select) return;

    const user = firebase.auth().currentUser;
    if (!user) return;

    const uid = user.uid;
    select.innerHTML = "";

    database.ref(`users/${uid}`).once("value").then(snapshot => {
        const userData = snapshot.val();
        if (!userData) return;

        // 🔹 Основний канал
        const mainName = `${userData.name || ""} ${userData.supername || ""}`.trim();

        const mainOption = document.createElement("option");
        mainOption.value = "main";
        mainOption.textContent = mainName || "Основний канал";
        mainOption.dataset.name = mainName;
        mainOption.dataset.avatar = userData.avatar || "";
        select.appendChild(mainOption);

        // 🔹 Другий канал
        if (userData.channels && userData.channels.second) {
            const second = userData.channels.second;

            const secondOption = document.createElement("option");
            secondOption.value = "second";
            secondOption.textContent = second.name || "Другий канал";
            secondOption.dataset.name = second.name || "Другий канал";
            secondOption.dataset.avatar = second.avatar || "";
            select.appendChild(secondOption);
        }
    });
}
    // Example of how video data might be stored with an 'nsfw' attribute
async function uploadPhoto() {
    const user = firebase.auth().currentUser;

    if (!user) {
        showNotificationModal();
        message.innerHTML = "Увійдіть в акаунт";
        return;
    }

    const photoDescription = document.getElementById("photo-description")?.value || "";
    const photoTitle = document.getElementById("photo-title")?.value || "";
    const photoFiles = document.getElementById("photo-file")?.files;

    if (!photoTitle || !photoFiles || photoFiles.length === 0) {
        showNotificationModal();
        message.innerHTML = "Будь ласка, заповніть всі поля!";
        return;
    }

    const uid = user.uid;

    try {
        const snapshot = await database.ref("users/" + uid).once("value");
        const userData = snapshot.val() || {};

        const selectedPhotoChannel =
            document.getElementById("photo-channel-select").value || "main";

        let authorName;
        let authorAvatarUrl = null;

        if (selectedPhotoChannel === "second" && userData.channels?.second) {
            authorName = userData.channels.second.name || "Другий канал";

            const secondAvatar = userData.channels.second.avatarId;

            if (secondAvatar) {
                try {
                    authorAvatarUrl =
                        await storage.ref(`avatars/${secondAvatar}.webp`).getDownloadURL();
                } catch {}
            }

        } else {
            authorName =
                `${userData.name || ""} ${userData.supername || ""}`.trim() ||
                "Основний канал";

            const mainAvatar = userData.avatarId;

            if (mainAvatar) {
                try {
                    authorAvatarUrl =
                        await storage.ref(`avatars/${mainAvatar}.webp`).getDownloadURL();
                } catch {}
            }
        }

        const imageUrls = [];

        for (const file of photoFiles) {
            const storageRef =
                storage.ref(`photos/${Date.now()}_${file.name}`);

            const uploadTask = storageRef.put(file);

            const url = await new Promise((resolve, reject) => {
                uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                        const progress =
                            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

                        if (uploadProgress) {
                            uploadProgress.value = progress;
                            progressText.innerText = `${Math.round(progress)}%`;
                            progressContainer.style.display = "block";
                        }
                    },
                    reject,
                    async () => {
                        const downloadURL =
                            await uploadTask.snapshot.ref.getDownloadURL();
                        resolve(downloadURL);
                    }
                );
            });

            imageUrls.push(url);
        }

        const now = new Date();
        const currentDate = `${now.getDate().toString().padStart(2, "0")}.${(
            now.getMonth() + 1
        )
            .toString()
            .padStart(2, "0")}.${now.getFullYear()}`;

        await database.ref("photos").push({
            title: photoTitle,
            description: photoDescription,
            images: imageUrls,
            author: authorName,
            authorAvatar: authorAvatarUrl,
            email: user.email,
            authorUid: user.uid,
            publishDate: currentDate
        });

        showPopup();
        message.innerHTML = "Фото завантажено!";
        document.getElementById("upload-modal").style.display = "none";

        if (progressContainer) progressContainer.style.display = "none";

    } catch (err) {
        console.error(err);
        showNotificationModal();
        message.innerHTML = "Помилка: " + err.message;
    }
}
function showPopup() {
var popup = document.getElementById('notification-popup');


popup.classList.add("show");
popup.style.display = "flex";
setTimeout(function() {

popup.classList.remove("show");
popup.style.display = "none";
}, 3000);
}
// Завантаження налаштувань
function loadSettings() {
    const savedMaxTime = localStorage.getItem('maxTimeInMinutes');
    maxTimeInMinutes = savedMaxTime ? parseInt(savedMaxTime) : null;
    const maxInput = document.getElementById('maxTimeInput');
    if (maxInput) maxInput.value = maxTimeInMinutes ?? '';

    const savedSleepStart = localStorage.getItem('sleepStart');
    sleepStart = savedSleepStart !== '' ? savedSleepStart : null;
    const sleepStartInput = document.getElementById('sleepStart');
    if (sleepStartInput) sleepStartInput.value = sleepStart ?? '';

    const savedSleepEnd = localStorage.getItem('sleepEnd');
    sleepEnd = savedSleepEnd !== '' ? savedSleepEnd : null;
    const sleepEndInput = document.getElementById('sleepEnd');
    if (sleepEndInput) sleepEndInput.value = sleepEnd ?? '';

    const savedDate = localStorage.getItem('lastUsedDate');
    const currentDate = new Date().toDateString();

    if (savedDate !== currentDate) {
        localStorage.setItem('lastUsedDate', currentDate);
        timeLeftInSeconds = maxTimeInMinutes ? maxTimeInMinutes * 60 : null;
    } else {
        timeLeftInSeconds = parseInt(localStorage.getItem('timeLeft')) || (maxTimeInMinutes ? maxTimeInMinutes * 60 : null);
    }
}


// // Форматування часу для input type="time"
function formatTime(hour) {
    return hour !== null ? (hour < 10 ? '0' + hour + ':00' : hour + ':00') : '';
}

// Збереження налаштувань
function saveSettings() {
    const maxTime = parseInt(document.getElementById('maxTimeInput').value);
    const sleepStartTime = document.getElementById('sleepStart').value;
    const sleepEndTime = document.getElementById('sleepEnd').value;

    maxTimeInMinutes = isNaN(maxTime) ? null : maxTime;
    sleepStart = sleepStartTime ? parseInt(sleepStartTime.split(':')[0]) : null;
    sleepEnd = sleepEndTime ? parseInt(sleepEndTime.split(':')[0]) : null;

    localStorage.setItem('maxTimeInMinutes', maxTimeInMinutes ?? '');
    localStorage.setItem('sleepStart', sleepStart ?? '');
    localStorage.setItem('sleepEnd', sleepEnd ?? '');

    if (timeLeftInSeconds === null) {
        timeLeftInSeconds = maxTimeInMinutes ? maxTimeInMinutes * 60 : null;
        if (timeLeftInSeconds !== null) {
            localStorage.setItem('timeLeft', timeLeftInSeconds);
        }
    }
}

// // Перевірка часу сну
function isSleepTime() {
    if (!sleepStart || !sleepEnd) return false;

    const [startH, startM] = sleepStart.split(':').map(Number);
    const [endH, endM] = sleepEnd.split(':').map(Number);

    if (isNaN(startH) || isNaN(endH)) return false;

    const current = new Date();
    const nowMinutes = current.getHours() * 60 + current.getMinutes();
    const startMinutes = startH * 60 + startM;
    const endMinutes = endH * 60 + endM;

    return startMinutes < endMinutes
        ? nowMinutes >= startMinutes && nowMinutes < endMinutes
        : nowMinutes >= startMinutes || nowMinutes < endMinutes;
}



// // Оновлення таймера та фону
function updateTimer() {
    if (isSleepTime()) {
        document.body.style.background = "background: radial-gradient(circle at left top, rgb(15, 23, 42), rgb(10, 14, 26))";
        document.body.innerHTML = `<h1 style="color: white; text-align: center;">Час спати. Сайт розблокується о ${sleepEnd}:00</h1>`;
        return;
    } else {
        document.body.style.background = "background: radial-gradient(circle at left top, rgb(15, 23, 42), rgb(10, 14, 26))";
    }

    if (timeLeftInSeconds !== null && timeLeftInSeconds > 0) {
        const minutes = Math.floor(timeLeftInSeconds / 60);
        const seconds = timeLeftInSeconds % 60;
        document.getElementById('timer').textContent = `Залишилось часу: ${minutes} хв ${seconds} сек`;
        timeLeftInSeconds--;
        localStorage.setItem('timeLeft', timeLeftInSeconds);
    } else if (timeLeftInSeconds !== null) {
        document.body.style.background = "mediumseagreen";
        document.body.innerHTML = `<h1 style="color: white; text-align: center;">Час закінчився. Ви можете вийти із сайту щоб не перевищувати екранний ліміт.</h1>`;
        return;
    }

    // Скидання таймера після 00:00
    const currentDate = new Date().toDateString();
    if (localStorage.getItem('lastUsedDate') !== currentDate) {
        localStorage.setItem('lastUsedDate', currentDate);
        timeLeftInSeconds = maxTimeInMinutes ? maxTimeInMinutes * 60 : null;
        localStorage.setItem('timeLeft', timeLeftInSeconds);
    }
}

// Запуск таймера
setInterval(updateTimer, 1000);




        // Завантажуємо налаштування при завантаженні сторінки

window.onload = function() {
        loadSettings();
        loadVideos();
        loadStories();
        loadNotifications();
        loadPhotos();
        loadPopularVideos();
    };