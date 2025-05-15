dconst app = document.getElementById("app");
const form = document.querySelector("form");
const nameInput = document.getElementById("name");
const messageInput = document.getElementById("message");
const messageCount = document.getElementById("messageCount");
const clearButton = document.getElementById("clearButton");
const exportButton = document.getElementById("exportButton");
const muteButton = document.getElementById("muteButton");
const audio = document.getElementById("bgMusic");

// 預設播放背景音樂
window.addEventListener("load", () => {
  audio.volume = 0.5;
  audio.play().catch(() => {}); // 防止自動播放失敗錯誤
});

muteButton.addEventListener("click", () => {
  audio.muted = !audio.muted;
  muteButton.textContent = audio.muted ? "開啟音樂" : "靜音";
});

function saveMessagesToStorage(messages) {
  localStorage.setItem("messages", JSON.stringify(messages));
}

function getMessagesFromStorage() {
  const stored = localStorage.getItem("messages");
  return stored ? JSON.parse(stored) : [];
}

function updateMessageCount(count) {
  messageCount.textContent = `目前已有 ${count} 筆悄悄話`;
}

function createMessageElement({ name, message, avatar }) {
  const wrapper = document.createElement("div");
  wrapper.className = "message";

  const avatarDiv = document.createElement("div");
  avatarDiv.className = `avatar ${avatar}`;
  wrapper.appendChild(avatarDiv);

  const nameP = document.createElement("p");
  nameP.textContent = name;
  wrapper.appendChild(nameP);

  const messageP = document.createElement("p");
  messageP.textContent = message;
  wrapper.appendChild(messageP);

  return wrapper;
}

function renderMessages() {
  app.innerHTML = "";
  const messages = getMessagesFromStorage();
  messages.forEach((msg) => {
    const el = createMessageElement(msg);
    app.appendChild(el);
  });
  updateMessageCount(messages.length);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = nameInput.value.trim();
  const message = messageInput.value.trim();
  if (!name || !message) return;

  const avatars = ["Luffy", "Nami", "Robin", "Hancock", "Sanji", "Zoro", "beauty1", "beauty2"];
  const avatar = avatars[Math.floor(Math.random() * avatars.length)];

  const newMessage = { name, message, avatar };
  const messages = getMessagesFromStorage();
  messages.unshift(newMessage);
  saveMessagesToStorage(messages);
  renderMessages();
  form.reset();

  showBlessingAnimation(avatar);
});

function showBlessingAnimation(avatar) {
  const blessings = {
    Luffy: "魯夫大笑著祝你生日快樂！",
    Nami: "娜美親你一下！祝你財運亨通～",
    Robin: "羅賓靜靜送上神秘的祝福。",
    Hancock: "女帝漢考克為你傾心傾情傾國傾城。",
    Sanji: "香吉士深情送上甜點與玫瑰。",
    Zoro: "索隆迷路地走來說：生日快樂。",
    beauty1: "性感美女為你跳一支舞～",
    beauty2: "爆乳姊姊說：你最棒了！"
  };

  const text = blessings[avatar] || "祝你幸福快樂～";

  const box = document.createElement("div");
  box.className = "blessing-box";
  box.innerHTML = `
    <div class="avatar ${avatar}"></div>
    <p>${text}</p>
  `;
  document.body.appendChild(box);

  setTimeout(() => {
    box.classList.add("fade-out");
    setTimeout(() => document.body.removeChild(box), 1000);
  }, 5000);
}

clearButton.addEventListener("click", () => {
  if (confirm("你確定要清空所有留言嗎？")) {
    localStorage.removeItem("messages");
    renderMessages();
  }
});

exportButton.addEventListener("click", () => {
  const messages = getMessagesFromStorage();
  const csvContent =
    "data:text/csv;charset=utf-8," +
    ["名字,留言內容"]
      .concat(messages.map((m) => `${m.name},${m.message.replace(/\n/g, " ")}`))
      .join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "留言板匯出.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});

renderMessages();