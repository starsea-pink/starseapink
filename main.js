const form = document.getElementById('messageForm');
const app = document.getElementById('app');
const bgMusic = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');
const characterSelect = document.getElementById('characterSelect');

let messages = [];
let displayIndex = 0;

// 音樂播放
musicToggle.addEventListener('click', () => {
  if (bgMusic.paused) {
    bgMusic.play();
    musicToggle.textContent = '暫停音樂';
  } else {
    bgMusic.pause();
    musicToggle.textContent = '播放音樂';
  }
});

// 提交留言
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = form.name.value.trim();
  const message = form.message.value.trim();
  let character = form.character.value;

  if (!name || !message) return;

  if (message === '夏夕夏景') {
    messages = [];
    app.innerHTML = '';
    alert('輸入了夏夕夏景，已清除所有留言。');
    form.reset();
    return;
  }

  if (message.includes('小屁股蛋')) {
    character = 'special';
  }

  const newMsg = {
    name,
    message,
    character,
    randomBlessing: getRandomBlessing()
  };

  messages.push(newMsg);
  displayIndex = messages.length - 1;
  showCharacter(messages[displayIndex].character);
  form.reset();
});

// 點擊切換內容
app.addEventListener('click', () => {
  if (messages.length === 0) return;
  const current = messages[displayIndex];

  if (displayIndex % 4 === 0) {
    showMessage(current.message);
  } else if (displayIndex % 4 === 1) {
    showBlessing(current.randomBlessing);
  } else if (displayIndex % 4 === 2) {
    showCharacter(current.character);
  } else {
    displayIndex = (displayIndex + 1) % messages.length;
    showCharacter(messages[displayIndex].character);
  }
  displayIndex++;
});

// 顯示角色圖片
function showCharacter(character) {
  app.innerHTML = `<img src="images/${character}.png" alt="${character}" style="width: 100%;">`;
}

// 顯示留言
function showMessage(msg) {
  app.innerHTML = `<div class="message">${msg}</div>`;
}

// 顯示祝福
function showBlessing(bless) {
  app.innerHTML = `<div class="message">${bless}</div>`;
}

// 隨機祝福語
function getRandomBlessing() {
  const blessings = [
    "生日快樂！願你天天開心。",
    "祝你幸福滿滿，事事順心。",
    "願你的人生充滿光與愛！",
    "今天是你的主場，盡情享受吧！"
  ];
  return blessings[Math.floor(Math.random() * blessings.length)];
}