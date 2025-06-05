const app = document.getElementById("app");
const form = document.getElementById("messageForm");
const messageCount = document.getElementById("messageCount");
let messages = [];
let originalCharacter = "";
let clickCount = 0;

const characterImages = {
  Luffy: "Luffy.png",
  Zoro: "Zoro.png",
  Sanji: "Sanji.png",
  Nami: "Nami.png",
  Robin: "Robin.png",
  Chopper: "Chopper.png",
  Usopp: "Usopp.png",
  Franky: "Franky.png",
  Hancock: "Hancock.png",
  beauty1: "beauty1.png",
  beauty2: "beauty2.png",
  special: "special.png",
};

const randomBlessings = [
  "生日快樂！記得每天都要笑一下！",
  "願你天天都有好心情！",
  "悶騷也可以很快樂！",
  "祝你未來一年都比去年的今天更棒！",
  "記得，每一天都值得慶祝～",
  "生日快樂！希望你天天都像魯夫一樣開朗！",
  "願你每天都像娜美一樣美麗動人！",
  "祝你快樂如喬巴，勇敢如索隆！",
  "祝你身體健康！",
  "希望你心想事成！",
  "蒟蒻信也偷偷祝福你～",
  "每天都被幸福包圍！",
  "祝你擁有香吉士的美食與羅賓的智慧！"
];

// 清除所有留言
function clearMessages() {
  messages = [];
  updateMessages();
}

// 更新留言區
function updateMessages() {
  app.innerHTML = "";
  messages.forEach((msg, index) => {
    const msgDiv = document.createElement("div");
    msgDiv.className = "message";

    const img = document.createElement("img");
    img.src = `images/${characterImages[msg.character]}`;
    img.alt = msg.character;

    const text = document.createElement("p");
    text.innerHTML = `<strong>${msg.name}：</strong>`;

    msgDiv.appendChild(img);
    msgDiv.appendChild(text);

    msgDiv.addEventListener("click", () => {
      clickCount++;
      if (clickCount % 4 === 1) {
        text.innerHTML = `<strong>${msg.name}：</strong><br><em>留言內容</em>`;
      } else if (clickCount % 4 === 2) {
        text.innerHTML = `<strong>${msg.name}：</strong><br>${msg.message}`;
      } else if (clickCount % 4 === 3) {
        text.innerHTML = `<strong>${msg.name}：</strong><br>${msg.message}<br><em>${getRandomBlessing()}</em>`;
      } else {
        text.innerHTML = `<strong>${msg.name}：</strong>`;
      }
    });

    app.appendChild(msgDiv);
  });

  messageCount.textContent = `目前共有 ${messages.length} 筆悶騷留言`;
}

// 隨機祝福語
function getRandomBlessing() {
  return randomBlessings[Math.floor(Math.random() * randomBlessings.length)];
}

// 表單提交
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const name = form.name.value.trim();
  let character = form.character.value;
  const message = form.message.value.trim();

  if (!name || !message) return;

  // 檢查是否為「夏夕夏景」
  if (name === "夏夕夏景" || message.includes("夏夕夏景")) {
    clearMessages();
    return;
  }

  // 特殊隱藏角色觸發
  if (name === "小屁股蛋" || message.includes("小屁股蛋")) {
    character = "special";
  }

  messages.push({ name, message, character });
  updateMessages();
  form.reset();
});