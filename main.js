document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("messageForm");
  const app = document.getElementById("app");
  const messageCount = document.getElementById("messageCount");
  const characterSelect = form.elements["character"];

  let messages = [];
  let originalCharacter = "";

  // 初始歡迎詞
  const welcome = document.createElement("p");
  welcome.textContent = "歡迎大家一起來祝福Eric生日！";
  app.appendChild(welcome);

  // 角色圖片切換用
  const getCharacterImage = (character) => `images/${character}.png`;

  // 隨機祝福語
  const blessings = [
    "生日快樂！願你天天開心！",
    "祝你今年順心如意！",
    "願你的遊戲之路更加順暢！",
    "吃飽睡好打電動～最棒生日！",
  ];

  // 渲染留言
  function renderMessages() {
    app.innerHTML = ""; // 清空
    app.appendChild(welcome); // 加回歡迎詞
    messages.forEach((msg, index) => {
      const div = document.createElement("div");
      div.className = "message";
      const img = document.createElement("img");
      img.src = getCharacterImage(msg.character);
      img.alt = msg.character;
      img.width = 100;

      const name = document.createElement("h3");
      name.textContent = msg.name;

      const message = document.createElement("p");
      message.textContent = msg.message;

      const blessing = document.createElement("p");
      blessing.className = "blessing";
      blessing.textContent = msg.blessing;

      div.appendChild(img);
      div.appendChild(name);
      div.appendChild(message);
      div.appendChild(blessing);
      app.appendChild(div);
    });

    messageCount.textContent = `目前共 ${messages.length} 則留言`;
  }

  // 表單送出
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    let name = form.elements["name"].value.trim();
    let message = form.elements["message"].value.trim();
    let character = characterSelect.value;

    // 特殊代碼：清除留言
    if (message === "夏夕夏景") {
      if (confirm("你將清除所有留言，確定嗎？")) {
        messages = [];
        renderMessages();
      }
      return;
    }

    // 特殊代碼：切換特殊角色
    if (message === "小屁股蛋") {
      character = "special";
    }

    originalCharacter = character;

    messages.push({
      name,
      message,
      character,
      blessing: "", // 初始不顯示祝福
    });

    renderMessages();
    form.reset();
    characterSelect.value = originalCharacter;
  });

  // 點擊留言切換內容
  app.addEventListener("click", function (e) {
    const target = e.target.closest(".message");
    if (!target) return;

    const index = Array.from(app.children).indexOf(target) - 1; // 減掉歡迎詞
    if (index < 0 || index >= messages.length) return;

    const msg = messages[index];

    // 切換狀態
    if (!msg._state || msg._state === "character") {
      msg._state = "message";
    } else if (msg._state === "message") {
      msg._state = "blessing";
      msg.blessing = blessings[Math.floor(Math.random() * blessings.length)];
    } else if (msg._state === "blessing") {
      msg._state = "character";
      msg.blessing = "";
    }

    renderMessages();
  });
});