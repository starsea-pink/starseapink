const messageForm = document.getElementById('messageForm');
const app = document.getElementById('app');
const messageCount = document.getElementById('messageCount');
const messages = [];
let currentCharacter = null;
let currentMessageIndex = 0;

function createMessageElement(message) {
  const container = document.createElement('div');
  container.className = 'message';

  const characterImg = document.createElement('img');
  characterImg.src = `images/${message.character}.png`;
  characterImg.className = 'character-img';

  const messageText = document.createElement('p');
  messageText.innerText = `${message.name}：${message.text}`;

  const blessing = document.createElement('p');
  blessing.innerText = getRandomBlessing();
  blessing.className = 'blessing';

  container.appendChild(characterImg);
  container.appendChild(messageText);
  container.appendChild(blessing);

  return container;
}

function getRandomBlessing() {
  const blessings = [
    '生日快樂！永遠年輕快樂！',
    '希望你天天開心，事事順心！',
    '願你笑口常開，壽比南山！',
    '祝你人生如遊戲般順利通關！',
    '願你事業愛情雙豐收！',
    '生日來點甜，年年都有戀！'
  ];
  const index = Math.floor(Math.random() * blessings.length);
  return blessings[index];
}

function renderMessages() {
  app.innerHTML = `<p class="intro">歡迎大家來祝福Eric生日，不管是悄悄話還是大聲公</p>`;
  messages.forEach((msg, idx) => {
    const el = createMessageElement(msg);
    el.dataset.index = idx;
    el.addEventListener('click', () => {
      if (!el.dataset.step || el.dataset.step === '0') {
        el.querySelector('p').style.display = 'none';
        el.querySelector('.blessing').style.display = 'none';
        el.dataset.step = '1';
      } else if (el.dataset.step === '1') {
        el.querySelector('p').style.display = 'block';
        el.dataset.step = '2';
      } else if (el.dataset.step === '2') {
        el.querySelector('.blessing').style.display = 'block';
        el.dataset.step = '3';
      } else {
        el.querySelector('p').style.display = 'block';
        el.querySelector('.blessing').style.display = 'none';
        el.dataset.step = '0';
      }
    });
    app.appendChild(el);
  });

  messageCount.innerText = `目前留言總數：${messages.length}`;
}

messageForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = messageForm.name.value.trim();
  const text = messageForm.message.value.trim();
  let character = messageForm.character.value;

  if (!name || !text) return;

  // 特殊處理：輸入「夏夕夏景」提醒清除留言
  if (text === '夏夕夏景') {
    alert('你輸入了「夏夕夏景」，這會清除所有留言內容。確定的話請手動清除記錄。');
    return;
  }

  // 特殊處理：輸入「小屁股蛋」指定使用 special 角色
  if (text.includes('小屁股蛋')) {
    character = 'special';
  }

  const newMessage = { name, text, character };
  messages.push(newMessage);

  messageForm.reset();
  renderMessages();
});