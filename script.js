
      // Генерація сніжинок
    // function createSnowflake() {
    //     const snowflake = document.createElement('div');
    //     snowflake.classList.add('snowflake');
    //     snowflake.textContent = '?';
    //     snowflake.style.left = Math.random() * 100 + 'vw';
    //     snowflake.style.animationDuration = Math.random() * 3 + 2 + 's';
    //     snowflake.style.fontSize = Math.random() * 10 + 10 + 'px';
    //     snowflake.style.setProperty('--x', Math.random());
    //     document.body.appendChild(snowflake);

    //     setTimeout(() => {
    //         snowflake.remove();
    //     }, 5000);
    // }

    // // Додавання сніжинок кожні 100 мс
    // setInterval(createSnowflake, 100);
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

let currentEditKey = null;
let maxTimeInMinutes = null;
let timeLeftInSeconds = null;
let sleepStart = null;
let sleepEnd = null;
let userAge = null;
 // Конвертуємо час в секунди
    let currentUserEmail = null;
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

// ==========================
// Реєстрація Service Worker
// ==========================
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/firebase-messaging-sw.js')
    .then(registration => {
      console.log('✅ Service Worker зареєстровано', registration);
      messaging.useServiceWorker(registration);
    })
    .catch(err => console.error('❌ Помилка реєстрації SW:', err));
}

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
  const { title, body, icon } = payload.notification;
  new Notification(title, { body, icon });
});

         document.getElementById("auth-link").onclick = function() {
            const authForm = document.getElementById("auth-form");
            authForm.style.display = authForm.style.display === "none" ? "block" : "none";
            document.getElementById("register-form").style.display = "none";
        };
        
        document.getElementById("register-link").onclick = function() {
            const registerForm = document.getElementById("register-form");
            registerForm.style.display = registerForm.style.display === "none" ? "block" : "none";
            document.getElementById("auth-form").style.display = "none";
        };
        document.getElementById("account-link").onclick = function() {
if (auth.currentUser) {
const accountForm = document.getElementById("account-form");
accountForm.style.display = accountForm.style.display === "none" ? "block" : "none";
document.getElementById("upload-form").style.display = "none";
} else {
alert("Будь ласка, увійдіть, щоб подивитися інформацію про акаунт.");
}
};
        document.getElementById("upload-link").onclick = function() {
            if (auth.currentUser) {
                const uploadVideoForm = document.getElementById("upload-form");
                uploadVideoForm.style.display = uploadVideoForm.style.display === "none" ? "block" : "none";
                document.getElementById("account-form").style.display = "none";
                document.getElementById("upload-photo-form").style.display = "none";
            } else {
                alert("Будь ласка, увійдіть, щоб завантажити відео.");
            }
        };
	    document.getElementById("smart-upload-link").onclick = function() {
            if (auth.currentUser) {
                const uploadVideoForm = document.getElementById("upload-form");
                uploadVideoForm.style.display = uploadVideoForm.style.display === "none" ? "block" : "none";
                document.getElementById("account-form").style.display = "none";
                document.getElementById("upload-photo-form").style.display = "none";
            } else {
                alert("Будь ласка, увійдіть, щоб завантажити відео.");
            }
        };
        document.getElementById("post").onclick = function() {
           document.getElementById("video-container").style.display = 'none';
        document.getElementById("photo-container").style.display = 'flex';
        }
            document.getElementById("video").onclick = function() {
           document.getElementById("video-container").style.display = 'flex';
        document.getElementById("photo-container").style.display = 'none';
        }
        document.getElementById("smart-post").onclick = function() {
           document.getElementById("video-container").style.display = 'none';
        document.getElementById("photo-container").style.display = 'flex';
        }
            document.getElementById("smart-video").onclick = function() {
           document.getElementById("video-container").style.display = 'flex';
        document.getElementById("photo-container").style.display = 'none';
        }
        document.getElementById("upload-link-photo").onclick = function() {
            if (auth.currentUser) {
                const uploadPhotoForm = document.getElementById("upload-photo-form");
                uploadPhotoForm.style.display = uploadPhotoForm.style.display === "none" ? "block" : "none";
                document.getElementById("upload-form").style.display = "none";
                document.getElementById("account-form").style.display = "none";
            } else {
                alert("Будь ласка, увійдіть, щоб завантажити фото.");
            }
        };
 document.getElementById("smart-upload-link-photo").onclick = function() {
            if (auth.currentUser) {
                const uploadPhotoForm = document.getElementById("upload-photo-form");
                uploadPhotoForm.style.display = uploadPhotoForm.style.display === "none" ? "block" : "none";
                document.getElementById("upload-form").style.display = "none";
                document.getElementById("account-form").style.display = "none";
            } else {
                alert("Будь ласка, увійдіть, щоб завантажити фото.");
            }
        };
	    function blockScreenForVerification() {
    document.body.innerHTML = `
                <h1>Підтвердьте вашу електронну пошту</h1>
                <p>Ми надіслали вам лист на пошту. Підтвердіть свій акаунт! Якщо не бачите, то перевірте папку "Спам".</p>
                <button style="
                    margin-top: 20px;
                    padding: 10px 20px;
                    font-size: 16px;
                    border: none;
                    border-radius: 5px;
                    background: #ffffff;
                    color: #ff7e5f;
                    cursor: pointer;
                " onclick="resendVerification()">Надіслати лист ще раз</button>
<button id="delete-account" onclick="deleteAccount()"><i class="material-icons">person_remove</i><span style="margin-left: 5px;">Видалити акаунт</span></button>
<a href="#" id="logout-link-verification" onclick="logout()">
                <i class="material-icons">logout</i><span class="icon-text">Вийти</span>
</a>
                <p style="margin-top: 20px;">Після підтвердження просто зачекайте або перезавантажте сторінку.</p>
            </div>
        </div>
    `;
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
                alert("Помилка надсилання листа: " + error.message);
            });
    }
}
function deleteAccount() {
    const user = firebase.auth().currentUser;

    if (!user) {
        alert("Спочатку увійдіть у свій акаунт.");
        return;
    }

    if (!confirm("Ви впевнені, що хочете видалити акаунт? Ваші публікації буде видалено! Цю дію не можна скасувати.")) {
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
            alert("? Акаунт і всі пов’язані дані успішно видалено.");
            location.reload();
        })
        .catch(error => {
            if (error.code === 'auth/requires-recent-login') {
                alert("Будь ласка, увійдіть знову перед видаленням акаунту.");
                firebase.auth().signOut();
            } else {
                console.error("? Помилка при видаленні акаунту:", error);
                alert("Сталася помилка при видаленні акаунту: " + error.message);
            }
        });
}


        
      
    document.getElementById("show-nsfw-videos").addEventListener("change", function() {
if (auth.currentUser) {
        showNSFW = this.checked;  // Update the variable based on the checkbox state
        loadVideos();  // Reload the videos with the updated setting
} else {
alert("Сталася помилка при увімкненні функції показувати відео позначення як NSFW.");
}
    });

