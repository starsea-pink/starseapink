const bgMusic = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');
musicToggle.addEventListener('click', () => {
  if (bgMusic.paused) {
    bgMusic.play();
    musicToggle.textContent = '暫停音樂';
  } else {
    bgMusic.pause();
    musicToggle.textContent = '播放音樂';
  }
});

const form = document.getElementById('messageForm');
const app = document.getElementById('app');
const characterSelect = document.getElementById('characterSelect');

let messages = [];
let showState = 0;

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = form.name.value.trim();
  const message = form.message.value.trim();
  let character = form.character.value;

  if (!name || !message) return;

  // 特殊角色判斷
  if (name === '夏夕夏景') {
    if (confirm("輸入夏夕夏景會清除所有留言內容，確定要繼續？")) {
      messages = [];
      renderMessages();
    }
    return;
  } else if (name === '小屁股蛋') {
    character = 'special';
  }

  messages.push({
    name,
    message,
    character,
    blessing: getRandomBlessing(),
  });

  form.reset();
  renderMessages();
});

function getRandomBlessing() {
  const blessings = [
    '祝你天天開心！',
    '生日快樂，一切順利！',
    '願你心想事成！',
    '蒟蒻信也偷偷祝福你～',
  ];
  return blessings[Math.floor(Math.random() * blessings.length)];
}

function renderMessages() {
  app.innerHTML = '';
  messages.forEach((msg, index) => {
    const block = document.createElement('div');
    block.className = 'message-block';
    block.dataset.index = index;
    block.dataset.state = 0;

    const img = document.createElement('img');
    img.src = `images/${msg.character}.png`;
    img.alt = msg.character;
    img.className = 'character-img';
    block.appendChild(img);

    app.appendChild(block);

    block.addEventListener('click', () => {
      let currentState = parseInt(block.dataset.state);
      block.innerHTML = '';

      if (currentState === 0) {
        const p = document.createElement('p');
        p.textContent = `${msg.name}：${msg.message}`;
        block.appendChild(p);
      } else if (currentState === 1) {
        const p = document.createElement('p');
        p.textContent = msg.blessing;
        block.appendChild(p);
      } else if (currentState === 2) {
        const img = document.createElement('img');
        img.src = `images/${msg.character}.png`;
        img.alt = msg.character;
        img.className = 'character-img';
        block.appendChild(img);
      }

      block.dataset.state = (currentState + 1) % 3;
    });
  });
}