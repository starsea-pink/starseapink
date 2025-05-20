document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  const app = document.getElementById('app');
  const messageCount = document.getElementById('messageCount');
  const audio = document.getElementById('bgm');
  const muteButton = document.getElementById('muteButton');

  const randomBlessings = [
    "祝你年年有今日，歲歲有今朝～",
    "生日快樂！願你心想事成、快樂加倍！",
    "永遠保持快樂的宅宅靈魂！",
    "願你打遊戲都贏、釣蝦都爆桶！",
    "祝你每天都能笑出腹肌！",
    "被世界溫柔對待，也記得溫柔自己。",
    "我最崇拜Eric了!",
    "你的存在，就是最棒的禮物。"
  ];

  const characters = {
    luffy: 'Luffy.png',
    zoro: 'Zoro.png',
    sanji: 'Sanji.png',
    nami: 'Nami.png',
    robin: 'Robin.png',
    chopper: 'Chopper.png',
    hancock: 'Hancock.png',
    beauty1: 'beauty1.png',
    beauty2: 'beauty2.png'
  };

  const specialKeyword = '小屁股蛋';
  const specialImage = 'special.png';

  // 音樂控制
  muteButton.addEventListener('click', () => {
    if (audio.paused) {
      audio.play();
      muteButton.textContent = '靜音';
    } else {
      audio.pause();
      muteButton.textContent = '播放音樂';
    }
  });

  try {
    audio.play();
    muteButton.textContent = '靜音';
  } catch (e) {
    console.warn("自動播放被阻擋，請手動播放音樂。");
  }

  let messages = JSON.parse(localStorage.getItem('messages')) || [];

  function getRandomBlessing() {
    const index = Math.floor(Math.random() * randomBlessings.length);
    return randomBlessings[index];
  }

  function renderMessages() {
    app.innerHTML = '';
    messages.forEach((msg, index) => {
      const messageDiv = document.createElement('div');
      messageDiv.className = 'message';

      const img = document.createElement('img');
      img.src = msg.name.includes(specialKeyword)
        ? images/${specialImage}
        : `images/${characters[msg.character] || 'Luffy.png'}`;
      img.alt = "角色圖";
      img.dataset.step = "0";
      img.dataset.index = index;
      img.style.cursor = "pointer";

      const nameHeading = document.createElement('h3');
      nameHeading.textContent = msg.name;

      const textPara = document.createElement('p');
      textPara.className = 'text';
      textPara.textContent = msg.text;

      messageDiv.appendChild(img);
      messageDiv.appendChild(nameHeading);
      messageDiv.appendChild(textPara);
      app.appendChild(messageDiv);
    });

    messageCount.textContent = `目前共有 ${messages.length} 則留言`;

    document.querySelectorAll('.message img').forEach(img => {
      img.addEventListener('click', () => {
        const index = parseInt(img.dataset.index);
        const step = parseInt(img.dataset.step);
        const msg = messages[index];
        const messageDiv = img.parentElement;
        const textP = messageDiv.querySelector('.text');

        if (step === 0) {
          textP.textContent = msg.text;
          img.dataset.step = '1';
        } else if (step === 1) {
          textP.textContent = getRandomBlessing();
          img.dataset.step = '2';
        } else {
          img.src = msg.name.includes(specialKeyword)
            ? images/${specialImage}
            : `images/${characters[msg.character] || 'Luffy.png'}`;
          textP.textContent = msg.text;
          img.dataset.step = '0';
        }
      });
    });
  }

  renderMessages();

  form.addEventListener('submit', e => {
    e.preventDefault();

    const nameInput = form.querySelector('input[name="name"]');
    const messageInput = form.querySelector('textarea[name="message"]');
    const characterSelect = form.querySelector('select[name="character"]');

    const name = nameInput.value.trim();
    const text = messageInput.value.trim();
    const character = characterSelect.value;

    if (!name) return;

    if (name === '夏夕夏景') {
      localStorage.removeItem('messages');
      messages = [];
      renderMessages();
      form.reset();
      return;
    }

    const finalText = text || getRandomBlessing();

    const newMessage = {
      name,
      text: finalText,
      character
    };

    messages.push(newMessage);
    localStorage.setItem('messages', JSON.stringify(messages));
    form.reset();
    renderMessages();
  });
});