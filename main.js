document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  const app = document.getElementById('app');
  const messageCount = document.getElementById('messageCount');
  const audio = document.getElementById('bgMusic');
  const musicToggle = document.getElementById('musicToggle');

  // 音樂播放控制
  musicToggle.addEventListener('click', () => {
    if (audio.paused) {
      audio.play();
      musicToggle.textContent = '暫停音樂';
    } else {
      audio.pause();
      musicToggle.textContent = '播放音樂';
    }
  });

  // 預設播放音樂
  try {
    audio.play();
    musicToggle.textContent = '暫停音樂';
  } catch (e) {
    console.warn("自動播放被阻擋，請手動點擊播放。");
  }

  // 對應角色與圖檔名稱（11 張圖）
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

  let messages = JSON.parse(localStorage.getItem('messages')) || [];

  function renderMessages() {
    app.innerHTML = '';
    messages.forEach(msg => {
      const div = document.createElement('div');
      div.className = 'message';

      let imgSrc = '';

      if (msg.name.includes(specialKeyword)) {
        imgSrc = `images/${specialImage}`;
      } else if (characters[msg.character]) {
        imgSrc = `images/${characters[msg.character]}`;
      } else {
        imgSrc = 'images/Luffy.png'; // fallback 預設顯示魯夫
      }

      div.innerHTML = `
        <img src="${imgSrc}" alt="角色圖">
        <h3>${msg.name}</h3>
        <p>${msg.text}</p>
      `;
      app.appendChild(div);
    });

    messageCount.textContent = `目前共有 ${messages.length} 則留言`;
  }

  renderMessages();

  form.addEventListener('submit', e => {
    e.preventDefault();
    const name = form.name.value.trim();
    const text = form.text.value.trim();
    const character = form.character.value;

    if (!name || !text) return;

    const newMessage = { name, text, character };
    messages.push(newMessage);
    localStorage.setItem('messages', JSON.stringify(messages));
    form.reset();
    renderMessages();
  });
});