function loadVideos() {
    const videoGallery = document.getElementById("video-gallery");
    if (!videoGallery) return;
    videoGallery.innerHTML = "";

    const showNSFWGlobal = showNSFW;
    const currentGender = window.userGender || "Усі"; // Стать користувача або "Усі"

    database.ref("videos").once("value").then(snapshot => {
        snapshot.forEach(childSnapshot => {
            const videoData = childSnapshot.val();
            const videoKey = childSnapshot.key;

            // 🔹 1. ФІЛЬТРИ ВІДОБРАЖЕННЯ
            if (videoData.nsfw && !showNSFWGlobal) return;
            if (videoData.private && videoData.email !== currentUserEmail) return;
            if (videoData.domainRestrict && (!currentUserEmail || !currentUserEmail.endsWith("@kfccte-nau.ukr.education"))) return;

            // 🔹 3. СТВОРЕННЯ ВІДЕО
            const videoElement = document.createElement("video");
            videoElement.src = videoData.url;
            videoElement.classList.add("video-item");

            // 🔹 4. Коментарі
            const commentSection = document.createElement("div");
            commentSection.classList.add("video-comment");

            if (videoData.disabledComments === true) {
                commentSection.innerHTML = `💬 Коментарі вимкнені для цього відео.`;
            } else {
                commentSection.innerHTML = `
                    <h3 style="color: white; text-align: left;">Коментарі:</h3>
                    <div id="comments-${videoKey}" class="comments">Ще немає коментарів...</div>
                    <div class="comment-section" id="comment-section-${videoKey}">
                        <button id="random-comments-${videoKey}" onclick="insertRandomComment('${videoKey}')">🔁 Вставити випадковий текст</button>
                        <input type="text" id="comment-input-${videoKey}" class="comment-input" placeholder="Ваш коментар">
                        <button class="comment-button" onclick="uploadComment('${videoKey}', '${videoData.email}')">
                            <i class="material-icons">send</i>
                        </button>
                        <label id="private-checkbox-${videoKey}" style="display: none;">
                            <input type="checkbox" id="private-comment-${videoKey}">
                            Приватний
                        </label>
                    </div>
                `;
            }

            // 🔹 5. Обробка кліку по відео
            videoElement.onclick = () => {
                const viewedKey = `viewed_${videoKey}`;
                if (!localStorage.getItem(viewedKey)) {
                    const newViewCount = (videoData.views || 0) + 1;
                    database.ref("videos/" + videoKey).update({ views: newViewCount })
                        .then(() => localStorage.setItem(viewedKey, true))
                        .catch(error => console.error("Помилка оновлення переглядів:", error));
                }

                const videoParams = new URLSearchParams({
                    key: videoKey,
                    url: videoData.url,
                    title: videoData.title,
                    author: videoData.author,
                    publishDate: videoData.publishDate,
                    description: videoData.description || "Без опису",
                    views: videoData.views || 0,
                    avatar: videoData.author ? videoData.author.charAt(0).toUpperCase() : "?"
                });
                window.location.href = `video.html?${videoParams.toString()}`;
            };

            // 🔹 6. Приватні коментарі (віковий фільтр)
            const privateComment = commentSection.querySelector(`#private-checkbox-${videoKey}`);
            const privateCheckbox = commentSection.querySelector(`#private-comment-${videoKey}`);
            if (privateComment && privateCheckbox) {
                const showPrivate = userAge >= 16;
                privateComment.style.display = showPrivate ? "block" : "none";
                privateCheckbox.disabled = !showPrivate;
            }

            // 🔹 7. Інформація про відео
            const infoElement = document.createElement("div");
            infoElement.classList.add("video-info");

            const avatar = document.createElement("div");
            avatar.classList.add("avatar");
            avatar.innerText = videoData.author ? videoData.author.charAt(0).toUpperCase() : "?";
            avatar.onclick = () => {
                const infoParams = new URLSearchParams({
                    avatar: videoData.author ? videoData.author.charAt(0).toUpperCase() : "?",
                    author: videoData.author
                });
                window.location.href = `profile.html?${infoParams.toString()}`;
            };

            const detailsElement = document.createElement("div");
            detailsElement.classList.add("video-details");
            const privateLabel = videoData.private ? "<span style='color: orange;'>🔒 Приватне</span>" : "";
            const nsfwLabel = videoData.nsfw ? "<span style='color: red;'>NSFW</span>" : "";
            detailsElement.textContent = `
                <strong>${videoData.title}</strong>${privateLabel}${nsfwLabel}
                Автор: ${videoData.author || "Анонім"}<br>
                Переглядів: ${videoData.views || 0}<br>
                Дата публікації: ${videoData.publishDate || "Не вказана"}
            `;

            // 🔹 8. Меню дій
            const moreBtn = document.createElement("button");
            moreBtn.classList.add("more-btn");
            moreBtn.innerHTML = `<i class="material-icons">more_vert</i>`;

            const actionMenu = document.createElement("div");
            actionMenu.classList.add("action-menu");
            actionMenu.style.display = "none";

            if (currentUserEmail === videoData.email || currentUserEmail === "zhuzhun2008@gmail.com") {
                const deleteButton = document.createElement("button");
                deleteButton.innerHTML = `<a style="padding:3px 8px; display:flex; align-items:center; justify-content:center;">
                    <i class="material-icons">delete</i>Видалити</a>`;
                deleteButton.style.backgroundColor = "red";
                deleteButton.style.color = "white";
                deleteButton.style.marginTop = "10px";
                deleteButton.onclick = () => deleteVideo(videoKey, videoData.url);
                deleteButton.addEventListener("click", () => {
                    actionMenu.style.display = "none";
                });
                actionMenu.appendChild(deleteButton);
            }

            if (currentUserEmail === videoData.email) {
                const editButton = document.createElement("button");
                editButton.innerHTML = `<a style="padding:3px 8px; display:flex; align-items:center; justify-content:center;">
                    <i class="material-icons">edit</i>Редагувати</a>`;
                editButton.style.backgroundColor = "blue";
                editButton.style.color = "white";
                editButton.style.marginTop = "10px";
                editButton.onclick = () => editVideo(videoKey, videoData);
                editButton.addEventListener("click", () => {
                    actionMenu.style.display = "none";
                });
                actionMenu.appendChild(editButton);
            }

            moreBtn.addEventListener("click", () => {
                actionMenu.style.display = (actionMenu.style.display === "block") ? "none" : "block";
            });

            infoElement.appendChild(avatar);
            infoElement.appendChild(detailsElement);
            infoElement.appendChild(moreBtn);
            infoElement.appendChild(actionMenu);

            // 🔹 9. Додаємо все у контейнер
            const container = document.createElement("div");
            container.classList.add("video-container");
            container.appendChild(videoElement);
            container.appendChild(commentSection);
            container.appendChild(infoElement);

            videoGallery.appendChild(container);

            // 🔹 10. Завантаження коментарів
            loadComments(videoKey, videoData.email);
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
function deleteVideo(videoKey, videoURL) {
    if (!videoURL || !videoKey) return alert("Немає даних для видалення відео");

    if (confirm("Ви впевнені, що хочете видалити це відео?")) {
        const storageRef = storage.refFromURL(videoURL);
        storageRef.delete()
        .then(() => {
            return database.ref(`videos/${videoKey}`).remove();
        })
        .then(() => {
            alert("Відео успішно видалено.");
            loadVideos();
        })
        .catch((error) => {
            console.error("Помилка при видаленні відео:", error);
            alert("Помилка при видаленні відео: " + error.message);
        });
    }
}
function editVideo(videoKey, videoData) {
  currentEditKey = videoKey;
  document.getElementById("edit-form").style.display = 'block';

  // Заповнюємо поля редагування
  document.getElementById("edit-video-title").value = videoData.title || '';
  document.getElementById("edit-video-description").value = videoData.description || '';
document.getElementById("edit-private-checkbox").checked = videoData.private || false;
}

function saveVideoChanges() {
  if (!currentEditKey) return alert("Відео не вибрано.");

  const newTitle = document.getElementById("edit-video-title").value.trim();
const newPrivate = document.getElementById("edit-private-checkbox").checked;
  const newDescription = document.getElementById("edit-video-description").value.trim();

  if (!newTitle) {
    alert("Назва не може бути порожньою!");
    return;
  }

  // Оновлюємо тільки заголовок і опис
  database.ref("videos/" + currentEditKey).update({
    title: newTitle,
    description: newDescription,
    private: newPrivate
  }).then(() => {
    alert("? Відео оновлено!");
    document.getElementById("edit-form").style.display = 'none';
    currentEditKey = null;
    loadVideos(); // перезавантаження списку
  }).catch(error => {
    alert("? Помилка при оновленні відео: " + error.message);
  });
}
// Функція для генерації секретного ключа
function uploadVideo() {
const startTime = Date.now();
    const videoTitle = document.getElementById("video-title").value;
    const videoDescription = document.getElementById("video-description").value;
    const videoFile = document.getElementById("video-file").files[0];
    const isNSFW = document.getElementById("nsfw-checkbox").checked;
    const disabledComments = document.getElementById("disabled-comments-checkbox").checked;
    const privateVideo = document.getElementById("private-checkbox").checked;
     const domainRestrict = document.getElementById("domain-restrict-checkbox")?.checked || false;

    if (!videoTitle || !videoFile) {
        alert("Будь ласка, заповніть всі поля!");
        return;
    }

    // Отримуємо UID поточного користувача
    const uid = firebase.auth().currentUser.uid;

    // Беремо дані користувача з Firebase
    database.ref("users/" + uid).once("value").then(snapshot => {
        const userData = snapshot.val();
        const videoAuthor = `${userData.name} ${userData.supername}`; // автоматично

        // Завантаження відео у Firebase Storage
        const storageRef = storage.ref(`videos/${videoFile.name}`);
        const uploadTask = storageRef.put(videoFile);

        uploadTask.on('state_changed',
            (snapshot) => {
                // Прогрес завантаження
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          const timeElapsed = (Date.now() - startTime) / 1000;
            const speed = snapshot.bytesTransferred / timeElapsed;
            const remainingBytes = snapshot.totalBytes - snapshot.bytesTransferred;
            const timeLeft = remainingBytes / speed;
      document.getElementById("time-left").innerText =`${(timeLeft)}s`;
      document.getElementById("upload-progress").value = progress;
                document.getElementById("progress-text").innerText = `${Math.round(progress)}%`;
                document.getElementById("progress-container").style.display = "block";
            },
            (error) => {
                alert("Помилка завантаження відео.");
            },
            () => {
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    const currentDate = new Date().toLocaleDateString();

                    // Запис у базу
                    database.ref("videos").push({
                        title: videoTitle,
                        author: videoAuthor,       // Ім'я і прізвище з профілю
                        email: currentUserEmail,
                        disabledComments: disabledComments,
                        url: downloadURL,
                        description: videoDescription,
                        views: 0,
                        private: privateVideo,
                        domainRestrict: domainRestrict,
                        nsfw: isNSFW,
                        publishDate: currentDate
                    }).then(() => {
                        alert("Відео завантажено!");
                        loadVideos(); 
                        document.getElementById("upload-form").reset();
                        document.getElementById("progress-container").style.display = "none";
                    });
                });
            }
        );
    }).catch(err => {
        console.error("Помилка при отриманні даних користувача:", err);
        alert("Не вдалося отримати дані профілю.");
    });
}


// Генеруємо або отримуємо ключ для відео
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
async function loadComments(videoKey, videoOwnerEmail) { 
    const commentsContainer = document.getElementById(`comments-${videoKey}`);
    commentsContainer.innerHTML = "";

    const snapshot = await database.ref("comments")
        .orderByChild("videoKey")
        .equalTo(videoKey)
        .once("value");

    if (!snapshot.exists()) {
        commentsContainer.textContent = "Ще немає коментарів...";
        return;
    }

    const videoKeyLocal = getVideoKey(videoKey);
    const commentsArray = [];

    snapshot.forEach(childSnapshot => {
        commentsArray.push(childSnapshot.val());
    });

    for (const data of commentsArray) {
        if (data.isPrivate && !(data.email === currentUserEmail || videoOwnerEmail === currentUserEmail)) {
            continue; // Пропускаємо приватні коментарі, якщо користувач не автор або власник відео
        }

        const commentDiv = document.createElement("div");
        commentDiv.className = "comments";

        const userEl = document.createElement("strong");
        userEl.textContent = data.commentAuthor || "Видалений акаунт";

        const textEl = document.createElement("span");
        if (data.isPrivate) {
            textEl.textContent = ": " + await decryptText(data.comment, videoKeyLocal);
        } else {
            textEl.textContent = ": " + data.comment;
        }

        const br = document.createElement("br");
        const dateEl = document.createElement("small");
        dateEl.textContent = data.publishDate;

        commentDiv.appendChild(userEl);
        commentDiv.appendChild(textEl);
        commentDiv.appendChild(br);
        commentDiv.appendChild(dateEl);
        commentsContainer.appendChild(commentDiv);
    }
}
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
  if (!user) return alert("Будь ласка, увійдіть.");

  const uid = user.uid;
  database.ref("users/" + uid).update({ name: newName }).then(() => {
    alert("? Ім’я змінено!");
    document.getElementById("form-edit-name").style.display = "none";
    document.getElementById("name").style.display = "block";
    document.getElementById("button-name").style.display = "block";
    document.getElementById("name").textContent = "Ім'я: " + newName;
    updateVideosAuthor();
  }).catch(err => alert("? Помилка: " + err.message));
}

// Зберегти зміну прізвища
function saveEditSuperName() {
  const newSuperName = document.getElementById("edit-supername").value.trim();
  const user = firebase.auth().currentUser;
  if (!user) return alert("Будь ласка, увійдіть.");

  const uid = user.uid;
  database.ref("users/" + uid).update({ supername: newSuperName }).then(() => {
    alert("? Прізвище змінено!");
    document.getElementById("form-edit-supername").style.display = "none";
    document.getElementById("supername").style.display = "block";
    document.getElementById("button-supername").style.display = "block";
    document.getElementById("supername").textContent = "Прізвище: " + newSuperName;
    updateVideosAuthor();
  }).catch(err => alert("? Помилка: " + err.message));
}

// Оновлення авторів у відео та коментарях

// Відправка коментаря
async function uploadComment(videoKey, videoOwnerEmail) {
    const commentInput = document.getElementById(`comment-input-${videoKey}`);
    const commentText = commentInput.value.trim();
    const isPrivate = document.getElementById(`private-comment-${videoKey}`).checked;

    if (!commentText) return alert("Коментар не може бути порожнім.");

    let commentData = commentText;
    if (isPrivate) {
        const videoKeyLocal = getVideoKey(videoKey);
        commentData = await encryptText(commentText, videoKeyLocal);
    }

    const uid = firebase.auth().currentUser.uid;

    // Беремо дані користувача з Firebase
    const snapshot = await database.ref("users/" + uid).once("value");
    const userData = snapshot.val();
    const commentAuthor = `${userData.name} ${userData.supername}`;

    // Додаємо коментар у базу
    await database.ref("comments").push({
        comment: commentData,
        email: currentUserEmail,
        commentAuthor: commentAuthor,
        videoOwner: videoOwnerEmail,
        isPrivate: isPrivate,
        publishDate: new Date().toLocaleDateString(),
        videoKey: videoKey
    });

    // Очищуємо поле та оновлюємо коментарі
    commentInput.value = "";
    await loadComments(videoKey, videoOwnerEmail);
}


function toggleUploadVisibility() {
    const isMobile = window.innerWidth <= 768;
    const upload = document.getElementById("upload-link");
    const photoUpload = document.getElementById("upload-link-photo");
    const smartPhotoUpload = document.getElementById("smart-upload-link-photo");
    const smartUpload = document.getElementById("smart-upload-link");
    const openMenu = document.getElementById("open-menu");

    if (isMobile) {
        openMenu.style.display = "none";
        smartUpload.style.display = "grid";
        smartPhotoUpload.style.display = "grid";
        if (auth.currentUser) {
            upload.style.display = "none";
            photoUpload.style.display = "none";
        }
    } else {
        openMenu.style.display = "flex";
        smartUpload.style.display = "none";
        smartPhotoUpload.style.display = "none";
        if (auth.currentUser) {
            upload.style.display = "flex";
            photoUpload.style.display = "flex";
        }
    }
}

window.addEventListener('load', toggleUploadVisibility);
window.addEventListener('resize', toggleUploadVisibility);

// Функція для оновлення інтерфейсу
function updateUI(user) {
  if (user) {
    currentUserEmail = user.email;

    // Інфо про користувача
    const userInfoEl = document.getElementById("user-info");
    if (userInfoEl) userInfoEl.textContent = `Ви увійшли як: ${user.email}`;

    // Кнопки/посилання
    document.getElementById("signup")?.style?.setProperty("display", "none");
    document.getElementById("auth-link")?.style?.setProperty("display", "none");
    document.getElementById("register-link")?.style?.setProperty("display", "none");
    document.getElementById("logout-link")?.style?.setProperty("display", "flex");
    document.getElementById("account-link")?.style?.setProperty("display", "flex");
    document.getElementById("upload-link")?.style?.setProperty("display", "flex");
    document.getElementById("upload-link-photo")?.style?.setProperty("display", "flex");
    document.getElementById("smart-upload-link")?.style?.setProperty("display", "grid");
    document.getElementById("smart-upload-link-photo")?.style?.setProperty("display", "grid");

    // Показати поля коментарів для всіх відео
    document.querySelectorAll('[id^="comment-input-"]').forEach(el => {
      el.style.display = "flex";
    });

    // Доступ тільки для певного домену
    const domainRestrictContainer = document.getElementById("domain-restrict-container");
    if (domainRestrictContainer) {
      if (currentUserEmail.endsWith("@kfccte-nau.ukr.education")) {
        domainRestrictContainer.style.display = "block";
      } else {
        domainRestrictContainer.style.display = "none";
      }
    }

  } else {
    currentUserEmail = null;

    // Інфо про користувача
    const userInfoEl = document.getElementById("user-info");
    if (userInfoEl) userInfoEl.textContent = "";

    // Кнопки/посилання
    document.getElementById("signup")?.style?.setProperty("display", "flex");
    document.getElementById("auth-link")?.style?.setProperty("display", "flex");
    document.getElementById("register-link")?.style?.setProperty("display", "flex");
    document.getElementById("logout-link")?.style?.setProperty("display", "none");
    document.getElementById("account-link")?.style?.setProperty("display", "none");
    document.getElementById("upload-link")?.style?.setProperty("display", "none");
    document.getElementById("upload-link-photo")?.style?.setProperty("display", "none");
    document.getElementById("smart-upload-link")?.style?.setProperty("display", "none");
    document.getElementById("smart-upload-link-photo")?.style?.setProperty("display", "none");

    // Сховати коментарі
    document.querySelectorAll('[id^="comment-input-"]').forEach(el => {
      el.style.display = "none";
    });
  }
}

// Слухач стану автентифікації

auth.onAuthStateChanged((user) => {
    if (!user) return;

    enablePushNotifications(user.uid);
    currentUserEmail = user.email;

    // 🔹 Перевірка підтвердження email
    if (!user.emailVerified) {
        blockScreenForVerification();
        const verificationInterval = setInterval(() => {
            user.reload().then(() => {
                if (user.emailVerified) {
                    clearInterval(verificationInterval);
                    updateUI(user);
                }
            }).catch(err => console.error("Помилка перевірки email:", err));
        }, 10000);
    }

    // 🔹 Отримання даних користувача
    const uid = user.uid;
    database.ref("users/" + uid).once("value").then(snapshot => {
        const userData = snapshot.val();
        const birthStr = userData?.birthdate;

        // 🔹 Якщо немає email або дати народження — показати модальне вікно
        if (!userData?.email || !birthStr) {
            const modal = document.getElementById("birthdate-modal");
            if (modal) modal.style.display = "flex";
        }

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
            }
        }

        // 🔹 Оновлення UI
        const viewBirthdate = document.getElementById("view");
        if (viewBirthdate) viewBirthdate.innerHTML = `Дата народження: ${birthStr || "не вказано"}`;
        const emailEl = document.getElementById("email");
        const avatarProfile = document.querySelector(".avatar");
        if (avatarProfile) avatarProfile.innerText = userData?.name ? userData.name.charAt(0).toUpperCase() : "?";
        if (emailEl) emailEl.innerHTML = `${userData?.name || ""} ${userData?.supername || ""}`;
        document.getElementById("name").innerHTML = `Ім'я: ${userData?.name || ""}`;
        document.getElementById("supername").innerHTML = `Прізвище: ${userData?.supername || ""}`;

        // 🔹 Обробка NSFW фільтру
        const nsfwCheckbox = document.getElementById('show-nsfw-videos');
        const nsfwSlider = document.getElementById("slidernsfw");
        const nsfwInfo = document.getElementById("information-nsfw");
        const NSFW = document.getElementById("nsfw");

        if (nsfwCheckbox) {
            if (userAge < 18) {
                if (nsfwSlider) nsfwSlider.style.backgroundColor = "gray";
                nsfwCheckbox.checked = false;
                nsfwCheckbox.disabled = true;
                if (NSFW) NSFW.style.display = "none";
                if (nsfwInfo) nsfwInfo.style.display = "block";
            } else {
                nsfwCheckbox.disabled = false;
                if (NSFW) NSFW.style.display = "block";
                if (nsfwInfo) nsfwInfo.style.display = "none";

                if (!nsfwCheckbox.dataset.listenerAdded) {
                    nsfwCheckbox.addEventListener("change", function () {
                        showNSFW = this.checked;
                        loadVideos();
                    });
                    nsfwCheckbox.dataset.listenerAdded = "true";
                }
            }
        }

        // 🔹 Завантаження відео з фільтром за статтю
        loadVideos();

    }).catch(err => console.error("Помилка отримання даних користувача:", err));

    updateUI(user);
    toggleUploadVisibility();
});
function submitBirthdate() {
  const user = firebase.auth().currentUser;
  const input = document.getElementById("birthdate-input").value;
  const nameInput = document.getElementById("name-input").value;
  const supernameInput = document.getElementById("supername-input").value;


  if (!input || !nameInput || !supernameInput) {
    alert("Будь ласка, введіть дату народження.");
    return;
  }

  const [year, month, day] = input.split("-");
  const formattedDate = `${day}.${month}.${year}`;

  firebase.database().ref("users/" + user.uid).update({
    birthdate: formattedDate,
    email: user.email,
    name: nameInput,
    supername: supernameInput
  }).then(() => {
    alert("Дата збережена.");
   updateVideosAuthor();
  });
}
function updateVideosAuthor() {
  const user = firebase.auth().currentUser;
  if (!user) return;
  const uid = user.uid;

  database.ref("users/" + uid).once("value").then(snapshot => {
    const userData = snapshot.val() || {};
    const namePart = userData.name ? userData.name : "";
    const supernamePart = userData.supername ? userData.supername : "";
    const fullName = namePart + " " + supernamePart;

    // ?? Оновлення відео
    const videoUpdates = [];
    database.ref("videos").once("value").then(videoSnap => {
      videoSnap.forEach(child => {
        const video = child.val();
        if (video.email === user.email) {
          videoUpdates.push(database.ref("videos/" + child.key).update({ author: fullName }));
        }
      });
      return Promise.all(videoUpdates);
    }).then(() => {
      // ?? Оновлення коментарів
      const commentUpdates = [];
      return database.ref("comments").once("value").then(commentSnap => {
        commentSnap.forEach(child => {
          const comment = child.val();
          if (comment.email === user.email) {
            commentUpdates.push(database.ref("comments/" + child.key).update({ commentAuthor: fullName }));
          }
        });
        return Promise.all(commentUpdates);
      });
    }).then(() => {
      location.reload(); // ?? Тепер перезавантажуємо тільки після завершення оновлення
    }).catch(err => {
      console.error("Помилка оновлення:", err);
    });
  });
}
document.getElementById("logout-link").onclick = function() {
            auth.signOut().then(() => {
                alert("Ви вийшли з акаунту.");
                location.reload();
            });
        };
