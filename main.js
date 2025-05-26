const form = document.getElementById('messageForm');
const app = document.getElementById('app');
const messageCount = document.getElementById('messageCount');
let messages = [];
let displayStep = 0;
let currentIndex = 0;

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
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = form.name.value.trim();
  const content = form.message.value.trim();
  let character = form.character.value;

  if (!name || !content) return;

  if (name === '夏夕夏景') {
    messages = [];
    renderMessages();
    alert('已清除所有留言！');
    return;
  }

  if (name === '小屁股蛋') {
    character = 'special';
  }

  messages.push({ name, content, character });
  form.reset();
  currentIndex = messages.length - 1;
  displayStep = 0;
  showMessage();
  updateMessageCount();
});

function showMessage() {
  if (messages.length === 0) return;
  const { name, content, character } = messages[currentIndex];

  let html = '';
  if (displayStep === 0) {
    html = `<p><strong>${name}</strong> 使用了 <strong>${character}</strong> 角色！</p>`;
  } else if (displayStep === 1) {
    html = `<p><strong>${name}</strong> 說：${content}</p>`;
  } else if (displayStep === 2) {
    const bless = blessings[Math.floor(Math.random() * blessings.length)];
    html = `<p><em>${bless}</em></p>`;
  } else {
    displayStep = -1; // will be 0 on next ++
    currentIndex = (currentIndex + 1) % messages.length;
    html = '';
  }

  app.innerHTML = html;
  displayStep++;
}

app.addEventListener('click', showMessage);

function renderMessages() {
  app.innerHTML = '';
}

function updateMessageCount() {
  messageCount.textContent = `目前共有 ${messages.length} 則留言`;
}