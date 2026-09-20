
// ===================== Сніг =====================
let snowInterval = null;

function createSnowflake() {
    const snowflake = document.createElement("div");
    snowflake.className = "snowflake";
    snowflake.textContent = ["❄️","❅","❆"][Math.floor(Math.random()*3)];
    snowflake.style.left = Math.random()*100 + "vw";
    snowflake.style.fontSize = (Math.random()*15+10) + "px";
    snowflake.style.opacity = Math.random()*0.8+0.2;
    snowflake.style.setProperty('--x', Math.random());

    const duration = Math.random()*3+4; // 4–7 сек
    snowflake.style.animation = `fall ${duration}s linear forwards`;

    document.body.appendChild(snowflake);
    setTimeout(()=>snowflake.remove(), duration*1000);
}

function startSnow() {
    if(snowInterval) return;
    snowInterval = setInterval(createSnowflake, 150);
}

function stopSnow() {
    clearInterval(snowInterval);
    snowInterval = null;
    document.querySelectorAll(".snowflake").forEach(f=>f.remove());
}

// ===================== Пасхалка потрійного кліку =====================
let logoClickCount = 0;
let logoClickTimer = null;

function launchNewYearEasterEgg() {
    // Додатковий сніг на пасхалку
    startSnow();
    alert("🎉 Пасхалка Нового Року! Сніг йде! 🎉");
}

