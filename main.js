const bgMusic = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');
const reloadButton = document.getElementById('reloadButton');
const form = document.getElementById('messageForm');
const app = document.getElementById('app');
const messageCount = document.getElementById('messageCount');
const blessings = [
  '祝你天天開心！', '生日快樂！', '願你心想事成～',
  '幸福滿滿每一天！', '笑口常開唷！', '願你萬事如意！'
];

let messages = JSON.parse(localStorage.getItem('messages')) || [];

function renderMessages(characterFilter = null) {
  app.innerHTML = '';
  let filtered = messages;

  if (characterFilter) {
    filtered = messages.filter(m => m.character === characterFilter);
  }

  filtered.forEach(msg => {
    const div = document.createElement('div');
    div.className = 'message';
    div.innerHTML = `<strong>${msg.name} (${msg.character})：</strong>
                     <p>${msg.message}</p>
                     <em>${msg.blessing}</em>`;
    app.appendChild(div);
  });

  messageCount.textContent = `目前共有 ${filtered.length} 則留言`;
}

musicToggle.addEventListener('click', () => {
  if (bgMusic.paused) {
    bgMusic.play();
    musicToggle.textContent = '暫停音樂';
  } else {
    bgMusic.pause();
    musicToggle.textContent = '播放音樂';
  }
});

reloadButton.addEventListener('click', () => {
  renderMessages();
});

form.addEventListener('submit', e => {
  e.preventDefault();

  const name = form.name.value.trim();
  const message = form.message.value.trim();
  let character = form.character.value;

  if (name === '夏夕夏景') {
    if (confirm('你確定要清除所有留言嗎？')) {
      messages = [];
      localStorage.removeItem('messages');
      renderMessages();
    }
    return;
  }

  if (name === '小屁股蛋') {
    character = 'special';
  }

  const newMsg = {
    name,
    message,
    character,
    blessing: blessings[Math.floor(Math.random() * blessings.length)]
  };

  messages.push(newMsg);
  localStorage.setItem('messages', JSON.stringify(messages));
  form.reset();
  renderMessages(character);
});