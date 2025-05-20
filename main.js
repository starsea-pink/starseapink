document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('commentForm');
  const app = document.getElementById('app');
  const messageCount = document.getElementById('messageCount');
  const audio = document.getElementById('bgm');
  const muteButton = document.getElementById('muteButton');

  const characters = {
    luffy: 'Luffy.png',
    zoro: 'Zoro.png',
    sanji: 'Sanji.png',
    nami: 'Nami.png',
    robin: 'Robin.png',
    chopper: 'Chopper.png',
    hancock: 'Hancock.png',
    beauty1: 'beauty1.png',
    beauty2: 'beauty2.png',
    usopp: 'Usopp.png',
    franky: 'Franky.png'
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
      img.dataset.index = index;

      const name = document.createElement('h3');
      name.textContent = msg.name;

      const text = document.createElement('p');
      text.textContent = msg.text;

      div.appendChild(img);
      div.appendChild(name);
      div.appendChild(text);
      app.appendChild(div);
    });
    messageCount.textContent = `目前有 ${messages.length} 則留言`;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const text = form.message.value.trim();
    const character = form.character.value;

    if (!name) return;

    // 隱藏指令：清除
    if (name === "夏夕夏景") {
      localStorage.removeItem('messages');
      messages = [];
      renderMessages();
      form.reset();
      return;
    }

    const messageObj = {
      name,
      text: text || blessings[Math.floor(Math.random() * blessings.length)],
      character
    };

    messages.push(messageObj);
    localStorage.setItem('messages', JSON.stringify(messages));
    renderMessages();
    form.reset();
  });

  // 音樂控制
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
});