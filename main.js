const form = document.getElementById('messageForm');
const app = document.getElementById('app');
const messageCount = document.getElementById('messageCount');

let messages = [];

form.addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const avatar = document.getElementById('avatar').value;
  const message = document.getElementById('message').value.trim();

  if (!name || !message) return;

  // 判斷是否觸發專屬角色
  const finalAvatar = name === '小屁股蛋' ? 'Special' : avatar;

  const newMessage = {
    name,
    avatar: finalAvatar,
    message,
    time: new Date().toLocaleString()
  };

  messages.unshift(newMessage); // 新留言加在最前面
  renderMessages();
  form.reset();
});

function renderMessages() {
  app.innerHTML = '';
  messages.forEach(msg => {
    const div = document.createElement('div');
    div.className = 'message';
    div.innerHTML = `
      <div class="avatar ${msg.avatar}"></div>
      <div><strong>${msg.name}</strong> 說：</div>
      <div>${msg.message}</div>
      <div style="font-size: 12px; color: #777;">${msg.time}</div>
    `;
    app.appendChild(div);
  });

  messageCount.innerText = `目前共有 ${messages.length} 則留言`;
}