const form = document.getElementById('messageForm');
const app = document.getElementById('app');
const messageCount = document.getElementById('messageCount');

let messages = [];
let clickStep = 0;
let currentCharacter = '';
let randomBlessings = [
  '祝你今天打電動大獲全勝！',
  '祝你釣蝦釣到手軟～',
  '今天也要開心、耍廢、吃飽飽',
  '希望你今天沒被老闆煩到！',
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
  "祝你擁有香吉士的美食與羅賓的智慧！"
];
function renderMessages(character) {
  app.innerHTML = '';
  const filtered = messages.filter(msg => msg.character === character);
  filtered.forEach(msg => {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `
      <strong>${msg.name}</strong>（${msg.character}）:<br>
      ${msg.message}<br>
      <em>${msg.blessing || ''}</em>
    `;
    app.appendChild(div);
  });

  messageCount.textContent = `目前共有 ${filtered.length} 則 ${character} 的留言`;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = form.name.value.trim();
  const message = form.message.value.trim();
  let character = form.character.value;

  if (name === '夏夕夏景') {
    alert('輸入夏夕夏景會清除所有留言！');
    messages = [];
    app.innerHTML = '';
    messageCount.textContent = '';
    return;
  }

  if (name === '小屁股蛋') {
    character = 'special';
  }

  const newMessage = {
    name,
    message,
    character,
    blessing: ''
  };

  messages.push(newMessage);
  currentCharacter = character;
  clickStep = 0;
  renderMessages(character);
  form.reset();
});

app.addEventListener('click', () => {
  if (!currentCharacter) return;
  const currentMessages = messages.filter(m => m.character === currentCharacter);
  if (currentMessages.length === 0) return;

  clickStep++;
  const lastMsg = currentMessages[currentMessages.length - 1];

  switch (clickStep % 4) {
    case 1:
      app.innerHTML = `<div class="message"><strong>${lastMsg.name}</strong>（${lastMsg.character}）</div>`;
      break;
    case 2:
      app.innerHTML = `<div class="message">${lastMsg.message}</div>`;
      break;
    case 3:
      const blessing = randomBlessings[Math.floor(Math.random() * randomBlessings.length)];
      lastMsg.blessing = blessing;
      app.innerHTML = `<div class="message"><em>${blessing}</em></div>`;
      break;
    default:
      renderMessages(currentCharacter);
      break;
  }
});