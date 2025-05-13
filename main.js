const form = document.querySelector('form');
const app = document.querySelector('#app');
const nameInput = document.querySelector('#name');
const blessingInput = document.querySelector('#blessing');
const charaSelect = document.querySelector('#chara');
const music = new Audio('https://file-examples.com/storage/fe93066b705061e4eae3a58/2017/11/file_example_MP3_700KB.mp3'); // Demo背景音樂
music.loop = true;
music.volume = 0.3;
music.play();

// 漫畫互動台詞 pool
const blessingLines = [
  '娜美親你一下！',
  '羅賓給你一個微笑祝福～',
  '魯夫說：我會成為海賊王，也祝你生日快樂！',
  '香吉士送你一盤愛心料理！',
  '索隆冷冷地說：祝你過得還行…',
  '喬巴：謝、謝謝你！生日快樂啦！',
  '騙人布：我早就準備了一個宇宙級大驚喜！',
  '布魯克：Yohoho～可以看你的內褲嗎？（喂）'
];

// 留言暫存
let messages = JSON.parse(localStorage.getItem('messages')) || [];

// 顯示留言
function renderMessages() {
  app.innerHTML = '';
  messages.forEach(({ name, chara, blessing }) => {
    const div = document.createElement('div');
    div.className = 'message-card';
    div.innerHTML = `
      <div class="avatar">${name}（選擇：${chara}）</div>
      <div class="blessing">${blessing}</div>
    `;
    app.appendChild(div);
  });
}

// 彈出祝福互動視窗
function showPopup() {
  const popup = document.createElement('div');
  popup.className = 'popup';
  const img = document.createElement('img');
  img.src = './nami.png'; // 你原本的娜美圖放這
  const text = document.createElement('p');
  text.textContent = blessingLines[Math.floor(Math.random() * blessingLines.length)];
  popup.appendChild(img);
  popup.appendChild(text);
  document.body.appendChild(popup);

  setTimeout(() => {
    popup.style.opacity = 0;
    setTimeout(() => popup.remove(), 1000);
  }, 5000);
}

// 表單送出
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const newMessage = {
    name: nameInput.value.trim(),
    chara: charaSelect.value,
    blessing: blessingInput.value.trim()
  };

  if (newMessage.name && newMessage.blessing) {
    messages.push(newMessage);
    localStorage.setItem('messages', JSON.stringify(messages));
    renderMessages();
    showPopup();
    form.reset();
  }
});

// 清除留言
document.querySelector('#clear').addEventListener('click', () => {
  if (confirm('確定要清空所有留言？這將無法復原喔！')) {
    messages = [];
    localStorage.removeItem('messages');
    renderMessages();
  }
});

// 匯出留言
document.querySelector('#export').addEventListener('click', () => {
  const content = messages.map(m => `${m.name}（${m.chara}）：${m.blessing}`).join('\n');
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = '留言板.txt';
  a.click();
  URL.revokeObjectURL(url);
});

// 頁面載入時顯示留言
renderMessages();