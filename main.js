document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('form');
  const app = document.getElementById('app');
  const messageCount = document.getElementById('messageCount');
  const clearBtn = document.getElementById('clearBtn');
  const exportBtn = document.getElementById('exportBtn');
  const audio = new Audio('/music/EndOfWorld.mp3');
  audio.loop = true;
  audio.volume = 0.5;

  // 使用者首次互動後播放音樂
  document.body.addEventListener('click', () => {
    if (audio.paused) {
      audio.play();
    }
  }, { once: true });

  const blessings = [
    '娜美親妳一下！祝妳天天都有寶藏！',
    '羅賓溫柔地為妳遞上書本：願妳心想事成。',
    '香吉士轉圈圈送上玫瑰：「為妳下廚是我的榮幸。」',
    '魯夫笑著說：「妳就是我的夥伴！」',
    '漢考克傲嬌地說：「人家才不是特地祝妳快樂的呢！」',
    '索隆點點頭：「願妳在未來的路上，劍指天下。」',
    '美少女角色比了個心：「今天是妳的Lucky Day！」',
    '神秘角色閃現：「你已解鎖隱藏祝福，願望成真！」'
  ];

  function updateMessageCount() {
    const messages = document.querySelectorAll('.message');
    messageCount.textContent = `目前留言數：${messages.length}`;
  }

  function saveMessagesToLocalStorage() {
    const messages = Array.from(document.querySelectorAll('.message')).map(msg => {
      return {
        name: msg.querySelector('strong').textContent,
        text: msg.querySelector('p').textContent,
        character: msg.querySelector('.avatar').classList[1]
      };
    });
    localStorage.setItem('messages', JSON.stringify(messages));
  }

  function loadMessagesFromLocalStorage() {
    const data = JSON.parse(localStorage.getItem('messages') || '[]');
    data.forEach(msg => renderMessage(msg.name, msg.text, msg.character));
  }

  function renderMessage(name, text, character) {
    const div = document.createElement('div');
    div.className = 'message';

    const avatar = document.createElement('div');
    avatar.className = `avatar ${character}`;

    const nameEl = document.createElement('strong');
    nameEl.textContent = name;

    const textEl = document.createElement('p');
    textEl.textContent = text;

    div.appendChild(avatar);
    div.appendChild(nameEl);
    div.appendChild(document.createElement('br'));
    div.appendChild(textEl);

    app.appendChild(div);
    updateMessageCount();
  }

  function showBlessing() {
    const msg = blessings[Math.floor(Math.random() * blessings.length)];
    const blessEl = document.createElement('div');
    blessEl.textContent = msg;
    blessEl.style.position = 'fixed';
    blessEl.style.bottom = '20px';
    blessEl.style.right = '20px';
    blessEl.style.padding = '12px 20px';
    blessEl.style.background = 'rgba(255, 255, 255, 0.9)';
    blessEl.style.border = '2px solid #f39c12';
    blessEl.style.borderRadius = '12px';
    blessEl.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
    blessEl.style.zIndex = 9999;
    blessEl.style.fontSize = '18px';
    blessEl.style.transition = 'opacity 1s ease';
    document.body.appendChild(blessEl);

    setTimeout(() => {
      blessEl.style.opacity = 0;
      setTimeout(() => blessEl.remove(), 1000);
    }, 5000);
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = form.name.value.trim();
    const text = form.text.value.trim();
    const character = form.character.value;
    if (!name || !text) return;

    renderMessage(name, text, character);
    saveMessagesToLocalStorage();
    showBlessing();
    form.reset();
  });

  clearBtn.addEventListener('click', () => {
    if (confirm('確定要清除所有留言嗎？')) {
      localStorage.removeItem('messages');
      app.innerHTML = '';
      updateMessageCount();
    }
  });

  exportBtn.addEventListener('click', () => {
    const messages = JSON.parse(localStorage.getItem('messages') || '[]');
    if (!messages.length) return alert('目前沒有留言');
    const content = messages.map(m => `【${m.name}】${m.text}`).join('\n');
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = '留言板匯出.txt';
    a.click();
    URL.revokeObjectURL(url);
  });

  loadMessagesFromLocalStorage();
});