// ===================== Ініціалізація =====================
document.addEventListener("DOMContentLoaded", () => {
    const logo = document.getElementById("logo");
    const logoText = document.getElementById("logo-text");
    if (!logo || !logoText) return;

    const today = new Date();
    const month = today.getMonth() + 1;
    const day = today.getDate();

    const originalLogoSrc = logo.src;

    const isNewYearPeriod =
        (month === 12 && day >= 15) ||
        (month === 1 && day <= 25);

    const isVyshyvanka =
        month === 5 && day === 16;

    const isIndependenceDay = month === 8 && (day === 23 || day === 24);

    // ---------- НОВИЙ РІК ----------
    if (isNewYearPeriod) {
        logo.src = "VideoVortex_new_year's_logo.jpg";
    }

    // ---------- ДЕНЬ ВИШИВАНКИ ----------
    if (isVyshyvanka) {
        logo.src = "VideoVortex_logo_embriodery.jpg";
        styleButtons("#8B0000", "#1C1C1C");
        applyIcons(vyshyvankaIcons);
    }

    // ---------- ДЕНЬ НЕЗАЛЕЖНОСТІ ----------
    if (isIndependenceDay) {
        logo.src = "VideoVortex_logo_indepedence.jpg";
        logoText.textContent = "VideoVortex 💙💛";
        styleButtons("#0057B7", "#FFDD00");
    }

    // ---------- СНІГ ----------
    if (month === 1 && day === 1) {
        startSnow();
    }

    // ---------- ПОТРІЙНИЙ КЛІК ----------
    logo.addEventListener("click", () => {
        logoClickCount++;

        if (logoClickCount === 1) {
            logoClickTimer = setTimeout(() => {
                logoClickCount = 0;
            }, 1200);
        }

        if (logoClickCount === 3) {
            clearTimeout(logoClickTimer);
            logoClickCount = 0;
            launchNewYearEasterEgg();
        }
    });
});
/* ================= FIREBASE INIT ================= */
let currentUserEmail = null;
let currentVideo = null;
let userAge = null;
// Глобальні змінні для блокування
let blockedUserUid = "";
let realBlockedUserName = "";
let blockedUserName = ""; // для UI
const firebaseConfig = {
  apiKey: "AIzaSyBkPYP3bnDy61NFjRSboRZrfTVNTdIMWbY",
  authDomain: "videovortex-235cd.firebaseapp.com",
  databaseURL: "https://videovortex-235cd-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "videovortex-235cd",
  storageBucket: "videovortex-235cd.appspot.com",
  messagingSenderId: "681594250269",
  appId: "1:681594250269:web:1176b21fcc8fe2a7d052f4"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const database = firebase.database();
const message = document.getElementById("message");
const notification = document.getElementById("notification-modal");
function showNotificationAIModal() {
  notificationAI.style.display = "flex";
}
function closeNotificationAIModal() {
  notificationAI.style.display = "none";
}
function showNotificationModal() {
  notification.style.display = "flex";
}
function closeNotificationModal() {
  notification.style.display = "none";
}
/* ================= HELPERS ================= */
function sanitize(text) {
  return String(text ?? "")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
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
function showNotFound() {
  document.body.innerHTML = `
    <div style="
      height:100vh;
      display:flex;
      flex-direction:column;
      align-items:center;
      justify-content:center;
      background:#0d1117;
      color:white;
      text-align:center;
    ">
      <h1>🎬 Відео не знайдено</h1>
      <p>Можливо, було видалене або недоступне.</p>
      <a href="index.html" style="color:#4facfe;">⬅ На головну</a>
    </div>
  `;
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
const randomComments = [
  "Класне відео! 🎬👍",
  "Дуже цікаво 🤓✨",
  "Дякую за контент 🙏💖",
  "Супер пояснення!👌📚",
  "Підтримую 💪🔥",
  "Топчик!⭐😎"
];
function insertRandomComment(videoKey) {
  const inputId = `comment-input-${videoKey}`;
  const input = document.getElementById(inputId);

  if (input) {
    const randomIndex = Math.floor(Math.random() * randomComments.length);
    input.value = randomComments[randomIndex];
  }
}
function getVideoKey(videoKey) {
    let key = localStorage.getItem(`videoKey-${videoKey}`);
    if (!key) {
        key = crypto.randomUUID(); // простий ключ, можна замінити на сильніше шифрування
        localStorage.setItem(`videoKey-${videoKey}`, key);
    }
    return key;
}

// Просте шифрування/дешифрування (можна замінити на AES)
async function encryptText(text, key) {
    const enc = new TextEncoder();
    const encoded = enc.encode(text + key); // дуже базово
    return btoa(String.fromCharCode(...encoded));
}

async function decryptText(cipher, key) {
    const decoded = atob(cipher);
    const arr = Uint8Array.from(decoded, c => c.charCodeAt(0));
    const dec = new TextDecoder();
    const text = dec.decode(arr);
    return text.replace(key, ''); // віднімаємо ключ
}

function createNotification(uid, type, message, videoKey, fromUid) {
    if (!uid || !type || !message) return;

    return firebase.database()
        .ref("notifications/" + uid)
        .push({
            type: type,
            message: message,
            videoKey: videoKey || null,
            fromUid: fromUid || null,
            createdAt: Date.now(),
            read: false
        });
}
async function uploadComment(videoKey, videoOwnerEmail) {
    const commentInput = document.getElementById(`comment-input-${videoKey}`);
    const privateCheckbox = document.getElementById(`private-comment-${videoKey}`);

    if (!commentInput || !privateCheckbox) {
        console.error("COMMENT_INPUT_ERROR");
        return;
    }

    const commentText = commentInput.value.trim();
    const isPrivate = privateCheckbox.checked;

    if (!commentText) {
        applyTranslations();
        message.innerHTML = "Коментар не може бути порожнім.";
        return;
    }

    let commentData = commentText;

    if (isPrivate) {
        commentData = await encryptText(commentText);
    }

    const user = firebase.auth().currentUser;

    if (!user) {
        console.error("COMMENT_AUTH_ERROR");
        return;
    }

    const uid = user.uid;

    // Дані користувача
    const snapshot = await database
        .ref("users/" + uid)
        .once("value");

    const userData = snapshot.val() || {};

    const commentAuthor =
        `${userData.name || ""} ${userData.supername || ""}`.trim();

    // Дата
    const now = new Date();

    const day = now.getDate().toString().padStart(2, "0");
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const year = now.getFullYear();

    const publishDate = `${day}.${month}.${year}`;

    // 🔥 ЗБЕРІГАЄМО КОМЕНТАР
    await database.ref("comments").push({
        comment: commentData,
        email: currentUserEmail,
        commentAuthor: commentAuthor,
        authorUid: uid,
        videoOwner: videoOwnerEmail,
        isPrivate: isPrivate,
        publishDate: publishDate,
        videoKey: videoKey
    });

    // 🔔 IN-APP СПОВІЩЕННЯ
    if (currentVideo?.authorUid && currentVideo.authorUid !== uid) {
    firebase.database()
        .ref("notifications/" + currentVideo.authorUid)
        .push({
            type: "comment",
            message: `${commentAuthor}: ${commentText}`,
            videoKey: videoKey,
            fromUid: uid,
            createdAt: Date.now(),
            read: false
        })
        .catch(error => {
            console.error("COMMENT_NOTIFICATION_ERROR:", error);
        });
    }

    // Очищаємо поле
    commentInput.value = "";

    // Оновлюємо коментарі
    await loadComments(videoKey, videoOwnerEmail);
}
/* ================= GET VIDEO KEY ================= */
const params = new URLSearchParams(location.search);
const videoKey = params.get("key");
let videoAuthorUid = "";
if (!videoKey) {
  showNotFound();
  throw new Error("No video key");
}
  function renderCommentSection(videoData, videoKey) {
  const root = document.getElementById("comments-root");

  const commentSection = document.createElement("div");
  commentSection.classList.add("video-comment");

  if (videoData.disabledComments === true) {
    commentSection.innerHTML = `💬 Коментарі вимкнені для цього відео.`;
  } else {
    commentSection.innerHTML = `
      <h3 style="color: white; text-align: left;">Коментарі:</h3>
      <div id="comments-${videoKey}" class="comments">Ще немає коментарів...</div>
      <input class="comment-liquid-glass" type="text" id="comment-input-${videoKey}" placeholder="Ваш коментар">
      <button class="comment-button" onclick="uploadComment('${videoKey}', '${videoData.email}')">
        <i class="material-symbols">send</i>
      </button>
      <div class="comment-section" id="comment-section-${videoKey}">
        <button id="random-comments-${videoKey}" onclick="insertRandomComment('${videoKey}')">🔁 Вставити випадковий текст</button>
        <button class="improve-text-comments" id="improve-text-comments-${videoKey}" onclick="improveText('${videoKey}')"><i class="material-symbols">stars_2</i><p data-i18n="generate-description">Покращити текст</p><sup style="background-color: blue; color: white; border-radius: 8px;" data-i18n="new">NEW</sup></button>
        <label id="private-checkbox-${videoKey}" style="display: none;">
          <input type="checkbox" id="private-comment-${videoKey}">
          Приватний
        </label>
      </div>
    `;
  }

  root.innerHTML = "";
  root.appendChild(commentSection);
  updatePrivateCheckbox(videoKey);
  loadComments(videoKey, videoData.email);
  }
function updatePrivateCheckbox(videoKey) {
    const privateComment = document.getElementById(`private-checkbox-${videoKey}`);
    const privateCheckbox = document.getElementById(`private-comment-${videoKey}`);
    if (!privateComment || !privateCheckbox) return;

    const showPrivate = userAge >= 16;
    privateComment.style.display = showPrivate ? "block" : "none";
    privateCheckbox.disabled = !showPrivate;
}
async function isUserBlockedByMe(targetUid) {
  const me = firebase.auth().currentUser;
  if (!me || !targetUid) return false;

  const snap = await database.ref(`users/${me.uid}/blockedUsers/${targetUid}`).once("value");
  return snap.exists();
}

async function didUserBlockMe(targetUid) {
  const me = firebase.auth().currentUser;
  if (!me || !targetUid) return false;

  const snap = await database.ref(`users/${targetUid}/blockedUsers/${me.uid}`).once("value");
  return snap.exists();
}
const videoPlayer = document.getElementById("video-player");
const detailsEl = document.getElementById("details");

// Гібридний обробник для надійного авто-PiP
function setupAutoPipHandlers() {
  // 1. Для сучасних браузерів через медіа-сесію
  if ('mediaSession' in navigator) {
    try {
      navigator.mediaSession.setActionHandler('enterpictureinpicture', async () => {
        // ВИПРАВЛЕНО: замінено video на videoPlayer
        const isPipDisabled = videoPlayer.hasAttribute('disablePictureInPicture');
        if (!document.pictureInPictureElement && !isPipDisabled) {
          if (videoPlayer.videoWidth === 0) {
            videoPlayer.style.width = "640px";
            videoPlayer.style.height = "360px";
          }
          await videoPlayer.requestPictureInPicture();
        }
      });
    } catch (error) {
      console.warn("MediaSession PiP не підтримується", error);
    }
  }

  // 2. Резервний варіант для згортання вкладки/застосунку
  document.addEventListener('visibilitychange', async () => {
    // ВИПРАВЛЕНО: замінено video на videoPlayer
    const isPipDisabled = videoPlayer.hasAttribute('disablePictureInPicture');
    
    if (document.visibilityState === 'hidden' && !isPipDisabled) {
      try {
        if (!document.pictureInPictureElement) {
          
          // ТРЮК ДЛЯ ВИПРАВЛЕННЯ НЕВИДИМОГО ВІКНА:
          // Якщо відео ще не має кадру (розміри 0), примусово даємо плеєру фізичний розмір
          if (videoPlayer.videoWidth === 0) {
            videoPlayer.style.width = "640px"; 
            videoPlayer.style.height = "360px";
            // Додатково додаємо в DOM, щоб браузер точно побачив зміни
            videoPlayer.style.display = "block"; 
          }

          // Даємо браузеру 60 мілісекунд зафіксувати стилі, і лише тоді відкриваємо PiP
          setTimeout(async () => {
            try {
              if (!document.pictureInPictureElement) {
                await videoPlayer.requestPictureInPicture();
              }
            } catch (innerError) {
              console.log("Помилка PiP всередині таймауту:", innerError.message);
            }
          }, 60);

        }
      } catch (error) {
        console.log("Авто-PiP відхилено політикою взаємодії:", error.message);
      }
    }
  });

  // Повертаємо стилі назад, коли відео реально завантажиться (щоб не псувати дизайн)
  // ВИПРАВЛЕНО: замінено video на videoPlayer
  videoPlayer.addEventListener('loadedmetadata', () => {
    videoPlayer.style.width = ""; 
    videoPlayer.style.height = "";
  });
}

// Запускаємо ініціалізацію обробників
setupAutoPipHandlers();


/* ================= LOAD VIDEO ================= */

database.ref("videos/" + videoKey).once("value").then(async snapshot => {
  if (!snapshot.exists()) { showNotFound(); return; }

  const video = snapshot.val();
  currentVideo = video;
  const authorUid = video.authorUid;
  videoAuthorUid = authorUid;
  if (video.authorUid) {
    const blockedMe = await didUserBlockMe(video.authorUid);
    if (blockedMe) {
      showNotFound();
      return;
    }
  }
  
  // -------------------------------
  // Підготовка URL faststart з fallback
  // -------------------------------
  async function getVideoUrl(url) {
    if (!url.includes(".mp4")) return url;

    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split("/");
    const filename = pathParts.pop();
    const dir = pathParts.join("/");
    const fastFilename = filename.replace(".mp4", "_fast.mp4");
    const fastUrl = urlObj.origin + dir + "/videos_fast/" + fastFilename;

    try {
      const res = await fetch(fastUrl, { method: "HEAD" });
      if (res.ok) return fastUrl;
    } catch (e) {
      console.warn("Fast video не знайдено:", e);
    }
    return url;
  }

  videoPlayer.src = await getVideoUrl(video.url);
  videoPlayer.preload = "auto";
  videoPlayer.load();
  
  // -------------------------------
  // Деталі відео
  // -------------------------------
  document.title = sanitize(video.title);

  const gradient = video.videoColor || randomGradient();
  detailsEl.innerHTML = `
    <div style="
      padding: 18px;
      border-radius: 16px;
      background: ${gradient};
      color: white;
      white-space: normal;
      word-break: break-word;
      box-shadow: 0 6px 20px rgba(0,0,0,0.4);
    ">
      <div id="avatar-placeholder"></div>
      <h2>${sanitize(video.title)}</h2>
      <p><strong>Автор:</strong> ${sanitize(video.author || "Анонім")}</p>
      <p><strong>Дата:</strong> ${sanitize(video.publishDate || "—")}</p>
      <p><strong>Перегляди:</strong> <span id="view-count">${video.views || 0}</span></p>
      <p><strong>Опис:</strong> ${sanitize(video.description || "Без опису")}</p>
    </div>
  `;

  // Безпечно встановлюємо аватар
  const avatar = detailsEl.querySelector("#avatar-placeholder");
  if (video.authorAvatar) {
    avatar.style.backgroundImage = `url(${video.authorAvatar})`;
  } else {
    avatar.innerText = getInitials(video.author);
  }

  // -------------------------------
  // Лічильник переглядів
  // -------------------------------
  const viewedKey = "viewed_" + videoKey;
  if (!localStorage.getItem(viewedKey)) {
    database.ref("videos/" + videoKey + "/views").transaction(v => (v || 0) + 1);
    localStorage.setItem(viewedKey, "1");
  }

  // -------------------------------
  // Керування дозволами безпеки та PiP
  // -------------------------------
  if (video.saveVideo === true) {
    // ❌ Забороняємо скачування та PiP повністю
    videoPlayer.setAttribute("controlsList", "nodownload");
    videoPlayer.setAttribute("disablePictureInPicture", "true"); 
    videoPlayer.removeAttribute("autoPictureInPicture"); 

    videoPlayer.oncontextmenu = (e) => {
      e.preventDefault();
    };
  } else {
    // ✅ Дозволяємо контент для PiP та скачування
    videoPlayer.removeAttribute("controlsList");
    videoPlayer.removeAttribute("disablePictureInPicture"); 
    videoPlayer.setAttribute("autoPictureInPicture", "true"); 

    videoPlayer.oncontextmenu = null;
  }

  // -------------------------------
  // Коментарі та схожі відео
  // -------------------------------
  renderCommentSection(currentVideo, videoKey);
  loadSimilarVideos(video);
}).catch(err => {
  console.error("Помилка завантаження відео:", err);
  showNotFound();
});

async function sendSupportAuthor() {
  const uid = firebase.auth().currentUser.uid;
    if (!uid) {
        console.error("Користувач не авторизований");
        return;
    }

    if (!videoAuthorUid) {
        console.error("UID автора відео не знайдено");
        return;
    }

    try {
        await database
            .ref(`supportRequests/${videoAuthorUid}`)
            .push({
                status: "pending",
                timestamp: firebase.database.ServerValue.TIMESTAMP
            });

        console.log("💙 Підтримку надіслано");

        const modal = document.getElementById("support-author-modal");

        if (modal) {
            modal.style.display = "none";
        }

    } catch (error) {
        console.error("Помилка надсилання підтримки:", error);
    }
}
function getVideoKey(videoKey) {
    let key = localStorage.getItem(`videoKey-${videoKey}`);
    if (!key) {
        key = crypto.randomUUID(); // простий ключ, можна замінити на сильніше шифрування
        localStorage.setItem(`videoKey-${videoKey}`, key);
    }
    return key;
}
function speakText(text) {
    if (!window.speechSynthesis) {
        alert("Ваш браузер не підтримує озвучку.");
        return;
    }

    // Створюємо об'єкт голосу
    const utterance = new SpeechSynthesisUtterance(text);

    // Можна налаштувати голос, мову, швидкість
    utterance.lang = 'uk-UA';  // українська
    utterance.pitch = 1;       // тон
    utterance.rate = 1;        // швидкість

    // Відтворення
    window.speechSynthesis.speak(utterance);
}
// Просте шифрування/дешифрування (можна замінити на AES)
// =================== COMMENTS & BLOCKING ===================
function getAccentColor(value) {
    if (!value) return "#ffffff";

    const match = value.match(/#([0-9a-fA-F]{6})/);
    return match ? match[0] : "#ffffff";
}

function applyAccentUsername(el, gradient) {
    const color = getAccentColor(gradient);

    el.style.color = color;
    el.style.fontWeight = "600";
    el.style.textShadow = "0 1px 1px rgba(0,0,0,0.25)";
}

function applyAvatar(el, gradient, fallbackText) {
    el.style.background = gradient;
    el.style.backgroundSize = "cover";
    el.style.backgroundPosition = "center";

    if (fallbackText) {
        el.textContent = fallbackText;
    }
}
// =================== GLOBAL CLICK (ОДИН РАЗ) ===================

// =================== GLOBAL CLICK (ОДИН РАЗ) ===================

document.addEventListener("click", () => {
    document.querySelectorAll(".action-menu")
        .forEach(m => m.style.display = "none");
});


// =================== LOAD COMMENTS ===================

async function loadComments(videoKey, videoOwnerEmail) {
    const commentsContainer = document.getElementById(`comments-${videoKey}`);
    if (!commentsContainer) return;

    commentsContainer.innerHTML = "";

    const snapshot = await database.ref("comments")
        .orderByChild("videoKey")
        .equalTo(videoKey)
        .once("value");

    if (!snapshot.exists()) {
        commentsContainer.textContent = "Ще немає коментарів...";
        applyTranslations();
        return;
    }

    const videoKeyLocal = getVideoKey(videoKey);
    const children = Object.values(snapshot.val() || {});

    const fragment = document.createDocumentFragment();

    for (const data of children) {

        if (
            data.isPrivate &&
            !(data.email === currentUserEmail || videoOwnerEmail === currentUserEmail)
        ) continue;

        const blockedMeComments = await didUserBlockMe(data.authorUid);

        const gradientAvatar = data.authorColor || randomGradient();
        const gradientSource = data.authorColor || data.authorGradient || "#ffffff";

        const commentDiv = document.createElement("div");
        commentDiv.className = "comment";

        // =================== AVATAR ===================

        const avatarComment = document.createElement("div");
        avatarComment.className = "avatar";

        if (data.authorAvatar) {
            avatarComment.style.backgroundImage = `url(${data.authorAvatar})`;
            avatarComment.style.backgroundSize = "cover";
            avatarComment.style.backgroundPosition = "center";
        } else {
            applyAvatar(
                avatarComment,
                gradientAvatar,
                getInitials(data.commentAuthor || "")
            );
        }

        if (blockedMeComments) {
            avatarComment.textContent = "❌";
            applyAvatar(avatarComment, gradientAvatar);

        } else if (!data.email || data.email === "Видалений акаунт") {
            avatarComment.textContent = "👻";
            applyAvatar(avatarComment, gradientAvatar);
        }
avatarComment.onclick = () => {
  window.location.href = `profile.html?uid=${data.authorUid}`;
}
        // =================== USERNAME ===================

        const userEl = document.createElement("strong");

        if (blockedMeComments) {
            userEl.setAttribute("data-i18n", "account-not-found");

        } else if (!data.commentAuthor) {
            userEl.setAttribute("data-i18n", "account-deleted");

        } else {
            userEl.textContent = data.commentAuthor;
        }
userEl.onclick = () => {
  window.location.href = `profile.html?uid=${data.authorUid}`;
}
        applyAccentUsername(userEl, gradientSource);

        // =================== COMMENT TEXT ===================

        const textEl = document.createElement("span");

        let commentText = "";

        if (blockedMeComments) {
            commentText = "Коментар недоступний";
            textEl.textContent = `: ${commentText}`;

        } else if (data.isPrivate) {
            commentText = await decryptText(data.comment, videoKeyLocal);
            textEl.textContent = `: ${commentText}`;

        } else {
            commentText = data.comment;
            textEl.textContent = `: ${commentText}`;
        }

        // =================== CONTAINER ===================

        const textContainer = document.createElement("div");
        textContainer.style.display = "inline-flex";
        textContainer.style.alignItems = "center";
        textContainer.style.gap = "5px";

        textContainer.appendChild(textEl);

        // =================== SPEAK ===================

        const speakBtn = document.createElement("a");
        speakBtn.classList.add("speakBtn");

        const icon = document.createElement("i");
        icon.className = "material-symbols";
        icon.textContent = "mic";

        speakBtn.appendChild(icon);

        speakBtn.onclick = () => {
    speakText(
        blockedMeComments
            ? "Акаунт не знайдено"
            : data.commentAuthor
    );

    speakText(
        blockedMeComments
            ? "Коментар недоступний"
            : data.comment
    );
};

        textContainer.appendChild(speakBtn);

        // =================== MENU ===================

        const actionMenu = document.createElement("div");
        actionMenu.className = "action-menu";
        actionMenu.style.display = "none";

        const more = document.createElement("a");
        more.className = "moreBtn";

        const moreIcon = document.createElement("i");
        moreIcon.className = "material-symbols";
        moreIcon.textContent = "more_vert";

        more.appendChild(moreIcon);

        more.addEventListener("click", (e) => {
            e.stopPropagation();
            actionMenu.style.display =
                actionMenu.style.display === "inline-flex"
                    ? "none"
                    : "inline-flex";
        });

        textContainer.appendChild(more);

        // =================== BLOCK ===================

        const blockUser = document.createElement("button");
        blockUser.className = "block-button";

        blockUser.innerHTML = `
            <span style="display:flex;align-items:center;gap:6px;">
                <i class="material-symbols">block</i>
                <p>Заблокувати</p>
            </span>
        `;

        blockUser.addEventListener("click", () => {

            realBlockedUserName =
                data.commentAuthor || "deleted-account";

            blockedUserName =
                blockedMeComments
                    ? "account-not-found"
                    : realBlockedUserName;

            blockedUserUid = data.authorUid;

            showModalBlocked();
        });

        actionMenu.appendChild(blockUser);
        textContainer.appendChild(actionMenu);

        // =================== ASSEMBLE ===================

        commentDiv.appendChild(avatarComment);
        commentDiv.appendChild(userEl);
        commentDiv.appendChild(textContainer);

        fragment.appendChild(commentDiv);
    }

    commentsContainer.appendChild(fragment);
    applyTranslations();
}


// =================== MODAL ===================

function showModalBlocked() {
    const modal = document.getElementById("block-user-modal");
    const info = document.getElementById("blocked-information");

    const isI18nKey =
        blockedUserName === "account-not-found" ||
        blockedUserName === "account-deleted";

    if (isI18nKey) {
        info.innerHTML =
            `Ви впевнені, що хочете заблокувати користувача "<span data-i18n="${blockedUserName}"></span>"?`;
    } else {
        info.textContent =
            `Ви впевнені, що хочете заблокувати користувача "${blockedUserName}"?`;
    }

    modal.style.display = "flex";
    applyTranslations();
}
function closeSupportModal() {
  const modalSupport = document.getElementById("support-author-modal");
  modalSupport.style.display = "none";
}
function closeBlockModal() {
    const modal = document.getElementById("block-user-modal");
    modal.style.display = "none";
}


async function confirmBlockUser() {
  const currentUser = firebase.auth().currentUser;
  if (!currentUser) return;

  if (!blockedUserUid) {
    alert("Не вдалося визначити користувача");
    return;
  }

  if (currentUser.uid === blockedUserUid) {
    alert("Не можна заблокувати самого себе");
    return;
  }

  await firebase.database()
    .ref(`users/${currentUser.uid}/blockedUsers/${blockedUserUid}`)
    .set({
        blocked: true,
        uid: blockedUserUid,
        userName: realBlockedUserName
});

  closeBlockModal();

  alert("Користувача заблоковано");

  if (currentVideo) {
    await loadComments(videoKey, currentVideo.email);
  }
}
/* ================= SIMILAR VIDEOS ================= */
function loadSimilarVideos(currentVideo) {
  const container = document.getElementById("target-videos");
  const message = document.getElementById("similar-message");

  container.innerHTML = "";
  let found = false;

  const currentTitleWords = (currentVideo.title || "")
      .toLowerCase()
      .split(" ");

  database.ref("videos").once("value").then(snapshot => {

    snapshot.forEach(child => {

      const v = child.val();
      if (!v) return;
if (v.authorUid) {

      const blockedMeSimilar =
      didUserBlockMe(video.authorUid);

      if (blockedMeSimilar) {
          return;

      }

  }
      // 🔞 НЕ показуємо 18+
      if (v.nsfw === true || v.nsfw === "true" || v.nsfw === 1)
        return;

      // Не показуємо те саме відео
      if (child.key === videoKey)
        return;

      // Приватні відео
      if (v.private && v.email !== currentUserEmail)
        return;

      // Domain restrict
      if (v.domainRestrict &&
          (!currentUserEmail ||
          !currentUserEmail.endsWith("@kfccte-nau.ukr.education")))
        return;

      // Пошук схожості
      const similar = currentTitleWords.some(word =>
        (v.title || "").toLowerCase().includes(word)
      );

      if (!similar) return;

      found = true;

      const wrap = document.createElement("div");

wrap.style.marginBottom = "25px";

/* Картинка */
const img = document.createElement("img");
img.classList.add("video-item");
img.src = v.thumbnail || "default.jpg";

img.onclick = () =>
  location.href = `video.html?key=${child.key}`;

/* Контейнер тексту */
const info = document.createElement("div");
info.style.padding = "5px";

/* Назва */
const title = document.createElement("div");
title.style.fontWeight = "bold";
title.innerText = v.title || "Без назви";

/* Автор */
const author = document.createElement("div");
author.style.color = "#aaa";
author.style.fontSize = "14px";
author.innerText = v.author || "Анонім";

/* Збірка */
info.appendChild(title);
info.appendChild(author);

wrap.appendChild(img);
wrap.appendChild(info);

container.appendChild(wrap);
    });

    if (!found)
      message.style.display = "block";
  });
}
/* ================= REACTIONS (LIKE / DISLIKE) ================= */
const likeBtn = document.getElementById("like");
const dislikeBtn = document.getElementById("dislike");
const likeCountEl = likeBtn.querySelector("p");
const dislikeCountEl = dislikeBtn.querySelector("p");

let currentReaction = null;
let currentUid = null;

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
function listenUserReaction() {
  const ref = database.ref(`reactions/${videoKey}/${currentUid}`);
  ref.on("value", snap => {
    currentReaction = snap.val();
    updateReactionUI();
  });
}

/* ---------- COUNTS ---------- */
database.ref(`reactions/${videoKey}`).on("value", snap => {
  let likes = 0, dislikes = 0;
  snap.forEach(c => {
    if (c.val() === "like") likes++;
    if (c.val() === "dislike") dislikes++;
  });
  likeCountEl.innerText = likes;
  dislikeCountEl.innerText = dislikes;
});

/* ---------- CLICK ---------- */
likeBtn.onclick = () => toggleReaction("like");
dislikeBtn.onclick = () => toggleReaction("dislike");

function toggleReaction(type) {
  const user = auth.currentUser;
  if (!user) {
    alert("Увійди, щоб ставити реакції");
    return;
  }
const uid = user.uid;
  const ref = database.ref(`reactions/${videoKey}/${user.uid}`);
  currentReaction === type ? ref.remove() : ref.set(type);
  if (currentVideo?.authorUid && currentVideo.authorUid !== uid) {
    firebase.database()
        .ref("notifications/" + currentVideo.authorUid)
        .push({
            type: "like",
            message: "Ваше відео вподобали",
            videoKey: videoKey,
            fromUid: uid,
            createdAt: Date.now(),
            read: false
        });
  }
 
}
document.getElementById('saveVideoBtn').addEventListener('click', async () => {
  const user = firebase.auth().currentUser;
  if (!user) return;

  const uid = user.uid;

  const saveVideoRef = firebase.database().ref("saveVideos/" + uid);

  try {
    // Перевіряємо, чи цей відео вже репостили
    const snap = await saveVideoRef.once("value");

    let alreadySaveVideo = false;

    snap.forEach(child => {
      const saveVideo = child.val();

      if (saveVideo && saveVideo.videoKey === videoKey) {
        alreadySaveVideo = true;
      }
    });

    if (alreadySaveVideo) {
      showPopup();
      document.getElementById("message-notification").innerHTML =
        "Ви вже зберегли це відео.";
      return;
    }

    // Створюємо репост
    await saveVideoRef.push({
      videoKey: videoKey,
      title: currentVideo.title,
      author: currentVideo.author,
      thumbnail: currentVideo.thumbnail,
      createdAt: Date.now()
    });

    showPopup();

    document.getElementById("message-notification").innerHTML =
      "Відео збережено.";

    updateSaveVideoUI(videoKey);

  } catch (e) {
    console.error("Помилка:", e);
  }
});
document.getElementById('repostBtn').addEventListener('click', async () => {
    const user = firebase.auth().currentUser;

    if (!user) return;

    const uid = user.uid;

    const repostsRef = firebase.database().ref("reposts/" + uid);

    try {
        // Перевіряємо, чи це відео вже репостили
        const snap = await repostsRef.once("value");

        let alreadyReposted = false;

        snap.forEach(child => {
            const repost = child.val();

            if (repost && repost.videoKey === videoKey) {
                alreadyReposted = true;
            }
        });

        if (alreadyReposted) {
            showPopup();

            document.getElementById("message-notification").innerHTML =
                "Ви вже зробили репост цього відео.";

            return;
        }

        // Створюємо репост
        await repostsRef.push({
            videoKey: videoKey,
            title: currentVideo.title,
            thumbnail: currentVideo.thumbnail,
            createdAt: Date.now()
        });

        // 🔔 Створюємо in-app сповіщення автору
        if (currentVideo?.authorUid && currentVideo.authorUid !== uid) {
     await firebase.database()
        .ref("notifications/" + currentVideo.authorUid)
        .push({
            type: "repost",
            message: "Ваше відео репостнули",
            videoKey: videoKey,
            fromUid: uid,
            createdAt: Date.now(),
            read: false
        });
        }

        // Сповіщення тому, хто зробив репост
        showPopup();

        document.getElementById("message-notification").innerHTML =
            "Репост зроблено.";

        // Оновлюємо кнопку
        updateRepostUI(videoKey);

    } catch (e) {
        console.error("REPOST_ERROR:", e);

        showPopup();

        document.getElementById("message-notification").innerHTML =
            "Не вдалося зробити репост.";
    }
});

function updateRepostUI(videoKey) {
    const user = firebase.auth().currentUser;
    if (!user || !videoKey) return;

    const uid = user.uid;
    const repostRef = firebase.database().ref("reposts/" + uid);

    repostRef.once("value").then(snap => {
        let repostExists = false;

        snap.forEach(child => {
            const repost = child.val();

            if (repost && repost.videoKey === videoKey) {
                repostExists = true;
            }
        });

        const repostBtn = document.getElementById("repostBtn");

        if (!repostBtn) return;

        if (repostExists) {
            repostBtn.innerHTML = `
                <a id="repostBtn">
                    <i class="material-symbols">check</i>
                    <p class="icon-text" data-i18n="madeRepost">
                        Репост зроблено
                    </p>
                </a>
            `;
        } else {
            repostBtn.innerHTML = `
                <a id="repostBtn">
                    <i class="material-symbols">repeat</i>
                    <p class="icon-text" data-i18n="repostBtn">
                        Зробити репост
                    </p>
                </a>
            `;
        }
    }).catch(error => {
        console.error("REPOST_UI_ERROR:", error);
    });
}
function updateSaveVideoUI(videoKey) {
  const user = firebase.auth().currentUser;
  if (!user || !videoKey) return;

  const uid = user.uid;
  const saveVideoRef = firebase.database().ref("saveVideos/" + uid);

  saveVideoRef.once("value").then(snap => {
    let saveVideoExists = false;

    snap.forEach(child => {
      const saveVideo = child.val();

      if (saveVideo && saveVideo.videoKey === videoKey) {
        saveVideoExists = true;
      }
    });

    const saveVideoIcon = document.getElementById("material-icon");

    if (!saveVideoIcon) return;

    if (saveVideoExists) {
      saveVideoIcon.classList.add("filled");
    } else {
      saveVideoIcon.classList.remove("filled");
    }
  }).catch(error => {
    console.error("Помилка перевірки збереженого відео:", error);
  });
}
/* ---------- UI ---------- */
function updateReactionUI() {
  likeBtn.classList.remove("liked");
  dislikeBtn.classList.remove("disliked");

  if (currentReaction === "like") likeBtn.classList.add("liked");
  
  if (currentReaction === "dislike") dislikeBtn.classList.add("disliked");
}
/* ---------- AUTH ---------- */
auth.onAuthStateChanged(async user => {
  if (user) {
    currentUid = user.uid;
    currentUserEmail = user.email;
    listenUserReaction();
    backfillAuthorUidForUser();
    updateRepostUI(videoKey);
    updateSaveVideoUI(videoKey);
    database.ref("users/" + currentUid).once("value").then(async snapshot => {
      const userData = snapshot.val();
      const birthStr = userData?.birthdate;
      
      // 🔹 Обчислення віку
      if (birthStr) {
        let birthDate;
        const match = birthStr.match(/^(\d{2})\.(\d{2})\.(\d{4})$/);
        if (match) {
          const [, d, m, y] = match;
          birthDate = new Date(`${y}-${m}-${d}`);
        } else {
          birthDate = new Date(birthStr);
        }

        if (!isNaN(birthDate)) {
          const today = new Date();
          let age = today.getFullYear() - birthDate.getFullYear();
          const mm = today.getMonth() - birthDate.getMonth();
          if (mm < 0 || (mm === 0 && today.getDate() < birthDate.getDate())) age--;
          userAge = age;

          updatePrivateCheckbox(videoKey);
          if (currentVideo) loadComments(videoKey, currentVideo.email);
        }
      }
    });
  }
});
/* ---------- USER REACTION ---------- */
videoPlayer.addEventListener("play", () => {
    const user = firebase.auth().currentUser;
    if (!user) return;

    const uid = user.uid;

    // Припустимо, що currentVideo і videoKey визначені
    const videoRef = database.ref("users/" + uid + "/history/" + videoKey);

    // Перевіряємо, чи є запис
    videoRef.once("value")
        .then(snapshot => {
                // Записуємо дані лише один раз
                videoRef.update({
                    author: currentVideo.author,
                    title: currentVideo.title,
                    thumbnail: currentVideo.thumbnail,
                    lastPlayed: Date.now()
                })
                .catch(error => console.error("Помилка оновлення переглядів:", error));
        })
        .catch(error => console.error("Помилка отримання даних:", error));
});
function setBoost(lang, count) {
  const el = document.getElementById("boostText");

  let key =
    count === 1 ? "boost_1" :
    count === 2 ? "boost_2" :
    count === 3 ? "boost_3" :
    "boost_0";

  el.setAttribute("data-i18n", key);

  el.innerText = translations[lang][key];
}
async function improveText(videoKey) {
  const textTitle = document.getElementById(`comment-input-${videoKey}`);

  // Перевіряємо, чи існує поле
  if (!textTitle) {
    console.error("Comment input not found:", videoKey);
    return;
  }

  const text = textTitle.value?.trim();

  // Перевіряємо, чи є текст
  if (!text) {
    showNotificationAIModal();
    messageNotification.textContent = "Напиши коментар.";
    return;
  }

  // Показуємо стан генерації
  textTitle.value = "⏳ Генерується...";

  try {
    const response = await fetch(
      "https://us-central1-videovortex-235cd.cloudfunctions.net/improveText",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          text: text
        })
      }
    );

    const raw = await response.text();

    let data;

    try {
      data = JSON.parse(raw);
    } catch (e) {
      console.error("NON-JSON RESPONSE:", raw);

      textTitle.value = "❌ Invalid server response";
      return;
    }

    if (!response.ok) {
      console.error("SERVER ERROR:", data);

      textTitle.value =
        "❌ Server error: " +
        (data.error || raw);

      return;
    }

    if (!data?.result) {
      console.error("BAD RESPONSE:", data);

      textTitle.value = "❌ Empty AI response";
      return;
    }

    // Вставляємо виправлений текст
    textTitle.value = data.result;

  } catch (networkError) {
    console.error(
      "NETWORK ERROR:",
      networkError
    );

    textTitle.value =
      "❌ Network error (CORS / function down)";
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
function celebrate() {
  const container = document.getElementById("confetti-container");

  if (!container) {
    console.error("❌ confetti-container не знайдено");
    return;
  }

  const colors = ["#ff4d4d", "#4dd2ff", "#ffd24d", "#7dff4d", "#b84dff"];

  for (let i = 0; i < 120; i++) {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");

    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.backgroundColor =
      colors[Math.floor(Math.random() * colors.length)];

    confetti.style.animationDuration = (Math.random() * 2 + 2) + "s";

    container.appendChild(confetti);

    setTimeout(() => confetti.remove(), 3000);
  }
}


document.getElementById('sendSupportBtn').addEventListener('click', async () => {
  document.getElementById("support-author-modal").style.display = "flex";
});
document.getElementById('popularBtn').addEventListener('click', async () => {
  const user = firebase.auth().currentUser;
  if (!user) return;

  const uid = user.uid;

  const userRef = firebase.database().ref(`users/${uid}`);
  const userSnap = await userRef.once('value');

  const userBoostRef = firebase.database().ref(`boosts/${videoKey}/${uid}`);
  const videoRef = firebase.database().ref(`videos/${videoKey}`);

  try {
    const snap = await userBoostRef.once('value');
    const data = snap.val() || { count: 0 };

    if (data.count >= 3) {
      alert("Ліміт досягнуто (3 бусти)");
      return;
    }

    const newCount = data.count + 1;

    await userBoostRef.set({
      count: newCount,
      updatedAt: Date.now()
    });

    await videoRef.transaction(v => {
      if (!v) return v;

      v.boostCount = (v.boostCount || 0) + 1;

      v.score =
        (v.boostCount || 0) * 5 +
        (v.likeCount || 0) * 2 +
        (v.views || 0) * 0.1;

      return v;
    });

    celebrate();
    showPopup();
    setBoost("uk", newCount);

  } catch (e) {
    console.error("Помилка:", e);
  }
});
document.getElementById('shareBtn').addEventListener('click', async () => {
  if (!currentVideo) {
    alert('Відео ще не завантажене');
    return;
  }

  if (navigator.share) {
    try {
      await navigator.share({
        title: 'VideoVortex',
        text: `${sanitize(currentVideo.title)}`,
        url: window.location.href, // або конкретний URL на твоєму хості
      });
      console.log('Поділено успішно');
    } catch (err) {
      console.error('Помилка при поділі:', err);
    }
  } else {
    alert('Ваш браузер не підтримує цю функцію');
  }
});
const video = document.getElementById('video-player');
const canvas = document.getElementById('video-canvas');
const container = document.getElementById('player-container');
const ctx = canvas.getContext('2d', { willReadFrequently: true });

// Налаштування розміру canvas для оптимізації
const SAMPLE_SIZE = 10;
canvas.width = SAMPLE_SIZE;
canvas.height = SAMPLE_SIZE;

let animationFrameId = null;

// Функція для розрахунку кольору та оновлення фону
function updateAmbientBackground() {
    if (video.paused || video.ended) return;

    // Малюємо поточний кадр у маленький розмір (відбувається авто-змішування кольорів)
    ctx.drawImage(video, 0, 0, SAMPLE_SIZE, SAMPLE_SIZE);
    
    // Беремо масив пікселів
    const imageData = ctx.getImageData(0, 0, SAMPLE_SIZE, SAMPLE_SIZE).data;
    
    let r = 0, g = 0, b = 0;
    const pixelCount = SAMPLE_SIZE * SAMPLE_SIZE;

    // Рахуємо середнє значення
    for (let i = 0; i < imageData.length; i += 4) {
        r += imageData[i];
        g += imageData[i + 1];
        b += imageData[i + 2];
    }

    r = Math.floor(r / pixelCount);
    g = Math.floor(g / pixelCount);
    b = Math.floor(b / pixelCount);

    // Робимо колір трохи темнішим і приглушеним, щоб він не засліплював (множимо на 0.4)
    // Якщо хочете яскравіший фон — приберіть "* 0.4"
    const finalR = Math.floor(r * 0.4);
    const finalG = Math.floor(g * 0.4);
    const finalB = Math.floor(b * 0.4);

    // Змінюємо фон головного контейнера
    container.style.backgroundColor = `rgb(${finalR}, ${finalG}, ${finalB})`;

    // Повторюємо на наступному кадрі
    animationFrameId = requestAnimationFrame(updateAmbientBackground);
}

// Запускаємо аналіз, коли відео починає грати
video.addEventListener('play', () => {
    updateAmbientBackground();
});

// Зупиняємо аналіз, коли відео на паузі, щоб не витрачати ресурси
video.addEventListener('pause', () => {
    cancelAnimationFrame(animationFrameId);
});

video.addEventListener('ended', () => {
    cancelAnimationFrame(animationFrameId);
});
document.addEventListener("DOMContentLoaded", () => {
  const video = document.getElementById("video-player");
  const playPause = document.getElementById("playPause");
  const seek = document.getElementById("seek");
  const time = document.getElementById("time");
  const fullscreen = document.getElementById("fullscreen");

  // Відео з Firebase
  const videoKey = new URLSearchParams(window.location.search).get("key");
  firebase.database().ref("videos/" + videoKey).once("value")
    .then(snapshot => {
      const data = snapshot.val();
      if (data && data.url) {
        video.src = data.url;  // підставляємо реальний URL з Firebase
      }
    });

  // Кнопки
  playPause.onclick = () => video.paused ? video.play() : video.pause();
  video.onplay = () => playPause.textContent = "❚❚";
  video.onpause = () => playPause.textContent = "►";

  video.ontimeupdate = () => {
    const progress = (video.currentTime / video.duration) * 100;
    seek.value = progress;
    time.textContent = `${formatTime(video.currentTime)} / ${formatTime(video.duration)}`;
  };
  seek.oninput = () => video.currentTime = (seek.value/100) * video.duration;

  fullscreen.onclick = () => {
    if(!document.fullscreenElement) video.parentElement.requestFullscreen();
    else document.exitFullscreen();
  };

  function formatTime(s) {
    const m = Math.floor(s/60), sec = Math.floor(s%60);
    return `${m}:${sec.toString().padStart(2,"0")}`;
  }
});