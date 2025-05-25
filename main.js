const form = document.getElementById('messageForm');
const app = document.getElementById('app');
const messageCount = document.getElementById('messageCount');

let messages = JSON.parse(localStorage.getItem('messages')) || [];
let originalCharacter = null;
let clickStage = 0;

function saveMessages() {
  localStorage.setItem('messages', JSON.stringify(messages));
}

function updateMessageCount() {
  messageCount.textContent = `目前共有 ${messages.length} 則留言`;
}

function renderMessages(character) {
  app.innerHTML = '';
  const filtered = messages.filter(msg => msg.character === character || character === 'all');
  filtered.forEach(msg => {
    const div = document.createElement('div');
    div.className = 'message';
    div.innerHTML = `
      <p><strong>${msg.name}</strong> 選擇了角色 <strong>${msg.character}</strong>：</p>
      <p>${msg.content}</p>
      <p class="blessing">${msg.blessing || ''}</p>
    `;
    app.appendChild(div);
  });
  updateMessageCount();
}

function getBlessing() {
  const blessings = [
    "願你天天開心！",
    "祝你身體健康！",
    "願你永遠幸福快樂！",
    "新的一歲心想事成！",
     "蒟蒻信也偷偷祝福你～",
      "每天都被幸福包圍！",
    "祝你事事順心，好運連連！"
  ];
  return blessings[Math.floor(Math.random() * blessings.length)];
}

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const name = form.name.value.trim();
  const content = form.message.value.trim();
  let character = form.character.value;

  if (name === '夏夕夏景') {
    if (confirm('你將清除所有留言，確定嗎？')) {
      messages = [];
      saveMessages();
      renderMessages('all');
      return;
    } else return;
  }

  if (name === '小屁股蛋') character = 'special';

  const newMessage = {
    name,
    content,
    character,
    blessing: getBlessing()
  };

  messages.push(newMessage);
  saveMessages();
  form.reset();
  originalCharacter = character;
  clickStage = 0;
  renderMessages(originalCharacter);
});

app.addEventListener('click', () => {
  if (!originalCharacter) return;
  clickStage = (clickStage + 1) % 4;

  if (clickStage === 1) {
    renderMessages('message');
  } else if (clickStage === 2) {
    const blessingDiv = document.createElement('div');
    blessingDiv.className = 'message';
    blessingDiv.innerHTML = `<p class="blessing">${getBlessing()}</p>`;
    app.innerHTML = '';
    app.appendChild(blessingDiv);
    updateMessageCount();
  } else if (clickStage === 3) {
    renderMessages(originalCharacter);
  }
});

// 頁面初始化時載入留言
renderMessages('all');