    // Генерація сніжинок
    // function createSnowflake() {
    //     const snowflake = document.createElement('div');
    //     snowflake.classList.add('snowflake');
    //     snowflake.textContent = '❄';
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
    function checkBrowserSupport() {
        const ua = navigator.userAgent;

        // Перевіряємо версію браузера
        const isChrome = /Chrome\/([0-9]+)/.exec(ua);
        const isFirefox = /Firefox\/([0-9]+)/.exec(ua);
        const isEdge = /Edg\/([0-9]+)/.exec(ua);

        const minVersion = {
            Chrome: 90, // Мінімальна версія Chrome
            Firefox: 88, // Мінімальна версія Firefox
            Edge: 90 // Мінімальна версія Edge
        };

        if (isChrome && parseInt(isChrome[1]) < minVersion.Chrome) {
            return false;
        }
        if (isFirefox && parseInt(isFirefox[1]) < minVersion.Firefox) {
            return false;
        }
        if (isEdge && parseInt(isEdge[1]) < minVersion.Edge) {
            return false;
        }

        // Якщо браузер не Chrome, Firefox або Edge - забороняємо доступ
        if (!isChrome && !isFirefox && !isEdge) {
            return false;
        }

        return true;
    }

    if (!checkBrowserSupport()) {
        document.body.innerHTML = `
            <div style="text-align: center; margin-top: 20%; font-family: Arial, sans-serif;">
                <h1>Ваш браузер застарілий</h1>
                <p>Будь ласка, оновіть браузер для доступу до цього сайту.</p>
                <p>Ми підтримуємо останні версії таких браузерів список нижче:
        <ul class="downloads-list">
			<li>
				<a href="https://www.google.com/intl/en/chrome/" target="_blank" class="links">
					<div class="btn-container">
						<div class="btn-text">Google Chrome</div>
						<div class="btn-icon">
							<i class="material-icons">arrow_right</i>
						</div>
					</div>
				</a>
			</li>

			<li>
				<a href="https://safari.en.softonic.com/mac" target="_blank" class="links">
					<div class="btn-container">
						<div class="btn-text">Safari (Mac)</div>
						<i class="material-icons">arrow_right</i>
					</div>
				</a>
			</li>
			<li>
				<a href="https://www.microsoft.com/en-us/edge/features?form=MY01RZ&amp;OCID=MY01RZ" target="_blank" class="links">
					<div class="btn-container">
						<div class="btn-text">Edge</div>
						<i class="material-icons">arrow_right</i>
					</div>
				</a>
			</li>
			<li>
				<a href="https://www.mozilla.org/en-US/firefox/new/" target="_blank" class="links">
					<div class="btn-container">
						<div class="btn-text">Firefox</div>
						<i class="material-icons">arrow_right</i>
					</div>
				</a>
			</li>
    </ul>
            </div>
        `;
    }
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
 // Конвертуємо час в секунди
    let currentUserEmail = null;
    let showNSFW = false; // Track whether the user wants to view NSFW content
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
        const storage = firebase.storage();

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
           document.getElementById("container").style.display = 'none';
        document.getElementById("photo-container").style.display = 'flex';
        }
            document.getElementById("video").onclick = function() {
           document.getElementById("container").style.display = 'flex';
        document.getElementById("photo-container").style.display = 'none';
        }
        document.getElementById("smart-post").onclick = function() {
           document.getElementById("container").style.display = 'none';
        document.getElementById("photo-container").style.display = 'flex';
        }
            document.getElementById("smart-video").onclick = function() {
           document.getElementById("container").style.display = 'flex';
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
                <p>Ми надіслали вам лист на пошту. Підтвердіть свій акаунт!</p>
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

    if (user) {
        // Запит підтвердження перед видаленням акаунту
        if (confirm("Ви впевнені, що хочете видалити акаунт? Ваші публікації буде видалено! Цю дію не можна скасувати.")) {
            // Спочатку знайдемо всі відео користувача в базі даних
            const videosRef = firebase.database().ref("videos");
            videosRef.once("value").then((snapshot) => {
                snapshot.forEach((childSnapshot) => {
                    const videoData = childSnapshot.val();
                    const videoKey = childSnapshot.key;

                    // Якщо відео належить поточному користувачу, видалити його
                    if (videoData.email === user.email) {
                        // Видалення відео з бази даних
                        firebase.database().ref(`videos/${videoKey}`).remove()
                            .then(() => {
                                console.log(`Відео ${videoKey} видалено з бази даних`);
                            })
                            .catch((error) => {
                                console.error(`Помилка при видаленні відео ${videoKey}:`, error);
                            });

                        // Видалення відео з Firebase Storage, якщо відео зберігається там
                        const storageRef = firebase.storage().ref(`videos/${videoKey}`);
                        storageRef.delete()
                            .then(() => {
                                console.log(`Відео ${videoKey} видалено з Firebase Storage`);
                            })
                            .catch((error) => {
                                console.error(`Помилка при видаленні відео ${videoKey} з Firebase Storage:`, error);
                            });
                    }
                });

                // Після видалення відео, видалимо акаунт користувача
                user.delete()
                    .then(() => {
                        alert("Акаунт успішно видалено.");
                        location.reload(); // Перезавантажити сторінку або перенаправити користувача
                    })
                    .catch((error) => {
                        if (error.code === 'auth/requires-recent-login') {
                            alert("Будь ласка, увійдіть знову перед видаленням акаунту.");
                            firebase.auth().signOut();
                        } else {
                            alert("Сталася помилка при видаленні акаунту: " + error.message);
                        }
                    });
            }).catch((error) => {
                console.error("Помилка при отриманні відео користувача:", error);
            });
        }
    } else {
        alert("Спочатку увійдіть у свій акаунт.");
    }
}

        function signIn() {
            const email = document.getElementById("auth-email").value;
            const password = document.getElementById("auth-password").value;

            auth.signInWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    alert("Вхід успішний!");
                    currentUserEmail = userCredential.user.email;
                    document.getElementById("auth-form").style.display = "none";
                    document.getElementById("auth-link").style.display = "none";
                    document.getElementById("register-link").style.display = "none";
                    document.getElementById("upload-link").style.display = "flex";
                    document.getElementById("upload-link-photo").style.display = "flex";
	            document.getElementById("smart-upload-link").style.display = "grid";
                    document.getElementById("smart-upload-link-photo").style.display = "grid";
                    document.getElementById("logout-link").style.display = "flex";
                    document.getElementById("account-link").style.display = "flex";
                })
                .catch((error) => {
                    alert("Невірний логін або пароль.");
                });
        }
        function signUp() {
	    const birthInput = document.getElementById("birthdate").value;
            const name = document.getElementById("register-name").value.trim();
            const supername = document.getElementById("register-supername").value.trim();
            const email = document.getElementById("register-email").value.trim();
            const password = document.getElementById("register-password").value.trim();
            const confirmationpassword = document.getElementById("register-confirmation-password").value.trim();

            if (!email || !password || !confirmationpassword) {
        alert("Поля не повинні бути порожніми.");
        return;
            }
const [year, month, day] = birthInput.split("-");
const birthdate = `${day}.${month}.${year}`;
            if(password == confirmationpassword) {
auth.createUserWithEmailAndPassword(email, password)
                .then((userCredential) => {
 const uid = userCredential.user.uid;
  database.ref("users/" + uid).set({
    name: name,
    supername: supername,
    email: email,
    birthdate: birthdate
  });
                    alert("Ви успішно зареєструвалися!");
                    document.getElementById("auth-form").style.display = "none";
                    document.getElementById("register-form").style.display = "none";
                    document.getElementById("auth-link").style.display = "none";
                    document.getElementById("register-link").style.display = "none";
                    document.getElementById("upload-link").style.display = "flex";
                    document.getElementById("upload-link-photo").style.display = "flex";
		    document.getElementById("smart-upload-link").style.display = "grid";
                    document.getElementById("smart-upload-link-photo").style.display = "grid";
                    document.getElementById("account-link").style.display = "flex";
                    document.getElementById("logout-link").style.display = "flex";
                })

            .catch((error) => {
                    alert("Цей акаунт вже існує.");
             });
} else {
            alert("Паролі не збігаються.");
}
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
    videoGallery.innerHTML = "";

    const showNSFW = document.getElementById("show-nsfw-videos").checked;

    database.ref("videos").once("value").then(snapshot => {
        snapshot.forEach(childSnapshot => {
            const videoData = childSnapshot.val();
            const videoKey = childSnapshot.key;

            if (videoData.nsfw && !showNSFW) return;
            if (videoData.private && videoData.email !== currentUserEmail) return;

            const videoElement = document.createElement("video");
            videoElement.src = videoData.url;
            videoElement.classList.add("video-item");

            // Коментарі
            const commentSection = document.createElement("div");
            commentSection.classList.add("video-comment");
            commentSection.innerHTML = `
                <h3 style="color: white; text-align: left;">Коментарі:</h3>
                <div id="comments-${videoKey}" class="comments">Ще немає коментарів...</div>
                <div class="comment-section">
                    <input type="text" id="comment-input-${videoKey}" class="comment-input" placeholder="Ваш коментар">
                    <button class="comment-button" onclick="uploadComment('${videoKey}')">
                        <i class="material-icons">send</i>
                    </button>
                </div>
            `;

            // Перегляд відео та перевірка пароля
            videoElement.onclick = () => {
                if (videoData.password) {
                    const userPassword = prompt("Це приватне відео. Введіть пароль:");
                    if (videoData.password !== userPassword) {
                        alert("Неправильний пароль!");
                        return;
                    }
                }

                const viewedKey = `viewed_${videoKey}`;
                if (!localStorage.getItem(viewedKey)) {
                    const newViewCount = (videoData.views || 0) + 1;
                    database.ref("videos/" + videoKey).update({ views: newViewCount })
                        .then(() => {
                            localStorage.setItem(viewedKey, true);
                        })
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

            // Інформація про відео
            const infoElement = document.createElement("div");
            infoElement.classList.add("video-info");

            const avatar = document.createElement("div");
            avatar.classList.add("avatar");
            avatar.innerText = videoData.author ? videoData.author.charAt(0).toUpperCase() : "🕵️";
            avatar.onclick = () => {
                const infoParams = new URLSearchParams({
                    avatar: videoData.author ? videoData.author.charAt(0).toUpperCase() : "?",
                    author: videoData.author
                });
                window.location.href = `profile.html?${infoParams.toString()}`;
            };

            const detailsElement = document.createElement("div");
            detailsElement.classList.add("video-details");

            const privateLabel = videoData.private ? " <span style='color: orange;'>🔒 Приватне</span>" : "";
            const nsfwLabel = videoData.nsfw ? " <span style='color: red;'> NSFW</span>" : "";
            detailsElement.innerHTML = `
                <strong>${videoData.title}${privateLabel}${nsfwLabel}</strong><br>
                Автор: ${videoData.author || "Анонім"}<br>
                Переглядів: ${videoData.views || 0}<br>
                Дата публікації: ${videoData.publishDate || "Не вказана"}
            `;
            
            const moreBtn = document.createElement("button");
            moreBtn.classList.add("more-btn");
            moreBtn.innerHTML = `<i class="material-icons">more_vert</i>`;

            const actionMenu = document.createElement("div");
            actionMenu.classList.add("action-menu");
            actionMenu.style.display = "none";

            // Кнопка видалення (для власника)
            if (currentUserEmail === videoData.email || currentUserEmail === "zhuzhun2008@gmail.com") {
                const deleteButton = document.createElement("button");
                deleteButton.innerHTML = `<a style="padding: 3px 8px; display: flex; align-items: center; justify-content: center;"><i class="material-icons">delete</i>Видалити</a>`;
                deleteButton.style.backgroundColor = "red";
                deleteButton.style.color = "white";
                deleteButton.style.marginTop = "10px";
                deleteButton.onclick = () => deleteVideo(videoKey, videoData.url);
                actionMenu.appendChild(deleteButton);
            }

            if (currentUserEmail === videoData.email) {
                const editButton = document.createElement("button");
                editButton.innerHTML = `<a style="padding: 3px 8px; display: flex; align-items: center; justify-content: center;"><i class="material-icons">edit</i>Редагувати</a>`;
                editButton.style.backgroundColor = "blue";
                editButton.style.color = "white";
                editButton.style.marginTop = "10px";
                editButton.onclick = () => editVideo(videoKey, videoData);
                actionMenu.appendChild(editButton);
            }

	   moreBtn.addEventListener("click", () => {
	     actionMenu.style.display = (actionMenu.style.display === "block") ? "none" : "block";
          });
            infoElement.appendChild(avatar);
            infoElement.appendChild(detailsElement);
            infoElement.appendChild(moreBtn);
            infoElement.appendChild(actionMenu);
            const container = document.createElement("div");
            container.classList.add("video-container");
            container.appendChild(videoElement);
            container.appendChild(commentSection);
            container.appendChild(infoElement);

            videoGallery.appendChild(container);

            // Завантаження коментарів
            loadComments(videoKey);
        });
    });
}
function deleteVideo(videoKey, videoURL) {
    if (confirm("Ви впевнені, що хочете видалити це відео?")) {
        // Видалення файлу зі сховища
        const storageRef = storage.refFromURL(videoURL);
        storageRef.delete().then(() => {
            // Видалення запису з бази даних
            database.ref(`videos/${videoKey}`).remove().then(() => {
                alert("Відео успішно видалено.");
                loadVideos(); // Оновлюємо список відео
            }).catch((error) => {
                alert("Помилка при видаленні відео з бази даних: " + error.message);
            });
        }).catch((error) => {
            alert("Помилка при видаленні відео зі сховища: " + error.message);
        });
    }
}

function editVideo(videoKey, videoData) {
currentEditKey = videoKey;
document.getElementById("edit-form").style.display = 'block';
const editVideo = document.getElementById("edit-video-title");
const editAuthor = document.getElementById("edit-video-author");
const editDescription = document.getElementById("edit-video-description");
editVideo.value = videoData.title || '';
editAuthor.value = videoData.author || '';
editDescription.value = videoData.description || '';
}
function saveVideoChanges() {
  if (!currentEditKey) return alert("Відео не вибрано.");

  const newTitle = document.getElementById("edit-video-title").value;
  const newAuthor = document.getElementById("edit-video-author").value;
  const newDescription = document.getElementById("edit-video-description").value;

  database.ref("videos/" + currentEditKey).update({
    title: newTitle,
    author: newAuthor,
    description: newDescription
  }).then(() => {
    alert("Відео оновлено!");
    document.getElementById("edit-form").style.display = 'none';
    loadVideos(); // перезавантаження списку
  }).catch(error => {
    alert("Помилка при оновленні відео: " + error.message);
  });
}

// Функція для генерації секретного ключа
function uploadVideo() {
    const videoDescription = document.getElementById("video-description").value;
    const videoTitle = document.getElementById("video-title").value;
    const videoAuthor = document.getElementById("video-author").value;
    const videoFile = document.getElementById("video-file").files[0];
    const isNSFW = document.getElementById("nsfw-checkbox").checked;
    const privateVideo = document.getElementById("private-checkbox").checked;
    const videoPassword = document.getElementById("video-password").value.trim();
    const uploadProgress = document.getElementById("upload-progress");
    const progressText = document.getElementById("progress-text");
    const progressContainer = document.getElementById("progress-container");

    if (!videoTitle || !videoFile) {
        alert("Будь ласка, заповніть всі поля!");
        return;
    }

    if (videoFile) {
        const storageRef = storage.ref(`videos/${videoFile.name}`);
        const uploadTask = storageRef.put(videoFile);

        uploadTask.on('state_changed', 
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                uploadProgress.value = progress;
                progressText.innerText = `${Math.round(progress)}%`;
                progressContainer.style.display = "block";
            }, 
            (error) => {
                alert("Сталася помилка при завантаженні відео.");
            }, 
            () => {
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    // Get current date
                    const currentDate = new Date().toLocaleDateString();

                    // Save video info to database
                    database.ref("videos").push({
                        title: videoTitle,
                        author: videoAuthor,
                        email: currentUserEmail,
                        url: downloadURL,
                        description: videoDescription,
			password: videoPassword || null,
                        views: 0,
                        private: privateVideo,
                        nsfw: isNSFW,
                        publishDate: currentDate // Save the publish date
                    }).then(() => {
                        alert("Відео завантажено!");
                        loadVideos(); // Reload videos
                        document.getElementById("upload-form").reset();
                        progressContainer.style.display = "none"; // Hide progress
                    });
                });
            }
        );
    } else {
        alert("Будь ласка, виберіть відео для завантаження.");
    }
}



