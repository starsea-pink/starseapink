const form = document.getElementById('messageForm');
const app = document.getElementById('app');
const messageCount = document.getElementById('messageCount');

const messages = [];
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
  "祝你擁有香吉士的美食與羅賓的智慧！"
];
let clickStage = 0;
let lastCharacter = null;

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const name = form.name.value.trim();
  const content = form.message.value.trim();
  const character = form.character.value;

  if (!name || !content) return;

  // 若輸入「夏夕夏景」，清空所有留言
  if (name === '夏夕夏景' || content === '夏夕夏景') {
    if (confirm('你輸入了「夏夕夏景」，將會清除所有留言，確定嗎？')) {
      messages.length = 0;
      app.innerHTML = '';
      messageCount.textContent = '';
    }
    return;
  }

  const timestamp = new Date().toLocaleString();

  // 特殊角色處理
  const displayCharacter = (name === '小屁股蛋' || content.includes('小屁股蛋')) ? 'special' : character;

  const messageObj = {
    name,
    content,
    character: displayCharacter,
    timestamp,
    id: messages.length
  };

  messages.push(messageObj);
  form.reset();
  renderMessage(messageObj);
  updateMessageCount();

  // 初始角色設定
  lastCharacter = displayCharacter;
  clickStage = 1;
});

function renderMessage(msg) {
  const msgDiv = document.createElement('div');
  msgDiv.className = 'message-block';
  msgDiv.dataset.character = msg.character;
  msgDiv.dataset.id = msg.id;

  const characterImg = document.createElement('img');
  characterImg.src = `images/${msg.character}.png`;
  characterImg.alt = msg.character;

  const nameP = document.createElement('p');
  nameP.textContent = `${msg.name} 說：`;

  const contentP = document.createElement('p');
  contentP.textContent = msg.content;
  contentP.classList.add('hidden');

  const blessingP = document.createElement('p');
  blessingP.textContent = blessings[Math.floor(Math.random() * blessings.length)];
  blessingP.classList.add('hidden', 'blessing');

  const timeP = document.createElement('p');
  timeP.textContent = `留言時間：${msg.timestamp}`;
  timeP.classList.add('hidden', 'timestamp');

  msgDiv.appendChild(characterImg);
  msgDiv.appendChild(nameP);
  msgDiv.appendChild(contentP);
  msgDiv.appendChild(blessingP);
  msgDiv.appendChild(timeP);

  msgDiv.addEventListener('click', function () {
    clickStage = (clickStage + 1) % 4;

    switch (clickStage) {
      case 1: // 顯示留言內容
        contentP.classList.remove('hidden');
        blessingP.classList.add('hidden');
        timeP.classList.add('hidden');
        break;
      case 2: // 顯示祝福
        contentP.classList.add('hidden');
        blessingP.classList.remove('hidden');
        timeP.classList.add('hidden');
        break;
      case 3: // 顯示時間
        blessingP.classList.add('hidden');
        timeP.classList.remove('hidden');
        break;
      default: // 回到角色圖片
        contentP.classList.add('hidden');
        blessingP.classList.add('hidden');
        timeP.classList.add('hidden');
        break;
    }
  });

  app.prepend(msgDiv);
}

function updateMessageCount() {
  messageCount.textContent = `目前共 ${messages.length} 則留言`;
}