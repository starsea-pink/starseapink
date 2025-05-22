const form = document.getElementById("messageForm");
const app = document.getElementById("app");
const messageCount = document.getElementById("messageCount");
const loadBtn = document.getElementById("loadMessages");

const blessings = [
  "生日快樂！笑口常開！",
  "願你天天都像航海王一樣冒險又自由！",
  "蒟蒻的祝福快遞送達！",
  "今夜星光為你閃耀！",
  "悶騷的你值得最閃耀的一天！"
];

const characterImages = {
  Luffy: "images/Luffy.png",
  Zoro: "images/Zoro.png",
  Sanji: "images/Sanji.png",
  Nami: "images/Nami.png",
  Robin: "images/Robin.png",
  Chopper: "images/Chopper.png",
  Usopp: "images/Usopp.png",
  Franky: "images/Franky.png",
  Hancock: "images/Hancock.png",
  beauty1: "images/beauty1.png",
  beauty2: "images/beauty2.png",
  special: "images/special.png"
};

let messages = JSON.parse(localStorage.getItem("messages")) || [];

function renderMessages(character = null) {
  app.innerHTML = "";
  let filtered = character ? messages.filter(msg => msg.character === character) : messages;
  messageCount.textContent = `共有 ${filtered.length} 筆留言`;
  filtered.forEach(msg => {
    const div = document.createElement("div");
    div.className = "message";
    div.innerHTML = `
      <img src="${characterImages[msg.character] || ""}" class="character-img">
      <strong>${msg.name} (${msg.character})：</strong>
      <p>${msg.message}</p>
      <em>${msg.blessing || ""}</em>
    `;
    app.appendChild(div);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = form.name.value.trim();
  const message = form.message.value.trim();
  let character = form.character.value;

  if (!name || !message) return;

  if (name === "夏夕夏景") {
    if (confirm("你確定要清除所有留言嗎？")) {
      messages = [];
      localStorage.removeItem("messages");
      renderMessages();
      alert("留言已清除！");
    }
    return;
  }

  if (name === "小屁股蛋") {
    character = "special";
  }

  const newMessage = {
    name,
    message,
    character,
    blessing: blessings[Math.floor(Math.random() * blessings.length)]
  };

  messages.push(newMessage);
  localStorage.setItem("messages", JSON.stringify(messages));
  renderMessages(character);
  form.reset();
});

let clickState = 0;
let currentCharacter = null;

document.getElementById("messageCount").addEventListener("click", () => {
  clickState = (clickState + 1) % 4;

  switch (clickState) {
    case 0:
      currentCharacter = null;
      renderMessages();
      break;
    case 1:
      currentCharacter = prompt("請輸入角色代碼（如 Nami）：");
      renderMessages(currentCharacter);
      break;
    case 2:
      alert("點擊再次載入將切回原角色顯示");
      break;
    case 3:
      renderMessages(currentCharacter);
      break;
  }
});

loadBtn.addEventListener("click", () => renderMessages());

// 初始渲染
renderMessages();

// 音樂不動（保留原功能）
const bgMusic = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');
musicToggle.addEventListener('click', () => {
  if (bgMusic.paused) {
    bgMusic.play();
    musicToggle.textContent = '暫停音樂';
  } else {
    bgMusic.pause();
    musicToggle.textContent = '播放音樂';
  }
});