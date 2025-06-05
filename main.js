const form = document.getElementById('messageForm');
const app = document.getElementById('app');
const messageCount = document.getElementById('messageCount');

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

let messages = JSON.parse(localStorage.getItem('messages')) || [];

function renderMessages() {
  app.innerHTML = '';
  messages.forEach((msg, index) => {
    const block = document.createElement('div');
    block.className = 'message-block';

    const img = document.createElement('img');
    img.src = `images/${msg.character}.png`;
    img.alt = msg.character;

    let state = 0;
    block.appendChild(img);

    block.addEventListener('click', () => {
      state = (state + 1) % 4;
      block.innerHTML = '';
      if (state === 0) {
        const img = document.createElement('img');
        img.src = `images/${msg.character}.png`;
        block.appendChild(img);
      } else if (state === 1) {
        const p = document.createElement('p');
        p.textContent = `${msg.name}：${msg.message}`;
        block.appendChild(p);
      } else if (state === 2) {
        const p = document.createElement('p');
        p.textContent = blessings[Math.floor(Math.random() * blessings.length)];
        block.appendChild(p);
      } else if (state === 3) {
        const img = document.createElement('img');
        img.src = `images/${msg.character}.png`;
        block.appendChild(img);
      }
    });

    app.appendChild(block);
  });

  messageCount.textContent = `目前留言數：${messages.length}`;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = form.name.value.trim();
  const message = form.message.value.trim();
  let character = form.character.value;

  if (name === '夏夕夏景') {
    if (confirm('你確定要清除所有留言嗎？')) {
      localStorage.removeItem('messages');
      messages = [];
      renderMessages();
    }
    return;
  }

  if (message.includes('小屁股蛋')) {
    character = 'special';
  }

  messages.push({ name, message, character });
  localStorage.setItem('messages', JSON.stringify(messages));
  form.reset();
  renderMessages();
});

renderMessages();