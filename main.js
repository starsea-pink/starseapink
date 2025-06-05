const form = document.getElementById('messageForm');
const app = document.getElementById('app');
const messageCount = document.getElementById('messageCount');

const blessings = [
  "願你天天都有甜甜的心情,！",
  "祝笑容滿滿！",
  "希望你的願望通通實現！",
  "今天的你最閃耀！",
  "給你無限的祝福與快樂！",
  "願你天天開心🎉！ 記得每天都要笑一下！",
  "你最棒！今生也要幸福喔！",
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
  "悶騷也可以很快樂！",
  "祝你未來一年都比去年的今天更棒！",
  "記得，每一天都值得慶祝～",
  "祝你快樂如喬巴，勇敢如索隆！",
  "祝你身體健康！",
  "希望你心想事成！",
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
  "希望你每天都能像娜美數錢一樣快樂～",,
  "願你天天都有好心情！",
  "蒟蒻信也偷偷祝福你～",
];

let messages = JSON.parse(localStorage.getItem('messages')) || [];
let tapCount = 0;
let currentCharacter = null;

// 清除留言觸發關鍵詞
const clearTriggerName = "夏夕夏景";

// 若 localStorage 記錄了觸發，清空留言
if (localStorage.getItem('clearTriggered') === 'true') {
  messages = [];
  localStorage.setItem('messages', JSON.stringify(messages));
  localStorage.removeItem('clearTriggered');
}

function saveMessages() {
  localStorage.setItem('messages', JSON.stringify(messages));
}

function renderMessages() {
  app.innerHTML = '';
  messageCount.textContent = `總共有 ${messages.length} 則留言！`;

  messages.forEach((msg, index) => {
    const msgDiv = document.createElement('div');
    msgDiv.className = 'message';
    msgDiv.dataset.index = index;
    msgDiv.dataset.character = msg.character;
    msgDiv.dataset.timestamp = msg.timestamp;

    msgDiv.addEventListener('click', () => {
      tapCount++;
      const char = msg.character;
      if (tapCount % 4 === 1) {
        msgDiv.innerHTML = `<img src="images/${char}.png"><br>`;
      } else if (tapCount % 4 === 2) {
        msgDiv.innerHTML = `<img src="images/${char}.png"><p>祝賀者:${msg.name},祝賀詞:${msg.message},留言時間:${msg.timestamp}</p>`;
      } else if (tapCount % 4 === 3) {
        const bless = blessings[Math.floor(Math.random() * blessings.length)];
        msgDiv.innerHTML = `<img src="images/${char}.png"><p>祝賀者:${msg.name},祝賀詞:${msg.message},留言時間:${msg.timestamp}</p><p class="blessing">${bless}</p>`;
      } else {
        msgDiv.innerHTML = `<img src="images/${char}.png"><br>`;
        tapCount = 0;
      }
    });

    msgDiv.innerHTML = `<img src="images/${msg.character}.png"><br>`;
    app.appendChild(msgDiv);
  });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = form.name.value.trim();
  const message = form.message.value.trim();
  let character = form.character.value;
  const timeElapsed = Date.now();
  const timestamp = new Date(timeElapsed).toUTCString();

  // 特殊輸入
  if (name === clearTriggerName) {
    localStorage.setItem('clearTriggered', 'true');
    location.reload();
    return;
  }

  if (name.includes("小屁股蛋")) {
    character = "special";
  }

  messages.push({ name, message, character, timestamp });
  saveMessages();
  form.reset();
  renderMessages();
});

renderMessages();