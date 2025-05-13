document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('messageForm');
  const app = document.getElementById('app');
  const messageCount = document.getElementById('messageCount');
  const clearBtn = document.getElementById('clearBtn');
  const exportBtn = document.getElementById('exportBtn');
  const bgMusic = new Audio('music/EndOfWorld.mp3');
  bgMusic.volume = 0.5;

  const blessing = document.createElement('div');
  blessing.id = 'blessing';
  blessing.style.position = 'fixed';
  blessing.style.bottom = '30px';
  blessing.style.right = '30px';
  blessing.style.zIndex = 1000;
  blessing.style.padding = '12px 20px';
  blessing.style.background = 'rgba(255,255,255,0.9)';
  blessing.style.border = '2px solid #f39c12';
  blessing.style.borderRadius = '12px';
  blessing.style.fontSize = '20px';
  blessing.style.display = 'none';
  blessing.style.transition = 'opacity 1s ease-out';
  document.body.appendChild(blessing);

  const blessingList = [
    { avatar: 'Nami', text: '娜美親你一下～生日快樂啦～' },
    { avatar: 'Robin', text: '羅賓說：願你知識滿載又開心！' },
    { avatar: 'Hancock', text: '女帝說：本王祝你幸福，僅此一次！' },
    { avatar: 'Sanji', text: '香吉士端上料理：你的生日餐已備好！' },
    { avatar: 'Zoro', text: '索隆迷路中...但祝福沒迷路！生日快樂！' },
    { avatar: 'beauty1', text: '神秘大姊姊祝你帥到沒朋友！' },
    { avatar: 'beauty2', text: '氣質女神來報到：生日就是要爽～' },
    { avatar: 'Luffy', text: '魯夫咧嘴笑：開派對啦！！！' }
  ];

  const loadMessages = () => {
    const messages = JSON.parse(localStorage.getItem('messages') || '[]');
    app.innerHTML = '';
    messages.forEach(addMessageToDOM);
    updateMessageCount(messages.length);
  };

  const saveMessages = (messages) => {
    localStorage.setItem('messages', JSON.stringify(messages));
  };

  const updateMessageCount = (count) => {
    messageCount.textContent = `目前共收到 ${count} 則留言`;
  };

  const addMessageToDOM = ({ name, message, avatar }) => {
    const div = document.createElement('div');
    div.className = 'message';
    div.innerHTML = `
      <div class="avatar ${avatar}"></div>
      <strong>${name}</strong><br/>
      <p>${message}</p>
    `;
    app.insertBefore(div, app.firstChild);
  };

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = form.name.value.trim();
    const message = form.message.value.trim();
    const avatar = form.avatar.value;

    if (!name || !message) return;

    const newMsg = { name, message, avatar };
    const messages = JSON.parse(localStorage.getItem('messages') || '[]');
    messages.push(newMsg);
    saveMessages(messages);
    addMessageToDOM(newMsg);
    updateMessageCount(messages.length);
    form.reset();

    // blessing 出現動畫
    const chosen = blessingList[Math.floor(Math.random() * blessingList.length)];
    blessing.innerHTML = `<div class="avatar ${chosen.avatar}"></div><div>${chosen.text}</div>`;
    blessing.style.display = 'flex';
    blessing.style.alignItems = 'center';
    blessing.style.gap = '10px';
    blessing.style.opacity = 1;

    setTimeout(() => {
      blessing.style.opacity = 0;
      setTimeout(() => blessing.style.display = 'none', 1000);
    }, 5000);
  });

  // 清除留言按鈕
  clearBtn.addEventListener('click', function () {
    if (confirm('確定要清除所有留言嗎？')) {
      localStorage.removeItem('messages');
      app.innerHTML = '';
      updateMessageCount(0);
      clearBtn.style.display = 'none';
    }
  });

  // 匯出留言
  exportBtn.addEventListener('click', function () {
    const messages = JSON.parse(localStorage.getItem('messages') || '[]');
    const text = messages.map(msg => `${msg.name}: ${msg.message}`).join('\n');
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = '留言備份.txt';
    a.click();
    URL.revokeObjectURL(url);
  });

  // 神秘密語觸發顯示清除鍵
  form.message.addEventListener('input', function () {
    if (form.message.value.trim() === '夏夕夏景') {
      clearBtn.style.display = 'inline-block';
    } else {
      clearBtn.style.display = 'none';
    }
  });

  // 自動播放背景音樂
  bgMusic.play().catch(() => {
    document.addEventListener('click', () => bgMusic.play(), { once: true });
  });

  loadMessages();
});