function loadPhotos() {
    const photoGallery = document.getElementById("photo-gallery");
    photoGallery.innerHTML = "";

    database.ref("photos").once("value").then((snapshot) => {
        snapshot.forEach((childSnapshot) => {
            const photoData = childSnapshot.val();
            const photoKey = childSnapshot.key;

            const photoElement = document.createElement("img");
            photoElement.src = photoData.url;
            photoElement.alt = photoData.title || "Фото";
            photoElement.classList.add("photo-item");

            // Оновлення переглядів при запуску відтворення відео
            photoElement.addEventListener("play", () => {
                const newViewCount = (photoData.views || 0) + 1;
                database.ref("photos/" + photoKey).update({ views: newViewCount })
                .catch(error => console.error("Помилка оновлення переглядів:", error));
            });

            const infophotoElement = document.createElement("div");
            infophotoElement.classList.add("photo-info");

            // Аватар
            const avatar = document.createElement("div");
            avatar.classList.add("avatar");
            avatar.innerText = photoData.author ? photoData.author.charAt(0).toUpperCase() : "???";
            
            const detailsphotoElement = document.createElement("div");
            detailsphotoElement.classList.add("photo-details");
            detailsphotoElement.innerHTML = `<strong>${photoData.title || "Анонімний користувач"}</strong><br>Автор: ${photoData.author}<br>Дата публікації: ${photoData.publishDate || "Не вказана"}<br>Опис:${photoData.description || "Не вказано"}`;

             if (currentUserEmail === photoData.email || currentUserEmail === "zhuzhun2008@gmail.com") {
                const deletePhotoButton = document.createElement("button");
                deletePhotoButton.innerText = "Видалити";
                deletePhotoButton.style.backgroundColor = "red";
                deletePhotoButton.style.color = "white";
                deletePhotoButton.style.marginTop = "10px";
                deletePhotoButton.onclick = () => deletePhoto(photoKey, photoData.url);
                infophotoElement.appendChild(deletePhotoButton);
        }
            infophotoElement.appendChild(avatar);
            infophotoElement.appendChild(detailsphotoElement);

            const Photocontainer = document.createElement("div");
            Photocontainer.classList.add("photo-container");
            Photocontainer.appendChild(photoElement);
            Photocontainer.appendChild(infophotoElement);
            
            photoGallery.appendChild(Photocontainer);
        });
    });
        }

