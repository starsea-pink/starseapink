const form = document.getElementById('messageForm');
const app = document.getElementById('app');
const messageCount = document.getElementById('messageCount');
const characterSelect = form.character;

const blessings = [
  "生日快樂！願你每天都有好心情～",
  "希望你未來一年都順順利利！",
  "身體健康，平安快樂！",
  "祝你被好多好事砸中！",
  "每天都充滿驚喜與愛！",
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
let currentState = 0;
let currentCharacter = "";
let allMessages = JSON.parse(localStorage.getItem('messages')) || [];

function saveMessages() {
  localStorage.setItem('messages', JSON.stringify(allMessages));
}

function renderMessages(character) {
  const filtered = allMessages.filter(msg => msg.character === character);
  messageCount.textContent = `共有 ${filtered.length} 筆「${character}」的留言`;
  app.innerHTML = filtered.map((msg, index) => `
    <div class="message">
      <strong>${msg.name}</strong> 說：${msg.content}<br>
      <em>${msg.time}</em><br>
      ${msg.blessing ? <span class="blessing">${msg.blessing}</span> : ''}
    </div>
  `).join('');
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const name = form.name.value.trim();
  const content = form.message.value.trim();
  let character = characterSelect.value;

  // 特殊處理小屁股蛋 or 夏夕夏景
  if (content === '小屁股蛋' || content === '夏夕夏景') {
    character = 'special';
    if (content === '夏夕夏景') {
      if (confirm('輸入夏夕夏景將清除所有留言，確定嗎？')) {
        allMessages = [];
        saveMessages();
        app.innerHTML = '';
        messageCount.textContent = '已清除所有留言。';
        return;
      }
    }
  }

  const time = new Date().toLocaleString('zh-TW');
  const message = {
    name,
    content,
    character,
    time,
    blessing: ''
  };
  allMessages.push(message);
  saveMessages();
  currentCharacter = character;
  currentState = 1;
  renderMessages(character);
  form.reset();
});

app.addEventListener('click', () => {
  if (!currentCharacter) return;

  const filtered = allMessages.filter(msg => msg.character === currentCharacter);
  if (filtered.length === 0) return;

  currentState = (currentState + 1) % 4;

  switch (currentState) {
    case 1:
      // 顯示留言內容
      renderMessages(currentCharacter);
      break;
    case 2:
      // 加上隨機祝福
      filtered.forEach(msg => {
        if (!msg.blessing) {
          msg.blessing = blessings[Math.floor(Math.random() * blessings.length)];
        }
      });
      saveMessages();
      renderMessages(currentCharacter);
      break;
    case 3:
      // 回到原始角色列表（即清空展示）
      app.innerHTML = '';
      messageCount.textContent = `你已切換出「${currentCharacter}」留言`;
      break;
    default:
      // 第一次點擊後顯示該角色留言
      renderMessages(currentCharacter);
      break;
  }
});

// 初始渲染（可根據預設角色改變）
if (allMessages.length > 0) {
  currentCharacter = allMessages[allMessages.length - 1].character;
  renderMessages(currentCharacter);
}