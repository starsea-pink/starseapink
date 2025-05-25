const bgMusic = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');
const messageForm = document.getElementById('messageForm');
const app = document.getElementById('app');

let messages = [];
let displayStep = 0;
let currentCharacter = '';

const blessings = [
  "願你天天開心！",
  "祝你身體健康！",
  "希望你心想事成！",
  "蒟蒻信也偷偷祝福你～",
  "每天都被幸福包圍！"
];

musicToggle.addEventListener('click', () => {
  if (bgMusic.paused) {
    bgMusic.play();
    musicToggle.textContent = '暫停音樂';
  } else {
    bgMusic.pause();
    musicToggle.textContent = '播放音樂';
  }
});

messageForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = messageForm.name.value.trim();
  const content = messageForm.message.value.trim();
  let character = messageForm.character.value;

  if (!name || !content) return;

  if (name === '夏夕夏景') {
    messages = [];
    alert('輸入關鍵字成功，已清除所有留言');
    renderMessages();
    return;
  }

  if (name === '小屁股蛋') {
    character = 'special';
  }

  messages.push({ name, content, character });
  messageForm.reset();
  currentCharacter = character;
  displayStep = 0;
  renderMessages();
});

app.addEventListener('click', () => {
  if (!currentCharacter) return;

  displayStep = (displayStep + 1) % 4;
  renderMessages();
});

function renderMessages() {
  app.innerHTML = '';

  const currentMessages = messages.filter(msg => msg.character === currentCharacter || displayStep === 3);

  currentMessages.forEach(msg => {
    const div = document.createElement('div');
    let imagePath = `images/${msg.character}.png`;

    let content = '';
    if (displayStep === 0) {
      content = `<img src="${imagePath}" alt="${msg.character}">`;
    } else if (displayStep === 1) {
      content = `<p>${msg.name}：${msg.content}</p>`;
    } else if (displayStep === 2) {
      const blessing = blessings[Math.floor(Math.random() * blessings.length)];
      content = `<p>${msg.name}：${msg.content}</p><p>${blessing}</p>`;
    } else {
      content = `<img src="images/${currentCharacter}.png" alt="${currentCharacter}">`;
    }

    div.innerHTML = content;
    app.appendChild(div);
  });
}