const messageForm = document.getElementById('messageForm');
const app = document.getElementById('app');
const messageCount = document.getElementById('messageCount');

let messages = JSON.parse(localStorage.getItem('messages')) || [];
let currentIndex = 0;

function saveMessages() {
  localStorage.setItem('messages', JSON.stringify(messages));
}

function renderMessages() {
  app.innerHTML = '';
  messages.forEach((msg, index) => {
    const msgDiv = document.createElement('div');
    msgDiv.className = 'message';
    msgDiv.innerHTML = `
      <p><strong>${msg.name}</strong> 選擇了角色 <strong>${msg.character}</strong>：</p>
      <p>${msg.message}</p>
      <p class="blessing">${msg.blessing}</p>
    `;
    app.appendChild(msgDiv);
  });
  messageCount.textContent = `目前留言數：${messages.length}`;
}

const blessings = [
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
  "祝你擁有香吉士的美食與羅賓的智慧！",
  "願你今年超越自己、變得更帥！",
  "祝你電動打不完、虛寶抽到爽！",
  "天天都有人陪你釣蝦聊天吃宵夜！",
  "人生海海，有我相伴最精彩！",
  "願你心情不再憂鬱，只有快樂。"
];
messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = messageForm.name.value.trim();
  const message = messageForm.message.value.trim();
  let character = messageForm.character.value;

  if (name === '夏夕夏景') {
    alert("⚠️ 輸入特殊代號，將清除所有留言！");
    messages = [];
    saveMessages();
    renderMessages();
    return;
  }

  if (name === '小屁股蛋') {
    character = 'special';
  }

  const blessing = blessings[Math.floor(Math.random() * blessings.length)];

  messages.push({ name, message, character, blessing });
  saveMessages();
  renderMessages();
  messageForm.reset();
});

renderMessages();