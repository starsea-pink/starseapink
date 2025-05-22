document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('messageForm');
  const app = document.getElementById('app');
  const messageCount = document.getElementById('messageCount');
  const audio = document.getElementById('bgMusic');
  const muteButton = document.getElementById('musicToggle');

  const characters = {
    background: 'background.png',
    beauty1: 'beauty1.png',
    beauty2: 'beauty2.png',
    Chopper: 'Chopper.png',
    Hancock: 'Hancock.png',
    Luffy: 'Luffy.png',
    Nami: 'Nami.png',
    Robin: 'Robin.png',
    Sanji: 'Sanji.png',
    special: 'special.png',
    Zoro: 'Zoro.png',
    Usopp: 'Usopp.png',
    Franky: 'Franky.png'
  };

  const blessings = [
    "生日快樂！願你快樂一整年！",
    "希望你今年打電動都贏～",
    "釣蝦永遠爆桶！",
    "世界和平靠你啦！",
    "愛你的人都在這裡留言了！"
  ];

  let messages = JSON.parse(localStorage.getItem('messages')) || [];

  function renderMessages() {
    app.innerHTML = '';
    messages.forEach((msg, index) => {
      const div = document.createElement('div');
      div.className = 'message';

      const img = document.createElement('img');
      img.src = `images/${characters[msg.character] || 'Luffy.png'}`;
      img.alt = "代表角色";
      img.className = 'character-img';
      img.dataset.index = index;

      const name = document.createElement('h3');
      name.textContent = msg.name;
      name.style.display = 'none';

      const text = document.createElement('p');
      text.textContent = msg.text;
      text.style.display = 'none';

      const blessing = document.createElement('p');
      blessing.textContent = blessings[Math.floor(Math.random() * blessings.length)];
      blessing.className = 'blessing';
      blessing.style.display = 'none';

      div.appendChild(img);
      div.appendChild(name);
      div.appendChild(text);
      div.appendChild(blessing);
      app.appendChild(div);

      // 動畫流程：角色 → 留言 → 隨機祝福 → 回到角色
      setTimeout(() => {
        img.style.display = 'none';
        name.style.display = 'block';
        text.style.display = 'block';
      }, 1000);

      setTimeout(() => {
        name.style.display = 'none';
        text.style.display = 'none';
        blessing.style.display = 'block';
      }, 2500);

      setTimeout(() => {
        blessing.style.display = 'none';
        img.style.display = 'block';
      }, 4000);
    });
    messageCount.textContent = `目前有 ${messages.length} 則留言`;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const text = form.message.value.trim();
    let character = form.character.value;

    if (!name || !text) {
      alert("請填寫名字與留言內容！");
      return;
    }

    if (name === "夏夕夏景") {
      localStorage.removeItem('messages');
      messages = [];
      renderMessages();
      form.reset();
      return;
    }

    if (name === "小屁股蛋") {
      character = 'special';
    }

    const messageObj = { name, text, character };
    messages.push(messageObj);
    localStorage.setItem('messages', JSON.stringify(messages));
    renderMessages();
    form.reset();
  });

  muteButton.addEventListener('click', () => {
    if (audio.paused) {
      audio.play();
      muteButton.textContent = "靜音";
    } else {
      audio.pause();
      muteButton.textContent = "播放音樂";
    }
  });

  renderMessages();

  // 預設啟動後自動播放（需使用者互動）
  window.addEventListener('click', () => {
    if (audio.paused) {
      audio.play().catch(() => {});
    }
  }, { once: true });
});