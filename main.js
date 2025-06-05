const form = document.getElementById('messageForm');
const app = document.getElementById('app');
const messageCountDisplay = document.getElementById('messageCount');

const characters = [
  "Luffy", "Zoro", "Sanji", "Nami", "Robin", "Chopper", "Usopp", "Franky", "Hancock", "beauty1", "beauty2"
];

const blessings = [
  '生日快樂！希望你天天都像魯夫一樣開朗！',
  '願你每天都像娜美一樣美麗動人！',
  '祝你快樂如喬巴，勇敢如索隆！',
  '祝你身體健康！',
  '希望你心想事成！',
  '蒟蒻信也偷偷祝福你～',
  '每天都被幸福包圍！',
  '祝你擁有香吉士的美食與羅賓的智慧！'
];

let messages = JSON.parse(localStorage.getItem("messages") || "[]");

function saveMessages() {
  localStorage.setItem("messages", JSON.stringify(messages));
}

function renderMessages() {
  app.innerHTML = '';
  messageCountDisplay.textContent = `目前留言數：${messages.length} 則`;

  messages.forEach((msg, index) => {
    const box = document.createElement('div');
    box.className = 'message-box';
    box.dataset.index = index;

    const characterImg = document.createElement('img');
    characterImg.src = `images/${msg.character}.png`;
    characterImg.alt = msg.character;

    const content = document.createElement('div');
    content.className = 'message-content';
    content.innerHTML = `<strong>${msg.name}</strong> 留言角色：${msg.character}<br><span class="timestamp">${msg.time}</span>`;

    let stage = 0;

    characterImg.addEventListener('click', () => {
      stage = (stage + 1) % 4;

      if (stage === 1) {
        content.innerHTML += `<br>👉 <strong>留言內容：</strong>${msg.message}`;
      } else if (stage === 2) {
        content.innerHTML += `<br>🎉 <strong>隨機祝福：</strong>${getRandomBlessing()}`;
      } else if (stage === 3) {
        renderMessages(); // 重設畫面
      }
    });

    box.appendChild(content);
    box.appendChild(characterImg);
    app.appendChild(box);
  });
}

function getRandomBlessing() {
  return blessings[Math.floor(Math.random() * blessings.length)];
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const name = form.name.value.trim();
  const message = form.message.value.trim();
  let character = form.character.value;

  if (name.includes("小屁股蛋") || message.includes("小屁股蛋")) {
    character = "special";
  }

  const time = new Date().toLocaleString("zh-TW");

  messages.push({ name, message, character, time });
  saveMessages();
  renderMessages();
  form.reset();
});

renderMessages();