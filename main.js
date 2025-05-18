const app = document.getElementById("app");
const form = document.getElementById("messageForm");
const nameInput = document.getElementById("name");
const messageInput = document.getElementById("message");
const characterSelect = document.getElementById("character");
const bgm = document.getElementById("bgm");
const muteButton = document.getElementById("muteButton");

let messages = [];
let isMuted = false;
let hasInteracted = false;

const blessings = [
  "生日快樂！希望你永遠保持熱血！",
  "祝你天天開心、事事順利！",
  "願你每一年都比去年更快樂！",
  "生日是新的開始，願你夢想成真！",
  "感謝你的存在，祝你幸福滿滿！"
];

// 渲染所有留言
function renderMessages() {
  app.innerHTML = "";
  messages.forEach((msg) => {
    const div = document.createElement("div");
    div.className = "message";

    const img = document.createElement("img");
    img.src = `images/${msg.character}.png`;
    img.alt = msg.character;

    const nameP = document.createElement("p");
    nameP.textContent = msg.name;

    const messageP = document.createElement("p");
    messageP.textContent = "";

    div.appendChild(img);
    div.appendChild(nameP);
    div.appendChild(messageP);

    let step = 0;
    div.addEventListener("click", () => {
      step = (step + 1) % 4;
      if (step === 1) {
        messageP.textContent = msg.message;
      } else if (step === 2) {
        messageP.textContent = blessings[Math.floor(Math.random() * blessings.length)];
      } else if (step === 3) {
        messageP.textContent = "";
      }
    });

    app.appendChild(div);
  });

  document.getElementById("messageCount").textContent = `目前共有 ${messages.length} 則悶騷留言`;
}

// 第一次互動才播放音樂
document.body.addEventListener("click", () => {
  if (!hasInteracted) {
    bgm.play().catch(() => {});
    hasInteracted = true;
  }
});

// 靜音功能
muteButton.addEventListener("click", () => {
  isMuted = !isMuted;
  bgm.muted = isMuted;
  muteButton.textContent = isMuted ? "播放音樂" : "靜音";
});

// 表單送出
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = nameInput.value.trim();
  const message = messageInput.value.trim();
  const character = characterSelect.value.trim();

  // 清除留言密碼
  if (name === "夏夕夏景") {
    if (confirm("你確定要清除所有留言嗎？")) {
      messages = [];
      renderMessages();
    }
    form.reset();
    return;
  }

  if (name && message && character) {
    messages.unshift({ name, message, character });
    renderMessages();
    form.reset();
  }
});