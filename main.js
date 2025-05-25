onst form = document.getElementById("messageForm");
const app = document.getElementById("app");
const messageCount = document.getElementById("messageCount");

let messages = [];
let displayIndex = 0;
let originalCharacter = "";
let currentDisplay = 0;

const blessings = [
  "生日快樂！天天開心！",
  "願你遊戲場場MVP！",
  "釣蝦爆桶！心想事成！",
  "生活多汁又鮮甜！",
  "永遠保持帥氣又宅宅！"
];

// 角色圖片對應
const characterImages = {
  background: "images/background.png",
  beauty1: "images/beauty1.png",
  beauty2: "images/beauty2.png",
  Chopper: "images/chopper.png",
  Hancock: "images/hancock.png",
  Luffy: "images/luffy.png",
  Nami: "images/nami.png",
  Robin: "images/robin.png",
  Sanji: "images/sanji.png",
  special: "images/special.png",
  Zoro: "images/zoro.png",
  Usopp: "images/usopp.png",
  Franky: "images/franky.png"
};

// 儲存留言
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = form.name.value.trim();
  const message = form.message.value.trim();
  let character = form.character.value;

  if (!name || !message) return;

  if (message === "夏夕夏景") {
    alert("輸入了關鍵字，將清除所有留言！");
    messages = [];
    updateMessageCount();
    app.innerHTML = "";
    return;
  }

  if (message === "小屁股蛋") {
    character = "special";
  }

  messages.push({ name, message, character });
  updateMessageCount();

  // 重設畫面
  displayIndex = messages.length - 1;
  originalCharacter = messages[displayIndex].character;
  currentDisplay = 0;
  renderDisplay();

  form.reset();
});

// 更新留言數
function updateMessageCount() {
  messageCount.textContent = `目前共有 ${messages.length} 則留言`;
}

// 渲染顯示階段
function renderDisplay() {
  if (displayIndex < 0 || displayIndex >= messages.length) return;

  const { name, message, character } = messages[displayIndex];

  let content = "";
  let image = "";

  switch (currentDisplay) {
    case 0: // 顯示角色圖
      image = characterImages[character] || characterImages["background"];
      content = `<p>${name} 出現了！</p>`;
      break;
    case 1: // 顯示留言
      image = characterImages[character];
      content = `<p>${name} 說：${message}</p>`;
      break;
    case 2: // 顯示祝福語
      image = characterImages[character];
      const randomBless = blessings[Math.floor(Math.random() * blessings.length)];
      content = `<p>${randomBless}</p>`;
      break;
    case 3: // 顯示原角色
      image = characterImages[originalCharacter];
      content = `<p>切回原角色</p>`;
      break;
  }

  app.innerHTML = `
    <div class="message-card">
      <img src="${image}" alt="${character}" class="character-img">
      ${content}
    </div>
  `;

  currentDisplay = (currentDisplay + 1) % 4;
}

// 點擊畫面切換階段
app.addEventListener("click", renderDisplay);