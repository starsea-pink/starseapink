const form = document.getElementById("messageForm");
const app = document.getElementById("app");
const messageCount = document.getElementById("messageCount");
const nameInput = form.elements["name"];
const messageInput = form.elements["message"];
const characterSelect = form.elements["character"];

let messages = JSON.parse(localStorage.getItem("messages") || "[]");
let currentCharacter = characterSelect.value;
const blessings = [
  "生日快樂，天天開心！",
  "願你幸福每一天！",
  "希望你今年順順利利！",
  "祝你健康又富貴！",
  "有魯夫的勇氣，也有喬巴的可愛！"
];

function saveMessages() {
  localStorage.setItem("messages", JSON.stringify(messages));
}

function renderMessages(character) {
  app.innerHTML = "";
  const filtered = messages.filter((msg) => msg.character === character);
  messageCount.textContent = `總共有 ${filtered.length} 則 ${character} 的留言：`;
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
    if (confirm("輸入此名稱將會清除所有留言，確定嗎？")) {
      messages = [];
      saveMessages();
      renderMessages(currentCharacter);
      alert("留言已全部清除");
    }
    return;
  }

  const newMessage = {
    name,
    message,
    character,
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
  renderMessages(currentCharacter);
});