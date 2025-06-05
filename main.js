const form = document.getElementById('messageForm');
const app = document.getElementById('app');
const messageCount = document.getElementById('messageCount');

let messages = JSON.parse(localStorage.getItem('messages')) || [];
let originalCharacter = null;
let clickStep = 0;

const blessings = [
  "願你天天笑得像魯夫一樣開懷！",
  "祝你像索隆一樣堅定勇敢！",
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
function saveMessages() {
  localStorage.setItem('messages', JSON.stringify(messages));
}

function renderMessages() {
  app.innerHTML = '';
  messages.forEach((msg, index) => {
    const msgDiv = document.createElement('div');
    msgDiv.className = 'message';
    msgDiv.innerHTML = `
      <img src="images/${msg.character}.png" class="avatar" data-index="${index}">
      <div class="text" style="display:none">
        <strong>${msg.name}</strong>：${msg.message}<br>
        <em>${msg.blessing}</em>
      </div>
    `;
    app.appendChild(msgDiv);
  });
  messageCount.textContent = `目前共有 ${messages.length} 則悶騷留言`;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = form.name.value.trim();
  const message = form.message.value.trim();
  let character = form.character.value;

  if (!name || !message) return;

  if (name === '夏夕夏景') {
    if (confirm('輸入「夏夕夏景」將會清除所有留言，確定嗎？')) {
      messages = [];
      saveMessages();
      renderMessages();
    }
    return;
  }

  if (message.includes('小屁股蛋')) {
    character = 'special';
  }

  const blessing = blessings[Math.floor(Math.random() * blessings.length)];
  messages.push({ name, message, character, blessing });
  saveMessages();
  renderMessages();
  form.reset();
});

app.addEventListener('click', (e) => {
  if (e.target.classList.contains('avatar')) {
    const index = parseInt(e.target.dataset.index);
    const msgEl = e.target.nextElementSibling;
    const msg = messages[index];

    clickStep = (clickStep + 1) % 4;

    if (clickStep === 0) {
      e.target.src = `images/${msg.character}.png`;
      msgEl.style.display = 'none';
    } else if (clickStep === 1) {
      e.target.src = `images/${msg.character}.png`;
      msgEl.style.display = 'none';
    } else if (clickStep === 2) {
      msgEl.style.display = 'block';
    } else if (clickStep === 3) {
      msgEl.innerHTML += `<br><strong>🎁 ${msg.blessing}</strong>`;
    }
  }
});

// 初次載入畫面
renderMessages();