function uploadComment(videoKey) {
    const commentInput = document.getElementById(`comment-input-${videoKey}`);
    const commentText = commentInput.value.trim();

    if (commentText === "") {
        alert("Коментар не може бути порожнім.");
        return;
    }

    // Відправка коментаря в базу даних
    database.ref("comments").push({
        comment: commentText,
        email: currentUserEmail,
        publishDate: new Date().toLocaleDateString(),
        videoKey: videoKey  // Додаємо videoKey для зв'язку з відео
    }).then(() => {
        // Очищаємо поле для вводу коментаря
        commentInput.value = "";
        // Перезавантажуємо коментарі для цього відео
        loadComments(videoKey);
    }).catch(error => {
        alert("Помилка при публікації коментаря: " + error.message);
    });
}




function loadComments(videoKey) {
    const commentsContainer = document.getElementById(`comments-${videoKey}`);
    if (!commentsContainer) {
        console.error("Comments container not found for video: ", videoKey);
        return;
    }
    commentsContainer.innerHTML = "";

    database.ref("comments").orderByChild("videoKey").equalTo(videoKey).once("value").then(snapshot => {
        if (!snapshot.exists()) {
            // Якщо немає коментарів, додаємо повідомлення
            commentsContainer.innerHTML = `<p style="text-align: center;">Ще немає коментарів...</p>`;
            return;
        }
        
        snapshot.forEach(childSnapshot => {
            const data = childSnapshot.val();
            const commentDiv = document.createElement("div");
            commentDiv.className = "comments";
            commentDiv.innerHTML = `<strong>${data.email}</strong>: ${data.comment} <br> <small>${data.publishDate}</small>`;
            commentsContainer.appendChild(commentDiv);
        });
    }).catch(error => console.error("Помилка завантаження коментарів: ", error));

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

auth.onAuthStateChanged((user) => {
  if (user) {
    currentUserEmail = user.email;

    // Перевірка верифікації email
    if (!user.emailVerified) {
      blockScreenForVerification();
      verificationInterval = setInterval(() => {
        user.reload().then(() => {
          if (user.emailVerified) {
            clearInterval(verificationInterval);
            location.reload();
          }
        }).catch((error) => {
          console.error("Помилка перевірки email:", error);
        });
      }, 10000);
    }

    // Оновлення інтерфейсу
    
    const userInfoEl = document.getElementById("user-info");

    
    if (userInfoEl) userInfoEl.textContent = `Ви увійшли як: ${user.email}`;

    document.getElementById("auth-link")?.style?.setProperty("display", "none");
    document.getElementById("register-link")?.style?.setProperty("display", "none");
    document.getElementById("logout-link")?.style?.setProperty("display", "flex");
    document.getElementById("account-link")?.style?.setProperty("display", "flex");

    // Перевірка віку
    const uid = user.uid;
    database.ref("users/" + uid).once("value").then(snapshot => {
      const userData = snapshot.val();
      const birthStr = userData.birthdate;

      if (!userData.email || !userData.birthdate) {
        // Показати модальне вікно
        document.getElementById("birthdate-modal").style.display = "flex";
      }

      const match = birthStr?.match(/^(\d{2})\.(\d{2})\.(\d{4})$/);
      if (!match) {
        alert("Некоректний формат дати народження.");
        return;
      }

      const [, day, month, year] = match;
      const birthDate = new Date(`${year}-${month}-${day}`);
      const today = new Date();

      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      
      const NSFW = document.getElementById("nsfw");
      const emailEl = document.getElementById("email");
      const nsfwCheckbox = document.getElementById('show-nsfw-videos');
      const nsfwInfo = document.getElementById("information-nsfw");
      const viewBirthdate = document.getElementById("view");
      if (nsfwCheckbox) {
        if (age < 18) {
          nsfwCheckbox.checked = false;
          NSFW.checked = false;
          nsfwCheckbox.disabled = true;
          if (NSFW) NSFW.style.display = "none";
          if (nsfwInfo) nsfwInfo.style.display = "block";
          if (viewBirthdate) viewBirthdate.innerHTML = `Дата народження: ${userData.birthdate}`;
          if (emailEl) emailEl.innerHTML = `${userData.name} ${userData.supername}`;

        } else {
          nsfwCheckbox.disabled = false;
          if (nsfwInfo) nsfwInfo.style.display = "none";
          if (NSFW) NSFW.style.display = "block";
          if (viewBirthdate) viewBirthdate.innerHTML = `Дата народження: ${userData.birthdate}`;
          if (emailEl) emailEl.innerHTML = `${userData.name} ${userData.supername}`;
          nsfwCheckbox.addEventListener("change", function () {
            showNSFW = this.checked;
            loadVideos();
          });
        }
      }
    });

  } else {
    currentUserEmail = null;
    document.getElementById("auth-link")?.style?.setProperty("display", "flex");
    document.getElementById("register-link")?.style?.setProperty("display", "flex");
    document.getElementById("logout-link")?.style?.setProperty("display", "none");
    document.getElementById("account-link")?.style?.setProperty("display", "none");
  }

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
    document.getElementById("birthdate-modal").style.display = "none";
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
            avatar.innerText = photoData.author ? photoData.author.charAt(0).toUpperCase() : "🕵️";
            
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
    const photoAuthor = document.getElementById("photo-author").value;
    const photoFile = document.getElementById("photo-file").files[0];
    const uploadProgress = document.getElementById("upload-progress");
    const progressText = document.getElementById("progress-text");
    const progressContainer = document.getElementById("progress-photo-container");

    if (!photoTitle || !photoFile) {
        alert("Будь ласка, заповніть всі поля!");
        return;
    }

    if (photoFile) {
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
                alert("Сталася помилка при завантаженні фото." + error);
            }, 
            () => {
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    // Get current date
                    const currentDate = new Date().toLocaleDateString();

                    // Save video info to database
                    database.ref("photos").push({
                        title: photoTitle,
                        author: photoAuthor,
                        email: currentUserEmail,
                        url: downloadURL,
                        description: photoDescription,
                        publishDate: currentDate // Save the publish date
                    }).then(() => {
                        alert("Фото завантажено!");
                        loadPhotos(); // Reload videos
                        document.getElementById("upload-photo-form").reset();
                        progressContainer.style.display = "none"; // Hide progress
                    });
                });
            }
        );
    } else {
        alert("Будь ласка, виберіть фото для завантаження.");
    }
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
        document.body.style.background = "linear-gradient(to right, rgb(6 99 229), rgb(6 208 229))";
        document.body.innerHTML = `<h1 style="color: white; text-align: center;">Час спати. Сайт розблокується о ${sleepEnd}:00</h1>`;
        return;
    } else {
        document.body.style.background = "linear-gradient(to right, #ff7e5f, #feb47b)";
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
