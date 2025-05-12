document.addEventListener("DOMContentLoaded", function () {
  const app = document.getElementById("app");
  const form = document.getElementById("messageForm");
  const nameInput = document.getElementById("name");
  const avatarSelect = document.getElementById("avatar");
  const messageInput = document.getElementById("message");
  const messageCount = document.getElementById("messageCount");

  let messages = [];

  function renderMessages() {
    app.innerHTML = "";
    messages.forEach((msg, index) => {
      const card = document.createElement("div");
      card.className = "message-card";

      card.innerHTML = `
        <div class="avatar ${msg.avatar}"></div>
        <div class="content">
          <h4>${msg.name}</h4>
          <p>${msg.message}</p>
        </div>
      `;

      app.appendChild(card);
    });

    messageCount.textContent = `目前共有 ${messages.length} 則留言`;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = nameInput.value.trim();
    let avatar = avatarSelect.value;
    const message = messageInput.value.trim();

    if (!name || !message) return;

    // 如果暱稱是「小屁股蛋」，套用特殊頭像
    if (name === "小屁股蛋") {
      avatar = "special";
    }

    messages.push({ name, avatar, message });
    renderMessages();

    form.reset();
  });
});