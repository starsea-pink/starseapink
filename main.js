const messageForm = document.getElementById("messageForm");
const nameInput = document.getElementById("name");
const messageInput = document.getElementById("message");
const characterSelect = document.getElementById("character");
const app = document.getElementById("app");
const clearButton = document.getElementById("clearButton");
const muteButton = document.getElementById("muteButton");
const messageCount = document.getElementById("messageCount");

let isMuted = false;
const bgm = document.getElementById("bgm");
bgm.volume = 0.5;

const birthdayMessages = [
  "生日快樂！願你天天開心！",
  "祝你笑口常開，天天幸福！",
  "願你今年特別順利！",
  "願你心想事成，萬事如意！",
  "祝你健康快樂，幸福滿滿！",
  "年年有今日，歲歲有今朝！",
];

let messages = JSON.parse(localStorage.getItem("messages")) || [];

function renderMessages() {
  app.innerHTML = "";
  messages.forEach((msg, index) => {
    const div = document.createElement("div");
    div.className = "message";

    const img = document.createElement("img");
    img.src = `images/${msg.character}.png`;
    img.alt = msg.character;

    const p = document.createElement("p");
    p.innerText = msg.name;

    let clickCount = 0;

    div.appendChild(img);
    div.appendChild(p);

    div.addEventListener("click", () => {
      clickCount++;
      if (clickCount === 1) {
        p.innerText = msg.message;
      } else if (clickCount === 2) {
        p.innerText =
          birthdayMessages[Math.floor(Math.random() * birthdayMessages.length)];
      } else if (clickCount === 3) {
        p.innerText = msg.name;
        clickCount = 0;
      }
    });

    app.appendChild(div);
  });

  messageCount.innerText = `共有 ${messages.length} 則留言`;
}

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = nameInput.value.trim();
  const message = messageInput.value.trim();
  const character = characterSelect.value;

  if (name === "" || message === "") return;

  if (name === "夏夕夏景") {
    const pw = prompt("請輸入密碼才能清除留言：");
    if (pw === "夏夕夏景") {
      messages = [];
      localStorage.setItem("messages", JSON.stringify(messages));
      renderMessages();
      alert("留言已清除！");
    } else {
      alert("密碼錯誤！");
    }
    nameInput.value = "";
    messageInput.value = "";
    return;
  }

  messages.push({ name, message, character });
  localStorage.setItem("messages", JSON.stringify(messages));

  nameInput.value = "";
  messageInput.value = "";
  characterSelect.value = "Luffy";

  renderMessages();
});

clearButton.addEventListener("click", () => {
  const pw = prompt("請輸入密碼才能清除留言：");
  if (pw === "夏夕夏景") {
    messages = [];
    localStorage.setItem("messages", JSON.stringify(messages));
    renderMessages();
    alert("留言已清除！");
  } else {
    alert("密碼錯誤！");
  }
});

muteButton.addEventListener("click", () => {
  isMuted = !isMuted;
  bgm.muted = isMuted;
  muteButton.innerText = isMuted ? "播放音樂" : "靜音";
});

renderMessages();