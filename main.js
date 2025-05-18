document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  const app = document.getElementById('app');
  const messageCount = document.getElementById('messageCount');
  const audio = document.getElementById('bgMusic');

  // 播放背景音樂
  try {
    audio.play().catch(e => {
      console.warn("音樂播放失敗：", e);
    });
  } catch (e) {
    console.warn("音樂錯誤：", e);
  }

  const characters = {
    luffy: 'luffy.png',
    nami: 'nami.png',
    robin: 'robin.png'
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
        imgSrc = 'images/luffy.png';
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