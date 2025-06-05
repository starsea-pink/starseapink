const form = document.getElementById('messageForm');
const app = document.getElementById('app');
const messageCountEl = document.getElementById('messageCount');

let messages = [];
let displayIndex = 0;
let originalCharacter = null;
const blessings = [
  "生日快樂！願你天天開心！",
  "你最棒！今天也要幸福喔！",
  "希望你的人生像航海王一樣精彩！",
  "祝你一整年都像魯夫吃到肉一樣快樂！",
  "希望你每天都能像娜美數錢一樣快樂～",
  "人生就該像佛朗基一樣超～級～！",
  "祝你魅力爆棚，像羅賓一樣優雅神秘～",
  "別忘了休息，像喬巴一樣可愛療癒！",
  "每天都要讚美自己，像女帝一樣自信滿滿！",
  "像香吉士一樣暖心地寵愛生活吧～",
  "生日快樂！記得每天都要笑一下！",
  "願你天天都有好心情！",
  "悶騷也可以很快樂！",
  "祝你未來一年都比去年的今天更棒！",
  "記得，每一天都值得慶祝～",
  "祝你快樂如喬巴，勇敢如索隆！",
  "祝你身體健康！",
  "希望你心想事成！",
  "蒟蒻信也偷偷祝福你～",
  "每天都被幸福包圍！",
  "祝你擁有香吉士的美食與羅賓的智慧！"
];
form.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = form.name.value.trim();
  const message = form.message.value.trim();
  let character = form.character.value;

  if (!name || !message) return;

  if (name === '夏夕夏景') {
    if (confirm('你輸入了特殊代碼，將會清除所有留言，確定嗎？')) {
      messages = [];
      updateMessageCount();
      app.innerHTML = '';
    }
    return;
  }

  if (name === '小屁股蛋') {
    character = 'special';
  }

  const newMessage = { name, message, character };
  messages.push(newMessage);
  updateMessageCount();

  displayIndex = 0;
  originalCharacter = character;
  displayMessage(newMessage);

  form.reset();
});

function updateMessageCount() {
  messageCountEl.textContent = `目前共有 ${messages.length} 則留言`;
}

function displayMessage(data) {
  const messageDiv = document.createElement('div');
  messageDiv.className = 'message';

  const img = document.createElement('img');
  img.src = `images/${data.character}.png`;
  img.alt = data.character;

  const nameP = document.createElement('p');
  nameP.textContent = `${data.name} 說：`;

  const contentP = document.createElement('p');
  contentP.textContent = data.message;

  const blessingP = document.createElement('p');
  blessingP.className = 'blessing';
  blessingP.textContent = blessings[Math.floor(Math.random() * blessings.length)];

  messageDiv.appendChild(img);
  messageDiv.appendChild(nameP);
  messageDiv.appendChild(contentP);
  messageDiv.appendChild(blessingP);

  // 初始狀態：只顯示角色
  contentP.style.display = 'none';
  blessingP.style.display = 'none';

  let clickCount = 0;
  messageDiv.addEventListener('click', () => {
    clickCount++;
    switch (clickCount % 4) {
      case 1:
        contentP.style.display = 'block';
        break;
      case 2:
        blessingP.style.display = 'block';
        break;
      case 3:
        img.src = `images/${originalCharacter}.png`;
        break;
      default:
        contentP.style.display = 'none';
        blessingP.style.display = 'none';
        img.src = `images/${data.character}.png`;
        break;
    }
  });

  app.appendChild(messageDiv);
}