function deletePhoto(photoKey, photoURL) {
    if (confirm("Ви впевнені, що хочете видалити це фото?")) {
        // Видалення файлу зі сховища
        const storageRef = storage.refFromURL(photoURL);
        storageRef.delete().then(() => {
            // Видалення запису з бази даних
            database.ref(`photos/${photoKey}`).remove().then(() => {
                alert("Фото успішно видалено.");
                loadPhotos(); // Оновлюємо список відео
            }).catch((error) => {
                alert("Помилка при видаленні фото з бази даних: " + error.message);
            });
        }).catch((error) => {
            alert("Помилка при видаленні фото зі сховища: " + error.message);
        });
    }
}

    // Example of how video data might be stored with an 'nsfw' attribute
function uploadPhoto() {
    const photoDescription = document.getElementById("photo-description").value;
    const photoTitle = document.getElementById("photo-title").value;
    const photoFile = document.getElementById("photo-file").files[0];
    const uploadProgress = document.getElementById("upload-progress");
    const progressText = document.getElementById("progress-text");
    const progressContainer = document.getElementById("progress-photo-container");

    if (!photoTitle || !photoFile) {
        alert("Будь ласка, заповніть всі поля!");
        return;
    }

    const uid = firebase.auth().currentUser.uid;
    const currentUserEmail = firebase.auth().currentUser.email;

    database.ref("users/" + uid).once("value")
        .then(snapshot => {
            const userData = snapshot.val();
            const photoAuthor = `${userData.name} ${userData.supername}`;

            const storageRef = storage.ref(`photos/${photoFile.name}`);
            const uploadTask = storageRef.put(photoFile);

            uploadTask.on('state_changed', 
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    uploadProgress.value = progress;
                    progressText.innerText = `${Math.round(progress)}%`;
                    progressContainer.style.display = "block";
                }, 
                (error) => {
                    alert("Сталася помилка при завантаженні фото: " + error);
                }, 
                () => {
                    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                        const currentDate = new Date().toLocaleDateString();

                        database.ref("photos").push({
                            title: photoTitle,
                            author: photoAuthor,
                            email: currentUserEmail,
                            url: downloadURL,
                            description: photoDescription,
                            publishDate: currentDate
                        }).then(() => {
                            alert("Фото завантажено!");
                            loadPhotos();
                            document.getElementById("upload-photo-form").reset();
                            progressContainer.style.display = "none";
                        });
                    });
                }
            );
        })
        .catch(err => {
            console.error("Помилка при отриманні даних користувача:", err);
            alert("Не вдалося отримати дані профілю.");
        });
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
        loadPhotos();
        const commentsContainer = document.getElementById('comments');
  if (commentsContainer) {
    loadComments();
  }
    };