const form = document.getElementById("messageForm");
const app = document.getElementById("app");
const messageCount = document.getElementById("messageCount");
const nameInput = form.elements["name"];
const messageInput = form.elements["message"];
const characterSelect = form.elements["character"];
const loadBtn = document.getElementById("loadMessagesBtn");

let messages = JSON.parse(localStorage.getItem("messages") || "[]");
let currentCharacter = characterSelect.value;

const blessings = [
  "生日快樂！",
  "願你天天笑呵呵！",
  "開心到像喬巴一樣旋轉～",
  "幸福像魯夫一樣橡膠延伸～",
  "祝你航向自由的大海！"
];

function saveMessages() {
  localStorage.setItem("messages", JSON.stringify(messages));
}

function renderMessages(character) {
  app.innerHTML = "";
  const filtered = messages.filter((msg) => msg.character === character);
  messageCount.textContent = `共 ${filtered.length} 則「${character}」的留言：`;

  filtered.forEach((msg) => {
    const div = document.createElement("div");
    div.className = "message";

    const img = document.createElement("img");
    img.src = `images/${msg.character}.png`;
    img.alt = msg.character;
    img.className = "character-img";
    div.appendChild(img);

    const content = document.createElement("p");
    content.innerHTML = `<strong>${msg.name}</strong>：${msg.message}`;
    div.appendChild(content);

    const blessing = document.createElement("div");
    blessing.className = "blessing";
    blessing.textContent = blessings[Math.floor(Math.random() * blessings.length)];
    div.appendChild(blessing);

    app.appendChild(div);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = nameInput.value.trim();
  const message = messageInput.value.trim();
  const character = characterSelect.value;

  if (!name || !message) return;

  if (name === "夏夕夏景") {
    if (confirm("輸入此名稱將清除所有留言，確定嗎？")) {
      messages = [];
      saveMessages();
      renderMessages(currentCharacter);
      alert("留言已全部清除！");
    }
    return;
  }

  const realCharacter = name === "小屁股蛋" ? "special" : character;

  const newMessage = {
    name,
    message,
    character: realCharacter,
    timestamp: Date.now()
  };

  messages.push(newMessage);
  saveMessages();
  renderMessages(currentCharacter);
  form.reset();
});

characterSelect.addEventListener("change", () => {
  currentCharacter = characterSelect.value;
  renderMessages(currentCharacter);
});

document.addEventListener("DOMContentLoaded", () => {
  currentCharacter = characterSelect.value;
  renderMessages(currentCharacter);
});

if (loadBtn) {
  loadBtn.addEventListener("click", () => {
    renderMessages(currentCharacter);
  });
}