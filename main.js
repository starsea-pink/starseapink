// main.js

// 取得元素
const messageForm = document.getElementById('messageForm');
const nameInput = document.getElementById('name');
const messageInput = document.getElementById('message');
const avatarSelect = document.getElementById('avatar');
const app = document.getElementById('app');
const messageCount = document.getElementById('messageCount');
const clearButton = document.getElementById('clearButton');

// 留言清單陣列
let messages = JSON.parse(localStorage.getItem('messages')) || [];

// 更新留言列表畫面
function renderMessages() {
  app.innerHTML = '';
  messages.forEach((msg, index) => {
    const div = document.createElement('div');
    div.classList.add('message-card'); // CSS裡可設計俏皮風字體
    div.innerHTML = `
      <div class="avatar">${msg.avatar}</div>
      <div class="content">
        <div class="name">${msg.name || '匿名'}</div>
        <div class="text">${msg.message}</div>
      </div>
    `;
    app.appendChild(div);
  });
  messageCount.textContent = `目前共有 ${messages.length} 則留言`;
}

// 存留言到 localStorage
function saveMessages() {
  localStorage.setItem('messages', JSON.stringify(messages));
}

// 新增留言
messageForm.addEventListener('submit', e => {
  e.preventDefault();
  const name = nameInput.value.trim();
  const message = messageInput.value.trim();
  const avatar = avatarSelect.value;

  if (!message) return alert('留言不能空白！');

  messages.push({ name, message, avatar });
  saveMessages();
  renderMessages();

  messageForm.reset();
});

// 清除留言：先要求輸入密碼，成功後顯示清除按鈕
function promptClearPassword() {
  const pw = prompt('請輸入管理密碼以清除所有留言');
  if (pw === '夏夕夏景') {
    clearButton.style.display = 'inline-block';
  } else {
    alert('密碼錯誤！');
  }
}

// 按下清除按鈕清空留言
clearButton.addEventListener('click', () => {
  if (confirm('確定要清空所有留言嗎？')) {
    messages = [];
    saveMessages();
    renderMessages();
    clearButton.style.display = 'none';
  }
});

// 第一次載入渲染留言
renderMessages();

// 用戶輸入名字欄，當輸入為「夏夕夏景」自動呼叫密碼驗證
nameInput.addEventListener('input', e => {
  if (e.target.value.trim() === '夏夕夏景') {
    promptClearPassword();
  } else {
    clearButton.style.display = 'none';
  }
});