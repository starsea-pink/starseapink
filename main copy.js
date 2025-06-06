const messageForm = document.getElementById("messageForm");
const app = document.getElementById("app");
const messageCount = document.getElementById("messageCount");

let messages = [];
let clickState = 0;
let originalCharacter = "";
let currentMessage = null;
const blessings = [
  "生日快樂！天天都像海賊王一樣自由！",
  "願你擁有香吉士的浪漫與好手藝～",
  "祝你一年比一年更帥更可愛！",
  "願你健康快樂又富有，如佛朗基的改造人生！",
  "希望你像魯夫一樣無憂無慮，勇往直前！",
  "生日快樂！願你天天開心！",
  "你最棒！今天也要幸福喔！",
  "希望你的人生像航海王一樣精彩！",
  "祝你一整年都像魯夫吃到肉一樣快樂！",
  "願你天天笑得像魯夫一樣開懷！",
  "祝你像索隆一樣堅定勇敢！",
  "希望你每天都能像娜美數錢一樣快樂～",
  "人生就該像佛朗基一樣超～級～！",
  "祝你魅力爆棚，像羅賓一樣優雅神秘～",
  "別忘了休息，像喬巴一樣可愛療癒！",
  "每天都要讚美自己，像女帝一樣自信滿滿！",
  "像香吉士一樣暖心地寵愛生活吧～",
  "記得每天都要笑一下！🎉",
  "願你天天都有好心情！",
  "悶騷也可以很快樂！",
  "祝你未來一年都比去年的今天更棒！",
  "記得，每一天都值得慶祝～",
  "祝你快樂如喬巴，勇敢如索隆！",
  "祝你身體健康！",
  "希望你心想事成！",
  "蒟蒻信也偷偷祝福你～",
  "每天都被幸福包圍！",
  "祝你擁有香吉士的美食與羅賓的智慧！",
  "願你每一天都充滿笑容 😄",
  "祝你心想事成，幸福美滿 ✨",
  "未來一年順順利利 🍀",
  "願你天天都像今天一樣快樂 🥳",
  "希望你未來一年都順順利利！",
  "身體健康，平安快樂！",
  "祝你被好多好事砸中！",
  "每天都充滿驚喜與愛！",
  ];
// 初始化角色圖片顯示區
const characterImg = document.createElement("img");
characterImg.className = "character-img";
app.appendChild(characterImg);

function updateMessageCount() {
  messageCount.textContent = `目前共有 ${messages.length} 筆留言`;
}

function renderMessage(messageObj) {
  currentMessage = messageObj;
  characterImg.src = `images/${messageObj.character}.png`;
  characterImg.alt = messageObj.character;
  characterImg.dataset.original = messageObj.character;
  characterImg.style.display = "block";
}

characterImg.addEventListener("click", () => {
  if (!currentMessage) return;

  clickState++;

  if (clickState === 1) {
    // 顯示留言內容
    alert(`留言內容：${currentMessage.message}`);
  } else if (clickState === 2) {
    // 顯示祝福語
    const randomBlessing = blessings[Math.floor(Math.random() * blessings.length)];
    alert(`🎉 ${randomBlessing}`);
  } else if (clickState === 3) {
    // 點一下就切回原角色
    characterImg.src = `images/${characterImg.dataset.original}.png`;
    clickState = 0;
  }
});

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = messageForm.name.value.trim();
  const message = messageForm.message.value.trim();
  let character = messageForm.character.value;

  if (!name || !message) return;

  // 清除所有留言條件
  if (name === "夏夕夏景") {
    if (confirm("你輸入了『夏夕夏景』，這將清除所有留言，確定嗎？")) {
      messages = [];
      updateMessageCount();
      alert("留言已全部清除！");
    }
    messageForm.reset();
    return;
  }

  if (name === "小屁股蛋") {
    character = "special";
  }

  const messageObj = { name, message, character };
  messages.push(messageObj);

  renderMessage(messageObj);
  updateMessageCount();
  messageForm.reset();
  clickState = 0;
});